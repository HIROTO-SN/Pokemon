package pokedex.pxt.mbo.pokedex.services.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import jakarta.mail.internet.MimeMessage;
import pokedex.pxt.mbo.pokedex.exception.PokedexException;
import pokedex.pxt.mbo.pokedex.services.EmailService;

@Service
public class EmailServiceImpl implements EmailService {

	@Autowired
	private JavaMailSender javaMailSender;

	public void sendHtmlEmail(String to, String subject, String htmlBody) {
		MimeMessage message = javaMailSender.createMimeMessage();
		try {
			MimeMessageHelper helper = new MimeMessageHelper(message, true);

			helper.setTo(to);
			helper.setSubject(subject);
			helper.setText(htmlBody, true);

			javaMailSender.send(message);
		} catch (Exception ex) {
			throw new PokedexException("メール送信に失敗しました", ex.getCause().getMessage());
		}
	}

}
