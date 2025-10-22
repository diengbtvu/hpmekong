package com.happyworld.mekong.service;

import com.happyworld.mekong.dto.request.PostCreateRequest;
import com.happyworld.mekong.dto.request.PostRequest;
import com.happyworld.mekong.dto.response.CategoryResponse;
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
                .viewCount(0)
                .commentCount(0)
                .likeCount(0)
                .shareCount(0)
                .metaTitle(request.getMetaTitle())
                .metaDescription(request.getMetaDescription())
                .metaKeywords(request.getMetaKeywords())
                .build();

        Post savedPost = postRepository.save(post);
        log.info("Post created: {} (ID: {})", savedPost.getTitle(), savedPost.getId());

        return mapToPostResponse(savedPost);
    }

    @Transactional
    public PostResponse getPostBySlug(String slug) {
        Post post = postRepository.findBySlug(slug)
                .orElseThrow(() -> new ResourceNotFoundException("Post", "slug", slug));

        // Increment view count
        Integer currentViewCount = post.getViewCount() != null ? post.getViewCount() : 0;
        post.setViewCount(currentViewCount + 1);
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
                .viewCount(post.getViewCount() != null ? post.getViewCount() : 0)
                .commentCount(post.getCommentCount() != null ? post.getCommentCount() : 0)
                .likeCount(post.getLikeCount() != null ? post.getLikeCount() : 0)
                .shareCount(post.getShareCount() != null ? post.getShareCount() : 0)
                .publishedAt(post.getPublishedAt())
                .createdAt(post.getCreatedAt())
                .updatedAt(post.getUpdatedAt());

        // Category
        if (post.getCategory() != null) {
            builder.category(CategoryResponse.builder()
                    .id(post.getCategory().getId())
                    .name(post.getCategory().getName())
                    .slug(post.getCategory().getSlug())
                    .description(post.getCategory().getDescription())
                    .icon(post.getCategory().getIcon())
                    .color(post.getCategory().getColor())
                    .displayOrder(post.getCategory().getDisplayOrder())
                    .build());
        }

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
    public PostResponse createPostAdmin(PostRequest request, String userEmail) {
        log.info("Admin creating post: {} by user: {}", request.getTitle(), userEmail);
        
        // Get author from authenticated user
        User author = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with email: " + userEmail));

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
                .viewCount(0)
                .commentCount(0)
                .likeCount(0)
                .shareCount(0)
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

