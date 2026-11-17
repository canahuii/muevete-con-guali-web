// almacena las cordenadas de las figuras
let triangulo = "";
let circulo = "";
let cuadrado = "";
let robot = "00";

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

    // desordenar la matriz de colores de manera aleatoria
    for(let i = (vector.length - 1); i > 0;i--)
    {
         let j = Math.floor(Math.random()* (i + 1));
        [vector[i],vector[j]] = [vector[j] , vector[i]];
    }

    //genera las posiciones de la figuras de manera aleatoria
    do
    {
        triangulo = (Math.floor(Math.random() * 5) ).toString();
        triangulo += (Math.floor(Math.random() * 5)).toString();
    }while (triangulo == "00")

    do 
    {
        circulo = (Math.floor(Math.random() * 5)).toString();
        circulo += (Math.floor(Math.random() * 5)).toString();
    }while (triangulo == circulo || circulo == "00" ); // se asegura que dos figuras no tengan la misma posicion
    do 
    {
        cuadrado = (Math.floor(Math.random() * 5)).toString();
        cuadrado += (Math.floor(Math.random() * 5)).toString();
    }while (triangulo == cuadrado || circulo  == cuadrado || cuadrado == "00"); // para evitar colicion entre objetos

    return vector;
}

// limpiar toda la tabla 
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
    listaMov = []
    robot = "00";
    direccionRob = 1;
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
//__________________________________________________________________________
//ejecutar recorrido
//-------------------------------------------------------------------------------

// se guarda la lista de movimientos 
let listaMov = [];
function agregarMov(mov)
{
    listaMov.push(mov);
}

let direccionRob = 1; // la direccion a la que ve el robot (hacia la derecha)

function nuevaPosicion()
{
    //posicion x,y 
    let fila = parseInt(robot[0]);
    let columna = parseInt(robot[1]);

    switch (direccionRob)
    {
        case 0:
            fila -= 1;
            break;
        case 1:
            columna += 1;
            break;
        case 2: 
            fila += 1;
            break;
        case 3:
            columna -= 1;
    }
    if (fila < 0 || columna < 0 || columna > 4 || fila > 4)
    {
        alert("Te has salido de la cuadricula. PERDISTE :'( ")
        return;
    }

    robot =  fila.toString() + columna.toString();
}
async function dibujarRobot()
{
    for(let mov of listaMov)
    {
        await pausar(500);
        switch (mov)
        {
            case 1:
                document.getElementById(robot).innerHTML = "";
                nuevaPosicion();
                nuevaDireccion(0);
                break;
            case 2:
                nuevaDireccion(1);
                break;
            case 3:
                nuevaDireccion(-1);
                break;
        }
    }
 
}
function nuevaDireccion(giro)
{
    let orientacion = parseInt(direccionRob) + parseInt(giro);
    if (orientacion < 0)      orientacion = 3; direccionRob= orientacion;
    if (orientacion > 3 )   orientacion = 0; direccionRob = orientacion;

    switch (orientacion)
    {
        case 0:
            document.getElementById(robot).innerHTML = "";
            document.getElementById(robot).innerHTML = '<img src="figuras/robotArriba.png" height="100" width="100">';
            break
        case 1:
            document.getElementById(robot).innerHTML = "";
            document.getElementById(robot).innerHTML =  '<img src="figuras/robotDerecha.png" height="100" width="100">';
            break
        case 2:
            document.getElementById(robot).innerHTML = "";
            document.getElementById(robot).innerHTML = '<img src="figuras/robotAbajo.png" height="100" width="100">';
            break
        case 3:
            document.getElementById(robot).innerHTML = "";
            document.getElementById(robot).innerHTML = '<img src="figuras/robotIzquierda.png" height="100" width="100">';
            break
    }
}
function pausar(ms)
{
    return new Promise(resolve => setTimeout(resolve, ms));
}