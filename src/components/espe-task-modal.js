import { LitElement, html, css } from 'lit-element';

export class EspeTaskModal extends LitElement {
  static styles = css`
    .modal {
      display: none;
      position: fixed;
      z-index: 1000;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(16, 35, 28, 0.95);
      animation: fadeIn 0.3s ease;
    }

    .modal.show {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 1rem;
    }

    .modal-content {
      background-color: rgb(23, 49, 39);
      border-radius: 0.5rem;
      width: 100%;
      max-width: 480px;
      max-height: 90vh;
      overflow-y: auto;
      animation: slideUp 0.4s ease;
    }

    .modal-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1rem 1rem 0.5rem;
      border-bottom: 1px solid #214a3c;
    }

    .modal-title {
      font-size: 1.75rem;
      font-weight: 700;
      color: white;
      letter-spacing: -0.025em;
    }

    .breadcrumb {
      display: flex;
      gap: 0.5rem;
      align-items: center;
      font-size: 1rem;
      font-weight: 500;
    }

    .breadcrumb a {
      color: #8ecdb7;
      text-decoration: none;
    }

    .breadcrumb span {
      color: #8ecdb7;
    }

    .breadcrumb .current {
      color: white;
    }

    .close {
      background: none;
      border: none;
      font-size: 1.5rem;
      cursor: pointer;
      color: #8ecdb7;
      padding: 0.25rem;
      transition: color 0.3s ease;
    }

    .close:hover {
      color: white;
    }

    .modal-body {
      padding: 1rem;
    }

    .form-group {
      margin-bottom: 1rem;
    }

    .form-label {
      display: block;
      color: white;
      font-weight: 500;
      margin-bottom: 0.5rem;
    }

    .form-input {
      width: 100%;
      padding: 1rem;
      border-radius: 0.5rem;
      border: 1px solid #2f6a55;
      background-color: rgb(23, 49, 39);
      color: white;
      font-family: inherit;
      font-size: 1rem;
      box-sizing: border-box;
      transition: all 0.3s ease;
    }

    .form-input:focus {
      outline: none;
      border-color: #019863;
      background-color: #17352b;
    }

    .form-input::placeholder {
      color: #8ecdb7;
    }

    .form-input[readonly] {
      background-color: #17352b;
      cursor: default;
    }

    .form-textarea {
      min-height: 120px;
      resize: vertical;
    }

    .details-section {
      margin-top: 1rem;
    }

    .details-title {
      font-size: 1.125rem;
      font-weight: 700;
      color: white;
      margin-bottom: 0.5rem;
      letter-spacing: -0.015em;
    }

    .detail-item {
      display: flex;
      align-items: center;
      gap: 1rem;
      padding: 1rem;
      background-color: #17352b;
      border-radius: 0.5rem;
      margin-bottom: 0.5rem;
    }

    .detail-icon {
      width: 48px;
      height: 48px;
      background-color: #214a3c;
      border-radius: 0.5rem;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      flex-shrink: 0;
    }

    .detail-content {
      flex: 1;
    }

    .detail-label {
      font-weight: 500;
      color: white;
      margin: 0 0 0.25rem 0;
    }

    .detail-value {
      color: #8ecdb7;
      font-size: 0.875rem;
      margin: 0;
    }

    .modal-actions {
      padding: 1rem;
      display: flex;
      justify-content: flex-end;
    }

    .btn-primary {
      background-color: #019863;
      color: white;
      border: none;
      padding: 0.75rem 1.5rem;
      border-radius: 0.5rem;
      font-weight: 700;
      font-size: 0.875rem;
      letter-spacing: 0.015em;
      cursor: pointer;
      transition: background-color 0.3s ease;
    }

    .btn-primary:hover {
      background-color: #017a54;
    }

    .btn-secondary {
      background: transparent;
      color: #8ecdb7;
      border: 1px solid #2f6a55;
      padding: 0.75rem 1.5rem;
      border-radius: 0.5rem;
      font-weight: 700;
      font-size: 0.875rem;
      cursor: pointer;
      transition: all 0.3s ease;
      margin-right: 0.5rem;
    }

    .btn-secondary:hover {
      background-color: rgba(142, 205, 183, 0.1);
    }

    .priority-alta {
      color: #f56342;
    }
    .priority-media {
      color: #ffa500;
    }
    .priority-baja {
      color: #8ecdb7;
    }

    @keyframes fadeIn {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }

    @keyframes slideUp {
      from {
        transform: translateY(30px);
        opacity: 0;
      }
      to {
        transform: translateY(0);
        opacity: 1;
      }
    }
  `;

  static get properties() {
    return {
      mode: { type: String }, // 'add', 'edit', 'detail'
      show: { type: Boolean },
      selectedTask: { type: Object },

      // Para agregar nueva tarea
      nombreNueva: { type: String },
      descripcionNueva: { type: String },
      horaNueva: { type: String },
      prioridadNueva: { type: String }
    };
  }

  constructor() {
    super();
    this.mode = 'add';
    this.show = false;
    this.selectedTask = null;

    this.nombreNueva = '';
    this.descripcionNueva = '';
    this.horaNueva = '10:00';
    this.prioridadNueva = 'media';
  }

  render() {
    return html`
      <div class="modal ${this.show ? 'show' : ''}">
        <div class="modal-content">
          ${this.mode === 'add' ? this.renderAddModal() : ''}
          ${this.mode === 'edit' ? this.renderEditModal() : ''}
          ${this.mode === 'detail' ? this.renderDetailModal() : ''}
        </div>
      </div>
    `;
  }

  renderAddModal() {
    return html`
      <div>
        <div class="modal-header">
          <h2 class="modal-title">Nueva tarea</h2>
          <button class="close" @click="${this._cerrar}">×</button>
        </div>
        <div class="modal-body">
          <div class="form-group">
            <input
              class="form-input"
              type="text"
              placeholder="Nombre de la tarea"
              .value="${this.nombreNueva}"
              @input="${e => this.nombreNueva = e.target.value}"
            />
          </div>
          <div class="form-group">
            <textarea
              class="form-input form-textarea"
              placeholder="Notas"
              .value="${this.descripcionNueva}"
              @input="${e => this.descripcionNueva = e.target.value}"
            ></textarea>
          </div>
          <div class="form-group">
            <input
              class="form-input"
              type="time"
              .value="${this.horaNueva}"
              @input="${e => this.horaNueva = e.target.value}"
            />
          </div>
          <div class="form-group">
            <select
              class="form-input"
              .value="${this.prioridadNueva}"
              @change="${e => this.prioridadNueva = e.target.value}"
            >
              <option value="alta">Alta</option>
              <option value="media">Media</option>
              <option value="baja">Baja</option>
            </select>
          </div>
        </div>
        <div class="modal-actions">
          <button class="btn-primary" @click="${this._agregarTarea}">Agregar</button>
        </div>
      </div>
    `;
  }

  renderEditModal() {
    if (!this.selectedTask) return html``;
    return html`
      <div>
        <div class="modal-header">
          <h2 class="modal-title">Editar tarea</h2>
          <button class="close" @click="${this._cerrar}">×</button>
        </div>
        <div class="modal-body">
          <div class="form-group">
            <input
              class="form-input"
              type="text"
              placeholder="Nombre de la tarea"
              .value="${this.selectedTask.nombre}"
              @input="${e => this._actualizarTask('nombre', e.target.value)}"
            />
          </div>
          <div class="form-group">
            <textarea
              class="form-input form-textarea"
              placeholder="Notas"
              .value="${this.selectedTask.descripcion || ''}"
              @input="${e => this._actualizarTask('descripcion', e.target.value)}"
            ></textarea>
          </div>
          <div class="form-group">
            <input
              class="form-input"
              type="time"
              .value="${this.selectedTask.hora || '10:00'}"
              @input="${e => this._actualizarTask('hora', e.target.value)}"
            />
          </div>
          <div class="form-group">
            <select
              class="form-input"
              .value="${this.selectedTask.prioridad || 'media'}"
              @change="${e => this._actualizarTask('prioridad', e.target.value)}"
            >
              <option value="alta">Alta</option>
              <option value="media">Media</option>
              <option value="baja">Baja</option>
            </select>
          </div>
        </div>
        <div class="modal-actions">
          <button class="btn-secondary" @click="${this._cerrar}">Cancelar</button>
          <button class="btn-primary" @click="${this._guardarEdicion}">Guardar</button>
        </div>
      </div>
    `;
  }

  renderDetailModal() {
    if (!this.selectedTask) return html``;
    return html`
      <div>
        <div class="modal-header">
          <div class="breadcrumb">
            <a href="#" @click="${this._cerrar}">Tareas</a>
            <span>/</span>
            <span class="current">Tarea</span>
          </div>
          <button class="close" @click="${this._cerrar}">×</button>
        </div>
        <div class="modal-body">
          <h2 class="modal-title">${this.selectedTask.nombre}</h2>
          <div class="form-group">
            <label class="form-label">Notas</label>
            <textarea
              class="form-input form-textarea"
              readonly
              .value="${this.selectedTask.descripcion || ''}"
            ></textarea>
          </div>
          <div class="details-section">
            <h3 class="details-title">Detalles</h3>
            <div class="detail-item">
              <div class="detail-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 256 256">
                  <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Z"></path>
                  <path d="M128,72a8,8,0,0,0-8,8v48a8,8,0,0,0,3.88,6.86l40,24a8,8,0,1,0,8.24-13.72L136,123.15V80A8,8,0,0,0,128,72Z"></path>
                </svg>
              </div>
              <div class="detail-content">
                <p class="detail-label">Hora</p>
                <p class="detail-value">${this.selectedTask.hora || '10:00'}</p>
              </div>
            </div>
            <div class="detail-item">
              <div class="detail-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 256 256">
                  <path d="M42.35,93.25a8,8,0,0,1,3.4-9.79C56.57,77.8,73.92,72,96,72a134.23,134.23,0,0,1,53.8,11.46A8,8,0,0,0,160,80V32a8,8,0,0,1,4.6-7.25,83.28,83.28,0,0,1,41,0A8,8,0,0,1,208,32v96a8,8,0,0,1-3.4,6.54C194.57,138.87,177.49,144,156,144a137.06,137.06,0,0,1-53.8-11.46A8,8,0,0,0,96,136v88a8,8,0,0,1-16,0V136C80,112.44,74.54,99.19,42.35,93.25ZM192,39.82a68.5,68.5,0,0,0-16,0V121.7c14.94-2.41,25.56-7.07,32-11.88ZM112,120.18a119,119,0,0,0,28,3.82,119,119,0,0,0,28-3.37V48.3c-7.75,1.52-16.71,2.71-28,2.71A119,119,0,0,0,112,47.64Z"></path>
                </svg>
              </div>
              <div class="detail-content">
                <p class="detail-label">Prioridad</p>
                <p class="detail-value priority-${this.selectedTask.prioridad}">
                  ${this._capitalizarPrioridad(this.selectedTask.prioridad)}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-actions">
          ${!this.selectedTask.completada ? html`
            <button class="btn-primary" @click="${this._completarTarea}">Completar tarea</button>
          ` : ''}
        </div>
      </div>
    `;
  }

  _capitalizarPrioridad(valor) {
    if (!valor) return '';
    return valor.charAt(0).toUpperCase() + valor.slice(1);
  }

  _cerrar() {
    this.dispatchEvent(new CustomEvent('close-modal', { bubbles: true, composed: true }));
  }

  _agregarTarea() {
    if (!this.nombreNueva.trim() || !this.horaNueva) return;
    this.dispatchEvent(new CustomEvent('add-task', {
      detail: {
        nombre: this.nombreNueva.trim(),
        descripcion: this.descripcionNueva,
        hora: this.horaNueva,
        prioridad: this.prioridadNueva,
      },
      bubbles: true,
      composed: true
    }));

    this.nombreNueva = '';
  this.descripcionNueva = '';
  this.horaNueva = '10:00';
  this.prioridadNueva = 'media';
  }

  _actualizarTask(campo, valor) {
    const updatedTask = { ...this.selectedTask, [campo]: valor };
    this.selectedTask = updatedTask;
    this.dispatchEvent(new CustomEvent('update-task', {
      detail: updatedTask,
      bubbles: true,
      composed: true
    }));
  }

  _guardarEdicion() {
    if (!this.selectedTask.nombre.trim() || !this.selectedTask.hora) return;
    this.dispatchEvent(new CustomEvent('save-edit', {
      detail: this.selectedTask,
      bubbles: true,
      composed: true
    }));
  }

  _completarTarea() {
    this.dispatchEvent(new CustomEvent('complete-task', {
      detail: this.selectedTask,
      bubbles: true,
      composed: true
    }));
  }
}

customElements.define('espe-task-modal', EspeTaskModal);
