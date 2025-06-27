export class modalSchedulling {
  constructor({ id, title = "", body = "", footer = "" }) {
    this.id = id;
    this.title = title;
    this.body = body;
    this.footer = footer;
    this.render();
  }

  render() {
    const old = document.getElementById(this.id);
    if (old) old.remove();

    const modalHtml = `
      <div class="modal fade" id="${this.id}" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-lg">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">${this.title}</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Fechar"></button>
            </div>
            <div class="modal-body">${this.body}</div>
            <div class="modal-footer">${this.footer}</div>
          </div>
        </div>
      </div>
    `;
    document.body.insertAdjacentHTML("beforeend", modalHtml);
  }

  setBody(html) {
    document.querySelector(`#${this.id} .modal-body`).innerHTML = html;
  }

  setTitle(title) {
    document.querySelector(`#${this.id} .modal-title`).textContent = title;
  }

  setFooter(html) {
    document.querySelector(`#${this.id} .modal-footer`).innerHTML = html;
  }

  show() {
    const modal = new bootstrap.Modal(document.getElementById(this.id));
    modal.show();
  }

  hide() {
    const modal = bootstrap.Modal.getInstance(document.getElementById(this.id));
    if (modal) modal.hide();
  }
}