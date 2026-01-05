require("dotenv").config();
const express = require("express");
const cors = require("cors");
const chatRoute = require("./routes/chatRoute.js");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/chat", chatRoute);

port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
