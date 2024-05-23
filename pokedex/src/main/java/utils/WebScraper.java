package utils;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;

/**
 * Webサイトから情報を抽出
 */
public class WebScraper {

	public static void main(String[] args) {

		try {
			// website指定
			String url = "https://bulbapedia.bulbagarden.net/wiki/Scarlet_(Pok%C3%A9mon)";

			// Fetch the HTML content
			Document doc = Jsoup.connect(url).get();

			// Find the span with the specific text
			String targetText = "Scarlet";
			Elements spans = doc.select("span");

			for (Element span : spans) {
				if (span.text().trim().equals(targetText)) {
					// Navigate to the parent th, then tr, and find the td
					Element tr = span.parent().parent().parent();
					if (tr != null) {
						Element td = tr.select("td.roundy").first();
						if (td != null) {
							// Print the found span
							System.out.println("Text required is: " + td.text());
							break;
						}
					}
				}
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
}
