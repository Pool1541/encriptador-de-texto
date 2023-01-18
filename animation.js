//Configura el canvas para que ocupe la pantalla entera
const canvas = document.querySelector("canvas");

document.querySelector("body").style.overflow = "hidden";
canvas.height = window.screen.height;
canvas.width = window.screen.width;

// una entrada en el array por columna de texto
//cada valor represnta la posición y actual de la columna.  (en canvas 0 es en la parte superior y los valores positivos de y van disminuyendo)
var columns = [];
for (i = 0; i < 256; i++) {
  columns[i] = 1;
}

//ejecutado una vez por fotograma
function step() {
  //Ligeramente oscurece todo el canvas dibujando un rectángulo negro casi trasnsparente sobre todo el canvas
  /*esto explica tanto el flash inicial de blanco a negro (por defecto el canvas es blanco y progresivamente se convierte en negro) como el fading de los caracteres.*/
  canvas.getContext("2d").fillStyle = "rgba(0,0,0,0.05)";
  canvas.getContext("2d").fillRect(0, 0, canvas.width, canvas.height);

  //verde
  canvas.getContext("2d").fillStyle = "#0F0";
  //para cada columna
  columns.map(function (value, index) {
    //fromCharCode convierte puntos de código unicode ( http://en.wikipedia.org/wiki/Code_point ) a un string
    //Los code points están en el rango 65 - 90;
    var character = String.fromCharCode(65 + Math.random() * 26);
    //dibujar el carácter
    canvas.getContext("2d").fillText(
      character, //texto
      index * 10, //x
      value //y
    );

    //desplaza hacia abajo el carácter
    //si el carácter es menor de 758 entonces hay una posibilidad aleatoria de que sea reseteado
    columns[index] = value > 758 + Math.random() * 1e4 ? 0 : value + 10;
  });
}

//1000/33 = ~30 veces por segundo
setInterval(step, 20);

canvas.addEventListener("animationend", () => {
  canvas.remove();
});

setTimeout(() => {
  document.querySelector("main").classList.remove("hidden");
  document.querySelector("footer").classList.remove("hidden");
}, 4000);

setTimeout(() => {
  document.querySelector("body").style.overflow = "auto";
  document.querySelector(".center img").style.animation = "0";
  document.querySelector(".center p").style.animation = "0";
  document.querySelector(".center h3").style.animation = "0";
  document.querySelector(".center img").style.animation = "0";
  document.querySelector(".copy").style.animation = "0";
}, 7000);

// Toggle button
const toggleBtn = document.querySelector(".toggle-state");

toggleBtn.addEventListener("input", () => {
  document.querySelector("body").classList.toggle("dark");
});
