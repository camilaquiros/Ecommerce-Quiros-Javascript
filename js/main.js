let productos = [];
let carrito = [];
let categorias = [];
const estandarPrecio = Intl.NumberFormat('es-ES', {minimumFractionDigits: 2});
let cardProducto = document.getElementById("productos");
let botonTodosLosProductos = document.getElementById("allProducts");
let caratulas=document.getElementById("categorias");
let divLista = document.getElementById("divLista");
let total = 0;
let filtrado = productos;
let dolarBlueVenta;

//FUNCIONES QUE DEBEN FUNCIONAR EN TODO EL SITIO, PARA DESARROLLO Y LLAMADA DE FUNCIONES EN PAGINAS ESPECIFICAS HAY OTROS JS CON EL NOMBRE CORRESPONDIENTE A SU HTML
traerCarrito();
itemsCarrito();
buscador();
imprimirCarrito();
obtenerValorDolar();

//GUARDAR CARRITO EN STORAGE
function setearCarrito(){
    localStorage.setItem("carrito",JSON.stringify(carrito));
}

//CARGAR CARRITO DESDE EL STORAGE
function traerCarrito(){
        carrito=JSON.parse(localStorage.getItem("carrito")) || [];
}

//FUNCIÓN PARA OBTENER EL VALOR DEL DÓLAR BLUE EN TIEMPO REAL
async function obtenerValorDolar() {
    const URLDOLAR = "https://api-dolar-argentina.herokuapp.com/api/dolarblue";
    const respuesta = await fetch(URLDOLAR)
    const data = await respuesta.json();
    dolarBlueVenta = data.venta;
    imprimirProductos();
}

//MOSTRAR TARJETAS DE PRODUCTOS
function imprimirProductos(){
    cardProducto.innerHTML = "";
    for (const producto of productos) {
        let pesificar = producto.precio*dolarBlueVenta;
        let precioConIva = pesificar * 1.21;
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

async function JSONImprimirProductos() {
    const URLJSON = "./products.json"
    const respuesta = await fetch(URLJSON)
    const data = await respuesta.json()
    productos = data;
    imprimirProductos();
}

//BOTÓN PARA AGREGAR AL CARRITO, TOMA EN CUENTA SI HAY STOCK SEGÚN EL PARÁMETRO CANTIDAD DEL OBJETO PRODUCTO
function botonAgregarCarrito(){
    filtrado.forEach(producto =>{
        document.getElementById(`addCart${producto.id}`).addEventListener("click",function(){
            let cantidad = producto.cantidad;
            cantidad > 0? agregarAlCarrito(producto):alert("No hay stock");
            itemsCarrito();
        });
    });
}

//FUNCIÓN PARA AGREGAR AL CARRITO, SI EL PRODUCTO YA SE ENCUENTRA EN EL CARRITO SE SUMA UNA UNIDAD AL PRODUCTO EN VEZ DE DUPLICARSE
function agregarAlCarrito(producto){
    let elementoExistente = carrito.find((elemento) => elemento.producto.id == producto.id);
    if(elementoExistente) {
        elementoExistente.cantidad+=1;
    } else {
        let productoNuevo = new Carrito(producto, 1);
        carrito.push(productoNuevo);
    }
    // https://github.com/apvarun/toastify-js/blob/master/README.md
    Toastify({
        text: `${producto.nombre} agregado al carrito de compra`,
        duration: 1500,
        position: 'center',
        className: "toastPersonalizado",
        style: {
            background: "#F2FF8D",
        }
    }).showToast();
    setearCarrito();
}

//IMPRESIÓN DEL CARRITO, DISPONIBLE EN TODO EL SITIO COMO UN SWAL, CLICKEANDO EN EL ICONO DEL CARRITO
function imprimirCarrito(){
    let cartIcon = document.getElementById("cartIcon");
    cartIcon.addEventListener("click", (e) => {
        //SI EL CARRITO NO ESTA VACÍO SE IMPRIME TODO DENTRO DEL IF
        if(carrito.length != 0){
            // https://sweetalert2.github.io/recipe-gallery/sidebars-drawers.html
            // https://sweetalert2.github.io/recipe-gallery/blurred-backdrop.html
            Swal.fire({
                title: 'Carrito de compras',
                customClass: "cart",
                position: 'top-end',
                html: " ",
                footer:`<p id="total"></p><div class="botonesCart"><a href="" id="cleanCart">Vaciar el carrito</a><a href="" id="buy">Comprar</a></div>`,
                showClass: {
                  popup: `
                    animate__animated
                    animate__fadeInRight
                    animate__faster
                  `
                },
                hideClass: {
                  popup: `
                    animate__animated
                    animate__fadeOutRight
                    animate__faster
                  `
                },
                background: '#BF9EEC',
                showConfirmButton: false,
                showCloseButton: true,
                didOpen: () => {
                    console.log(carrito);
                    if(carrito.length == 0){
                        console.log(carrito);
                        Swal.update({
                            footer:`<a href="allProducts.html" id="buy">Ver todos los productos</a>`,
                        });
                    }
                }
            });
            //DEBIDO A LA COMPLEJIDAD DEL HTML CONSIDERE MEJOR TRATARLO COMO UN MÉTODO DE SWAL Y NO ENCERRARLO DENTRO DEL MISMO
            // https://sweetalert2.github.io/#methods
            let cardCarrito = Swal.getHtmlContainer();
                cardCarrito.innerHTML = "";
                carrito.forEach((elemento) => {
                    let precioConIva = elemento.producto.precio * 1.21;
                    let productoCart = document.createElement("div");
                    productoCart.className = "productoCart";
                    productoCart.innerHTML += `
                    <div class="card mb-3 cartaCarrito">
                        <div class="row g-0">
                            <div class="col-3">
                                <img src="./assets/${elemento.producto.imagen}" class="img-fluid rounded-start" alt="${elemento.producto.nombre}">
                            </div>
                            <div class="col-6 cartaCarritoContainer">
                                <div class="card-body cartaCarritoBody">
                                    <h5 class="card-title">${elemento.producto.nombre}</h5>
                                    <div class="cartaCarritoCantidad">
                                        <p class="card-text">$${estandarPrecio.format(precioConIva)}<small class="text-muted"></small></p>
                                        <div class="cantidad">
                                            <div class="value-button" id="decrease ${elemento.producto.id}" value="Decrease Value">-</div>
                                            <input type="number" class="inputCart" id="cantidad-producto-${elemento.producto.id}" value="${elemento.cantidad}" min="1" max="1000" step="1"/>
                                            <div class="value-button" id="increase ${elemento.producto.id}" value="Increase Value">+</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-3 cartaCarritoContainer">
                                <div class="card-body cartaCarritoBody">
                                    <a href="#" class="card-title basura" id="removeCart${elemento.producto.id}"><i class="fa-solid fa-trash-can"></i></a>
                                    <p class="card-text" id="precio-producto-${elemento.producto.id}">$${estandarPrecio.format(precioConIva*elemento.cantidad)}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    `;
        
                    cardCarrito.append(productoCart);
        
                    total+=elemento.cantidad*precioConIva;
        
                    let cantidadProductos = document.getElementById(`cantidad-producto-${elemento.producto.id}`);
        
                    let precioTotalProducto = document.getElementById(`precio-producto-${elemento.producto.id}`);
        
                    let totalCompra = document.getElementById("total");
        
                    let value = parseInt(cantidadProductos.value);
                    
                    //INPUT HECHO A PARTIR DE UN CODEPEN PARA MOSTRAR SÍMBOLOS + Y - EN LA OPCIÓN DE CANTIDAD
                    // https://codepen.io/mtbroomell/pen/yNwwdv
                    function decreaseValue() { 
                        value = isNaN(value) ? 1 : value;
                        value < 2 ? value = 2 : '';
                        value--;
                        cantidadProductos.value = value;
                        elemento.cantidad = parseInt(cantidadProductos.value);
                        precioTotalProducto.innerHTML = `$${estandarPrecio.format(precioConIva*elemento.cantidad)}`;
                        total -=precioConIva;
                        console.log(total);
                        totalCompra.innerHTML = `Subtotal (sin envío): <strong>$${estandarPrecio.format(total)}</strong>`
                        itemsCarrito(); 
                    }
        
                    function increaseValue() {
                        value = isNaN(value) ? 1 : value;
                        value++;
                        cantidadProductos.value = value;
                        elemento.cantidad = parseInt(cantidadProductos.value);
                        localStorage.setItem("carrito",JSON.stringify(carrito));
                        precioTotalProducto.innerHTML = `$${estandarPrecio.format(precioConIva*elemento.cantidad)}`;
                        total += precioConIva;
                        console.log(total);
                        totalCompra.innerHTML = `Subtotal (sin envío): <strong>$${estandarPrecio.format(total)}</strong>`
                        itemsCarrito(); 
                    }
        
                    document.getElementById(`decrease ${elemento.producto.id}`).onclick=()=>decreaseValue(total);
        
                    document.getElementById(`increase ${elemento.producto.id}`).onclick=()=>increaseValue(total);
        
                    let borrarProducto = document.getElementById(`removeCart${elemento.producto.id}`);
                    
                    //ELIMINAR UN SOLO PRODUCTO
                    borrarProducto.addEventListener("click", (e) => {
                        eliminarProductoCarrito(elemento);
                        productoCart.remove();
                        // https://github.com/apvarun/toastify-js/blob/master/README.md
                        Toastify({
                            text: `${elemento.producto.nombre} eliminado del carrito de compra`,
                            duration: 1500,
                            position: 'center',
                            className: "toastPersonalizado",
                            style: {
                                background: "#F2FF8D",
                            }
                        }).showToast();
                        total -=elemento.cantidad*precioConIva;
                        totalCompra.innerHTML = `Subtotal (sin envío): <strong>$${estandarPrecio.format(total)}</strong>`
                        itemsCarrito(); 
                    });
        
                    vaciarCarrito();
                    
                    //TOTAL DE COMPRA
                    totalCompra.innerHTML = `Subtotal (sin envío): <strong>$${estandarPrecio.format(total)}</strong>`  
                });
            setearCarrito();
        //SI EL CARRITO ESTA VACÍO SE IMPRIME EL ELSE    
        } else {
            Swal.fire({
                title: 'Carrito de compras',
                customClass: "cart",
                position: 'top-end',
                html: "No hay productos en el carrito!",
                footer:`<a href="allProducts.html" id="buy">Ver todos los productos</a>`,
                showClass: {
                  popup: `
                    animate__animated
                    animate__fadeInRight
                    animate__faster
                  `
                },
                hideClass: {
                  popup: `
                    animate__animated
                    animate__fadeOutRight
                    animate__faster
                  `
                },
                background: '#BF9EEC',
                showConfirmButton: false,
                showCloseButton: true,
            });
        };
    });
};

//FUNCIÓN PARA ELIMINAR UN SOLO PRODUCTO DEL CARRITO
function eliminarProductoCarrito(elementoAEliminar) {
    const elementosAMantener = carrito.filter((elemento) => elementoAEliminar.producto.id != elemento.producto.id);
    carrito.length = 0;
    elementosAMantener.forEach((elemento) => carrito.push(elemento));
    setearCarrito();
}

//BADGE DEL CARRITO CON EL NUMERO DE ITEMS, SE ACTUALIZA CUANDO SE AGREGA UN PRODUCTO, SE ELIMINA UN PRODUCTO O SE CAMBIA LA CANTIDAD DE ALGÚN PRODUCTO
function itemsCarrito(){
    let cantidad = 0;
    carrito.forEach((elemento) => {
        cantidad += parseInt(elemento.cantidad);
    });
    // console.log(cantidad);
    let items = document.querySelector(".items");
    items.innerText = `${cantidad}`
}


//FUNCIÓN PARA ELIMINAR TODO EL CARRITO
function vaciarCarrito(){
    document.getElementById("cleanCart").addEventListener("click", function(){
        carrito.length = 0;
        setearCarrito();
    });
}

//BARRA DE BUSCADOR, A PARTIR DEL TIPEO DE LETRAS SE DESPLIEGA UNA LISTA DE COINCIDENCIAS DENTRO DE LOS PRODUCTOS
// https://www.w3schools.com/howto/howto_js_autocomplete.asp
function buscador(){
    buscar = document.getElementById("buscador");
    divBuscador = document.getElementById("divBuscador");
    buscar.addEventListener("input", () => {
        divLista.innerHTML = "";
        divLista.style.border = "none";
        let filtro = productos.filter((item)=>item.nombre.toLowerCase().includes(buscar.value.toLowerCase()));
        if(buscar.value.length > 1 && filtro.length != 0){
            console.log(filtro)
            filtro.forEach((item) => {
                let cartaSugerencia = document.createElement("div");
                cartaSugerencia.className = "card mb-3 divCarta";
                cartaSugerencia.innerHTML = `
                    <div class="row g-0">
                        <div class="col-md-4">
                            <img src="./assets/${item.imagen}" class="img-fluid rounded-start" alt="${item.nombre}">
                        </div>
                        <div class="col-md-8 cardBodyContainer">
                            <div class="card-body cardBody">
                                <h5 class="card-title">${item.nombre}</h5>
                                <p class="card-text">$${item.precio}</p>
                            </div>
                        </div>
                    </div>
                `;
                divLista.append(cartaSugerencia);
            }) 
            divBuscador.appendChild(divLista);
            divLista.style.border = "dashed #393838";
            buscador();
        }else if(buscar.value.length > 1 && filtro.length === 0){
            console.log("no hay productos");
            let buscadorVacio = document.createElement("div");
            buscadorVacio.className = "buscadorVacio";
            buscadorVacio.innerHTML = `
                <p>Lo siento, no encontramos tu producto <i class="fa-solid fa-face-frown"></i></p>
            `;
            divLista.append(buscadorVacio);
            divBuscador.appendChild(divLista);
            divLista.style.border = "dashed #393838";
            buscador();
        }
    });
};




