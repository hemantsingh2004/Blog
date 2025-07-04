# 📝 Blog Web App (EJS + PostgreSQL)

A fully functional blog web application built using **Express.js**, **EJS templating**, and **PostgreSQL** as the database. This project was a major step forward in my web development journey — especially during the phase where I was learning server-side rendering with EJS and database connectivity using `pg`.

---

## 🚀 What It Does

This application allows users to:

- 👤 Register and log in (simple JavaScript-based session logic)
- 🖊️ Add blog posts
- 📚 View all blog posts or just their own
- 🗑️ Delete posts (only if the user is the author)
- 📝 Edit their existing blog posts
- 🧭 Navigate across pages using EJS views

The authentication was custom-written using JavaScript and session logic **without Passport.js** or any modern auth libraries — it has flaws but worked well enough for my purpose at the time.

---

## 📚 My Learning Journey

This was my **first complete full-stack project** using:

- EJS templating for rendering pages
- PostgreSQL for database operations
- Express.js for routing and middleware
- CSS and vanilla JavaScript for the frontend

At that time, I didn’t know about Passport.js, JWTs, or modern auth mechanisms — so I created my own basic login and session management flow.

> Looking back, it was an ambitious and exciting project that helped me understand real-world CRUD, user sessions, database joins, and how views and routes connect in server-rendered apps.

---

## 🛠 Tech Stack

- **Frontend:** EJS templates + CSS + JS
- **Backend:** Express.js
- **Database:** PostgreSQL (`pg` node module)

---

## 📁 Project Structure
```
project-root/
├── public/                 # Static assets
│   ├── css/
│   ├── js/
│   └── svg/yourPost/
├── view/                  # EJS template views
│   ├── addPost/
│   ├── blogs/
│   ├── main/
│   ├── register/
│   ├── showBlogs/
│   ├── signIn/
│   └── yourPosts/
├── index.js               # Main Express server
├── postHandling.js        # All post and blog-related database logic
├── register.js            # Registration validation logic
├── credentials.js         # (Not committed) DB credentials
├── improvement.txt        # File where I documented flaws I found later
└── README.md              # This file
```
---

## 🔧 How to Run Locally

### 1. Clone the Repository

```bash
git clone https://github.com/hemantsinghdev/Blog
cd blog-ejs-app
````

### 2. Set Up PostgreSQL

Create a PostgreSQL database and user table with fields for:

* `user_id`, `user_name`, `age`, `speciality`, `accType`, `password`

And a blog table for:

* `blog_id`, `user_id`, `heading`, `blog_post`, `date`

### 3. Create `credentials.js`

This file stores your database credentials:

```js
export const credentials = {
  user: 'yourUser',
  host: 'localhost',
  database: 'yourDatabase',
  password: 'yourPassword',
  port: 5432
};
```

> ⚠️ Make sure not to commit this file.

### 4. Install Dependencies & Run

```bash
npm install
node index.js
```

Visit `http://localhost:3000` in your browser.

---

## 🧠 Key Features

* Basic user registration and login
* Post blogs (title + content + date)
* View all blogs or your own
* Edit and delete your own blogs
* UI fully built using EJS
* APIs for blog fetching and deletion

---

## 📝 Developer Note

This project holds a **special place** in my learning timeline. It was the first time I:

* Worked with EJS and understood templating
* Used PostgreSQL in a web app
* Implemented route handling and REST-like APIs
* Tried to build authentication logic from scratch
* Created a page-based folder structure in views

---

## ⚠️ Known Issues (Acknowledged)

I documented some of the flaws(at the time of development, i.e. naive) in `improvement.txt`

---

## 📌 What I Learned

* Rendering with EJS layouts and partials
* Middleware setup in Express
* Querying PostgreSQL using `pg`
* Managing view states and conditional rendering
* Passing user state across routes

---

## 💡 Future Improvements

If I ever revisit this project, I’d like to:

* Use Passport.js or JWT for authentication
* Hash passwords with `bcrypt`
* Modularize route controllers and separate database logic fully
* Use session storage or tokens for login
* Add image upload and better blog formatting

---

> Created by [Hemant Singh](https://github.com/hemantsinghdev)
> Built when learning EJS, SQL, and backend architecture — and still proud of how much it taught me.
