const express = require("express");

const app = express();
const axios = require("axios");
app.use(express.static("public"));
const port = 3000;
const apiRoutes = require("./routes/api");

var url = `https://pokeapi.co/api/v2/pokemon`;
var lista=0;
var pokemons_show = null;
app.engine("ejs", require("ejs").renderFile);
app.set("view engine", "ejs");

app.set("views", "./views");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
  try {
    if (pokemons_show === null) {
      pokemons_show = await axios.get(url);
    }
    res.render("index", {
      title: "Pokedex",
      pokemones: pokemons_show.data.results,
      next: pokemons_show.data.next,
      prev: pokemons_show.data.previous,
      imagen: "",
    });
  } catch (error) {
    res.status(500).send("Error al cargar los datos");
  }
});

app.get("/pokemon/siguiente/:name", async (req, res) => {
const {name}=req.params;
  try {
    if(lista<1201){
      lista+=13;
    }
    res.redirect(`/pokemon/individual/${name}`);
  } catch {
    res.status(404).send("Pokemon no encontrado");
  }
});

 app.get(`/pokemon/anterior/:name`, async (req, res) => {
  const {name}=req.params;
  try {
  if(lista>12){
    lista-=13;
  }
  res.redirect(`/pokemon/individual/${name}`);
} catch {
  res.status(404).send("Pokemon no encontrado");
}
  });

app.get("/pokemon/individual/:name", async (req, res) => {
  
  const {name} = req.params;
  try {
    const pokemon = await axios.get(
      `https://pokeapi.co/api/v2/pokemon/${name}/`
    );
    console.log("poke",lista);
    const list = await axios.get(`https://pokeapi.co/api/v2/pokemon?offset=${lista}&limit=13`);
    console.log("lista",list);
    await res.render('individual',{
      abilities: pokemon.data.abilities,
      experience: pokemon.data.base_experience,
      height: pokemon.data.height,
      id: pokemon.data.id,
      moves: pokemon.data.moves,
      weight: pokemon.data.weight,
      types: pokemon.data.types,
      image: pokemon.data.sprites.front_default,
      name: pokemon.data.name,
      title: "Pokedex",
      list: list.data.results
    });
  } catch {
    res.status(404).send("Pokemon no encontrado");
  }
});


app.get("/inicio", async (req, res) => {
  try {
    pokemons_show = await axios.get(
      "https://pokeapi.co/api/v2/pokemon?offset=0&limit=20"
    );
    res.redirect("/");
  } catch (error) {
    res.status(500).send("Error al cargar los datos");
  }
});

app.get("/pokemon/:url2", async (req, res) => {
  const { url2 } = req.params;

  try {
    url = url2;
    pokemons_show = await axios.get(url);
    res.redirect("/");
  } catch {
    res.status(404).send("Pokemon no encontrado");
  }
});



app.get("/pokemon/properties/:urlP", async (req, res) => {
  const { urlP } = req.params;
  try {
    const pokemonProperties = await axios.get(urlP);
  } catch {
    res.status(404).send("Pokemon no encontrado");
  }
});

app.get("/pokemon/forms/:urlF", async (req, res) => {
  const { urlF } = req.params;
  try {
    const pokemonForms = await axios.get(urlF);
  } catch {
    res.status(404).send("Pokemon no encontrado");
  }
});

app.get("/pokemon/imagen/:urlI", async (req, res) => {
  const { urlI } = req.params;
  try {
    const pokemonImagen = await axios.get(urlI);
    res.json({ link: pokemonImagen.data.sprites.front_default });
  } catch {
    res.status(404).send("Pokemon no encontrado");
  }
});

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
