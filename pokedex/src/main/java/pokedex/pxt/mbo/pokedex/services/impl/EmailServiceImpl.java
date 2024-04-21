package pokedex.pxt.mbo.pokedex.services.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessResourceFailureException;
import org.springframework.mail.MailException;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.thymeleaf.context.Context;
import org.thymeleaf.spring6.SpringTemplateEngine;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import pokedex.pxt.mbo.pokedex.common.Constants;
import pokedex.pxt.mbo.pokedex.exception.PokedexException;
import pokedex.pxt.mbo.pokedex.repository.TokenRepository;
import pokedex.pxt.mbo.pokedex.repository.UserRepository;
import pokedex.pxt.mbo.pokedex.services.EmailService;

@Service
public class EmailServiceImpl implements EmailService {

	@Autowired
	private JavaMailSender javaMailSender;
	@Autowired
	private SpringTemplateEngine templateEngine;
	private String EMAIL_TEMPLATE = "emailTemplateSignup";
	private String URL = "http://localhost:3000/verifyaccount/3?token=";

	@Autowired
	private UserRepository userRepository;
	@Autowired
	private TokenRepository tokenRepository;

	/**
	 * サインアップ時の認証メールを送信
	 * 
	 * @param to <String> 送信先
	 */
	public void sendHtmlEmail(String to) {
		try {
			Context context = new Context();
			userRepository.findByEmail(to)
					.ifPresentOrElse(
							user -> {
								String token = user.getToken().getToken();
								context.setVariable("url", URL + token);
							},
							() -> {
								throw new PokedexException("メールアドレスが見つかりませんでした。(email: " + to + ")");
							});
			String text = templateEngine.process(EMAIL_TEMPLATE, context);
			MimeMessage message = javaMailSender.createMimeMessage();
			MimeMessageHelper helper = new MimeMessageHelper(message, true);

			helper.setTo(to);
			helper.setFrom(Constants.MAIL.get("FROM"));
			helper.setSubject(Constants.MAIL.get("SUBJECT"));
			helper.setText(text, true);

			javaMailSender.send(message);
		} catch (MessagingException ex) {
			throw new PokedexException("メール作成に失敗しました", ex.getCause().getMessage());
		} catch (MailException ex) {
			throw new PokedexException("メール送信に失敗しました", ex.getCause().getMessage());
		}
	}

	/**
	 * メール認証時のトークン確認
	 * 
	 * @param token <String> トークン
	 */
	public String chkEmailToken(String token) {
		try {
			return (tokenRepository.findByToken(token)
					.map(_token -> Constants.CURRENT_DATE_TIME.isBefore(_token.getCreatedDate().plusHours(48)))
					.orElseThrow(() -> new PokedexException("トークンが見つかりませんでした。(token: " + token + ")")))
					? "success" : "fail";
		} catch (DataAccessResourceFailureException ex) {
			throw new PokedexException("トークン認証に失敗しました。", ex.getCause().getMessage());
		}
	}
}
