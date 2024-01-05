package pokedex.pxt.mbo.pokedex.services.test.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import pokedex.pxt.mbo.pokedex.entity.test.Post;
import pokedex.pxt.mbo.pokedex.exception.ResourceNotFoundException;
import pokedex.pxt.mbo.pokedex.payload.test.PostDto;
import pokedex.pxt.mbo.pokedex.payload.test.PostResponse;
import pokedex.pxt.mbo.pokedex.repository.test.PostRepository;
import pokedex.pxt.mbo.pokedex.services.test.PostService;

@Service
public class PostServiceImpl implements PostService{

	private PostRepository postRepository;

	public PostServiceImpl(PostRepository postRepository) {
		this.postRepository = postRepository;
	}

	@Override
	public PostDto createPost(PostDto postDto) {

		// DTO to entity 変換
		Post post = mapToEntity(postDto);

		Post newPost = postRepository.save(post);

		// entity to Dto 変換
		PostDto postReponse = mapToDTO(newPost);

		return postReponse;
	}

	/**
	 * 全てのブログポストを取得
	 */
	@Override
	public PostResponse getAllPosts(int pageNo, int pageSize, String sortBy, String sortDir) {
		
		// Sortオブジェクトを作成し昇順、降順判定
		Sort sort = sortDir.equalsIgnoreCase(Sort.Direction.ASC.name()) 
							? Sort.by(sortBy).ascending()
							: Sort.by(sortBy).descending();
		// Pageableインスタンスを作成
		Pageable pageable = PageRequest.of(pageNo, pageSize, sort);
				
		Page<Post> posts = postRepository.findAll(pageable);

		// Pageオブジェクトからコンテントを取得
		List<Post> ListOfPosts = posts.getContent();

		// Post型のリストをPostDto型へ変換
		List<PostDto> content = ListOfPosts.stream().map(post -> mapToDTO(post)).collect(Collectors.toList());

		// PostDto型からPostResponse型へ変換
		PostResponse postReponse = new PostResponse();
		postReponse.setContent(content);
		postReponse.setPageNo(posts.getNumber());
		postReponse.setPageSize(posts.getSize());;
		postReponse.setTotalElement(posts.getTotalElements());;
		postReponse.setTotalPages(posts.getTotalPages());;
		postReponse.setLast(posts.isLast());

		return postReponse;
	}

	/**
	 * 特定ブログポストを取得
	 * @param id 投稿ID
	 */
	@Override
	public PostDto getPostById(long id) {
		Post post = postRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Post", "id", id));
		return mapToDTO(post);
	}

	/**
	 * 特定ブログポストを更新
	 * @param postDto 投稿内容オブジェクト
	 * @param id 投稿ID
	 */
	@Override
	public PostDto updatePost(PostDto postDto, long id) {
		Post post = postRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Post", "id", id));
		
		// DBへ更新内容を登録
		post.setTitle(postDto.getTitle());
		post.setDescription(postDto.getDescription());
		post.setContent(postDto.getContent());
		Post updatedPost  = postRepository.save(post);

		return mapToDTO(updatedPost);
	}

	/**
	 * 特定ブログポストを削除
	 * @param id 投稿ID
	 */
	@Override
	public void deletePostById(long id) {
		Post post = postRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Post", "id", id));
		postRepository.delete(post);
	}

	// Entity to Dto 変換 メソッド
	private PostDto mapToDTO(Post post) {
		// PostDto postDto = mapper.map(post, PostDto.class);
		PostDto postDto = new PostDto();
		postDto.setId(post.getId());
		postDto.setTitle(post.getTitle());
		postDto.setDescription(post.getDescription());
		postDto.setContent(post.getContent());
		return postDto;
	}

	// DTO to entity 変換 メソッド
	private Post mapToEntity(PostDto postDto) {
		// Post post = mapper.map(postDto, Post.class);
		Post post = new Post();
		post.setTitle(postDto.getTitle());
		post.setDescription(postDto.getDescription());
		post.setContent(postDto.getContent());
		return post;
	}
	
}
