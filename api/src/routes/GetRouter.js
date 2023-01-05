const { Router } = require("express");
const router = Router();

const { getAllVideoGames } = require("../controllers/VGet.js");
//-----------> RUTA TODOS LOS VIDEOJUEGOS | NOMBRE VIDEOJUEGO <------------------------
router.get("/", async (req, res) => {
  try {
    ///videogames?name=the witcher
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
    console.log("Sucedio un error en /videogames ",error)
  }
});
//------------> RUTA OBTENER ID | DETALLE <----------------------------------------------
router.get("/:id", async(req,res)=>{
  try{
    //videogames/12
    const id = req.params.id;
    const todosVideoGames = await getAllVideoGames();
    if(id){
      let videoGameId = await todosVideoGames.filter((ele)=>ele.id==id)
      videoGameId.length
      ?res.status(200).json(videoGameId)
      :res.status(400).send("No se encontro el VideoJuego")
    }
  }catch(error){
    console.log("Sucedio un error en /videogames:id ", error);
  }
})

module.exports = router;
