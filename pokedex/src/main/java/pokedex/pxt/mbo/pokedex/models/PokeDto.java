package pokedex.pxt.mbo.pokedex.models;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@JsonIgnoreProperties({"hibernateLazyInitializer"})

public class PokeDto {

	private int count;

	private String next;

	private String previous;

	private List<PokeDataDto> results;

}
