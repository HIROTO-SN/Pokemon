# REST API with Docker Desktop in Java and React

This project demonstrates how to create a RESTful API using Java for the backend, React for the frontend, and MySQL for the database, with the backend and database containerized using Docker Desktop.

## Prerequisites

- Docker Desktop installed on your machine
- Java Development Kit (JDK)
- Node.js and npm installed
- MySQL client or administration tool (optional for database management)

## Backend Setup

1. Clone this repository to your local machine.

2. Navigate to the `backend` directory.

    ```bash
    cd backend
    ```

3. Build the Docker image for the backend Java application.

    ```bash
    docker build -t backend .
    ```

4. Run the Docker container for the backend.

    ```bash
    docker run -d -p 8080:8080 --name backend backend
    ```

5. Access the backend API at: http://localhost:8080

## Database Setup

1. Ensure Docker Desktop is running on your machine.

2. Navigate to the root directory of the project.

3. Start the MySQL database container using Docker Compose.

    ```bash
    docker-compose up -d
    ```

4. Access the MySQL database using your preferred client or administration tool.

    - Host: localhost
    - Port: 3306
    - Username: develop
    - Password: develop

## Frontend Setup

1. Navigate to the `frontend` directory.

    ```bash
    cd frontend
    ```

2. Start the frontend development server.

    ```bash
    npm start
    ```

3. Access the frontend application at: http://localhost:3000

## Usage

- The frontend provides a user interface to interact with the RESTful API endpoints exposed by the backend.
- You can perform CRUD operations on resources such as users, products, etc.
- Explore the code in the `backend` and `frontend` directories to understand how the application works.

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

[MIT](https://choosealicense.com/licenses/mit/)