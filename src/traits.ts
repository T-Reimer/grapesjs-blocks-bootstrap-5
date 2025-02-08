import { Editor } from "grapesjs";

export interface TraitsConfig {}

export default (editor: Editor, config: TraitsConfig) => {
  const tm = editor.TraitManager;

  // Select trait that maps a class list to the select options.
  // The default select option is set if the input has a class, and class list is modified when select value changes.
  tm.addType("class_select", {
    events: {
      change: "onChange", // trigger parent onChange method on input change
    },
    createInput({}) {
      const md = this.model;
      const opts = md.get("options") || [];
      const input = document.createElement("select");

      for (let i = 0; i < opts.length; i++) {
        const option = document.createElement("option");
        let value = opts[i].value as string;
        if (value === "") {
          // 'GJS_NO_CLASS' represents no class--empty string does not trigger value change
          value = "GJS_NO_CLASS";
        }
        option.text = opts[i].name as string;
        option.value = value as string;

        // Convert the Token List to an Array
        const css = Array.from(this.target?.view?.el?.classList || []);

        const value_a = value.split(" ");
        const intersection = css.filter((x) => value_a.includes(x));

        if (intersection.length === value_a.length) {
          option.setAttribute("selected", "selected");
        }

        input.append(option);
      }
      return input as HTMLElement;
    },
    onUpdate({ elInput, component }) {
      const classes = component.getClasses();
      const opts = this.model.get("options") || [];
      for (let i = 0; i < opts.length; i++) {
        let value = opts[i].value;
        if (value && classes.includes(value)) {
          elInput.value = value as string;
          return;
        }
      }
      elInput.value = "GJS_NO_CLASS";
    },

    onEvent({ component }) {
      const classes = this.model
        .get("options")
        ?.map((opt) => opt.value as string);
      if (!classes) {
        return;
      }

      for (let i = 0; i < classes.length; i++) {
        if (classes[i].length > 0) {
          const classes_i_a = classes[i].split(" ");
          for (let j = 0; j < classes_i_a.length; j++) {
            if (classes_i_a[j].length > 0) {
              component.removeClass(classes_i_a[j]);
            }
          }
        }
      }
      const value = this.model.get("value");

      // This piece of code removes the empty attribute name from attributes list
      const elAttributes = component.attributes.attributes;
      if (elAttributes) {
        delete elAttributes[""];
      }

      if (value.length > 0 && value !== "GJS_NO_CLASS") {
        const value_a = value.split(" ");
        for (let i = 0; i < value_a.length; i++) {
          component.addClass(value_a[i]);
        }
      }
      component.em.trigger("component:toggled");
    },
  });

  const textTrait = tm.getType("text");

  tm.addType("content", {
    events: {
      keyup: "onChange",
    },

    inputEl: null,

    onValueChange: function () {
      const md = this.model;
      const target = md.target;
      target.set("content", md.get("value"));
    },

    getInputEl: function () {
      if (!this.inputEl) {
        this.inputEl = textTrait.prototype.getInputEl.bind(this)();
        (this.inputEl as any).value = this.target.get("content") as any;
      }
      return this.inputEl;
    },
  });

  tm.addType("content", {
    events: {
      keyup: "onChange",
    },

    inputEl: null,

    onValueChange: function () {
      const md = this.model;
      const target = md.target;
      target.set("content", md.get("value"));
    },

    getInputEl: function () {
      if (!this.inputEl) {
        this.inputEl = textTrait.prototype.getInputEl.bind(this)();
        (this.inputEl as any).value = this.target.get("content") as any;
      }
      return this.inputEl;
    },
  });
};
