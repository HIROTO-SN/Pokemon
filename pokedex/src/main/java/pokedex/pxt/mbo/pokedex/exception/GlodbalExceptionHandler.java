package pokedex.pxt.mbo.pokedex.exception;

import java.util.Date;
import java.util.Locale;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.dao.DataAccessResourceFailureException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.LockedException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import pokedex.pxt.mbo.pokedex.common.Constants;
import pokedex.pxt.mbo.pokedex.payload.ErrorDetails;
import pokedex.pxt.mbo.pokedex.services.SessionService;

@ControllerAdvice
public class GlodbalExceptionHandler extends ResponseEntityExceptionHandler {

	@Autowired
	private MessageSource messageSource;
	@Autowired
	private SessionService sessionService;

	/*** Specific Exceptions ***/
	// リソース関連
	@ExceptionHandler(ResourceNotFoundException.class)
	public ResponseEntity<ErrorDetails> handleResourceNotFoundException(ResourceNotFoundException exception,
			WebRequest webRequest) {

		ErrorDetails errorDetails = new ErrorDetails(
				new Date(), exception.getMessage(), webRequest.getDescription(false));

		return new ResponseEntity<>(errorDetails, HttpStatus.NOT_FOUND);
	}

	// 入力チェック関連
	@ExceptionHandler(PokedexException.class)
	public ResponseEntity<ErrorDetails> handlePokedexAPIException(PokedexException exception,
			WebRequest webRequest) {
		ErrorDetails errorDetails = new ErrorDetails(new Date(), exception.getMessage(),
				webRequest.getDescription(false));
		return new ResponseEntity<>(errorDetails, HttpStatus.BAD_REQUEST);
	}

	// 権限関連
	@ExceptionHandler(AccessDeniedException.class)
	public ResponseEntity<ErrorDetails> handleAccessDeniedException(AccessDeniedException exception,
			WebRequest webRequest) {

		ErrorDetails errorDetails = new ErrorDetails(
				new Date(), exception.getMessage(), webRequest.getDescription(false));
		return new ResponseEntity<>(errorDetails, HttpStatus.UNAUTHORIZED);
	}

	// アカウント認証失敗（ユーザー名 or パスワードを間違えた場合）
	@ExceptionHandler(BadCredentialsException.class)
	public ResponseEntity<ErrorDetails> handleBadCredentialsException(BadCredentialsException exception,
			WebRequest webRequest) {

		// ログイン失敗回数をセッションから取得する
		Integer failCount = sessionService.getLoginUserData().getBody().getAccountLoginFailureCount();
		String messageCode = "error.BadCredentialsException.Attempt";
		// ログイン失敗回数がマックスに達したかどうか判定
		if (failCount >= Constants.LOGIN_MAX_FAIL_COUNT) {
			messageCode = "error.BadCredentialsException.Locked";
		}

		ErrorDetails errorDetails = new ErrorDetails(
				new Date(),
				messageSource.getMessage(
						messageCode,
						(failCount >= Constants.LOGIN_MAX_FAIL_COUNT) ? null
								: new Integer[] { (Constants.LOGIN_MAX_FAIL_COUNT - failCount) },
						null,
						Locale.ENGLISH),
				webRequest.getDescription(false));

		return new ResponseEntity<>(errorDetails, HttpStatus.UNAUTHORIZED);
	}

	// アカウントロック
	@ExceptionHandler(LockedException.class)
	public ResponseEntity<ErrorDetails> handleAuthenticationFailureLockedEvent(LockedException exception,
			WebRequest webRequest) {

		String messageCode = "error.BadCredentialsException.Locked";

		ErrorDetails errorDetails = new ErrorDetails(
				new Date(),
				messageSource.getMessage(
						messageCode,
						null,
						null,
						Locale.ENGLISH),
				webRequest.getDescription(false));
		return new ResponseEntity<>(errorDetails, HttpStatus.UNAUTHORIZED);
	}

	// Global Exceptions
	@ExceptionHandler(Exception.class)
	public ResponseEntity<ErrorDetails> handleGlobalException(Exception exception, WebRequest webRequest) {

		ErrorDetails errorDetails = new ErrorDetails(
				new Date(), exception.getMessage(), webRequest.getDescription(false));

		return new ResponseEntity<>(errorDetails, HttpStatus.INTERNAL_SERVER_ERROR);
	}
}
