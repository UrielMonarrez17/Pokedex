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
    console.error("Error al obtener los datos:", error);
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

  app.get("/pokemon/properties/:urlP", async(req, res) => {
    const { urlP } = req.params;
    try{
      const pokemonProperties = await axios.get(urlP);
    console.log("props:",pokemonProperties);
    }catch{ 
      res.status(404).send("Pokemon no encontrado");
    }
   
    });

    app.get("/pokemon/forms/:urlF", async(req, res) => {
      const { urlF } = req.params;
      try{
        const pokemonForms = await axios.get(urlF);
      console.log("props:",pokemonForms);
      }catch{ 
        res.status(404).send("Pokemon no encontrado");
      }
     
      });

  app.get("/pokemon/imagen/:urlI", async(req, res) => {
    const { urlI } = req.params;
    try{
    const pokemonImagen = await axios.get(urlI);
    console.log("props:",pokemonImagen);
    res.json({ link: pokemonImagen.data.sprites.front_default} );
    }catch{ 
      res.status(404).send("Pokemon no encontrado");
    }
   
    });
  
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
