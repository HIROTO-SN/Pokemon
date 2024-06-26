package pokedex.pxt.mbo.pokedex.security;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.event.EventListener;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.event.AuthenticationFailureBadCredentialsEvent;
import org.springframework.security.authentication.event.AuthenticationFailureCredentialsExpiredEvent;
import org.springframework.security.authentication.event.AuthenticationFailureDisabledEvent;
import org.springframework.security.authentication.event.AuthenticationFailureExpiredEvent;
import org.springframework.security.authentication.event.AuthenticationFailureLockedEvent;
import org.springframework.security.authentication.event.AuthenticationSuccessEvent;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import pokedex.pxt.mbo.pokedex.common.Constants;
import pokedex.pxt.mbo.pokedex.entity.User;
import pokedex.pxt.mbo.pokedex.exception.PokedexException;
import pokedex.pxt.mbo.pokedex.payload.SessionDto;
import pokedex.pxt.mbo.pokedex.repository.UserRepository;
import pokedex.pxt.mbo.pokedex.services.SessionService;

@Service
public class CustomUserDetailService implements UserDetailsService {

	private UserRepository userRepository;
	@Autowired
	private SessionService sessionService;

	public CustomUserDetailService(UserRepository userRepository) {
		this.userRepository = userRepository;
	}

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		User user = userRepository.findByUsername(username)
								.orElseThrow(() -> 
									new UsernameNotFoundException(
										("User not found with username: " + username)
								));
		// 権限取得
		Set<GrantedAuthority> authorities = user
			.getRoles()
			.stream()
			.map((role) -> new SimpleGrantedAuthority(role.getName()))
			.collect(Collectors.toSet());

		// アカウントロック判定(15分経過後解除)
		Optional<LocalDateTime> lockedTime = Optional.ofNullable(user.getAccountLockedDate());
		lockedTime.ifPresent((ltime) -> {
			LocalDateTime lockedPlus15min = ltime.plusMinutes(15);
	
			if (lockedPlus15min.isBefore(Constants.CURRENT_DATE_TIME)) {
				user.setAccountLockedDate(null);
				user.setAccountLoginFailureCount(0);
				userRepository.save(user);
			}
		});
		
		return new org.springframework.security.core.userdetails.User(
			user.getUsername(),
			user.getPassword(),
			user.getAccountEnabled(),
			(!user.getAccountExpiration().isBefore(Constants.TODAY)),
			(!user.getAccountPasswordExpiration().isBefore(Constants.TODAY)),
			(user.getAccountLoginFailureCount() < Constants.LOGIN_MAX_FAIL_COUNT),
			authorities);
	}

	/*
	 * アカウント認証成功
	 */
	@EventListener
	public void handleLoginSuccess(AuthenticationSuccessEvent event) {
		// 入力されたユーザー名
		String username = event.getAuthentication().getName();
		SessionDto sessionDto = new SessionDto();
		// 存在するユーザ名でのログイン失敗（パスワード間違い）
		userRepository.findByUsername(username).ifPresent(user -> {
			user.setAccountLoginFailureCount(0);
			userRepository.save(user);
			// セッションへ必要なユーザー情報のみセット
			sessionDto.setUsername(username);
			sessionDto.setAccountLoginFailureCount(user.getAccountLoginFailureCount());
			sessionDto.setEmail(user.getEmail());
			sessionDto.setCountry(user.getCountry());
			sessionDto.setBirthday(user.getBirthday());
			sessionService.setLoginUserData(sessionDto);
		});
	}

	/*
	 * アカウント認証失敗（ユーザー名 or パスワードを間違えた場合）
	 */
	@EventListener
	public void handleBadCredentialsEvent(AuthenticationFailureBadCredentialsEvent event) {
		// 入力されたユーザー名
		String username = event.getAuthentication().getName();
		SessionDto sessionDto = new SessionDto();
		// 存在するユーザ名でのログイン失敗（パスワード間違い）
		userRepository.findByUsername(username).ifPresent(user -> {
			user.setAccountLoginFailureCount(user.getAccountLoginFailureCount() + 1);
			userRepository.save(user);
			// セッションへ必要なユーザー情報のみセット
			sessionDto.setUsername(username);
			sessionDto.setAccountLoginFailureCount(user.getAccountLoginFailureCount());
			if (user.getAccountLoginFailureCount() == Constants.LOGIN_MAX_FAIL_COUNT) {
				sessionDto.setAccountLockedDate(Constants.CURRENT_DATE_TIME);
				user.setAccountLockedDate(Constants.CURRENT_DATE_TIME);
				userRepository.save(user);
			}
			sessionService.setLoginUserData(sessionDto);
		});
		
	}

	/*
	 * 無効なアカウント（enabledがFalse）
	 */
	@EventListener
	public void handleFailureDisabledEvent(AuthenticationFailureDisabledEvent event) {
		throw new PokedexException(HttpStatus.UNAUTHORIZED, "Your account is locked. Please verify your email and try again.");
	}

	/*
	 * アカウントロック
	 */
	@EventListener
	public void handleBadCredentialsEvent(AuthenticationFailureLockedEvent event) {
		String username = event.getAuthentication().getName();
	}

	/*
	 * パスワード有効期限切れ
	 */
	@EventListener
	public void handleBadCredentialsEvent(AuthenticationFailureCredentialsExpiredEvent event) {
		String username = event.getAuthentication().getName();
	}

	/*
	* アカウント有効期限切れ
	*/
	@EventListener
	public void handleBadCredentialsEvent(AuthenticationFailureExpiredEvent event) {
		String username = event.getAuthentication().getName();
	}
}