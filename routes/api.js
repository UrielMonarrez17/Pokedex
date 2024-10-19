const express = require('express');
const router = express.Router();
const axios = require('axios');

var url=`https://pokeapi.co/api/v2/pokemon`;





// Ruta para obtener el JSON de endpoints
router.get('/endpoints', (req, res) => {
  res.json(endpoints);
});

// Ejemplo de un endpoint específico que usa la lógica del archivo


module.exports = router;