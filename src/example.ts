import grapesjs from "grapesjs";
import bootstrapPlugin, { canvasScripts, canvasStyles } from "./index";

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
    styles: canvasStyles,
    scripts: canvasScripts,
  },
});
