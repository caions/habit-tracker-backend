# Habit Tracker Backend

This is the repository for the backend of the Habit Tracker application, a Node.js API for tracking daily habits.
This API was developed using Node.js and PostgreSQL as the database, and it follows the principles of Hexagon Architecture.

## 🚀 Instalation

To install the project dependencies, run the following command:

```
npm install
```

Additionally, you need to create a PostgreSQL database named "habit-tracker" before starting the server.

## Available Routes

### Habits

- GET /habits/: Returns the list of habits.
- POST /habits/: Creates a new habit.
- PUT /habits/: Updates an existing habit.
- DELETE /habits/: Removes a habit.
- GET /habits/{id}: Returns information about a specific habit with the corresponding ID.

### Habits Completion Date

- GET /habitsCompDate/: Returns the list of habit completion dates.
- POST /habitsCompDate/: Creates a new habit completion date.

## API Documentation

Detailed API documentation is available in Swagger at the /doc route. You can access it in your browser to get information on how to use the routes and available parameters.

## Running Tests

```
npm run test
```

## GitFlow and CI/CD

This project follows GitFlow standards for branch management and development workflow. Additionally, continuous integration (CI) and continuous delivery (CD) are achieved through GitHub Actions to ensure that code is automatically tested and deployed to production.

## Hosting

The API is hosted at https://habit-tracker-backend.vercel.app/.
