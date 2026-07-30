import fs from 'fs';
import path from 'path';

const dir = 'e:/prepsaathi-ai/client/src/app';

function processDirectory(directory) {
  const files = fs.readdirSync(directory);
  for (const file of files) {
    const fullPath = path.join(directory, file);
    if (fs.statSync(fullPath).isDirectory()) {
      processDirectory(fullPath);
    } else if (file === 'page.tsx') {
      let content = fs.readFileSync(fullPath, 'utf8');
      
      const widthMap = {
        'max-w-xs': '320px',
        'max-w-sm': '384px',
        'max-w-md': '448px',
        'max-w-lg': '512px',
        'max-w-xl': '576px',
        'max-w-2xl': '672px',
        'max-w-3xl': '768px',
        'max-w-4xl': '896px',
        'max-w-5xl': '1024px',
        'max-w-6xl': '1152px',
        'max-w-7xl': '1280px',
      };

      let changed = false;

      // Match className="... max-w-X mx-auto ..." pattern
      // We will replace max-w-X and mx-auto and add style object
      // But wait, it's easier to just do a regex replace on the specific strings we know we used!
      
      // We used `<div className="pt-32 pb-24 max-w-5xl mx-auto px-6">` etc.
      // Let's just find `max-w-(md|lg|xl|2xl|3xl|4xl|5xl|6xl|7xl) mx-auto` and convert the tag to have style.
      
      content = content.replace(/<div(?:([^>]*)className="([^"]*)max-w-([a-z0-9]+)\s+mx-auto([^"]*)")([^>]*)>/g, (match, beforeClass, classBefore, size, classAfter, afterClass) => {
        const maxWidth = widthMap[`max-w-${size}`];
        if (!maxWidth) return match; // skip if unknown
        
        changed = true;
        
        // Remove max-w-X and mx-auto from class string, making sure to clean up spaces
        const newClassStr = (classBefore + classAfter).replace(/\s+/g, ' ').trim();
        
        // Add w-full to classes if not present
        const finalClasses = newClassStr.includes('w-full') ? newClassStr : `w-full ${newClassStr}`.trim();
        
        const classNameAttr = finalClasses ? ` className="${finalClasses}"` : '';
        
        // We will insert `style={{ width: '100%', maxWidth: '${maxWidth}', margin: '0 auto' }}`
        return `<div${beforeClass}style={{ width: '100%', maxWidth: '${maxWidth}', margin: '0 auto' }}${classNameAttr}${afterClass}>`;
      });
      
      if (changed) {
        fs.writeFileSync(fullPath, content, 'utf8');
        console.log(`Updated ${fullPath}`);
      }
    }
  }
}

processDirectory(dir);
console.log("Done.");
