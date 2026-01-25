# Task 6: Host a Website Using GitHub Pages

This guide outlines the steps to host your static website for free using **GitHub Pages**. This allows you to share your portfolio with recruiters, friends, and the world via a public URL.

## Prerequisites

- A GitHub account.
- Git installed on your computer.
- Your project files (`index.html`, `style.css`, etc.) ready.

---

## Step 1: Initialize Git (If not already done)

Open your terminal (VS Code users: `Ctrl + ~`), navigate to your project folder, and run:

```bash
# Initialize a new Git repository
git init

# Check the status of your files
git status
```

*Explanation*: `git init` turns your folder into a directory that Git can track.

## Step 2: Create a GitHub Repository

1. Go to [GitHub.com](https://github.com) and sign in.
2. Click the **+** icon in the top right corner -> **New repository**.
3. **Repository name**: `personal-profile-website` (or any name you prefer).
4. Description: "My personal web development portfolio".
5. Visibility: **Public** (Required for free GitHub Pages).
6. **Do NOT** check "Add a README" (since you have local files).
7. Click **Create repository**.

## Step 3: Connect Local Project to GitHub

Copy the commands shown on the GitHub setup page under "…or push an existing repository from the command line". They will look like this:

```bash
# Add all files to staging area
git add .

# Commit changes with a message
git commit -m "Initial commit - Ready for hosting"

# Link local repo to remote GitHub repo
# Replace YOUR-USERNAME with your actual GitHub username
git remote add origin https://github.com/YOUR-USERNAME/personal-profile-website.git

# Rename branch to main (standard practice)
git branch -M main

# Push code to GitHub
git push -u origin main
```

## Step 4: Enable GitHub Pages

1. Go to your repository page on GitHub.
2. Click on the **Settings** tab (top right).
3. On the left sidebar, scroll down and click on **Pages**.
4. Under **Build and deployment** > **Source**, strict to "Deploy from a branch".
5. Under **Branch**, select **main** (or `master` if that's what you have) and folder **/ (root)**.
6. Click **Save**.

## Step 5: Get Your Live URL

- After clicking save, wait about 1-2 minutes.
- Refresh the Pages settings page.
- You will see a message at the top:
  > "Your site is live at **<https://your-username.github.io/personal-profile-website/>**"
- Click the link to view your website!

## Step 6: Updating Your Website

When you make changes to your code (e.g., updating a project description), follow these steps to redeploy:

```bash
# 1. Add changes
git add .

# 2. Commit changes
git commit -m "Updated project section"

# 3. Push to GitHub
git push
```

GitHub Pages will detect the new commit and automatically update the live site within a few minutes.

## Troubleshooting Common Issues

### 1. 404 Not Found

- **Cause**: Your main file is not named `index.html` or is in a subfolder.
- **Fix**: Ensure your homepage is exactly named `index.html` and is in the root directory (not inside a `src` or `files` folder).

### 2. Styles or Images Not Loading

- **Cause**: Using absolute paths (e.g., `C:/Users/Name/...`) or leading slashes properly.
- **Fix**: Use relative paths.
  - Correct: `<link rel="stylesheet" href="style.css">`
  - Correct: `<img src="images/profile.jpg">`
  - Incorrect: `<img src="/images/profile.jpg">` (might break if hosted in a subfolder).

---

# Interview Preparation

**Q: What is GitHub Pages?**
A: GitHub Pages is a static site hosting service that takes HTML, CSS, and JavaScript files directly from a repository on GitHub and publishes a website. It's free and ideal for portfolios and documentation.

**Q: What is the difference between static and dynamic websites?**
A:

- **Static**: Pre-built files (HTML/CSS) delivered to the user exactly as stored. Content changes require code edits. Fast and secure.
- **Dynamic**: Content is generated on the server on-the-fly (using PHP, Python, Node.js) often by fetching data from a database. Used for social networks, e-commerce, etc.

**Q: Why is version control (Git) important?**
A: It tracks changes to code over time, allows you to revert to previous versions if something breaks, and facilitates collaboration with other developers without overriding each other's work.

**Q: What is a repository?**
A: A repository (or "repo") is a storage location for your project. covers all your project's files and the revision history of each file.

**Q: How does static hosting work?**
A: A web server stores your files. When a user visits your URL, the browser requests the files, and the server sends them back exactly as they are. No server-side processing or database queries occur.
