/* const app = new Vue({
    el:'#app',
    data: {
        titulo:'Hola mundo Vue',
        frutas:[
            {nombre:'Pera', cantidad:10},
            {nombre:'Plátano', cantidad:0},
            {nombre:'Manzana', cantidad:20},
        ],
        nuevaFruta:'',
        nuevaCantidad:'',
        totalFrutas:0
    },
    methods: {
        agregarFruta(){
            //console.log('Diste click')
            this.frutas.push({
                nombre:this.nuevaFruta, cantidad:this.nuevaCantidad
            });
            this.nuevaFruta = '';
            this.nuevaCantidad = '';
        },
        otroMetodo(){

        }
    },
    computed:{
        sumarFrutas(){
            this.totalFrutas = 0;
            for(fruta of this.frutas){
                this.totalFrutas = this.totalFrutas+fruta.cantidad;
            }
            return this.totalFrutas;
        }
    }
}) */

/*const app = new Vue({
    el:'#app',
    data:{
        fondo:'bg-warning',
        color:false,
        texto2:true,
    },
    methods: {
        
    },
})*/

// Variables globales

const formularioUI = document.querySelector('#formulario');
const listaActividadesUI = document.getElementById('listaActividades');
let arrayActividades = [];


// Funciones

const CrearItem = (actividad) => {
  let item = {
    actividad: actividad,
    estado: false
  }
  arrayActividades.push(item);
  return item;
}

const GuardarDB = () => {
  localStorage.setItem('rutinaEjercicios', JSON.stringify(arrayActividades));
  LeerDB();
}

const LeerDB = () => {
  listaActividadesUI.innerHTML = '';
  arrayActividades = JSON.parse(localStorage.getItem('rutinaEjercicios'));
  if(arrayActividades === null){
    arrayActividades = [];
  }else{
    arrayActividades.forEach(element => {
      if(element.estado){
        listaActividadesUI.innerHTML += `<div class="alert alert-success" role="alert"><i class="material-icons float-left mr-2">accessibility</i><b>${element.actividad}</b> - ${element.estado}<span class="float-right"><i class="material-icons">done</i><i class="material-icons">delete</i></span></div>`
      }else{
        listaActividadesUI.innerHTML += `<div class="alert alert-danger" role="alert"><i class="material-icons float-left mr-2">accessibility</i><b>${element.actividad}</b> - ${element.estado}<span class="float-right"><i class="material-icons">done</i><i class="material-icons">delete</i></span></div>`
      }
    });
  }
}

const EliminarDB = (actividad) => {
  let indexArray;
  arrayActividades.forEach((elemento, index) => {
    if(elemento.actividad === actividad){
      indexArray = index;
    }
  });
  arrayActividades.splice(indexArray,2);
  GuardarDB();
}

const EditarDB = (actividad) => {
  let indexArray = arrayActividades.findIndex((elemento)=>elemento.actividad === actividad);
  arrayActividades[indexArray].estado = true;
  GuardarDB();
}


// EventListener

formularioUI.addEventListener('submit', (e) => {
  e.preventDefault();
  let actividadUI = document.querySelector('#actividad').value;
  CrearItem(actividadUI);
  GuardarDB();
  formularioUI.reset();
});

document.addEventListener('DOMContentLoaded', LeerDB);

/* listaActividadesUI.addEventListener('click', (e) => {
  e.preventDefault();
  if(e.target.innerHTML === 'done' || e.target.innerHTML === 'delete'){
    let texto = e.path[2].childNodes[1].innerHTML;
    if(e.target.innerHTML === 'delete'){
      // Accción de eliminar
      EliminarDB(texto);
    }
    if(e.target.innerHTML === 'done'){
      // Accción de editar
      EditarDB(texto);
    }
  }

}); */

listaActividadesUI.addEventListener('click', (e) => {
    e.preventDefault();
    
      let texto = e.path[2].childNodes[1].innerHTML;
      if(e.target.innerHTML === 'delete'){
        // Accción de eliminar
        EliminarDB(texto);
      }
      if(e.target.innerHTML === 'done'){
        // Accción de editar
        EditarDB(texto);
      }
    
  
  });