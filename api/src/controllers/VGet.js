// Me trae la informacion de la API

require("dotenv").config();
const { API_KEY } = process.env;
const axios = require("axios");
const { Videogame,Genre } = require("../db.js");

const getApiInfo = async () => {
  try {
    const apiUrl = await axios.get(
      `https://api.rawg.io/api/games?key=${API_KEY}`
    );
    const apiInfo = await apiUrl.data.results.map((ele) => {
      return {
        id: ele.id,
        name: ele.name,
        publicado: ele.released,
        image: ele.background_image,
        genero: ele.genres.map((elem) => {return { name: elem.name };}),
        rating: ele.rating,
        plataforma: ele.platforms.map((elem) => {return { name: elem.platform.name };}),
        //--------- falta descripcion  ---------------------
      };
    });
    return apiInfo;
  } catch (error) {
    console.log("Sucedio un error en getApiInfo, controllers", error);
  }
};

//----------------> FUNCION OBTENER LA DATA BASE <-------------------------------------------
const getDbInfo = async () => {
  try {
    return await Videogame.findAll({
      include: {
        model: Genre,
        attributes: ["name"], // traigo el nombre de los generos
        through: {
          attributes: [], // tomo solo lo que me queda en el arreglo attributes
        },
      },
    });
  } catch (error) {
    console.log("Sucedio un error en getDbInfo: ",error)
  }

};
//------------> FUNCION UNIR INFORMACION <-----------------------------------------------------
const getAllVideoGames = async()=>{
  try{
    const apiInfoFunc = await getApiInfo();
    const dbInfoFunc = await getDbInfo();
    const allInfo = apiInfoFunc.concat(dbInfoFunc);
    return allInfo;
  }catch(error){
    console.log("Sucedio un error en getAllVideoGames: ",error)
  }
}


//-----> EXPORTO <-------------------
module.exports = {
  getAllVideoGames
};
