const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  const restaurantA = await prisma.restaurants.create({
    data: {
      name: "Restaurant A",
      address: "123 Main St",
      phone: "123-456-7890",
    },
  });

  const restaurantB = await prisma.restaurants.create({
    data: {
      name: "Restaurant B",
      address: "456 Elm St",
      phone: "987-654-3210",
    },
  });

  await prisma.food.create({
    data: {
      restaurant: {
        connect: { restaurant_id: restaurantA.restaurant_id },
      },
      food_name: "Veg Biryani",
      price: 9.99,
      sst: 12 * 60,
      set: 18 * 60,
    },
  });

  await prisma.food.create({
    data: {
      restaurant: {
        connect: { restaurant_id: restaurantA.restaurant_id },
      },
      food_name: "Chicken Curry",
      price: 12.99,
      sst: 11 * 60,
      set: 20 * 60,
    },
  });

  await prisma.food.create({
    data: {
      restaurant: {
        connect: { restaurant_id: restaurantB.restaurant_id },
      },
      food_name: "Pizza",
      price: 8.99,
      sst: 10 * 60,
      set: 22 * 60,
    },
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
