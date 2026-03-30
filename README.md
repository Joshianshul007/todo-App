<h1 align="center">✅ To-Do List Application</h1>

<p align="center">
  A robust, production-grade <b>MERN Stack</b> task management application designed with simplicity, clear validations, and an intuitive user interface.
</p>

---

## 🎯 Project Overview

This application fulfills all core requirements and optional bonus criteria for a modern Task Management system. It is designed to be highly responsive, rigorously tested, and secure from improper data inputs.

### Core Features
- **Effortless Task Management**: Create, view, edit, and delete tasks instantly.
- **Persistent Storage**: All data is permanently stored and quickly retrieved via a remote/local **MongoDB** database.
- **Strict Validation**: 
  - Cannot submit tasks with empty or whitespace-only titles.
  - Hardened backend validation prevents marking a task as "Complete" if it's already completed.
  - Graceful frontend error handling seamlessly alerts users via inline UI badges without breaking the application flow.

### ✨ Bonus Features Implemented
- **📅 Due Dates**: Assign a specific target date to tasks. Overdue tasks are dynamically highlighted in red to draw immediate user attention.
- **🏷️ Categorization**: Categorize tasks into distinct buckets (`Work`, `Personal`, `Urgent`, `Other`) with beautifully color-coded badges. Includes a blazing-fast dropdown filter to sort your task view.
- **🧪 Unit Testing**: Comprehensive automated testing suite built with **Jest** and **Supertest**. Verifies API endpoint validations and edge-cases using a mocked in-memory database.

---

## 🛠️ Tech Stack

- **Frontend**: React (Vite), CSS3, Zustand (State Management)
- **Backend**: Node.js, Express.js
- **Database**: MongoDB & Mongoose
- **Testing**: Jest, Supertest, MongoDB Memory Server

---

## 🚀 Setup Instructions

Follow these instructions to run the project locally on your machine.

### Prerequisites
- [Node.js](https://nodejs.org/) installed (v16+)
- A local MongoDB instance running on `localhost:27017` OR a valid MongoDB URI.

### Step 1: Clone the Repository
```bash
git clone <your-github-repo-url>
cd todo_App
```

### Step 2: Start the Backend Server
Open a terminal window and navigate to the backend directory:
```bash
cd backend
npm install
npm run dev
```
*The server will initialize and connect to your database, running on `http://localhost:5000`.*

### Step 3: Start the Frontend Application
Open a **new, separate terminal window** and navigate to the frontend directory:
```bash
cd frontend
npm install
npm run dev
```
*Vite will compile the code and provide a local URL (typically `http://localhost:5173`) where the app is running. Open this in your browser.*

---

## 🏗️ Code Structure & Key Decisions

A minimalist architectural approach was chosen to maximize maintainability.

### Backend Architecture
- **Single Source of Truth**: Removed heavy multi-file routing logic to funnel all Task actions through an isolated `taskController.js`.
- **Validation Offloading**: Form and logical validations (e.g., checking if a task is already completed) are directly handled at the controller level before reaching the Mongoose schema, saving database computation.
- **Test-Driven Design**: The `index.js` file isolates the database connection so that our internal Jest testing suites can spin up sandboxed Express apps without locking production ports.

### Frontend Architecture
- **Uncoupled Auth Navigation**: Stripped out complex React-Router setups to create a seamless, single-page application focused strictly on task visualization.
- **Zustand over Redux**: Selected `Zustand` for state management to avoid massive boilerplate while achieving instantaneous, optimistic UI updates when interacting with the API.
- **Micro-Animations & Styling**: Kept CSS pure and localized to avoid heavy CSS frameworks. Elements feature smooth hover reveals and color-coded semantic significance (red = overdue/error, green = complete/success) to maximize UX.

---

## 🧪 Running the Tests

To verify backend integrity, an automated test suite is provided.

```bash
cd backend
npm test
```
This triggers Jest to spin up a mock database and run 6 targeted suites verifying CRUD operations, empty title rejections, and redundancy blocking!
