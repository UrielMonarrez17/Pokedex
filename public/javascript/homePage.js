
async function handlePage(url){
    try {
        await fetch(`/pokemon/${encodeURIComponent(url)}`);  
        window.location.reload();
      } catch (error) {
        console.error('Error al obtener datos ', error);
      }
};

async function getImage(name){
const url="https://pokeapi.co/api/v2/pokemon-form/"+name+"/";
  try { 
      var imagen=await fetch(`/pokemon/imagen/${encodeURIComponent(url)}`); 
       imagen= await imagen.json();
      document.getElementById('imgOf'+name).src = imagen.link;
    } catch (error) {
      console.error('Error al obtener datos ', error);
    }
};

async function Inicio(){
    try { 
        await fetch(`/inicio`); 
        window.location.reload();
      } catch (error) {
        console.error('Error al obtener datos ', error);
      }
  };

  async function Search(name){
    try { 
        window.location.href=`/pokemon/individual/${name}`;
      } catch (error) {
        console.error('Error al obtener datos ', error);
      }
  };

  async function Search(){
    try { 
      const name=document.getElementById("search").value;
        window.location.href=`/pokemon/individual/${name}`;
      } catch (error) {
        console.error('Error al obtener datos ', error);
      }
  };

  async function Siguiente(name){
    console.log("ala:",name);
    try {
      window.location.href=`/pokemon/siguiente/${name}`;
 
    }catch{
      console.error('Error al obtener datos ');
    }
  };

  async function Anterior(name){
    console.log("ala:",name);
    try {
      window.location.href=`/pokemon/anterior/${name}`;
 
    }catch{
      console.error('Error al obtener datos ');
    }
  };