# **TinyLink – Backend API (Express + MongoDB)**

TinyLink is a lightweight URL-shortening backend similar to Bit.ly.
It provides RESTful APIs to create short URLs, redirect them, track click statistics, and manage links.

## **Features**

-   Create short links (auto-generated or custom)
-   Validate URLs
-   Prevent duplicate short codes
-   Redirect `/code → original URL` with click tracking
-   Delete links
-   List all links
-   View stats for a specific link
-   Healthcheck endpoint

## **Tech Stack**

-   **Node.js**
-   **Express.js**
-   **MongoDB + Mongoose**
-   **CORS Enabled**
-   **REST API Architecture**
