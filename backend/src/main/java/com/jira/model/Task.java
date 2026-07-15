
package com.jira.model;

import jakarta.persistence.*;

@Entity
public class Task {

@Id
@GeneratedValue(strategy = GenerationType.IDENTITY)
private Long id;

private String title;
private String description;
private String status;
private String priority;
private Integer storyPoints;
private String assignee;

public Long getId(){return id;}

public String getTitle(){return title;}
public void setTitle(String title){this.title=title;}

public String getDescription(){return description;}
public void setDescription(String description){this.description=description;}

public String getStatus(){return status;}
public void setStatus(String status){this.status=status;}

public String getPriority(){return priority;}
public void setPriority(String priority){this.priority=priority;}

public Integer getStoryPoints(){return storyPoints;}
public void setStoryPoints(Integer storyPoints){this.storyPoints=storyPoints;}

public String getAssignee(){return assignee;}
public void setAssignee(String assignee){this.assignee=assignee;}
}
