import { ComponentManager, Editor } from "grapesjs";
import radioIcon from "../icons/dot-circle-regular.svg";
import { FormFieldTrait, PluginConfig } from "../config";

export const RadioBlock = (editor: Editor, label: string) => {
  const bm = editor.BlockManager;
  bm.add("radio", {
    label,
    media: radioIcon,
    category: "Forms (Bootstrap)",
    content: `
        <div class="form-check">
          <input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios1" value="option1" checked>
          <label class="form-check-label" for="exampleRadios1">
            Default radio
          </label>
        </div>
      `,
  });
};

export default (
  dc: ComponentManager,
  traits: FormFieldTrait,
  config: PluginConfig
) => {
  const checkType = dc.getType("checkbox");
  if (!checkType) {
    return;
  }

  // RADIO
  dc.addType("radio", {
    extend: "checkbox",
    model: {
      defaults: {
        ...checkType.model.prototype.defaults,
        "custom-name": config.labels.radio,
        attributes: { type: "radio" },
      },
    },
    isComponent(element) {
      const el = element as HTMLInputElement;
      if (el.tagName === "INPUT" && el.type === "radio") {
        return { type: "radio" };
      }
    },
    view: checkType.view,
  });
};
