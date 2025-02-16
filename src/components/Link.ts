/*
known issues:
- BS dropdown JS isn't attached if you remove the existing toggle and add a new one
*/

import { Editor, Selector } from "grapesjs";
import linkIcon from "../icons/link-solid.svg";

export const LinkBlock = (editor: Editor, label: string) => {
  const bm = editor.BlockManager;
  bm.add("link", {
    label,
    media: linkIcon,
    category: "Basic (Bootstrap)",
    content: {
      type: "link",
      content: "Link text",
    },
  });
};

export default (editor: Editor) => {
  const comps = editor.DomComponents;
  const textType = comps.getType("text");
  if (!textType) {
    return;
  }
  const textModel = textType.model;

  const linkType = comps.getType("link");
  if (!linkType) {
    return;
  }
  const linkView = linkType.view;

  comps.addType("link", {
    extend: "text",
    model: {
      defaults: Object.assign({}, textModel.prototype.defaults, {
        "custom-name": "Link",
        tagName: "a",
        droppable: true,
        editable: true,
        traits: [
          {
            type: "text",
            label: "Href",
            name: "href",
            placeholder: "https://www.grapesjs.com",
          },
          {
            type: "select",
            options: [
              { value: "", name: "This window" },
              { value: "_blank", name: "New window" },
            ],
            label: "Target",
            name: "target",
          },
          {
            type: "select",
            options: [
              { value: "", name: "None" },
              { value: "button", name: "Self" },
              { value: "collapse", name: "Collapse" },
              { value: "dropdown", name: "Dropdown" },
            ],
            label: "Toggles",
            name: "data-bs-toggle",
            changeProp: 1,
          },
        ].concat(textModel.prototype.defaults.traits),
      }),
      init2() {
        //textModel.prototype.init.call(this);
        this.listenTo(this, "change:data-bs-toggle", this.setupToggle);
        this.listenTo(this, "change:attributes", this.setupToggle); // for when href changes
      },
      setupToggle(
        a: any,
        b: any,
        options: { ignore?: boolean; force?: boolean } = {}
      ) {
        // TODO this should be in the dropdown comp and not the link comp
        if (options.ignore === true && options.force !== true) {
          return;
        }
        console.log("setup toggle");
        const attrs = this.getAttributes();
        const href = attrs.href;
        // old attributes are not removed from DOM even if deleted...
        delete attrs["data-bs-toggle"];
        delete attrs["aria-expanded"];
        delete attrs["aria-controls"];
        delete attrs["aria-haspopup"];
        if (href && href.length > 0 && href.match(/^#/)) {
          console.log("link has href");
          // find the el where id == link href
          const els = this.em
            .get("Editor")
            .DomComponents.getWrapper()
            .find(href);
          if (els.length > 0) {
            console.log("referenced el found");
            const el = els[0]; // should only be one el with this ID
            const el_attrs = el.getAttributes();
            //delete el_attrs['aria-labelledby'];
            const el_classes = el_attrs.class;
            if (el_classes) {
              console.log("el has classes");
              const el_classes_list = el_classes.split(" ");
              const includes = ["collapse", "dropdown-menu"];
              const intersection = el_classes_list.filter((x: string) =>
                includes.includes(x)
              );

              if (intersection.length) {
                console.log("link data-bs-toggle matches el class");
                switch (intersection[0]) {
                  case "collapse":
                    attrs["data-bs-toggle"] = "collapse";
                    break;
                }
                attrs["aria-expanded"] = el_classes_list.includes("show");
                if (intersection[0] === "collapse") {
                  attrs["aria-controls"] = href.substring(1);
                }
              }
            }
          }
        }
        this.set("attributes", attrs, { ignore: true } as any);
      },
      classesChanged() {
        console.log("classes changed");
        if (this.attributes.type === "link") {
          if (
            this.attributes.classes &&
            this.attributes.classes.filter(function (cls: Selector) {
              return cls.id === "btn";
            }).length > 0
          ) {
            this.changeType("button");
          }
        }
      },
    },
    isComponent(el) {
      if (el && el.tagName && el.tagName === "A") {
        return { type: "link" };
      }
    },
    view: linkView,
  });
};
