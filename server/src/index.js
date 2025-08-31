import express from "express";
import cors from "cors";
import { StreamChat } from "stream-chat";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";

const app = express();
const api_key = "sc26jgps3vky";
const api_secret =
  "h7r25zwn3thskr2p9hudyjafw7cnngafkmz9js9hz8ddkgk2bngwgk6eh2rrj3me";

app.use(cors());
app.use(express.json());

// Create instance for StreamChat class
const serverClient = StreamChat.getInstance(api_key, api_secret);

// bcrypt returns promise so we need to use async await syntax
app.post("/signup", async (req, res) => {
  try {
    const { firstName, lastName, username, password } = req.body;

    // generate random id
    const userId = uuidv4();

    // hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    //Create token
    const token = serverClient.createToken(userId);

    // send details to frontend
    res.json({ token, firstName, lastName, username, hashedPassword, userId });
  } catch (error) {
    res.json(error);
  }
});

app.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const { users } = await serverClient.queryUsers({ name: username });
    if (users.length === 0) {
      return res.json({ message: "User not found" });
    }

    const token = serverClient.createToken(users[0].id);
    const passwordMatch = await bcrypt.compare(
      password,
      users[0].hashedPassword
    );

    if (passwordMatch) {
      res.json({
        token,
        firstName: users[0].firstName,
        lastName: users[0].lastName,
        username,
        userId: users[0].id,
      });
    }
  } catch (error) {
    res.json(error);
  }
});

app.listen(3001, () => {
  console.log("Server is running or port 3001");
});
