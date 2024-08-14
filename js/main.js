const buttonTheme = document.querySelector("#button-theme");
let checkTheme = localStorage.getItem("theme") === "dark";

// Establecer el tema inicial y el ícono correspondiente
if (checkTheme) {
  document.querySelector("html").classList.add("dark");
  buttonTheme.classList.remove("bi-brightness-low-fill");
  buttonTheme.classList.add("bi-moon-stars-fill");
} else {
  document.querySelector("html").classList.remove("dark");
  buttonTheme.classList.remove("bi-moon-stars-fill");
  buttonTheme.classList.add("bi-brightness-low-fill");
}

buttonTheme.addEventListener("click", () => {
  const html = document.querySelector("html");
  html.classList.toggle("dark");
  checkTheme = !checkTheme;

  if (checkTheme) {
    buttonTheme.classList.remove("bi-brightness-low-fill");
    buttonTheme.classList.add("bi-moon-stars-fill");
  } else {
    buttonTheme.classList.remove("bi-moon-stars-fill");
    buttonTheme.classList.add("bi-brightness-low-fill");
  }

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

// Función para ajustar la altura del textarea
function adjustTextareaHeight(textarea) {
  textarea.style.height = 'auto';
  textarea.style.height = `${textarea.scrollHeight}px`;
}

buttonClear.addEventListener("click", () => {
  let isAnyTextareaFilled = false;

  textareas.forEach((textarea) => {
    if (textarea.value) {
      isAnyTextareaFilled = true;
      Swal.fire({
        text: "Todos los campos han sido borrados.",
        icon: 'success',
        confirmButtonText: 'Aceptar',
        confirmButtonColor: '#4caf50'
      });
      textarea.value = ""; // Limpiar el contenido del textarea
      adjustTextareaHeight(textarea); // Ajustar la altura después de limpiar
    }
  });

  if (!isAnyTextareaFilled) {
    Swal.fire({
      text: "No hay campos para borrar.",
      icon: 'info',
      confirmButtonText: 'Aceptar',
      confirmButtonColor: '#4caf50'
    });
  }
});

textareas.forEach(textarea => {
  // Ajusta la altura al cargar la página
  adjustTextareaHeight(textarea);

  // Ajusta la altura a medida que se escribe
  textarea.addEventListener('input', () => {
    adjustTextareaHeight(textarea);
  });
});

function captureDiv() {
  let isAnyTextareaFilled = false;
  
  for (let i = 0; i < textareas.length; i++) {
    const textarea = textareas[i];
    if (textarea.value) {
      isAnyTextareaFilled = true;
      break;
    }
  }

  if (isAnyTextareaFilled) {
    html2canvas(document.querySelector(".auto-captura")).then((canvas) => {
      let img = canvas.toDataURL("image/png");
      let link = document.createElement("a");
      link.href = img;
      link.download = "screenshot.png";
      link.click();
      Swal.fire({
        text: "Captura realizada con éxito.",
        icon: 'success',
        confirmButtonText: 'Aceptar',
        confirmButtonColor: '#4caf50',
        timer: 3000, // 3 seconds
        timerProgressBar: true,
      });
    });
  } else {
    Swal.fire({
      text: "No hay campos llenos para capturar.",
      icon: 'info',
      confirmButtonText: 'Aceptar',
      confirmButtonColor: '#4caf50'
    });
  }
}

textareas.forEach(textarea => {
  // Ajusta la altura al cargar la página
  adjustTextareaHeight(textarea);

  // Ajusta la altura a medida que se escribe
  textarea.addEventListener('input', () => {
    adjustTextareaHeight(textarea);
  });
});