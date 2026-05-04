# Recipe App — Web PWA Setup Guide
## GitHub Pages → iPhone Home Screen

---

## What You're Building

A Progressive Web App (PWA) hosted free on GitHub Pages. Once added to your
iPhone's home screen it looks and behaves like a native app: full-screen, its own
icon, offline-capable. All data is stored locally on your phone in the browser —
no database, no server, no cost.

---

## Step 1: Create a GitHub Repository

1. Go to https://github.com and sign in (or create a free account).
2. Click the green **"New"** button (top-left) to create a new repository.
3. Fill in:
   - **Repository name**: `recipe-app` (or anything you like)
   - **Visibility**: Public (required for free GitHub Pages)
   - **Do NOT** initialize with README, .gitignore, or license
4. Click **"Create repository"**.
5. Keep this page open — you'll need the URL in Step 3.

---

## Step 2: Set Up the Project on Your PC

### 2.1 Install Git (if you haven't)

Download from https://git-scm.com/download/win and install with default settings.

### 2.2 Create the project folder

Open a terminal (Command Prompt, PowerShell, or VS Code terminal) and run:

```bash
mkdir recipe-app
cd recipe-app
```

### 2.3 Copy the project files

Copy ALL the files I provided into this `recipe-app` folder.  
Your folder should look like this:

```
recipe-app/
├── index.html          ← The entire app (single file)
├── manifest.json       ← PWA configuration
├── sw.js               ← Service worker (offline support)
├── icons/
│   ├── icon-192.png    ← App icon (you create these)
│   └── icon-512.png    ← App icon (you create these)
└── README.md           ← This guide (optional)
```

### 2.4 Create app icons

You need two PNG icons for the home screen:
- `icons/icon-192.png` → 192×192 pixels
- `icons/icon-512.png` → 512×512 pixels

**Quick way**: Go to https://favicon.io/emoji-favicons/ and search for a
cooking emoji (🍳 or 🍽️). Download it and resize to 192px and 512px.
Put them in the `icons/` folder.

---

## Step 3: Push to GitHub

In the terminal, inside your `recipe-app` folder:

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/recipe-app.git
git push -u origin main
```

Replace `YOUR_USERNAME` with your actual GitHub username.

---

## Step 4: Enable GitHub Pages

1. Go to your repository on GitHub (https://github.com/YOUR_USERNAME/recipe-app).
2. Click **Settings** (top menu bar, far right).
3. In the left sidebar, click **Pages**.
4. Under **"Source"**, select **"Deploy from a branch"**.
5. Under **"Branch"**, select **main** and **/ (root)**, then click **Save**.
6. Wait 1–2 minutes, then refresh the page.
7. You'll see a green banner: **"Your site is live at
   https://YOUR_USERNAME.github.io/recipe-app/"**

---

## Step 5: Install on Your iPhone

1. Open **Safari** on your iPhone (must be Safari — Chrome won't work for PWAs
   on iOS).
2. Go to: `https://YOUR_USERNAME.github.io/recipe-app/`
3. Tap the **Share button** (square with arrow, bottom center).
4. Scroll down and tap **"Add to Home Screen"**.
5. Name it "Recipes" (or whatever you like) and tap **"Add"**.
6. The app icon now appears on your home screen.
7. Open it — it runs full-screen like a native app!

---

## Step 6: Updating the App

Whenever you make changes:

```bash
cd recipe-app
git add .
git commit -m "Updated the app"
git push
```

GitHub Pages will redeploy automatically in 1–2 minutes. The service worker
will detect the update and load the new version next time you open the app.

---

## FAQ

**Will I lose my recipes if I update the app?**  
No. Recipes are stored in IndexedDB on your phone, completely separate from the
app files. Updating the code does not touch your data.

**What if I clear Safari data?**  
That will delete your stored recipes. Avoid: Settings → Safari → Clear History
and Website Data. If you want to be safe, the app has an export feature to save
your recipes as a JSON file.

**Can I share this with friends / family?**  
Yes! Anyone can visit the same URL and add it to their home screen. Each person's
recipes are private and stored only on their own device.

**Does it work offline?**  
Yes. After the first visit, the service worker caches the app. You can browse
and create recipes without internet. Images from YouTube thumbnails will need
internet though.

**Can I use a custom domain instead of github.io?**  
Yes. Buy a domain (e.g. from Namecheap, ~$10/year), then in your GitHub repo
Settings → Pages → Custom domain, enter your domain and follow the DNS
instructions.

**How much storage do I have?**  
Browsers typically allow 50–100+ MB of IndexedDB storage per site. That's enough
for thousands of recipes with images.
