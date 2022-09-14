JSONImprimirCategorias();

async function JSONImprimirCategorias(){
    const URLJSON = "./categories.json";
    const respuesta = await fetch(URLJSON);
    const data = await respuesta.json();
    categorias = data;
    imprimirCategorias();
}

//MOSTRAR TARJETAS DE CATEGORIAS EN EL INDEX
function imprimirCategorias(){
    JSONProductos();
    obtenerValorDolar();
    for(const categoria of categorias){
        let caratula=document.createElement("div");
        caratula.className="categoria";
        caratula.innerHTML=`
            <button id="categoria${categoria.id}">
            <img src="./assets/${categoria.caratula}" alt="${categoria.titulo}">
            <h5>${categoria.titulo}</h5>
            </button>
        `;
        let divProductos = document.createElement("div")
        divProductos.id = `productos${categoria.id}`;
        caratulas.append(caratula);
        caratulas.append(divProductos);
        enlaceCategoria = document.getElementById(`categoria${categoria.id}`);
        enlaceCategoria.onclick = () => {
            JSONProductos();
            productos = productos.filter((producto) => producto.categoria == categoria.titulo);

            Swal.fire({
                titleText: `${categoria.titulo}`,
                html: "",
                customClass: "divProductos" ,
                background: "#BF9EEC",
                showCloseButton: true,
                showConfirmButton: false,
            })
            let swalCategorias = Swal.getHtmlContainer()
            swalCategorias.id = "productos";
            cardProducto = document.getElementById("productos");
            imprimirProductos();
        }
    }
}