package pokedex.pxt.mbo.pokedex.payload;

import java.io.Serializable;

import org.springframework.stereotype.Component;
import org.springframework.web.context.annotation.SessionScope;

import pokedex.pxt.mbo.pokedex.entity.User;

/*
 * Session管理用Bean
 */
@Component
public class SessionDto implements Serializable {

	private static final long serialVersionUID = 1991122005180818L;
	private User userdata;

	public SessionDto(User userdata) {
		this.userdata = userdata;
	}

	public User getUserdata() {
		return userdata;
	}

	public void setUserFailData(String username, Integer failCount) {
		this.userdata.setUsername(username);
		this.userdata.setAccountLoginFailureCount(failCount);
	}

}
