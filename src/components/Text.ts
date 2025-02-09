import { ComponentManager, Editor } from "grapesjs";
import fontIcon from "../icons/font-solid.svg";

export const TextBlock = (editor: Editor, label: string) => {
  const bm = editor.BlockManager;
  bm.add("text", {
    label: `
            ${fontIcon}
            <div>${label}</div>
        `,
    category: "Typography (Bootstrap)",
    content: {
      type: "text",
      content: "Insert your text here",
    },
  });
};

export default (domc: ComponentManager) => {
  const defaultType = domc.getType("default");
  const textType = domc.getType("text");
  if (!defaultType || !textType) {
    return;
  }
  const defaultModel = defaultType.model;
  const textView = textType.view;

  domc.addType("text", {
    model: {
      defaults: Object.assign({}, defaultModel.prototype.defaults, {
        "custom-name": "Text",
        tagName: "div",
        droppable: true,
        editable: true,
      }),
    },
    view: textView,
  });
};
