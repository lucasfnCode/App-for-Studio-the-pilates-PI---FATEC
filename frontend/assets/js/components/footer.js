export const footerHtml = `
<section class="d-flex justify-content-center p-4" id="footer-content">
  <p>&copy; 2025 Estudio de Pilates. Todos os direitos reservados.</p>
</section>
`;

export const createFooterElement = () => {
  let footerElement = document.getElementById("footer");
  if (!footerElement) {
    footerElement = document.createElement("footer");
    footerElement.id = "footer";
    footerElement.innerHTML = footerHtml;
    document.body.appendChild(footerElement);
  }
};
createFooterElement();