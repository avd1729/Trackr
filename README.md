# Trackr

![React](https://img.shields.io/badge/React-19.0.0-blue?logo=react) ![TypeScript](https://img.shields.io/badge/TypeScript-5.9.2-blue?logo=typescript) ![Spring Boot](https://img.shields.io/badge/SpringBoot-4.0-brightgreen?logo=springboot) ![Java](https://img.shields.io/badge/Java-21-orange?logo=java)

A simple **Todo List application** built with **React (frontend)** and **Spring Boot (backend)**. The main aim of this project was to **practice React** — building components, managing state, and integrating with a backend API.

---

## Features

* Full CRUD functionality for tasks:

  * Create, read, update, delete
  * Task attributes: title, description, category, due date, completed
* Simple UI built with React hooks and functional components
* Backend persistence via Spring Boot REST API

---

## Tech Stack

* **Frontend:** React + TypeScript + Vite
* **Backend:** Spring Boot + JPA + PostGres (or any preferred DB)
* **API:** RESTful endpoints for tasks

---

## Setup & Run

### Backend

```bash
cd todo-list/backend
./mvnw spring-boot:run
```

Runs on: `http://localhost:8080/api/task`

### Frontend

```bash
cd todo-list/frontend
npm install
npm run dev
```

Open the app in the browser at `http://localhost:3000`

---

## Project Structure

```
frontend/
 ├─ components/       # React components (TaskForm, TaskList, etc.)
 ├─ api/              # API calls to backend
 ├─ dto/              # TypeScript interfaces for data transfer
backend/
 ├─ model/            # JPA entities
 ├─ controller/       # REST endpoints
 ├─ repository/       # Database repositories
 ├─ service/          # Business logic
```

---

## Usage

1. Add tasks via the form.
2. Tasks appear in the list below.
3. Delete tasks with a button click.
4. Optional: mark complete or edit tasks (backend supports it).

> The focus is **learning React**, not building a production-ready todo app.

---

## License

Educational/personal project.

