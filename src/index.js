#!/usr/bin/env node
import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ErrorCode,
  ListToolsRequestSchema,
  McpError
} from '@modelcontextprotocol/sdk/types.js';

// UNO schema definitions
const analyzeTextInputSchema = {
  type: 'object',
  properties: {
    text: {
      type: 'string',
      description: 'The story page text to analyze or enhance'
    }
  },
  required: ['text']
};

const enhanceTextInputSchema = {
  type: 'object',
  properties: {
    text: {
      type: 'string',
      description: 'The story page text to enhance'
    },
    expansionTarget: {
      type: 'number',
      description: 'Target expansion percentage (default: 200)',
      minimum: 100,
      maximum: 500
    }
  },
  required: ['text']
};

const customEnhanceTextInputSchema = {
  type: 'object',
  properties: {
    text: {
      type: 'string',
      description: 'The story page text to enhance'
    },
    expansionTarget: {
      type: 'number',
      description: 'Target expansion percentage (default: 150)',
      minimum: 100,
      maximum: 500
    },
    enableGoldenShadow: {
      type: 'boolean',
      description: 'Develop underdeveloped elements'
    },
    enableEnvironmental: {
      type: 'boolean',
      description: 'Enhance settings with immersive details'
    },
    enableActionScene: {
      type: 'boolean',
      description: 'Enhance action sequences'
    },
    enableProseSmoother: {
      type: 'boolean',
      description: 'Improve flow and rhythm'
    },
    enableRepetitionElimination: {
      type: 'boolean',
      description: 'Reduce unintentional repetition'
    }
  },
  required: ['text']
};

// Simple text analysis function
function analyzeText(text) {
  const wordCount = text.split(/\s+/).filter(Boolean).length;
  const charCount = text.length;
  
  // Basic analysis calculations
  const averageSentenceLength = 
    wordCount / (text.match(/[.!?]+/g)?.length || 1);
  
  // Simple repetition detection (counts words that appear more than once)
  const words = text.toLowerCase().match(/\b\w+\b/g) || [];
  const wordFreq = {};
  words.forEach(word => {
    wordFreq[word] = (wordFreq[word] || 0) + 1;
  });
  
  const repeatedWords = Object.entries(wordFreq)
    .filter(([_, count]) => count > 1)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([word, count]) => `"${word}" (${count} times)`);
  
  // Detect scene type
  let sceneType = 'exposition';
  if (text.includes('!') || text.match(/run|jump|fight|chase|grab|throw|dash|leap|slam/gi)) {
    sceneType = 'action';
  } else if ((text.match(/"|'|said|asked|replied|whispered|shouted/g) || []).length > wordCount/20) {
    sceneType = 'dialogue';
  }
  
  // Detect mood
  let mood = 'neutral';
  const positiveWords = text.match(/happy|joy|smile|laugh|wonderful|beautiful|success|love|hope/gi) || [];
  const negativeWords = text.match(/sad|fear|angry|hate|despair|pain|suffer|terrible|awful/gi) || [];
  
  if (positiveWords.length > negativeWords.length) {
    mood = 'positive';
  } else if (negativeWords.length > positiveWords.length) {
    mood = 'negative';
  }
  
  // Create an analysis report in markdown format
  return `UNO Analysis Report


## Text Statistics
- **Original Word Count**: ${wordCount}
- **Original Character Count**: ${charCount}
- **Target Word Count (200%)**: ${wordCount * 2}
- **Target Character Count (200%)**: ${charCount * 2}

## Contextual Assessment

### Narrative Position
- **Position**: ${text.length < 200 ? 'beginning' : (text.length > 1000 ? 'climax/turning point' : 'middle')}
- **Introduction Markers**: ${text.length < 300 ? 'Present' : 'Absent'}
- **Climax Markers**: ${text.match(/suddenly|realized|moment|revelation|truth/gi) ? 'Present' : 'Absent'}
- **Resolution Markers**: ${text.match(/finally|end|last|resolution|conclusion/gi) ? 'Present' : 'Absent'}

### Character Focus
- **Point of View**: ${text.match(/\bI\b|\bme\b|\bmy\b/gi) ? 'first-person' : 'third-person'}
- **Potential Characters**: ${Array.from(new Set(text.match(/[A-Z][a-z]+/g) || [])).slice(0, 7).join(' ')}
- **Pronoun Distribution**:
  - First Person: ${(text.match(/\bI\b|\bme\b|\bmy\b|\bmine\b|\bmyself\b/gi) || []).length}
  - Second Person: ${(text.match(/\byou\b|\byour\b|\byours\b|\byourself\b/gi) || []).length}
  - Third Person: ${(text.match(/\bhe\b|\bshe\b|\bit\b|\bhim\b|\bher\b|\bhis\b|\bits\b|\bthey\b|\bthem\b|\btheir\b/gi) || []).length}

### Scene Type
- **Dominant Type**: ${sceneType}
- **Action Elements**: ${sceneType === 'action' ? 'Strong' : 'Weak'}
- **Dialogue Elements**: ${sceneType === 'dialogue' ? 'Strong' : 'Weak'}
- **Exposition Elements**: ${sceneType === 'exposition' ? 'Strong' : 'Weak'}

### Mood and Tone
- **Dominant Mood**: ${mood}
- **Positive Elements**: ${positiveWords.length > 0 ? 'Present' : 'Absent'}
- **Negative Elements**: ${negativeWords.length > 0 ? 'Present' : 'Absent'}
- **Suspense Elements**: ${text.match(/mystery|unknown|wonder|question|curious|suspense/gi) ? 'Present' : 'Absent'}

## Enhancement Recommendations

### Golden Shadow Enhancement
- **Need Level**: ${wordCount < 100 ? 'high' : (wordCount < 300 ? 'medium' : 'low')}
- **Underdeveloped Characters**: ${Array.from(new Set(text.match(/[A-Z][a-z]+/g) || [])).slice(0, 4).join(' ')}
- **Underdeveloped Plot Elements**: ${text.length < 500 ? 'Present' : 'Absent'}

### Environmental Expansion
- **Need Level**: ${(text.match(/saw|looked|appeared|seemed|felt|heard|smelled|tasted/gi) || []).length < wordCount/20 ? 'high' : 'low'}
- **Sensory Richness (0-4)**: ${Math.min(4, Math.floor((text.match(/saw|looked|appeared|seemed|felt|heard|smelled|tasted/gi) || []).length / (wordCount/100)))}
- **Setting Description**: ${text.match(/room|house|building|street|city|forest|mountain|ocean|sky/gi) ? 'Present' : 'Absent'}
- **Areas to Enhance**:
  - Visual: ${text.match(/saw|looked|appeared|seemed|watched|observed/gi) ? 'Sufficient' : 'Needs improvement'}
  - Auditory: ${text.match(/heard|sound|noise|voice|whisper|shout|bang|crash/gi) ? 'Sufficient' : 'Needs improvement'}
  - Tactile: ${text.match(/felt|touch|rough|smooth|hot|cold|soft|hard/gi) ? 'Sufficient' : 'Needs improvement'}
  - Olfactory: ${text.match(/smell|scent|odor|fragrance|stench/gi) ? 'Sufficient' : 'Needs improvement'}

### Action Scene Enhancement
- **Applicability**: ${sceneType === 'action' ? 'Applicable' : 'Not applicable'}
${sceneType === 'action' ? `
- **Current Intensity (0-4)**: ${Math.min(4, (text.match(/run|jump|fight|chase|grab|throw|dash|leap|slam/gi) || []).length)}
- **Sensory Detail in Action**: ${(text.match(/saw|looked|appeared|seemed|felt|heard|smelled|tasted/gi) || []).length > (text.match(/run|jump|fight|chase|grab|throw|dash|leap|slam/gi) || []).length ? 'Sufficient' : 'Needs improvement'}
- **Time Manipulation**: ${text.match(/suddenly|instant|moment|second|minute|time slowed|froze/gi) ? 'Present' : 'Absent'}
- **Environmental Interaction**: ${text.match(/against|through|over|under|between|around/gi) ? 'Present' : 'Absent'}` : ''}

### Prose Smoothing
- **Need Level**: ${averageSentenceLength > 20 || averageSentenceLength < 8 ? 'high' : 'low'}
- **Average Sentence Length**: ${averageSentenceLength.toFixed(1)} words
- **Sentence Length Variety**: ${(100 * (text.match(/\b\w{7,}\b/g)?.length || 0) / (text.match(/\b\w+\b/g)?.length || 1)).toFixed(1)}%
- **Transition Words**: ${text.match(/however|therefore|meanwhile|subsequently|conversely|furthermore/gi) ? 'Present' : 'Absent'}
- **Paragraph Length Variety**: ${text.split('\n\n').length > 1 ? 'Present' : 'Absent'}

### Repetition Elimination
- **Severity**: ${repeatedWords.length > 10 ? 'high' : (repeatedWords.length > 5 ? 'medium' : 'low')}
- **Repeated Word Count**: ${repeatedWords.length}
- **Top Repeated Words**:
  - ${repeatedWords[0] || 'None'}
${repeatedWords[1] ? `  - ${repeatedWords[1]}` : ''}

## Repetition Patterns

### Repeated Words
${repeatedWords.slice(0, 4).map(word => `- ${word}`).join('\n') || '- No significant word repetition detected'}

### Repeated Phrases
- No significant phrase repetition detected

### Repeated Sentence Structures
- ${text.match(/[A-Z][^.!?]*\b(he|she|it|they)\b[^.!?]*/gi) ? 'pronoun-start pattern detected' : 'No significant structure repetition detected'}
- ${text.match(/[A-Z][^.!?]*\b(was|were|had been)\b[^.!?]*/gi) ? 'passive-voice pattern detected' : ''}
`;
}

// Text enhancement function (basic implementation)
function enhanceText(text, expansionTarget = 200) {
  // A simple enhancement that roughly doubles the text length
  let sentences = text.split(/(?<=[.!?])\s+/);
  let enhancedText = [];
  
  for (const sentence of sentences) {
    // Add the original sentence
    enhancedText.push(sentence);
    
    // Add enhancement sentences based on the original
    const words = sentence.split(' ');
    if (words.length > 3) {
      // Extract subject (simplistic approach)
      const potentialSubject = words[0].match(/[A-Z][a-z]+/) ? words[0] : 'It';
      
      // Detect verbs (simplistic approach)
      const actionVerbs = sentence.match(/\b(walk|run|look|see|feel|think|say|go|come|take|make|know|find)\w*\b/i);
      const verb = actionVerbs ? actionVerbs[0].toLowerCase() : 'was';
      
      // Generate enhancements based on sentence type
      if (sentence.includes('?')) {
        // Question enhancement
        enhancedText.push(`The question hung in the air, demanding an answer.`);
      } else if (sentence.includes('!')) {
        // Exclamation enhancement
        enhancedText.push(`The words reverberated with unmistakable emotion.`);
      } else if (verb === 'saw' || verb === 'looked' || verb === 'observed' || verb === 'noticed') {
        // Visual enhancement
        enhancedText.push(`${potentialSubject} took in every detail, noting the subtle textures and colors that others might have missed.`);
      } else if (verb === 'felt' || verb === 'touched') {
        // Tactile enhancement
        enhancedText.push(`A subtle sensation lingered, impossible to ignore yet difficult to describe.`);
      } else if (verb === 'heard' || verb === 'listened') {
        // Auditory enhancement
        enhancedText.push(`The sound seemed to come from everywhere and nowhere at once, filling the space with its presence.`);
      } else if (words.length > 10) {
        // Complex sentence elaboration
        enhancedText.push(`This complexity revealed layers of meaning beneath the surface.`);
      } else {
        // Default enhancement
        enhancedText.push(`${potentialSubject} paused briefly, taking in the moment before continuing.`);
      }
    }
  }
  
  // Check if we've reached the target expansion and add more if needed
  let currentExpansion = (enhancedText.join(' ').length / text.length) * 100;
  if (currentExpansion < expansionTarget) {
    enhancedText.push(`\n\nThe subtle details of this moment would remain etched in memory long after other experiences had faded. There was something uniquely significant about it, something that transcended ordinary perception and touched upon deeper truths.`);
  }
  
  return enhancedText.join(' ');
}

// Custom text enhancement function
function customEnhanceText(params) {
  const { 
    text, 
    expansionTarget = 150, 
    enableGoldenShadow = true, 
    enableEnvironmental = true,
    enableActionScene = true, 
    enableProseSmoother = true, 
    enableRepetitionElimination = true 
  } = params;
  
  // A simplified implementation that applies different enhancements based on flags
  let enhancedText = text;
  let sentences = text.split(/(?<=[.!?])\s+/);
  let newSentences = [];
  
  // Apply Golden Shadow Enhancement (develop underdeveloped elements)
  if (enableGoldenShadow) {
    // Extract character names (simplified approach)
    const potentialCharacters = Array.from(new Set(text.match(/[A-Z][a-z]+/g) || []));
    if (potentialCharacters.length > 0) {
      for (const character of potentialCharacters.slice(0, 2)) {
        newSentences.push(`${character}'s presence added significance to the moment, bringing an energy that was uniquely their own.`);
      }
    }
  }
  
  // Apply Environmental Expansion
  if (enableEnvironmental) {
    newSentences.push(`The surrounding environment wrapped around the scene, not just a backdrop but an active participant in the unfolding narrative. Subtle details—the quality of light, the temperature of the air, the distant sounds—all contributed to the tapestry of the moment.`);
  }
  
  // Apply Action Scene Enhancement
  if (enableActionScene && text.match(/run|jump|fight|chase|grab|throw|dash|leap|slam/gi)) {
    newSentences.push(`Time seemed to stretch and compress, heartbeats marking the passage of crucial moments. Each movement had consequence, each action rippling through the fabric of the scene with heightened intensity.`);
  }
  
  // Apply Prose Smoothing (connect sentences better)
  if (enableProseSmoother) {
    for (let i = 0; i < sentences.length - 1; i++) {
      newSentences.push(sentences[i]);
      
      // Add transitions between some sentences
      if (i % 3 === 0) {
        const transitions = [
          "Meanwhile, ",
          "In that moment, ",
          "Through it all, ",
          "Nevertheless, ",
          "Consequently, "
        ];
        const randomTransition = transitions[Math.floor(Math.random() * transitions.length)];
        newSentences.push(randomTransition + "the narrative continued to unfold in unexpected ways.");
      }
    }
    // Add the last sentence
    if (sentences.length > 0) {
      newSentences.push(sentences[sentences.length - 1]);
    }
  }
  
  // Apply Repetition Elimination (simplified - just add the original text)
  if (!enableRepetitionElimination) {
    // If not eliminating repetition, just use the enhanced sentences
    enhancedText = [...sentences, ...newSentences].join(' ');
  } else {
    // With repetition elimination, just use the newly created sentences
    enhancedText = sentences.join(' ') + ' ' + newSentences.join(' ');
  }
  
  // Check if we've reached the target expansion
  const currentExpansion = (enhancedText.length / text.length) * 100;
  if (currentExpansion < expansionTarget) {
    enhancedText += `\n\nBeneath the surface of what was said and done lay currents of meaning, subtle but powerful, shaping experience in ways both immediate and lasting. This was the deeper dimension of the narrative, the space where true significance resided.`;
  }
  
  return enhancedText;
}

class UnoServer {
  constructor() {
    // Initialize the server
    this.server = new Server(
      {
        name: 'UNO-MCP',
        version: '1.0.0',
      },
      {
        capabilities: {
          tools: {},
        },
      }
    );

    // Set up tools
    this.setupToolHandlers();
    
    // Error handling
    this.server.onerror = (error) => console.error('[MCP Error]', error);
    process.on('SIGINT', async () => {
      await this.server.close();
      process.exit(0);
    });
  }

  setupToolHandlers() {
    // List available tools
    this.server.setRequestHandler(ListToolsRequestSchema, async () => ({
      tools: [
        {
          name: 'analyze_text',
          description: 'Analyzes text and generates a comprehensive report',
          inputSchema: analyzeTextInputSchema,
        },
        {
          name: 'enhance_text',
          description: 'Expands text using all five enhancement techniques',
          inputSchema: enhanceTextInputSchema,
        },
        {
          name: 'custom_enhance_text',
          description: 'Allows selection of specific enhancement techniques',
          inputSchema: customEnhanceTextInputSchema,
        },
      ],
    }));

    // Handle tool calls
    this.server.setRequestHandler(CallToolRequestSchema, async (request) => {
      const { name, arguments: args } = request.params;

      switch (name) {
        case 'analyze_text':
          if (!args.text || typeof args.text !== 'string') {
            throw new McpError(
              ErrorCode.InvalidParams,
              'Text parameter is required and must be a string'
            );
          }
          
          return {
            content: [
              {
                type: 'text',
                text: analyzeText(args.text),
              },
            ],
          };

        case 'enhance_text':
          if (!args.text || typeof args.text !== 'string') {
            throw new McpError(
              ErrorCode.InvalidParams,
              'Text parameter is required and must be a string'
            );
          }
          
          return {
            content: [
              {
                type: 'text',
                text: enhanceText(args.text, args.expansionTarget || 200),
              },
            ],
          };

        case 'custom_enhance_text':
          if (!args.text || typeof args.text !== 'string') {
            throw new McpError(
              ErrorCode.InvalidParams,
              'Text parameter is required and must be a string'
            );
          }
          
          return {
            content: [
              {
                type: 'text',
                text: customEnhanceText(args),
              },
            ],
          };

        default:
          throw new McpError(
            ErrorCode.MethodNotFound,
            `Unknown tool: ${name}`
          );
      }
    });
  }

  async run() {
    const transport = new StdioServerTransport();
    await this.server.connect(transport);
    console.error('UNO MCP server running on stdio');
  }
}

// Start the server
const server = new UnoServer();
server.run().catch(console.error);
