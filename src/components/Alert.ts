import { ComponentManager, Editor } from "grapesjs";
import contexts from "../bootstrap-contexts";
import exclamationIcon from "../icons/exclamation-triangle-solid.svg";
import { capitalize } from "../utils";

export const AlertBlock = (editor: Editor, label: string) => {
  const bm = editor.BlockManager;
  bm.add("alert", {
    label,
    media: exclamationIcon,
    category: "Components (Bootstrap)",
    content: {
      type: "alert",
      content: "This is an alert—check it out!",
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

  domc.addType("alert", {
    extend: "text",
    model: {
      defaults: Object.assign({}, textModel.prototype.defaults, {
        "custom-name": "Alert",
        tagName: "div",
        classes: ["alert"],
        traits: [
          {
            type: "class_select",
            name: "variant",
            options: [
              { value: "", name: "None" },
              ...contexts.map(function (v) {
                return { value: "alert-" + v, name: capitalize(v) };
              }),
            ],
            label: "Variant",
          },
        ].concat(textModel.prototype.defaults.traits),
      }),
    },
    isComponent(el) {
      if (el && el.classList && el.classList.contains("alert")) {
        return { type: "alert" };
      }
    },
    view: textView,
  });
};
