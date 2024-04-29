package pokedex.pxt.mbo.pokedex.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import pokedex.pxt.mbo.pokedex.payload.Account.EmailRequest;
import pokedex.pxt.mbo.pokedex.payload.Account.VerifyEmail;
import pokedex.pxt.mbo.pokedex.services.EmailService;

@RestController
@RequestMapping("/api/mail")
@CrossOrigin(origins = "http://localhost:3000")
public class EmailController {
	@Autowired
	private EmailService emailService;

	@PostMapping(value="/send-email", produces="application/vnd.mail.v1+json")
	public void sendEmail(@RequestBody EmailRequest emailRequest) {
		emailService.sendHtmlEmail(emailRequest.getTo());
	}
		
	// メール認証時のトークンチェック
	@GetMapping(value="/checkToken", produces="application/vnd.mail.v1+json")
	public ResponseEntity<String> checkToken(@RequestParam String token) {
		String response = emailService.chkEmailToken(token);
		if (response == "success") {
			return new ResponseEntity<String>(response, HttpStatus.OK);
		} else {
			return new ResponseEntity<String>(response, HttpStatus.NON_AUTHORITATIVE_INFORMATION);
		}
	}
		
	// メール再認証時
	@PostMapping(value="/verifyEmail", produces="application/vnd.mail.v1+json")
	public void verifyEmail(@RequestBody VerifyEmail verifyEmail) {
		emailService.verifyEmailAccount(verifyEmail);
	}
}
