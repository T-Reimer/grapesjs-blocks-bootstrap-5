import { ComponentManager, Editor } from "grapesjs";
import imageIcon from "../icons/image-solid.svg";

export const ImageBlock = (editor: Editor, label: string) => {
  const bm = editor.BlockManager;
  bm.add("bs-image", {
    label,
    media: imageIcon,
    category: "Media (Bootstrap)",
    content: {
      type: "bs-image",
    },
  });
};

export default (domComponent: ComponentManager) => {
  const img_src_default = "https://dummyimage.com/800x500/999/222";
  const imageType = domComponent.getType("image");
  if (!imageType) {
    return;
  }
  const model = imageType.model;
  const view = imageType.view;
  const type = "bs-image";

  domComponent.addType(type, {
    extend: "image",
    model: {
      defaults: Object.assign({}, model.prototype.defaults, {
        "custom-name": "Image",
        tagName: "img",
        resizable: 1,
        attributes: {
          src: img_src_default,
        },
        classes: ["img-fluid"],
        traits: [
          {
            type: "text",
            label: "Source (URL)",
            name: "src",
          },
          {
            type: "text",
            label: "Alternate text",
            name: "alt",
          },
        ].concat(model.prototype.defaults.traits),
      }),
    },
    isComponent: function (el) {
      if (el && el.tagName === "IMG") {
        return { type: type };
      }
    },
    view: view,
  });
};
