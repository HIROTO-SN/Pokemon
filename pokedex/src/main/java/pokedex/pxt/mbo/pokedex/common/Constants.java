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

	// PokeList Url 付与パラメータ
	public static final Map<String, Integer> POKE_PARAM = new HashMap<>() {
		{
			put("OFFSET", 0);
			put("LIMIT", 1025);
		}
	};

	// enum使い方例↓
	// public enum UserStatus {
	// ACTIVE("有効"),
	// INACTIVE("無効"),
	// PENDING("保留");

	// // 呼び出し↑ UserStatus.ACTIVE
	// }
}
