import { LitElement, html, css } from 'lit-element';
import './espe-task-modal.js';

export class EspeTaskList extends LitElement {
  static styles = css`
    :host {
      display: flex;
      justify-content: center;
      padding: 0;
      background-color: #10231c;
      font-family: Manrope, 'Noto Sans', sans-serif;
      color: white;
      min-height: 100vh;
      box-sizing: border-box;
    }

    .layout-container {
      display: flex;
      flex-direction: column;
      width: 100%;
      max-width: 960px;
      margin: 0 auto;
      padding: 1rem 1rem;
    }

    .header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1px solid #214a3c;
      padding: 0.75rem 1rem;
      margin-bottom: 1rem;
    }

    .header-left {
      display: flex;
      align-items: center;
      gap: 1rem;
    }

    .logo {
      width: 16px;
      height: 16px;
      color: white;
    }

    .header-title {
      font-size: 1.125rem;
      font-weight: 700;
      color: white;
      letter-spacing: -0.015em;
    }

    .main-title {
      font-size: 2rem;
      font-weight: 700;
      color: white;
      letter-spacing: -0.025em;
      margin: 1rem 0;
    }

    .tabs {
      display: flex;
      border-bottom: 1px solid #2f6a55;
      margin-bottom: 1rem;
    }

    .tab {
      padding: 1rem 0;
      margin-right: 2rem;
      border-bottom: 3px solid transparent;
      color: #8ecdb7;
      font-weight: 600;
      font-size: 0.875rem;
      cursor: pointer;
      transition: all 0.3s ease;
    }

    .tab.active {
      border-bottom-color: #019863;
      color: white;
    }

    .section-title {
      font-size: 1.125rem;
      font-weight: 700;
      color: white;
      margin: 1rem 0 0.5rem 0;
      letter-spacing: -0.015em;
    }

    .add-task-btn {
      background-color: #019863;
      color: white;
      border: none;
      padding: 1rem 1.5rem;
      border-radius: 0.5rem;
      cursor: pointer;
      font-weight: 700;
      font-size: 1rem;
      letter-spacing: 0.015em;
      display: flex;
      align-items: center;
      gap: 1rem;
      margin: 1rem 0;
      align-self: flex-end;
      transition: background-color 0.3s ease;
    }

    .add-task-btn:hover {
      background-color: #017a54;
    }

    .task-item {
      background-color: #17352b;
      border-radius: 0.5rem;
      padding: 1rem;
      margin-bottom: 0.75rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      cursor: pointer;
      transition: background-color 0.3s ease;
      border: 1px solid transparent;
    }

    .task-item:hover {
      background-color: #1a3b2f;
      border-color: #2f6a55;
    }

    .task-item.completed {
      background-color: #214a3c;
      opacity: 0.7;
    }

    .task-item.completed .task-content {
      text-decoration: line-through;
    }

    .task-left {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      flex: 1;
    }

    .task-icon {
      width: 24px;
      height: 24px;
      color: #8ecdb7;
      flex-shrink: 0;
    }

    .task-content {
      flex: 1;
    }

    .task-name {
      font-weight: 600;
      font-size: 1rem;
      margin: 0 0 0.25rem 0;
      color: white;
    }

    .task-time {
      font-size: 0.875rem;
      color: #8ecdb7;
      margin: 0;
    }

    .task-actions {
      display: flex;
      gap: 0.5rem;
    }

    .action-btn {
      background: none;
      border: none;
      padding: 0.5rem;
      cursor: pointer;
      color: #8ecdb7;
      transition: color 0.3s ease;
    }

    .action-btn:hover {
      color: white;
    }

    /* Responsive omitted for brevity... */
  `;

  static get properties() {
    return {
      tasks: { type: Array },
      showAddModal: { type: Boolean },
      showEditModal: { type: Boolean },
      showDetailModal: { type: Boolean },
      selectedTask: { type: Object },

      nombreNueva: { type: String },
      descripcionNueva: { type: String },
      horaNueva: { type: String },
      prioridadNueva: { type: String },

      activeTab: { type: String }
    };
  }

  constructor() {
    super();
    this.tasks = [];
    this.showAddModal = false;
    this.showEditModal = false;
    this.showDetailModal = false;
    this.selectedTask = null;
    this.activeTab = 'fecha';

    this.nombreNueva = '';
    this.descripcionNueva = '';
    this.horaNueva = '10:00';
    this.prioridadNueva = 'media';
  }

  render() {
    return html`
      <div class="layout-container">

        <!-- Main Content -->
        <h2 class="main-title">Mis Tareas</h2>

        <!-- Tabs -->
        <div class="tabs">
          <div
            class="tab ${this.activeTab === 'fecha' ? 'active' : ''}"
            @click="${() => (this.activeTab = 'fecha')}"
          >
            Por Fecha
          </div>
          <div
            class="tab ${this.activeTab === 'prioridad' ? 'active' : ''}"
            @click="${() => (this.activeTab = 'prioridad')}"
          >
            Por Prioridad
          </div>
        </div>

        <!-- Tasks Section -->
        <h3 class="section-title">Hoy</h3>

        ${this._filtrarTareas().map(
      (task) => html`
            <div
              class="task-item ${task.completada ? 'completed' : ''}"
              @click="${() => this.verDetalles(task)}"
            >
              <div class="task-left">
                <svg
                  class="task-icon"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 256 256"
                >
                  <path
                    d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Z"
                    fill="currentColor"
                  ></path>
                </svg>
                <div class="task-content">
                  <p class="task-name">${task.nombre}</p>
                  <p class="task-time">${task.hora || '10:00'}</p>
                </div>
              </div>
              <div class="task-actions" @click="${(e) => e.stopPropagation()}">
                <button
                  class="action-btn"
                  @click="${() => this.editarTarea(task)}"
                  title="Editar"
                >
                  <svg
                    width="20"
                    height="20"
                    fill="currentColor"
                    viewBox="0 0 256 256"
                  >
                    <path
                      d="M227.31,73.37,182.63,28.68a16,16,0,0,0-22.63,0L36.69,152A15.86,15.86,0,0,0,32,163.31V208a16,16,0,0,0,16,16H92.69A15.86,15.86,0,0,0,104,219.31L227.31,96a16,16,0,0,0,0-22.63ZM92.69,208H48V163.31l88-88L180.69,120ZM192,108.68,147.31,64l24-24L216,84.68Z"
                    ></path>
                  </svg>
                </button>
                <button
                  class="action-btn"
                  @click="${() => this.eliminarTarea(task.id)}"
                  title="Eliminar"
                >
                  <svg
                    width="20"
                    height="20"
                    fill="currentColor"
                    viewBox="0 0 256 256"
                  >
                    <path
                      d="M216,48H176V40a24,24,0,0,0-24-24H104A24,24,0,0,0,80,40v8H40a8,8,0,0,0,0,16h8V208a16,16,0,0,0,16,16H192a16,16,0,0,0,16-16V64h8a8,8,0,0,0,0-16ZM96,40a8,8,0,0,1,8-8h48a8,8,0,0,1,8,8v8H96Zm96,168H64V64H192ZM112,104v64a8,8,0,0,1-16,0V104a8,8,0,0,1,16,0Zm48,0v64a8,8,0,0,1-16,0V104a8,8,0,0,1,16,0Z"
                    ></path>
                  </svg>
                </button>
              </div>
            </div>
          `
    )}

        <!-- Add Task Button -->
        <button class="add-task-btn" @click="${this.abrirModalAgregar}">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="currentColor"
            viewBox="0 0 256 256"
          >
            <path
              d="M224,128a8,8,0,0,1-8,8H136v80a8,8,0,0,1-16,0V136H40a8,8,0,0,1,0-16h80V40a8,8,0,0,1,16,0v80h80A8,8,0,0,1,224,128Z"
            ></path>
          </svg>
          Agregar Tarea
        </button>

        <!-- Modals -->
        <espe-task-modal
          .show="${this.showAddModal || this.showEditModal || this.showDetailModal}"
          .mode="${this.showAddModal ? 'add' : this.showEditModal ? 'edit' : this.showDetailModal ? 'detail' : ''}"
          .selectedTask="${this.selectedTask}"
          .nombreNueva="${this.nombreNueva}"
          .descripcionNueva="${this.descripcionNueva}"
          .horaNueva="${this.horaNueva}"
          .prioridadNueva="${this.prioridadNueva}"

          @close-modal="${this.cerrarModales}"
          @add-task="${this.agregarTarea}"
          @update-task="${this.actualizarTarea}"
          @save-edit="${this.guardarEdicion}"
          @complete-task="${this.completarTarea}"
        ></espe-task-modal>

      </div>
    `;
  }

  _filtrarTareas() {
    if (this.activeTab === 'prioridad') {
      const prioridades = ['alta', 'media', 'baja'];
      return this.tasks
        .filter(t => !t.completada)
        .sort((a, b) => prioridades.indexOf(a.prioridad) - prioridades.indexOf(b.prioridad));
    } else {
      return this.tasks
        .filter(t => !t.completada)
        .sort((a, b) => (a.hora || '').localeCompare(b.hora || ''));
    }
  }

  abrirModalAgregar() {
    this.nombreNueva = '';
    this.descripcionNueva = '';
    this.horaNueva = '10:00';
    this.prioridadNueva = 'media';
    this.showAddModal = true;
    this.showEditModal = false;
    this.showDetailModal = false;
    this.selectedTask = null;
  }

  editarTarea(task) {
    this.selectedTask = { ...task };
    this.showEditModal = true;
    this.showAddModal = false;
    this.showDetailModal = false;
  }

  verDetalles(task) {
    this.selectedTask = { ...task };
    this.showDetailModal = true;
    this.showAddModal = false;
    this.showEditModal = false;
  }

  cerrarModales() {
    this.showAddModal = false;
    this.showEditModal = false;
    this.showDetailModal = false;
    this.selectedTask = null;
    this.nombreNueva = '';
    this.descripcionNueva = '';
    this.horaNueva = '10:00';
    this.prioridadNueva = 'media';
  }

  agregarTarea(e) {
  const { nombre, descripcion, hora, prioridad } = e.detail;
  if (!nombre || !hora) return;

  const nuevaTarea = {
    id: Date.now(),
    nombre,
    descripcion,
    hora,
    prioridad,
    completada: false,
  };

  this.tasks = [...this.tasks, nuevaTarea];

  this.cerrarModales();
}


  actualizarTarea(e) {
    const tareaEditada = e.detail;
    this.selectedTask = tareaEditada;
  }

  guardarEdicion(e) {
    const tareaEditada = e.detail;
    if (!tareaEditada.nombre.trim() || !tareaEditada.hora) return;
    this.tasks = this.tasks.map(t => (t.id === tareaEditada.id ? tareaEditada : t));
    this.cerrarModales();
  }

  completarTarea(e) {
    const tarea = e.detail;
    this.tasks = this.tasks.filter(t => t.id !== tarea.id);
    this.cerrarModales();
  }

  eliminarTarea(id) {
  const confirmacion = window.confirm('¿Estás seguro que deseas eliminar esta tarea?');
  if (confirmacion) {
    this.tasks = this.tasks.filter(t => t.id !== id);
  }
}

}

customElements.define('espe-task-list', EspeTaskList);
