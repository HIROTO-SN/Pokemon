package pokedex.pxt.mbo.pokedex.payload.Account;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class VerifyEmail {
	private String email;
	private String username;
	private String password;
	private String token;
}
