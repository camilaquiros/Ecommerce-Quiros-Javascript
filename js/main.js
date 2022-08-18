let cardProducto = document.getElementById("productos");
let botonTodosLosProductos = document.getElementById("allProducts");
let caratulas=document.getElementById("categorias");
let cardCarrito = document.getElementById("cart");

traerCarrito();
itemsCarrito();

// cargar los elementos del carro abandonado a la tabla
function traerCarrito(){
        carrito=JSON.parse(localStorage.getItem("carrito")) || [];
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
            cantidad > 0? agregarAlCarrito(producto):alert("No hay stock");
            itemsCarrito();
        });
    });
}

function agregarAlCarrito(producto){
    let elementoExistente = carrito.find((elemento) => elemento.producto.id == producto.id);

    if(elementoExistente) {
        elementoExistente.cantidad+=1;
    } else {
        let productoNuevo = new Carrito(producto, 1);
        carrito.push(productoNuevo);
    }

    swal({
        text: `${producto.nombre} agregado al carrito de compra`,
        className: "swalPersonalizado",
        timer: 1500,
        buttons: false,
    });

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
                    <ul class="list-group list-group-horizontal listaCarrito">
                    <li class="list-group-item itemCarrito"><img src="./assets/${elemento.producto.imagen}" alt="${elemento.producto.imagen}"></li>
                    <li class="list-group-item itemCarrito"><p>${elemento.producto.nombre}</p></li>
                    <li class="list-group-item itemCarrito"><p>$${estandarPrecio.format(precioConIva)}</p></li>
                    <li class="list-group-item itemCarrito">
                    <div class="value-button" id="decrease ${elemento.producto.id}" value="Decrease Value">-</div>
                    <input type="number" class="inputCart" id="cantidad-producto-${elemento.producto.id}" value="${elemento.cantidad}" min="1" max="1000" step="1"/>
                    <div class="value-button" id="increase ${elemento.producto.id}" value="Increase Value">+</div></li>
                    <li class="list-group-item itemCarrito"><p>$${estandarPrecio.format(precioConIva*elemento.cantidad)}</p></li>
                    <li class="list-group-item itemCarrito"><button id="removeCart${elemento.producto.id}">ELIMINAR <i class="fa-solid fa-trash-can"></i></button></li>
                  </ul>


                `;

            cardCarrito.append(productoCart);
                
            total+=elemento.cantidad*precioConIva;

            let cantidadProductos = document.getElementById(`cantidad-producto-${elemento.producto.id}`);

            let value = parseInt(cantidadProductos.value);

            function decreaseValue() { 
                value = isNaN(value) ? 1 : value;
                value < 2 ? value = 2 : '';
                value--;
                cantidadProductos.value = value;
                elemento.cantidad = parseInt(cantidadProductos.value);
                imprimirCarrito();
            }
            
            function increaseValue() {
                value = isNaN(value) ? 1 : value;
                value++;
                cantidadProductos.value = value;
                elemento.cantidad = parseInt(cantidadProductos.value);
                imprimirCarrito();
            }

            document.getElementById(`decrease ${elemento.producto.id}`).onclick=()=>decreaseValue();
            document.getElementById(`increase ${elemento.producto.id}`).onclick=()=>increaseValue();

            let borrarProducto = document.getElementById(`removeCart${elemento.producto.id}`);

            borrarProducto.addEventListener("click", (e) => {
                eliminarProductoCarrito(elemento);
                imprimirCarrito();
            });

            localStorage.setItem("carrito",JSON.stringify(carrito));
        }
    );

    let totalCompra = document.getElementById("total");
    totalCompra.innerText = `TOTAL: $${estandarPrecio.format(total)}`
}

function eliminarProductoCarrito(elementoAEliminar) {
    const elementosAMantener = carrito.filter((elemento) => elementoAEliminar.producto.id != elemento.producto.id);
    carrito.length = 0;
    elementosAMantener.forEach((elemento) => carrito.push(elemento));
}

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
        carrito.length = 0;
        localStorage.setItem("carrito",JSON.stringify(carrito));
    });
}


