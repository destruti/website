# NodeJs, Express, EJS & MongoDB - Complete Example

Welcome to this personal project built to showcase my skills in Node.js, Express, EJS, and MongoDB. This project serves as a complete example for those interested in building dynamic, server-side rendered applications using these technologies.

---

## Tech Stack
This project leverages the following technologies:

- **Node.js** - JavaScript runtime for building server-side applications
- **Express** - Minimal and flexible Node.js web framework
- **EJS** - Embedded JavaScript templating engine for rendering dynamic HTML
- **MongoDB** - NoSQL database for flexible and scalable data storage

---

## 🛠️ Setup and Installation

### 1. Clone the Repository
Clone the repository to your local machine:
```bash
$ git clone https://github.com/destruti/website
$ cd website
```

### 2. Configure Environment Variables
Create a `.env` file in the root directory and add the following credentials:
```env
MONGODB_URI=mongodb+srv://<username>:<password>@clusterName.xxxxxxx.mongodb.net/<database>
JWT_SECRET=MySecretBlog
```
Replace `<username>`, `<password>`, and `<database>` with your MongoDB credentials and database name.

> **Tip:** If you don't have a MongoDB account, you can create one for free at [MongoDB Atlas](https://www.mongodb.com/).

### 3. Install Dependencies with NPM
Run the following command to install all project dependencies:
```bash
$ npm i bcrypt connect-mongo cookie-parser dotenv ejs express express-ejs-layouts express-session jsonwebtoken method-override mongoose

$ npm i nodemon --save-dev

$ npm install
```

### 4. Local Development Server
Start the server in development mode with hot reloading:
```bash
$ npm run dev
```
The application will be available at `http://localhost:5000` by default.

### 5. Deploy to Production
To deploy the application for production using **PM2**:
```bash
$ pm2 start app.js
```
---

### Live Website Example
[www.destruti.com](https://www.destruti.com)
