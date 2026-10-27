package com.jira.repo;

import com.jira.model.Task;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TaskRepository extends JpaRepository<Task, Long> {

    List<Task> findByStatus(String status);

    List<Task> findByPriority(String priority);

    List<Task> findByAssignee(String assignee);

    List<Task> findByProjectName(String projectName);

    long countByStatus(String status);

    long countByPriority(String priority);
}