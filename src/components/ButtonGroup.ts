import { ComponentManager, Editor } from "grapesjs";
import sizes, { BootstrapBtnSizes } from "../bootstrap-btn-sizes";
import buttonIcon from "../icons/button.svg";

export const ButtonGroupBlock = (editor: Editor, label: string) => {
  const bm = editor.BlockManager;
  bm.add("button_group", {
    label,
    media: buttonIcon,
    category: "Forms (Bootstrap)",
    content: {
      type: "button_group",
    },
  });
};

export default (dc: ComponentManager) => {
  const defaultType = dc.getType("default");
  const defaultModel = defaultType.model;
  const defaultView = defaultType.view;

  dc.addType("button_group", {
    model: {
      defaults: Object.assign({}, defaultModel.prototype.defaults, {
        "custom-name": "Button Group",
        tagName: "div",
        classes: ["btn-group"],
        droppable: ".btn",
        attributes: {
          role: "group",
        },
        traits: [
          {
            type: "class_select",
            name: "size",
            options: [
              { value: "", name: "Default" },
              ...Object.keys(sizes).map(function (k) {
                return {
                  value: "btn-group-" + k,
                  name: sizes[k as BootstrapBtnSizes],
                };
              }),
            ],
            label: "Size",
          },
          {
            type: "class_select",
            name: "direction",
            options: [
              { value: "", name: "Horizontal" },
              { value: "btn-group-vertical", name: "Vertical" },
            ],
            label: "Direction",
          },
          {
            type: "Text",
            label: "ARIA Label",
            name: "aria-label",
            placeholder: "A group of buttons",
          },
        ].concat(defaultModel.prototype.defaults.traits),
      }),
    },
    isComponent(el) {
      if (el && el.classList && el.classList.contains("btn-group")) {
        return { type: "button_group" };
      }
    },
    view: defaultView,
  });
};
