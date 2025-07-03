import { LitElement, html, css } from 'lit-element';
import './task-list.js';
import './modal.js';
import './task-detail-modal.js';

export class App extends LitElement {
  static styles = css`
    :host {
      display: block;
      font-family: Arial, sans-serif;
      color: #fff;
      background-color: #1c2c2a;
      min-height: 100vh;
      padding: 1rem;
    }
    h2 {
      margin-top: 0;
      color: #34a853;
    }
    .task-section {
      margin-bottom: 2rem;
    }
    .task-list {
      display: grid;
      gap: 1rem;
    }
    .add-btn {
      margin-top: 1rem;
      padding: 0.5rem 1rem;
      background: #00573f;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }
  `;

  static properties = {
    tasks: { type: Array },
    showModal: { type: Boolean },
    showDetailModal: { type: Boolean },
    selectedTask: { type: Object },
    isEditing: { type: Boolean }
  };

  constructor() {
    super();
    this.tasks = [];
    this.showModal = false;
    this.showDetailModal = false;
    this.selectedTask = null;
    this.isEditing = false;
  }

  connectedCallback() {
    super.connectedCallback();
    this.loadTasksFromStorage();
  }

  loadTasksFromStorage() {
    const tasksFromStorage = localStorage.getItem('tasks');
    if (tasksFromStorage) {
      this.tasks = JSON.parse(tasksFromStorage);
    }
  }

  saveTasksToStorage() {
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }

  openAddModal() {
    this.selectedTask = { title: '', description: '', date: '', priority: 'Media', completed: false };
    this.isEditing = false;
    this.showModal = true;
  }

  openEditModal(task) {
    this.selectedTask = { ...task };
    this.isEditing = true;
    this.showModal = true;
    this.showDetailModal = false; // cerrar detalle si estaba abierto
  }

  openDetailModal(task) {
    this.selectedTask = { ...task };
    this.showDetailModal = true;
  }

  closeModal() {
    this.showModal = false;
    this.selectedTask = null;
    this.isEditing = false;
  }

  closeDetailModal() {
    this.showDetailModal = false;
    this.selectedTask = null;
  }

  saveTask(e) {
    const task = e.detail;

    if (this.isEditing && task.id) {
      const index = this.tasks.findIndex(t => t.id === task.id);
      if (index !== -1) {
        this.tasks[index] = task;
        this.tasks = [...this.tasks];
      }
    } else {
      task.id = Date.now();
      task.completed = false;
      this.tasks = [...this.tasks, task];
    }

    this.saveTasksToStorage();
    this.closeModal();
  }

  completeTask(e) {
    const taskId = e.detail.taskId;
    this.tasks = this.tasks.map(task =>
      task.id === taskId ? { ...task, completed: true } : task
    );
    this.saveTasksToStorage();

    if (this.showDetailModal && this.selectedTask?.id === taskId) {
      this.selectedTask = { ...this.selectedTask, completed: true };
    }
  }

  deleteTask(e) {
    const taskId = e.detail.taskId;
    this.tasks = this.tasks.filter(task => task.id !== taskId);
    this.saveTasksToStorage();

    if (this.showDetailModal && this.selectedTask?.id === taskId) {
      this.closeDetailModal();
    }
  }

  editTaskFromDetail() {
    this.openEditModal(this.selectedTask);
  }

  render() {
    const pendingTasks = this.tasks.filter(task => !task.completed);
    const completedTasks = this.tasks.filter(task => task.completed);

    return html`
      <main>
        <div class="task-section">
          <h2>Tareas Pendientes</h2>
          <div class="task-list">
            ${pendingTasks.length > 0 ? pendingTasks.map(task => html`
              <task-item
                .task=${task}
                .showActions=${true}
                @task-selected=${() => this.openDetailModal(task)}
                @edit-task=${this.openEditModal.bind(this, task)}
                @delete-task=${this.deleteTask}>
              </task-item>
            `) : html`<p>No hay tareas pendientes.</p>`}
          </div>
        </div>

        <div class="task-section">
          <h2>Tareas Completadas</h2>
          <div class="task-list">
            ${completedTasks.length > 0 ? completedTasks.map(task => html`
              <task-item
                .task=${task}
                .showActions=${false}
                @task-selected=${() => this.openDetailModal(task)}>
              </task-item>
            `) : html`<p>No hay tareas completadas.</p>`}
          </div>
        </div>

        <button class="add-btn" @click=${this.openAddModal}>Agregar Tarea</button>

        ${this.showModal ? html`
          <task-modal
            .task=${this.selectedTask}
            .isEditing=${this.isEditing}
            @save-task=${this.saveTask}
            @close-modal=${this.closeModal}>
          </task-modal>
        ` : ''}

        ${this.showDetailModal ? html`
          <task-detail-modal
            .task=${this.selectedTask}
            @close-detail=${this.closeDetailModal}
            @edit-task=${this.editTaskFromDetail.bind(this)}
            @complete-task=${this.completeTask}
            @delete-task=${this.deleteTask}>
          </task-detail-modal>
        ` : ''}
      </main>
    `;
  }
}

customElements.define('app-list', App);
