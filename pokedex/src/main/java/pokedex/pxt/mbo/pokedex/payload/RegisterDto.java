package pokedex.pxt.mbo.pokedex.payload;

import java.time.LocalDate;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class RegisterDto {
	private String username;
	private String password;
	private String email;
	private String country;
	private LocalDate birthday;
	private String screenName;
	private boolean newsInfoReceiveFlg;
	private boolean updateCenterReceiveFlg;
	private boolean displayPokeClubProfile;
}
