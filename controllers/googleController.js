const passport = require("passport");
const User = require("../model/User");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
require("dotenv").config();

// Google OAuth Strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const email = profile?.emails?.[0]?.value;
        const photo = profile?.photos?.[0]?.value;
        const displayName = profile?.displayName;

        let user = await User.findOne({ email });

        if (!user) {
          const username =
            displayName ||
            email?.split("@")[0] ||
            `user_${Date.now()}`;

          user = await User.create({
            username,
            email,
            profilePicture: photo || "",
          });
        }

        return done(null, user);
      } catch (error) {
        console.error("Google Login Error:", error);
        return done(error, null);
      }
    }
  )
);

module.exports = passport;








// const passport = require("passport");
// const User = require("../model/User");
// const GoogleStrategy = require("passport-google-oauth20").Strategy;
// require("dotenv").config();

// passport.serializeUser((user, done) => {
//   done(null, user.id);
// });

// passport.deserializeUser(async (id, done) => {
//   try {
//     const user = await User.findById(id);
//     done(null, user);
//   } catch (err) {
//     done(err, null);
//   }
// });

// passport.use(
//   new GoogleStrategy(
//     {
//       clientID: process.env.GOOGLE_CLIENT_ID,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//       callbackURL: process.env.GOOGLE_CALLBACK_URL,
//       passReqToCallback: true,
//     },
//     async (req, accessToken, refreshToken, profile, done) => {
//       console.log("Google Profile Received:", profile);

//       const email = profile?.emails?.[0]?.value;
//       const photo = profile?.photos?.[0]?.value;
//       const displayName = profile?.displayName;

//       try {
//         let user = await User.findOne({ email });

//         if (user) {
//           console.log("Existing user found:", user.username);

//           let updated = false;

//           if (!user.username) {
//             user.username =
//               displayName || email.split("@")[0] || `user_${Date.now()}`;
//             updated = true;
//           }

//           if (!user.profilePicture && photo) {
//             user.profilePicture = photo;
//             updated = true;
//           }

//           if (updated) await user.save();

//           return done(null, user);
//         }

//         const username =
//           displayName ||
//           email.split("@")[0] ||
//           `user_${Date.now()}`;

//         console.log("Creating new user:", { username, email, photo });

//         user = await User.create({
//           username,
//           email,
//           profilePicture: photo || "",
//         });

//         return done(null, user);
//       } catch (error) {
//         console.error("Google Login Error:", error);
//         return done(error, null);
//       }
//     }
//   )
// );

// module.exports = passport;
