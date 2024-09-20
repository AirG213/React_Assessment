// Import React and useEffect
import React, { useEffect } from 'react'; 

// Import hooks for navigation and location
import { useLocation, useNavigate } from 'react-router-dom'; 

// Component to filter posts by selected categories
function CategoryFilter({ posts, selectedCategories, onCategoryChange }) {
  // Hook to programmatically navigate
  const navigate = useNavigate(); 
  // Hook to get the current location
  const location = useLocation(); 

// Effect to update query string when selected categories change
useEffect(() => {
    // Get current query params
  const queryParams = new URLSearchParams(location.search);
    // Remove existing categories
  queryParams.delete('categories');

  // Add the selected categories to queryParams
  if (selectedCategories.length > 0) {
    selectedCategories.forEach((category) => {
      queryParams.append('categories', category);
    });
  }

  // Avoid updating the URL if the current URL is already correct
  const newQueryString = queryParams.toString();
  const currentQueryString = location.search.substring(1); // Remove the "?" from location.search

  if (newQueryString !== currentQueryString) {
    // Update the URL without reloading the page
    navigate(`${location.pathname}?${newQueryString}`, { replace: true });
  }
}, [selectedCategories, navigate, location]);


  return (
    <>
      {/* Conditionally render category checkboxes if posts are available */}
      {posts.length > 0 && (
        <>
          {Array.from(
            new Set(
              posts.reduce((categories, post) => {
                post.categories.forEach((category) => {
                  categories.add(category.name);
                });
                return categories;
              }, new Set())
            )
          ).map((categoryName) => (
            <div key={categoryName}>
              <input
                type="checkbox"
                value={categoryName}
                checked={selectedCategories.includes(categoryName)}
                // Call onCategoryChange when checkbox changes
                onChange={onCategoryChange} 
              />
              <label>{categoryName}</label>
            </div>
          ))}
        </>
      )}
    </>
  );
}

// Export the component
export default CategoryFilter; 
