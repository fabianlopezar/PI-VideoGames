const { Router } = require("express");
const router = Router();

const { getAllVideoGames } = require("../controllers/VGet.js");

router.get("/", async (req, res) => {
  try {
    const { name } = req.query;
    let respuestaApi = await getAllVideoGames();
    if (name) {
      let gamesName = await respuestaApi.filter((el) =>
        el.name.toLowerCase().includes(name.toLowerCase())
      );
      gamesName.length //--> sigue abajo en la linea 13.
        ? res.status(200).send(gamesName)
        : res.status(404).send(`No se encontro el juego ${name}.`);
    } else {
      res.status(200).send(respuestaApi);
    }
  } catch (error) {
    console.log("Sucedio un error en /videogames: ",error)
  }
});

module.exports = router;
