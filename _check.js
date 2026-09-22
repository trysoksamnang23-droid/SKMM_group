const fs = require("fs");

const script = fs.readFileSync("D:/SKMM Web/script.js", "utf8");
const candName = (script.match(/candidateName/g) || []).length;
const candId = (script.match(/candidateId/g) || []).length;
console.log("script.js candidateName refs:", candName);
console.log("script.js candidateId refs:", candId);

const htmlFiles = fs.readdirSync("D:/SKMM Web").filter(f => f.endsWith(".html"));
let issues = [];
for (const f of htmlFiles) {
  const content = fs.readFileSync("D:/SKMM Web/" + f, "utf8");
  if (content.includes("cdn.jsdelivr")) issues.push(f + ": CDN ref");
  if (content.includes('href="style.css"')) issues.push(f + ": rel style.css");
  if (content.includes('src="script.js"')) issues.push(f + ": rel script.js");
  if (content.includes('src="supabase-config.js"')) issues.push(f + ": rel config");
  if (content.includes('src="supabase-setup.js"')) issues.push(f + ": rel setup");
  if (!content.includes('src="/supabase-js.js"')) issues.push(f + ": no local supabase-js");
}
console.log("HTML issues:", issues.length === 0 ? "None" : issues);

const testFiles = fs.readdirSync("D:/SKMM Web").filter(f => f.startsWith("_test"));
console.log("Test files:", testFiles.length === 0 ? "None" : testFiles);
console.log("supabase-js.js exists:", fs.existsSync("D:/SKMM Web/supabase-js.js"));
