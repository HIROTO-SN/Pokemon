package utils;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import org.jsoup.Connection;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.springframework.http.HttpStatus;

import pokedex.pxt.mbo.pokedex.exception.PokedexException;

/**
 * Webサイトから情報を抽出
 */
public class WebScraper2 {

	public static void main(String[] args) {

		HttpStatus httpStatus = HttpStatus.INTERNAL_SERVER_ERROR;

		try {
			// website指定
			// String url = "https://bulbapedia.bulbagarden.net/wiki/Nidoran%E2%99%80";
			String url = "https://bulbapedia.bulbagarden.net/wiki/Abra";

			// HTMLアクセステスト
			Connection.Response response = Jsoup.connect(url).execute();

			// アクセスコードを取得（アクセス可否判定）
			int statusCode = response.statusCode();
			httpStatus = HttpStatus.valueOf(statusCode);

			// ステータスが200の時は処理を続行
			if (httpStatus.is2xxSuccessful()) {
				Document doc = response.parse();
				// Find the id and elements
				String id_entry = "Pokédex_entries";
				Element startDoc = doc.select("#" + id_entry).first();

				if (startDoc != null) {
					// Get the parent h3 element
					Element h3 = startDoc.parent();
					// Select the table following the h3 tag
					Element table = h3.nextElementSibling();

					if (table != null) {
						for (int i = 8; i >= 0; i--) {
							// Get the target <tr> elements
							Elements rows = getTargetTrElement(table.select("> tbody > tr").get(i));
							Map<String, String> map_version = new HashMap<>();
							if (rows.size() > 1) {
								String previousVersionName = null;
								for(Element row : rows) {
									// Continue loop if the first th tag has a text 
									if (!row.select("> th").first().ownText().isEmpty()) {
										continue;
									}
									String versionName = row.select("th a span").text();
									String versionDesc = null;
									Element tdElement = row.select("td").first();
									if (tdElement != null) {
										versionDesc = tdElement.text();
										map_version.put(versionName, versionDesc);
										previousVersionName = versionName;
									} else {
										map_version.put(versionName, map_version.get(previousVersionName));
									}
								}
								map_version.forEach((key, value) -> {
									System.out.println("Key: " + key + ", Value: " + value);
								});
								break;
							} else {
								continue;
							}
						}
					}
				}

			} else {
				throw new PokedexException("ウェブページの取得に失敗しました。HTTP status code: " + statusCode);
			}
		} catch (IOException e) {
			throw new PokedexException("ウェブページの取得に失敗しました: " + e.getMessage());
		} catch (Exception e) {
			throw new PokedexException(httpStatus, "予期せぬエラーでウェブページの取得に失敗しました. HTTP status code: ");
		}
	}

	private static Elements getTargetTrElement(Element row) {
		int targetTr = 1;
		// Select the second <tr> element within the table
		Element tr = row.select("td table tbody tr").get(targetTr);

		if (tr != null) {
			// return the <tr> elements
			return tr.select("td table tbody tr");
		}
		return new Elements();
	}
}
