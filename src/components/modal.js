import { LitElement, html, css } from 'lit-element';

export class TaskModal extends LitElement {
  static styles = css`
    :host {
      position: fixed;
      inset: 0;
      background-color: rgba(0, 0, 0, 0.6);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 1000;
      box-sizing: border-box;
      padding: 1rem;
    }

    .modal {
      background-color: #1c2c2a;
      border-radius: 16px;
      padding: 2rem 1.5rem;
      width: 100%;
      max-width: 480px;
      color: #ffffff;
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
      box-sizing: border-box;
    }

    h2 {
      text-align: center;
      font-size: 1.75rem;
      font-weight: bold;
      margin-bottom: 1.5rem;
      color: #8ecdb7;
    }

    form {
      display: flex;
      flex-direction: column;
      gap: 1.25rem;
      width: 100%;
    }

    input,
    textarea,
    select {
      width: 100%;
      max-width: 100%;
      padding: 1rem;
      border: none;
      border-radius: 12px;
      background-color: #214a3c;
      color: white;
      font-size: 1rem;
      font-family: inherit;
      box-sizing: border-box;
    }

    input::placeholder,
    textarea::placeholder {
      color: #8ecdb7;
    }

    textarea {
      resize: none;
      min-height: 120px;
    }

    .buttons {
      display: flex;
      flex-wrap: wrap;
      gap: 1rem;
      justify-content: center;
    }

    button {
      flex: 1 1 45%;
      min-width: 100px;
      padding: 0.75rem;
      font-size: 1rem;
      font-weight: bold;
      border: none;
      border-radius: 10px;
      cursor: pointer;
      transition: background 0.3s;
      box-sizing: border-box;
    }

    .save {
      background-color: #019863;
      color: white;
    }

    .save:hover {
      background-color: #00b47f;
    }

    .cancel {
      background-color: #3b3b3b;
      color: white;
    }

    .cancel:hover {
      background-color: #555;
    }

    @media (max-width: 480px) {
      .modal {
        padding: 1.25rem 1rem;
      }
    }
  `;


  static properties = {
    task: { type: Object },
  };

  constructor() {
    super();
    this.task = {
      id: null,
      title: '',
      description: '',
      date: '',
      priority: 'Media',
    };
  }

  render() {
    return html`
      <div class="modal">
        <h2>${this.task.id ? 'Editar Tarea' : 'Nueva Tarea'}</h2>
        <form @submit=${this._handleSubmit}>
          <input
            type="text"
            name="title"
            placeholder="Nombre de la tarea"
            .value=${this.task.title}
            @input=${this._handleInput}
            required
          />

          <textarea
            name="description"
            placeholder="Descripción de la tarea"
            .value=${this.task.description}
            @input=${this._handleInput}
          ></textarea>

          <input
            type="date"
            name="date"
            .value=${this.task.date}
            @input=${this._handleInput}
            required
          />

          <select name="priority" .value=${this.task.priority} @change=${this._handleInput}>
            <option>Alta</option>
            <option>Media</option>
            <option>Baja</option>
          </select>

          <div class="buttons">
            <button type="button" class="cancel" @click=${this._cancel}>Cancelar</button>
            <button type="submit" class="save">Guardar</button>
          </div>
        </form>
      </div>
    `;
  }

  _handleInput(e) {
    const { name, value } = e.target;
    this.task = { ...this.task, [name]: value };
  }

  _handleSubmit(e) {
    e.preventDefault();
    this.dispatchEvent(new CustomEvent('save-task', {
      detail: { ...this.task },
      bubbles: true,
      composed: true,
    }));
    this.remove();
  }

  _cancel() {
    this.remove();
  }
}

customElements.define('task-modal', TaskModal);
