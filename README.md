# vscatalog README

**vscatalog** is a Visual Studio Code extension that dynamically loads JSON Schemas for the game **Vintage Story**, allowing modders to easily validate their mod configuration files.

⚠️ **Warning**: This extension will overwrite internal JSON schema settings in your VS Code workspace. (/.vscode/settings.json)
Be sure to backup your current settings if you want to preserve them.

## Features

This extension provides:
- 38 JSON Schemas covering key asset types: `entities`, `blocks`, `items`.
- Full support for complex elements like attributes, behaviors, classes, codes, and entity behaviors.
- Automatically loads and applies the JSON Schema catalog from the [VintelliSchemas repository](https://github.com/SirNoName2705/VintelliSchemas).

These schemas help modders ensure their JSON files are properly structured and adhere to the required schema definitions.

## How to Use

Once the extension is installed and activated, the JSON schemas will automatically apply to your mod project based on file paths and structure.

Make sure to organize your mod files into the correct subfolders for proper schema matching. Key folder structures include:

- `**/assets/<modid>/blocktypes/**`
- `**/assets/<modid>/entities/**`
- `**/assets/<modid>/itemtypes/**`

For example, if your mod ID is `mymod`, the correct path for blocktypes would be:
- `assets/mymod/blocktypes/my_block.json`

Certain files, like configuration files, require specific names:
- `assets/mymod/config/weather.json`

Refer to the full schema catalog for more details: [vs_schema_catalog.json](https://raw.githubusercontent.com/SirNoName2705/VintelliSchemas/master/SchemaReleases/current/vs_schema_catalog.json)

## Requirements

- No external dependencies are required.
- Ensure you are using a valid mod folder structure for the schemas to apply properly.

## Extension Settings

This extension does not currently add any custom VS Code settings.

## Known Issues

None at the moment. Please report any issues in the [VintelliSchemas GitHub repository](https://github.com/SirNoName2705/VintelliSchemas).

## Release Notes

### 1.0
- Initial release with automatic loading of the JSON Schema catalog for Vintage Story modding.

## For more information

For additional details about the schemas and manual installation instructions for other IDEs, check the main repository: [VintelliSchemas](https://github.com/SirNoName2705/VintelliSchemas).
