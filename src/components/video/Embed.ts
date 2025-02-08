import { ComponentManager } from "grapesjs";

export default (domComponent: ComponentManager) => {
  const src_default =
    "https://download.blender.org/peach/bigbuckbunny_movies/BigBuckBunny_320x180.mp4";
  const defaultType = domComponent.getType("default");
  const model = defaultType.model;
  //   const view = defaultType.view;
  const type = "bs-video";

  domComponent.addType(type, {
    model: {
      defaults: Object.assign({}, model.prototype.defaults, {
        "custom-name": "Embed",
        tagName: "div",
        resizable: false,
        droppable: false,
        classes: ["ratio", "ratio-16x9"],
        traits: [
          {
            type: "class_select",
            options: [
              { value: "ratio-21x9", name: "21:9" },
              { value: "ratio-16x9", name: "16:9" },
              { value: "ratio-4x3", name: "4:3" },
              { value: "ratio-1x1", name: "1:1" },
            ],
            label: "Aspect Ratio",
          },
        ].concat(model.prototype.defaults.traits),
      }),
    },
    isComponent: function (el) {
      if (el && el.className === "ratio") {
        return { type: type };
      }
    },
    view: {
      init() {
        const props = ["Aspect Ratio"];
        const reactTo = props.map((prop) => `change:${prop}`).join(" ");
        this.listenTo(this.model, reactTo, this.render);
        const comps = this.model.components();
        // Add a basic template if it's not yet initialized
        if (!comps.length) {
          comps.add(
            `<iframe class="embed-responsive-item" src="${src_default}"></iframe>`
          );
        }
      },
    },
  });
};
