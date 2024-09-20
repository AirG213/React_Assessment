import { Link } from 'react-router-dom'; // Import Link component from react-router-dom
import { CSSTransition, TransitionGroup } from 'react-transition-group'; // Import for animations
import '../styles/PostList.css'; 

// Component to display a list of posts
function PostList({ posts, loading, visiblePosts }) {
  return (
    <ul>
      {/* If loading is true, show loading text */}
      {loading ? (
        <p>Loading posts...</p>
      ) : (
        // Use TransitionGroup to wrap list of posts
        <TransitionGroup component={null}>
          {posts.slice(0, visiblePosts).map((data) => (
            // Add CSSTransition for each post to animate
            <CSSTransition key={data.id} timeout={500} classNames="fade">
              <li>
                <article>
                  <header>
                    {/* Link post title to detailed post page */}
                    <h2>
                      <Link to={`/post/${data.id}`}>{data.title}</Link>
                    </h2>
                    {/* Conditionally render author name if it exists */}
                    {data.author && <p>{data.author.name}</p>}
                  </header>
                  {/* Show the post summary */}
                  <p>{data.summary}</p>
                </article>
              </li>
            </CSSTransition>
          ))}
        </TransitionGroup>
      )}
    </ul>
  );
}

export default PostList;
