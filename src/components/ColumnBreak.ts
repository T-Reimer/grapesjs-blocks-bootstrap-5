import { ComponentManager, Editor } from "grapesjs";
import equalsIcon from "../icons/equals-solid.svg";

export const ColumnBreakBlock = (editor: Editor, label: string) => {
  const bm = editor.BlockManager;
  bm.add("column_break", {
    label,
    media: equalsIcon,
    category: "Layout (Bootstrap)",
    content: {
      type: "column_break",
    },
  });
};

export default (domc: ComponentManager) => {
  const defaultType = domc.getType("default");
  const defaultModel = defaultType.model;
  const defaultView = defaultType.view;

  domc.addType("column_break", {
    model: {
      defaults: Object.assign({}, defaultModel.prototype.defaults, {
        "custom-name": "Column Break",
        tagName: "div",
        classes: ["w-100"],
      }),
    },
    isComponent(el) {
      if (el && el.classList && el.classList.contains("w-100")) {
        // also check if parent is `.row`
        return { type: "column_break" };
      }
    },
    view: defaultView,
  });
};
