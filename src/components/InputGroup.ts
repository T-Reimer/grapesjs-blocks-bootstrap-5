import { ComponentManager, Editor } from "grapesjs";
import formGroupIcon from "../icons/form-group.svg";
import inputGroupIcon from "../icons/input-group.svg";
import { FormFieldTrait, PluginConfig } from "../config";

export const InputGroupBlock = (editor: Editor, label: string) => {
  const bm = editor.BlockManager;
  bm.add("form_group_input", {
    label,
    media: formGroupIcon,
    category: "Forms (Bootstrap)",
    content: `
      <div class="mb-3">
        <label>Name</label>
        <input name="name" placeholder="Type here your name" class="form-control"/>
      </div>
      `,
  });

  bm.add("input_group", {
    label,
    media: inputGroupIcon,
    category: "Forms (Bootstrap)",
    content: `
      <div class="input-group">
        <div class="input-group-prepend">
          <span class="input-group-text">$</span>
        </div>
        <input name="input1" type="text" class="form-control" aria-label="Amount (to the nearest dollar)">
        <div class="input-group-append">
          <span class="input-group-text">.00</span>
        </div>
      </div>
      `,
  });
};

export default (
  dc: ComponentManager,
  traits: FormFieldTrait,
  config: PluginConfig
) => {
  const defaultType = dc.getType("default");
  const defaultModel = defaultType.model;
  const defaultView = defaultType.view;

  dc.addType("input_group", {
    model: {
      defaults: {
        ...defaultModel.prototype.defaults,
        "custom-name": config.labels.input_group,
        tagName: "div",
        traits: [],
      },
    },
    isComponent(el) {
      if (el && el.classList && el.classList.contains("form_group_input")) {
        return { type: "form_group_input" };
      }
    },
    view: defaultView,
  });
};
