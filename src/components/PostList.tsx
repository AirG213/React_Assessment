import { Link } from 'react-router-dom'; 
// Import for animations
import { CSSTransition, TransitionGroup } from 'react-transition-group'; 
import '../styles/PostList.css'; 

// Interface for typing post data
interface Post {
  id: number;
  title: string;
  summary: string;
  author?: {
    name: string;
  };
}

// Interface to type component props
interface PostListProps {
  posts: Post[];
  loading: boolean;
  visiblePosts: number;
}

// Component to display a list of posts
const PostList: React.FC<PostListProps> = ({ posts, loading, visiblePosts }) => {
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
};

export default PostList;
