package utils;

import java.io.FileOutputStream;
import java.io.InputStream;
import java.net.URL;
import java.net.URLConnection;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;

import io.github.bonigarcia.wdm.WebDriverManager;

/**
 * Webサイトから画像を抽出
 */
public class ImageScraper {
	public static void main(String[] args) {

		// Initialize ChromeDriver
		WebDriverManager.chromedriver().setup();
		WebDriver driver = new ChromeDriver();

		// website指定
		driver.get("https://www.pokemon.com/us/pokedex/wartortle");

		// 全てのimageを抽出
		List<WebElement> images = driver.findElements(By.tagName("img"));

		// imageのソース部を抜き出す
		for (WebElement image : images) {
			String src = image.getAttribute("src");
			if (src != null && src.contains("assets.pokemon.com/assets/cms2/img/pokedex/full")) {
				System.out.println("Image Source: " + src);
				try {
					// imageダウンロード
					downloadImage(src);
					System.out.println("Image downloaded: " + src);
				} catch (Exception e) {
					System.err.println("Error downloading image: " + e.getMessage());
				}
			}
		}

		// ドライバーを破棄
		driver.quit();
	}

	public static void downloadImage(String imageUrl) throws Exception {
		// URLからファイル名を取得
		String fileName = imageUrl.substring(imageUrl.lastIndexOf("/") + 1);
		// String fileName = "";
		// try {
		// 	int parsedFileName = Integer.parseInt(fileNameString);
		// 	fileName = String.format("%04d", parsedFileName);
		// } catch (NumberFormatException e) {
		// 	e.printStackTrace();
		// }

		// ダウンロードフォルダーディレクトリー作成
		Path downloadDir = Paths.get(System.getProperty("user.home"), "Downloads");
		Files.createDirectories(downloadDir);

		// URLを作成し接続
		URL url = new URL(imageUrl);
		URLConnection connection = url.openConnection();
		connection.setRequestProperty("User-Agent", "Mozilla/5.0");

		// 入力情報をセット
		try (InputStream inputStream = connection.getInputStream()) {
			// 出力情報をセット
			Path outputFile = downloadDir.resolve(fileName);
			try (FileOutputStream outputStream = new FileOutputStream(outputFile.toFile())) {
				// ファイルにデータを書き込み
				byte[] buffer = new byte[1024];
				int bytesRead;
				while ((bytesRead = inputStream.read(buffer)) != -1) {
					outputStream.write(buffer, 0, bytesRead);
				}
			}
		}
	}
}
