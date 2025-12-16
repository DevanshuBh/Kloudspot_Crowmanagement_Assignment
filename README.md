# Crowd Management Application

A real-time crowd management dashboard built with Spring Boot and React.

## 🚀 Features

*   **Real-time Occupancy Tracking**: Live updates via Socket.IO.
*   **Interactive Dashboard**: Visualizes data with Recharts (Area, Pie, Line charts).
*   **Demographics Analysis**: Breakdown of male/female visitors.
*   **Crowd Entries Management**: Tabular view of visitor logs with pagination.
*   **Modern UI**: Clean, responsive design matching Kloudspot aesthetics.

## 🛠️ Tech Stack

### Backend
*   **Java 25** (Preview features enabled)
*   **Spring Boot 3.2.1**
*   **Netty-SocketIO** for real-time communication
*   **Maven** build tool

### Frontend
*   **React**
*   **Vite**
*   **Tailwind CSS**
*   **Recharts** for data visualization
*   **Socket.IO Client**

## 🏃‍♂️ Getting Started

### Prerequisites
*   JDK 21 or higher (JDK 25 recommended)
*   Node.js & npm

### Backend Setup
1.  Navigate to the backend directory:
    ```bash
    cd src/backend
    ```
2.  Run the application:
    ```bash
    ./mvnw spring-boot:run
    ```
    The backend API will start on `http://localhost:8080`, and the Socket.IO server on `http://localhost:9092`.

### Frontend Setup
1.  Navigate to the frontend directory:
    ```bash
    cd frontend
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Start the development server:
    ```bash
    npm run dev
    ```
    Access the application at `http://localhost:3000`.

## 🔐 Login Credentials
*   **ID**: `parking_solutions`
*   **Password**: (Any password works for dev mode)

## 📸 Screenshots

*(Add screenshots of your dashboard here)*
