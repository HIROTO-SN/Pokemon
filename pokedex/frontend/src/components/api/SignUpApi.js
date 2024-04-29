// import axios from "axios";
import axios from "axios";
import {
  chkTokenlUrl,
  nameAvailabilityCheckUrl,
  sendEmailUrl,
  singupUrl,
  verifyEmailUrl,
} from "../../constants/ApiUrls";

/**
 * ユーザー名とスクリーン名のAvailabilityをチェック
 * @param {String} target - チェック対象
 * @param {String} value - 対象の値
 */
export async function nameAvailabilityCheck(target, value) {
  try {
    const res = await axios.post(
      nameAvailabilityCheckUrl,
      { target, value },
      {
        headers: {
          "AUTH-API-VERSION": 1,
        },
      }
    );
    const result = { data: res.data, status: res.status };
    return result;
  } catch (e) {
    console.log("error:" + e);
  }
}

/**
 * サインアップ
 * @param {Object} accountInfo - 画面入力アカウント内容
 */
export async function singUp(accountInfo) {
  const newCountry = accountInfo.country.name;
  accountInfo.country = newCountry;
  try {
    const res = await axios.post(singupUrl, accountInfo, {
      headers: {
        "AUTH-API-VERSION": 1,
      },
    });
    return res.status;
  } catch (e) {
    console.log("error:" + e);
    return e.response.status;
  }
}

/**
 * メール送信
 * @param {String} to - 送信先
 */
export async function sendEmail(to) {
  try {
    const res = await axios.post(
      sendEmailUrl,
      {
        to: to,
      },
      {
        headers: {
          Accept: "application/vnd.mail.v1+json",
        },
      }
    );
    return res.status;
  } catch (e) {
    console.log("error:" + e);
    return e.response.status;
  }
}

/**
 * トークンチェック認証
 * @param {String} token - トークン
 */
export async function chkToken(token) {
  try {
    const res = await axios.get(
      chkTokenlUrl,
      {
        params: { token: token },
      },
      {
        headers: {
          Accept: "application/vnd.mail.v1+json",
        },
      }
    );
    return res.status === 200 ? true : false;
  } catch (e) {
    console.log("error:" + e);
    return false;
  }
}

/**
 * メール再認証
 * @param {Object} accountInfo - 画面入力アカウント内容
 * @param {String} token - トークン
 */
export function verifyEmail(accountInfo, token) {
  try {
    const reqBody = {
      email: accountInfo.email,
      username: accountInfo.username,
      password: accountInfo.password,
      token: token,
    };
    axios.post(verifyEmailUrl, reqBody, {
      headers: {
        Accept: "application/vnd.mail.v1+json",
      },
    });
  } catch (e) {
    console.log("error:" + e);
  }
}
