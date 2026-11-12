let triangulo = "";
let circulo = "";
let cuadrado = "";
let listaMov = [];

function agregarMov(mov)
{
    listaMov.push(mov);
}

let movimientos = new Array();
function reiniciar()
{
    limpiar();
    let url;

    /*agregar el robot en la posicion 0,0 */
    document.getElementById("00").innerHTML = '<img src = "figuras/robotDerecha.png" height = "100" width = "100">';
    let figuras = aleatorio();

    url = "figuras/circulo/ci" + figuras[0]+".png"
    document.getElementById(circulo).innerHTML = '<img src="' + url + '" height="95" width="95">';
    
    url = "figuras/cuadrado/c"+ figuras[1]+".png";
    document.getElementById(cuadrado).innerHTML = '<img src="'+ url+'" height="95" width="95">';
    
    url =  "figuras/triangulo/t"+ figuras[2]+".png"
    document.getElementById(triangulo).innerHTML = '<img src="' + url + '" height="95" width="95">';
    document.getElementById("historial").innerHTML = "";

    //se crea la tabla con 1 fila y 5 columnas
    tabla(1, 5,"No se han ingresado movimientos");
}
function aleatorio()
{
    let vector= ["Amarillo" , "Azul" , "Rojo"];
    for(let i = (vector.length - 1); i > 0;i--)
    {
         let j = Math.floor(Math.random()* (i + 1));
        [vector[i],vector[j]] = [vector[j] , vector[i]];
    }

    do
    {
        triangulo = (Math.floor(Math.random() * 5) ).toString();
        triangulo += (Math.floor(Math.random() * 5)).toString();
    }while (triangulo == "00")
    do 
    {
        circulo = (Math.floor(Math.random() * 5)).toString();
        circulo += (Math.floor(Math.random() * 5)).toString();
    }while (triangulo == circulo || circulo == "00" );
    do 
    {
        cuadrado = (Math.floor(Math.random() * 5)).toString();
        cuadrado += (Math.floor(Math.random() * 5)).toString();
    }while (triangulo == cuadrado || circulo  == cuadrado || cuadrado == "00");

    return vector;
}

function limpiar()
{
    for(let i = 0; i < 5; i++)
    {
        for(let j = 0; j < 5; j++)
        {
            let posicion = i.toString() + j.toString();
            document.getElementById(posicion).innerHTML = "";
        }
    }
}


/*crear una tabla desde javaScript*/
function tabla(filas,columnas, text)
{
    //crear el elemento table 
    let tbl = document.createElement("table");
    tbl.border = "1"; //bordes visibles
    tbl.id = "movimientos"

    // generar filas y columnas
    for (let i = 0; i < filas; i++)
    {
        let fila = document.createElement("tr");
        for(let j = 0; j < columnas; j++)
        {
            let celda = document.createElement("td");

            celda.id = "h" + i.toString() + j.toString(); // asignacion de id unico
            
               // celda.innerHTML= text;
            

            fila.appendChild(celda);
        } 
        tbl.appendChild(fila);
    }
    document.getElementById("historial").appendChild(tbl);
    let primera = document.getElementById("h00");
    primera.innerHTML = text;
    
}

function agregarFila() {
    let tabla = document.getElementById("movimientos");
    let noFila = tabla.rows.length; // índice de la fila actual

    // Crear nueva fila
    let fila = document.createElement("tr");
    fila.id = "h" + noFila; // id de la fila
    tabla.appendChild(fila);

    // Crear 5 celdas en esa fila
    for (let colIndex = 0; colIndex < 5; colIndex++) {
        let celda = document.createElement("td");
        celda.id = "h" + noFila + colIndex; // coordenada fila-columna
        fila.appendChild(celda);
    }
}

function agregar(direccion) {
    let tabla = document.getElementById("movimientos");
    let numFilas = tabla.rows.length;

    // Buscar una celda vacía
    for (let i = 0; i < numFilas; i++) {
        let fila = tabla.rows[i];
        for (let j = 0; j < fila.cells.length; j++) {
            let celda = fila.cells[j];
            if (celda.innerHTML === "" || celda.innerHTML === "No se han ingresado movimientos") {
                celda.innerHTML = '<img src="' + direccion + '" height="50" width="50">';
                return; // salir después de insertar
            }
        }
    }

    // Si no hay celda vacía, crear nueva fila y volver a intentar
    agregarFila();
    agregar(direccion);
}
