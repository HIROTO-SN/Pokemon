package pokedex.pxt.mbo.pokedex.entity;

import java.time.LocalDateTime;

import org.springframework.data.annotation.LastModifiedDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "users")
public class Token {

	@Id
	@Column(name = "user_id", updatable = false)
	private Long userId;

	@Column(name = "token")
	private String token;

	@Column(name = "created_date", updatable = false)
	private LocalDateTime createdDate;

	@Column(name = "update_date")
	@LastModifiedDate
	private LocalDateTime updateDate;
}
