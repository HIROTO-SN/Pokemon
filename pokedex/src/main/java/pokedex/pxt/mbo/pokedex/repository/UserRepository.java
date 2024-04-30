package pokedex.pxt.mbo.pokedex.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import pokedex.pxt.mbo.pokedex.entity.User;

public interface UserRepository extends JpaRepository<User, Long> {
	
	public Optional<User> findByEmail(String email);

	public Optional<User> findByUsername(String username);

	@Query("SELECT u.user_id FROM User u WHERE u.username = :username")
	public Long findByUsernameForId(String username);

	public Boolean existsByUsername(String username);

	public Boolean existsByScreenName(String screenName);

	public Boolean existsByEmail(String email);
}
