package pokedex.pxt.mbo.pokedex.services.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.thymeleaf.context.Context;
import org.thymeleaf.spring6.SpringTemplateEngine;

import jakarta.mail.internet.MimeMessage;
import pokedex.pxt.mbo.pokedex.exception.PokedexException;
import pokedex.pxt.mbo.pokedex.services.EmailService;

@Service
public class EmailServiceImpl implements EmailService {

	@Autowired
	private JavaMailSender javaMailSender;
	@Autowired
	private SpringTemplateEngine templateEngine;
	private String EMAIL_TEMPLATE = "emailTemplateSignup";

	public void sendHtmlEmail(String to, String subject, String htmlBody) {
		try {
			Context context = new Context();
			String text = templateEngine.process(EMAIL_TEMPLATE, context);
			MimeMessage message = javaMailSender.createMimeMessage();
			MimeMessageHelper helper = new MimeMessageHelper(message, true);

			helper.setTo(to);
			helper.setFrom("Pokémon Customer Service Hiro <noreply.hiro@pokemon.com>");
			helper.setSubject("Pokémon Trainer Club Activation");
			helper.setText(text, true);

			javaMailSender.send(message);
		} catch (Exception ex) {
			throw new PokedexException("メール送信に失敗しました", ex.getCause().getMessage());
		}
	}

}
