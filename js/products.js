let productos = [];
let carrito = [];
const categorias = [];

// CONSTRUCTOR DEL PRODUCTO
class Producto {
  constructor(id, nombre, categoria, precio, descripcion, imagen, cantidad) {
    this.id = id;
    this.nombre = nombre;
    this.categoria = categoria;
    this.precio = precio;
    this.descripcion = descripcion;
    this.imagen = imagen;
    this.cantidad = cantidad;
  }
}

class Carrito {
  constructor(producto, cantidad) {
      this.producto = producto;
      this.cantidad = cantidad;
  }
}

class Categoria {
  constructor(id, titulo, caratula){
      this.id = id;
      this.titulo = titulo;
      this.caratula = caratula;
  }
}

productos.push(new Producto(1, "Base Dior", "Bases", 15000, "descripcion", "bases/DiorForever.jpg", 10))
productos.push(new Producto(2, "Base Anastasia", "Bases", 15001, "descripcion", "bases/Anastasia.jpg", 10))
productos.push(new Producto(3, "Base Elf", "Bases", 15002, "descripcion", "bases/Elf.jpg", 10))
productos.push(new Producto(4, "Base Fenty", "Bases", 15003, "descripcion", "bases/Fenty.jpg", 10))
productos.push(new Producto(5, "Labial CT", "Labiales", 15004, "descripcion", "labiales/CharlotteTilbury.jpg", 10))
productos.push(new Producto(6, "Labial Fenty", "Labiales", 15005, "descripcion", "labiales/Fenty.jpg", 10))
productos.push(new Producto(7, "Labial HausLabs", "Labiales", 15006, "descripcion", "labiales/HausLabs.jpg", 10))
productos.push(new Producto(8, "Labial PatMcGrath", "Labiales", 15007, "descripcion", "labiales/PatMcGrath.jpg", 10))
productos.push(new Producto(9, "Mascara Benefit", "Mascaras", 15008, "descripcion", "mascaras/Benefit.jpg", 10))
productos.push(new Producto(10, "Mascara Hourglass", "Mascaras", 15009, "descripcion", "mascaras/Hourglass.jpg", 10))
productos.push(new Producto(11, "Mascara Lancome", "Mascaras", 15010, "descripcion", "mascaras/Lancome.jpg", 10))
productos.push(new Producto(12, "Mascara Maybelline", "Mascaras", 15011, "descripcion", "mascaras/MaybellineSkyHigh.jpg", 10))
productos.push(new Producto(13, "Paleta Anastasia", "Paletas", 15012, "descripcion", "paletas/Anastasia.jpg", 10))
productos.push(new Producto(14, "Paleta Colourpop", "Paletas", 15013, "descripcion", "paletas/ColourpopBareNecessities.jpg", 10))
productos.push(new Producto(15, "Paleta ND", "Paletas", 15014, "descripcion", "paletas/NatashaDenonaPastel.jpg", 10))
productos.push(new Producto(16, "Paleta Pat McGrath", "Paletas", 15015, "descripcion", "paletas/PatMagrath.jpg", 10))
productos.push(new Producto(17, "Brocha Fenty", "Brochas", 15016, "descripcion", "brochas/Fenty.jpg", 10))
productos.push(new Producto(18, "Brochas Morphe", "Brochas", 15017, "descripcion", "brochas/MorpheJaclyn.jpg", 10))
productos.push(new Producto(19, "Brochas RT", "Brochas", 15018, "descripcion", "brochas/RealTechniques.jpg", 10))
productos.push(new Producto(20, "Brochas Sigma", "Brochas", 15019, "descripcion", "brochas/Sigma.jpg", 10))
productos.push(new Producto(21, "Esmalte ILNP", "Esmaltes", 15020, "descripcion", "esmaltes/ILNP.jpg", 10))
productos.push(new Producto(22, "Esmalte ILNP", "Esmaltes", 15021, "descripcion", "esmaltes/ILNPHiFi.jpg", 10))
productos.push(new Producto(23, "Esmalte ILNP", "Esmaltes", 15022, "descripcion", "esmaltes/ILNPMulticolored.jpg", 10))
productos.push(new Producto(24, "Esmalte ILNP", "Esmaltes", 15023, "descripcion", "esmaltes/ILNPRadiant.jpg", 10))

// LLENANDO EL ARRAY DE CATEGORIA
categorias.push(new Categoria(1, "Bases", "foundations.jpeg"));
categorias.push(new Categoria(2, "Labiales", "lipsticks.jpeg"));
categorias.push(new Categoria(3, "Mascaras", "mascaras.jpeg"));
categorias.push(new Categoria(4, "Paletas", "shadowPallette.jpeg"));
categorias.push(new Categoria(5, "Brochas", "brushes.jpeg"));
categorias.push(new Categoria(6, "Esmaltes", "nailPolish.jpeg"));

const estandarPrecio = Intl.NumberFormat('es-ES');