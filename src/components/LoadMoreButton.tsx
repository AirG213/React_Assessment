import React from 'react';
import { Post } from '../mock/types';

// Definition of the interface to type the props
interface LoadMoreButtonProps {
  visiblePosts: number;
  filteredPosts: Post[];
  onLoadMore: () => void;
}

// Component to render a button for loading more posts
const LoadMoreButton: React.FC<LoadMoreButtonProps> = ({ visiblePosts, filteredPosts, onLoadMore }) => {
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
