// No user no party
const username = sessionStorage.getItem("username");
if (!username) window.location = "./player.html";

const usernameSpan = document.getElementById("username-span");
usernameSpan.textContent = username;

// Una lista con los botones de los niveles
const levelButtons = document.querySelectorAll(".idboton");

const difficultySpan = document.getElementById("difficulty-span");
// Recorre la lista.
// A cada botón le mete addEventListener con el evento click y una funcion anonima.
// Dentro de la función anónima, lee el id de cada boton;
// La última letra del id es el numero 4, 5, 6 y según esos número crea las bubbles y los pickers
// .split("-") nos devolveria => ["levelOne", "4"] Luego a ese ["levelOne", "4"][1] y te traes el número
levelButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const buttonId = button.id;
    const bubblesQuantity = buttonId.split("-")[1];
    createBubbles(bubblesQuantity);
    createPickers(bubblesQuantity);
    document.getElementById("mm-levels").style.display = "none";
    document.getElementById("mm-levelBubbles").style.display = "flex";
    if (bubblesQuantity === "4") difficultySpan.textContent = "easy";
    if (bubblesQuantity === "5") difficultySpan.textContent = "hard";
    if (bubblesQuantity === "6") difficultySpan.textContent = "tryhard";
  });
});

const bubblesContainer = document.getElementById("bubbles-container");

const createBubbles = (bubblesQuantity) => {
  for (let i = 1; i <= bubblesQuantity; i++) {
    const bubble = document.createElement("div");
    bubble.classList.add("circleColor1");
    bubble.classList.add("m-2");
    bubble.id = `bubble-${i}`;
    bubblesContainer.appendChild(bubble);
  }
};



const pickersContainer = document.getElementById("pickers-container");
const DEFAULT_COLORS = ["#65e66e","#ffe770","#85e0ff","#ff8af5","#ff9924","#67cccc"];
function createPickers(bubblesQuantity) {
  for (let i = 1; i <= bubblesQuantity; i++) {
    // <input type="color" id="picker02" name="pickerEasy" value="#65e66e" class="mx-3 my-2 p-0"></input>
    const picker = document.createElement("input");
    picker.type = "color";
    picker.id = `picker-${i}`;
    picker.name = "pickerEasy";
    picker.value = DEFAULT_COLORS[i - 1];
    picker.classList.add("mx-3");
    picker.classList.add("my-2");
    picker.classList.add("p-0");
    pickersContainer.appendChild(picker);
    picker.oninput = () => {
      const currentBubble = document.getElementById(`bubble-${i}`);
      currentBubble.style.backgroundColor = picker.value;
    };
  }
}

const playButton = document.getElementById("play-button");
playButton.addEventListener("click", () => {
  const bubbles = Array.from(document.querySelectorAll("#bubbles-container > div"));
  const someEmptyBubble = bubbles.find((bubble) => !bubble.style.backgroundColor);
  if (someEmptyBubble) return;
  const colors = bubbles.map((bubble) => bubble.style.backgroundColor);
  sessionStorage.setItem("colors", JSON.stringify(colors));
  const colores = JSON.parse(sessionStorage.getItem("colors"));
  console.log(colores);
  // TODO: Crear juego
  window.location = "./game.html";
});
