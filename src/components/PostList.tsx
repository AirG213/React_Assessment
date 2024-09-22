import { Link } from 'react-router-dom'; 
// Import for animations
import { CSSTransition, TransitionGroup } from 'react-transition-group'; 
import '../styles/PostList.scss'; 

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
    <ul className="post-list">
      {/* If loading is true, show loading text */}
      {loading ? (
        <p>Loading posts...</p>
      ) : (
        // Use TransitionGroup to wrap list of posts
        <TransitionGroup component={null}>
          {posts.slice(0, visiblePosts).map((data) => (
            // Add CSSTransition for each post to animate
            <CSSTransition key={data.id} timeout={500} classNames="fade">
              <li className="post-item">
                <Link to={`/post/${data.id}`} className="post-link">
                  <article className="post-card">
                    <header>
                      {/* Show the author on top */}
                      {data.author && <p className="post-author">{data.author.name}</p>}
                      {/* Show the title */}
                      <h2 className="post-title">{data.title}</h2>
                    </header>
                    {/* Show the post summary in a smaller font */}
                    <p className="post-summary">{data.summary}</p>
                  </article>
                </Link>
              </li>
            </CSSTransition>
          ))}
        </TransitionGroup>
      )}
    </ul>
  );
};

export default PostList;
