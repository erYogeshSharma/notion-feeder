const dotenv = require("dotenv");
const express = require("express");
const bodyParser = require("body-parser");

const { Client } = require("@notionhq/client");
const addToDatabase = require("./service/notion");
dotenv.config();

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post("/transaction", async (req, res) => {
  try {
    const { note, bank, amount, date } = req.body;

    const data = await addToDatabase(note, bank, amount, date);
    if (data === "success") {
      res.status(200).send({ success: "successfully added to db" });
    } else {
      res.status(400).send({ error: "something went wrong" });
    }
  } catch (error) {
    res.status(500).send({ error: "something went wrong" });
  }
});
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`server running on PORT: ${PORT}`);
});
