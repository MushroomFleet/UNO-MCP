import { TextAnalyzer } from './analyzer.js';

/**
 * Interface for enhancement options
 */
interface EnhancementOptions {
  enableGoldenShadow: boolean;
  enableEnvironmental: boolean;
  enableActionScene: boolean;
  enableProseSmoother: boolean;
  enableRepetitionElimination: boolean;
}

/**
 * EnhancementProcessor class implements the Enhancement Phase of UNO.
 * It applies enhancement techniques to story text.
 */
export class EnhancementProcessor {
  private analyzer: TextAnalyzer;
  
  constructor(analyzer: TextAnalyzer) {
    this.analyzer = analyzer;
  }
  
  /**
   * Enhances the given text using all enhancement techniques.
   * 
   * @param text The story page text to enhance
   * @param expansionTarget Target expansion percentage (default: 200)
   * @returns Enhanced text
   */
  async enhanceText(text: string, expansionTarget: number = 200): Promise<string> {
    // All enhancement techniques enabled
    const options: EnhancementOptions = {
      enableGoldenShadow: true,
      enableEnvironmental: true,
      enableActionScene: true,
      enableProseSmoother: true,
      enableRepetitionElimination: true
    };
    
    return this.customEnhanceText(text, expansionTarget, options);
  }
  
  /**
   * Enhances the given text using selected enhancement techniques.
   * 
   * @param text The story page text to enhance
   * @param expansionTarget Target expansion percentage (default: 200)
   * @param options Options to enable/disable specific enhancement techniques
   * @returns Enhanced text
   */
  async customEnhanceText(
    text: string, 
    expansionTarget: number = 200,
    options: EnhancementOptions
  ): Promise<string> {
    // First, analyze the text to understand its characteristics
    const analysisReport = await this.analyzer.analyzeText(text);
    
    // Original length metrics
    const originalWordCount = this.analyzer.countWords(text);
    const originalCharCount = text.length;
    
    // Target length metrics
    const targetWordCount = Math.round(originalWordCount * (expansionTarget / 100));
    const targetCharCount = Math.round(originalCharCount * (expansionTarget / 100));
    
    // Track progress
    let enhancedText = text;
    let currentWordCount = originalWordCount;
    let currentCharCount = originalCharCount;
    
    // Apply enhancement techniques sequentially
    
    // 1. Golden Shadow Enhancement
    if (options.enableGoldenShadow) {
      enhancedText = await this.applyGoldenShadowEnhancement(
        enhancedText, 
        expansionTarget,
        currentWordCount,
        targetWordCount
      );
      
      currentWordCount = this.analyzer.countWords(enhancedText);
      currentCharCount = enhancedText.length;
    }
    
    // 2. Environmental Expansion
    if (options.enableEnvironmental) {
      enhancedText = await this.applyEnvironmentalExpansion(
        enhancedText, 
        expansionTarget,
        currentWordCount,
        targetWordCount
      );
      
      currentWordCount = this.analyzer.countWords(enhancedText);
      currentCharCount = enhancedText.length;
    }
    
    // 3. Action Scene Enhancement (if applicable)
    if (options.enableActionScene) {
      // Check if it's an action scene before applying
      const sceneType = this.analyzer.determineSceneType(text);
      
      if (sceneType.isAction) {
        enhancedText = await this.applyActionSceneEnhancement(
          enhancedText, 
          expansionTarget,
          currentWordCount,
          targetWordCount
        );
        
        currentWordCount = this.analyzer.countWords(enhancedText);
        currentCharCount = enhancedText.length;
      }
    }
    
    // 4. Prose Smoothing
    if (options.enableProseSmoother) {
      enhancedText = await this.applyProseSmoothening(enhancedText);
      
      currentWordCount = this.analyzer.countWords(enhancedText);
      currentCharCount = enhancedText.length;
    }
    
    // 5. Repetition Elimination
    if (options.enableRepetitionElimination) {
      enhancedText = await this.applyRepetitionElimination(enhancedText);
    }
    
    // Final word count after all enhancements
    const finalWordCount = this.analyzer.countWords(enhancedText);
    const finalCharCount = enhancedText.length;
    
    // Add enhancement summary
    const summary = this.generateEnhancementSummary(
      originalWordCount,
      originalCharCount,
      finalWordCount,
      finalCharCount,
      expansionTarget,
      options
    );
    
    return enhancedText + '\n\n' + summary;
  }
  
  /**
   * Applies Golden Shadow Enhancement to develop underdeveloped elements.
   * 
   * @param text The text to enhance
   * @param expansionTarget Target expansion percentage
   * @param currentWordCount Current word count
   * @param targetWordCount Target word count
   * @returns Enhanced text
   */
  private async applyGoldenShadowEnhancement(
    text: string,
    expansionTarget: number,
    currentWordCount: number,
    targetWordCount: number
  ): Promise<string> {
    // Calculate how much expansion we should target in this phase
    // We'll aim for about 30% of the total expansion in this phase
    const phaseExpansionTarget = Math.round((targetWordCount - currentWordCount) * 0.3);
    
    // Identify underdeveloped characters and plot elements
    const assessment = await this.analyzer.performContextualAssessment(text);
    const enhancementEval = await this.analyzer.performEnhancementEvaluation(text);
    
    // Extract potential characters and identify which are underdeveloped
    const underdevelopedCharacters = enhancementEval.needsGoldenShadow.underdevelopedCharacters;
    const hasUnderdevelopedPlotElements = enhancementEval.needsGoldenShadow.hasUnderdevelopedPlotElements;
    
    // This is a simplified implementation - in a real system, we would:
    // 1. Use NLP to locate where these elements are mentioned
    // 2. Generate contextually appropriate expansions
    // 3. Insert the expansions at appropriate locations
    
    // For our demo, we'll generate placeholder enhancements
    let enhancedText = text;
    
    // Enhance underdeveloped characters
    if (underdevelopedCharacters.length > 0) {
      for (const character of underdevelopedCharacters) {
        // Find appropriate places to insert character development
        // For simplicity, we'll just look for the character's name
        const regex = new RegExp(`\\b${character}\\b`, 'i');
        const match = enhancedText.match(regex);
        
        if (match && match.index !== undefined) {
          // Find the end of the paragraph where the character is mentioned
          const paragraphEnd = enhancedText.indexOf('\n', match.index);
          const insertPosition = paragraphEnd > -1 ? paragraphEnd : enhancedText.length;
          
          // Generate character development addition
          const characterAddition = ` ${character}'s expression betrayed a hint of the complex emotions beneath the surface. There was history there, untold stories written in the subtle lines around the eyes and the particular way they held their shoulders.`;
          
          // Insert the addition
          enhancedText = enhancedText.slice(0, insertPosition) + characterAddition + enhancedText.slice(insertPosition);
        }
      }
    }
    
    // Enhance underdeveloped plot elements
    if (hasUnderdevelopedPlotElements) {
      // For demo purposes, we'll add a plot element reflection paragraph
      // In a real implementation, we would identify specific plot elements
      // and enhance them contextually
      
      // Find a good paragraph break to insert our addition
      const paragraphs = enhancedText.split('\n\n');
      const insertIndex = Math.min(2, paragraphs.length);
      
      const plotAddition = `The implications of recent events weighed heavily, connections forming between seemingly disparate threads. There was more at stake than initially apparent, layers of meaning and consequence that stretched beyond the immediate moment. What might have seemed a small decision now cast a longer shadow, its significance magnified by context and circumstance.`;
      
      // Insert the plot element expansion
      paragraphs.splice(insertIndex, 0, plotAddition);
      enhancedText = paragraphs.join('\n\n');
    }
    
    return enhancedText;
  }
  
  /**
   * Applies Environmental Expansion to enrich settings and atmosphere.
   * 
   * @param text The text to enhance
   * @param expansionTarget Target expansion percentage
   * @param currentWordCount Current word count
   * @param targetWordCount Target word count
   * @returns Enhanced text
   */
  private async applyEnvironmentalExpansion(
    text: string,
    expansionTarget: number,
    currentWordCount: number,
    targetWordCount: number
  ): Promise<string> {
    // Calculate how much expansion we should target in this phase
    // We'll aim for about 40% of the total expansion in this phase
    const phaseExpansionTarget = Math.round((targetWordCount - currentWordCount) * 0.4);
    
    // Analyze environmental description needs
    const enhancementEval = await this.analyzer.performEnhancementEvaluation(text);
    const environmentalNeeds = enhancementEval.needsEnvironmentalExpansion;
    
    // This is a simplified implementation - in a real system, we would:
    // 1. Use NLP to locate environment descriptions
    // 2. Generate contextually appropriate expansions for specific sensory details
    // 3. Insert the expansions at appropriate locations
    
    // For our demo, we'll generate placeholder enhancements
    let enhancedText = text;
    
    // Enhance setting descriptions
    if (!environmentalNeeds.hasSettingDescription || environmentalNeeds.sensoryRichness < 3) {
      // Find a good paragraph to enhance with environmental details
      const paragraphs = enhancedText.split('\n\n');
      
      // Try to find a paragraph that mentions a setting
      const settingKeywords = ["room", "building", "house", "landscape", "forest", "city", "street", "sky", "mountain", "field", "beach", "ocean", "river", "lake"];
      let settingParagraphIndex = -1;
      
      for (let i = 0; i < paragraphs.length; i++) {
        if (settingKeywords.some(keyword => paragraphs[i].toLowerCase().includes(keyword))) {
          settingParagraphIndex = i;
          break;
        }
      }
      
      // If no setting paragraph found, use an early paragraph
      if (settingParagraphIndex === -1) {
        settingParagraphIndex = Math.min(1, paragraphs.length - 1);
      }
      
      // Generate environmental details to add
      // Include sensory details that are lacking in the original
      let environmentalAddition = "";
      
      if (!environmentalNeeds.hasSufficientVisualDescriptions) {
        environmentalAddition += `The light filtered through in muted beams, casting long shadows across the space and highlighting dust motes that danced in perpetual, aimless motion. Colors shifted subtly with each passing cloud, from warm amber to cool silver.`;
      }
      
      if (!environmentalNeeds.hasSufficientAuditoryDescriptions) {
        environmentalAddition += ` The ambient sounds formed a textured backdrop—distant conversations merging with closer movements, occasional laughter punctuating the steady rhythm of existence. Somewhere, barely perceptible, a faint mechanical hum provided continuity.`;
      }
      
      if (!environmentalNeeds.hasSufficientTactileDescriptions) {
        environmentalAddition += ` The air carried a distinct weight and temperature, cool against exposed skin but not uncomfortable. Surfaces presented a contrast of textures—smooth here, rough there, with unexpected variations that registered subtly against fingertips.`;
      }
      
      if (!environmentalNeeds.hasSufficientOlfactoryDescriptions) {
        environmentalAddition += ` Scents layered themselves in complex patterns: the sharp freshness of recently disturbed greenery, underlying notes of dampness from recent rain, and traces of something indefinable but distinctly organic.`;
      }
      
      // Insert at the end of the selected paragraph
      paragraphs[settingParagraphIndex] += environmentalAddition;
      
      // Add detailed focus on an insignificant object
      const objectParagraph = `A single, unremarkable object stood witness to it all—an old timepiece resting on the nearest surface. Its brass casing had developed a patina that spoke of countless hands and years of existence. The once-precise mechanism now ticked with a slight arrhythmia, each sound a miniature testament to entropy's patient work. Small scratches mapped an unknown history across its face, while fingerprints both fresh and ancient layered its surface with human testimony.`;
      
      // Insert the object paragraph after our enhanced setting paragraph
      paragraphs.splice(settingParagraphIndex + 1, 0, objectParagraph);
      
      enhancedText = paragraphs.join('\n\n');
    }
    
    return enhancedText;
  }
  
  /**
   * Applies Action Scene Enhancement to intensify high-intensity sequences.
   * 
   * @param text The text to enhance
   * @param expansionTarget Target expansion percentage
   * @param currentWordCount Current word count
   * @param targetWordCount Target word count
   * @returns Enhanced text
   */
  private async applyActionSceneEnhancement(
    text: string,
    expansionTarget: number,
    currentWordCount: number,
    targetWordCount: number
  ): Promise<string> {
    // Calculate how much expansion we should target in this phase
    // We'll aim for about 30% of the total expansion in this phase
    const phaseExpansionTarget = Math.round((targetWordCount - currentWordCount) * 0.3);
    
    // Analyze action scene needs
    const enhancementEval = await this.analyzer.performEnhancementEvaluation(text);
    const actionSceneNeeds = enhancementEval.needsActionSceneEnhancement;
    
    // Only proceed if this is actually an action scene
    if (!actionSceneNeeds.isActionScene) {
      return text;
    }
    
    // This is a simplified implementation - in a real system, we would:
    // 1. Use NLP to locate action sequences
    // 2. Generate contextually appropriate expansions
    // 3. Insert the expansions at appropriate locations
    
    // For our demo, we'll generate placeholder enhancements
    let enhancedText = text;
    
    // Identify action verbs/passages to enhance
    const actionVerbs = ["ran", "jumped", "fought", "grabbed", "threw", "dodged", "attacked", "rushed", "lunged", "sprinted", "dashed"];
    
    // Find paragraphs containing action verbs
    const paragraphs = enhancedText.split('\n\n');
    const actionParagraphIndices: number[] = [];
    
    paragraphs.forEach((paragraph, index) => {
      if (actionVerbs.some(verb => paragraph.toLowerCase().includes(verb))) {
        actionParagraphIndices.push(index);
      }
    });
    
    // If we found action paragraphs, enhance them
    if (actionParagraphIndices.length > 0) {
      for (const index of actionParagraphIndices) {
        let paragraph = paragraphs[index];
        
        // Add time manipulation if needed
        if (!actionSceneNeeds.hasTimeManipulation) {
          paragraph += ` Time seemed to slow, each second stretching into an eternity of hyperclarity where every detail registered with impossible precision. The moment hung suspended in a bubble of heightened awareness.`;
        }
        
        // Add sensory details if needed
        if (!actionSceneNeeds.hasSensoryDetails) {
          paragraph += ` A surge of adrenaline sharpened every sense—the thundering heartbeat drowning out all but the most immediate sounds, the metallic taste of fear coating the tongue, muscles burning with the strain of movement pushed beyond normal limits.`;
        }
        
        // Add environmental interaction if needed
        if (!actionSceneNeeds.hasEnvironmentalInteraction) {
          paragraph += ` The environment itself became both obstacle and weapon, surfaces transforming into tactical elements to be used or avoided. Each interaction with the surroundings sent cascades of secondary effects rippling outward—dust clouds rising from impact, objects clattering aside, surfaces trembling under sudden force.`;
        }
        
        // Add stillness contrast
        if (Math.random() > 0.5) { // Only add this to some paragraphs
          paragraph += ` Then, briefly, a moment of perfect stillness—a single heartbeat of absolute clarity before motion erupted again with renewed intensity.`;
        }
        
        // Update the paragraph
        paragraphs[index] = paragraph;
      }
      
      enhancedText = paragraphs.join('\n\n');
    }
    
    return enhancedText;
  }
  
  /**
   * Applies Prose Smoothing to improve flow and rhythm.
   * 
   * @param text The text to enhance
   * @returns Enhanced text with smoother prose
   */
  private async applyProseSmoothening(text: string): Promise<string> {
    // Analyze prose smoothing needs
    const enhancementEval = await this.analyzer.performEnhancementEvaluation(text);
    const proseSmoothingNeeds = enhancementEval.needsProseSmoothening;
    
    // This is a simplified implementation - in a real system, we would:
    // 1. Use NLP to identify awkward sentences, transitions, etc.
    // 2. Generate contextually appropriate improvements
    // 3. Apply the improvements throughout the text
    
    // For our demo, we'll use some general improvements
    let enhancedText = text;
    
    // Add transition words if needed
    if (!proseSmoothingNeeds.hasTransitionWords) {
      // Find paragraph transitions to enhance
      const paragraphs = enhancedText.split('\n\n');
      const enhancedParagraphs = [...paragraphs];
      
      // Skip the first paragraph
      for (let i = 1; i < paragraphs.length; i++) {
        // Randomly select transition words/phrases
        const transitions = [
          "Meanwhile, ", 
          "Furthermore, ", 
          "In contrast, ", 
          "Additionally, ", 
          "Nevertheless, ", 
          "Consequently, ", 
          "Despite this, ", 
          "Indeed, ", 
          "Even so, ", 
          "Simultaneously, "
        ];
        
        const randomTransition = transitions[Math.floor(Math.random() * transitions.length)];
        
        // Only add transitions to some paragraphs to avoid overuse
        if (Math.random() > 0.5) {
          // Add transition at the beginning of the paragraph
          enhancedParagraphs[i] = randomTransition + enhancedParagraphs[i];
        }
      }
      
      enhancedText = enhancedParagraphs.join('\n\n');
    }
    
    return enhancedText;
  }
  
  /**
   * Applies Repetition Elimination to improve language variety.
   * 
   * @param text The text to enhance
   * @returns Enhanced text with reduced repetition
   */
  private async applyRepetitionElimination(text: string): Promise<string> {
    // Analyze the text for repetition patterns
    const repetitionPatterns = await this.analyzer.identifyRepetitionPatterns(text);
    
    // This is a simplified implementation - in a real system, we would:
    // 1. Use NLP to identify all instances of repetition
    // 2. Generate contextually appropriate alternatives
    // 3. Replace repetitions while maintaining meaning and style
    
    // For our demo, we'll focus on replacing repeated words
    let enhancedText = text;
    
    if (repetitionPatterns.repeatedWords.length > 0) {
      // Get synonyms for repeated words (simplified approach)
      const wordReplacements: {[key: string]: string[]} = {
        "looked": ["gazed", "glanced", "observed", "stared", "watched", "eyed", "examined"],
        "walked": ["strode", "ambled", "moved", "stepped", "paced", "proceeded", "advanced"],
        "said": ["remarked", "stated", "explained", "noted", "commented", "expressed", "declared"],
        "felt": ["experienced", "sensed", "perceived", "noticed", "recognized", "registered"],
        "saw": ["noticed", "spotted", "observed", "caught sight of", "glimpsed", "discerned"],
        "went": ["proceeded", "moved", "traveled", "journeyed", "progressed", "headed"],
        "thought": ["considered", "reflected", "contemplated", "pondered", "mused", "supposed"],
        "knew": ["understood", "recognized", "realized", "comprehended", "acknowledged"],
        "heard": ["detected", "caught", "discerned", "distinguished", "perceived"],
        "face": ["countenance", "visage", "features", "expression", "aspect"]
      };
      
      // Apply replacements for common repeated words
      for (const repeatedWord of repetitionPatterns.repeatedWords) {
        const word = repeatedWord.word.toLowerCase();
        
        // Skip short words or words we don't have replacements for
        if (word.length <= 4 || !wordReplacements[word]) {
          continue;
        }
        
        const replacements = wordReplacements[word];
        
        // Find instances of the word and replace some of them
        // We want to keep some repetition for style, so don't replace all
        
        // Count occurrences and decide how many to replace
        const regex = new RegExp(`\\b${word}\\b`, 'gi');
        const matches = [...enhancedText.matchAll(regex)];
        
        // Replace approximately 60% of occurrences
        const replaceCount = Math.ceil(matches.length * 0.6);
        
        // Pick random instances to replace
        const indicesToReplace = new Set<number>();
        while (indicesToReplace.size < replaceCount && indicesToReplace.size < matches.length) {
          const randomIndex = Math.floor(Math.random() * matches.length);
          indicesToReplace.add(randomIndex);
        }
        
        // Replace the selected instances
        // We need to work backwards to avoid messing up indices
        const sortedIndices = [...indicesToReplace].sort((a, b) => b - a);
        
        for (const index of sortedIndices) {
          const match = matches[index];
          if (match.index !== undefined) {
            const matchedText = match[0];
            const replacementWord = replacements[Math.floor(Math.random() * replacements.length)];
            
            // Preserve capitalization
            let replacement = replacementWord;
            if (matchedText[0] === matchedText[0].toUpperCase()) {
              replacement = replacement.charAt(0).toUpperCase() + replacement.slice(1);
            }
            
            // Replace the word
            enhancedText = enhancedText.slice(0, match.index) + 
                          replacement + 
                          enhancedText.slice(match.index + matchedText.length);
          }
        }
      }
    }
    
    return enhancedText;
  }
  
  /**
   * Generates a summary of the enhancement process.
   * 
   * @param originalWordCount Original word count
   * @param originalCharCount Original character count
   * @param finalWordCount Final word count after enhancement
   * @param finalCharCount Final character count after enhancement
   * @param expansionTarget Target expansion percentage
   * @param options Enhancement options used
   * @returns Formatted summary text
   */
  private generateEnhancementSummary(
    originalWordCount: number,
    originalCharCount: number,
    finalWordCount: number,
    finalCharCount: number,
    expansionTarget: number,
    options: EnhancementOptions
  ): string {
    const wordExpansionPercent = Math.round((finalWordCount / originalWordCount) * 100);
    const charExpansionPercent = Math.round((finalCharCount / originalCharCount) * 100);
    
    // List of techniques used
    const techniquesUsed: string[] = [];
    if (options.enableGoldenShadow) techniquesUsed.push("Golden Shadow Enhancement");
    if (options.enableEnvironmental) techniquesUsed.push("Environmental Expansion");
    if (options.enableActionScene) techniquesUsed.push("Action Scene Enhancement");
    if (options.enableProseSmoother) techniquesUsed.push("Prose Smoothing");
    if (options.enableRepetitionElimination) techniquesUsed.push("Repetition Elimination");
    
    return `---

## UNO Enhancement Summary

**Expansion Results:**
- Original Word Count: ${originalWordCount}
- Final Word Count: ${finalWordCount}
- Word Expansion: ${wordExpansionPercent}% of original (${expansionTarget}% target)
- Original Character Count: ${originalCharCount}
- Final Character Count: ${finalCharCount}
- Character Expansion: ${charExpansionPercent}% of original

**Enhancement Techniques Applied:**
${techniquesUsed.map(technique => `- ${technique}`).join('\n')}

*Enhanced by UNO (Unified Narrative Operator)*`;
  }
}
