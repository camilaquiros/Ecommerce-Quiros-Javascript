let inventario = prompt("Opciones de producto:\nIngresar\nEgresar\nInventario\n\n(esc-para salir)");
const productos = [];

class Producto {
    constructor(nombre, precio, cantidad) {
        this.nombre = nombre;
        this.precio = precio;
        this.cantidad = cantidad;
      }
}

productos.push(new Producto("Bases", 15000, 10));
productos.push(new Producto("Correctores", 8000, 10));
productos.push(new Producto("Paletas", 20000, 10));
productos.push(new Producto("Esmaltes", 3000, 10));

function ingresarProducto() {
    let nombre = prompt("Ingresar nombre del producto");
    let precio = parseFloat(prompt("Ingresar precio del producto"));
    let cantidad = parseInt(prompt("Ingresar cantidad del producto"));
    if(nombre != "" && !isNaN(precio) && !isNaN(cantidad)){
        productos.push(new Producto(nombre, precio, cantidad));
        inventario = prompt("Opciones de producto:\nIngresar\nEgresar\nInventario\n\n(esc-para salir)");
    }else{
        alert("Parámetros incorrectos")
    }
}

function egresarProducto() {
    let productoPorNombre = prompt("Ingrese el nombre del producto");
    for (const producto of productos) {
        if(producto.nombre.toLowerCase() == productoPorNombre.toLowerCase()){
            let posicion = productos.indexOf(producto);
            productos.splice(posicion, 1);
            inventario = prompt("Opciones de producto:\nIngresar\nEgresar\nInventario\n\n(esc-para salir)");
        }
    }
}


while(inventario.toLowerCase() != "esc"){
    if(inventario.toLowerCase() == "ingresar") {
        ingresarProducto();
    }else if(inventario.toLowerCase() == "egresar"){
        egresarProducto();
    }
    else if(inventario.toLowerCase() == "inventario"){
        console.table(productos);
        inventario = prompt("Opciones de producto:\nIngresar\nEgresar\nInventario\n\n(esc-para salir)");
    }
}





