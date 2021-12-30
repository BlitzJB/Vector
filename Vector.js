export class Component {
  constructor($parent) {
    this.$parent = parseParent($parent);
  }

  render() {
    this.$parent.innerHTML = this.template();
  }

  updateComponent(newState) {
    Object.keys(newState).forEach((k) => {
      this.state[k] = newState[k];
    });
    this.render();
  }

  destroy() {
    this.$parent.innerHTML = "";
  }
}

const parseParent = (parent) => {
  if (typeof parent === "string") {
    return document.querySelector(parent);
  }
  return parent;
}

const parseTemplate = (template) => {
  // TODO: setup parsing to turn <Component /> syntax into ${new Component(...props).template()}

  /*
  const component = new window[componentName]({}, this.$parent);
  template = template.replace(match, component.template()); 
  */
  return template;
}