package utils;

import java.io.IOException;

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
public class WebScraper {

	public static void main(String[] args) {

		HttpStatus httpStatus = HttpStatus.INTERNAL_SERVER_ERROR;;

		try {
			// website指定
			String url = "https://bulbapedia.bulbagarden.net/wiki/Kleavor_(Pok%C3%A9mon)";

			// HTMLアクセステスト
			Connection.Response response = Jsoup.connect(url).execute();

			// アクセスコードを取得（アクセス可否判定）
			int statusCode = response.statusCode();
			httpStatus = HttpStatus.valueOf(statusCode);

			// ステータスが200の時は処理を続行
			if (httpStatus.is2xxSuccessful()) {
				Document doc = response.parse();
				// Find the span with the specific text
				String targetText = "Scarlet";
				Elements spans = doc.select("span:containsOwn(" + targetText + ")");

				for (Element span : spans) {
					if (span.text().trim().equals(targetText)) {
						// Navigate to the parent th, then tr, and find the td
						Element tr = span.parent().parent().parent();
						if (tr != null) {
							Element td = tr.select("td.roundy").first();
							if (td != null) {
								// Print the found span
								System.out.println(td.text());
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
}
