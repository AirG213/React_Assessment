import React from 'react';

// Component to render a button for loading more posts
function LoadMoreButton({ visiblePosts, filteredPosts, onLoadMore }) {
  return (
    <div className="load-more-container">
      {/* Conditionally render button if there are more posts to show */}
      {visiblePosts < filteredPosts.length && (
        <button onClick={onLoadMore}>Load More</button>
      )}
    </div>
  );
}

export default LoadMoreButton;
