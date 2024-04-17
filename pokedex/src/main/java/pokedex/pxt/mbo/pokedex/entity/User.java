package pokedex.pxt.mbo.pokedex.entity;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Set;

import org.springframework.data.annotation.LastModifiedDate;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
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
public class User {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long user_id;
	
	@Column(nullable = false, unique = true)
	private String username;

	@Column(nullable = false)
	private String password;

	@Column(nullable = false, unique = true)
	private String email;

	private String country;

	private LocalDate birthday;
	
	@Column(name = "screen_name")
	private String screenName;

	@Column(name = "news_receive_flg")
	private boolean newsInfoReceiveFlg = false;
	
	@Column(name = "update_receive_flg")
	private boolean updateCenterReceiveFlg = false;

	@Column(name = "disp_profile_flg")
	private boolean displayPokeClubProfile = true;
	
	@Column(name = "account_enabled")
	private boolean accountEnabled = true;

	@Column(name = "account_expiration")
	private LocalDate accountExpiration;

	@Column(name = "account_password_expiration")
	private LocalDate accountPasswordExpiration;

	@Column(name = "account_login_failure_count")
	private int accountLoginFailureCount;
	
	@Column(name = "account_locked_date")
	private LocalDateTime accountLockedDate;

	@Column(name = "verified_flg")
	private boolean verifiedFlg = false;

	@Column(name = "created_date", updatable = false)
	private LocalDateTime createdDate;
	
	@Column(name = "update_date")
	@LastModifiedDate
	private LocalDateTime updateDate;

	@ManyToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
	@JoinTable(name = "users_roles", 
					joinColumns = @JoinColumn(name = "user_id", referencedColumnName = "user_id"),
					inverseJoinColumns = @JoinColumn(name = "role_id", referencedColumnName = "role_id"))
	private Set<Role> roles;

}
