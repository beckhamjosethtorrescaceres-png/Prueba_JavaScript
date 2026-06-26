# Workspace Reservation SPA

A single-page application built with modern JavaScript and Vite for managing workspace reservations. The project uses JSON Server as a mock REST API and keeps the frontend organized into views, controllers, services, reusable components, and a small client-side router.

## Features

- Login with test users stored in the mock database
- Session persistence with `localStorage`
- SPA navigation with Vite
- Dashboard view based on the logged-in user's role
- Reservation listing from a JSON Server API
- Reservation creation, update, deletion, and status update service methods
- Reusable reservation card and sidebar components
- Tailwind CSS styling

## Tech Stack

- JavaScript ES modules
- Vite
- Tailwind CSS
- JSON Server
- Concurrently
- HTML5 and CSS3

## Requirements

- Node.js installed
- npm installed

## Installation

Install the project dependencies:

```bash
npm install
```

## Running the Project

Start the frontend and the mock API at the same time:

```bash
npm run dev
```

This command runs:

- Vite frontend server
- JSON Server on `http://localhost:3001`

After starting the project, open the local URL shown by Vite in your terminal. By default, it is usually:

```text
http://localhost:5173
```

## Test Credentials

Use one of these users to log in:

| Role | Email | Password |
| --- | --- | --- |
| Admin | `admin@test.com` | `admin123` |
| User | `user@test.com` | `user123` |
| User | `user2@test.com` | `user123` |

## Available Scripts

```bash
npm run dev
```

Starts Vite and JSON Server in parallel.

```bash
npm run build
```

Builds the project for production.

```bash
npm run preview
```

Serves the production build locally for testing.

## Project Structure

```text
.
+-- database
|   +-- db.json
+-- public
+-- src
|   +-- api
|   |   +-- http.js
|   +-- assets
|   +-- components
|   |   +-- ReservationCard.js
|   |   +-- Sidebar.js
|   +-- controllers
|   |   +-- homecontroller.js
|   |   +-- logincontroller.js
|   +-- router
|   |   +-- router.js
|   +-- services
|   |   +-- reservation.service.js
|   +-- views
|   |   +-- homeView.js
|   |   +-- loginView.js
|   |   +-- notFound.js
|   +-- main.js
|   +-- style.css
|   +-- utils.js
+-- index.html
+-- package.json
+-- README.md
+-- vite.config.js
```

## Main Modules

- `src/main.js`: initializes the app and loads the router.
- `src/router/router.js`: handles client-side navigation.
- `src/views/`: contains the main screen templates.
- `src/controllers/`: connects views with user interactions and app logic.
- `src/api/http.js`: centralizes HTTP requests to the mock API.
- `src/services/reservation.service.js`: exposes reservation-related API operations.
- `src/components/`: contains reusable UI components.
- `database/db.json`: stores users and reservations for JSON Server.

## Mock API

The mock backend is powered by JSON Server.

Base URL:

```text
http://localhost:3001
```

Main resources:

```text
/users
/reservations
```

The API data is stored in:

```text
database/db.json
```

## Notes

- Keep port `3001` available for JSON Server.
- If you add new views, register their routes in `src/router/router.js`.
- If you add new API operations, place reusable request logic in the service layer instead of calling `fetch` directly from views.
