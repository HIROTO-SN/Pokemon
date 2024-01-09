package pokedex.pxt.mbo.pokedex.common;

import java.time.LocalDate;
import java.time.LocalTime;

/**
 * 定数定義
 */
public class Constants {

	// 現在日付
	public static final LocalDate TODAY = LocalDate.now();

	// 現在時間
	public static final LocalTime CURRENT_TIME = LocalTime.now();

	// ログイン失敗許容回数
	public static final int LOGIN_MAX_FAIL_COUNT = 5;

	// enum使い方例↓
	// public enum UserStatus {
  //   ACTIVE("有効"),
  //   INACTIVE("無効"),
  //   PENDING("保留");

	// 	// 呼び出し↑　UserStatus.ACTIVE
	// }
}
