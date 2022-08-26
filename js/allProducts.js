imprimirFiltrado();
botonAgregarCarrito();
filtrarPorCategoria();
ordenarPor();

//IMPRESIÓN DE TARJETAS DE FILTRADO PARA FILTER Y SORT
function imprimirFiltrado() {
    cardProducto.innerHTML = "";
    for (const producto of filtrado) {
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
    };
}

//FILTRADO DE PRODUCTOS POR CATEGORIA
function filtrarPorCategoria(){
    let selectCategoria = document.getElementById("filtro");
    for (const categoria of categorias) {
        selectCategoria.innerHTML += `<option id="categoria${categoria.id}">${categoria.titulo}</option>`

        //SEGÚN LA SELECCIÓN DEL USUARIO SE IMPRIMEN LAS TARJETAS DE LOS PRODUCTOS SOLO PERTENECIENTES A LA CATEGORIA CORRESPONDIENTE
        selectCategoria.onchange = () => {
            if(selectCategoria.value == "todos"){
                imprimirProductos();
            } else {
                filtrado = productos.filter((producto) => producto.categoria == selectCategoria.value);
                imprimirFiltrado();
                botonAgregarCarrito();
            }
        };
    };
};

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
