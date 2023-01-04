const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const router = Router();

const getRouter = require("./GetRouter.js");

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use("/videogames", getRouter);

module.exports = router;
