let producto = prompt("Consulta de precios:\nBases\nCorrectores\nPaletas\nEsmaltes\n\ncarrito\n\n(esc-para salir)");
let precio;
let comprar;
let cantidad;
let totalProducto;
let totalCarrito = 0;

function compra() {
    comprar = prompt("¿Quiere agregar este producto al carrito? SI/NO");
    if(comprar.toUpperCase() == "SI") {
        cantidad = parseInt(prompt("Para agregar al carrito indique cantidad deseada (0 para volver a la consulta de precios)"));
        if((cantidad > 0) && (!isNaN(cantidad))){
            totalProducto = precio*cantidad;
            totalCarrito = totalCarrito + totalProducto;
            alert("El total por este producto es de $" + totalProducto);
            producto = prompt("Consulta de precios:\nBases\nCorrectores\nPaletas\nEsmaltes\n\ncarrito\n\n(esc-para salir)");
        }
        else if((cantidad == 0) && (!isNaN(cantidad))) {
            producto = prompt("Consulta de precios:\nBases\nCorrectores\nPaletas\nEsmaltes\n\ncarrito\n\n(esc-para salir)");
        }
        else{
            alert("Esa cantidad no es valida");
        }
    }
    else if(comprar.toUpperCase() == "NO") {
        producto = prompt("Consulta de precios:\nBases\nCorrectores\nPaletas\nEsmaltes\n\ncarrito\n\n(esc-para salir)");
    }
    else {
        alert("Lo siento, no te entendí");
    }
    return totalProducto;
}

while(producto.toLowerCase() != "esc"){
    switch(producto.toLowerCase()) {
        case "bases":
            precio = 15000;
            alert("Las bases salen $" + precio);
            compra();
            break;
        case "correctores":
            precio = 8000;
            alert("Los correctores salen $" + precio);
            compra();
            break;
        case "paletas":
            precio = 20000;
            alert("Las paletas salen $" + precio);
            compra();
            break;
        case "esmaltes":
            precio = 3000;
            alert("Los esmaltes salen $" + precio);
            compra();
            break;
        case "carrito":
            alert("Total: $" + totalCarrito);
            producto = prompt("Consulta de precios:\nBases\nCorrectores\nPaletas\nEsmaltes\n\ncarrito\n\n(esc-para salir)");
            break;
        default:
            alert("Este producto no esta en stock");
            producto = prompt("Consulta de precios:\nBases\nCorrectores\nPaletas\nEsmaltes\n\ncarrito\n\n(esc-para salir)");
            break;
    }
}