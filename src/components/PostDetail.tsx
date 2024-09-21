import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import "../styles/PostDetail.css";
import { Post } from '../mock/types';

function PostDetail() {
  // Get the post ID from the URL parameters
  const { id } = useParams<{ id: string }>();
  // State to store post details
  const [post, setPost] = useState<Post | null>(null);
  // State for loading indicator
  const [loading, setLoading] = useState(true); 
  // State for error handling
  const [error, setError] = useState<Error | null>(null); 

  // Fetch the post details using the post ID from the URL
  useEffect(() => {
    fetch(`/api/posts/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to load post details');
        }
        return response.json();
      })
      .then((data) => {
        setPost(data.post);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching post details:', error);
        setError(error);
        setLoading(false);
      });
  }, [id]);

  // Show a loading message while fetching data
  if (loading) {
    return <p>Loading post...</p>;
  }

  // Display an error message if the fetch fails
  if (error) {
    return <p>{error.message}</p>;
  }

  return (
    <div className="page-container">
      <Header />
      <main className="main-content">
        {/* Render post details if available */}
        {post && (
          <article>
            <h1>{post.title}</h1>
            <p>{post.summary}</p>
            <p>Author: {post.author?.name}</p>
            <p>Published on: {post.publishDate ? new Date(post.publishDate).toLocaleDateString() : 'N/A'}</p>
          </article>
        )}
      </main>
      <Footer />
    </div>
  );
}

export default PostDetail;