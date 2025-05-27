export const footerHtml = `
<section class="p-4 border-top d-flex">

    <div class="col mb-3 text-center">
      <h5 class="pt-2">A</h5>
      <ul class="nav flex-column">
      </ul>
    </div>

    <div class="col mb-3 text-center">
      <h5 class="pt-2">B</h5>
      <ul class="nav flex-column">
      </ul>
    </div>

    <div class="col mb-3 text-center">
      <h5 class="pt-2">C</h5>
      <ul class="nav flex-column">
      </ul>
    </div>

    <div class="col mb-3 text-center">
      <h5 class="pt-2">D</h5>
      <ul class="nav flex-column">
      </ul>
    </div>

  </section>
`;

export const createFooterElement = () => {
  let footerElement = document.getElementById("footer");
  if (!footerElement) {
    footerElement = document.createElement("footer");
    footerElement.id = "footer";
    footerElement.innerHTML = footerHtml;
    document.body.insertAdjacentElement("beforeend", footerElement);
  }
};
createFooterElement();