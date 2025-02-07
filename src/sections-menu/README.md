# Extending sections menu functionality in AdminApp

The sections menu is a scrollspy located on the top left side of the screen when editing or creating a content item (the sections menu can bee seen in an Event item). By default sections menu is visible only when there are 5 or more field sections. This number can be changed by providing a simple configuration. In order to do so you need to edit the **config.json** file in the **AdminApp** folder.

You need to add a new property **editSettings** of type object to the json object in the "config.json" file, on the root level.

```json
{
  "editorSettings": { /* omitted for brevity */ },
  "editSettings": {}
}
```

Then you need to add another property **sectionsMenuMinColumnsNumber** of type number to the **editSettings** object. This property marks the minimum number of columns needed for the sections menu to be visible. For example, if you want the menu to be visible when there are 3 or more sections, the config should look like this:

```json
{
  "editSettings": {
    "sectionsMenuMinColumnsNumber": 3
  }
}
```

NOTE: If you don't provide this configuration, the default value - 5, will be used.
