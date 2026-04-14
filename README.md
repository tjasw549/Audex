# Audex - Music Discovery Platform

## Overview

Audex is a sophisticated, single-page application (SPA) built with React that allows users to discover, filter, and explore a vast catalogue of music. The application consumes data from a custom REST API (serving information from a Supabase cloud database) to populate dynamic, responsive interfaces.

Designed with a focus on modern UI/UX principles, Audex features interactive audio profiles, deep dives into artist statistics, and a robust filtering system that adapts seamlessly to both desktop and mobile devices.

## Built With

![React UI](https://img.shields.io/badge/React-UI-20232a?style=flat&logo=react&logoColor=61DAFB) ![Tailwind Styling](https://img.shields.io/badge/Tailwind_CSS-Styling-38B2AC?style=flat&logo=tailwind-css&logoColor=white) ![React Router Routing](https://img.shields.io/badge/React_Router-Routing-CA4245?style=flat&logo=react-router&logoColor=white) ![Recharts Data_Vis](https://img.shields.io/badge/Recharts-Data_Vis-22b5bf?style=flat) ![Vite Build_Tool](https://img.shields.io/badge/Vite-Build_Tool-646CFF?style=flat&logo=vite&logoColor=white)

## Hosting

> 🔗 **Live Web App:** https://[your-deployment-link-here].vercel.app

### Core Views & Functionality

#### 1. Home View (`/`)
A visually engaging landing page that introduces the platform. It serves as the primary entry point, guiding users toward exploring artists, genres, and the main song catalogue.

#### 2. Discovery Hub / Browse View (`/songs`)
The core functionality of the application is designed for deep exploration of the song database.
* **Multi-Faceted Filtering:** Users can filter the catalogue using multiple criteria simultaneously, including Title (substring search), Year, Artist, and Genre.
* **Dynamic Sorting:** The results can be sorted by various fields (e.g., Title, Year, Artist name) to organize the data effectively.
* **Reusable Song List Component:** The display of songs utilizes a highly modular component that's used across views to ensure consistent functionality and styling for all song lists.

#### 3. Artists & Genres Entry Views (`/artists` & `/genres`)
Dedicated landing pages serve as directories for artists and musical genres.
* **Visual Grids:** Displays artists (utilizing dynamic image URLs sourced from the API) and stylized genre tiles.
* **Direct Navigation:** Clicking on any artist or genre immediately directs the user to a filtered view of their respective catalogue.

#### 4. Single Artist / Genre Details (`/single-artist/:id` & `/songs/genre/:id`)
Deep dives into specific categories or creators.
* **Artist Profiles:** Displays detailed information, their image, and a list of their matching tracks. Features a **Recharts Radar Chart** mapping the artist's average audio metrics (Danceability, Energy, Liveness, etc.).
* **Genre Views:** Focuses strictly on a tabular list of all tracks falling under the selected genre.

#### 5. Song Analytics (`/single-song/:id`)
An in-depth analysis of a specific track.
* **Technical Audio Stats:** Displays raw API data such as BPM, Loudness, Acousticness, and duration.
* **Playlist Integration:** Allows the user to add the currently viewed track to an existing playlist.

#### 6. Playlist Management (`/playlists`)
A comprehensive system for managing user collections.
* **CRUD Functionality:** Users can view existing playlists, create new ones, and modify their contents.
* **Data Persistence:** Playlists are maintained on the server, ensuring that a user's curated lists remain intact even after the application is closed and restarted.

#### 7. Authentication (`/login`)
A working login flow accessed via the main header.
* **Pre-populated Credentials:** The login form is populated with valid user credentials to demonstrate flow.
* **State Management:** Upon successful authentication, the internal state is updated to "logged in" and redirects the user back to the Home View. The header updates to provide a "Log Out" option, which resets this state.
