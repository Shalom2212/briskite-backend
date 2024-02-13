const express = require("express");
const router = express.Router();
const validator = require("validator");
const authService = require("../repositories/sqlite/auth-service");
const authController = require("../controllers/authController");
const otpGenerator = require("otp-generator");

const isvalid = validator.default;
otpMap = {};

router.post("/auth/admin", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({
      message: "All parameters are required",
    });
  }

  if (!isvalid.isEmail(email)) {
    return res.status(400).json({
      param: "Email",
      message: "Invalid Email.",
      code: "INVALID_INPUT",
    });
  }

  try {
    await authController.adminAuthController(
      { authService },
      { email, password }
    );
    return res.status(200).json({
      message: "Authorized",
    });
  } catch (e) {
    console.log(e);
    return res.status(401).json({
      message: "Unauthorized",
    });
  }
});

router.post("/auth/restaurant", async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({
      message: "All parameters are required",
    });
  }

  try {
    await authController.restaurantDeliveryController(
      { authService },
      { username, password }
    );
    return res.status(200).json({
      message: "Authorized",
    });
  } catch (e) {
    console.log(e);
    return res.status(401).json({
      message: "Unauthorized",
    });
  }
});

router.post("/auth/deliveryperson", async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({
      message: "All parameters are required",
    });
  }

  try {
    await authController.restaurantDeliveryController(
      { authService },
      { username, password }
    );
    return res.status(200).json({
      message: "Authorized",
    });
  } catch (e) {
    console.log(e);
    return res.status(401).json({
      message: "Unauthorized",
    });
  }
});

router.post("/auth/customer/generateotp", async (req, res) => {
  const { phone } = req.body;

  if (!isvalid.isMobilePhone(phone)) {
    return res.status(400).json({
      param: "phone",
      message: "Invalid phone number.",
      code: "INVALID_INPUT",
    });
  }

  if (!phone) {
    return res.status(400).json({
      message: "All parameters are required",
    });
  }

  const otp = otpGenerator.generate(6, {
    digits: true,
    alphabets: false,
    upperCase: false,
    specialChars: false,
  });
  otpMap[phone] = otp;

  return res.status(200).json({
    otp: otp,
    message: "As for testing, for now i am returning ",
  });
});

router.post("/auth/customer/verifyotp", async (req, res) => {
  const { phone, otp } = req.body;

  if (!isvalid.isMobilePhone(phone)) {
    return res.status(400).json({
      param: "phone",
      message: "Invalid phone number.",
      code: "INVALID_INPUT",
    });
  }

  if (otpMap[phone] === otp) {
    otpMap[phone] = "";

    try {
      await authController.customerController({ authService }, { phone });
      return res.status(200).json({
        message: "Authorized",
      });
    } catch (e) {
      console.log(e);
      return res.status(401).json({
        message: "unauthorized",
      });
    }
  } else {
    return res.status(401).json({
      message: "Wrong OTP unauthorized",
    });
  }
});

module.exports = router;
