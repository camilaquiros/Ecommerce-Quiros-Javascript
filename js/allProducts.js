JSONImprimirProductos();
JSONFiltrarPorCategorias();
ordenarPor();

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
                JSONProductos();
                productos = productos.filter((producto) => producto.categoria == selectCategoria.value);
                console.log(productos);
                imprimirProductos();
            }
        };
    };
};

async function JSONProductos(){
    const URLJSON = "./products.json"
    const respuesta = await fetch(URLJSON)
    const data = await respuesta.json()
    productos = data;
}

async function JSONFiltrarPorCategorias(){
    const URLJSONCategorias = "./categories.json";
    const URLJSONProductos = "./products.json";
    const respuestaCategorias = await fetch(URLJSONCategorias);
    const respuestaProductos = await fetch(URLJSONProductos);
    const dataCategorias = await respuestaCategorias.json();
    const dataProductos = await respuestaProductos.json();
    categorias = dataCategorias;
    productos = dataProductos;
    filtrarPorCategoria();
}

// https://www.codegrepper.com/code-examples/javascript/sort+the+products+by+their+price+using+js
// ORDENADO DE PRODUCTOS SEGÚN PRECIO Y NOMBRE, BASADO EN LA SELECCIÓN DEL USUARIO
function ordenarPor(){
    let selectOrdenar = document.getElementById("ordenar");
    selectOrdenar.onchange = () => {
        switch(selectOrdenar.value){
            case "precio-ascendente":
                productos.sort((a,b) => a.precio > b.precio ? 1:-1);
                imprimirProductos();
                break;
            case "precio-descendente":
                productos.sort((a,b) => a.precio > b.precio ? -1:1);
                imprimirProductos();
                break;
            case "nombre-ascendente":
                productos.sort((a,b) => a.nombre > b.nombre ? 1:-1);
                imprimirProductos();
                break;
            case "nombre-descendente":
                productos.sort((a,b) => a.nombre > b.nombre ? -1:1);
                imprimirProductos();
                break;
        }
    }
}
