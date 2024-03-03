package pokedex.pxt.mbo.pokedex.common;

import java.time.LocalDate;
import java.time.LocalTime;
import java.time.LocalDateTime;
import java.util.*;

/**
 * 定数定義
 */
public class Constants {

	// 現在日付
	public static final LocalDate TODAY = LocalDate.now();

	// 現在時間
	public static final LocalTime CURRENT_TIME = LocalTime.now();

	// 現在日付時間
	public static final LocalDateTime CURRENT_DATE_TIME = LocalDateTime.now();

	// ログイン失敗許容回数
	public static final int LOGIN_MAX_FAIL_COUNT = 5;

	// PokeList作成時用定数
	public static final Map<String, Integer> POKE = new HashMap<>() {
		{
			put("FORM_ID_FOR_LIST", 1);
			put("OFFSET_FOR_INIT", 1);
			put("PAGE_SIZE", 12);
			put("LAST_POKEMON_ID", 1025);
		}
	};
	// 基準値キー名
	public static String MIDDLE = "MIDDLE_MIN";
	public static String LARGE = "LARGE_MIN";
	// Pokemon高さ基準
	public static final Map<String, Double> POKE_HEIGHT = new HashMap<>() {
		{
			put(MIDDLE, 4.00); // これ未満はsmall, 以上はmedium
			put(LARGE, 7.00); // これ未満はmedium, 以上はlarge
		}
	};

	// Pokemon重さ基準
	public static final Map<String, Double> POKE_WEIGHT = new HashMap<>() {
		{
			put(MIDDLE, 99.00); // これ未満はsmall, 以上はmedium
			put(LARGE, 490.00); // これ未満はmedium, 以上はlarge
		}
	};
}
