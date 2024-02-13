const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

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

module.exports = { getRestaurants };
