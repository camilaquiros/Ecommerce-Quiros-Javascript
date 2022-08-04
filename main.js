// SETEO DE VARIABLES
let fecha = new Date;
let usuario = prompt(fecha.toLocaleString() + "\nIndique que tipo de usuario es: \nCliente\nComerciante\n\nBuscador\n\n(esc-para salir)");
let consulta;
let comprar;
let totalProducto;
let totalCarrito = 0;
let inventario;
const productos = [];
const carrito = [];

// CONSTRUCTOR DEL PRODUCTO
class Producto {
  constructor(nombre, precio, cantidad) {
    this.nombre = nombre;
    this.precio = precio;
    this.cantidad = cantidad;
  }
}

// LLENANDO EL ARRAY DE PRODUCTOS
productos.push(new Producto("Bases", 15000, 10));
productos.push(new Producto("Labiales", 3000, 10));
productos.push(new Producto("Mascaras", 6000, 10));
productos.push(new Producto("Paletas", 20000, 10));
productos.push(new Producto("Brochas", 2500, 10));
productos.push(new Producto("Esmaltes", 3000, 10));

// PARA HACER LA PRIMER LETRA MAYÚSCULA
// program to convert first letter of a string to uppercase
function capitalizeFirstLetter(str) {
  // converting first letter to uppercase
  const capitalized = str.charAt(0).toUpperCase() + str.slice(1);
  return capitalized;
}

// COMPRA DEL CLIENTE: SE LE MUESTRA LA LISTA DE  PRODUCTOS, AL SELECCIONAR UNO SE LE MUESTRA EL PRECIO, DECIDE SI QUIERE AGREGARLO AL CARRITO O NO Y POR ULTIMO SE LE CONSULTA QUE CANTIDAD DEL PRODUCTO DESEA
function compra() {
    for (const producto of productos) {
        if(consulta.toLowerCase() == producto.nombre.toLowerCase()){
            alert("El producto " + producto.nombre + " cuesta $" + producto.precio);
            comprar = prompt("¿Quiere agregar este producto al carrito? SI/NO");
            if(comprar.toUpperCase() == "SI") {
                let consultaCantidad = parseInt(prompt("Para agregar al carrito indique cantidad deseada (0 para volver a la consulta de precios)"));
                if (consultaCantidad > 0 && !isNaN(consultaCantidad)) {
                    totalProducto = producto.precio * consultaCantidad;
                    totalCarrito += totalProducto;
                    carrito.push(new Producto(producto.nombre, producto.precio, consultaCantidad));
                    alert("El total por este producto es de $" + totalProducto);
                    consulta = prompt("Consulta de precios:\nBases\nLabiales\nPaletas\nMascaras\nBrochas\nEsmaltes\n\ncarrito\n\n(esc-para salir)");
                }else if (consultaCantidad == 0 && !isNaN(consultaCantidad)) {
                    consulta = prompt("Consulta de precios:\nBases\nLabiales\nPaletas\nMascaras\nBrochas\nEsmaltes\n\ncarrito\n\n(esc-para salir)");
                } else {
                    alert("Esa cantidad no es valida");
                }
            }else if (comprar.toUpperCase() == "NO") {
                consulta = prompt("Consulta de precios:\nBases\nLabiales\nPaletas\nMascaras\nBrochas\nEsmaltes\n\ncarrito\n\n(esc-para salir)");
            } else {
                alert("Lo siento, no te entendí");
            }
            return totalProducto;
        }else if (consulta.toLowerCase() == "carrito") {
            alert("Total: $" + totalCarrito);
            console.table(carrito);
            consulta = prompt("Consulta de precios:\nBases\nLabiales\nPaletas\nMascaras\nBrochas\nEsmaltes\n\ncarrito\n\n(esc-para salir)");
        }
    }
}

// INGRESO DE PRODUCTOS POR PARTE DEL COMERCIANTE, DEBE INGRESAR CORRECTAMENTE NOMBRE(ESTE MISMO SE GUARDARA CON LA PRIMER LETRA MAYÚSCULA), PRECIO Y STOCK DEL PRODUCTO, ESTO LUEGO SE AGREGA AL ARRAY DE PRODUCTOS
function ingresarProducto() {
  function nombreCorrecto(){
    let nombre = prompt("Ingresar nombre del producto");
    if (nombre != "") {
      function precioNumero(){
        let precio = parseFloat(prompt("Ingresar precio del producto"));
        if(!isNaN(precio)){
          function cantidadNumero() {
            let cantidad = parseInt(prompt("Ingresar cantidad del producto"));
            if(!isNaN(cantidad)){
              const nombreMayuscula = capitalizeFirstLetter(nombre);
              productos.push(new Producto(nombreMayuscula, precio, cantidad));
              inventario = prompt(
                "Opciones de producto:\nIngresar\nEgresar\nInventario\n\n(esc-para salir)"
              );
            }else{
              alert("Cantidad Incorrecta");
              cantidadNumero();
            }
          }cantidadNumero();
        }else {
          alert("Precio incorrecto");
          precioNumero();
        }
      }precioNumero();
    }else {
      alert("Nombre incorrecto");
      nombreCorrecto();
    }
  }nombreCorrecto();
}

// EGRESO DE PRODUCTOS POR PARTE DEL COMERCIANTE, DEBE INGRESAR SOLO EL NOMBRE DEL PRODUCTO Y ESTE SERA ELIMINADO DEL ARRAY DE PRODUCTOS
function egresarProducto() {
  let productoPorNombre = prompt("Ingrese el nombre del producto");
  for (const producto of productos) {
    if (producto.nombre.toLowerCase() == productoPorNombre.toLowerCase()) {
      let posicion = productos.indexOf(producto);
      productos.splice(posicion, 1);
      inventario = prompt(
        "Opciones de producto:\nIngresar\nEgresar\nInventario\n\n(esc-para salir)"
      );
    }
  }
}

// UNA FUNCIÓN DE BUSCADOR DE PRODUCTOS SOLO POR NOMBRE
function buscador(){
    let buscar = prompt("¿Que estas buscando?");
    let encontrar = productos.find((producto)=>producto.nombre == buscar);
    if(encontrar != undefined){
        alert("Producto encontrado: " + encontrar.nombre);
        usuario = prompt(fecha.toLocaleString() + "\nIndique que tipo de usuario es: \nCliente\nComerciante\n\nBuscador");
    }else{
        alert("Producto no encontrado");
        buscar = prompt("¿Que estas buscando?");
    }
}

// ORGANIZACION FINAL DE LA APLICACION
while(usuario.toLowerCase() != "esc"){
  if (usuario.toLowerCase() == "cliente") {
    consulta = prompt("Consulta de precios:\nBases\nLabiales\nPaletas\nMascaras\nBrochas\nEsmaltes\n\ncarrito\n\n(esc-para salir)");
    while (consulta.toLowerCase() != "esc") {
      compra();
    }
  } else if (usuario.toLowerCase() == "comerciante") {
    inventario = prompt("Opciones de producto:\nIngresar\nEgresar\nInventario\n\n(esc-para salir)");
    while (inventario.toLowerCase() != "esc") {
      if (inventario.toLowerCase() == "ingresar") {
        ingresarProducto();
      } else if (inventario.toLowerCase() == "egresar") {
        egresarProducto();
      } else if (inventario.toLowerCase() == "inventario") {
        console.table(productos);
        inventario = prompt("Opciones de producto:\nIngresar\nEgresar\nInventario\n\n(esc-para salir)");
      }
    }
  } else if (usuario.toLowerCase() == "buscador") {
      buscador();
  } else {
    usuario = prompt(fecha.toLocaleString() + "\nIndique que tipo de usuario es: \nCliente\nComerciante\n\nBuscador\n\n(esc-para salir)");
  }
}