package pokedex.pxt.mbo.pokedex.common;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import pokedex.pxt.mbo.pokedex.entity.User;

@Service
public class Api {

		private RestTemplate rest;

		public Api () {
			this.rest = new RestTemplate();
		}
				
		/*
		 * ログインユーザー情報取得
		 */
		public void setLoginUserData (User userdata) {
			String endpoint = ApiEndPoints.URL_SET_SESSION_USERDATA;
			rest.postForObject(endpoint, userdata, User.class);
		}

		/*
		 * ログインユーザー情報取得
		 */
		public ResponseEntity<User> getLoginUserData () {
			String endpoint = ApiEndPoints.URL_GET_SESSION_USERDATA;
			return rest.getForEntity(endpoint, User.class);
		}

}
