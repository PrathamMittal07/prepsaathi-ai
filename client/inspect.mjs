import puppeteer from 'puppeteer';

(async () => {
  console.log('Launching browser...');
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  console.log('Navigating to dashboard...');
  await page.goto('http://localhost:3000/dashboard/ai-career-coach', { waitUntil: 'networkidle0' });
  
  console.log('Evaluating DOM...');
  const result = await page.evaluate(() => {
    const heroP = document.querySelector('h1').nextElementSibling;
    const heroPStyles = window.getComputedStyle(heroP);
    const heroParentStyles = window.getComputedStyle(heroP.parentElement);
    
    const chatH4 = Array.from(document.querySelectorAll('h4')).find(el => el.textContent.includes('How can I help'));
    let chatPStyles = null;
    let chatParentStyles = null;
    if (chatH4 && chatH4.nextElementSibling) {
      chatPStyles = window.getComputedStyle(chatH4.nextElementSibling);
      chatParentStyles = window.getComputedStyle(chatH4.parentElement);
    }

    return {
      heroParagraph: {
        width: heroPStyles.width,
        minWidth: heroPStyles.minWidth,
        maxWidth: heroPStyles.maxWidth,
        display: heroPStyles.display,
        whiteSpace: heroPStyles.whiteSpace,
        className: heroP.className
      },
      heroParent: {
        width: heroParentStyles.width,
        display: heroParentStyles.display,
        flexDirection: heroParentStyles.flexDirection,
        alignItems: heroParentStyles.alignItems,
        className: heroP.parentElement.className
      },
      chatParagraph: chatPStyles ? {
        width: chatPStyles.width,
        minWidth: chatPStyles.minWidth,
        maxWidth: chatPStyles.maxWidth,
        display: chatPStyles.display,
        whiteSpace: chatPStyles.whiteSpace,
        className: chatH4.nextElementSibling.className
      } : null,
      chatParent: chatParentStyles ? {
        width: chatParentStyles.width,
        display: chatParentStyles.display,
        alignItems: chatParentStyles.alignItems,
        className: chatH4.parentElement.className
      } : null
    };
  });
  
  console.log(JSON.stringify(result, null, 2));
  
  await browser.close();
})();
