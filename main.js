const productos = [];
const categorias = [];

// CONSTRUCTOR DEL PRODUCTO
class Producto {
  constructor(nombre, categoria, precio, descripcion, imagen, cantidad) {
    this.nombre = nombre;
    this.categoria = categoria;
    this.precio = precio;
    this.descripcion = descripcion;
    this.imagen = imagen;
    this.cantidad = cantidad;
  }
}

class Categoria {
    constructor(titulo, caratula){
        this.titulo = titulo;
        this.caratula = caratula;
    }
}

// LLENANDO EL ARRAY DE CATEGORIA
categorias.push(new Categoria("Bases", "foundations.jpeg"));
categorias.push(new Categoria("Labiales", "lipsticks.jpeg"));
categorias.push(new Categoria("Mascaras", "mascaras.jpeg"));
categorias.push(new Categoria("Paletas", "shadowPallette.jpeg"));
categorias.push(new Categoria("Brochas", "brushes.jpeg"));
categorias.push(new Categoria("Esmaltes", "nailPolish.jpeg"));


productos.push(new Producto("Base Dior", "Bases", 15000, "descripcion", "bases/DiorForever.jpg", 10))
productos.push(new Producto("Base Anastasia", "Bases", 15000, "descripcion", "bases/Anastasia.jpg", 10))
productos.push(new Producto("Base Elf", "Bases", 15000, "descripcion", "bases/Elf.jpg", 10))
productos.push(new Producto("Base Fenty", "Bases", 15000, "descripcion", "bases/Fenty.jpg", 10))
productos.push(new Producto("Labial CT", "Labiales", 15000, "descripcion", "labiales/CharlotteTilbury.jpg", 10))
productos.push(new Producto("Labial Fenty", "Labiales", 15000, "descripcion", "labiales/Fenty.jpg", 10))
productos.push(new Producto("Labial HausLabs", "Labiales", 15000, "descripcion", "labiales/HausLabs.jpg", 10))
productos.push(new Producto("Labial PatMcGrath", "Labiales", 15000, "descripcion", "labiales/PatMcGrath.jpg", 10))
productos.push(new Producto("Mascara Benefit", "Mascaras", 15000, "descripcion", "mascaras/Benefit.jpg", 10))
productos.push(new Producto("Mascara Hourglass", "Mascaras", 15000, "descripcion", "mascaras/Hourglass.jpg", 10))
productos.push(new Producto("Mascara Lancome", "Mascaras", 15000, "descripcion", "mascaras/Lancome.jpg", 10))
productos.push(new Producto("Mascara Maybelline", "Mascaras", 15000, "descripcion", "mascaras/MaybellineSkyHigh.jpg", 10))
productos.push(new Producto("Paleta Anastasia", "Paletas", 15000, "descripcion", "paletas/Anastasia.jpg", 10))
productos.push(new Producto("Paleta Colourpop", "Paletas", 15000, "descripcion", "paletas/ColourpopBareNecessities.jpg", 10))
productos.push(new Producto("Paleta ND", "Paletas", 15000, "descripcion", "paletas/NatashaDenonaPastel.jpg", 10))
productos.push(new Producto("Paleta Pat McGrath", "Paletas", 15000, "descripcion", "paletas/PatMagrath.jpg", 10))
productos.push(new Producto("Brocha Fenty", "Brochas", 15000, "descripcion", "brochas/Fenty.jpg", 10))
productos.push(new Producto("Brochas Morphe", "Brochas", 15000, "descripcion", "brochas/MorpheJaclyn.jpg", 10))
productos.push(new Producto("Brochas RT", "Brochas", 15000, "descripcion", "brochas/RealTechniques.jpg", 10))
productos.push(new Producto("Brochas Sigma", "Brochas", 15000, "descripcion", "brochas/Sigma.jpg", 10))
productos.push(new Producto("Esmalte ILNP", "Esmaltes", 15000, "descripcion", "esmaltes/ILNP.jpg", 10))
productos.push(new Producto("Esmalte ILNP", "Esmaltes", 15000, "descripcion", "esmaltes/ILNPHiFi.jpg", 10))
productos.push(new Producto("Esmalte ILNP", "Esmaltes", 15000, "descripcion", "esmaltes/ILNPMulticolored.jpg", 10))
productos.push(new Producto("Esmalte ILNP", "Esmaltes", 15000, "descripcion", "esmaltes/ILNPRadiant.jpg", 10))



let cartas=document.getElementById("categorias");
for(const categoria of categorias){
    let carta=document.createElement("div");
    carta.className="categoria";
    carta.innerHTML=`
        <a href="">
        <img src="./assets/${categoria.caratula}" alt="${categoria.titulo}">
        <p>${categoria.titulo}</p>
        </a>
    `;
    cartas.append(carta);
}


let boton = document.getElementById("allProducts");
let id;
let card = document.getElementById("productos");
boton.onclick = () => {
    if(boton.innerText == "Mostrar todos los productos"){
        for (const producto of productos) {
            card.innerHTML += `
                <div class="producto">
                    <img src="./assets/${producto.imagen}" alt="${producto.imagen}">
                    <p>${producto.nombre}</p>
                    <p>$${producto.precio * 1.21}</p>
                </div>
            `
            boton.innerText = "Ocultar todos los productos";
            ;
        } 
        } else {
            card.innerHTML = "";
            boton.innerText = "Mostrar todos los productos";
    }
}