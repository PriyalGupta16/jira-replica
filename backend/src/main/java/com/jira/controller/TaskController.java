
package com.jira.controller;

import com.jira.model.Task;
import com.jira.repo.TaskRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tasks")
@CrossOrigin("*")
public class TaskController {

private final TaskRepository repo;

public TaskController(TaskRepository repo){
this.repo=repo;
}

@GetMapping
public List<Task> getTasks(

        @RequestParam(required = false) String status,
        @RequestParam(required = false) String priority,
        @RequestParam(required = false) String assignee,
        @RequestParam(required = false) String projectName
) {

    if (status != null)
        return repo.findByStatus(status);

    if (priority != null)
        return repo.findByPriority(priority);

    if (assignee != null)
        return repo.findByAssignee(assignee);

    if (projectName != null)
        return repo.findByProjectName(projectName);

    return repo.findAll();
}

@PostMapping
public Task create(@RequestBody Task t){
return repo.save(t);
}

@PutMapping("/{id}")
public Task update(@PathVariable Long id,@RequestBody Task t){

Task task=repo.findById(id).orElseThrow();

task.setTitle(t.getTitle());
task.setDescription(t.getDescription());
task.setStatus(t.getStatus());
task.setPriority(t.getPriority());
task.setStoryPoints(t.getStoryPoints());
task.setAssignee(t.getAssignee());
task.setProjectName(t.getProjectName());
task.setDueDate(t.getDueDate());
task.setWorkReport(t.getWorkReport());

return repo.save(task);
}

@DeleteMapping("/{id}")
public void delete(@PathVariable Long id){
repo.deleteById(id);
}
}
