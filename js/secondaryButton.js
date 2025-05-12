class SecondaryButton extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
    }
  
    connectedCallback() {
      const href = this.getAttribute('href');
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
            background: #6F7A44;
            font-size: 60px;
            color: #FDFFFB;
            font-family: "Inter", sans-serif;
            text-decoration: none;
            border: none;
            box-sizing: border-box;
            cursor: pointer;
          }
  
          a:hover, button:hover {
            background-color: #FDFFF4;
            color: #39401E;
            border: 3px solid var(--secondary_text_dark, #39401E);
          }
        </style>
        <${tag} ${href ? `href="${href}"` : ''}><slot></slot></${tag}>
      `;
    }
  }
  
  customElements.define('secondary-button', SecondaryButton);