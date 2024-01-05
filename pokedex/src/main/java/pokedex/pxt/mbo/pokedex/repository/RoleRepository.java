package pokedex.pxt.mbo.pokedex.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import pokedex.pxt.mbo.pokedex.entity.Role;

public interface RoleRepository extends JpaRepository<Role, Long> {
	
	public Optional<Role> findByName(String name);

}
