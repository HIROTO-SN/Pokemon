// import axios from "axios";
import { signinUrl } from "../../constants/ApiUrls";
import axios from "axios";

// axiosでリクエストを送信
export async function loginAuth (username, password, setError) {
  try {
    return await axios.post(signinUrl, { 
      username: username, 
      password: password 
    });
  } catch (e) {
    setError(e.response.data.message)
  }
};
