// import axios from "axios";
import { signinUrl } from "../../constants/ApiUrls";
import axios from "axios";

/**
 * サインアップ
 * @param {String} username - ユーザ名
 * @param {String} password - パスワード
 * @param {Object} setError - エラーセットステート関数
 */
export async function loginAuth(username, password, setError) {
  try {
    return await axios.post(
      signinUrl,
      { username: username, password: password },
      {
        headers: {
          "AUTH-API-VERSION": 1,
        },
      }
    );
  } catch (e) {
    e.response.data.message != void 0 && setError(e.response.data.message);
    return e;
  }
}
