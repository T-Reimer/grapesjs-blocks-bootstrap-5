import { Editor } from "grapesjs";
import Alert, { AlertBlock } from "./components/Alert";
import Badge, { BadgeBlock } from "./components/Badge";
import Button, { ButtonBlock } from "./components/Button";
import ButtonGroup, { ButtonGroupBlock } from "./components/ButtonGroup";
import ButtonToolbar, { ButtonToolbarBlock } from "./components/ButtonToolbar";
import Card, { CardBlock } from "./components/Card";
import Checkbox, { CheckboxBlock } from "./components/Checkbox";
import Collapse, { CollapseBlock } from "./components/Collapse";
import Column, { ColumnBlock } from "./components/Column";
import ColumnBreak, { ColumnBreakBlock } from "./components/ColumnBreak";
import Container, { ContainerBlock } from "./components/Container";
import Default from "./components/Default";
import Dropdown, { DropDownBlock } from "./components/Dropdown";
import FileInput, { FileInputBlock } from "./components/FileInput";
import Form, { FormBlock } from "./components/Form";
import Header, { HeaderBlock } from "./components/Header";
import Image, { ImageBlock } from "./components/Image";
import Input, { InputBlock } from "./components/Input";
import InputGroup, { InputGroupBlock } from "./components/InputGroup";
import Label, { LabelBlock } from "./components/Label";
import Link, { LinkBlock } from "./components/Link";
import MediaObject, { MediaObjectBlock } from "./components/MediaObject";
import Paragraph, { ParagraphBlock } from "./components/Paragraph";
import Radio, { RadioBlock } from "./components/Radio";
import Row, { RowBlock } from "./components/Row";
import Select, { SelectBlock } from "./components/Select";
import Tab from "./components/tabs/Tab";
import TabPane from "./components/tabs/TabPane";
import TabsNavigation, { TabsBlock } from "./components/tabs/TabsNavigation";
import TabsPanes from "./components/tabs/TabsPanes";
import Text, { TextBlock } from "./components/Text";
import Textarea, { TextareaBlock } from "./components/Textarea";
import Embed from "./components/video/Embed";
import Video, { VideoBlock } from "./components/video/Video";
import { PluginConfig } from "./config";

export default (editor: Editor, config: PluginConfig) => {
  const domc = editor.DomComponents;
  const blocks = config.blocks;
  const bm = editor.BlockManager;
  const cats = config.blockCategories;

  const traits = {
    id: {
      name: "id",
      label: config.labels.trait_id,
    },
    for: {
      name: "for",
      label: config.labels.trait_for,
    },
    name: {
      name: "name",
      label: config.labels.trait_name,
    },
    placeholder: {
      name: "placeholder",
      label: config.labels.trait_placeholder,
    },
    value: {
      name: "value",
      label: config.labels.trait_value,
    },
    required: {
      type: "checkbox",
      name: "required",
      label: config.labels.trait_required,
    },
    checked: {
      label: config.labels.trait_checked,
      type: "checkbox",
      name: "checked",
      changeProp: 1,
    },
  };

  if (cats.media) {
    if (blocks.image) {
      ImageBlock(bm, config.labels.image);
      Image(domc);
    }

    if (blocks.video) {
      Embed(domc);
      VideoBlock(bm, config.labels.video);
      Video(domc);
    }
  }

  // Rebuild the default component and add utility settings to it (border, bg, color, etc)
  if (cats.basic) {
    if (blocks.default) {
      Default(domc);
    }

    // Rebuild the text component and add display utility setting
    if (blocks.text) {
      TextBlock(bm, config.labels.text);
      Text(domc);
    }

    // Rebuild the link component with settings for collapse-control
    if (blocks.link) {
      LinkBlock(bm, config.labels.link);
      Link(editor);
    }

    // Basic
    /*if (blocks.list) {
      ListBlock(bm, c.labels.list)
      List(domc);
    }*/

    /*if (blocks.description_list) {
    }*/
  }

  // LAYOUT
  if (cats.layout) {
    if (blocks.container) {
      ContainerBlock(bm, config.labels.container);
      Container(domc);
    }
    if (blocks.row) {
      RowBlock(bm, config.labels.row);
      Row(domc);
    }
    if (blocks.column) {
      ColumnBlock(bm, config.labels.column);
      Column(domc, editor);

      ColumnBreakBlock(bm, config.labels.column_break);
      ColumnBreak(domc);
    }
    // Media object
    if (blocks.media_object) {
      MediaObjectBlock(bm, config.labels.media_object);
      MediaObject(domc);
    }
  }

  // Bootstrap COMPONENTS
  if (cats.components) {
    // Alert
    if (blocks.alert) {
      AlertBlock(bm, config.labels.alert);
      Alert(domc);
    }

    if (blocks.tabs) {
      TabsBlock(editor, config);
      TabsNavigation(domc, config);
      Tab(domc, config);
      TabsPanes(domc, config);
      TabPane(domc, config);
    }

    // Badge
    if (blocks.badge) {
      BadgeBlock(bm, config.labels.badge);
      Badge(domc);
    }

    // Card
    if (blocks.card) {
      CardBlock(bm, config);
      Card(domc, editor);
    }

    // Collapse
    if (blocks.collapse) {
      CollapseBlock(bm, config.labels.collapse);
      Collapse(editor);
    }

    // Dropdown
    if (blocks.dropdown) {
      DropDownBlock(bm, config.labels.dropdown);
      Dropdown(editor);
    }
  }

  // TYPOGRAPHY
  if (cats.typography) {
    if (blocks.header) {
      HeaderBlock(bm, config.labels.header);
      Header(domc);
    }
    if (blocks.paragraph) {
      ParagraphBlock(bm, config.labels.paragraph);
      Paragraph(domc);
    }
  }

  if (cats.forms) {
    if (blocks.form) {
      FormBlock(bm, config.labels.form);
      Form(domc, traits, config);
    }

    if (blocks.input) {
      InputBlock(bm, config.labels.input);
      Input(domc, traits, config);

      FileInputBlock(bm, config.labels.file_input);
      FileInput(domc, traits, config);
    }

    if (blocks.form_group_input) {
      InputGroupBlock(bm, config.labels.form_group_input);
      InputGroup(domc, traits, config);
    }

    if (blocks.textarea) {
      TextareaBlock(bm, config.labels.textarea);
      Textarea(domc, traits, config);
    }

    if (blocks.select) {
      SelectBlock(bm, config.labels.select);
      Select(editor, domc, traits, config);
    }

    if (blocks.checkbox) {
      CheckboxBlock(bm, config.labels.checkbox);
      Checkbox(domc, traits, config);
    }

    if (blocks.radio) {
      RadioBlock(bm, config.labels.radio);
      Radio(domc, traits, config);
    }

    if (blocks.label) {
      LabelBlock(bm, config.labels.label);
      Label(domc, traits, config);
    }

    if (blocks.button) {
      ButtonBlock(bm, config.labels.button);
      Button(domc);
    }

    if (blocks.button_group) {
      ButtonGroupBlock(bm, config.labels.button_group);
      ButtonGroup(domc);
    }

    if (blocks.button_toolbar) {
      ButtonToolbarBlock(bm, config.labels.button_toolbar);
      ButtonToolbar(domc);
    }
  }
};
