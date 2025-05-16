// Terminal typing
const terminal = document.getElementById("terminalOutput");
const lines = [
  "> Initialisation du noyau...",
  "> Chargement des composants...",
  "> Démarrage du système sécurisé...",
  "> Lancement des processus...",
  "> Terminal prêt.",
];
let lineIndex = 0;

setInterval(() => {
  if (lineIndex >= lines.length) {
    terminal.innerHTML = "";
    lineIndex = 0;
  }
  terminal.innerHTML += (terminal.innerHTML ? "<br>" : "") + lines[lineIndex];
  terminal.scrollTop = terminal.scrollHeight;
  lineIndex++;
}, 4000);

// Notepad Typing
const notepad = document.getElementById("notepadOutput");
const commands = [
  "Hello !",
  "Bienvenue chez Extia !",
  "On vous a réservé un petit jeu...",
  "Chaque énigme vous donnera une lettre...",
  "Vous devrez les assembler pour trouver le mot secret.",
  "Êtes-vous prêts à relever le challenge ?",
];

let notepadLineIndex = 0;
let charIndex = 0;

function typeCommand() {
  if (notepadLineIndex >= commands.length) {
    notepadLineIndex = 0;
    notepad.innerHTML = "";
  }

  const currentLine = commands[notepadLineIndex];

  if (charIndex < currentLine.length) {
    notepad.innerHTML += currentLine.charAt(charIndex);
    charIndex++;
    notepad.scrollTop = notepad.scrollHeight;
    setTimeout(typeCommand, 100);
  } else {
    notepad.innerHTML += "<br/>";
    notepadLineIndex++;
    charIndex = 0;
    setTimeout(typeCommand, 1500);
  }
}
typeCommand();

// Drag & drop .window .title-bar
document.querySelectorAll(".title-bar").forEach((titleBar) => {
  const container = titleBar.closest(".window");
  if (!container) return;

  titleBar.addEventListener("mousedown", function (e) {
    e.preventDefault();

    const shiftX = e.clientX - container.getBoundingClientRect().left;
    const shiftY = e.clientY - container.getBoundingClientRect().top;

    container.style.zIndex = 1000;

    function moveAt(pageX, pageY) {
      container.style.left = pageX - shiftX + "px";
      container.style.top = pageY - shiftY + "px";
    }

    function onMouseMove(e) {
      moveAt(e.pageX, e.pageY);
    }

    function onMouseUp() {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    }

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
  });

  titleBar.ondragstart = () => false;
});

// Drag & drop .fake-app
document.querySelectorAll(".fake-app").forEach((app) => {
  app.addEventListener("mousedown", function (e) {
    e.preventDefault();

    const shiftX = e.clientX - app.getBoundingClientRect().left;
    const shiftY = e.clientY - app.getBoundingClientRect().top;

    app.style.zIndex = 1000;

    function moveAt(pageX, pageY) {
      app.style.left = pageX - shiftX + "px";
      app.style.top = pageY - shiftY + "px";
    }

    function onMouseMove(e) {
      moveAt(e.pageX, e.pageY);
    }

    function onMouseUp() {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    }

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
  });

  app.ondragstart = () => false;
});

// Form validation
document.getElementById("escapeForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const letters = Array.from(this.querySelectorAll("input")).map((input) =>
    input.value.toUpperCase()
  );
  const word = letters.join("");
  const popup = document.getElementById("popup");
  const message = document.getElementById("popupMessage");
  const gif = document.getElementById("popupGif");

  if (word === "BIENVENUE") {
    message.textContent = "Bravo ! Vous avez réussi ! 🎉";
    gif.src = "https://media.giphy.com/media/111ebonMs90YLu/giphy.gif";
  } else {
    message.textContent = "Oups ! Mauvais mot... Essayez encore.";
    gif.src = "https://media.giphy.com/media/3o6ZtaO9BZHcOjmErm/giphy.gif";
  }

  popup.classList.remove("hidden");
  popup.addEventListener("click", () => popup.classList.add("hidden"));
  setTimeout(() => popup.classList.add("hidden"), 4000);
});

const inputs = document.querySelectorAll("#escapeForm input[type='text']");

inputs.forEach((input, index) => {
  input.addEventListener("input", (e) => {
    const value = e.target.value.toUpperCase().replace(/[^A-Z]/g, "");
    e.target.value = value.charAt(0);

    if (value.length > 1) {
      for (let i = 0; i < value.length && index + i < inputs.length; i++) {
        inputs[index + i].value = value[i];
      }
      const next = inputs[Math.min(index + value.length, inputs.length - 1)];
      next.focus();
    } else if (value && inputs[index + 1]) {
      inputs[index + 1].focus();
    }
  });

  input.addEventListener("keydown", (e) => {
    if (e.key === "Backspace" && input.value === "" && index > 0) {
      inputs[index - 1].focus();
    }
  });
});

function startMatrixEffect() {
  const canvas = document.getElementById("matrixBackground");
  const ctx = canvas.getContext("2d");

  canvas.width = window.innerWidth;
  canvas.height = (window.innerHeight * 2) / 3;

  const letters = "01".split("");
  const fontSize = 16;
  const columns = canvas.width / fontSize;

  const drops = Array(Math.floor(columns)).fill(1);

  function draw() {
    ctx.fillStyle = "rgba(255, 255, 255, 0.1)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#C0C0C0";
    ctx.font = fontSize + "px monospace";

    for (let i = 0; i < drops.length; i++) {
      const text = letters[Math.floor(Math.random() * letters.length)];
      ctx.fillText(text, i * fontSize, drops[i] * fontSize);

      if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
        drops[i] = 0;
      }

      drops[i]++;
    }
  }

  setInterval(draw, 50);
}

window.addEventListener("load", startMatrixEffect);
