const authService = require("../repositories/sqlite/auth-service");

const authenticateCustomer = async (req, res, next) => {
  const { phone } = req.body;
  const user = await authService.getCustomerService(phone);
  if (!user) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  } else {
    next();
  }
};

module.exports = { authenticateCustomer };
