const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const AuthUtils = require("../utils/authUtils");

/**
 * Authentication middleware that verifies JWT tokens and handles refresh token rotation
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
module.exports.verifyAuth = async function (req, res, next) {
  try {
    // Extract tokens from request
    const { accessToken, refreshToken } = extractTokens(req);

    // Check if access token exists
    if (!accessToken) {
      return sendError(res, 401, "Access denied. No token provided.");
    }

    // Try to verify the access token
    const tokenResult = await verifyAccessToken(accessToken);

    if (tokenResult.success) {
      // Token is valid, proceed
      req.user = tokenResult.decoded;
      return next();
    }

    // Access token is invalid/expired, try refresh token
    if (tokenResult.isExpired && refreshToken) {
      const refreshResult = await handleTokenRefresh(res, refreshToken);

      if (refreshResult.success) {
        req.user = refreshResult.user;
        return next();
      }
    }

    // Both tokens failed
    clearAuthCookies(res);
    return sendError(res, 401, "Invalid or expired token");
  } catch (error) {
    console.error("Auth middleware error:", error);
    return sendError(res, 500, "Internal Server Error");
  }
};

/**
 * Extract access and refresh tokens from request headers and cookies
 */
function extractTokens(req) {
  const accessToken =
    req.cookies["authToken"] || req.headers.authorization?.split(" ")[1];

  const refreshToken = req.cookies?.refreshToken;

  return { accessToken, refreshToken };
}

/**
 * Verify access token and return result with success status
 */
async function verifyAccessToken(token) {
  try {
    const decoded = AuthUtils.verifyAuthToken(token);
    return { success: true, decoded };
  } catch (error) {
    return {
      success: false,
      isExpired: error.name === "TokenExpiredError",
    };
  }
}

/**
 * Handle refresh token verification and generate new tokens
 */
async function handleTokenRefresh(res, refreshToken) {
  try {
    // Verify refresh token
    const refreshDecoded = AuthUtils.verifyRefreshToken(refreshToken);

    // Generate new tokens
    const newAccessToken = AuthUtils.generateAuthToken(refreshDecoded.user);
    const newRefreshToken = AuthUtils.generateRefreshToken(refreshDecoded.user);

    // Set new tokens in response
    setTokenCookies(res, newAccessToken, newRefreshToken);
    res.setHeader("Authorization", `Bearer ${newAccessToken}`);

    return { success: true, user: refreshDecoded };
  } catch (error) {
    clearAuthCookies(res);
    return { success: false };
  }
}

/**
 * Set authentication cookies with secure options
 */
function setTokenCookies(res, accessToken, refreshToken) {
  const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  };

  // Access token (15 minutes)
  res.cookie("authToken", accessToken, {
    ...cookieOptions,
    maxAge: 15 * 60 * 1000,
  });

  // Refresh token (7 days)
  res.cookie("refreshToken", refreshToken, {
    ...cookieOptions,
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
}

/**
 * Clear authentication cookies
 */
function clearAuthCookies(res) {
  res.clearCookie("refreshToken");
}

/**
 * Send standardized error response
 */
function sendError(res, status, message) {
  return res.status(status).json({ message });
}
