package utils;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.select.Elements;

/**
 * Webサイトから情報を抽出
 */
public class WebScraper {

	public static void main(String[] args) {

		// Initialize ChromeDriver
		// WebDriverManager.chromedriver().setup();
		// WebDriver driver = new ChromeDriver();

		try {
			// website指定
			// String url = "https://sg.portal-pokemon.com/play/pokedex/0002";
			String url = "https://bulbapedia.bulbagarden.net/wiki/Ivysaur_(Pok%C3%A9mon)";

			// // Locate the img tag and click it
			// // Wait for the page to load completely
			// WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));
			// wait.until(ExpectedConditions.visibilityOfElementLocated(By.cssSelector("div.pokemon-story__icon-wrapper")));

			// // // Locate the second img tag within the div
			// WebElement secondImgTag = driver
			// .findElement(By.cssSelector("div.pokemon-story__icon-wrapper
			// img.pokemon-story__icon:nth-child(2)"));

			// // // Click the second img tag
			// secondImgTag.click();

			// Fetch the HTML content
			Document doc = Jsoup.connect(url).get();

			 // Select the table cell with the text
			 Elements tdElements  = doc.select("td.roundy");

			 if (tdElements != null) {
					 // Get the text content
					 String text = tdElements.text();
					 System.out.println("Text: " + text);
			 } else {
					 System.out.println("No table cell found with class 'roundy'.");
			 }
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
}
