let cardProducto = document.getElementById("productos");
let botonTodosLosProductos = document.getElementById("allProducts");
let caratulas=document.getElementById("categorias");
let cardCarrito = document.getElementById("cart");

traerCarrito();
itemsCarrito();

// cargar los elementos del carro abandonado a la tabla
function traerCarrito(){
    if(localStorage.getItem("carrito")){
        carrito=JSON.parse(localStorage.getItem("carrito"));
    }
}

function imprimirCategorias(){
    for(const categoria of categorias){
        let caratula=document.createElement("div");
        caratula.className="categoria";
        caratula.innerHTML=`
            <a href="">
            <img src="./assets/${categoria.caratula}" alt="${categoria.titulo}">
            <p>${categoria.titulo}</p>
            </a>
        `;
        caratulas.append(caratula);
    }
}

function imprimirProductos(){
    for (const producto of productos) {
        let precioConIva = producto.precio * 1.21;
        cardProducto.innerHTML += `
            <div class="producto">
                <img src="./assets/${producto.imagen}" alt="${producto.imagen}">
                <p>${producto.nombre}</p>
                <p>$${estandarPrecio.format(precioConIva)}</p>
                <p>Disponibles: ${producto.cantidad}</p>
                <button id="addCart${producto.id}">AGREGAR AL CARRITO</button>
            </div>
        `;
    } 
}

function botonMostrarTodos(){
    botonTodosLosProductos.onclick = () => {
        if(botonTodosLosProductos.innerText == "Mostrar todos los productos"){
            imprimirProductos();
            botonTodosLosProductos.innerText = "Ocultar todos los productos";
            botonAgregarCarrito();
            } else {
                cardProducto.innerHTML = "";
                botonTodosLosProductos.innerText = "Mostrar todos los productos";
        }
    }
}

//evento individual para cada boton
function botonAgregarCarrito(){
    productos.forEach(producto =>{
        document.getElementById(`addCart${producto.id}`).addEventListener("click",function(){
            let cantidad = producto.cantidad;
            if(cantidad > 0){
                agregarAlCarrito(producto);
                cantidad--;
                console.log(cantidad);
            }else{
                alert("No hay stock");
            }
        });
    });
}

function agregarAlCarrito(producto){
    let productoNuevo = new Carrito(producto, 1);
    carrito.push(productoNuevo);
    alert("Producto: "+producto.nombre+" agregado al carro!");
    localStorage.setItem("carrito",JSON.stringify(carrito));
}

function imprimirCarrito(){
    let total = 0;
    console.log(carrito);
    cardCarrito.innerHTML = "";
    carrito.forEach(
        (elemento) => {
            let precioConIva = elemento.producto.precio * 1.21;
            let productoCart = document.createElement("div");
            productoCart.className = "productoCart";
            productoCart.innerHTML += `
                    <img src="./assets/${elemento.producto.imagen}" alt="${elemento.producto.imagen}">
                    <p>${elemento.producto.nombre}</p>
                    <input id="cantidad-producto-${elemento.producto.id}" type="number" value="${elemento.cantidad}" min="1" max="1000" step="1" style="width: 50px;"/>
                    <p>$${estandarPrecio.format(precioConIva)}</p>
                    <p>$${estandarPrecio.format(precioConIva*elemento.cantidad)}</p>
                    <button id="removeCart${elemento.producto.id}">ELIMINAR</button>
                `;

            cardCarrito.append(productoCart);
                
            total+=elemento.cantidad*precioConIva;

            let cantidadProductos = document.getElementById(`cantidad-producto-${elemento.producto.id}`);

            cantidadProductos.addEventListener("change", (e) => {
                let nuevaCantidad = e.target.value;
                elemento.cantidad = nuevaCantidad;
                imprimirCarrito();
            });

            localStorage.setItem("carrito",JSON.stringify(carrito));
        }
    );

    let totalCompra = document.getElementById("total");
    totalCompra.innerText = `TOTAL: $${estandarPrecio.format(total)}`
}

// function botonEliminarDelCarrito(){
//     carrito.forEach(elemento =>{
//         document.getElementById(`removeCart${elemento.producto.id}`).addEventListener("click",function(){
//             eliminarDelCarrito(elemento.producto);
//         });
//     });
// }

// function eliminarDelCarrito(elemento){
//     let eliminado = carrito.indexOf(elemento.producto);
//     let index = carrito.map(elemento => elemento.producto.id).indexOf();
//     console.log(eliminado);

//     // carrito.splice(index, 1);
//     // alert("Producto: "+elemento.producto.nombre+" eliminado del carro!");
//     localStorage.setItem("carrito",JSON.stringify(carrito));
// }

function itemsCarrito(){
    let cantidad = 0;
    carrito.forEach((elemento) => {
        cantidad += parseInt(elemento.cantidad);
    });
    console.log(cantidad);
    let items = document.querySelector(".items");
    items.innerText = `${cantidad}`
}

function vaciarCarrito(){
    document.getElementById("cleanCart").addEventListener("click", function(){
        carrito = []
        localStorage.setItem("carrito",JSON.stringify(carrito));
    });
}