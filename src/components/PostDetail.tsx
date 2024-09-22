import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import "../styles/PostDetail.scss";
import { Post } from '../mock/types'; // Import the Post type definition

// PostDetail component displays the detailed information of a specific post
function PostDetail() {
  // Get the post ID from the URL parameters
  const { id } = useParams<{ id: string }>();

  // State to store post details
  const [post, setPost] = useState<Post | null>(null);

  // State to manage loading indicator
  const [loading, setLoading] = useState(true);

  // State to handle error messages
  const [error, setError] = useState<Error | null>(null);

  // Effect to fetch post details when the component mounts or the ID changes
  useEffect(() => {
    fetch(`/api/posts/${id}`) // Fetch post details from the API based on the post ID
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to load post details'); // Handle non-200 responses
        }
        return response.json(); // Parse the response as JSON
      })
      .then((data) => {
        setPost(data.post); // Set the post data in the state
        setLoading(false); // Turn off loading indicator
      })
      .catch((error) => {
        console.error('Error fetching post details:', error); // Log any errors
        setError(error); // Set error in the state
        setLoading(false); // Turn off loading indicator
      });
  }, [id]); // Re-run effect if the ID changes

  // Display a loading message while fetching the post details
  if (loading) {
    return <p>Loading post...</p>;
  }

  // Display an error message if there is an error fetching the post details
  if (error) {
    return <p>{error.message}</p>;
  }

  return (
    <div className="page-container">
      {/* Include the Header component */}
      <Header />
      <main className="main-content">
        {/* Check if the post exists and display its details */}
        {post && (
          <article className="post-detail-content">
            <div className="post-header">
              {/* Display the author's name and the post's publish date */}
              <span className="post-author">{post.author?.name}</span>
              <span className="post-date">
                {post.publishDate
                  ? new Date(post.publishDate).toLocaleDateString() // Format the publish date
                  : 'N/A'}
              </span>
            </div>
            
            {/* Display the post's title */}
            <h1 className="post-title">{post.title}</h1>

            {/* Display the post's summary/content */}
            <p className="post-content">{post.summary}</p>

            {/* Display the post's categories, each within a styled tag */}
            <div className="post-categories">
              {post.categories?.map((category) => (
                <span 
                  key={`${category.name}-${post.id}`} // Use category name and post ID for unique keys
                  className="category-tag"
                >
                  <a href={`/?categories=${encodeURIComponent(category.name)}`}>
                    {category.name}
                  </a>
                </span>
              ))}
            </div>
          </article>
        )}
      </main>
      {/* Include the Footer component */}
      <Footer />
    </div>
  );
}

export default PostDetail;
