package com.example.todo.model;

import jakarta.persistence.*;
import lombok.*;

import java.util.Date;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "tasks")
public class Task {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer taskId;

    private String title;
    private String description;
    private Date addedDate;
    private Date dueDate;
    private String category;

    @PrePersist
    protected void onCreate() {
        addedDate = new Date();
    }

}
