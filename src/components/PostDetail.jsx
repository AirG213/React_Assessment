import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import "../styles/PostDetail.css";

function PostDetail() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  if (loading) {
    return <p>Loading post...</p>;
  }

  if (error) {
    return <p>{error.message}</p>;
  }

  return (
    <div className="page-container">
      <Header />
      <main className="main-content">
        {post && (
          <article>
            <h1>{post.title}</h1>
            <p>{post.summary}</p>
            <p>Author: {post.author.name}</p>
            <p>Published on: {new Date(post.publishDate).toLocaleDateString()}</p>
          </article>
        )}
      </main>
      <Footer />
    </div>
  );
}

export default PostDetail;