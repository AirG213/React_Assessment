import React, { useState, useEffect } from 'react';
import '../styles/MainPage.css'; // Import CSS specific to MainPage
import Header from './Header';
import PostList from './PostList';
import CategoryFilter from './CategoryFilter';
import LoadMoreButton from './LoadMoreButton';
import Footer from './Footer';

// Import useLocation
import { useLocation } from 'react-router-dom'; 

// MainPage component
function MainPage() {
  // State to store posts, loading state, selected categories, and filtered posts
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [visiblePosts, setVisiblePosts] = useState(5);

  // Handle changes in category selection
  const handleCategoryChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setSelectedCategories((prevSelected) => [...prevSelected, value]);
    } else {
      setSelectedCategories((prevSelected) =>
        prevSelected.filter((category) => category !== value)
      );
    }
  };

  // Function to load more posts
  const loadMore = () => {
    setVisiblePosts((prevVisible) => prevVisible + 5);
  };

  // Get the location object
  const location = useLocation(); 

  const parseQuery = (query) => {
    const params = new URLSearchParams(query);
    // Get all categories
    const categories = params.getAll('categories');
    setSelectedCategories(categories);
  };
  
  useEffect(() => {
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
  }, []); // Empty dependency array means this effect runs once on mount

  // useEffect to filter posts based on selected categories
  useEffect(() => {
    if (selectedCategories.length === 0) {
      setFilteredPosts(posts);
    } else {
      const filtered = posts.filter((post) =>
        post.categories.some((category) =>
          selectedCategories.includes(category.name)
        )
      );
      setFilteredPosts(filtered);
    }
  }, [selectedCategories, posts]); // Dependency array includes selectedCategories and posts

  return (
    <div className="page-container">
      <Header />
      <main className="container">
        {/* Render Header component */}
        <section>
          <h2>Filter by Category:</h2>
          {/* Render CategoryFilter component */}
          <CategoryFilter
            posts={posts}
            selectedCategories={selectedCategories}
            onCategoryChange={handleCategoryChange}
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
        {/* Render Footer component */}
        <Footer />
      </main>
      </div>
  );
}

export default MainPage;
