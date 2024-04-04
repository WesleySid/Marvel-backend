const express = require("express");
const app = express();
const cors = require("cors");
const axios = require("axios");
app.use(express.json());
app.use(cors());

app.get("/", async (req, res) => {
  try {
    const response = await axios.get(
      "https://lereacteur-marvel-api.herokuapp.com/characters?apiKey=FHmiZnYEhOqgaFA8"
    );

    return res.status(200).json(response.data);
  } catch (error) {
    console.error("Error fetching characters:", error.message);
    return res.status(500).json({ message: error.message });
  }
});

app.get("/characters", async (req, res) => {
  try {
    const name = req.query.name || "";
    const skip = req.query.skip || "0";
    const limit = req.query.limit || "100";

    console.log("Name:", name);
    console.log("Skip:", skip);
    console.log("Limit:", limit);

    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/characters?apiKey=FHmiZnYEhOqgaFA8&skip=${skip}`
    );

    console.log(response.data);

    return res.status(200).json(response.data);
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ message: error.message });
  }
});

app.get("/character/:id", async (req, res) => {
  try {
    const id = req.params.id;
    console.log("Fetching character with ID:", id);
    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/character/${id}?apiKey=FHmiZnYEhOqgaFA8`
    );

    const character = response.data;
    console.log(character);
    res.json(character);
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ error: error.message });
  }
});

app.all("*", (req, res) => {
  console.log("Unknown route");
  return res.status(404).json("ERROR 404");
});

app.listen(3000, () => {
  console.log("Server on ");
});
