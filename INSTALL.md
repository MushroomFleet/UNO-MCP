# UNO MCP Server Installation Guide

## Overview

The UNO (Unified Narrative Operator) MCP server provides tools for analyzing and enhancing narrative text. This guide will walk you through the installation process and show you how to add it to your Claude MCP configuration.

## Prerequisites

- Node.js (v14 or higher)
- NPM (v6 or higher)

## Installation Steps

1. **Clone or download the UNO MCP server:**
   ```
   git clone <repository-url>
   cd uno-mcp
   ```
   Or use the files you already have in the `uno-mcp` directory.

2. **Install dependencies:**
   ```
   npm install
   ```

3. **Build the server:**
   ```
   npm run build
   ```
   This will compile the TypeScript files to JavaScript in the `dist` directory.

4. **Make the server executable:**
   ```
   chmod +x dist/index.js
   ```
   (Skip this step on Windows)

5. **Test the server:**
   ```
   node test-run.js
   ```
   This will run tests on a sample story to ensure the server is working correctly.

## Adding to Claude Desktop

To add UNO to Claude Desktop, you need to modify the MCP settings configuration file:

### Windows:
Edit the file at `C:\Users\[username]\AppData\Roaming\Claude\claude_desktop_config.json` (or similar path depending on your Claude installation).

### macOS:
Edit the file at `~/Library/Application Support/Claude/claude_desktop_config.json`.

### Configuration
Add the UNO server to the `mcpServers` section of the configuration file:

```json
{
  "mcpServers": {
    "uno": {
      "command": "node",
      "args": ["<absolute-path-to-uno-mcp>/dist/index.js"],
      "disabled": false,
      "autoApprove": []
    }
  }
}
```

Replace `<absolute-path-to-uno-mcp>` with the full path to the UNO MCP server directory.

## Adding to Claude in VS Code

For the VS Code extension, edit the configuration file at:
`c:\Users\[username]\AppData\Roaming\Code\User\globalStorage\saoudrizwan.claude-dev\settings\cline_mcp_settings.json`

Use the same configuration format as above.

## Verifying Installation

1. Restart Claude or VS Code after making changes to the configuration files.
2. Check in Claude that the UNO server appears in the "Connected MCP Servers" section of the context.
3. You should see three tools available:
   - `analyze_text`
   - `enhance_text`
   - `custom_enhance_text`

## Usage

Once installed, you can use UNO tools in Claude with commands like:

```
<use_mcp_tool>
<server_name>uno</server_name>
<tool_name>analyze_text</tool_name>
<arguments>
{
  "text": "Your story text here..."
}
</arguments>
</use_mcp_tool>
```

See the README.md for more detailed usage examples and capabilities.

## Troubleshooting

- **Claude doesn't see the server**: Make sure the path in the configuration file is correct and the server is built properly.
- **Permission issues**: Ensure the Node.js executable has permission to run the server script.
- **Errors in enhancement**: The server uses heuristic approaches that may sometimes produce unexpected results. Adjust your input text or use the custom_enhance_text tool with specific options.

If you encounter any issues, check the Claude logs or run the server manually to see any error output.
