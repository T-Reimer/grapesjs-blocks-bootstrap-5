import { ComponentManager, Editor } from "grapesjs";
import headingIcon from "../icons/heading-solid.svg";

export const HeaderBlock = (editor: Editor, label: string) => {
  const bm = editor.BlockManager;
  bm.add("header", {
    label,
    media: headingIcon,
    category: "Typography (Bootstrap)",
    content: {
      type: "header",
      content: "Bootstrap heading",
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

  domc.addType("header", {
    extend: "text",
    model: {
      defaults: Object.assign({}, textModel.prototype.defaults, {
        "custom-name": "Header",
        tagName: "h1",
        traits: [
          {
            type: "select",
            options: [
              { value: "h1", name: "One (largest)" },
              { value: "h2", name: "Two" },
              { value: "h3", name: "Three" },
              { value: "h4", name: "Four" },
              { value: "h5", name: "Five" },
              { value: "h6", name: "Six (smallest)" },
            ],
            label: "Size",
            name: "tagName",
            changeProp: 1,
          },
          {
            type: "class_select",
            name: "display_heading",
            options: [
              { value: "", name: "None" },
              { value: "display-1", name: "One (largest)" },
              { value: "display-2", name: "Two " },
              { value: "display-3", name: "Three " },
              { value: "display-4", name: "Four (smallest)" },
            ],
            label: "Display Heading",
          },
        ].concat(textModel.prototype.defaults.traits),
      }),
    },
    isComponent(el) {
      if (el && ["H1", "H2", "H3", "H4", "H5", "H6"].includes(el.tagName)) {
        return { type: "header" };
      }
    },
    view: textView,
  });
};
