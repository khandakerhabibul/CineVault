# CineVault

CineVault is a premium movie discovery and tracking platform designed for film enthusiasts. Built with modern web technologies, it offers a cinematic experience with smooth animations, real-time search, and personalized tracking.

## Demo Links

Check out the live website here: [CineVault Live Demo](https://cine-vault-nu.vercel.app/)

Check out the demo video here: [CineVault Demo Video](https://drive.google.com/drive/folders/1u9rGo6SF-BIvA5U0W-knIo6leL4Zflkh?usp=drive_link)

---

## Features

### Guest Features (No Login Required)

- **Explore Movies**: Browse through curated sections for Trending, Upcoming, Top Rated, and Popular movies.
- **Real-time Search**: Quickly find any movie across the database with our instant search functionality.
- **Detailed Movie Views**: Access comprehensive information including storylines, cast details, ratings, and runtime.
- **Trailer Playback**: Watch official movie trailers directly within the app using the integrated YouTube video player.
- **Responsive Experience**: Fully optimized for a seamless experience across mobile, tablet, and desktop devices.

### Authenticated Features (After Login)

- **Personal Watchlist**: Effortlessly save movies you want to watch later with a single click directly from the movie details page.
- **Dedicated Watchlist Page**: A organized page to view and manage all your saved content, featuring smooth staggered reveal animations.
- **User Dashboard**: Access your personalized dashboard for a quick account overview and access to your preferences.
- **Secure Authentication**: Robust user login and signup flow powered by Firebase, ensuring your watchlist is synchronized across devices.

### Performance & UI

- **GSAP Animations**: Fluid reveals and smooth transitions provide a premium, high-end feel.
- **Fast Data Fetching**: Efficient API interaction and caching using TanStack Query.

## Mobile Preview

Designed with a mobile-first approach, ensuring that all features from searching to trailer playback work perfectly on smaller screens.

## Tech Stack

- **Framework**: React 19 (Vite)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **Animations**: GSAP (GreenSock Animation Platform)
- **Backend & Auth**: Firebase
- **Data Fetching**: TanStack Query (React Query)
- **Icons**: Lucide React

---

## Getting Started

### Prerequisites

- Node.js (Latest LTS recommended)
- Firebase Account (for authentication and database) [PLEASE PROVIDE YOUR FIREBASE API KEYS, check .env.sample]
- TMDB API Key [PLEASE PROVIDE YOUR TMDB API KEY]

### Installation

1.  **Clone the repository**:

    ```bash
    git clone https://github.com/khandakerhabibul/CineVault.git
    cd CineVault
    ```

2.  **Install dependencies**:

    ```bash
    npm install
    ```

3.  **Environment Variables**:
    Create a `.env` file in the root directory and add your credentials based on the `.env.sample`:

    ```env
    VITE_FIREBASE_API_KEY=your_api_key
    VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
    VITE_FIREBASE_PROJECT_ID=your_project_id
    VITE_TMDB_API_KEY=your_tmdb_key
    # ... other variables
    ```

4.  **Run in Development**:
    ```bash
    npm run dev
    ```

---
