
# AI Safety Incident Log API

A RESTful API service for logging and managing hypothetical AI safety incidents, built with Node.js, Express, and PostgreSQL.

[![Repo](https://img.shields.io/badge/GitHub-View%20Repo-blue?logo=github)](https://github.com/ankux/AI-Safety-Incidents-Logger) 
[![Website](https://img.shields.io/badge/Live%20API-Click%20Here-brightgreen?logo=vercel&style=for-the-badge)](https://ai-safety-incidents-logger.onrender.com/api/incidents)

## Features

- Create, read, and delete AI safety incident reports
- Proper severity level validation
- Automatic timestamping of reported incidents
- RESTful endpoints with JSON request/response handling

## Folder Structure
```
    AI-Safety-Incidents-Logger/
├── dist/ # Compiled JavaScript files
│ └── index.js # Main compiled entry point
├── node_modules/ # NPM dependencies
├── src/
│ ├── config/
│ │ └── db.ts # Database configuration
| | └── initDB.ts # Initialize DB
│ ├── controllers/
│ │ └── incidentController.ts # Business logic
│ ├── middleware/
│ │ └── errorHandler.ts # Handles errors
│ │ └── notFound.ts # Handles undefined routes
│ ├── routes/
│ │ └── incidentRoutes.ts # API routes
│ ├── seed/
│ │ └── seed.ts # Database seeding script
│ ├── types/
│ │ └── incident.types.ts # Type definitions
│ └── index.ts # Main application entry
├── .env # Environment variables
├── .gitignore
├── package-lock.json
├── package.json # Project configuration
├── README.md # This documentation
└── tsconfig.json # TypeScript configuration
```

## Technologies Used

- **Language**: TypeScript
- **Framework**: Express.js
- **Database**: PostgreSQL (with Neon serverless driver)
- **Environment**: Node.js

## Prerequisites

- Node.js (v18+ recommended)
- npm

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/ankux/AI-Safety-Incidents-Logger.git
   cd AI-Safety-Incidents-Logger
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory with the following variables:

   ```
   PGHOST=your_postgres_host
   PGDATABASE=your_database_name
   PGUSER=your_database_user
   PGPASSWORD=your_database_password
   PORT=8000
   ```
   You can find the above variables in your Neon DB connection string:
   `postgresql://<PGUSER>:<PGPASSWORD>@<PGHOST>/<PGDATABASE>?sslmode=require`

   Kindly refer to `https://neon.tech/docs/guides/node` for more details.

## Database Setup

The application will automatically create the required table on startup. To manually initialize the database:


## Seeding Sample Data

To populate the database with sample incidents:
```bash
npm run seed
```

This will insert 3 sample incidents with varying severity levels.

## API Endpoints

| Method | Endpoint               | Description               | Request Body Example                                                   |
|--------|------------------------|---------------------------|------------------------------------------------------------------------|
| GET    | `/api/incidents`       | Get all incidents         | -                                                                      |
| GET    | `/api/incidents/:id`   | Get a specific incident   | -                                                                      |
| POST   | `/api/incidents`       | Create a new incident     | `{"title": "...", "description": "...", "severity": "Medium"}`         |
| DELETE | `/api/incidents/:id`   | Delete an incident        | -                                                                      |

### Example Requests

**Get all incidents:**
```bash
curl http://localhost:8000/api/incidents
```

**Create new incident:**
```bash
curl -X POST http://localhost:8000/api/incidents   -H "Content-Type: application/json"   -d '{"title":"API Test","description":"Testing the API","severity":"High"}'
```

**Delete incident:**
```bash
curl -X DELETE http://localhost:8000/api/incidents/1
```

## Running the Application

**Development mode:**
```bash
npm run dev
```

**Production mode:**
```bash
npm run build
npm start
```

The API will be available at `http://localhost:8000`

## Deployment to Render.com

1. Push your project repositry on GitHub
2. Create a new Web Service and connect your GitHub repository
3. Set the following environment variables:
   - `PGHOST`
   - `PGDATABASE`
   - `PGUSER`
   - `PGPASSWORD`
   - `PORT=8000`
4. Set build command: `npm install && npm run build`
5. Set start command: `node dist/index.js`

## Design Decisions

1. **TypeScript**: Chosen for type safety and better developer experience
2. **Raw SQL**: Used instead of ORM for direct control over queries
3. **Neon Serverless**: Enables easy connection to PostgreSQL with serverless architecture
4. **Automatic DB Initialization**: Database tables are created on startup if they don't exist
5. **Strict Severity Validation**: Only allows "Low", "Medium", or "High" values

## Challenges

1. TypeScript type definitions in deployment required special handling
2. Serverless database connection needed careful configuration

