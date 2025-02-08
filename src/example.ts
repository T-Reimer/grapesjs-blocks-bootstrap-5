import grapesjs from "grapesjs";
import bootstrapPlugin from "./index";

export const editor = grapesjs.init({
  height: "100%",
  showOffsets: true,
  noticeOnUnload: false,
  storageManager: { autoload: false },
  container: "#gjs",
  fromElement: true,
  showDevices: false,
  plugins: [bootstrapPlugin],
  pluginsOpts: {
    "grapesjs-blocks-bootstrap-5": {},
  },
  canvas: {
    styles: [
      "https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css",
    ],
    scripts: [
      "https://code.jquery.com/jquery-3.5.1.slim.min.js",
      "https://unpkg.com/@popperjs/core@2",
      "https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js",
    ],
  },
});
