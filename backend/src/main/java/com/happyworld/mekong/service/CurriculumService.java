package com.happyworld.mekong.service;

import com.happyworld.mekong.dto.request.LessonRequest;
import com.happyworld.mekong.dto.request.ModuleRequest;
import com.happyworld.mekong.dto.response.LessonResponse;
import com.happyworld.mekong.dto.response.ModuleResponse;
import com.happyworld.mekong.entity.Course;
import com.happyworld.mekong.entity.CourseModule;
import com.happyworld.mekong.entity.Lesson;
import com.happyworld.mekong.exception.ResourceNotFoundException;
import com.happyworld.mekong.repository.CourseModuleRepository;
import com.happyworld.mekong.repository.CourseRepository;
import com.happyworld.mekong.repository.LessonRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class CurriculumService {

    private final CourseRepository courseRepository;
    private final CourseModuleRepository moduleRepository;
    private final LessonRepository lessonRepository;

    @Transactional(readOnly = true)
    public List<ModuleResponse> getCourseModules(Long courseId) {
        Course course = courseRepository.findById(courseId)
                .orElseThrow(() -> new ResourceNotFoundException("Course", "id", courseId));

        List<CourseModule> modules = moduleRepository.findByCourseIdOrderByDisplayOrderAsc(courseId);
        return modules.stream()
                .map(this::mapToModuleResponse)
                .collect(Collectors.toList());
    }

    @Transactional
    public ModuleResponse createModule(Long courseId, ModuleRequest request) {
        Course course = courseRepository.findById(courseId)
                .orElseThrow(() -> new ResourceNotFoundException("Course", "id", courseId));

        CourseModule module = CourseModule.builder()
                .course(course)
                .title(request.getTitle())
                .description(request.getDescription())
                .displayOrder(request.getDisplayOrder() != null ? request.getDisplayOrder() : 0)
                .build();

        module = moduleRepository.save(module);

        // Create lessons if provided
        if (request.getLessons() != null && !request.getLessons().isEmpty()) {
            for (LessonRequest lessonReq : request.getLessons()) {
                Lesson lesson = createLessonEntity(module, lessonReq);
                module.getLessons().add(lesson);
            }
            moduleRepository.save(module);
        }

        log.info("Created module: {} for course: {}", module.getTitle(), courseId);
        return mapToModuleResponse(module);
    }

    @Transactional
    public ModuleResponse updateModule(Long moduleId, ModuleRequest request) {
        CourseModule module = moduleRepository.findById(moduleId)
                .orElseThrow(() -> new ResourceNotFoundException("Module", "id", moduleId));

        module.setTitle(request.getTitle());
        module.setDescription(request.getDescription());
        if (request.getDisplayOrder() != null) {
            module.setDisplayOrder(request.getDisplayOrder());
        }

        module = moduleRepository.save(module);
        log.info("Updated module: {}", moduleId);
        return mapToModuleResponse(module);
    }

    @Transactional
    public void deleteModule(Long moduleId) {
        CourseModule module = moduleRepository.findById(moduleId)
                .orElseThrow(() -> new ResourceNotFoundException("Module", "id", moduleId));

        moduleRepository.delete(module);
        log.info("Deleted module: {}", moduleId);
    }

    @Transactional
    public LessonResponse createLesson(Long moduleId, LessonRequest request) {
        CourseModule module = moduleRepository.findById(moduleId)
                .orElseThrow(() -> new ResourceNotFoundException("Module", "id", moduleId));

        Lesson lesson = createLessonEntity(module, request);
        lesson = lessonRepository.save(lesson);

        log.info("Created lesson: {} for module: {}", lesson.getTitle(), moduleId);
        return mapToLessonResponse(lesson);
    }

    @Transactional
    public LessonResponse updateLesson(Long lessonId, LessonRequest request) {
        Lesson lesson = lessonRepository.findById(lessonId)
                .orElseThrow(() -> new ResourceNotFoundException("Lesson", "id", lessonId));

        lesson.setTitle(request.getTitle());
        lesson.setDescription(request.getDescription());
        if (request.getType() != null) {
            lesson.setType(Lesson.LessonType.valueOf(request.getType().toUpperCase()));
        }
        lesson.setContentUrl(request.getContentUrl());
        lesson.setDurationMinutes(request.getDurationMinutes());
        if (request.getDisplayOrder() != null) {
            lesson.setDisplayOrder(request.getDisplayOrder());
        }
        lesson.setIsPreview(request.getIsPreview());
        lesson.setIsFree(request.getIsFree());

        lesson = lessonRepository.save(lesson);
        log.info("Updated lesson: {}", lessonId);
        return mapToLessonResponse(lesson);
    }

    @Transactional
    public void deleteLesson(Long lessonId) {
        Lesson lesson = lessonRepository.findById(lessonId)
                .orElseThrow(() -> new ResourceNotFoundException("Lesson", "id", lessonId));

        lessonRepository.delete(lesson);
        log.info("Deleted lesson: {}", lessonId);
    }

    private Lesson createLessonEntity(CourseModule module, LessonRequest request) {
        Lesson lesson = Lesson.builder()
                .module(module)
                .courseId(module.getCourse().getId())
                .title(request.getTitle())
                .description(request.getDescription())
                .type(request.getType() != null ? Lesson.LessonType.valueOf(request.getType().toUpperCase()) : Lesson.LessonType.VIDEO)
                .contentUrl(request.getContentUrl())
                .durationMinutes(request.getDurationMinutes() != null ? request.getDurationMinutes() : 0)
                .displayOrder(request.getDisplayOrder() != null ? request.getDisplayOrder() : 0)
                .isPreview(request.getIsPreview() != null ? request.getIsPreview() : false)
                .isFree(request.getIsFree() != null ? request.getIsFree() : false)
                .build();
        
        return lesson;
    }

    private ModuleResponse mapToModuleResponse(CourseModule module) {
        List<LessonResponse> lessons = module.getLessons().stream()
                .map(this::mapToLessonResponse)
                .collect(Collectors.toList());

        int totalDuration = lessons.stream()
                .mapToInt(LessonResponse::getDurationMinutes)
                .sum();

        return ModuleResponse.builder()
                .id(module.getId())
                .title(module.getTitle())
                .description(module.getDescription())
                .displayOrder(module.getDisplayOrder())
                .durationMinutes(totalDuration)
                .lessons(lessons)
                .build();
    }

    private LessonResponse mapToLessonResponse(Lesson lesson) {
        return LessonResponse.builder()
                .id(lesson.getId())
                .title(lesson.getTitle())
                .description(lesson.getDescription())
                .type(lesson.getType().name())
                .contentUrl(lesson.getContentUrl())
                .durationMinutes(lesson.getDurationMinutes())
                .displayOrder(lesson.getDisplayOrder())
                .isPreview(lesson.getIsPreview())
                .isFree(lesson.getIsFree())
                .build();
    }
}
