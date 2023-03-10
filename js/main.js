function Zapatilla(marca,modelo,precio,stock){
    this.marca=marca;
    this.modelo=modelo;
    this.precio=precio;
    this.stock=stock;
}

const zapatillas = [
    new Zapatilla("nike","airforce",50000,30),
    new Zapatilla("nike","jordan",60000,30),
    new Zapatilla("nike","airmax",38000,30),
    new Zapatilla("nike","vapormax",40000,30),
    new Zapatilla("nike","uptempo",45000,30),

    new Zapatilla("adidas","galaxy6",35000,25),
    new Zapatilla("adidas","superstar",25000,25),
    new Zapatilla("adidas","forum",30000,25),
    new Zapatilla("adidas","stansmith",40000,25),
    
    new Zapatilla("vans","oldskool",35000,40),
    new Zapatilla("vans","era",30000,40),
    new Zapatilla("vans","sk8high",38000,40),

    new Zapatilla("converse","allstar",35000,50),
    new Zapatilla("converse","courtlandt",30000,50),
    new Zapatilla("converse","chuck taylor all star",38000,50),

    new Zapatilla("dc","midway",40000,20),
    new Zapatilla("dc","manual sd",38000,20),
    new Zapatilla("dc","kalisvulc",35000,20),
  ];

let carrito=[];

//Se muestra el catalogo
const catalogue=(marca)=>{
    let encontre=zapatillas.filter(product => product.marca===marca.toLowerCase());
    while(encontre.length === 0){
        alert("La marca no existe por favor ingrese una marca valida");
        marca=prompt("Ingrese marca:");
        encontre=zapatillas.filter(product => product.marca===marca.toLowerCase());
    }
    let message = 'Catálogo:\n';
    
    encontre.forEach(product => {
        message+=`
            marca: ${product.marca}
            modelo: ${product.modelo}
            precio: $${product.precio}
            stock: ${product.stock}
        `
        alert(message);
     });
}

//Vuelve a poner los productos del carrito al catalogo.
const devolver_productos=()=>{
    carrito.forEach(prodCarrito=>{
        encontre=zapatillas.find(prodCatalogo=>prodCarrito.marca===prodCatalogo.marca && prodCarrito.modelo===prodCatalogo.modelo);
        encontre.stock+=prodCarrito.cantidad; //Actualiza el stock del catalogo 
    });
}

//carrito
const see_cart=()=>{
    //Muestra el carrito de compras
    let message="Carrito:\n";
    let carrito = JSON.parse(localStorage.getItem("carrito"));
    carrito.forEach(products => {
        message+=`
            marca: ${products.marca}
            modelo: ${products.modelo}
            pares: ${products.cantidad}
            precio: $${products.precio*products.cantidad}
        `
        alert(message);
    });
    
    let finish=parseInt(prompt("1--> Comprar todo\n2--> Seguir comprando\n3--> Vaciar Carrito"));
    terminar_compra(finish);
}

const terminar_compra=(finish)=>{
    if(finish===1){
        let montoTotal=0;
        carrito.forEach(prodCarrito=>{
            montoTotal+=prodCarrito.precio*prodCarrito.cantidad;//Monto total de todos los productos
        })
        let confirmarCompra=parseInt(prompt(`Su monto total a pagar es de $${montoTotal}\n1-->Pagar\n0-->Cancelar`));
        if(confirmarCompra===1){
            alert("Gracias por su compra!")
            localStorage.clear("carrito"); //Se reinicia el carrito
        }else{
            devolver_productos();
            alert("Compra cancelada");
            localStorage.clear("carrito"); //Se reinicia el carrito
        }
    }else if(finish===3){
        alert("Sus productos elejidos han sido removidos");
        devolver_productos();
        localStorage.clear("carrito");
    }
}

//Programa principal

let option;

//menu
while (option !== '4') { // Ejecutar el bucle hasta que el usuario seleccione la opción de salir (4)

    option = prompt("Ingrese una opcion:\n1--> Ver catalogo\n2-->Comprar producto\n3-->Ver carrito\n4-->Salir");

    switch (option) {
        case '1':
            let marca=prompt("Ingrese marca:");
            //Verificacion
            if(zapatillas.some(elemento => marca)){
                catalogue(marca);
            }else{
                while(zapatillas.some(elemento => marca)){

                }
                alert("La marca no existe! Intente de nuevo");
                marca=prompt("Ingrese marca:");
            }
            
            break;
        case '2':
            //ventas
            let otroProd;
            while(otroProd!==0){
                let marca=prompt("Ingrese marca que desea comprar:");
                let modelo=prompt("Elija algun modelo modelo que desea comprar:");
                let encontre=zapatillas.find(product=> marca.toLowerCase()===product.marca && modelo.toLowerCase()===product.modelo);
                while(encontre===undefined){
                    alert("La marca o modelo no existe por favor ingrese de nuevo los datos");
                    marca=prompt("Ingrese marca que desea comprar:");
                    modelo=prompt("Elija algun modelo modelo que desea comprar:");
                    encontre=zapatillas.find(product=> marca.toLowerCase()===product.marca && modelo.toLowerCase()===product.modelo);
                }
                let message=`
                Producto:\n
                marca: ${encontre.marca}
                modelo: ${encontre.modelo}
                precio: $${encontre.precio}
                `
                let cantidad=parseInt(prompt(`${message}\nCuantos pares va a llevar?`))
                if(encontre.stock >= cantidad){
                    encontre.stock-=cantidad; //Actualiza el stock del catalogo
                    let message2=`Producto:\n
                    marca: ${encontre.marca}
                    modelo: ${encontre.modelo}
                    pares: ${cantidad}
                    precio: $${encontre.precio*cantidad}
                    `
                    let agregarCarrito=parseInt(prompt(`${message2}\nQuiere agregarlo al carrito Si=1 No=0`));
                    if(agregarCarrito===1){
                    carrito.push({
                        marca:encontre.marca,
                        modelo:encontre.modelo,
                        precio:encontre.precio,
                        cantidad:cantidad
                    });
                    otroProd=parseInt(prompt("Quiere agregar otro producto? Si=1 No=0"));
                    }
                }else{
                    alert(`No hay stock disponible para esa cantidad\nQuedan: ${encontre.stock} pares`);
                }
                localStorage.setItem("carrito",JSON.stringify(carrito));
            }
            break;
        case '3':
            if(localStorage.key("carrito")!=null){
                see_cart();
            }else{
                alert("El carrito esta vacio!");
            }

            break;
        case '4':
            break;
        default:
            alert("Opcion invalida");
            break;
    }
}
