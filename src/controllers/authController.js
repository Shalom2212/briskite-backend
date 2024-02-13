const bcrypt = require("bcrypt");

const adminAuthController = async ({ authService }, { email, password }) => {
  const userdata = await authService.adminAuthService(email);
  if (userdata.role != "ADMIN") {
    throw new Error("INVALID ROLE");
  }
  const match = await bcrypt.compare(password, userdata.password);
  if (match) {
    return true;
  } else {
    throw new Error("INVALID PASSWORD");
  }
};

const restaurantDeliveryController = async (
  { authService },
  { username, password }
) => {
  const userdata = await authService.restaurantDeliveryService(username);
  if (userdata.role != "Restaurant" && userdata.role != "DeliveryPerson") {
    throw new Error("INVALID_ROLE");
  }
  const match = await bcrypt.compare(password, userdata.password);
  if (match) {
    return true;
  } else {
    throw new Error("INVALID PASSWORD");
  }
};

const customerController = async ({ authService }, { phone }) => {
  const user = await authService.getCustomerService(phone);

  if (!user) {
    await authService.createCustomerService(phone, "Customer");
  }
  return true;
};

module.exports = {
  adminAuthController,
  restaurantDeliveryController,
  customerController,
};
