const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");

const prisma = new PrismaClient();

const roles = ["ADMIN", "Customer", "DeliveryPerson", "Restaurant"];

async function generateRandomUserData() {
  const randomRoleIndex = Math.floor(Math.random() * roles.length);
  const role = roles[randomRoleIndex];

  const userData = {
    name: `User_${Math.floor(Math.random() * 10000)}`,
    email: `user_${Math.floor(Math.random() * 10000)}@example.com`,
    password: await bcrypt.hash("password123", 10), // Replace 'password123' with your desired default password
    phone: `+123456789${Math.floor(Math.random() * 100)}`,
    role: role,
  };

  return userData;
}

async function main() {
  const userDataPromises = [];

  // Generate 10 random users
  for (let i = 0; i < 10; i++) {
    userDataPromises.push(generateRandomUserData());
  }

  const userDataArray = await Promise.all(userDataPromises);

  for (const userData of userDataArray) {
    await prisma.users.create({
      data: userData,
    });
  }

  console.log("Random user data successfully inserted.");
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
