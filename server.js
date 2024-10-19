const express = require("express");

const app = express();
const axios = require("axios");
app.use(express.static("public"));
const port = 3000;
const apiRoutes = require("./routes/api");

var url = `https://pokeapi.co/api/v2/pokemon`;
var pokemons_show=null;
app.engine("ejs",require("ejs").renderFile);
app.set("view engine", "ejs");

app.set("views", "./views");

app.use("/api", apiRoutes);

app.get("/", async (req, res) => {

  try{
    if (pokemons_show === null) {
      pokemons_show = await axios.get(url);
    }
    res.render("index", {
      title: "Pokedex",
      pokemones: pokemons_show.data.results,
      next: pokemons_show.data.next,
      prev:pokemons_show.data.previous,
      imagen:""
    });
  }catch (error) {
    res.status(500).send("Error al cargar los datos");
  }

 
});

app.get("/inicio", async(req, res) => {

  try{
    pokemons_show = await axios.get("https://pokeapi.co/api/v2/pokemon?offset=0&limit=20");
    res.redirect("/");
  }catch (error) {
    res.status(500).send("Error al cargar los datos");
  }

 
});

app.get("/pokemon/:url2", async(req, res) => {
  const { url2 } = req.params;
  
  try{
  url = url2;
  pokemons_show = await axios.get(url);
  res.redirect("/");
  }catch{ 
    res.status(404).send("Pokemon no encontrado");
  }
});
 
  app.get("/pokemon/:search", async(req, res) => {
    const { search } = req.params;
    
    try{
    pokemons_show = await axios.get(`https://pokeapi.co/api/v2/pokemon/${search}/`);
res.json({abilities:pokemons_show.data.abilities,
  experience:pokemons_show.data.base_experience,
  height:pokemons_show.data.height,
id:pokemons_show.data.id,
moves:pokemons_show.data.moves,
weight:pokemons_show.data.weight,
types:pokemons_show.data.types,
image:pokemons_show.data.sprites.front_default,
name:pokemons_show.data.name});
    }catch{ 
      res.status(404).send("Pokemon no encontrado");
    }

  });

  app.get("/pokemon/properties/:urlP", async(req, res) => {
    const { urlP } = req.params;
    try{
      const pokemonProperties = await axios.get(urlP);
    }catch{ 
      res.status(404).send("Pokemon no encontrado");
    }
   
    });

    app.get("/pokemon/forms/:urlF", async(req, res) => {
      const { urlF } = req.params;
      try{
        const pokemonForms = await axios.get(urlF);
      }catch{ 
        res.status(404).send("Pokemon no encontrado");
      }
     
      });

  app.get("/pokemon/imagen/:urlI", async(req, res) => {
    const { urlI } = req.params;
    try{
    const pokemonImagen = await axios.get(urlI);
    res.json({ link: pokemonImagen.data.sprites.front_default} );
    }catch{ 
      res.status(404).send("Pokemon no encontrado");
    }
   
    });
  
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
