package pokedex.pxt.mbo.pokedex.payload;

import java.io.Serializable;
import java.time.LocalDate;
import java.time.LocalDateTime;

import org.springframework.web.context.annotation.SessionScope;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import pokedex.pxt.mbo.pokedex.payload.pokemon.PokemonDto;

/*
 * Session管理用Bean
 */
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@SessionScope
public class SessionDto implements Serializable {

	private static final long serialVersionUID = 1991122005180818L;
	private String username;
	private String email;
	private String country;
	private LocalDate birthday;
	private Integer accountLoginFailureCount;
	private LocalDateTime accountLockedDate;
	private PokemonDto pokemonDto;
}
