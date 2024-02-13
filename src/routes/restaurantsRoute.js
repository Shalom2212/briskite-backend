const express = require("express");
const router = express.Router();
const authService = require("../repositories/sqlite/auth-service");
const { authenticateCustomer } = require("../middlewares/authenticateCustomer");
const {
  restaurantsController,
} = require("../controllers/restaurantsController");

router.get("/restaurants", authenticateCustomer, async (req, res) => {
  const { phone, time } = req.body;
  try {
    const resRestaurants = await restaurantsController(
      { authService },
      { phone, time }
    );
    if (Object.keys(resRestaurants).length <= 0) {
      return res.status(404).json({
        message: "No restaurant found for this time interval",
      });
    }

    return res.status(200).json({
      restaurants: resRestaurants,
    });
  } catch (e) {
    console.lof(e);
    return res.status(500).json({
      message: "Something went wrong",
    });
  }
});

module.exports = router;
