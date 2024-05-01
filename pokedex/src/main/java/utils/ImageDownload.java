package utils;

import java.io.FileOutputStream;
import java.io.InputStream;
import java.net.URL;
import java.net.URLConnection;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

public class ImageDownload {
	public static void main(String[] args) throws Exception {

		// ダウンロードフォルダーディレクトリー作成
		Path downloadDir = Paths.get(System.getProperty("user.home"), "Downloads", "pokemonImages");
		Files.createDirectories(downloadDir);

		// URLを作成し接続
		String urlbase = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/";
		int i;
		for (i = 10163; i <= 10175; i++) {
			String imageUrl = urlbase + i + ".png";
			URL url = new URL(imageUrl);
			URLConnection connection = url.openConnection();
			connection.setRequestProperty("User-Agent", "Mozilla/5.0");

			String fileName = String.format("%04d", i);
			fileName = fileName + ".png";

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
}
