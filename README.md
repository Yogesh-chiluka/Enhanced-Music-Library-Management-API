# Enhanced-Music-Library-Management-API

**Music Library Management API**  that allows users within an
organization to manage their collection of **Artists, Tracks, and Albums**. Each organization has a single Admin
who oversees the system and its users. The API also provides functionality for users to mark their favorite
Artists, Albums, and Tracks for quick access and personalization.


**Key Points:**
- One Organization, One Admin: Each organization has a single Admin with full control over the
system.
- Role-Based Access Control: Users have distinct roles (Admin, Editor, Viewer), with permissions
tailored to their responsibilities.
- Entity Relationships: Albums belong to Artists, and Tracks are associated with Albums and
Artists.
- Favorites: Users can personalize their experience by marking items as favorites for easy retrieval.

## Deployment Info
 **Base-url** : https://enhanced-music-library-management-api-2.onrender.com/api/v1

## Table of Contents
- [Technologies](#technologies)
- [Installation](#installation)
- [APIEndpoints](#apiendpoints)


## Technologies

- Node.js
- Express.js
- TypeScript
- MongoDB
- Mongoose

## Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/your-username/dosemanager-backend.git
    ```

2. Navigate to the project directory:
    ```sh
    cd dosemanager-backend
    ```

3. Install the dependencies:
    ```sh
    npm install
    ```

4. Set up environment variables in a `.env` file:
    ```sh
    MONGO_URI=your_mongodb_uri
    JWT_SECRET=your_jwt_secret
    ```

5. Build the project:
    ```sh
    npm run build
    ```

6. Start the server:
    ```sh
    npm start
    ```

7. For development, use:
    ```sh
    npm run dev
    ```



## APIEndpoints

| HTTP Methods | Endpoint | Status Codes |
|--------------|----------|--------------|
| GET          | BASEURL/Logout           | 200, 400           |
| POST         | BASEURL/signup           | 201, 400, 409      |
| POST         | BASEURL/login            | 200, 400, 404      |
| GET          | BASEURL/users            | 200, 400, 401      |
| POST         | BASEURL/users/add-user   | 201, 400, 401, 403, 409 |
| DELETE       | BASEURL/users/:id        | 200, 400, 401, 403, 404 |
| PUT          | BASEURL/users/update-password | 204, 400, 401, 403, 404 |
| GET          | BASEURL/artists          | 200, 400, 401      |
| GET          | BASEURL/artists/:id      | 200, 401, 403, 404 |
| POST         | BASEURL/artists/add-artist | 201, 400, 401    |
| PUT          | BASEURL/artists/:id      | 204, 400, 401, 403, 404 |
| DELETE       | BASEURL/artists/:id      | 200, 400, 401, 403, 404 |
| GET          | BASEURL/albums           | 200, 400, 401, 403, 404 |
| GET          | BASEURL/albums/:id       | 200, 401, 403, 404 |
| POST         | BASEURL/albums/add-album | 201, 400, 401, 403, 400 |
| PUT          | BASEURL/albums/:id       | 204, 400, 401, 403, 404 |
| DELETE       | BASEURL/albums/:id       | 200, 400, 401, 403, 404 |
| GET          | BASEURL/tracks           | 200, 400, 401, 403, 404 |
| GET          | BASEURL/tracks/:id       | 200, 400, 401, 403, 404 |
| POST         | BASEURL/tracks/add-track | 201, 400, 401, 403, 404 |
| PUT          | BASEURL/tracks/:id       | 204, 400, 401, 403, 404 |
| DELETE       | BASEURL/tracks/:id       | 200, 400, 401, 403, 404 |
| GET          | BASEURL/favorites/:category | 200, 400, 401, 403 |
| POST         | BASEURL/favorites/add-favorite | 201, 400, 401, 403, 404 |
| DELETE       | BASEURL/favorites/remove-favorite/:id | 200, 400, 401, 403, 404 |
