import { ComponentManager, Editor } from "grapesjs";
import { FormFieldTrait, PluginConfig } from "../config";
import checkIcon from "../icons/check-square-solid.svg";

export const CheckboxBlock = (editor: Editor, label: string) => {
  const bm = editor.BlockManager;
  bm.add("checkbox", {
    label,
    media: checkIcon,
    category: "Forms (Bootstrap)",
    content: `
        <div class="form-check">
          <input class="form-check-input" type="checkbox" value="" id="defaultCheck1">
          <label class="form-check-label" for="defaultCheck1">
            Default checkbox
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
  // const defaultType = dc.getType("default");
  // const defaultModel = defaultType.model;
  // const defaultView = defaultType.view;
  const inputType = dc.getType("input");
  if (!inputType) {
    return;
  }
  const inputModel = inputType.model;

  dc.addType("checkbox", {
    model: {
      defaults: {
        ...inputModel.prototype.defaults,
        // "custom-name": config.labels.checkbox_name,
        copyable: false,
        droppable: false,
        attributes: { type: "checkbox" },
        traits: [
          traits.id,
          traits.name,
          traits.value,
          traits.required,
          traits.checked,
        ],
      },

      init() {
        this.listenTo(this, "change:checked", this.handleChecked);
      },

      handleChecked() {
        let checked = this.get("checked");
        let attrs = this.get("attributes");
        if (!attrs) {
          return;
        }
        const view = this.view;

        if (checked) {
          attrs.checked = true;
        } else {
          delete attrs.checked;
        }

        if (view) {
          (view.el as HTMLInputElement).checked = checked;
        }

        this.set("attributes", { ...attrs });
      },
    },
    isComponent(element) {
      const el = element as HTMLInputElement;
      if (el.tagName === "INPUT" && el.type === "checkbox") {
        return { type: "checkbox" };
      }
    },
    view: {
      events: {
        // @ts-ignore
        click: "handleClick",
      },

      handleClick(e: any) {
        e.preventDefault();
      },
    },
  });
};
