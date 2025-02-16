import { ComponentManager, Editor } from "grapesjs";
import paragraphIcon from "../icons/paragraph-solid.svg";

export const ParagraphBlock = (editor: Editor, label: string) => {
  const bm = editor.BlockManager;
  bm.add("paragraph", {
    label,
    media: paragraphIcon,
    category: "Typography (Bootstrap)",
    content: {
      type: "paragraph",
      content:
        "Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor. Duis mollis, est non commodo luctus.",
    },
  });
};

export default (domc: ComponentManager) => {
  const textType = domc.getType("text");
  if (!textType) {
    return;
  }
  const textModel = textType.model;
  const textView = textType.view;

  domc.addType("paragraph", {
    extend: "text",
    model: {
      defaults: Object.assign({}, textModel.prototype.defaults, {
        "custom-name": "Paragraph",
        tagName: "p",
        traits: [
          {
            type: "class_select",
            name: "lead",
            options: [
              { value: "", name: "No" },
              { value: "lead", name: "Yes" },
            ],
            label: "Lead?",
          },
        ].concat(textModel.prototype.defaults.traits),
      }),
    },
    isComponent(el) {
      if (el && el.tagName && el.tagName === "P") {
        return { type: "paragraph" };
      }
    },
    view: textView,
  });
};
