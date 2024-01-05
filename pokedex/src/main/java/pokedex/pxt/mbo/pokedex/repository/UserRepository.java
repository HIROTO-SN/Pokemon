package pokedex.pxt.mbo.pokedex.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import pokedex.pxt.mbo.pokedex.entity.User;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
	
	public Optional<User> findByEmail(String email);

	public Optional<User> findByUsername(String username);
	
	public Boolean existsByUsername(String username);

	public Boolean existsByEmail(String email);
}
