module.exports = {
  // Validation methods
  isValidPassword(password) {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{6,}$/;
    return passwordRegex.test(password);
  },
  isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  },
  isValidUsername(username) {
    const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
    return usernameRegex.test(username);
  },
  // Password handling methods
  async comparePassword(plainPassword, hashedPassword) {
    const bcrypt = require("bcrypt");
    return await bcrypt.compare(plainPassword, hashedPassword);
  },
  async hashPassword(password) {
    const bcrypt = require("bcrypt");
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds);
  },

  // Token generation methods
  async generateAuthToken(user) {
    const jwt = require("jsonwebtoken");
    const token = jwt.sign({ user }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    return token;
  },
  async generateRefreshToken(user) {
    const jwt = require("jsonwebtoken");
    const token = jwt.sign({ user }, process.env.JWT_REFRESH_SECRET, {
      expiresIn: "1d",
    });
    return token;
  },

  // Token verification methods
  async verifyAuthToken(token) {
    const jwt = require("jsonwebtoken");
    try {
      return jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
      return null;
    }
  },
  async verifyRefreshToken(token) {
    const jwt = require("jsonwebtoken");
    try {
      return jwt.verify(token, process.env.JWT_REFRESH_SECRET);
    } catch (error) {
      return null;
    }
  },
};
