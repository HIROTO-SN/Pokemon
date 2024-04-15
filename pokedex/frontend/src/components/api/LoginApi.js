// import axios from "axios";
import { signinUrl } from "../../constants/ApiUrls";
import axios from "axios";

/**
 * サインアップ
 * @param {String} username - ユーザ名
 * @param {String} password - パスワード
 * @param {Object} setError - エラーセットステート関数
 */
export async function loginAuth (username, password, setError) {
  try {
    return await axios.post(signinUrl, { 
      username: username, 
      password: password 
    });
  } catch (e) {
    setError(e.response.data.message);
    console.log(e);
    return e;
  }
};
