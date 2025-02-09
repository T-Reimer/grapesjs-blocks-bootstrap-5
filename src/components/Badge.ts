import { ComponentManager, Editor } from "grapesjs";
import contexts from "../bootstrap-contexts";
import certificateIcon from "../icons/certificate-solid.svg";
import { capitalize } from "../utils";

export const BadgeBlock = (editor: Editor, label: string) => {
  const bm = editor.BlockManager;
  bm.add("badge", {
    label: `
            ${certificateIcon}
            <div>${label}</div>
        `,
    category: "Components (Bootstrap)",
    content: {
      type: "badge",
      content: "New!",
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

  domc.addType("badge", {
    extend: "text",
    model: {
      defaults: Object.assign({}, textModel.prototype.defaults, {
        "custom-name": "Badge",
        tagName: "span",
        classes: ["badge"],
        traits: [
          {
            type: "class_select",
            options: [
              { value: "", name: "None" },
              ...contexts.map(function (v) {
                return { value: "bg-" + v, name: capitalize(v) };
              }),
            ],
            label: "Context",
          },
          {
            type: "class_select",
            options: [
              { value: "", name: "Default" },
              { value: "rounded-pill", name: "Pill" },
            ],
            label: "Shape",
          },
        ].concat(textModel.prototype.defaults.traits),
      }),
    },
    isComponent(el) {
      if (el && el.classList && el.classList.contains("badge")) {
        return { type: "badge" };
      }
    },
    view: textView,
  });
};
