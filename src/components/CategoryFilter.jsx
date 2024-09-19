import React from 'react';

// Component to filter posts by selected categories
function CategoryFilter({ posts, selectedCategories, onCategoryChange }) {
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

export default CategoryFilter;
