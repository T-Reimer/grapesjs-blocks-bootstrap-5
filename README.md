# GrapesJS Bootstrap v5 Blocks Plugin

[![npm](https://img.shields.io/npm/v/@toiyabe/grapesjs-blocks-bootstrap-5.svg)](https://www.npmjs.com/package/@toiyabe/grapesjs-blocks-bootstrap-5)

This is a Bootstrap 5 blocks plugin for GrapesJS that is derived from the [Bootstrap 4 plugin](https://github.com/kaoz70/grapesjs-blocks-bootstrap4)
from [Miguel Suarez](https://github.com/kaoz70) and [Bootstrap 5 plugin](https://github.com/MoonriseSoftwareCalifornia/grapesjs-blocks-bootstrap5) from [Eric Dean Kauffman](https://github.com/toiyabe)

Thanks to [Abi Rana](https://hashnode.com/@abirana) for the exellent summary of class changes between Bootstrap 4 and 5 in the article: "[All the class name changes migrating from Bootstrap 4 to Bootstrap 5](https://blog.abirana.com/how-to-migrate-convert-bootstra-4-to-bootstrap-5)" (March 11, 2021).

## Summary

- Plugin name: `@treimer/grapesjs-blocks-bootstrap-5`
- Components (see Options for list of Blocks)
  - Layout
    - `container`
    - `row`
    - `column`
    - `column_break`
    - `media_object`
    - `media_body`
  - Components
    - `alert`
    - `tabs`
    - `badge`
    - `card`
    - `card_container`
    - `collapse`
    - `dropdown`
    - `dropdown_menu`
  - Typography
    - `text`
    - `header`
    - `paragraph`
  - Media
    - `image`
    - `video`
  - Forms
    - `form`
    - `button`
    - `button_group`
    - `button_toolbar`
    - `input`
    - `input_group`
    - `form_group_input`
    - `textarea`
    - `checkbox`
    - `radio`

## Options

```js
{
  blocks: {
    ...
  }
  blockCategories: {
    ...
  }
  labels: {
    ...
  }
  formPredefinedActions: null,
  optionsStringSeparator: '::'
}
```

### Blocks

| Option             | Description                                                                     | Default |
| ------------------ | ------------------------------------------------------------------------------- | ------- |
| `default`          | Rebuild default component with utility settings                                 | true    |
| `text`             | Rebuild text component to re-inherit from default                               | true    |
| `link`             | Rebuild link component to re-inherit from default and give toggle setting       | true    |
| `image`            | Rebuild image component to re-inherit from default                              | true    |
| `video`            | Rebuild video component to re-inherit from default                              | true    |
| `container`        | Container (fixed/fluid)                                                         | true    |
| `row`              | Row                                                                             | true    |
| `column`           | Columns of all sizes                                                            | true    |
| `column_break`     | Column-break (`div.w-100`)                                                      | true    |
| `media_object`     | Media object                                                                    | true    |
| `alert`            |                                                                                 | true    |
| `tabs`             |                                                                                 | true    |
| `badge`            |                                                                                 | true    |
| `card`             | Card with settings for images, image overlay, header, body, & footer components | true    |
| `card_container`   | Layouts: group, deck, columns                                                   | true    |
| `collapse`         | Collapse component that can be toggled via link component                       | true    |
| `dropdown`         | Dropdown                                                                        | true    |
| `header`           | H1-H6                                                                           | true    |
| `paragraph`        | P tag with "lead" setting                                                       | true    |
| `form`             |                                                                                 | true    |
| `button`           |                                                                                 | true    |
| `button_group`     |                                                                                 | true    |
| `button_toolbar`   |                                                                                 | true    |
| `input`            |                                                                                 | true    |
| `input_group`      |                                                                                 | true    |
| `form_group_input` |                                                                                 | true    |
| `textarea`         |                                                                                 | true    |
| `checkbox`         |                                                                                 | true    |
| `radio`            |                                                                                 | true    |

### Block Categories

These are the different categories of blocks as they are grouped in the Blocks sidebar panel. Set a value to false exclude entire groups of blocks (as well as the associated components).

| Option       | Description                                         | Default |
| ------------ | --------------------------------------------------- | ------- |
| `layout`     | Container, row, col, col-break, media object        | true    |
| `components` | _Bootstrap_'s Components--alert, button, card, etc. | true    |
| `typography` | Text, header, paragraph, etc.                       | true    |
| `basic`      | Link, image, etc.                                   | true    |
| `forms`      | Form, input, textarea, etc.                         | true    |

### Labels

Same keys as Blocks, but value is the label for the block.

| Option   | Description | Default  |
| -------- | ----------- | -------- |
| `text`   |             | 'Text'   |
| `header` |             | 'Header' |

etc.

### Other

| Option                   | Description                                                                                                                                                                               | Default |
| ------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- |
| `gridDevices`            | Add devices based on BS grid breakpoints                                                                                                                                                  | true    |
| `gridDevicesPanel`       | Build a panel in the top-left corner with device buttons (use with editor `showDevices`=`false`)                                                                                          | false   |
| `formPredefinedActions`  | Pass a list of predefined form actions to generate a select menu: [{name: 'Contact', value: '/contact'}, ...], if no list is passed an input box to add the action is shown               | null    |
| `optionsStringSeparator` | Pass a string to identify the separator of values and labels of the select options: optionValue::optionLabel. This setting WILL BE overridden by the gjs-preset-webpage plugin if enabled | '::'    |

## Download

- NPM
  - `npm i @treimer/grapesjs-blocks-bootstrap-5`
- GIT
  - `git clone https://github.com/MoonriseSoftwareCalifornia/grapesjs-blocks-bootstrap5.git

## Usage

```html
<link
  href="https://unpkg.com/grapesjs/dist/css/grapes.min.css"
  rel="stylesheet"
/>
<script src="https://unpkg.com/grapesjs"></script>
<script src="path/to/grapesjs-blocks-bootstrap5.min.js"></script>

<div id="gjs"></div>

<script type="text/javascript">
  var editor = grapesjs.init({
      container : '#gjs',
      ...
      plugins: ['grapesjs-blocks-bootstrap5'],
      pluginsOpts: {
        'grapesjs-blocks-bootstrap5': {
          blocks: {
            // ...
          },
          blockCategories: {
            // ...
          },
          labels: {
            // ...
          },
          // ...
        }
      },
      canvas: {
        styles: [
          'https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css'
        ],
        scripts: [
          'https://code.jquery.com/jquery-3.3.1.slim.min.js',
          'https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js',
          'https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.min.js'
        ],
      }
  });
</script>
```

Install dependencies

```sh
$ npm i
```

The plugin relies on GrapesJS via `peerDependencies` so you have to install it manually (without adding it to package.json)

```sh
$ npm i grapesjs --no-save
```

Start the dev server

```sh
$ npm run dev
```

---

### Publishing

Update the version numbers in package.json and package-lock.json. The create a github release. Github actions will publish to npm.

```bash
npm run v:patch
# or
npm run v:minor
```
