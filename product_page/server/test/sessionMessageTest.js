import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
const main = async () => {
    
  
    // Create a new user
    const user = await createUser(prisma, 'john_doe', 'john@example.com', 'securepassword123');
  
    // Create a session for the user
    const session = await createSession(prisma, user.id);
  
    // Add messages to the session
    await addMessageToSession(prisma, session.id, 'john_doe', 'Hello, world!');
    await addMessageToSession(prisma, session.id, 'john_doe', 'Prisma with MongoDB is cool!');
  
    console.log('User, session, and messages created successfully.');
  
    // Don't forget to disconnect when done
    await prisma.$disconnect();
  };
  
  const createUser = async (prisma, username, email, password) => {
    return await prisma.user.create({
      data: {
        username,
        email,
        password,
      },
    });
  };

  const createSession = async (prisma, userId) => {
    return await prisma.session.create({
      data: {
        userId,
        createdAt: new Date(),
      },
    });
  };


  const addMessageToSession = async (prisma, sessionId, sender, text) => {
    return await prisma.message.create({
      data: {
        sessionId,
        sender,
        text,
        createdAt: new Date(),
      },
    });
  };

//   main().catch((e) => {
//     console.error(e);
//     process.exit(1);
//   });

addMessageToSession(prisma, '66888f1da11be6fe6d48e68f', 'john_doe', 'this is test');