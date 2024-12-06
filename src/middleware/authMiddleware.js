import { auth } from "../config/firebase.js";
import { onAuthStateChanged } from "firebase/auth";

export const requireAuth = async (req, res, next) => {
  onAuthStateChanged(auth, (user) => {
    console.log("Current User in requireAuth:", user);
    if (user) {
      next(); // User is authenticated, proceed to the next middleware
    } else {
      res.redirect("/"); // User is not authenticated, redirect to home
    }
  });
};

export const redirectIfAuthenticated = async (req, res, next) => {
  try {
    const user = auth.currentUser;
    if (user) {
      res.redirect("/home");
    } else {
      next();
    }
  } catch (error) {
    next();
  }
  onAuthStateChanged(auth, (user) => {
    console.log("Current User in redirectIfAuthenticated:", user);
    if (user) {
      next();
    } else {
      res.redirect("/"); // User is not authenticated, redirect to home
    }
  });
};
