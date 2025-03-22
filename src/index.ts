#!/usr/bin/env node
import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ErrorCode,
  McpError,
  ListToolsRequestSchema,
} from '@modelcontextprotocol/sdk/types.js';

import { TextAnalyzer } from './analyzer.js';
import { EnhancementProcessor } from './enhancer.js';

// Define the input schema for our tools
const textInputSchema = {
  type: 'object',
  properties: {
    text: {
      type: 'string',
      description: 'The story page text to analyze or enhance',
    }
  },
  required: ['text']
};

const enhanceTextInputSchema = {
  type: 'object',
  properties: {
    text: {
      type: 'string',
      description: 'The story page text to enhance',
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
      description: 'The story page text to enhance',
    },
    expansionTarget: {
      type: 'number',
      description: 'Target expansion percentage (default: 200)',
      minimum: 100,
      maximum: 500
    },
    enableGoldenShadow: {
      type: 'boolean',
      description: 'Enable Golden Shadow enhancement',
      default: true
    },
    enableEnvironmental: {
      type: 'boolean',
      description: 'Enable Environmental expansion',
      default: true
    },
    enableActionScene: {
      type: 'boolean',
      description: 'Enable Action Scene enhancement',
      default: true
    },
    enableProseSmoother: {
      type: 'boolean',
      description: 'Enable Prose Smoothing',
      default: true
    },
    enableRepetitionElimination: {
      type: 'boolean',
      description: 'Enable Repetition Elimination',
      default: true
    }
  },
  required: ['text']
};

class UnoServer {
  private server: Server;
  private analyzer: TextAnalyzer;
  private enhancer: EnhancementProcessor;

  constructor() {
    this.server = new Server(
      {
        name: 'uno-mcp',
        version: '1.0.0',
      },
      {
        capabilities: {
          tools: {},
        },
      }
    );

    this.analyzer = new TextAnalyzer();
    this.enhancer = new EnhancementProcessor(this.analyzer);
    
    this.setupToolHandlers();
    
    // Error handling
    this.server.onerror = (error: any) => console.error('[UNO MCP Error]', error);
    process.on('SIGINT', async (): Promise<void> => {
      await this.server.close();
      process.exit(0);
    });
  }

  private setupToolHandlers() {
    this.server.setRequestHandler(ListToolsRequestSchema, async (): Promise<any> => ({
      tools: [
        {
          name: 'analyze_text',
          description: 'Analyzes a story page and generates a report with insights',
          inputSchema: textInputSchema
        },
        {
          name: 'enhance_text',
          description: 'Enhances a story page using all techniques to meet expansion target',
          inputSchema: enhanceTextInputSchema
        },
        {
          name: 'custom_enhance_text',
          description: 'Enhances a story page using selected techniques',
          inputSchema: customEnhanceTextInputSchema
        }
      ],
    }));

    this.server.setRequestHandler(CallToolRequestSchema, async (request: any): Promise<any> => {
      try {
        switch (request.params.name) {
          case 'analyze_text':
            return await this.handleAnalyzeText(request.params.arguments);
          case 'enhance_text':
            return await this.handleEnhanceText(request.params.arguments);
          case 'custom_enhance_text':
            return await this.handleCustomEnhanceText(request.params.arguments);
          default:
            throw new McpError(
              ErrorCode.MethodNotFound,
              `Unknown tool: ${request.params.name}`
            );
        }
      } catch (error) {
        if (error instanceof McpError) {
          throw error;
        }
        throw new McpError(
          ErrorCode.InternalError,
          `Error processing request: ${error instanceof Error ? error.message : String(error)}`
        );
      }
    });
  }

  private async handleAnalyzeText(args: any) {
    if (!args.text || typeof args.text !== 'string') {
      throw new McpError(ErrorCode.InvalidParams, 'Missing or invalid text parameter');
    }

    const report = await this.analyzer.analyzeText(args.text);
    
    return {
      content: [
        {
          type: 'text',
          text: report
        }
      ]
    };
  }

  private async handleEnhanceText(args: any) {
    if (!args.text || typeof args.text !== 'string') {
      throw new McpError(ErrorCode.InvalidParams, 'Missing or invalid text parameter');
    }

    const expansionTarget = args.expansionTarget && typeof args.expansionTarget === 'number' 
      ? args.expansionTarget 
      : 200;
    
    const result = await this.enhancer.enhanceText(args.text, expansionTarget);
    
    return {
      content: [
        {
          type: 'text',
          text: result
        }
      ]
    };
  }

  private async handleCustomEnhanceText(args: any) {
    if (!args.text || typeof args.text !== 'string') {
      throw new McpError(ErrorCode.InvalidParams, 'Missing or invalid text parameter');
    }

    const expansionTarget = args.expansionTarget && typeof args.expansionTarget === 'number' 
      ? args.expansionTarget 
      : 200;
    
    const options = {
      enableGoldenShadow: args.enableGoldenShadow !== false,
      enableEnvironmental: args.enableEnvironmental !== false,
      enableActionScene: args.enableActionScene !== false, 
      enableProseSmoother: args.enableProseSmoother !== false,
      enableRepetitionElimination: args.enableRepetitionElimination !== false
    };
    
    const result = await this.enhancer.customEnhanceText(args.text, expansionTarget, options);
    
    return {
      content: [
        {
          type: 'text',
          text: result
        }
      ]
    };
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
