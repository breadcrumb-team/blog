# Blog

Breadcrumb blog. Available at https://www.breadcrumb.ai/blog

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/breadcrumb-team/Blog.git
   cd Blog
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

   The site will be available at `http://localhost:4321`

## Building for Production

To build the site for production:

```bash
npm run build
```

To preview the production build locally:

```bash
npm run preview
```

## Deployment

Pushing to `main` will automatically deploy the changes to production.

## Adding Blog Posts

Blog posts are written in MDX format and should be placed in the `src/content/blog/` directory. Here's how to create a new blog post:

1. Create a new `.mdx` file in `src/content/blog/` with the following frontmatter:
   ```mdx
   ---
   title: "Your Blog Post Title"
   description: "A brief description of your post"
   pubDate: "2024-03-31"
   author: "Your Name"
   image: "/blog-placeholder-1.jpg"
   tags: ["tag1", "tag2"]
   ---

   Your blog post content goes here...
   ```

2. You can use MDX features in your posts:
   - Import and use React components
   - Use JSX syntax
   - Add custom components
   - Use markdown syntax

3. Images should be placed in the `public/` directory and referenced with a leading slash (e.g., `/image.jpg`)
