const UserRepository = require("../repositories/user.repository");
const AuthUtils = require("../utils/authUtils");

module.exports = {
  async loginUser(data) {
    try {
      const user = await UserRepository.findByEmail(data.email);
      if (!user) {
        return {
          status: 401,
          data: { message: "Invalid user or password" },
          cookie: {
            name: "refreshToken",
            value: null,
          },
        };
      }

      // Check password
      const isValidPassword = await AuthUtils.comparePassword(
        data.password,
        user.password
      );
      if (!isValidPassword) {
        return {
          status: 401,
          data: { message: "Invalid user or password" },
          cookie: {
            name: "refreshToken",
            value: null,
          },
        };
      }

      return {
        status: 200,
        data: {
          message: "Login successful",
        },
        cookies: [
          {
            name: "authToken",
            value: await AuthUtils.generateAuthToken(user),
            options: { httpOnly: true, secure: true },
          },
          {
            name: "refreshToken",
            value: await AuthUtils.generateRefreshToken(user),
            options: { httpOnly: true, secure: true },
          },
        ],
      };
    } catch (error) {
      console.error("Error logging in user:", error);
      return { status: 500, data: { message: "Internal Server Error" } };
    }
  },

  async   registerUser(data) {
    try {
      if(!AuthUtils.isValidEmail(data.email)) {
        return {
          status: 400,
          data: { message: "Invalid email format" },
        };
      }

      //Verify password strength
      if (!AuthUtils.isValidPassword(data.password)) {
        return {
          status: 400,
          data: {
            message:
              "Password must be at least 6 characters long and include uppercase, lowercase, number, and special character.",
          },
        };
      }

      if (!AuthUtils.isSameApiKey(data.api_key)) {
        return {
          status: 401,
          data: { message: "Incorrect API Key" },
        };
      }

      const existingUser = await UserRepository.findByEmail(data.email);
      if (existingUser) {
        return { status: 400, data: { message: "User already exists" } };
      }

      // Hash password
      data.password = await AuthUtils.hashPassword(data.password);

      const newUser = await UserRepository.create(data);
      return {
        status: 201,
        data: { message: "User registered successfully" },
      };
    } catch (error) {
      console.error("Error registering user:", error);
      return { status: 500, data: { message: "Internal Server Error" } };
    }
  },
};
