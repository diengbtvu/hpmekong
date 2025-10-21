package com.happyworld.mekong.service;

import com.happyworld.mekong.dto.request.CategoryRequest;
import com.happyworld.mekong.dto.response.CategoryResponse;
import com.happyworld.mekong.entity.Category;
import com.happyworld.mekong.exception.ResourceNotFoundException;
import com.happyworld.mekong.exception.BadRequestException;
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

    @Transactional
    public CategoryResponse createCategory(CategoryRequest request) {
        log.info("Creating category: {}", request.getName());
        
        // Check if slug already exists
        if (categoryRepository.existsBySlug(request.getSlug())) {
            throw new BadRequestException("Category với slug '" + request.getSlug() + "' đã tồn tại");
        }
        
        Category category = Category.builder()
                .name(request.getName())
                .slug(request.getSlug())
                .description(request.getDescription())
                .icon(request.getIcon())
                .color(request.getColor())
                .displayOrder(request.getDisplayOrder() != null ? request.getDisplayOrder() : 0)
                .isActive(request.getIsActive() != null ? request.getIsActive() : true)
                .build();
        
        // Set parent if provided
        if (request.getParentId() != null) {
            Category parent = categoryRepository.findById(request.getParentId())
                    .orElseThrow(() -> new ResourceNotFoundException("Parent category not found"));
            category.setParent(parent);
        }
        
        category = categoryRepository.save(category);
        log.info("Category created with ID: {}", category.getId());
        
        return convertToResponse(category);
    }
    
    @Transactional
    public CategoryResponse updateCategory(Long id, CategoryRequest request) {
        log.info("Updating category ID: {}", id);
        
        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Category not found"));
        
        // Check slug uniqueness if changed
        if (!category.getSlug().equals(request.getSlug()) 
                && categoryRepository.existsBySlug(request.getSlug())) {
            throw new BadRequestException("Category với slug '" + request.getSlug() + "' đã tồn tại");
        }
        
        category.setName(request.getName());
        category.setSlug(request.getSlug());
        category.setDescription(request.getDescription());
        category.setIcon(request.getIcon());
        category.setColor(request.getColor());
        category.setDisplayOrder(request.getDisplayOrder() != null ? request.getDisplayOrder() : 0);
        category.setIsActive(request.getIsActive() != null ? request.getIsActive() : true);
        
        // Update parent if provided
        if (request.getParentId() != null) {
            Category parent = categoryRepository.findById(request.getParentId())
                    .orElseThrow(() -> new ResourceNotFoundException("Parent category not found"));
            category.setParent(parent);
        } else {
            category.setParent(null);
        }
        
        category = categoryRepository.save(category);
        log.info("Category updated: {}", category.getId());
        
        return convertToResponse(category);
    }
    
    @Transactional
    public void deleteCategory(Long id) {
        log.info("Deleting category ID: {}", id);
        
        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Category not found"));
        
        // Soft delete
        category.softDelete();
        categoryRepository.save(category);
        
        log.info("Category deleted: {}", id);
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

