package pokedex.pxt.mbo.pokedex.services;

import org.springframework.stereotype.Service;

@Service
public interface EmailService {
	public void sendHtmlEmail(String to, String subject, String htmlBody);
}
