package pokedex.pxt.mbo.pokedex.services.impl;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import pokedex.pxt.mbo.pokedex.common.ApiEndPoints;
import pokedex.pxt.mbo.pokedex.payload.SessionDto;
import pokedex.pxt.mbo.pokedex.services.SessionService;

@Service
public class SessionServiceImpl implements SessionService {

	private RestTemplate rest;
	
	public SessionServiceImpl() {
		this.rest = new RestTemplate();
	}

	/*
	* ログインユーザー情報取得
	*/
	@Override
	public void setLoginUserData(SessionDto sessionData) {
		String endpoint = ApiEndPoints.URL_SET_SESSION_USERDATA;
		rest.postForObject(endpoint, sessionData, SessionDto.class);
	}

	/*
	* ログインユーザー情報取得
	*/
	@Override
	public ResponseEntity<SessionDto> getLoginUserData() {
		String endpoint = ApiEndPoints.URL_GET_SESSION_USERDATA;
		return rest.getForEntity(endpoint, SessionDto.class);
	}
	
}
