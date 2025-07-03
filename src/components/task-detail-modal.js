import { LitElement, html, css } from 'lit-element';

export class TaskDetailModal extends LitElement {
  static styles = css`
  :host {
    position: fixed;
    top: 0; left: 0;
    width: 100vw; height: 100vh;
    background: rgba(0, 0, 0, 0.6);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
  }

  .modal {
    background-color: #1c2c2a;
    padding: 2rem;
    border-radius: 16px;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
    width: 90%;
    max-width: 400px;
    color: #ffffff;
  }

  h2 {
    margin-top: 0;
    text-align: center;
    font-size: 1.5rem;
    font-weight: bold;
    color: #8ecdb7;
  }

  p {
    margin: 0.75rem 0;
    font-size: 1rem;
    color: #d1f5e5;
  }

  button {
    margin-top: 1.5rem;
    padding: 0.75rem 1.2rem;
    font-size: 1rem;
    border: none;
    border-radius: 10px;
    cursor: pointer;
    background-color: #019863;
    color: white;
    display: block;
    width: 100%;
    transition: background-color 0.3s ease;
  }

  button:hover {
    background-color: #00b47f;
  }
`;


  static properties = {
    task: { type: Object }
  };

  constructor() {
    super();
    this.task = null;
  }

  _close() {
    this.dispatchEvent(new CustomEvent('close-detail', {
      bubbles: true,
      composed: true
    }));
  }

  render() {
  if (!this.task) return html``;

  return html`
    <div class="modal">
      <h2>${this.task.title}</h2>
      <p><strong>Descripción:</strong> ${this.task.description}</p>
      <p><strong>Fecha:</strong> ${this.task.date}</p>
      <p><strong>Prioridad:</strong> ${this.task.priority}</p>
      <p><strong>Estado:</strong> ${this.task.completed ? 'Completada' : 'Pendiente'}</p>

      <button class="complete" ?disabled=${this.task.completed} @click=${this.handleComplete}>
        ${this.task.completed ? 'Completada' : 'Completar'}
      </button>
      <button @click=${this._close} style="background-color:#9e9e9e; margin-top: 1rem;">Cerrar</button>
    </div>
  `;
}


  handleComplete() {
    this.dispatchEvent(new CustomEvent('complete-task', {
      detail: { taskId: this.task.id },
      bubbles: true,
      composed: true
    }));
  }
}

customElements.define('task-detail-modal', TaskDetailModal);
