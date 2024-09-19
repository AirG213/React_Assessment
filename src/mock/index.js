import { createServer } from 'miragejs';
import postsData from './data.json';

createServer({
  routes() {
    // Define namespace for API routes
    this.namespace = 'api';

    // Route to get all posts
    this.get('/posts', () => {
      return { posts: postsData.posts };
    });

    // Route to get a specific post by ID
    this.get('/posts/:id', (schema, request) => {
      let id = request.params.id;
      let post = postsData.posts.find((post) => post.id === id);

      if (!post) {
        return new Response(404, {}, { error: 'Post not found' });
      }
      return { post };
    });
  }
});
