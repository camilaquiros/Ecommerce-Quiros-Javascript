let productos = [];
let carrito = [];
let categorias = [];
const estandarPrecio = Intl.NumberFormat('es-ES', {minimumFractionDigits: 2, maximumFractionDigits: 2});
let cardProducto = document.getElementById("productos");
let botonTodosLosProductos = document.getElementById("allProducts");
let caratulas=document.getElementById("categorias");
let divLista = document.getElementById("divLista");
let selectCategoria = document.getElementById("filtro");
let URLLocal = document.URL;
let total = 0;
let filtrado = productos;
let dolarBlueVenta;

class Carrito {
    constructor(producto, cantidad) {
        this.producto = producto;
        this.cantidad = cantidad;
    }
}

//FUNCIONES QUE DEBEN FUNCIONAR EN TODO EL SITIO, PARA DESARROLLO Y LLAMADA DE FUNCIONES EN PAGINAS ESPECIFICAS HAY OTROS JS CON EL NOMBRE CORRESPONDIENTE A SU HTML
traerCarrito();
itemsCarrito();
buscador();
imprimirCarrito();


//GUARDAR CARRITO EN STORAGE
function setearCarrito(){
    localStorage.setItem("carrito",JSON.stringify(carrito));
}

//CARGAR CARRITO DESDE EL STORAGE
function traerCarrito(){
        carrito=JSON.parse(localStorage.getItem("carrito")) || [];
}

//FUNCIÓN PARA OBTENER EL VALOR DEL DÓLAR BLUE EN TIEMPO REAL, MAS IMPRESIÓN DE PRODUCTOS
async function obtenerValorDolarProductos() {
    const URLDOLAR = "https://api-dolar-argentina.herokuapp.com/api/dolarblue";
    const respuesta = await fetch(URLDOLAR)
    const data = await respuesta.json();
    dolarBlueVenta = data.venta;
    imprimirProductos();
}

////FUNCIÓN PARA OBTENER EL VALOR DEL DÓLAR BLUE EN TIEMPO REAL
async function obtenerValorDolar() {
    const URLDOLAR = "https://api-dolar-argentina.herokuapp.com/api/dolarblue";
    const respuesta = await fetch(URLDOLAR)
    const data = await respuesta.json();
    dolarBlueVenta = data.venta;
}

//FUNCIÓN PARA LEER EL JSON DE PRODUCTOS
async function JSONProductos(){
    const URLJSON = "./products.json"
    const respuesta = await fetch(URLJSON)
    const data = await respuesta.json()
    productos = data;
}

//MOSTRAR TARJETAS DE PRODUCTOS
function imprimirProductos(){
    cardProducto.innerHTML = "";
    for (const producto of productos) {
        let pesificar = producto.precio*dolarBlueVenta;
        let precioConIva = pesificar * 1.21;
        cardProducto.innerHTML += `
            <div class="producto">
                <button  id="showProduct${producto.id}" class="botonProducto">
                <img src="./assets/${producto.imagen}" alt="${producto.nombre}">
                <p>${producto.nombre}</p>
                <p>$${estandarPrecio.format(precioConIva)}</p>
                <p>Disponibles: ${producto.cantidad}</p>
                </button>
                <button id="addCart${producto.id}" class="botonCarrito">AGREGAR AL CARRITO</button>
            </div>
        `;
    }

    productos.forEach(producto =>{
        let pesificar = producto.precio*dolarBlueVenta;
        let precioConIva = pesificar * 1.21;
        document.getElementById(`showProduct${producto.id}`).onclick = function(){
            Swal.fire({
                title: `${producto.nombre}`,
                html:`
                <div class="card mb-3">
                <div class="row g-0">
                  <div class="col-md-4">
                    <img src="./assets/${producto.imagen}" class="img-fluid rounded-start" alt="${producto.nombre}">
                  </div>
                  <div class="col-md-8">
                    <div class="card-body">
                      <p class="card-text">${producto.descripcion}</p>
                      <p class="card-text"><strong>$${estandarPrecio.format(precioConIva)}</strong></p>
                      <button id="addCartIndividual${producto.id}" class="botonCarritoIndividual">AGREGAR AL CARRITO</button>
                    </div>
                  </div>
                </div>
              </div>`,
              showConfirmButton: false,
              showCloseButton: true,
              customClass: "cardIndividual",
              width: "60%",
              background: "#04BAD8",
            });
            document.getElementById(`addCartIndividual${producto.id}`).onclick = function(){
                let cantidad = producto.cantidad;
                cantidad > 0? agregarAlCarrito(producto):alert("No hay stock");
                setearCarrito();
                itemsCarrito();
            };
        }
        document.getElementById(`addCart${producto.id}`).onclick = function(){
            let cantidad = producto.cantidad;
            cantidad > 0? agregarAlCarrito(producto):alert("No hay stock");
            itemsCarrito();
        };

    });
}

// FUNCIÓN PARA TRAER EL ARCHIVO LOCAL JSON DE PRODUCTOS
async function JSONImprimirProductos() {
    const URLJSON = "./products.json"
    const respuesta = await fetch(URLJSON)
    const data = await respuesta.json()
    productos = data;
    obtenerValorDolarProductos();
}

//FUNCIÓN PARA AGREGAR AL CARRITO, SI EL PRODUCTO YA SE ENCUENTRA EN EL CARRITO SE SUMA UNA UNIDAD AL PRODUCTO EN VEZ DE DUPLICARSE
function agregarAlCarrito(productoNuevo){
    let elementoExistente = carrito.find((elemento) => elemento.id == productoNuevo.id);
    if(elementoExistente == undefined) {
        let prodACarrito = {
            ...productoNuevo,
            cantidad:1
        };
        carrito.push(prodACarrito);
    } else {
        elementoExistente.cantidad+=1;
    }
    // https://github.com/apvarun/toastify-js/blob/master/README.md
    Toastify({
        text: `${productoNuevo.nombre} agregado al carrito de compra`,
        duration: 1500,
        position: 'center',
        className: "toastPersonalizado",
        style: {
            background: "#F2FF8D",
        }
    }).showToast();
    setearCarrito();
    itemsCarrito();
}

//IMPRESIÓN DEL CARRITO, DISPONIBLE EN TODO EL SITIO COMO UN SWAL, CLICKEANDO EN EL ICONO DEL CARRITO
function imprimirCarrito(){
    let cartIcon = document.getElementById("cartIcon");
    cartIcon.addEventListener("click", (e) => {
        // https://sweetalert2.github.io/recipe-gallery/sidebars-drawers.html
        // https://sweetalert2.github.io/recipe-gallery/blurred-backdrop.html
        Swal.fire({
            title: 'Carrito de compras',
            customClass: "cart",
            position: 'top-end',
            html: " ",
            footer: " ",
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
        //DEBIDO A LA COMPLEJIDAD DEL HTML CONSIDERE MEJOR TRATARLO COMO UN MÉTODO DE SWAL Y NO ENCERRARLO DENTRO DEL MISMO
        // https://sweetalert2.github.io/#methods
        let cardCarrito = Swal.getHtmlContainer();
        let footerCarrito = Swal.getFooter();
        cardCarrito.innerHTML = "";
        footerCarrito.innerHTML = "";
        //SI EL CARRITO NO ESTA VACÍO SE IMPRIME TODO DENTRO DEL IF
        if(carrito.length != 0) {
            traerCarrito();
            footerCarrito.innerHTML = `<p id="total"></p><div class="botonesCart"><button id="cleanCart">Vaciar el carrito</button><button href="" id="buy">Comprar</button></div>`
            carrito.forEach((elemento) => {
                let pesificar = elemento.precio*dolarBlueVenta;
                let precioConIva = pesificar * 1.21;
                let productoCart = document.createElement("div");
                productoCart.className = "productoCart";
                productoCart.innerHTML += `
                <div class="card mb-3 cartaCarrito">
                    <div class="row g-0">
                        <div class="col-3">
                            <img src="./assets/${elemento.imagen}" class="img-fluid rounded-start" alt="${elemento.nombre}">
                        </div>
                        <div class="col-6 cartaCarritoContainer">
                            <div class="card-body cartaCarritoBody">
                                <h5 class="card-title">${elemento.nombre}</h5>
                                <div class="cartaCarritoCantidad">
                                    <p class="card-text">$${estandarPrecio.format(precioConIva)}</p>
                                    <div class="cantidad">
                                        <div class="value-button" id="decrease ${elemento.id}" value="Decrease Value">-</div>
                                        <input type="number" class="inputCart" id="cantidad-producto-${elemento.id}" value="${elemento.cantidad}" min="1" max="1000" step="1"/>
                                        <div class="value-button" id="increase ${elemento.id}" value="Increase Value">+</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-3 cartaCarritoContainer">
                            <div class="card-body cartaCarritoBody">
                                <a href="#" class="card-title basura" id="removeCart${elemento.id}"><i class="fa-solid fa-trash-can"></i></a>
                                <p class="card-text" id="precio-producto-${elemento.id}">$${estandarPrecio.format(precioConIva*elemento.cantidad)}</p>
                            </div>
                        </div>
                    </div>
                </div>
                `;
    
                cardCarrito.append(productoCart);
    
                let cantidadProductos = document.getElementById(`cantidad-producto-${elemento.id}`);
    
                let precioTotalProducto = document.getElementById(`precio-producto-${elemento.id}`);
    
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
                    totalCompra.innerHTML = `Subtotal (sin envío): <strong>$${estandarPrecio.format(total)}</strong>`
                    itemsCarrito(); 
                }
    
                document.getElementById(`decrease ${elemento.id}`).onclick=()=>decreaseValue(total);
    
                document.getElementById(`increase ${elemento.id}`).onclick=()=>increaseValue(total);
    
                let borrarProducto = document.getElementById(`removeCart${elemento.id}`);
                
                //ELIMINAR UN SOLO PRODUCTO
                borrarProducto.addEventListener("click", (e) => {
                    eliminarProductoCarrito(elemento);
                    productoCart.remove();
                    // https://github.com/apvarun/toastify-js/blob/master/README.md
                    Toastify({
                        text: `${elemento.nombre} eliminado del carrito de compra`,
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
    
                // FUNCIONES DE LOS BOTONES DEL FOOTER
                vaciarCarrito();
                comprarCarrito();
                //TOTAL DE COMPRA
                totalCompra.innerHTML = `Subtotal (sin envío): <strong>$${estandarPrecio.format(calcularTotal())}</strong>`  
            });
        setearCarrito();
        } else {
        // SI EL CARRITO ESTA VACÍO SE IMPRIME EL ELSE 
            traerCarrito();
            cardCarrito.innerHTML = "No hay productos en el carrito!";
            footerCarrito.innerHTML = `<a href="allProducts.html" id="buy">Ver todos los productos</a>`
        };
    });
};


// FUNCIÓN DE CALCULO DEL TOTAL
function calcularTotal() {
    total = 0;
    for (const elemento of carrito) {
        let pesificar = elemento.precio*dolarBlueVenta;
        let precioConIva = pesificar * 1.21;
        total+=elemento.cantidad*precioConIva;
    }
    return total;
}

//FUNCIÓN PARA ELIMINAR UN SOLO PRODUCTO DEL CARRITO
function eliminarProductoCarrito(elementoAEliminar) {
    const elementosAMantener = carrito.filter((elemento) => elementoAEliminar.id != elemento.id);
    carrito.length = 0;
    elementosAMantener.forEach((elemento) => carrito.push(elemento));
    setearCarrito();
    if(carrito.length == 0){
        Swal.update({
            html: "No hay productos en el carrito!",
            footer: `<a href="allProducts.html" id="buy">Ver todos los productos</a>`
        });
    }
}

//BADGE DEL CARRITO CON EL NUMERO DE ITEMS, SE ACTUALIZA CUANDO SE AGREGA UN PRODUCTO, SE ELIMINA UN PRODUCTO O SE CAMBIA LA CANTIDAD DE ALGÚN PRODUCTO
function itemsCarrito(){
    let cantidad = 0;
    carrito.forEach((elemento) => {
        cantidad += parseInt(elemento.cantidad);
    });
    let items = document.querySelector(".items");
    items.innerText = `${cantidad}`
}


//FUNCIÓN PARA ELIMINAR TODO EL CARRITO
function vaciarCarrito(){
    document.getElementById("cleanCart").addEventListener("click", function(){
        carrito.length = 0;
        setearCarrito();
        if(carrito.length == 0){
            Swal.update({
                html: "No hay productos en el carrito!",
                footer: `<a href="allProducts.html" id="buy">Ver todos los productos</a>`
            });
        }
        itemsCarrito();
    });
}


// https://sweetalert2.github.io/recipe-gallery/login-form.html
// FUNCIÓN PARA CERRAR EL CICLO DE COMPRA, SI EL USUARIO SALE DEL FORMULARIO NO SE COMPLETA EL PROCESO Y EL CARRITO NO SE VACÍA
function comprarCarrito(){
    document.getElementById("buy").addEventListener("click", function(){
        Swal.fire({
            title: "Por favor completa los siguientes datos para finalizar tu compra",
            html: `<form action="" class="formCompra">
            <input type="text" class="swal2-input" id="nombre" placeholder="Nombre Completo">
            <input type="email" class="swal2-input" id="email" placeholder="Email">
            <input type="tel" class="swal2-input" id="telefono" placeholder="Teléfono">
            <input type="text" class="swal2-input" id="direccion" placeholder="Dirección">
            <input type="number" class="swal2-input" id="codigo" placeholder="Codigo Postal">
            <input type="text" class="swal2-input" id="ciudad" placeholder="Ciudad">
            </form>`,
            color: "#F2FF8D",
            confirmButtonText: "Confirmar",
            confirmButtonColor: "#FF99C1",
            customClass: "compra",
            focusConfirm: false,
            background: "#04BAD8",
            preConfirm: (e) => {
                const nombre = Swal.getPopup().querySelector("#nombre").value;
                const email = Swal.getPopup().querySelector("#email").value;
                const telefono = Swal.getPopup().querySelector("#telefono").value;
                const direccion = Swal.getPopup().querySelector("#direccion").value;
                const codigo = Swal.getPopup().querySelector("#codigo").value;
                const ciudad = Swal.getPopup().querySelector("#ciudad").value;
                !isNaN(ciudad)? Swal.showValidationMessage('La ciudad no puede estar compuesta por números'): '';
                !ciudad? Swal.showValidationMessage('Ciudad obligatoria'): '';
                isNaN(codigo)? Swal.showValidationMessage('El Código Postal debe estar compuesto por números'): '';
                !codigo? Swal.showValidationMessage('Código Postal obligatorio'): '';
                !direccion? Swal.showValidationMessage('Dirección obligatoria'): '';
                isNaN(telefono)?Swal.showValidationMessage('El Teléfono debe estar compuesto por números'): '';
                !telefono? Swal.showValidationMessage('Teléfono obligatorio'): '';
                const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
                !email.match(validRegex)? Swal.showValidationMessage('Email invalido'): '';
                !email? Swal.showValidationMessage('Email obligatorio'): '';
                !isNaN(nombre)? Swal.showValidationMessage('El nombre no puede estar compuesto por números'): '';
                !nombre? Swal.showValidationMessage('Nombre obligatorio'): '';


                return { nombre: nombre, email: email, telefono: telefono, direccion: direccion, codigo: codigo, ciudad: ciudad}
            } 
        }).then((resultado) => {
            Swal.fire({
                html: `
                <p>Nombre completo: ${resultado.value.nombre}</p>
                <p>Email: ${resultado.value.email}</p>
                <p>Teléfono: ${resultado.value.telefono}</p>
                <p>Dirección: ${resultado.value.direccion}</p>
                <p>Código Postal: ${resultado.value.codigo}</p>
                <p>Ciudad: ${resultado.value.ciudad}</p>
                `,
                confirmButtonText: "Ir a medios de pago",
            }).then(() => {
                Swal.fire({
                    title: "¡GRACIAS POR TU COMPRA!",
                    icon: 'success',
                    timer: 3000,
                    showConfirmButton: false,
                });
                carrito.length = 0;
                setearCarrito();
                itemsCarrito();
            })
        })
    });
}

//BARRA DE BUSCADOR, A PARTIR DEL TIPEO DE LETRAS SE DESPLIEGA UNA LISTA DE COINCIDENCIAS DENTRO DE LOS PRODUCTOS
// https://www.w3schools.com/howto/howto_js_autocomplete.asp
function buscador(){
    obtenerValorDolar();  
    buscar = document.getElementById("buscador");
    divBuscador = document.getElementById("divBuscador");
    buscar.addEventListener("input", () => {
        divLista.innerHTML = "";
        divLista.style.border = "none";
        JSONProductos();
        let filtro = productos.filter((item)=>item.nombre.toLowerCase().includes(buscar.value.toLowerCase()));
        if(buscar.value.length > 1 && filtro.length != 0){
            filtro.forEach((item) => {
                let pesificar = item.precio*dolarBlueVenta;
                let precioConIva = pesificar * 1.21;
                let cartaSugerencia = document.createElement("div");
                cartaSugerencia.className = "card mb-3 divCarta";
                cartaSugerencia.innerHTML = `
                    <button id = "showProductBuscador${item.id}" class="botonBuscador">
                    <div class="row g-0">
                        <div class="col-md-4">
                            <img src="./assets/${item.imagen}" class="img-fluid rounded-start" alt="${item.nombre}">
                        </div>
                        <div class="col-md-8 cardBodyContainer">
                            <div class="card-body cardBody">
                                <h5 class="card-title">${item.nombre}</h5>
                                <p class="card-text">$${estandarPrecio.format(precioConIva)}</p>
                            </div>
                        </div>
                    </div>
                    </button>
                `;
                divLista.append(cartaSugerencia);
                document.getElementById(`showProductBuscador${item.id}`).onclick = function(){
                    Swal.fire({
                        title: `${item.nombre}`,
                        html:`
                        <div class="card mb-3">
                        <div class="row g-0">
                          <div class="col-md-4">
                            <img src="./assets/${item.imagen}" class="img-fluid rounded-start" alt="${item.nombre}">
                          </div>
                          <div class="col-md-8">
                            <div class="card-body">
                              <p class="card-text">${item.descripcion}</p>
                              <p class="card-text">$${estandarPrecio.format(precioConIva)}</p>
                              <button id="addCartBuscador${item.id}" class="botonCarritoIndividual">AGREGAR AL CARRITO</button>
                            </div>
                          </div>
                        </div>
                      </div>`,
                      showConfirmButton: false,
                      showCloseButton: true,
                      customClass: "cardIndividual",
                      width: "60%",
                      background: "#04BAD8",
                    });
                    document.getElementById(`addCartBuscador${item.id}`).onclick = function(){
                        let cantidad = item.cantidad;
                        cantidad > 0? agregarAlCarrito(item):alert("No hay stock");
                        setearCarrito();
                        itemsCarrito();
                    };
                }
            }) 
            divBuscador.appendChild(divLista);
            divLista.style.border = "dashed #393838";
            buscador();

        }else if(buscar.value.length > 1 && filtro.length === 0){
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




