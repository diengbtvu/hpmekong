package com.happyworld.mekong.service;

import com.happyworld.mekong.dto.request.PostCreateRequest;
import com.happyworld.mekong.dto.request.PostRequest;
import com.happyworld.mekong.dto.response.PostResponse;
import com.happyworld.mekong.entity.Post;
import com.happyworld.mekong.entity.PostCategory;
import com.happyworld.mekong.entity.User;
import com.happyworld.mekong.exception.ResourceNotFoundException;
import com.happyworld.mekong.repository.PostRepository;
import com.happyworld.mekong.repository.UserRepository;
import com.happyworld.mekong.util.SlugUtils;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
@Slf4j
public class PostService {

    private final PostRepository postRepository;
    private final UserRepository userRepository;
    private final SlugUtils slugUtils;

    @Transactional
    public PostResponse createPost(Long authorId, PostCreateRequest request) {
        log.info("Creating post: {}", request.getTitle());

        User author = userRepository.findById(authorId)
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", authorId));

        // Generate unique slug
        String baseSlug = slugUtils.generateSlug(request.getTitle());
        String slug = baseSlug;
        int attempt = 0;
        while (postRepository.existsBySlug(slug)) {
            attempt++;
            slug = slugUtils.generateUniqueSlug(baseSlug, attempt);
        }

        Post post = Post.builder()
                .title(request.getTitle())
                .slug(slug)
                .excerpt(request.getExcerpt())
                .content(request.getContent())
                .featuredImageUrl(request.getFeaturedImageUrl())
                .author(author)
                .status(Post.PostStatus.DRAFT)
                .isFeatured(request.getIsFeatured())
                .allowComments(request.getAllowComments())
                .metaTitle(request.getMetaTitle())
                .metaDescription(request.getMetaDescription())
                .metaKeywords(request.getMetaKeywords())
                .build();

        Post savedPost = postRepository.save(post);
        log.info("Post created: {} (ID: {})", savedPost.getTitle(), savedPost.getId());

        return mapToPostResponse(savedPost);
    }

    @Transactional(readOnly = true)
    public PostResponse getPostBySlug(String slug) {
        Post post = postRepository.findBySlug(slug)
                .orElseThrow(() -> new ResourceNotFoundException("Post", "slug", slug));

        // Increment view count
        post.setViewCount(post.getViewCount() + 1);
        postRepository.save(post);

        return mapToPostResponse(post);
    }

    @Transactional(readOnly = true)
    public Page<PostResponse> getPublishedPosts(Pageable pageable) {
        Page<Post> posts = postRepository.findAllByStatusAndDeletedAtIsNull(
                Post.PostStatus.PUBLISHED, pageable);
        return posts.map(this::mapToPostResponse);
    }

    @Transactional
    public PostResponse publishPost(Long id) {
        Post post = postRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Post", "id", id));

        post.setStatus(Post.PostStatus.PUBLISHED);
        post.setPublishedAt(LocalDateTime.now());

        Post updated = postRepository.save(post);
        log.info("Post published: {} (ID: {})", updated.getTitle(), updated.getId());

        return mapToPostResponse(updated);
    }

    @Transactional
    public void deletePost(Long id) {
        Post post = postRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Post", "id", id));

        post.softDelete();
        postRepository.save(post);
        log.info("Post deleted: {} (ID: {})", post.getTitle(), post.getId());
    }

    private PostResponse mapToPostResponse(Post post) {
        PostResponse.PostResponseBuilder builder = PostResponse.builder()
                .id(post.getId())
                .title(post.getTitle())
                .slug(post.getSlug())
                .excerpt(post.getExcerpt())
                .content(post.getContent())
                .featuredImageUrl(post.getFeaturedImageUrl())
                .status(post.getStatus().name())
                .isFeatured(post.getIsFeatured())
                .allowComments(post.getAllowComments())
                .viewCount(post.getViewCount())
                .commentCount(post.getCommentCount())
                .likeCount(post.getLikeCount())
                .shareCount(post.getShareCount())
                .publishedAt(post.getPublishedAt())
                .createdAt(post.getCreatedAt())
                .updatedAt(post.getUpdatedAt());

        // Author
        if (post.getAuthor() != null) {
            builder.author(PostResponse.AuthorResponse.builder()
                    .id(post.getAuthor().getId())
                    .name(post.getAuthor().getProfile() != null ? 
                            post.getAuthor().getProfile().getFullName() : 
                            post.getAuthor().getEmail())
                    .avatarUrl(post.getAuthor().getProfile() != null ? 
                            post.getAuthor().getProfile().getAvatarUrl() : null)
                    .build());
        }

        return builder.build();
    }

    @Transactional(readOnly = true)
    public Page<PostResponse> getAllPostsAdmin(Pageable pageable) {
        log.debug("Admin getting all posts");
        return postRepository.findAll(pageable).map(this::mapToPostResponse);
    }

    @Transactional
    public PostResponse createPostAdmin(PostRequest request) {
        log.info("Admin creating post: {}", request.getTitle());
        
        // Get author (default to admin user ID 1 if not specified)
        User author = userRepository.findById(request.getAuthorId() != null ? request.getAuthorId() : 1L)
                .orElseThrow(() -> new ResourceNotFoundException("Author not found"));

        Post post = Post.builder()
                .title(request.getTitle())
                .slug(request.getSlug())
                .excerpt(request.getExcerpt())
                .content(request.getContent())
                .featuredImageUrl(request.getFeaturedImageUrl())
                .author(author)
                .status(request.getStatus() != null ? Post.PostStatus.valueOf(request.getStatus()) : Post.PostStatus.DRAFT)
                .isFeatured(request.getIsFeatured())
                .allowComments(request.getAllowComments())
                .metaTitle(request.getMetaTitle())
                .metaDescription(request.getMetaDescription())
                .metaKeywords(request.getMetaKeywords())
                .build();

        // Category handling can be added later when PostCategoryRepository is created

        post = postRepository.save(post);
        return mapToPostResponse(post);
    }

    @Transactional
    public PostResponse updatePostAdmin(Long id, PostRequest request) {
        log.info("Admin updating post: {}", id);
        
        Post post = postRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Post not found"));

        post.setTitle(request.getTitle());
        post.setSlug(request.getSlug());
        post.setExcerpt(request.getExcerpt());
        post.setContent(request.getContent());
        post.setFeaturedImageUrl(request.getFeaturedImageUrl());
        post.setStatus(request.getStatus() != null ? Post.PostStatus.valueOf(request.getStatus()) : post.getStatus());
        post.setIsFeatured(request.getIsFeatured());
        post.setAllowComments(request.getAllowComments());
        post.setMetaTitle(request.getMetaTitle());
        post.setMetaDescription(request.getMetaDescription());
        post.setMetaKeywords(request.getMetaKeywords());

        // Category handling can be added later when PostCategoryRepository is created

        if (request.getAuthorId() != null) {
            User author = userRepository.findById(request.getAuthorId())
                    .orElseThrow(() -> new ResourceNotFoundException("Author not found"));
            post.setAuthor(author);
        }

        post = postRepository.save(post);
        return mapToPostResponse(post);
    }
}

