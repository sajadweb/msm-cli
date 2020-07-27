import express from 'express';
import blogController from '../controller/blog.controller';
import blogValidation from '../request/blog.validation';
const blogRouter = express.Router();

// Get Blogs
blogRouter.get('/', blogValidation.getBlog, blogController.getBlog);

// Get Blog
blogRouter.get('/blog/:blogId', blogValidation.getBlog,blogController.getBlog);

// Insert Blog
blogRouter.post('/blog', blogValidation.insertBlog,blogController.insertBlog);

// Update Blog
blogRouter.put('/blog/:blogId', blogValidation.updateBlog, blogController.updateBlog);

// Delete Blog
blogRouter.delete('/blog/:blogId', blogValidation.deleteBlog, blogController.destroyBlog);

export default blogRouter;