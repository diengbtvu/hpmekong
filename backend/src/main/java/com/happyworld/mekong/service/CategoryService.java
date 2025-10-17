package com.happyworld.mekong.service;

import com.happyworld.mekong.dto.response.CategoryResponse;
import com.happyworld.mekong.entity.Category;
import com.happyworld.mekong.exception.ResourceNotFoundException;
import com.happyworld.mekong.repository.CategoryRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class CategoryService {

    private final CategoryRepository categoryRepository;

    @Transactional(readOnly = true)
    public List<CategoryResponse> getAllCategories() {
        log.debug("Getting all categories");
        List<Category> categories = categoryRepository.findAll();
        return categories.stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public CategoryResponse getCategoryBySlug(String slug) {
        log.debug("Getting category by slug: {}", slug);
        Category category = categoryRepository.findBySlug(slug)
                .orElseThrow(() -> new ResourceNotFoundException("Category not found with slug: '" + slug + "'"));
        return convertToResponse(category);
    }

    @Transactional(readOnly = true)
    public CategoryResponse getCategoryById(Long id) {
        log.debug("Getting category by id: {}", id);
        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Category not found with id: " + id));
        return convertToResponse(category);
    }

    private CategoryResponse convertToResponse(Category category) {
        return CategoryResponse.builder()
                .id(category.getId())
                .name(category.getName())
                .slug(category.getSlug())
                .description(category.getDescription())
                .icon(category.getIcon())
                .build();
    }
}

