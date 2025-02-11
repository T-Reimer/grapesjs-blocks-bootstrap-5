import contexts from "../bootstrap-contexts";
import sizes, { BootstrapBtnSizes } from "../bootstrap-btn-sizes";
import buttonIcon from "../icons/button.svg";
import { capitalize } from "../utils";
import { ComponentManager, Editor, Selector } from "grapesjs";

export const ButtonBlock = (editor: Editor, label: string) => {
  const bm = editor.BlockManager;
  bm.add("button", {
    label,
    media: buttonIcon,
    category: "Forms (Bootstrap)",
    content: '<button class="btn btn-primary">Send</button>',
  });
};

export default (dc: ComponentManager) => {
  const defaultType = dc.getType("default");
  if (!defaultType) {
    return;
  }
  const defaultModel = defaultType.model;
  // const defaultView = defaultType.view;

  dc.addType("button", {
    model: {
      defaults: {
        ...defaultModel.prototype.defaults,
        "custom-name": "Button",
        droppable: false,
        attributes: {
          role: "button",
        },
        classes: ["btn"],
        traits: [
          {
            type: "content",
            label: "Text",
          },
          {
            label: "Type",
            type: "select",
            name: "type",
            options: [
              { value: "submit", name: "Submit" },
              { value: "reset", name: "Reset" },
              { value: "button", name: "Button" },
            ],
          },
          {
            type: "class_select",
            options: [
              { value: "", name: "None" },
              ...contexts.map((v) => {
                return { value: `btn-${v}`, name: capitalize(v) };
              }),
              ...contexts.map((v) => {
                return {
                  value: `btn-outline-${v}`,
                  name: capitalize(v) + " (Outline)",
                };
              }),
            ],
            label: "Context",
          },
          {
            type: "class_select",
            options: [
              { value: "", name: "Default" },
              ...Object.keys(sizes).map((k) => {
                return {
                  value: `btn-${k}`,
                  name: sizes[k as BootstrapBtnSizes],
                };
              }),
            ],
            label: "Size",
          },
          {
            type: "class_select",
            options: [
              { value: "", name: "Inline" },
              { value: "btn-block", name: "Block" },
            ],
            label: "Width",
          },
        ].concat(defaultModel.prototype.defaults.traits),
      },
      afterChange() {
        if (this.attributes.type === "button" && this.attributes.classes) {
          if (
            this.attributes.classes.filter((cls: Selector) => {
              return cls.id === "btn";
            }).length === 0
          ) {
            this.changeType("link");
          }
        }
      },
    },
    isComponent(el) {
      if (el && el.classList && el.classList.contains("btn")) {
        return { type: "button" };
      }
    },
    view: {
      events: {
        // @ts-ignore
        click: "handleClick",
      },

      init() {
        this.listenTo(this.model, "change:content", this.updateContent);
      },

      updateContent() {
        this.el.innerHTML = this.model.get("content") || "";
      },

      handleClick(e: any) {
        e.preventDefault();
      },
    },
  });
};
