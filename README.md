# UNO: Unified Narrative Operator

UNO is an MCP server that provides tools for analyzing and enhancing narrative text. Based on a set of advanced literary enhancement techniques, UNO can transform story pages through several enhancement phases.

## Features

UNO provides three main tools:

1. **analyze_text** - Analyzes a story page and generates a detailed report with insights about:
   - Contextual assessment (narrative position, character focus, scene type, mood)
   - Enhancement recommendations
   - Repetition patterns

2. **enhance_text** - Enhances a story page using all enhancement techniques to meet a specified expansion target (defaults to 200%).

3. **custom_enhance_text** - Allows selective application of enhancement techniques with customizable options.

## Enhancement Techniques

UNO implements five sequential enhancement techniques:

1. **Golden Shadow Enhancement** - Develops underdeveloped elements such as characters mentioned briefly or plot elements that need expansion.

2. **Environmental Expansion** - Enriches settings and atmosphere with sensory details and focuses on insignificant objects to provide exceptional detail.

3. **Action Scene Enhancement** - Intensifies action scenes through time manipulation, sensory details, and environmental interaction.

4. **Prose Smoothing** - Improves flow and rhythm by adding transitions and varying sentence structure.

5. **Repetition Elimination** - Reduces repetitive language while preserving the author's voice and intended meaning.

## Installation

1. Clone this repository
2. Run `npm install` to install dependencies
3. Run `npm run build` to build the TypeScript files

## MCP Settings

To use UNO with Claude or other MCP-compatible systems, add the following to your MCP settings:

```json
{
  "mcpServers": {
    "uno": {
      "command": "node",
      "args": ["path/to/uno-mcp/dist/index.js"],
      "disabled": false,
      "autoApprove": []
    }
  }
}
```

For Claude Desktop, this would be in `C:\Users\[username]\AppData\Roaming\Claude\claude_desktop_config.json` on Windows.

## Usage Examples

### Analyzing Text

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

### Enhancing Text

```
<use_mcp_tool>
<server_name>uno</server_name>
<tool_name>enhance_text</tool_name>
<arguments>
{
  "text": "Your story text here...",
  "expansionTarget": 200
}
</arguments>
</use_mcp_tool>
```

### Custom Enhancement

```
<use_mcp_tool>
<server_name>uno</server_name>
<tool_name>custom_enhance_text</tool_name>
<arguments>
{
  "text": "Your story text here...",
  "expansionTarget": 150,
  "enableGoldenShadow": true,
  "enableEnvironmental": true,
  "enableActionScene": false,
  "enableProseSmoother": true,
  "enableRepetitionElimination": true
}
</arguments>
</use_mcp_tool>
```

## Implementation Notes

This implementation uses simplified heuristics and pattern matching to demonstrate the concept. A production version would employ more sophisticated NLP techniques for deeper text understanding and more contextually appropriate enhancements.

## License

ISC
