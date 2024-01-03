package pokedex.pxt.mbo.pokedex.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class User {
	
	private String userId;
	
	private String username;

	@JsonIgnore
	private String password;

}
