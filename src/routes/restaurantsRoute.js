const express = require("express");
const router = express.Router();
const restaurantService = require("../repositories/sqlite/restaurant-service");
const { authenticateCustomer } = require("../middlewares/authenticateCustomer");
const {
  restaurantsController,
} = require("../controllers/restaurantsController");

router.get(
  "/restaurants/:phone/:time",
  authenticateCustomer,
  async (req, res) => {
    const phone = req.params.phone;
    const time = req.params.time;
    try {
      const resRestaurants = await restaurantsController(
        { restaurantService },
        { phone, time }
      );
      if (!resRestaurants) {
        return res.status(404).json({
          message: "No restaurant found for this time interval",
        });
      }

      return res.status(200).json({
        restaurants: resRestaurants,
      });
    } catch (e) {
      console.log(e);
      return res.status(500).json({
        message: "Something went wrong",
      });
    }
  }
);

module.exports = router;
