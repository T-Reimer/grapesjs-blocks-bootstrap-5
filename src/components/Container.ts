import { ComponentManager, Editor } from "grapesjs";
import windowIcon from "../icons/window-maximize-solid.svg";

export const ContainerBlock = (editor: Editor, label: string) => {
  const bm = editor.BlockManager;
  bm.add("container", {
    label,
    media: windowIcon,
    category: "Layout (Bootstrap)",
    content: {
      type: "container",
      classes: ["container"],
    },
  });
};

export default (domc: ComponentManager) => {
  const defaultType = domc.getType("default");
  const defaultModel = defaultType.model;
  const defaultView = defaultType.view;

  domc.addType("container", {
    model: {
      defaults: Object.assign({}, defaultModel.prototype.defaults, {
        "custom-name": "Container",
        tagName: "div",
        droppable: true,
        traits: [
          {
            type: "class_select",
            name: "width_type",
            options: [
              { value: "container", name: "Fixed" },
              { value: "container-fluid", name: "Fluid" },
            ],
            label: "Width",
          },
        ].concat(defaultModel.prototype.defaults.traits),
      }),
    },
    isComponent(el) {
      if (
        el &&
        el.classList &&
        (el.classList.contains("container") ||
          el.classList.contains("container-fluid"))
      ) {
        return { type: "container" };
      }
    },
    view: defaultView,
  });
};
