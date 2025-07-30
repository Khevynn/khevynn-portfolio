const express = require("express");
const router = express.Router();
const cookieParser = require("cookie-parser");
const authServices = require("../services/authServices");
const AuthUtils = require("../utils/authUtils");

// Initialize cookie parser middleware
router.use(cookieParser());

/* Login user */
router.post("/login", async function (req, res, next) {
  try {
    const result = await authServices.loginUser(req.body);
    if (result.cookies) {
      // Set cookies in the response
      for (const cookie of result.cookies) {
        res.cookie(cookie.name, cookie.value, cookie.options);
      }
    }

    res.status(result.status).send(result.data);
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
});

/* Register user */
router.post("/register", async function (req, res, next) {
  try {
    const result = await authServices.registerUser(req.body);
    res.status(result.status).send(result.data);
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
});

/* Logout user */
router.post("/logout", async function (req, res, next) {
  try {
    res
      .clearCookie("refreshToken", { httpOnly: true, secure: true })
      .clearCookie("authToken", { httpOnly: true, secure: true })
      .status(200)
      .send({ message: "Logout successful" });
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
});

/* Verify if user is logged in */
router.get("/is-logged-in", async function (req, res, next) {
  try {
    const token = req.cookies?.authToken;
    if (!token) {
      console.log("No auth token found in cookies");
      return res.status(401).send({ message: "User not logged in" });
    }

    const user = await AuthUtils.verifyAuthToken(token);
    if (!user) {
      console.log("Invalid auth token");
      return res.status(401).send({ message: "Invalid auth token" });
    }

    res.status(200).send({ message: "User is logged in", user });
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
});

/* Refresh token */
router.post("/refresh-token", async function (req, res, next) {
  try {
    const token = req.cookies.refreshToken;
    if (!token) {
      return res.status(401).send({ message: "No refresh token provided" });
    }

    const user = await AuthUtils.verifyRefreshToken(token);
    if (!user) {
      return res.status(401).send({ message: "Invalid refresh token" });
    }

    const newToken = await AuthUtils.generateAuthToken(user);
    res
      .status(200)
      .cookie("refreshToken", token, { httpOnly: true, secure: true })
      .cookie("authToken", newToken, { httpOnly: true, secure: true })
      .send({ message: "Token refreshed successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
