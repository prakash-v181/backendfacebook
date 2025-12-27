const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
require("dotenv").config();
const connectDb = require("./config/db");
const passport = require("./controllers/googleController");

const authRoute = require("./routes/authRoute");
const postRoute = require("./routes/postRoute");
const userRoute = require("./routes/userRoute");

const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());

// Allowed Origins for CORS
const allowedOrigins = [
  process.env.FRONTEND_URL,    // Vercel Frontend URL
  "http://localhost:3000",     // Local frontend
];

// CORS Setup
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("CORS blocked from: " + origin));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Database
connectDb();

// Passport
app.use(passport.initialize());

// Routes
app.use("/auth", authRoute);
app.use("/posts", postRoute);
app.use("/users", userRoute);

// Root API Check
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