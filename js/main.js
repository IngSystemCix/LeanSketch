const buttonTheme = document.querySelector("#button-theme");
let checkTheme = localStorage.getItem("theme") === "dark";

// Establecer el tema inicial
if (checkTheme) {
  document.querySelector("html").classList.add("dark");
  buttonTheme.classList.remove("bi-brightness-low-fill");
  buttonTheme.classList.add("bi-moon-stars-fill");
}

buttonTheme.addEventListener("click", () => {
  const html = document.querySelector("html");
  html.classList.toggle("dark");
  if (checkTheme) {
    buttonTheme.classList.remove("bi-brightness-low-fill");
    buttonTheme.classList.add("bi-moon-stars-fill");
  } else {
    buttonTheme.classList.remove("bi-moon-stars-fill");
    buttonTheme.classList.add("bi-brightness-low-fill");
  }
  checkTheme = !checkTheme;

  // Guardar el estado del tema en localStorage
  localStorage.setItem("theme", checkTheme ? "dark" : "light");
});

const textareas = document.querySelectorAll(".listTextarea");

textareas.forEach((textarea) => {
  textarea.addEventListener("input", function () {
    // Si es la primera vez que se escribe, agregar un puntito inicial
    if (textarea.value.length === 1 && textarea.value !== "•") {
      textarea.value = "• " + textarea.value;
    }
  });

  textarea.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
      e.preventDefault(); // Evita el salto de línea automático
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const value = textarea.value;

      // Insertar el puntito y el salto de línea manualmente
      textarea.value =
        value.substring(0, start) + "\n• " + value.substring(end);

      // Colocar el cursor al final de la nueva línea
      textarea.selectionStart = textarea.selectionEnd = start + 3;
    }
  });
});

const buttonClear = document.querySelector("#button-clear");

buttonClear.addEventListener("click", () => {
  textareas.forEach((textarea) => {
    textarea.value = ""; // Limpiar el contenido del textarea
  });
});

function captureDiv() {
  html2canvas(document.querySelector(".auto-captura")).then((canvas) => {
    let img = canvas.toDataURL("image/png");
    let link = document.createElement("a");
    link.href = img;
    link.download = "screenshot.png";
    link.click();
  });
}

textareas.forEach(textarea => {
  // Ajusta la altura al cargar la página
  textarea.style.height = 'auto';
  textarea.style.height = `${textarea.scrollHeight}px`;

  // Ajusta la altura a medida que se escribe
  textarea.addEventListener('input', () => {
    textarea.style.height = 'auto';
    textarea.style.height = `${textarea.scrollHeight}px`;
  });
});