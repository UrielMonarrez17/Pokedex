
async function handlePage(url){
    try {
        await fetch(`/pokemon/${encodeURIComponent(url)}`);  
        window.location.reload();
      } catch (error) {
        console.error('Error al obtener datos ', error);
      }
};

async function getImage(name){
  console.log("name:",name);
const url="https://pokeapi.co/api/v2/pokemon-form/"+name+"/";
  try { 
      var imagen=await fetch(`/pokemon/imagen/${encodeURIComponent(url)}`); 
       imagen= await imagen.json();
      console.log("img:",imagen);
      document.getElementById('imgOf'+name).src = imagen.link;
    } catch (error) {
      console.error('Error al obtener datos ', error);
    }
};