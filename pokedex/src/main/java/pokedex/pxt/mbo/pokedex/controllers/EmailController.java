package pokedex.pxt.mbo.pokedex.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import pokedex.pxt.mbo.pokedex.payload.Account.EmailRequest;
import pokedex.pxt.mbo.pokedex.services.EmailService;

@RestController
@RequestMapping("/api/mail")
@CrossOrigin(origins = "http://localhost:3000")
public class EmailController {
	@Autowired
	private EmailService emailService;

	@PostMapping("/send-email")
	public void sendEmail(@RequestBody EmailRequest emailRequest) {
		// emailService.sendHtmlEmail(emailRequest.getTo(), emailRequest.getSubject(), emailRequest.getText());
		emailService.sendHtmlEmail(emailRequest.getTo());
		System.out.println("Email sent successfully!");
	}
}
