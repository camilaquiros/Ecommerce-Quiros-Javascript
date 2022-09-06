botonMostrarTodos();
JSONImprimirCategorias();
obtenerValorDolar();

//MOSTRAR TARJETAS DE CATEGORIAS EN EL INDEX
function imprimirCategorias(){
    for(const categoria of categorias){
        let caratula=document.createElement("div");
        caratula.className="categoria";
        caratula.innerHTML=`
            <a href="allProducts.html" id="${categoria.titulo}">
            <img src="./assets/${categoria.caratula}" alt="${categoria.titulo}">
            <p>${categoria.titulo}</p>
            </a>
        `;
        caratulas.append(caratula);
        enlaceCategoria = document.getElementById(`${categoria.titulo}`);
        enlaceCategoria.onclick = () => {

        }
    }
}

async function JSONImprimirCategorias(){
    const URLJSON = "./categories.json";
    const respuesta = await fetch(URLJSON);
    const data = await respuesta.json();
    categorias = data;
    imprimirCategorias();
}

//BOTÓN UBICADO EN EL INDEX PARA MOSTRAR TODOS LOS PRODUCTOS
function botonMostrarTodos(){
    botonTodosLosProductos.onclick = () => {
        if(botonTodosLosProductos.innerText == "Mostrar todos los productos"){
            JSONImprimirProductos();
            botonTodosLosProductos.innerText = "Ocultar todos los productos";
            } else {
                cardProducto.innerHTML = "";
                botonTodosLosProductos.innerText = "Mostrar todos los productos";
        }
    }
}
