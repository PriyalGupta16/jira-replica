
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
public List<Task> getAll(){
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

return repo.save(task);
}

@DeleteMapping("/{id}")
public void delete(@PathVariable Long id){
repo.deleteById(id);
}
}
