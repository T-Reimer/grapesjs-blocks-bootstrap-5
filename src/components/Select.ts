import { ComponentManager, Editor } from "grapesjs";
import selectIcon from "../icons/select-input.svg";
import { FormFieldTrait, PluginConfig } from "../config";

export const SelectBlock = (editor: Editor, label: string) => {
  const bm = editor.BlockManager;
  bm.add("select", {
    label: `
      ${selectIcon}
      <div>${label}</div>`,
    category: "Forms (Bootstrap)",
    content: `<select class="form-control" name="select1">
        ${label ? `<option value="">${label}</option>` : ""}
        <option value="1">${label} 1</option>
        </select>`,
  });
};

export default (
  editor: Editor,
  dc: ComponentManager,
  traits: FormFieldTrait,
  config: PluginConfig
) => {
  const defaultType = dc.getType("default");
  const inputType = dc.getType("input");
  if (!defaultType || !inputType) {
    return;
  }

  // const defaultModel = defaultType.model;
  const inputModel = inputType.model;

  const preventDefaultClick = () => {
    return defaultType.view.extend({
      events: {
        mousedown: "handleClick",
      },

      handleClick(e: any) {
        e.preventDefault();
      },
    });
  };

  // SELECT
  dc.addType("select", {
    model: {
      defaults: {
        ...inputModel.prototype.defaults,
        "custom-name": config.labels.select,
        tagName: "select",
        traits: [
          traits.name,
          {
            label: config.labels.trait_options,
            type: "select-options",
          },
          traits.required,
        ],
      },
    },
    isComponent(el) {
      if (el.tagName === "SELECT") {
        return { type: "select" };
      }
    },
    view: preventDefaultClick(),
  });

  const traitManager = editor.TraitManager;
  traitManager.addType("select-options", {
    events: {
      keyup: "onChange",
    },

    onValueChange: function () {
      const optionsStr = this.model.get("value").trim();
      const options = optionsStr.split("\n");
      const optComps = [];

      for (let i = 0; i < options.length; i++) {
        const optionStr = options[i];
        const option = optionStr.split(config.optionsStringSeparator);
        const opt = {
          tagName: "option",
          attributes: {
            value: "",
          },
          content: "",
        };
        if (option[1]) {
          opt.content = option[1];
          opt.attributes.value = option[0];
        } else {
          opt.content = option[0];
          opt.attributes.value = option[0];
        }
        optComps.push(opt);
      }

      const comps = this.target.get("components");
      if (comps) {
        comps.reset(optComps);
      }
      this?.target?.view?.render();
    },

    getInputEl: function () {
      if (!this.$input) {
        const target = this.target;
        let optionsStr = "";
        const options = target.get("components");
        if (!options) {
          return;
        }

        for (let i = 0; i < options.length; i++) {
          const option = options.models[i];
          const optAttr = option.get("attributes");
          if (!optAttr) {
            continue;
          }
          const optValue = optAttr.value || "";
          optionsStr += `${optValue}${
            config.optionsStringSeparator
          }${option.get("content")}\n`;
        }

        this.$input = document.createElement("textarea") as any;
        (this.$input as any).value = optionsStr;
      }
      return this.$input;
    },
  });
};
