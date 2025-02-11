import { elHasClass } from "../utils";
import fileInputIcon from "../icons/file-input.svg";
import { ComponentManager, Editor } from "grapesjs";
import { FormFieldTrait, PluginConfig } from "../config";

export const FileInputBlock = (editor: Editor, label: string) => {
  const bm = editor.BlockManager;
  bm.add("file-input", {
    label,
    media: fileInputIcon,
    category: "Forms (Bootstrap)",
    content: `<input type="file" name="file" class="form-control-file" id="exampleFormControlFile1">`,
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
  const type = "file-input";

  dc.addType(type, {
    model: {
      defaults: {
        ...defaultModel.prototype.defaults,
        "custom-name": config.labels.input,
        tagName: "input",
        draggable: "form .mb-3",
        droppable: false,
        traits: [
          traits.name,
          traits.required,
          {
            type: "checkbox",
            label: config.labels.trait_multiple,
            name: "multiple",
          },
        ],
      },
    },
    isComponent(el) {
      if (el.tagName === "INPUT" && elHasClass(el, "form-control-file")) {
        return { type };
      }
    },
    view: defaultView,
  });
};
