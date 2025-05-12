class MainInput extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    const type = this.getAttribute('type') || 'text';
    const placeholder = this.getAttribute('placeholder') || '';

    this.shadowRoot.innerHTML = `
      <style>
        input {
          width: 50vw;
          height: 5vh;
          border: 1px solid var(--primary_hg_dark, #081A3D);
          border-radius: 8px;
          padding: 10px;
          margin: 10px;
          box-sizing: border-box;
          font-size: 2.5rem;
          font-family: Inter, sans-serif;
        }

        input::placeholder {
          color: var(--primary_text_dark, #0C2659);
          font-style: italic;
          font-size: 2.5rem;
          padding-left: 20px;
        }
      </style>
      <input type="${type}" placeholder="${placeholder}">
    `;

    if (type === 'submit') {
      const input = this.shadowRoot.querySelector('input');
      input.addEventListener('click', () => {
        const form = this.closest('form');
        if (form) form.requestSubmit();
      });
    }
  }
}

customElements.define('main-input', MainInput);
