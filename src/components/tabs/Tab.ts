import constants from "./constants";
import { elHasClass } from "../../utils";
import { ComponentManager } from "grapesjs";
import { PluginConfig } from "../../config";

export default (dc: ComponentManager, config: PluginConfig) => {
  const defaultType = dc.getType("default");
  const defaultModel = defaultType.model;
  // const defaultView = defaultType.view;

  const { tabName, navigationSelector } = constants;
  const classId = config.classTab;
  const type = tabName;

  dc.addType(type, {
    model: {
      defaults: {
        ...defaultModel.prototype.defaults,
        name: "Tab",
        tagName: "li",
        copyable: true,
        draggable: navigationSelector,
      },

      init() {
        const classes = this.get("classes");
        if (!classes || classes.pluck("name").indexOf(classId) < 0) {
          this.addClass(classId);
        }
      },
    },
    isComponent(el) {
      if (elHasClass(el, classId)) return { type };
    },

    view: {
      init() {
        const comps = this.model.components();

        // Add a basic template if it's not yet initialized
        if (!comps.length) {
          comps.add(`
              <a class="nav-link active" id="tab-1" data-bs-toggle="tab" href="#tab-pane-1" role="tab" aria-controls="tab" aria-selected="true">Tab</a>
          `);
        }
      },
    },
  });
};
