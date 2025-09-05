# 🔗 LinkPage

A self-hosted, customizable LinkTree alternative to showcase your links, built with Next.js and Tailwind CSS.

![LinkPage Preview](.github/screenshot.png)

## ✨ Features

- **Easy to set up**: Configure everything with a single JSON file.
- **Customizable**: Choose from multiple themes, or create your own color scheme.
- **Flexible Links**: Add social icons, descriptions, and custom backgrounds to your links.
- **Analytics**: Track your page views with Google Analytics, Plausible, or Umami.
- **SEO Ready**: Automatic Open Graph images and meta tags.
- **Fast & Light**: Built with Next.js for great performance.
- **Self-Hostable**: Deploy it anywhere, including Vercel or with Docker.

## 🚀 Getting Started

You can get LinkPage up and running with Docker or by building it from source.

### Docker (Recommended)

This is the fastest and easiest way to get started.

1.  **Create `config.json`**

    Create a `config.json` file. You can copy the [`config.example.json`](https://github.com/kldzj/linkpage/blob/main/config.example.json) to get started quickly.

2.  **Create `images` Folder**

    Create a `public/images` directory and place your avatar and any other images inside it.

3.  **Run the Docker Container**

    ```bash
    docker run -p 3000:3000 \
      -v $(pwd)/config.json:/app/config.json \
      -v $(pwd)/public/images:/app/public/images \
      ghcr.io/kldzj/linkpage:latest
    ```

4.  Open [http://localhost:3000](http://localhost:3000) to see your page.

### From Source

Follow these steps if you want to customize the code or contribute to the project.

1.  **Fork the Repository**

    Start by forking the repository to your own GitHub account.

2.  **Clone and Install**

    ```bash
    git clone https://github.com/your-username/linkpage.git
    cd linkpage
    yarn install
    ```

3.  **Configure Your Profile**

    Copy `config.example.json` to `config.json` and edit it with your information.

4.  **Run Development Server**

    ```bash
    yarn dev
    ```

5.  **Deploy**

    I recommend deploying with Vercel for the best performance and easiest setup.

## 🎨 Customization

Customize your page's look and feel in `config.json`.

### Themes

Choose a built-in theme or set a custom accent color.

```jsonc
{
  "theme": {
    "colorScheme": "blue", // default, blue, purple, green
    "accentColor": "#6366f1" // Custom accent color
  }
}
```

**Available Color Schemes:**

- `default` - Clean and professional
- `blue` - Ocean blue theme
- `purple` - Royal purple theme
- `green` - Forest green theme

### Link Types

**Simple Links:**

```jsonc
{
  // Simple key-value pair where the key is the platform name and the value is the URL
  "github": "https://github.com/username"
}
```

**Advanced Links:**

```json
{
  "portfolio": {
    "title": "My Portfolio",
    "url": "https://mysite.com",
    "description": "Check out my latest work",
    "featured": true,
    "bgColor": "#1f2937",
    "color": "#ffffff",
    "size": "medium"
  }
}
```

**Background Image Links:**

```json
{
  "project": {
    "title": "Latest Project",
    "url": "https://project.com",
    "bgImage": "project-bg.jpg",
    "size": "extra-large"
  }
}
```

### Link Sizes

Control the size and prominence of your links.

- `small`: Compact padding, great for secondary links.
- `medium`: Standard padding, the default size.
- `large`: More padding, perfect for important links.
- `extra-large`: Maximum padding, ideal for background images.

### Icons

Icons are automatically detected for many common platforms like GitHub, Twitter, LinkedIn, and more.

## 📊 Analytics

Enable analytics in your `config.json`:

```json
{
  "analytics": {
    "enabled": true,
    "googleAnalytics": "GA_MEASUREMENT_ID",
    "plausible": "yourdomain.com",
    "umami": {
      "websiteId": "your-website-id",
      "src": "https://your-umami-instance.com/script.js"
    }
  }
}
```

**Supported Analytics Platforms:**

- **Google Analytics**: Traditional web analytics with detailed insights
- **Plausible**: Privacy-focused, lightweight analytics
- **Umami**: Self-hosted, privacy-first analytics platform

## 🎨 Branding & Attribution

Control the LinkPage branding footer:

```json
{
  "branding": {
    "hideFooter": true,
    "sponsoredOnGitHub": true
  }
}
```

**Footer Options:**

- **`hideFooter: false`** (default) - Shows "Powered by LinkPage" footer with sponsor link
- **`hideFooter: true`** - Hides footer, but requires GitHub sponsorship
- **`sponsoredOnGitHub: true`** - Confirms you're a GitHub sponsor

**License Requirement:**
To hide the footer, you must:

1. 💖 [Sponsor the project](https://github.com/sponsors/kldzj) on GitHub
2. Set `sponsoredOnGitHub: true` in your config
3. Set `hideFooter: true` to hide the footer

## 🖼️ Open Graph Images

LinkPage automatically generates Open Graph images for social media sharing using your profile name, bio, and avatar. No configuration is needed.

## 🛠️ Development

```bash
# Install dependencies
yarn install

# Run development server
yarn dev

# Build for production
yarn build

# Start production server
yarn start

# Lint and format code
yarn lint
yarn format
```

## 🎯 Configuration

The full configuration schema is defined in `src/lib/config.ts`. Here are some key options:

- **Profile**: `name`, `biography`, `avatar`, `domain`
- **Theme**: `layout`, `colorScheme`, `backgroundType`, `accentColor`
- **SEO**: `title`, `description`, `keywords`, `favicon`
- **Analytics**: `enabled`, `googleAnalytics`, `plausible`, `umami`
- **Branding**: `hideFooter`, `sponsoredOnGitHub`

The `domain` field is required for SEO and Open Graph images to work correctly.

```json
{
  "domain": "https://yourdomain.com"
}
```

## 🤝 Contributing

Contributions are welcome! Feel free to open an issue or submit a pull request.

1.  Fork the repository
2.  Create a feature branch
3.  Make your changes
4.  Submit a pull request

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

**What this means:**

- ✅ Free for personal and commercial use
- ✅ Modify and distribute freely
- ✅ No warranty or liability
- 💖 Attribution appreciated

The MIT License provides maximum freedom while the sponsorship model helps sustain development!

## 💝 Support

If you find this project helpful, consider:

- 💖 [Sponsoring on GitHub](https://github.com/sponsors/kldzj) (unlocks footer customization!)
- ⭐ Starring the repository
- 🐛 Reporting bugs and issues
- 💡 Suggesting new features
- 🤝 Contributing code improvements

---

Built with ❤️ using Next.js, TypeScript, Tailwind CSS, and shadcn/ui.
