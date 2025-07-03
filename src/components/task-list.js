import { LitElement, html, css } from 'lit-element';
import './task-item.js';

export class TaskList extends LitElement {
  static properties = {
    tasks: { type: Array },
  };

  static styles = css`
  :host {
    display: block;
    padding: 1rem;
    box-sizing: border-box;
  }

  .date-group {
    margin-bottom: 2rem;
    padding: 1rem;
    background-color: #1c2c2a;
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    color: #ffffff;
  }

  h3 {
    background-color: #214a3c;
    padding: 0.5rem 1rem;
    border-radius: 8px;
    margin: 0 0 1rem;
    font-size: 1.1rem;
    color: #8ecdb7;
  }
`;


  groupTasksByDateAndPriority(tasks) {
    return tasks.reduce((acc, task) => {
      const key = `${task.date}|${task.priority}`;
      if (!acc[key]) acc[key] = [];
      acc[key].push(task);
      return acc;
    }, {});
  }

  render() {
    const grouped = this.groupTasksByDateAndPriority(this.tasks || []);
    return html`
      ${Object.entries(grouped).map(([groupKey, tasks]) => {
        const [date, priority] = groupKey.split('|');
        return html`
          <div class="date-group">
            ${tasks.map(task => html`
              <task-item
                .task=${task}
                @task-edit=${this._onTaskEdit}
                @complete-task=${this._onCompleteTask}
                @task-delete=${this._onTaskDelete}>
              </task-item>
            `)}
          </div>
        `;
      })}
    `;
  }

  _onTaskEdit(e) {
    e.stopPropagation();
    this.dispatchEvent(new CustomEvent('task-edit', {
      detail: { task: e.detail.task },
      bubbles: true,
      composed: true
    }));
  }

  _onCompleteTask(e) {
    e.stopPropagation();
    this.dispatchEvent(new CustomEvent('complete-task', {
      detail: { taskId: e.detail.taskId },
      bubbles: true,
      composed: true
    }));
  }

  _onTaskDelete(e) {
    e.stopPropagation();
    this.dispatchEvent(new CustomEvent('task-delete', {
      detail: { taskId: e.detail.taskId },
      bubbles: true,
      composed: true
    }));
  }
}

customElements.define('task-list', TaskList);
