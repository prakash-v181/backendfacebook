const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
require("dotenv").config();
const connectDb = require("./config/db");
const passport = require("./controllers/googleController");

// ROUTES
const authRoute = require("./routes/authRoute");
const postRoute = require("./routes/postRoute");
const userRoute = require("./routes/userRoute");
const storyRoute = require("./routes/storyRoute");

const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());

// Allowed Origins
const allowedOrigins = [
  process.env.FRONTEND_URL,
  "http://localhost:3000",
];

// CORS Setup (IMPORTANT)
app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Database Connection
connectDb();

// Passport Auth
app.use(passport.initialize());

// *********** MAIN ROUTES (FIXED) ***********
app.use("/auth", authRoute);
app.use("/users", userRoute);   // profile / check-auth / follow / mutual etc.
app.use("/posts", postRoute);   // post APIs -> GET /posts, POST /posts
app.use("/story", storyRoute);  // story APIs -> GET /story

// Root Test API
app.get("/", (req, res) => {
  res.send("Backend Running Successfully 🚀");
});

// Server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


// const express = require('express');
// const cookieParser = require('cookie-parser')
// const cors= require('cors');
// const connectDb = require('./config/db');
// require('dotenv').config()
// const authRoute= require('./routes/authRoute')
// const postRoute= require('./routes/postRoute')
// const userRoute = require('./routes/userRoute');
// const passport = require('./controllers/googleController');


// const app = express()
// app.use(express.json())
// app.use(cookieParser())


// const corsOptions = {
//     origin:process.env.FRONTEND_URL,
//     credentials:true,
// }
// app.use(cors(corsOptions))

// connectDb()
// app.use(passport.initialize())

// //api route
// app.use('/auth',authRoute)
// app.use('/users',postRoute)
// app.use('/users',userRoute)


// const PORT = process.env.PORT || 8000;
// app.listen(PORT, () => console.log(`server listening on ${PORT}`))