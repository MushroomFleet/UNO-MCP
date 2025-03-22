const fs = require('fs');
const { TextAnalyzer } = require('./dist/analyzer');
const { EnhancementProcessor } = require('./dist/enhancer');

// Read the test story
const testStory = fs.readFileSync('./test-story.txt', 'utf8');

console.log('==== UNO MCP TEST ====');
console.log(`Original story length: ${testStory.length} characters, ${testStory.split(/\s+/).filter(w => w.length > 0).length} words`);
console.log('\n==== STARTING TESTS ====\n');

async function runTests() {
  try {
    // Initialize the analyzer and processor
    const analyzer = new TextAnalyzer();
    const enhancer = new EnhancementProcessor(analyzer);
    
    // Test 1: Analysis
    console.log('TEST 1: Text Analysis');
    console.log('---------------------');
    const analysis = await analyzer.analyzeText(testStory);
    fs.writeFileSync('./test-analysis.md', analysis);
    console.log('Analysis complete! Results saved to test-analysis.md');
    
    // Test 2: Full Enhancement
    console.log('\nTEST 2: Full Text Enhancement (200%)');
    console.log('-----------------------------------');
    const enhanced = await enhancer.enhanceText(testStory);
    fs.writeFileSync('./test-enhanced.txt', enhanced);
    console.log('Enhancement complete! Results saved to test-enhanced.txt');
    
    // Test 3: Custom Enhancement (150% with selected techniques)
    console.log('\nTEST 3: Custom Text Enhancement (150%)');
    console.log('------------------------------------');
    const customOptions = {
      enableGoldenShadow: true,
      enableEnvironmental: true,
      enableActionScene: false,
      enableProseSmoother: true,
      enableRepetitionElimination: false
    };
    const customEnhanced = await enhancer.customEnhanceText(testStory, 150, customOptions);
    fs.writeFileSync('./test-custom-enhanced.txt', customEnhanced);
    console.log('Custom enhancement complete! Results saved to test-custom-enhanced.txt');
    
    console.log('\n==== ALL TESTS COMPLETED SUCCESSFULLY ====');
    console.log('You can now examine the output files to see the results.');
    
  } catch (error) {
    console.error('An error occurred during testing:');
    console.error(error);
  }
}

// Run the tests
runTests();
