package pokedex.pxt.mbo.pokedex.exception;

import java.util.Date;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import pokedex.pxt.mbo.pokedex.payload.ErrorDetails;

@ControllerAdvice
public class GlodbalExceptionHandler extends ResponseEntityExceptionHandler{
	
	/*** Specific Exceptions***/
	// リソース関連
	@ExceptionHandler(ResourceNotFoundException.class)
	public ResponseEntity<ErrorDetails> handleResourceNotFoundException(ResourceNotFoundException exception, WebRequest webRequest) {

		ErrorDetails errorDetails = new ErrorDetails(
			new Date(), exception.getMessage(), webRequest.getDescription(false)
		);
		
		return new ResponseEntity<>(errorDetails, HttpStatus.NOT_FOUND);
	}

	// 入力チェック関連
	@ExceptionHandler(PokedexException.class)
    public ResponseEntity<ErrorDetails> handleBlogAPIException(PokedexException exception,
                                                                        WebRequest webRequest){
        ErrorDetails errorDetails = new ErrorDetails(new Date(), exception.getMessage(),
                webRequest.getDescription(false));
        return new ResponseEntity<>(errorDetails, HttpStatus.BAD_REQUEST);
    }

	// 権限関連
	@ExceptionHandler(AccessDeniedException.class)
	public ResponseEntity<ErrorDetails> handleAccessDeniedException(AccessDeniedException exception, WebRequest webRequest) {

		ErrorDetails errorDetails = new ErrorDetails(
			new Date(), exception.getMessage(), webRequest.getDescription(false)
		);
		
		return new ResponseEntity<>(errorDetails, HttpStatus.UNAUTHORIZED);
	}

	// Global Exceptions
	@ExceptionHandler(Exception.class)
	public ResponseEntity<ErrorDetails> handleGlobalException(Exception exception, WebRequest webRequest) {

		ErrorDetails errorDetails = new ErrorDetails(
			new Date(), exception.getMessage(), webRequest.getDescription(false)
		);
		
		return new ResponseEntity<>(errorDetails, HttpStatus.INTERNAL_SERVER_ERROR);
	}
}
