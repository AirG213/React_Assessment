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
3. Run the development server using `yarn start` or `npm start`.

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

# Authors 
* **GOUADFEL Rayan** _alias_ [@AirG213](https://github.com/AirG213)
