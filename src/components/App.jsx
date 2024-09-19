import React, { useState, useEffect } from 'react';

function App() {
// State declaration to store posts, loading state, selected categories, and filtered posts
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true); // Add state for loading
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  
  // Handle changes in category selection by adding/removing categories from the state
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

  // State to manage the number of posts visible
  const [visiblePosts, setVisiblePosts] = useState(5);

  // Function to load more posts
  const loadMore = () => {
    setVisiblePosts((prevVisible) => prevVisible + 5);
  };

// useEffect to fetch posts from API and set posts and loading state
  useEffect(() => {
    // Make a request to the API to retrieve data from posts
    fetch('/api/posts')
      .then((res) => {
        // Correct response check 
        if (!res.ok) {
          throw new Error ('Error while retrieving posts');
        }
        // Convert response to JSON
        return res.json();
      })
      .then((json) => {
        // Log the JSON response to ensure it contains 'posts'
        console.log(json); 
        // Update status with data from retrieved posts
        setPosts(json.posts);
        // Set loading to false once data is fetched
        setLoading(false); 
      })
      .catch((error) => {
        // Manage errors during the query
        console.error("Error : ", error);
        // Set loading to false even if there's an error
        setLoading(false);
      });
  }, []); 

  // useEffect to filter posts based on selected categories and update filteredPosts
  useEffect(() => {
    if (selectedCategories.length === 0) {
      // Show all posts if no category is selected
      setFilteredPosts(posts); 
    } else {
      const filtered = posts.filter((post) =>
        post.categories.some((category) =>
          selectedCategories.includes(category.name)
        )
      );
      setFilteredPosts(filtered);
    }
  // Trigger this effect when selectedCategories or posts change  
  }, [selectedCategories, posts]); 

  console.log(filteredPosts);
  // Log post data to check content in console
  console.log(posts);

  return (
    <main>
      <header>
        <h1>Blog Posts</h1>
      </header>
      <section>
        <h2>Filter by Category:</h2>
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
                  onChange={handleCategoryChange}
                />
                <label>{categoryName}</label>
              </div>
            ))}
          </>
        )}
      </section>
      <section>
        <ul>
          {loading ? (
            <p>Loading posts...</p>
          ) : (
            filteredPosts.slice(0, visiblePosts).map((data) => (
              <li key={data.id}>
                <article>
                  <header>
                    <h2>{data.title}</h2>
                    {data.author && <p>{data.author.name}</p>}
                  </header>
                  <p>{data.summary}</p> {/* Optional: Add more properties based on your data */}
                </article>
              </li>
            ))
          )}
        </ul>
        {visiblePosts < filteredPosts.length && (
          <button onClick={loadMore}>Load More</button>
        )}
      </section>
      <footer>
      <p>Created by Rayan Gouadfel. Check out my work on <a href="https://github.com/AirG213/React_Assessment" target="_blank" rel="noopener noreferrer">GitHub</a>.</p>
      </footer>
    </main>
  );
  
}

export default App;
