package utils;

public class ConvTools {

	public static void main(String[] args) {
		String height = "2'04\"";
		String height2 = height.replace("\'", ".");
		String height3 = height2.substring(0, height2.indexOf("\""));
		System.out.println(height2);
		System.out.println(height3);
	}

	/**
	 * Pokemonの高さをDouble型の計算可能な数値へ変換
	 * 
	 * @param height <String> インチ表記の高さ
	 * @return height double
	 */
	public double convInchiToCalcVal(String height) {
		return Double.parseDouble(
				height
						.substring(0, height.indexOf("\""))
						.replace("\'", "."));
	}
}
