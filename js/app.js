const formulario = document.querySelector('#generar-nombre');

formulario.addEventListener('submit', buscarNombre);

//Llamado AJAX 
function buscarNombre(e){
   e.preventDefault();

   const origen = document.querySelector('#origen');
   const origenValue = origen.options[origen.selectedIndex].value;

   const genero = document.querySelector('#genero');
   const generoValue = genero.options[genero.selectedIndex].value;

   const cantidad = document.querySelector('#numero').value;

   let url = '';
   url += 'http://localhost/uinames/uinames.com/api/?';

   //Construir la URL

   if(origenValue !== ''){
      url += `region=${origenValue}&`;
   }
   if(generoValue !== ''){
      url += `gender=${generoValue}&`;
   }
   if(cantidad !== ''){
      url += `amount=${cantidad}&`;
   }

   //Crear la conexion a AJAX

   const xhr = new XMLHttpRequest();

   xhr.open('GET', url, true);

   xhr.onload = function(){
      if(this.status === 200){
         const nombres = JSON.parse(this.responseText);
         const resultado = document.querySelector('#resultado');

         let htmlNombre = '<h4>Nombres Generados</h4>';
         htmlNombre += '<ul>';
         nombres.forEach(nombre => {
            htmlNombre += `<li class = "lista">${nombre.name}</li>`;
         });
         htmlNombre += '</ul>';

         resultado.innerHTML = htmlNombre;
      }
   }

   xhr.send();
}