const express = require('express');
const app = express();
const port = 3000;

app.set('view engine', 'ejs');

// Definir la carpeta donde estarán las vistas
app.set('views', './views');

// Ruta principal que renderiza la plantilla EJS
app.get('/', (req, res) => {
  res.render('index', { titulo: 'Pokedex' });
});

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});