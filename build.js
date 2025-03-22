const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

// Create dist directory if it doesn't exist
if (!fs.existsSync('./dist')) {
  fs.mkdirSync('./dist', { recursive: true });
}

// Run TypeScript compiler
const command = 'npx tsc';
console.log(`Executing: ${command}`);

exec(command, (error, stdout, stderr) => {
  if (error) {
    console.error(`Error during compilation: ${error.message}`);
    console.error(`Exit code: ${error.code}`);
    if (stderr) {
      console.error(`Stderr: ${stderr}`);
    }
    return;
  }
  
  if (stderr) {
    console.error(`Stderr: ${stderr}`);
  }
  
  if (stdout) {
    console.log(`Stdout: ${stdout}`);
  }
  
  console.log('TypeScript compilation completed.');
  
  // Check if the output files exist
  const expectedFiles = [
    'index.js',
    'analyzer.js',
    'enhancer.js'
  ];
  
  const missingFiles = expectedFiles.filter(file => 
    !fs.existsSync(path.join('./dist', file))
  );
  
  if (missingFiles.length > 0) {
    console.error(`Warning: The following expected files were not generated: ${missingFiles.join(', ')}`);
  } else {
    console.log('All expected files were generated successfully.');
    
    // Make index.js executable (Unix systems)
    try {
      fs.chmodSync('./dist/index.js', '755');
      console.log('Made index.js executable.');
    } catch (err) {
      console.log('Note: Could not change file permissions (expected on Windows).');
    }
  }
});
