# Lizard Global React Developer Assessment

[![forthebadge](http://forthebadge.com/images/badges/built-with-love.svg)](http://forthebadge.com) [![forthebadge](http://forthebadge.com/images/badges/powered-by-electricity.svg)](http://forthebadge.com)

## Overview

The purpose of this assessment is to demonstrate:

1. An understanding of React syntax
2. Working with an API
3. Storing and manipulating React state
4. Structuring an application with multiple components
5. HTML and CSS ability
6. Responsive web development ability

### Prerequisites

In order to run the provided solution the following software will need to be installed:

- NodeJS (LTS) [here.](https://nodejs.org/en/)
- A code editor (We recommend VS Code [here.](https://code.visualstudio.com/))

### Setup

1. Fork and clone the repository
2. Open the repository folder and install the dependencies using `yarn` or `npm install`.
3. Install required libraries: `react-router-dom` and `react-transition-group`, and `node-sass` for SCSS support.
   - Run `yarn add react-router-dom react-transition-group node-sass` or `npm install react-router-dom react-transition-group node-sass`
4. Run the development server using `yarn start` or `npm start`.

### Using Docker

You can run this project using Docker. There are two ways to do this: by using the provided Dockerfile or by pulling the image from Docker Hub.

#### Option 1: Build from Dockerfile

1. Navigate to the Docker directory :
   - `cd docker`

2. Build the Docker image :
   - `docker build -t lizardglobal_assessment .`

3. Run the Docker container:
`docker run -p 8080:8080 -it --name lizardglobal_assessment lizardglobal_assessment`

#### Option 2: Pull from Docker Hub
If you prefer not to build the image yourself, you can download it directly from Docker Hub:

1. Pull the image:
   - `docker pull airg213/lizardglobal_assessment`

2. Run the Docker container:
   - `docker run -p 8080:8080 -it --name lizardglobal_assessment airg213/lizardglobal_assessment`

#### Notes
- After running the container, you can access the application at http://localhost:8080.

- Make sure Docker is installed and running on your machine.

### Requirements

These are the minimum requirements for the exercies:

1. Retrieve the data from the mock API.
2. Output the data in a list, including properties from the data that are appropriate for a list view.
3. Implement a category filter - this can be single or multi-select.
4. Implement pagination - this can be traditional numbered pages or "load more".
5. Use semantic markup where possible.
6. Create a responsive layout with HTML and CSS.

### Additional Exercises

If you have time then demonstrating any of the following would be considered as a bonus:

1. Use client-side routing to create a "detail" page.
2. Persist filter state in the query string.
3. Include animated transitions between application state, e.g. when filtering.
4. Convert the application to use TypeScript instead of JavaScript.
5. Use a CSS preprocessor or CSS-in-JS rather than plain CSS.

### Changes Made

1. **Data Fetching and Loading State**
   - Implemented data fetching from the mock API endpoint `/api/posts` using `fetch` within the `useEffect` hook. Added `useState` to create a state variable `posts` to store the fetched data and `loading` to manage the loading state. This handles asynchronous data retrieval and updates the component state. The component now displays a "Loading posts..." message when data is being fetched and renders the posts list only when the data is fully loaded.

2. **Rendering Posts**
   - Modified the component to render the `posts` data in a `<ul>` list. Each post is displayed with its title and, if available, `author.name`. Used `.map()` to iterate over the `posts` array and create a list item `<li>` for each post. Included conditional rendering for the `author` property to manage posts with or without an author.

3. **Category Filtering Implementation**
   - Added state variables for `selectedCategories` and `filteredPosts`. Implemented filtering logic in a new `useEffect` hook to filter posts based on selected categories. The `handleCategoryChange` function updates the selected categories based on user input from the filter UI. The filtering effect updates the `filteredPosts` state to only include posts that match the selected categories.
   - Category Filter UI : Implemented a category filter UI that displays a list of checkboxes corresponding to the categories of the posts. Users can select or deselect categories to filter the posts. The UI updates dynamically based on the categories available in the fetched data.

4. **Pagination Implementation**
   - Added "Load More" functionality to the posts list. Introduced a state variable `visiblePosts` to manage the number of posts displayed at a time. Added a `loadMore` function to incrementally show more posts. Updated the `return` statement to include a button for loading more posts, which only appears when there are more posts to display.

5. **Semantic Markup**
   - Replaced generic `<div>` and `<label>` elements with semantic HTML5 elements such as `<header>`, `<main>`, `<section>`, `<article>`, and `<footer>`. Updated the structure to improve accessibility, and provided a more meaningful structure to the markup.

6. **Responsive Layout** 
   - Created a responsive layout for the blog page using HTML and CSS. The content, including titles, authors, and summaries, is now centered, and the layout adapts to different screen sizes. Added media queries to adjust the padding, font sizes, and button widths for smaller screens.

### Additional features

1. Implemented post detail pages with dynamic routing
   - Added route for individual post details.
   - Created PostDetail component to display post information.
   - Updated routing configuration to handle dynamic post detail pages.

2. Persist filter state in the query string
   - Enhanced the CategoryFilter component to maintain selected categories in the URL.
   - Implemented a mechanism to ensure the query string updates dynamically when categories are selected or deselected.
   - This allows users to bookmark or share the filtered view easily, and resolves issues with stale query parameters on refresh.

3. Included animated transitions for state changes, such as filtering posts.
   - Added `react-transition-group` to smoothly animate the post filtering process.
   - The animation enhances user experience by providing visual feedback during state transitions.

4. Converted the application to use TypeScript instead of JavaScript. This involved:
   - Renaming files from `.js` to `.tsx` where necessary.
   - Installing TypeScript and the necessary type definitions for React and React Router.
   - Defining interfaces for components and props to ensure type safety.
   - Updating components to utilize the new types and handle potential undefined properties.

5. Implemented SCSS for styling improvements.
   - Converted all CSS files to SCSS format to leverage the features of a CSS preprocessor.
   - Organized styles using variables, nesting, and mixins for better maintainability and readability.
   - Enhanced the aesthetic of the application by applying a modern gradient background to the header and footer.
   - Centered and adjusted text sizes for better visual hierarchy and user experience.

# Authors 
* **GOUADFEL Rayan** _alias_ [@AirG213](https://github.com/AirG213)
