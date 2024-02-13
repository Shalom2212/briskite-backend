const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const adminAuthService = async (email) => {
  const user = await prisma.users.findUnique({
    where: { email: email },
  });

  return user;
};

const restaurantDeliveryService = async (name) => {
  const user = await prisma.users.findUnique({
    where: { name: name },
  });

  return user;
};

const getCustomerService = async (phone) => {
  const user = await prisma.users.findUnique({
    where: { phone: phone },
  });
  return user;
};

const createCustomerService = async (phone, role) => {
  const userData = {
    phone: phone,
    role: role,
  };
  const user = await prisma.users.create({
    data: userData,
  });

  return user;
};

const getRestaurants = async (requestedTimeInMinutes) => {
  const restaurants = await prisma.restaurants.findMany({
    include: {
      Food: {
        where: {
          AND: [
            { sst: { lte: requestedTimeInMinutes } },
            { set: { gte: requestedTimeInMinutes } },
          ],
        },
      },
    },
  });
  return restaurants;
};

module.exports = {
  adminAuthService,
  restaurantDeliveryService,
  getCustomerService,
  createCustomerService,
  getRestaurants,
};
