import { ComponentManager, Editor } from "grapesjs";
import videoIcon from "../../icons/youtube-brands.svg";

export const VideoBlock = (editor: Editor, label: string) => {
  const bm = editor.BlockManager;
  bm.add("bs-video", {
    label,
    media: videoIcon,
    category: "Media (Bootstrap)",
    content: {
      type: "bs-video",
    },
  });
};

export default (domComponent: ComponentManager) => {
  const videoType = domComponent.getType("video");
  if (!videoType) {
    return;
  }

  const model = videoType.model;
  const view = videoType.view;
  const type = "bs-embed-responsive";

  domComponent.addType(type, {
    extend: "video",
    model: {
      defaults: Object.assign({}, model.prototype.defaults, {
        "custom-name": "Video",
        resizable: false,
        droppable: false,
        draggable: false,
        copyable: false,
        provider: "so",
        classes: ["embed-responsive-item"],
      }),
    },
    isComponent: function (element) {
      const el = element as HTMLVideoElement | HTMLIFrameElement;

      if (el && el.className === "embed-responsive-item") {
        var result: {
          provider: string;
          type: string;
          src?: string;
        } = {
          provider: "so",
          type: type,
        };
        var isYtProv = /youtube\.com\/embed/.test(el.src);
        var isYtncProv = /youtube-nocookie\.com\/embed/.test(el.src);
        var isViProv = /player\.vimeo\.com\/video/.test(el.src);
        var isExtProv = isYtProv || isYtncProv || isViProv;

        if (el.tagName == "VIDEO" || (el.tagName == "IFRAME" && isExtProv)) {
          if (el.src) result.src = el.src;
          if (isExtProv) {
            if (isYtProv) result.provider = "yt";
            else if (isYtncProv) result.provider = "ytnc";
            else if (isViProv) result.provider = "vi";
          }
        }
        return result;
      }
    },
    view: view,
  });
};
