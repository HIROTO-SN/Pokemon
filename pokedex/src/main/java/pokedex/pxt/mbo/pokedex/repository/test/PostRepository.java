package pokedex.pxt.mbo.pokedex.repository.test;

import org.springframework.data.jpa.repository.JpaRepository;

import pokedex.pxt.mbo.pokedex.entity.test.Post;

public interface PostRepository extends JpaRepository<Post, Long> {
	// JpaRepository internally implements all necessary functions
}
