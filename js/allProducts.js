JSONImprimirProductos();
botonAgregarCarrito();
JSONFiltrarPorCategorias();
ordenarPor();

//IMPRESIÓN DE TARJETAS DE FILTRADO PARA FILTER Y SORT
function imprimirFiltrado() {
    cardProducto.innerHTML = "";
    for (const producto of filtrado) {
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
    };
}

async function JSONImprimirFiltrado() {
    const URLJSON = "./products.json"
    const respuesta = await fetch(URLJSON)
    const data = await respuesta.json()
    filtrado = data;
    imprimirFiltrado();
}

//FILTRADO DE PRODUCTOS POR CATEGORIA
function filtrarPorCategoria(){
    let selectCategoria = document.getElementById("filtro");
    for (const categoria of categorias) {
        selectCategoria.innerHTML += `<option id="categoria${categoria.id}">${categoria.titulo}</option>`

        //SEGÚN LA SELECCIÓN DEL USUARIO SE IMPRIMEN LAS TARJETAS DE LOS PRODUCTOS SOLO PERTENECIENTES A LA CATEGORIA CORRESPONDIENTE
        selectCategoria.onchange = () => {
            if(selectCategoria.value == "todos"){
                JSONImprimirProductos();
            } else {
                filtrado = productos.filter((producto) => producto.categoria == selectCategoria.value);
                imprimirFiltrado();
                botonAgregarCarrito();
            }
        };
    };
};

async function JSONFiltrarPorCategorias(){
    const URLJSONCategorias = "./categories.json";
    const URLJSONProductos = "./products.json";
    const respuestaCategorias = await fetch(URLJSONCategorias);
    const respuestaProductos = await fetch(URLJSONProductos);
    const dataCategorias = await respuestaCategorias.json();
    const dataProductos = await respuestaProductos.json();
    categorias = dataCategorias;
    productos = dataProductos;
    filtrarPorCategoria()
}

// https://www.codegrepper.com/code-examples/javascript/sort+the+products+by+their+price+using+js
// ORDENADO DE PRODUCTOS SEGÚN PRECIO Y NOMBRE, BASADO EN LA SELECCIÓN DEL USUARIO
function ordenarPor(){
    let selectOrdenar = document.getElementById("ordenar");
    selectOrdenar.onchange = () => {
        switch(selectOrdenar.value){
            case "precio-ascendente":
                filtrado.sort((a,b) => a.precio > b.precio ? 1:-1);
                imprimirFiltrado();
                break;
            case "precio-descendente":
                filtrado.sort((a,b) => a.precio > b.precio ? -1:1);
                imprimirFiltrado();
                break;
            case "nombre-ascendente":
                filtrado.sort((a,b) => a.nombre > b.nombre ? 1:-1);
                imprimirFiltrado();
                break;
            case "nombre-descendente":
                filtrado.sort((a,b) => a.nombre > b.nombre ? -1:1);
                imprimirFiltrado();
                break;
        }
    }
}
