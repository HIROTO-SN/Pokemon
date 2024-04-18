package pokedex.pxt.mbo.pokedex.exception;

import org.springframework.http.HttpStatus;

public class PokedexException extends RuntimeException {
	private HttpStatus status;
	private String message;

	public PokedexException(String message) {
		this.message = message;
	}

	public PokedexException(HttpStatus status, String message) {
		this.status = status;
		this.message = message;
	}

	public PokedexException(String message, String message1) {
		super(message);
		this.message = message1;
	}

	public PokedexException(String message, HttpStatus status, String message1) {
		super(message);
		this.status = status;
		this.message = message1;
	}

	public HttpStatus getStatus() {
		return status;
	}

	@Override
	public String getMessage() {
		return message;
	}
}
