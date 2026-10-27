package com.jira.dashboard;

import com.jira.model.DashboardResponse;
import com.jira.repo.ProjectRepository;
import com.jira.repo.TaskRepository;
import org.springframework.stereotype.Service;

@Service
public class DashboardService {

    private final ProjectRepository projectRepository;
    private final TaskRepository taskRepository;

    public DashboardService(ProjectRepository projectRepository,
                            TaskRepository taskRepository) {
        this.projectRepository = projectRepository;
        this.taskRepository = taskRepository;
    }

    public DashboardResponse getDashboard() {

        return new DashboardResponse(
                projectRepository.count(),
                taskRepository.count(),
                taskRepository.countByStatus("DONE"),
                taskRepository.countByStatus("TODO"),
                taskRepository.countByPriority("HIGH")
        );
    }
}