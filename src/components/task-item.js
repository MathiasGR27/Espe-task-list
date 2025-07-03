import { LitElement, html, css } from 'lit-element';

class TaskItem extends LitElement {
static styles = css`
  .task-card {
    background-color: #253832;
    padding: 1rem;
    border-radius: 12px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
    color: #ffffff;
    cursor: pointer;
    position: relative;
    transition: transform 0.2s ease, box-shadow 0.2s ease;
  }

  .task-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 18px rgba(0, 0, 0, 0.25);
  }

  p {
    margin: 0;
    font-size: 1rem;
    color: #d1f5e5;
    line-height: 1.4;
    word-break: break-word;
  }

  .actions {
    position: absolute;
    top: 10px;
    right: 10px;
    display: flex;
    gap: 0.5rem;
  }

  button {
    padding: 0.4rem 0.8rem;
    font-size: 13px;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-weight: 600;
    transition: background-color 0.3s ease;
  }

  button.edit {
    background-color: #ffc107;
    color: #1c2c2a;
  }

  button.edit:hover {
    background-color: #ffb300;
  }

  button.delete {
    background-color: #dc3545;
    color: #fff;
  }

  button.delete:hover {
    background-color: #c82333;
  }
`;



  static properties = {
    task: { type: Object },
    showActions: { type: Boolean },
  };

  constructor() {
    super();
    this.task = {};
    this.showActions = true; 
  }

  _handleClick() {
    this.dispatchEvent(new CustomEvent('task-selected', {
      detail: { task: this.task },
      bubbles: true,
      composed: true
    }));
  }

  _handleEdit(e) {
    e.stopPropagation();
    this.dispatchEvent(new CustomEvent('edit-task', {
      detail: { task: this.task },
      bubbles: true,
      composed: true
    }));
  }

  _handleDelete(e) {
    e.stopPropagation();
    this.dispatchEvent(new CustomEvent('delete-task', {
      detail: { taskId: this.task.id },
      bubbles: true,
      composed: true
    }));
  }

  render() {
    return html`
      <div class="task-card" @click=${this._handleClick} title="${this.task.description}">
        <p>${this.task.description}</p>
        ${this.showActions ? html`
          <div class="actions">
            <button class="edit" @click=${this._handleEdit}>Editar</button>
            <button class="delete" @click=${this._handleDelete}>Eliminar</button>
          </div>
        ` : ''}
      </div>
    `;
  }
}

customElements.define('task-item', TaskItem);
