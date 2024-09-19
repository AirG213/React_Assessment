import { Link } from 'react-router-dom'; // Import Link component from react-router-dom

// Component to display a list of posts
function PostList({ posts, loading, visiblePosts }) {
  return (
    <ul>
      {/* Conditionally render loading text or list of posts */}
      {loading ? (
        <p>Loading posts...</p>
      ) : (
        posts.slice(0, visiblePosts).map((data) => (
          <li key={data.id}>
            <article>
              <header>
                <h2>
                  <Link to={`/post/${data.id}`}>{data.title}</Link> {/* Add link to post details */}
                </h2>
                {/* Conditionally render author name if available */}
                {data.author && <p>{data.author.name}</p>}
              </header>
              <p>{data.summary}</p>
            </article>
          </li>
        ))
      )}
    </ul>
  );
}

export default PostList;
