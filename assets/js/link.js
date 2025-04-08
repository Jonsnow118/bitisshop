function includeHTML(id, file) {
  fetch(file)
    .then((response) => response.text())
    .then((data) => {
      document.getElementById(id).innerHTML = data;
    })
    .catch((error) => console.error("Lỗi load file: ", error));
}

// Gọi header và footer
includeHTML("header-container", "header.html");
includeHTML("footer-container", "footer.html");
