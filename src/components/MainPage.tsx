import React, { useState, useEffect } from 'react';
import '../styles/MainPage.scss'; 
import Header from './Header';
import PostList from './PostList';
import CategoryFilter from './CategoryFilter';
import LoadMoreButton from './LoadMoreButton';
import Footer from './Footer';
import { Post } from '../mock/types';

// Import useLocation
import { useLocation } from 'react-router-dom'; 

// MainPage component
function MainPage() {
  // State to store posts, loading state, selected categories, and filtered posts
  const [posts, setPosts] = useState<Post[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);
  const [visiblePosts, setVisiblePosts] = useState<number>(5); 
  const [loading, setLoading] = useState<boolean>(true);

  // Handle changes in category selection
  const handleCategoryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = event.target;
    if (checked) {
      setSelectedCategories((prevSelected) => [...prevSelected, value]);
    } else {
      setSelectedCategories((prevSelected) =>
        prevSelected.filter((category) => category !== value)
      );
    }
  };

  // Function to reset visible posts
  const handleResetVisiblePosts = () => {
    setVisiblePosts(5); // Reset to initial number of posts
  };

  // Function to load more posts
  const loadMore = () => {
    setVisiblePosts((prevVisible) => prevVisible + 5);
  };

  // Get the location object
  const location = useLocation(); 

  const parseQuery = (query: string) => {
    const params = new URLSearchParams(query);
    // Get all categories
    const categories = params.getAll('categories');

    // Only update the state if it's different from the current state
    if (categories.length > 0 && categories.toString() !== selectedCategories.toString()) {
      setSelectedCategories(categories);
      handleResetVisiblePosts(); // Reset visible posts when categories change
    }
  };

  useEffect(() => {
    /* eslint-disable react-hooks/exhaustive-deps */
    // Parse the query string from the URL
    parseQuery(location.search); 
  }, [location.search]);
  
  // useEffect to fetch posts from API
  useEffect(() => {
    fetch('/api/posts')
      .then((res) => {
        if (!res.ok) {
          throw new Error('Error while retrieving posts');
        }
        return res.json();
      })
      .then((json) => {
        setPosts(json.posts);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error: ", error);
        setLoading(false);
      });
  }, []); 

  // useEffect to filter posts based on selected categories
  useEffect(() => {
    if (selectedCategories.length === 0) {
      setFilteredPosts(posts);
    } else {
      const filtered = posts.filter((post) =>
        post.categories?.some((category) =>
          selectedCategories.includes(category.name)
        )
      );
      setFilteredPosts(filtered);
    }
  // Dependency array includes selectedCategories and posts
  }, [selectedCategories, posts]); 

  return (
    <div className="page-container">
      <Header />
      <main className="container">
        {/* Render Header component */}
        <section>
          {/* Render CategoryFilter component */}
          <CategoryFilter
            posts={posts}
            selectedCategories={selectedCategories}
            onCategoryChange={handleCategoryChange}
            onResetVisiblePosts={handleResetVisiblePosts} // Add the reset function
          />
        </section>
        <section>
          {/* Render PostList component */}
          <PostList posts={filteredPosts} loading={loading} visiblePosts={visiblePosts} />
          {/* Render LoadMoreButton component */}
          <LoadMoreButton
            visiblePosts={visiblePosts}
            filteredPosts={filteredPosts}
            onLoadMore={loadMore}
          />
        </section>
      </main>
      {/* Render Footer component outside of main */}
      <Footer />
    </div>
  );  
}

export default MainPage;
