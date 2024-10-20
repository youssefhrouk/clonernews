# HackerNews UI Project

## Overview

This project is focused on building a user interface for the **HackerNews API**, offering users a way to stay up to date with the latest tech news, job postings, polls, and discussions on the platform. The UI will allow users to browse various types of posts (stories, jobs, polls) and their associated comments, all while ensuring a smooth and responsive experience.

The project emphasizes the use of **Live Data** to ensure users are always aware of new updates and posts. By fetching data efficiently and only when needed, we ensure optimal performance and avoid overloading the HackerNews API.

## Objectives

The main goals of this project include:
- Create a UI for the **HackerNews API**.
- Support the display of different types of posts, such as:
  - **Stories**
  - **Job postings**
  - **Polls**
  - **Comments** (including nested comments with their associated parent posts).
- Ensure posts and comments are ordered from newest to oldest.
- Implement **infinite scrolling** to load more posts when needed, instead of all at once.
- Introduce a **Live Data** feature to keep users informed of new updates in real-time.
  - Notify the user every 5 seconds of any new posts.
- Prevent overwhelming the API by using request optimizations, such as throttling or debouncing.

## Key Features

### 1. **Post Types**
   - Display various HackerNews post types:
     - **Stories:** General news articles and discussions.
     - **Jobs:** Tech-related job postings.
     - **Polls:** Posts with user polls and their results.
     - **Comments:** Show hierarchical comments related to each post.

### 2. **Live Data Updates**
   - Continuously check for new posts every 5 seconds.
   - Display a notification or a UI element to inform the user when new posts are available.
   - Update the feed dynamically without requiring the user to refresh the page.

### 3. **Optimized Data Loading**
   - Posts and comments will load dynamically based on user interaction (e.g., scroll events or button clicks).
   - Posts will be ordered by recency, with the newest posts displayed first.
   - Only load more posts when required to avoid unnecessary requests.

### 4. **Rate Limit Prevention**
   - Implement strategies such as:
     - **Throttling:** Limit the number of API requests in a given time window.
     - **Debouncing:** Delay requests until there’s a clear user action, reducing unnecessary calls.
   - Optimize API calls to fetch only the necessary data and avoid over-fetching.

## Getting Started

### Prerequisites
- Basic knowledge of **JavaScript**, **HTML**, and **CSS**.
- Familiarity with API calls (fetching data from external sources).
- Understanding of event-driven programming.

### Setup
1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/hackernews-ui.git
   cd hackernews-ui
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the project:
   ```bash
   npm start
   ```
   This will start the development server. Open your browser and navigate to `http://localhost:3000` to see the project in action.

## API Documentation

The project interacts with the **HackerNews API**. You can explore the API and its capabilities at [HackerNews API Documentation](https://github.com/HackerNews/API).

Key endpoints used in this project include:
- **Top Stories:** `https://hacker-news.firebaseio.com/v0/topstories.json`
- **Job Stories:** `https://hacker-news.firebaseio.com/v0/jobstories.json`
- **Polls:** `https://hacker-news.firebaseio.com/v0/askstories.json`
- **Post Details:** `https://hacker-news.firebaseio.com/v0/item/<id>.json`

## Technologies Used

- **JavaScript** for dynamic behavior and API integration.
- **HTML** and **CSS** for building and styling the user interface.
- **Fetch API** or any HTTP library (e.g., Axios) to interact with the HackerNews API.
- **Event Listeners** for triggering data loading upon user actions (e.g., scrolling).
- **Throttling/Debouncing** mechanisms for optimized API request handling.

## Contributing

Contributions are welcome! To contribute:
1. Fork this repository.
2. Create a new branch:
   ```bash
   git checkout -b feature-name
   ```
3. Make your changes and commit them:
   ```bash
   git commit -m 'Add some feature'
   ```
4. Push to your branch:
   ```bash
   git push origin feature-name
   ```
5. Open a pull request to the main branch.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

Stay up to date with tech news through a smooth and user-friendly interface powered by the **HackerNews API**.