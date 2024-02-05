// import axios from "axios";
import axios from "axios";
import { nameAvailabilityCheckUrl } from "../../constants/ApiUrls";

/**
 * ユーザー名とスクリーン名のAvailabilityをチェック
 * @param {String} target - チェック対象
 * @param {String} value - 対象の値
 */
export function nameAvailabilityCheck (target, value) {
  axios
    .post(nameAvailabilityCheckUrl, { target, value })
    .then(res => res)
    .catch((e) => {
      // エラー時の処理
			console.log("サーバー通信エラー")
    });
};
