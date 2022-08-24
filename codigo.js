
let carrito=[];

if(localStorage.getItem("carrito")){
  carrit0=JSON.parse(localStorage.getItem("carrito"))
}
let lista=document.getElementById("miLista");

const contenedorCarritoCompras = document.querySelector("#items")

const contenedorFooterCarrito = document.querySelector("#footer");


//Luxon

const DateTime=luxon.DateTime;
const inicio=DateTime.now();
console.log(inicio.toString());
console.log(inicio.toLocaleString(DateTime.DATE_FULL));


renderizarProductos();

function renderizarProductos() {
  for (const producto of productos) {
      lista.innerHTML+=`<div class="card" style="width: 18rem;">
      <img src="${producto.imagen}" class="card-img-top" alt="...">
      <div class="card-body">
      <h5>${producto.nombre}</h5>
        <h5 class="card-title">ID ${producto.id}</h5>
        <p class="card-text">$ ${producto.precio}</p>
        <a href="#" class="btn btn-dark"id="btn${producto.id}">Comprar</a>
      </div>
    </div>
      
  `
  }



  productos.forEach(producto => {
    
    document.getElementById(`btn${producto.id}`).addEventListener("click",function() 
    {agregrarAlCarrito(producto)
    });
  });
}

function agregrarAlCarrito(producto) {
  carrito.push(producto);
  console.log(carrito);
  Swal.fire(
    "producto: "+producto.nombre,
    "Agregado al carrito",
    "success",
  )
  document.getElementById("tabBody").innerHTML+=`
  <tr>
  <td>${producto.id}</td>
  <td>${producto.nombre}</td>
  <td>${producto.precio}</td>
  </tr>
  `;

  localStorage.setItem("carrito",JSON.stringify(carrito));
}

let finalizar=document.getElementById("finalizar");
finalizar.onclick=()=>{
    Swal.fire({
      title: '¿Desea finalizar su compra?',
      text: "Envios gratis a todo el pais",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Comprar'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          '¡Pedido Comfirmado!',
          'El envio sera despachado dentro de las 72hs',
          'success'
        )
      }
    });

    const fin=DateTime.now();
    const Interval=luxon.Interval;
    const tiempo=Interval.fromDateTimes(inicio,fin);
    console.log("Tardaste "+tiempo.length('minutes')+" minutos en cerrar la compra!");
}