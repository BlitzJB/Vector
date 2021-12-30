export class Component {
  constructor($parent) {
    this.$parent = this.parseParent($parent)[0] ? this.parseParent($parent)[0] : this.parseParent($parent); // Ugly workaround for not accounting for NodeList
  }

  render() {
    this.destroy(); 
    this.parseTemplate();
    this.addEventListeners();
    Array.from(this.parsedTemplate.children[0].children).forEach((el) => {
      this.$parent.appendChild(el);
    });
  }

  updateComponent(newState) {
    Object.keys(newState).forEach((k) => {
      this.state[k] = newState[k];
    });
    this.render();
  }

  destroy() {
    // As of now this completely clears the parent. Undesirable. Need workaround.
    this.$parent.innerHTML = "";
  }

  addEventListeners() {
    if (!this.eventListeners) return this.parsedTemplate;
    this.eventListeners.forEach((listener) => {
      if (Array.isArray(listener)) {
        // Accounting for shorthand syntax of [selector, type, callback]
        listener = {
          selector: listener[0],
          type: listener[1],
          callback: listener[2]
        }
      }
      let target = this.parsedTemplate.querySelector(listener.selector)
      if (target) {
        target.addEventListener(listener.type, listener.callback)
      }
    });
  }

  parseParent (parent) {
    if (typeof parent === "string") {
      return document.querySelector(parent);
    }
    else if (typeof parent === "object") {
      if (parent.name) {
        return document.getElementsByName(parent.name);
      }
    }
    else if (parent instanceof NodeList) {
      return parent[0]
    }
    return parent;
  }

  parseTemplate () {
    let wrapped = `<div name="_Temp">${this.template()}</div>`;
    this.parsedTemplate = new DOMParser().parseFromString(wrapped, "text/html").body;
  } 
}