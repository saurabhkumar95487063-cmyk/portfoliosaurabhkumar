const fs = require('fs');
const path = require('path');

const source = "C:\\Users\\Lenovo\\.gemini\\antigravity\\brain\\a2f753ad-2272-4bdd-9a58-b2bc4e38c8c8\\saurabh_edited_clean_1779536514047.png";
const destDir = path.join(__dirname, 'frontend', 'src', 'assets');
const dest = path.join(destDir, 'profile.png');

try {
  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
  }
  fs.copyFileSync(source, dest);
  console.log("SUCCESS: Profile photo copied successfully to: " + dest);
} catch (err) {
  console.error("ERROR: Failed to copy photo:", err.message);
}
