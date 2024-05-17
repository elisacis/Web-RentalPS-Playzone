function loadComponent(elementId, filePath) {
  fetch(filePath)
    .then((response) => response.text())
    .then((data) => {
      document.getElementById(elementId).innerHTML = data;
    })
    .catch((error) => console.error("Error loading component:", error));
}

document.addEventListener("DOMContentLoaded", function () {
  loadComponent("navbar", "src/components/navbar/navbar.html");
});
