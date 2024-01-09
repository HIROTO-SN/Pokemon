package pokedex.pxt.mbo.pokedex.security;

import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.context.event.EventListener;
import org.springframework.security.authentication.event.AuthenticationFailureBadCredentialsEvent;
import org.springframework.security.authentication.event.AuthenticationFailureCredentialsExpiredEvent;
import org.springframework.security.authentication.event.AuthenticationFailureDisabledEvent;
import org.springframework.security.authentication.event.AuthenticationFailureExpiredEvent;
import org.springframework.security.authentication.event.AuthenticationFailureLockedEvent;
import org.springframework.security.authentication.event.AuthenticationFailureServiceExceptionEvent;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import pokedex.pxt.mbo.pokedex.common.Constants;
import pokedex.pxt.mbo.pokedex.entity.User;
import pokedex.pxt.mbo.pokedex.repository.UserRepository;

@Service
public class CustomUserDetailService implements UserDetailsService {

	private UserRepository userRepository;

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
		Set<GrantedAuthority> authorities = user
			.getRoles()
			.stream()
			.map((role) -> new SimpleGrantedAuthority(role.getName()))
			.collect(Collectors.toSet());

		return new org.springframework.security.core.userdetails.User(
			user.getUsername(),
			user.getPassword(),
			user.isAccountEnabled(),
			(!user.getAccountExpiration().isBefore(Constants.TODAY)),
			(!user.getAccountPasswordExpiration().isBefore(Constants.TODAY)),
			(user.getAccountLoginFailureCount() < Constants.LOGIN_MAX_FAIL_COUNT),
			authorities);
	}

	/*
	 * アカウント認証失敗（ユーザー名、パスワードなどを間違えた場合）
	 */
	@EventListener
	public void handleBadCredentialsEvent(AuthenticationFailureBadCredentialsEvent event) {
		if (event.getException().getClass().equals(UsernameNotFoundException.class)) {
			// 存在しないユーザ名でのログイン失敗
		} else {
			// 存在するユーザ名でのログイン失敗
		}
		String username = event.getAuthentication().getName();
	}

	/*
	 * 無効なアカウント（enabledがFalse）
	 */
	@EventListener
	public void handleFailureDisabledEvent(AuthenticationFailureDisabledEvent event) {
		String username = event.getAuthentication().getName();
	}

	/*
	 * アカウントロック（
	 */
	@EventListener
	public void handleBadCredentialsEvent(AuthenticationFailureLockedEvent event) {
		String username = event.getAuthentication().getName();
	}

	/*
	 * アカウント有効期限切れ
	 */
	@EventListener
	public void handleBadCredentialsEvent(AuthenticationFailureCredentialsExpiredEvent event) {
		String username = event.getAuthentication().getName();
	}

	/*
	* パスワード有効期限切れ
	*/
	@EventListener
	public void handleBadCredentialsEvent(AuthenticationFailureExpiredEvent event) {
		String username = event.getAuthentication().getName();
	}

	/*
	* パスワード有効期限切れ
	*/
	@EventListener
	public void handleBadCredentialsEvent(AuthenticationFailureServiceExceptionEvent event) {
		String username = event.getAuthentication().getName();
	}
}