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

export interface ComponentsConfig {
  blocks: {
    image: boolean;
    video: boolean;
    default: boolean;
    text: boolean;
    link: boolean;
    container: boolean;
    row: boolean;
    column: boolean;
    column_break: boolean;
    media_object: boolean;
    alert: boolean;
    tabs: boolean;
    badge: boolean;
    card: boolean;
    collapse: boolean;
    dropdown: boolean;
    header: boolean;
    paragraph: boolean;
    form: boolean;
    input: boolean;
    form_group_input: boolean;
    textarea: boolean;
    select: boolean;
    checkbox: boolean;
    radio: boolean;
    label: boolean;
    button: boolean;
    button_group: boolean;
    button_toolbar: boolean;
  };
  blockCategories: {
    media: boolean;
    basic: boolean;
    layout: boolean;
    components: boolean;
    typography: boolean;
    forms: boolean;
  };
  labels: {
    trait_id: string;
    trait_for: string;
    trait_name: string;
    trait_placeholder: string;
    trait_value: string;
    trait_required: string;
    trait_checked: string;
    image: string;
    video: string;
    text: string;
    link: string;
    container: string;
    row: string;
    column: string;
    column_break: string;
    media_object: string;
    alert: string;
    tabs: string;
    badge: string;
    card: string;
    collapse: string;
    dropdown: string;
    header: string;
    paragraph: string;
    form: string;
    input: string;
    file_input: string;
    form_group_input: string;
    textarea: string;
    select: string;
    checkbox: string;
    radio: string;
    label: string;
    button: string;
    button_group: string;
    button_toolbar: string;
  };
}

export default (editor: Editor, config: ComponentsConfig) => {
  const c = config;
  const domc = editor.DomComponents;
  const blocks = c.blocks;
  const bm = editor.BlockManager;
  const cats = c.blockCategories;

  const traits = {
    id: {
      name: "id",
      label: c.labels.trait_id,
    },
    for: {
      name: "for",
      label: c.labels.trait_for,
    },
    name: {
      name: "name",
      label: c.labels.trait_name,
    },
    placeholder: {
      name: "placeholder",
      label: c.labels.trait_placeholder,
    },
    value: {
      name: "value",
      label: c.labels.trait_value,
    },
    required: {
      type: "checkbox",
      name: "required",
      label: c.labels.trait_required,
    },
    checked: {
      label: c.labels.trait_checked,
      type: "checkbox",
      name: "checked",
      changeProp: 1,
    },
  };

  if (cats.media) {
    if (blocks.image) {
      ImageBlock(bm, c.labels.image);
      Image(domc);
    }

    if (blocks.video) {
      Embed(domc);
      VideoBlock(bm, c.labels.video);
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
      TextBlock(bm, c.labels.text);
      Text(domc);
    }

    // Rebuild the link component with settings for collapse-control
    if (blocks.link) {
      LinkBlock(bm, c.labels.link);
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
      ContainerBlock(bm, c.labels.container);
      Container(domc);
    }
    if (blocks.row) {
      RowBlock(bm, c.labels.row);
      Row(domc);
    }
    if (blocks.column) {
      ColumnBlock(bm, c.labels.column);
      Column(domc, editor);

      ColumnBreakBlock(bm, c.labels.column_break);
      ColumnBreak(domc);
    }
    // Media object
    if (blocks.media_object) {
      MediaObjectBlock(bm, c.labels.media_object);
      MediaObject(domc);
    }
  }

  // Bootstrap COMPONENTS
  if (cats.components) {
    // Alert
    if (blocks.alert) {
      AlertBlock(bm, c.labels.alert);
      Alert(domc);
    }

    if (blocks.tabs) {
      TabsBlock(bm, c);
      TabsNavigation(domc, config);
      Tab(domc, config);
      TabsPanes(domc, config);
      TabPane(domc, config);
    }

    // Badge
    if (blocks.badge) {
      BadgeBlock(bm, c.labels.badge);
      Badge(domc);
    }

    // Card
    if (blocks.card) {
      CardBlock(bm, c);
      Card(domc, editor);
    }

    // Collapse
    if (blocks.collapse) {
      CollapseBlock(bm, c.labels.collapse);
      Collapse(editor);
    }

    // Dropdown
    if (blocks.dropdown) {
      DropDownBlock(bm, c.labels.dropdown);
      Dropdown(editor);
    }
  }

  // TYPOGRAPHY
  if (cats.typography) {
    if (blocks.header) {
      HeaderBlock(bm, c.labels.header);
      Header(domc);
    }
    if (blocks.paragraph) {
      ParagraphBlock(bm, c.labels.paragraph);
      Paragraph(domc);
    }
  }

  if (cats.forms) {
    if (blocks.form) {
      FormBlock(bm, c.labels.form);
      Form(domc, traits, config);
    }

    if (blocks.input) {
      InputBlock(bm, c.labels.input);
      Input(domc, traits, config);

      FileInputBlock(bm, c.labels.file_input);
      FileInput(domc, traits, config);
    }

    if (blocks.form_group_input) {
      InputGroupBlock(bm, c.labels.form_group_input);
      InputGroup(domc, traits, config);
    }

    if (blocks.textarea) {
      TextareaBlock(bm, c.labels.textarea);
      Textarea(domc, traits, config);
    }

    if (blocks.select) {
      SelectBlock(bm, c.labels.select);
      Select(editor, domc, traits, config);
    }

    if (blocks.checkbox) {
      CheckboxBlock(bm, c.labels.checkbox);
      Checkbox(domc, traits, config);
    }

    if (blocks.radio) {
      RadioBlock(bm, c.labels.radio);
      Radio(domc, traits, config);
    }

    if (blocks.label) {
      LabelBlock(bm, c.labels.label);
      Label(domc, traits, config);
    }

    if (blocks.button) {
      ButtonBlock(bm, c.labels.button);
      Button(domc);
    }

    if (blocks.button_group) {
      ButtonGroupBlock(bm, c.labels.button_group);
      ButtonGroup(domc);
    }

    if (blocks.button_toolbar) {
      ButtonToolbarBlock(bm, c.labels.button_toolbar);
      ButtonToolbar(domc);
    }
  }
};
