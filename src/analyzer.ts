/**
 * TextAnalyzer class implements the Analysis Phase of UNO.
 * It performs contextual assessment and enhancement evaluation on story text.
 */
export class TextAnalyzer {
  /**
   * Analyzes the given text and generates a comprehensive report.
   * 
   * @param text The story page text to analyze
   * @returns A formatted Markdown report with analysis results
   */
  async analyzeText(text: string): Promise<string> {
    const wordCount = this.countWords(text);
    const charCount = text.length;
    
    const contextualAssessment = await this.performContextualAssessment(text);
    const enhancementEvaluation = await this.performEnhancementEvaluation(text);
    const repetitionPatterns = await this.identifyRepetitionPatterns(text);
    
    // Generate a markdown report
    return this.generateReport(text, wordCount, charCount, contextualAssessment, enhancementEvaluation, repetitionPatterns);
  }
  
  /**
   * Counts the number of words in the text.
   * 
   * @param text The text to count words in
   * @returns The number of words
   */
  countWords(text: string): number {
    return text.split(/\s+/).filter(word => word.length > 0).length;
  }
  
  /**
   * Performs contextual assessment to determine the text's position in narrative arc,
   * character focus, scene type, mood, etc.
   * 
   * @param text The text to assess
   * @returns Object containing contextual assessment results
   */
  async performContextualAssessment(text: string): Promise<any> {
    // Analyze the text to determine:
    const narrativePosition = this.determineNarrativePosition(text);
    const characterFocus = this.identifyCharacterFocus(text);
    const sceneType = this.determineSceneType(text);
    const moodAndTone = this.analyzeMoodAndTone(text);
    
    return {
      narrativePosition,
      characterFocus,
      sceneType,
      moodAndTone
    };
  }
  
  /**
   * Performs enhancement evaluation to determine which techniques
   * would be most beneficial for this text.
   * 
   * @param text The text to evaluate
   * @returns Object containing enhancement recommendations
   */
  async performEnhancementEvaluation(text: string): Promise<any> {
    // Determine if the text would benefit from each enhancement technique
    const needsGoldenShadow = this.evaluateGoldenShadowNeed(text);
    const needsEnvironmentalExpansion = this.evaluateEnvironmentalExpansionNeed(text);
    const needsActionSceneEnhancement = this.evaluateActionSceneNeed(text);
    const needsProseSmoothening = this.evaluateProseSmoothingNeed(text);
    const repetitionSeverity = this.evaluateRepetitionSeverity(text);
    
    return {
      needsGoldenShadow,
      needsEnvironmentalExpansion,
      needsActionSceneEnhancement,
      needsProseSmoothening,
      repetitionSeverity
    };
  }
  
  /**
   * Identifies repetition patterns in the text for the Repetition Elimination phase.
   * 
   * @param text The text to analyze for repetitions
   * @returns Object containing identified repetition patterns
   */
  async identifyRepetitionPatterns(text: string): Promise<any> {
    // Find repeated words, phrases, and sentence structures
    const repeatedWords = this.findRepeatedWords(text);
    const repeatedPhrases = this.findRepeatedPhrases(text);
    const repeatedSentenceStructures = this.findRepeatedSentenceStructures(text);
    
    return {
      repeatedWords,
      repeatedPhrases,
      repeatedSentenceStructures
    };
  }
  
  /**
   * Determines the position of the text in the overall narrative arc.
   * 
   * @param text The text to analyze
   * @returns Information about the narrative position
   */
  determineNarrativePosition(text: string): any {
    // This would use natural language analysis to determine if the text appears to be:
    // - An introduction/beginning
    // - Rising action
    // - Climax
    // - Falling action
    // - Resolution/ending
    
    // For our implementation, we'll use some heuristics:
    const hasIntroductionMarkers = this.containsPatterns(text, [
      "began", "started", "first time", "introduction", "met", "once upon"
    ]);
    
    const hasClimaxMarkers = this.containsPatterns(text, [
      "finally", "suddenly", "at last", "climax", "confrontation", "face to face", "showdown"
    ]);
    
    const hasResolutionMarkers = this.containsPatterns(text, [
      "ended", "finished", "resolved", "conclusion", "epilogue", "aftermath", "settled"
    ]);
    
    // Calculate rough position
    let position = "middle/developing";
    if (hasIntroductionMarkers) position = "beginning/introduction";
    if (hasClimaxMarkers) position = "climax/turning point";
    if (hasResolutionMarkers) position = "resolution/ending";
    
    return {
      position,
      isIntroduction: hasIntroductionMarkers,
      isClimax: hasClimaxMarkers,
      isResolution: hasResolutionMarkers
    };
  }
  
  /**
   * Identifies the primary character focus in the text.
   * 
   * @param text The text to analyze
   * @returns Information about character focus
   */
  identifyCharacterFocus(text: string): any {
    // Find character names and count mentions
    const potentialNames = this.extractPotentialCharacterNames(text);
    const pronounCounts = this.countPronouns(text);
    
    // Determine POV
    const firstPersonPOV = pronounCounts.firstPerson > 0;
    const thirdPersonPOV = pronounCounts.thirdPerson > 0;
    
    return {
      potentialCharacters: potentialNames,
      pointOfView: firstPersonPOV ? "first-person" : thirdPersonPOV ? "third-person" : "unclear",
      pronounDistribution: pronounCounts
    };
  }
  
  /**
   * Determines the dominant scene type (action, dialogue, exposition, etc.)
   * 
   * @param text The text to analyze
   * @returns Information about the scene type
   */
  determineSceneType(text: string): any {
    // Count dialogue markers
    const dialogueLines = (text.match(/["'].*?["']/g) || []).length;
    const dialogueTags = (text.match(/said|asked|replied|responded|shouted|whispered/g) || []).length;
    
    // Count action markers
    const actionVerbs = (text.match(/ran|jumped|fought|grabbed|threw|dodged|attacked|rushed|lunged|sprinted|dashed/g) || []).length;
    
    // Determine if it's an action scene
    const isActionScene = actionVerbs > 5;
    
    // Determine if it's dialogue-heavy
    const isDialogueHeavy = dialogueLines > 5 || dialogueTags > 5;
    
    // Determine if it's exposition-heavy (description, background, etc.)
    const isExposition = !isActionScene && !isDialogueHeavy;
    
    let dominantType = "mixed";
    if (isActionScene) dominantType = "action";
    if (isDialogueHeavy) dominantType = "dialogue";
    if (isExposition) dominantType = "exposition";
    
    return {
      dominantType,
      isAction: isActionScene,
      isDialogue: isDialogueHeavy,
      isExposition: isExposition,
      dialogueCount: dialogueLines,
      actionVerbCount: actionVerbs
    };
  }
  
  /**
   * Analyzes the mood and tone of the text.
   * 
   * @param text The text to analyze
   * @returns Information about mood and tone
   */
  analyzeMoodAndTone(text: string): any {
    // Check for positive emotional words
    const positiveWords = this.containsPatterns(text, [
      "happy", "joy", "love", "peace", "hope", "exciting", "beautiful", "pleased"
    ]);
    
    // Check for negative emotional words
    const negativeWords = this.containsPatterns(text, [
      "sad", "fear", "anger", "hate", "despair", "darkness", "tragic", "grim"
    ]);
    
    // Check for suspense words
    const suspenseWords = this.containsPatterns(text, [
      "mysterious", "suspense", "tension", "anxious", "uncertain", "danger", "threat"
    ]);
    
    let moodCategory = "neutral";
    if (positiveWords) moodCategory = "positive";
    if (negativeWords) moodCategory = "negative";
    if (suspenseWords) moodCategory = "suspenseful";
    
    return {
      mood: moodCategory,
      hasPositiveElements: positiveWords,
      hasNegativeElements: negativeWords,
      hasSuspenseElements: suspenseWords
    };
  }
  
  /**
   * Determines if the text would benefit from Golden Shadow enhancement.
   * 
   * @param text The text to evaluate
   * @returns Assessment of Golden Shadow enhancement need
   */
  evaluateGoldenShadowNeed(text: string): any {
    // Check for characters mentioned only briefly
    const characterNames = this.extractPotentialCharacterNames(text);
    const underdevelopedCharacters = characterNames.filter(name => 
      this.countOccurrences(text, name) <= 2
    );
    
    // Check for briefly mentioned plot elements
    const plotElements = this.extractPotentialPlotElements(text);
    const underdevelopedPlotElements = plotElements.length > 0;
    
    // Overall assessment
    const needLevel = underdevelopedCharacters.length > 0 || underdevelopedPlotElements ? "high" : "low";
    
    return {
      needLevel,
      underdevelopedCharacters,
      hasUnderdevelopedPlotElements: underdevelopedPlotElements
    };
  }
  
  /**
   * Determines if the text would benefit from Environmental Expansion.
   * 
   * @param text The text to evaluate
   * @returns Assessment of Environmental Expansion need
   */
  evaluateEnvironmentalExpansionNeed(text: string): any {
    // Check for sensory descriptions
    const visualDescriptions = this.containsPatterns(text, [
      "looked", "saw", "appeared", "watched", "color", "bright", "dark", "shape"
    ]);
    
    const auditoryDescriptions = this.containsPatterns(text, [
      "heard", "sound", "noise", "listen", "whisper", "quiet", "loud", "silence"
    ]);
    
    const tactileDescriptions = this.containsPatterns(text, [
      "felt", "touch", "rough", "smooth", "texture", "warm", "cold", "soft", "hard"
    ]);
    
    const olfactoryDescriptions = this.containsPatterns(text, [
      "smell", "scent", "aroma", "odor", "fragrance", "stench"
    ]);
    
    const sensoryRichness = [
      visualDescriptions, 
      auditoryDescriptions, 
      tactileDescriptions, 
      olfactoryDescriptions
    ].filter(Boolean).length;
    
    // Setting description check
    const hasSettingDescription = this.containsPatterns(text, [
      "room", "building", "house", "landscape", "forest", "city", "street", "sky", "mountain"
    ]);
    
    // Overall assessment
    const needLevel = sensoryRichness < 3 || !hasSettingDescription ? "high" : "low";
    
    return {
      needLevel,
      sensoryRichness,
      hasSufficientVisualDescriptions: visualDescriptions,
      hasSufficientAuditoryDescriptions: auditoryDescriptions,
      hasSufficientTactileDescriptions: tactileDescriptions,
      hasSufficientOlfactoryDescriptions: olfactoryDescriptions,
      hasSettingDescription
    };
  }
  
  /**
   * Determines if the text would benefit from Action Scene Enhancement.
   * 
   * @param text The text to evaluate
   * @returns Assessment of Action Scene Enhancement need
   */
  evaluateActionSceneNeed(text: string): any {
    // First check if it's an action scene at all
    const sceneType = this.determineSceneType(text);
    
    if (!sceneType.isAction) {
      return {
        needLevel: "not applicable",
        isActionScene: false
      };
    }
    
    // Check for time manipulation
    const hasTimeManipulation = this.containsPatterns(text, [
      "slow", "quickly", "moment", "instant", "suddenly", "time seemed", "freeze"
    ]);
    
    // Check for sensory details in action
    const hasSensoryDetails = this.containsPatterns(text, [
      "felt", "heard", "saw", "smell", "taste", "pain", "heart pounding"
    ]);
    
    // Check for environmental interaction
    const hasEnvironmentalInteraction = this.containsPatterns(text, [
      "against the", "through the", "over the", "under the", "from the"
    ]);
    
    // Overall assessment
    const needLevel = (!hasTimeManipulation || !hasSensoryDetails || !hasEnvironmentalInteraction) 
      ? "high" : "medium";
    
    return {
      needLevel,
      isActionScene: true,
      hasTimeManipulation,
      hasSensoryDetails,
      hasEnvironmentalInteraction
    };
  }
  
  /**
   * Determines if the text would benefit from Prose Smoothing.
   * 
   * @param text The text to evaluate
   * @returns Assessment of Prose Smoothing need
   */
  evaluateProseSmoothingNeed(text: string): any {
    // Check for sentence length variety
    const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
    const sentenceLengths = sentences.map(s => s.split(/\s+/).length);
    
    // Calculate statistics
    const averageLength = sentenceLengths.reduce((sum, len) => sum + len, 0) / sentenceLengths.length;
    const sentenceLengthVariety = new Set(sentenceLengths).size / sentenceLengths.length;
    
    // Check for transition words
    const hasTransitionWords = this.containsPatterns(text, [
      "however", "therefore", "furthermore", "additionally", "consequently", "meanwhile"
    ]);
    
    // Check for paragraph structure
    const paragraphs = text.split(/\n+/).filter(p => p.trim().length > 0);
    const hasVariedParagraphLength = new Set(paragraphs.map(p => p.length)).size > 1;
    
    // Overall assessment
    const needLevel = (sentenceLengthVariety < 0.3 || !hasTransitionWords || !hasVariedParagraphLength) 
      ? "high" : "low";
    
    return {
      needLevel,
      averageSentenceLength: averageLength,
      sentenceLengthVariety,
      hasTransitionWords,
      hasVariedParagraphLength
    };
  }
  
  /**
   * Evaluates the severity of repetition in the text.
   * 
   * @param text The text to evaluate
   * @returns Assessment of repetition severity
   */
  evaluateRepetitionSeverity(text: string): any {
    // Find repeated words
    const words = text.toLowerCase().match(/\b\w+\b/g) || [];
    const wordFrequency: {[key: string]: number} = {};
    
    words.forEach((word: string): void => {
      if (word.length > 3) { // Only consider words longer than 3 letters
        wordFrequency[word] = (wordFrequency[word] || 0) + 1;
      }
    });
    
    // Find words repeated more than 3 times
    const repeatedWords = Object.entries(wordFrequency)
      .filter(([_, count]) => count > 3)
      .map(([word, count]) => ({ word, count }));
    
    // Overall assessment
    const repetitionSeverity = repeatedWords.length > 5 ? "high" : 
                              repeatedWords.length > 2 ? "medium" : "low";
    
    return {
      severity: repetitionSeverity,
      repeatedWordCount: repeatedWords.length,
      topRepeatedWords: repeatedWords.sort((a, b) => b.count - a.count).slice(0, 5)
    };
  }
  
  /**
   * Finds repeated words in the text.
   * 
   * @param text The text to analyze
   * @returns Array of repeated words with counts
   */
  findRepeatedWords(text: string): Array<{word: string, count: number}> {
    const words = text.toLowerCase().match(/\b\w+\b/g) || [];
    const wordFrequency: {[key: string]: number} = {};
    
    words.forEach(word => {
      if (word.length > 3) { // Only consider words longer than 3 letters
        wordFrequency[word] = (wordFrequency[word] || 0) + 1;
      }
    });
    
    // Find words repeated more than twice
    return Object.entries(wordFrequency)
      .filter(([_, count]) => count > 2)
      .map(([word, count]) => ({ word, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10); // Return top 10 repeated words
  }
  
  /**
   * Finds repeated phrases in the text.
   * 
   * @param text The text to analyze
   * @returns Array of repeated phrases with counts
   */
  findRepeatedPhrases(text: string): Array<{phrase: string, count: number}> {
    // Extract 3-5 word phrases and check for repetition
    const phrases: {[key: string]: number} = {};
    const words = text.split(/\s+/);
    
    // Look for 3-word phrases
    for (let i = 0; i < words.length - 2; i++) {
      const phrase = words.slice(i, i + 3).join(' ').toLowerCase();
      phrases[phrase] = (phrases[phrase] || 0) + 1;
    }
    
    // Find phrases repeated more than once
    return Object.entries(phrases)
      .filter(([_, count]) => count > 1)
      .map(([phrase, count]) => ({ phrase, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5); // Return top 5 repeated phrases
  }
  
  /**
   * Finds repeated sentence structures in the text.
   * 
   * @param text The text to analyze
   * @returns Array of repeated structures with counts
   */
  findRepeatedSentenceStructures(text: string): Array<{pattern: string, count: number}> {
    // This is a simplified approach - in a real implementation,
    // we would use more sophisticated NLP techniques
    
    const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
    const patterns: {[key: string]: number} = {};
    
    // Create a simplified pattern for each sentence
    sentences.forEach((sentence: string): void => {
      // Simplified pattern: first word + sentence length category
      const firstWord = sentence.trim().split(/\s+/)[0].toLowerCase();
      const lengthCategory = sentence.split(/\s+/).length < 8 ? "short" : 
                            sentence.split(/\s+/).length < 15 ? "medium" : "long";
      
      const pattern = `${firstWord}-${lengthCategory}`;
      patterns[pattern] = (patterns[pattern] || 0) + 1;
    });
    
    // Find patterns repeated more than twice
    return Object.entries(patterns)
      .filter(([_, count]) => count > 2)
      .map(([pattern, count]) => ({ pattern, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 3); // Return top 3 patterns
  }
  
  /**
   * Extracts potential character names from the text.
   * 
   * @param text The text to analyze
   * @returns Array of potential character names
   */
  extractPotentialCharacterNames(text: string): string[] {
    // This is a simplified approach - in a real implementation,
    // we would use named entity recognition
    
    // Look for capitalized words that aren't at the start of sentences
    const potentialNames = new Set<string>();
    const words = text.split(/\s+/);
    
    for (let i = 1; i < words.length; i++) {
      const word = words[i].replace(/[^\w]/, '');
      if (word.length > 0 && word[0] === word[0].toUpperCase() && word[0].match(/[A-Z]/)) {
        potentialNames.add(word);
      }
    }
    
    return Array.from(potentialNames);
  }
  
  /**
   * Extracts potential plot elements from the text.
   * 
   * @param text The text to analyze
   * @returns Array of potential plot elements
   */
  extractPotentialPlotElements(text: string): string[] {
    // This is a simplified approach - in a real implementation,
    // we would use more sophisticated NLP techniques
    
    // Look for phrases that might indicate plot elements
    const plotIndicators = [
      "remembered", "realized", "discovered", "decided", "planned",
      "secret", "mission", "quest", "journey", "task", "mystery"
    ];
    
    const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
    const potentialElements = sentences.filter(sentence => 
      plotIndicators.some(indicator => 
        sentence.toLowerCase().includes(indicator)
      )
    );
    
    return potentialElements.map(s => s.trim());
  }
  
  /**
   * Counts pronouns in the text to help determine POV.
   * 
   * @param text The text to analyze
   * @returns Object with pronoun counts
   */
  countPronouns(text: string): {firstPerson: number, secondPerson: number, thirdPerson: number} {
    const firstPersonPronouns = ["I", "me", "my", "mine", "we", "us", "our", "ours"];
    const secondPersonPronouns = ["you", "your", "yours"];
    const thirdPersonPronouns = ["he", "him", "his", "she", "her", "hers", "they", "them", "their", "theirs"];
    
    const words = text.toLowerCase().split(/\s+/);
    
    const firstPerson = words.filter(word => 
      firstPersonPronouns.includes(word.replace(/[^\w]/g, ''))
    ).length;
    
    const secondPerson = words.filter(word => 
      secondPersonPronouns.includes(word.replace(/[^\w]/g, ''))
    ).length;
    
    const thirdPerson = words.filter(word => 
      thirdPersonPronouns.includes(word.replace(/[^\w]/g, ''))
    ).length;
    
    return { firstPerson, secondPerson, thirdPerson };
  }
  
  /**
   * Counts occurrences of a word or phrase in text.
   * 
   * @param text The text to search in
   * @param word The word or phrase to count
   * @returns Number of occurrences
   */
  countOccurrences(text: string, word: string): number {
    const regex = new RegExp(`\\b${word}\\b`, 'gi');
    return (text.match(regex) || []).length;
  }
  
  /**
   * Checks if the text contains any of the patterns in the array.
   * 
   * @param text The text to check
   * @param patterns Array of patterns to look for
   * @returns True if any pattern is found
   */
  containsPatterns(text: string, patterns: string[]): boolean {
    const lowerText = text.toLowerCase();
    return patterns.some(pattern => lowerText.includes(pattern));
  }
  
  /**
   * Generates a formatted markdown report with the analysis results.
   * 
   * @param text Original text
   * @param wordCount Word count
   * @param charCount Character count
   * @param contextualAssessment Contextual assessment results
   * @param enhancementEvaluation Enhancement evaluation results
   * @param repetitionPatterns Repetition patterns identified
   * @returns Formatted markdown report
   */
  generateReport(
    text: string, 
    wordCount: number, 
    charCount: number,
    contextualAssessment: any,
    enhancementEvaluation: any,
    repetitionPatterns: any
  ): string {
    // Calculate target expansion counts
    const targetWordCount = Math.round(wordCount * 2);
    const targetCharCount = Math.round(charCount * 2);
    
    // Generate the report in markdown format
    return `# UNO Analysis Report

## Text Statistics
- **Original Word Count**: ${wordCount}
- **Original Character Count**: ${charCount}
- **Target Word Count (200%)**: ${targetWordCount}
- **Target Character Count (200%)**: ${targetCharCount}

## Contextual Assessment

### Narrative Position
- **Position**: ${contextualAssessment.narrativePosition.position}
- **Introduction Markers**: ${contextualAssessment.narrativePosition.isIntroduction ? "Present" : "Absent"}
- **Climax Markers**: ${contextualAssessment.narrativePosition.isClimax ? "Present" : "Absent"}
- **Resolution Markers**: ${contextualAssessment.narrativePosition.isResolution ? "Present" : "Absent"}

### Character Focus
- **Point of View**: ${contextualAssessment.characterFocus.pointOfView}
- **Potential Characters**: ${contextualAssessment.characterFocus.potentialCharacters.join(", ") || "None identified"}
- **Pronoun Distribution**:
  - First Person: ${contextualAssessment.characterFocus.pronounDistribution.firstPerson}
  - Second Person: ${contextualAssessment.characterFocus.pronounDistribution.secondPerson}
  - Third Person: ${contextualAssessment.characterFocus.pronounDistribution.thirdPerson}

### Scene Type
- **Dominant Type**: ${contextualAssessment.sceneType.dominantType}
- **Action Elements**: ${contextualAssessment.sceneType.isAction ? "Strong" : "Weak"}
- **Dialogue Elements**: ${contextualAssessment.sceneType.isDialogue ? "Strong" : "Weak"}
- **Exposition Elements**: ${contextualAssessment.sceneType.isExposition ? "Strong" : "Weak"}

### Mood and Tone
- **Dominant Mood**: ${contextualAssessment.moodAndTone.mood}
- **Positive Elements**: ${contextualAssessment.moodAndTone.hasPositiveElements ? "Present" : "Absent"}
- **Negative Elements**: ${contextualAssessment.moodAndTone.hasNegativeElements ? "Present" : "Absent"}
- **Suspense Elements**: ${contextualAssessment.moodAndTone.hasSuspenseElements ? "Present" : "Absent"}

## Enhancement Recommendations

### Golden Shadow Enhancement
- **Need Level**: ${enhancementEvaluation.needsGoldenShadow.needLevel}
- **Underdeveloped Characters**: ${enhancementEvaluation.needsGoldenShadow.underdevelopedCharacters.join(", ") || "None identified"}
- **Underdeveloped Plot Elements**: ${enhancementEvaluation.needsGoldenShadow.hasUnderdevelopedPlotElements ? "Present" : "Absent"}

### Environmental Expansion
- **Need Level**: ${enhancementEvaluation.needsEnvironmentalExpansion.needLevel}
- **Sensory Richness (0-4)**: ${enhancementEvaluation.needsEnvironmentalExpansion.sensoryRichness}
- **Setting Description**: ${enhancementEvaluation.needsEnvironmentalExpansion.hasSettingDescription ? "Present" : "Absent"}
- **Areas to Enhance**:
  - Visual: ${!enhancementEvaluation.needsEnvironmentalExpansion.hasSufficientVisualDescriptions ? "Needs improvement" : "Sufficient"}
  - Auditory: ${!enhancementEvaluation.needsEnvironmentalExpansion.hasSufficientAuditoryDescriptions ? "Needs improvement" : "Sufficient"}
  - Tactile: ${!enhancementEvaluation.needsEnvironmentalExpansion.hasSufficientTactileDescriptions ? "Needs improvement" : "Sufficient"}
  - Olfactory: ${!enhancementEvaluation.needsEnvironmentalExpansion.hasSufficientOlfactoryDescriptions ? "Needs improvement" : "Sufficient"}

### Action Scene Enhancement
- **Applicability**: ${enhancementEvaluation.needsActionSceneEnhancement.isActionScene ? "Applicable" : "Not applicable"}
${enhancementEvaluation.needsActionSceneEnhancement.isActionScene ? `- **Need Level**: ${enhancementEvaluation.needsActionSceneEnhancement.needLevel}
- **Time Manipulation**: ${enhancementEvaluation.needsActionSceneEnhancement.hasTimeManipulation ? "Present" : "Absent"}
- **Sensory Details**: ${enhancementEvaluation.needsActionSceneEnhancement.hasSensoryDetails ? "Present" : "Absent"}
- **Environmental Interaction**: ${enhancementEvaluation.needsActionSceneEnhancement.hasEnvironmentalInteraction ? "Present" : "Absent"}` : ""}

### Prose Smoothing
- **Need Level**: ${enhancementEvaluation.needsProseSmoothening.needLevel}
- **Average Sentence Length**: ${enhancementEvaluation.needsProseSmoothening.averageSentenceLength.toFixed(1)} words
- **Sentence Length Variety**: ${(enhancementEvaluation.needsProseSmoothening.sentenceLengthVariety * 100).toFixed(1)}%
- **Transition Words**: ${enhancementEvaluation.needsProseSmoothening.hasTransitionWords ? "Present" : "Absent"}
- **Paragraph Length Variety**: ${enhancementEvaluation.needsProseSmoothening.hasVariedParagraphLength ? "Present" : "Absent"}

### Repetition Elimination
- **Severity**: ${enhancementEvaluation.repetitionSeverity.severity}
- **Repeated Word Count**: ${enhancementEvaluation.repetitionSeverity.repeatedWordCount}
- **Top Repeated Words**:
${enhancementEvaluation.repetitionSeverity.topRepeatedWords.map((item: {word: string, count: number}) => `  - "${item.word}" (${item.count} times)`).join('\n')}

## Repetition Patterns

### Repeated Words
${repetitionPatterns.repeatedWords.length > 0 
  ? repetitionPatterns.repeatedWords.map((item: {word: string, count: number}) => `- "${item.word}" (${item.count} times)`).join('\n')
  : "- No significant word repetition detected"}

### Repeated Phrases
${repetitionPatterns.repeatedPhrases.length > 0 
  ? repetitionPatterns.repeatedPhrases.map((item: {phrase: string, count: number}) => `- "${item.phrase}" (${item.count} times)`).join('\n')
  : "- No significant phrase repetition detected"}

### Repeated Sentence Structures
${repetitionPatterns.repeatedSentenceStructures.length > 0 
  ? repetitionPatterns.repeatedSentenceStructures.map((item: {pattern: string, count: number}) => `- ${item.pattern} pattern (${item.count} times)`).join('\n') 
  : "- No significant sentence structure repetition detected"}
`;
  }
}
