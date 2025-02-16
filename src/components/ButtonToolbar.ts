import { ComponentManager, Editor } from "grapesjs";
import buttonIcon from "../icons/button.svg";

export const ButtonToolbarBlock = (editor: Editor, label: string) => {
  const bm = editor.BlockManager;
  bm.add("button_toolbar", {
    label,
    media: buttonIcon,
    category: "Forms (Bootstrap)",
    content: {
      type: "button_toolbar",
    },
  });
};

export default (dc: ComponentManager) => {
  const defaultType = dc.getType("default");
  const defaultModel = defaultType.model;
  const defaultView = defaultType.view;

  dc.addType("button_toolbar", {
    model: {
      defaults: Object.assign({}, defaultModel.prototype.defaults, {
        "custom-name": "Button Toolbar",
        tagName: "div",
        classes: ["btn-toolbar"],
        droppable: ".btn-group",
        attributes: {
          role: "toolbar",
        },
        traits: [
          {
            type: "Text",
            label: "ARIA Label",
            name: "aria-label",
            placeholder: "A toolbar of button groups",
          },
        ].concat(defaultModel.prototype.defaults.traits),
      }),
    },
    isComponent(el) {
      if (el && el.classList && el.classList.contains("btn-toolbar")) {
        return { type: "button_toolbar" };
      }
    },
    view: defaultView,
  });
};
