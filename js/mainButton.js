class MainButton extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
    }
  
    connectedCallback() {
      const href = this.getAttribute('href');
      const type = this.getAttribute('type') || 'button';
      const tag = href ? 'a' : 'button';
  
      this.shadowRoot.innerHTML = `
        <style>
          :host {
            display: inline-block;
          }
  
          a, button {
            display: flex; /* Makes width/height apply and centers text */
            justify-content: center;
            align-items: center;
            width: 70vw;
            height: 7vh;
            flex-shrink: 0;
            border-radius: 10px;
            background: #081A3D;
            font-size: 50px;
            color: #E6EFFF;
            font-family: "Inter", sans-serif;
            text-decoration: none;
            border: none;
            box-sizing: border-box;
            cursor: pointer;
          }
  
          a:hover, button:hover {
            background-color: #F4F8FF;
            color: #0C2659;
            border: 3px solid var(--secondary_text_dark, #0C2659);
          }
        </style>
        <${tag} ${href ? `href="${href}"` : ''}><slot></slot></${tag}>
        `;
        if (!href && type === 'submit') {
      this.shadowRoot.querySelector('button').addEventListener('click', () => {
        // Find nearest form and submit it
        const form = this.closest('form');
        if (form) form.requestSubmit(); // Modern and reliable way
      });
    }
  }
}
  
  customElements.define('main-button', MainButton);

