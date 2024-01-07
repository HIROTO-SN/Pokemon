package pokedex.pxt.mbo.pokedex.services.test;

import pokedex.pxt.mbo.pokedex.payload.test.PostDto;
import pokedex.pxt.mbo.pokedex.payload.test.PostResponse;

public interface PostService {

	PostDto createPost(PostDto postDto);

	PostResponse getAllPosts(int pageNo, int pageSize, String sortBy, String sortDir);

	PostDto getPostById(long id);

	PostDto updatePost(PostDto postDto, long id);

	void deletePostById(long id);
}