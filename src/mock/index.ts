// Import Response for type checking
import { createServer, Response } from 'miragejs'; 

// Import posts data
import postsData from './data.json'; 

// Define the structure of the post for TypeScript typing
interface Post {
  id: string;
  title: string;
  summary: string;
  author: { name: string };
  publishDate: string;
  categories: { name: string }[];
}

// Create the MirageJS server
createServer({
  routes() {
    // Define namespace for API routes
    this.namespace = 'api';

    // Route to get all posts
    this.get('/posts', () => {
      // Cast data to Post[] type
      return { posts: postsData.posts as Post[] }; 
    });

    // Route to get a specific post by ID
    this.get('/posts/:id', (schema, request) => {
      const id = request.params.id;
      const post = (postsData.posts as Post[]).find((post) => post.id === id);

      if (!post) {
        // Return a 404 response if the post is not found
        return new Response(404, {}, { error: 'Post not found' });
      }
      
      return { post };
    });
  }
});
