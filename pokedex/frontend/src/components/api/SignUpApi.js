// import axios from "axios";
import axios from "axios";
import { nameAvailabilityCheckUrl } from "../../constants/ApiUrls";

/**
 * ユーザー名とスクリーン名のAvailabilityをチェック
 * @param {String} target - チェック対象
 * @param {String} value - 対象の値
 */
export async function nameAvailabilityCheck (target, value) {
  
  try {
    const res = await axios.post(nameAvailabilityCheckUrl, { target, value });
    const result = { data: res.data, status: res.status };
    return result;
  } catch(e) {
    console.log("error:" + e);
  }
};
