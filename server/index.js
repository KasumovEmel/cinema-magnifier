// eslint-disable-next-line @typescript-eslint/no-var-requires
const cors = require("cors");
// eslint-disable-next-line @typescript-eslint/no-var-requires
const express = require("express");

const PORT = 3333;

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);

const users = [];
const favorites = {
  favoritesActors: [],
  favoriteMovies: [],
};

app.post("/registration", (req, res) => {
  console.log(req.body);
  if (req.body.email) users.push(req.body);
  res.status(200).json("registration");
});

app.post("/favorite/addElement", (req, res) => {
  if (req.body.type === "actors") {
    if (
      favorites.favoritesActors.find((elem) => elem.id === req.body.element.id)
    ) {
      favorites.favoritesActors = favorites.favoritesActors.filter(
        (elem) => elem.id !== req.body.element.id
      );
    } else {
      favorites.favoritesActors.push(req.body.element);
    }
  } else if (req.body.type === "movies") {
    if (
      favorites.favoriteMovies.find((elem) => elem.id === req.body.element.id)
    ) {
      favorites.favoriteMovies = favorites.favoriteMovies.filter(
        (elem) => elem.id !== req.body.element.id
      );
    } else {
      favorites.favoriteMovies.push(req.body.element);
    }
  }
  res.status(200).json(favorites);
});

app.get("/favorite/fetchFavorites", (req, res) => {
  res.status(200).json(favorites);
});

app.listen(PORT, () => {
  console.log("Server has been started... PORT 3333");
});
