import { ComponentManager, Editor } from "grapesjs";
import textareaIcon from "../icons/textarea.svg";
import { FormFieldTrait, PluginConfig } from "../config";

export const TextareaBlock = (editor: Editor, label: string) => {
  const bm = editor.BlockManager;
  bm.add("textarea", {
    label,
    media: textareaIcon,
    category: "Forms (Bootstrap)",
    content: '<textarea name="textarea1" class="form-control"></textarea>',
  });
};

export default (
  dc: ComponentManager,
  traits: FormFieldTrait,
  config: PluginConfig
) => {
  const defaultType = dc.getType("default");
  const inputType = dc.getType("input");
  if (!defaultType || !inputType) {
    return;
  }
  const defaultView = defaultType.view;
  const inputModel = inputType.model;

  // TEXTAREA
  dc.addType("textarea", {
    extend: "input",
    model: {
      defaults: {
        ...inputModel.prototype.defaults,
        "custom-name": config.labels.textarea,
        tagName: "textarea",
        traits: [traits.name, traits.placeholder, traits.required],
      },
    },
    isComponent(el) {
      if (el.tagName === "TEXTAREA") {
        return { type: "textarea" };
      }
    },
    view: defaultView,
  });
};
