import { ComponentManager, Editor } from "grapesjs";
import windowIcon from "../icons/window-maximize-solid.svg";

export const RowBlock = (editor: Editor, label: string) => {
  const bm = editor.BlockManager;
  bm.add("row", {
    label: `
            ${windowIcon}
            <div>${label}</div>
        `,
    category: "Layout (Bootstrap)",
    content: {
      type: "row",
      classes: ["row"],
    },
  });
};

export default (domc: ComponentManager) => {
  const defaultType = domc.getType("default");
  const defaultModel = defaultType.model;
  const defaultView = defaultType.view;

  domc.addType("row", {
    model: {
      defaults: Object.assign({}, defaultModel.prototype.defaults, {
        "custom-name": "Row",
        tagName: "div",
        draggable: ".container, .container-fluid",
        droppable: true,
        traits: [
          {
            type: "class_select",
            options: [
              { value: "", name: "Yes" },
              { value: "g-0", name: "No" },
            ],
            label: "Gutters?",
          },
        ].concat(defaultModel.prototype.defaults.traits),
      }),
    },
    isComponent(el) {
      if (el && el.classList && el.classList.contains("row")) {
        return { type: "row" };
      }
    },
    view: defaultView,
  });
};
