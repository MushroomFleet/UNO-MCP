# 🪄 UNO: Unified Narrative Operator

## ✨ Overview

UNO (Unified Narrative Operator) is a magical text enhancement tool that transforms ordinary story content into rich, detailed narratives. Using advanced literary techniques and heuristic analysis, UNO can double the length of your text while preserving the original voice and intent.

Think of UNO as your personal narrative assistant, capable of:
- 📊 Analyzing your text to understand its strengths and weaknesses
- 🌱 Growing underdeveloped story elements
- 🎨 Enriching environmental descriptions
- ⚡ Intensifying action sequences
- 🌊 Smoothing prose flow and rhythm
- 🔄 Eliminating repetitive language

## 🛠️ Features

UNO provides three powerful MCP tools:

### 1. 🔍 `analyze_text`
Performs deep analysis of your story pages and generates a comprehensive report including:
- 📝 Narrative position assessment (beginning, middle, climax, resolution)
- 👤 Character focus identification
- 🎭 Scene type classification
- 🌡️ Mood and tone evaluation
- 📈 Enhancement recommendations for each technique
- 🔄 Repetition pattern detection

### 2. ✨ `enhance_text`
Transforms your text by applying all five enhancement techniques:
- Automatically expands text to meet target length (default: 200%)
- Intelligently applies techniques based on what your text needs most
- Balances expansions across the entire text

### 3. ⚙️ `custom_enhance_text`
Gives you complete control over the enhancement process:
- Choose which enhancement techniques to apply
- Set custom expansion targets (100%-500%)
- Focus on specific aspects of your narrative

## 🌟 Enhancement Techniques

### 1. 👻 Golden Shadow Enhancement
Identifies underdeveloped elements in your story and expands them:
- Develops mentioned but undeveloped characters
- Explores implied but unexplained plot elements
- Surfaces subtext and hidden meanings

### 2. 🏞️ Environmental Expansion
Enriches your settings with immersive details:
- Adds vivid sensory experiences (visual, auditory, tactile, olfactory)
- Creates memorable focus on insignificant objects
- Deepens the atmosphere and mood

### 3. ⚡ Action Scene Enhancement
Transforms action sequences into dynamic, high-intensity experiences:
- Manipulates perceived time (slowing crucial moments)
- Intensifies sensory details during action
- Creates rhythmic alternation between explosive action and momentary stillness
- Makes environments active participants in the action

### 4. 🌊 Prose Smoothing
Improves the flow and rhythm of your writing:
- Enhances transitions between paragraphs
- Varies sentence structure for better readability
- Creates a natural rhythm that pulls readers through the text

### 5. 🔄 Repetition Elimination
Reduces unintentional repetition while preserving style:
- Identifies and replaces repeated words with meaningful alternatives
- Maintains the author's voice and intent
- Distinguishes between intentional and unintentional repetition

## 📋 Installation

### Prerequisites
- Node.js (v14 or higher)
- NPM (v6 or higher)

### Step-by-Step Installation
1. **Clone or download the repository**
   ```bash
   git clone https://github.com/your-username/uno-mcp.git
   cd uno-mcp
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Build the TypeScript files**
   ```bash
   npm run build
   ```

4. **Make the server executable** (skip on Windows)
   ```bash
   chmod +x dist/index.js
   ```

5. **Test the server**
   ```bash
   node test-run.js
   ```
   This will run the server on a sample story and generate three files:
   - `test-analysis.md`: Sample analysis report
   - `test-enhanced.txt`: Sample enhanced text (200%)
   - `test-custom-enhanced.txt`: Sample custom enhancement (150%)

## 🔌 MCP Integration

### Claude Desktop Integration

1. **Edit Claude configuration file**
   - Windows: `C:\Users\[username]\AppData\Roaming\Claude\claude_desktop_config.json`
   - macOS: `~/Library/Application Support/Claude/claude_desktop_config.json`

2. **Add UNO to the MCP servers section**
   ```json
   {
     "mcpServers": {
       "uno": {
         "command": "node",
         "args": ["/absolute/path/to/uno-mcp/dist/index.js"],
         "disabled": false,
         "autoApprove": []
       }
     }
   }
   ```
   Be sure to use the absolute path to your UNO installation.

3. **Restart Claude**
   After saving the configuration, restart Claude to activate the UNO MCP server.

### VS Code Integration

1. **Edit VS Code Claude extension configuration**
   - Windows: `c:\Users\[username]\AppData\Roaming\Code\User\globalStorage\saoudrizwan.claude-dev\settings\cline_mcp_settings.json`
   - macOS: `~/Library/Application Support/Code/User/globalStorage/saoudrizwan.claude-dev/settings/cline_mcp_settings.json`

2. **Add the same configuration** as shown above for Claude Desktop.

3. **Restart VS Code** or reload the window.

## 🚀 Usage Examples

### Analyzing a Story

```
<use_mcp_tool>
<server_name>uno</server_name>
<tool_name>analyze_text</tool_name>
<arguments>
{
  "text": "As Sarah walked into the garden, she noticed the old statue in the corner. It was covered in moss and vines, almost hidden from view. She felt drawn to it somehow."
}
</arguments>
</use_mcp_tool>
```

This will return a detailed analysis report with insights about the narrative position, character focus, enhancement opportunities, and more.

### Enhancing a Story (200% Expansion)

```
<use_mcp_tool>
<server_name>uno</server_name>
<tool_name>enhance_text</tool_name>
<arguments>
{
  "text": "As Sarah walked into the garden, she noticed the old statue in the corner. It was covered in moss and vines, almost hidden from view. She felt drawn to it somehow."
}
</arguments>
</use_mcp_tool>
```

This will return a version of your text that's approximately double the original length, with all five enhancement techniques applied.

### Custom Enhancement

```
<use_mcp_tool>
<server_name>uno</server_name>
<tool_name>custom_enhance_text</tool_name>
<arguments>
{
  "text": "As Sarah walked into the garden, she noticed the old statue in the corner. It was covered in moss and vines, almost hidden from view. She felt drawn to it somehow.",
  "expansionTarget": 150,
  "enableGoldenShadow": true,
  "enableEnvironmental": true,
  "enableActionScene": false,
  "enableProseSmoother": true,
  "enableRepetitionElimination": false
}
</arguments>
</use_mcp_tool>
```

This example applies only Golden Shadow Enhancement, Environmental Expansion, and Prose Smoothing, targeting a 150% expansion.

## ⚡ Integration Use Cases

### 📝 Creative Writing Assistant

```
Can you enhance this scene with more environmental details?

<use_mcp_tool>
<server_name>uno</server_name>
<tool_name>custom_enhance_text</tool_name>
<arguments>
{
  "text": "Jack entered the abandoned warehouse, searching for clues.",
  "expansionTarget": 300,
  "enableEnvironmental": true,
  "enableGoldenShadow": false,
  "enableActionScene": false,
  "enableProseSmoother": false,
  "enableRepetitionElimination": false
}
</arguments>
</use_mcp_tool>
```

### 📚 Writing Coach

```
Let me analyze this paragraph to give you feedback:

<use_mcp_tool>
<server_name>uno</server_name>
<tool_name>analyze_text</tool_name>
<arguments>
{
  "text": "[student's writing sample]"
}
</arguments>
</use_mcp_tool>

Based on the analysis, I recommend focusing on developing your character motivations more clearly.
```

### 🎮 Game Narrative Development

```
Here's a more intense version of your action scene:

<use_mcp_tool>
<server_name>uno</server_name>
<tool_name>custom_enhance_text</tool_name>
<arguments>
{
  "text": "[original action scene]",
  "enableActionScene": true,
  "enableEnvironmental": true,
  "enableGoldenShadow": false,
  "enableProseSmoother": true,
  "enableRepetitionElimination": true
}
</arguments>
</use_mcp_tool>
```

### 📔 Novel Expansion

```
Let me help you expand this chapter:

<use_mcp_tool>
<server_name>uno</server_name>
<tool_name>enhance_text</tool_name>
<arguments>
{
  "text": "[chapter excerpt]",
  "expansionTarget": 180
}
</arguments>
</use_mcp_tool>
```

## 💡 Tips & Tricks

- 🔍 Always start with `analyze_text` to understand what your text needs
- 🎯 For subtle enhancements, use `custom_enhance_text` with a lower expansion target (120-150%)
- 🧩 Break longer texts into smaller sections for processing, then combine the results
- 🔄 Apply Repetition Elimination as the final step when enhancing longer works
- ⚡ Use `enableActionScene: true` only for scenes that contain action elements

## 📄 License

ISC

## 🙏 Acknowledgements

UNO is based on advanced literary enhancement techniques and narrative theory. Special thanks to the storytellers, writers, and narrative theorists whose work inspired this project.

---

⭐ **Made with love by the UNO team** ⭐
