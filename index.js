const express = require('express');
const app = express();
const port = 3000;

app.set('view engine', 'ejs');

// Definir la carpeta donde estarán las vistas
app.set('views', './views');

app.use(express.static('Public'));

const pokedex = [
  { id: 1, name: "Bulbasaur", type: "Grass/Poison", image:""},
  { id: 2, name: "Ivysaur", type: "Grass/Poison", image:"Public\images\Ivysaur.png"},
  { id: 3, name: "Venusaur", type: "Grass/Poison",image:"Public\images\Venusaur.jpeg"},
  // Agrega más Pokémon
];

// Ruta principal que renderiza la plantilla EJS
app.get('/', (req, res) => {
  res.render('index', { titulo: 'Pokedex' , pokemons: pokedex });
});

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});

