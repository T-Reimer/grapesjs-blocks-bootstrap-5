import { ComponentManager, Editor } from "grapesjs";
import labelIcon from "../icons/label.svg";
import { FormFieldTrait, PluginConfig } from "../config";

export const LabelBlock = (editor: Editor, label: string) => {
  const bm = editor.BlockManager;
  bm.add("label", {
    label,
    media: labelIcon,
    category: "Forms (Bootstrap)",
    content: "<label>Label</label>",
  });
};

export default (
  dc: ComponentManager,
  traits: FormFieldTrait,
  config: PluginConfig
) => {
  const textType = dc.getType("text");
  if (!textType) {
    return;
  }
  const textModel = textType.model;
  const textView = textType.view;

  dc.addType("label", {
    extend: "text",
    model: {
      defaults: {
        ...textModel.prototype.defaults,
        "custom-name": config.labels.label,
        tagName: "label",
        traits: [traits.for],
      },
    },
    isComponent(el) {
      if (el.tagName == "LABEL") {
        return { type: "label" };
      }
    },
    view: textView,
  });
};
