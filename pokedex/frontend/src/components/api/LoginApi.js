// import axios from "axios";
import { signinUrl } from "../../constants/ApiUrls";
import axios from "axios";

// axiosでリクエストを送信
export function loginAuth (username, password, setError) {
  axios
    .post(signinUrl, { username, password })
    .then(res => console.log(res))
    .catch((e) => {
      // サーバー側からのエラーメッセージをセット
      setError(e.response.data.message);
    });
};
