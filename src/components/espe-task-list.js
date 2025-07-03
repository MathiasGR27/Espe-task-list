import { LitElement, html, css } from 'lit-element';
import './navbar';

export class EspeTaskList extends LitElement {
  static styles = css`
  :host {
    display: flex;
    justify-content: center;
    padding: 2rem;
    background-color: #0d1e15;
    font-family: 'Segoe UI', sans-serif;
    color: white;
  }

  .container {
    max-width: 700px;
    width: 100%;
  }

  h2 {
    font-size: 2rem;
    margin-bottom: 1rem;
    color: #8ecdb7;
    text-align: center;
  }

  button {
    background-color: #214a3c;
    color: white;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 6px;
    cursor: pointer;
    font-weight: bold;
    transition: background 0.3s ease;
  }

  button:hover {
    background-color: #3a6c56;
  }

  .task-item {
    background-color: #10231c;
    border-radius: 10px;
    padding: 1rem;
    margin-bottom: 1rem;
    box-shadow: 0 2px 8px rgba(0,0,0,0.5);
    display: flex;
    justify-content: space-between;
    align-items: center;
    transition: background-color 0.3s ease;
  }

  .task-item:hover {
    background-color: #1b3e2e;
  }

  .task-item.completed {
    background-color: #214a3c;
    text-decoration: line-through;
    opacity: 0.8;
  }

  .contenido {
    flex: 1;
  }

  .acciones {
    display: flex;
    gap: 0.5rem;
    margin-left: 1rem;
  }

  .modal {
    position: fixed;
    top: 15%;
    left: 50%;
    transform: translate(-50%, 0);
    background-color: #10231c;
    padding: 1.5rem;
    width: 90%;
    max-width: 450px;
    border: 2px solid #214a3c;
    border-radius: 10px;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.8);
    z-index: 1000;
  }

  .hidden {
    display: none;
  }

  input, textarea, select {
    width: 100%;
    margin: 0.5rem 0;
    padding: 0.5rem;
    border-radius: 5px;
    border: 1px solid #8ecdb7;
    background-color: #16382e;
    color: white;
  }

  input::placeholder,
  textarea::placeholder {
    color: #8ecdb7;
  }

  .fecha {
    color: #8ecdb7;
    margin-top: 2rem;
    font-size: 1.1rem;
  }

  .icono-circulo {
    margin-right: 0.8rem;
    color: #8ecdb7;
  }

  .nombre {
    font-weight: bold;
    font-size: 1.1rem;
  }

  .hora {
    font-size: 0.9rem;
    color: #8ecdb7;
  }

  .actions button {
    flex: 1;
    background-color: #214a3c;
    color: white;
    border-radius: 6px;
    border: none;
    padding: 0.5rem;
    font-weight: 600;
  }

  .actions button:hover {
    background-color: #3a6c56;
  }
`;


  static get properties() {
    return {
      tasks: { type: Array },
      theme: { type: String },
      showAddModal: { type: Boolean },
      showEditModal: { type: Boolean },
      selectedTask: { type: Object }
    };
  }

  constructor() {
    super();
    this.tasks = [];
    this.showAddModal = false;
    this.showEditModal = false;
    this.selectedTask = null;
  }

  render() {
    // Agrupar tareas por fecha
    const groupedTasks = this.tasks.reduce((acc, task) => {
      const fecha = task.fecha || 'Sin fecha';
      if (!acc[fecha]) acc[fecha] = [];
      acc[fecha].push(task);
      return acc;
    }, {});
  
    return html`
  <div class="container">
    <h2>Mis Tareas</h2>
      <button @click="${this.abrirModalAgregar}">➕ Nueva Tarea</button>
  
      ${Object.keys(groupedTasks).map(
        fecha => html`
          <h3 class="fecha">${fecha.charAt(0).toUpperCase() + fecha.slice(1)}</h3>
          ${groupedTasks[fecha].map(
            task => html`
              <div
                class="task-item ${task.completada ? 'completed' : ''}"
                @click="${() => this.verDetalles(task)}"
              >
                <div class="icono-circulo">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 256 256">
                    <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Z"></path>
                  </svg>
                </div>
                <div class="contenido">
                  <p class="nombre">${task.nombre}</p>
                  <p class="hora">${task.fecha}</p>
                </div>
                <div class="acciones" @click="${e => e.stopPropagation()}">
                  <button class="editar" @click="${() => this.editarTarea(task)}" title="Editar tarea">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 256 256">
                      <path d="M227.31,73.37,182.63,28.68a16,16,0,0,0-22.63,0L36.69,152A15.86,15.86,0,0,0,32,163.31V208a16,16,0,0,0,16,16H92.69A15.86,15.86,0,0,0,104,219.31L227.31,96a16,16,0,0,0,0-22.63ZM92.69,208H48V163.31l88-88L180.69,120ZM192,108.68,147.31,64l24-24L216,84.68Z"></path>
                    </svg>
                  </button>
                  <button class="eliminar" @click="${() => this.eliminarTarea(task.id)}" title="Eliminar tarea">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 256 256">
                      <path d="M216,48H176V40a24,24,0,0,0-24-24H104A24,24,0,0,0,80,40v8H40a8,8,0,0,0,0,16h8V208a16,16,0,0,0,16,16H192a16,16,0,0,0,16-16V64h8a8,8,0,0,0,0-16ZM96,40a8,8,0,0,1,8-8h48a8,8,0,0,1,8,8v8H96Zm96,168H64V64H192ZM112,104v64a8,8,0,0,1-16,0V104a8,8,0,0,1,16,0Zm48,0v64a8,8,0,0,1-16,0V104a8,8,0,0,1,16,0Z"></path>
                    </svg>
                  </button>
                </div>
              </div>
            `
          )}
        `
      )}

  
      <!-- Modal Agregar -->
      <div class="${this.showAddModal ? 'modal' : 'hidden'}">
        <h3>Nueva Tarea</h3>
        <input id="nombre" placeholder="Nombre" />
        <textarea id="descripcion" placeholder="Descripción"></textarea>
        <input id="fecha" type="date" />
        <select id="prioridad">
          <option>Baja</option>
          <option>Media</option>
          <option>Alta</option>
        </select>
        <button @click="${this.agregarTarea}">Guardar</button>
        <button @click="${this.cerrarModales}">Cancelar</button>
      </div>
  
      <!-- Modal Detalles -->
<div class="${this.selectedTask ? 'modal' : 'hidden'}">
  <h3>Detalles de la Tarea</h3>
  <p><strong>Nombre:</strong> ${this.selectedTask?.nombre}</p>
  <p><strong>Descripción:</strong> ${this.selectedTask?.descripcion}</p>
  <p><strong>Fecha:</strong> ${this.selectedTask?.fecha}</p>
  <p><strong>Prioridad:</strong> ${this.selectedTask?.prioridad}</p>
  <div class="actions">
    <button @click="${() => this.completarTarea(this.selectedTask.id)}">✅ Completar</button>
    <button @click="${this.cerrarModales}">Cerrar</button>
  </div>
</div>
  
      <!-- Modal Editar -->
      <div class="${this.showEditModal ? 'modal' : 'hidden'}">
        <h3>Editar Tarea</h3>
        <input id="edit-nombre" .value="${this.selectedTask?.nombre || ''}" />
        <textarea id="edit-descripcion">${this.selectedTask?.descripcion || ''}</textarea>
        <input id="edit-fecha" type="date" .value="${this.selectedTask?.fecha || ''}" />
        <select id="edit-prioridad">
          <option ?selected="${this.selectedTask?.prioridad === 'Baja'}">Baja</option>
          <option ?selected="${this.selectedTask?.prioridad === 'Media'}">Media</option>
          <option ?selected="${this.selectedTask?.prioridad === 'Alta'}">Alta</option>
        </select>
        <button @click="${this.guardarEdicion}">Actualizar</button>
        <button @click="${this.cerrarModales}">Cancelar</button>
      </div>
  </div>
`;
  }

  abrirModalAgregar() {
    this.showAddModal = true;
  }

  cerrarModales() {
    this.showAddModal = false;
    this.showEditModal = false;
    this.selectedTask = null;
  }

  agregarTarea() {
    const nombre = this.shadowRoot.getElementById('nombre').value.trim();
    const descripcion = this.shadowRoot.getElementById('descripcion').value.trim();
    const fecha = this.shadowRoot.getElementById('fecha').value;
    const prioridad = this.shadowRoot.getElementById('prioridad').value;

    if (!nombre || !fecha) {
      alert('El nombre y la fecha son obligatorios.');
      return;
    }

    const nuevaTarea = {
      id: Date.now(),
      nombre,
      descripcion,
      fecha,
      prioridad,
      completada: false,
    };

    this.tasks = [...this.tasks, nuevaTarea];
    this.dispatchEvent(new CustomEvent('task-added', { detail: { task: nuevaTarea } }));
    this.cerrarModales();

    this.shadowRoot.getElementById('nombre').value = '';
    this.shadowRoot.getElementById('descripcion').value = '';
    this.shadowRoot.getElementById('fecha').value = '';
    this.shadowRoot.getElementById('prioridad').value = 'Baja'
  }

  completarTarea(id) {
    this.tasks = this.tasks.map(t =>
      t.id === id ? { ...t, completada: true } : t
    );
    this.dispatchEvent(new CustomEvent('task-completed', { detail: { id } }));
  }

  eliminarTarea(id) {
    this.tasks = this.tasks.filter(t => t.id !== id);
    this.dispatchEvent(new CustomEvent('task-deleted', { detail: { id } }));
  }

  editarTarea(task) {
    this.selectedTask = task;
    this.showEditModal = true;
  }

  verDetalles(task) {
    this.selectedTask = task;
  }

  guardarEdicion() {
    const nombre = this.shadowRoot.getElementById('edit-nombre').value.trim();
    const descripcion = this.shadowRoot.getElementById('edit-descripcion').value.trim();
    const fecha = this.shadowRoot.getElementById('edit-fecha').value;
    const prioridad = this.shadowRoot.getElementById('edit-prioridad').value;

    this.tasks = this.tasks.map(t =>
      t.id === this.selectedTask.id
        ? { ...t, nombre, descripcion, fecha, prioridad }
        : t
    );

    this.dispatchEvent(new CustomEvent('task-updated', { detail: { id: this.selectedTask.id } }));
    this.cerrarModales();
  }
}

customElements.define('espe-task-list', EspeTaskList);
