package com.example.todo.service;

import com.example.todo.dto.TaskDTO;
import com.example.todo.model.Task;
import com.example.todo.repository.TaskRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TaskService {
    private final TaskRepository taskRepository;

    public TaskService(TaskRepository taskRepository) {
        this.taskRepository = taskRepository;
    }

    public Task getTaskById(Integer id){
        return taskRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Task not found :" + id));
    }

    public List<Task> getAllTasks() {
        return taskRepository.findAll();
    }

    public Task createTask(TaskDTO taskDTO) {
        Task task = new Task();
        task.setTitle(taskDTO.getTitle());
        task.setDescription(taskDTO.getDescription());
        task.setDueDate(taskDTO.getDueDate());
        task.setCategory(taskDTO.getCategory());
        taskRepository.save(task);
        return task;
    }

    public Task updateTask(Integer id, TaskDTO taskDTO) {
        Task task = getTaskById(id);
        if(task == null) throw new RuntimeException("Task not found :" + id);
        task.setTitle(taskDTO.getTitle());
        task.setDescription(taskDTO.getDescription());
        task.setDueDate(taskDTO.getDueDate());
        task.setCategory(taskDTO.getCategory());
        taskRepository.save(task);
        return task;
    }
}
