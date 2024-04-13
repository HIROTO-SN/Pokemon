package pokedex.pxt.mbo.pokedex.services.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.thymeleaf.context.Context;
import org.thymeleaf.spring6.SpringTemplateEngine;

import jakarta.mail.internet.MimeMessage;
import pokedex.pxt.mbo.pokedex.common.Constants;
import pokedex.pxt.mbo.pokedex.exception.PokedexException;
import pokedex.pxt.mbo.pokedex.services.EmailService;

@Service
public class EmailServiceImpl implements EmailService {

	@Autowired
	private JavaMailSender javaMailSender;
	@Autowired
	private SpringTemplateEngine templateEngine;
	private String EMAIL_TEMPLATE = "emailTemplateSignup";

	/**
	 * サインアップ時の認証メールを送信
	 * 
	 * @param to <String> 送信先
	 */
	public void sendHtmlEmail(String to) {
		try {
			Context context = new Context();
			String text = templateEngine.process(EMAIL_TEMPLATE, context);
			MimeMessage message = javaMailSender.createMimeMessage();
			MimeMessageHelper helper = new MimeMessageHelper(message, true);

			helper.setTo(to);
			helper.setFrom(Constants.MAIL.get("FROM"));
			helper.setSubject(Constants.MAIL.get("SUBJECT"));
			helper.setText(text, true);

			javaMailSender.send(message);
		} catch (Exception ex) {
			throw new PokedexException("メール送信に失敗しました", ex.getCause().getMessage());
		}
	}

}
