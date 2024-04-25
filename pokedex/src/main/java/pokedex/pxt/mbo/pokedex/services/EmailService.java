package pokedex.pxt.mbo.pokedex.services;

import org.springframework.stereotype.Service;

import pokedex.pxt.mbo.pokedex.payload.Account.VerifyEmail;

@Service
public interface EmailService {
	public void sendHtmlEmail(String to);
	public String chkEmailToken(String token);
	public void verifyEmailAccount(VerifyEmail verifyEmail);
}
