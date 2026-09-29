import { chromium } from 'playwright';
import fs from 'node:fs';
const browser = await chromium.launch();
const checks=[];
const assert=(condition,name)=>{if(!condition)throw new Error(name);checks.push(name)};
const page=await browser.newPage({viewport:{width:1440,height:1000},reducedMotion:'reduce'});
const errors=[];const legacyErrors=[];page.on('pageerror',e=>(new URL(page.url()).pathname.startsWith('/concept')?errors:legacyErrors).push(e.message));
const response=await page.goto('http://localhost:3101/concept');
await page.getByRole('heading',{level:1}).waitFor();
assert(response.status()===200,'Homepage returns 200');
assert((await page.title()).includes('Design concept'),'Correct preview title');
assert((await page.locator('meta[name="robots"]').getAttribute('content')).includes('noindex'),'Preview is noindex');
for(const width of [1440,1024,760,390,320]){
 await page.setViewportSize({width,height:900});
 assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),`No horizontal overflow at ${width}px`);
 const small=await page.locator('main').evaluate(el=>[...el.querySelectorAll('*')].filter(e=>e.textContent.trim() && [...e.childNodes].some(n=>n.nodeType===3&&n.textContent.trim())&&e.getBoundingClientRect().width>0&&parseFloat(getComputedStyle(e).fontSize)<15).map(e=>e.textContent));
 assert(small.length===0,`Meaningful text at least 15px at ${width}px`);
}
await page.setViewportSize({width:390,height:844});
await page.getByRole('button',{name:'Open menu',exact:true}).click();
await page.getByRole('navigation',{name:'Mobile navigation'}).getByRole('link',{name:'Pricing',exact:true}).click();
assert(await page.getByRole('button',{name:'Open menu',exact:true}).getAttribute('aria-expanded')==='false','Mobile navigation closes on selection');
await page.getByRole('button',{name:'Open menu',exact:true}).click();
await page.keyboard.press('Escape');
assert(await page.getByRole('button',{name:'Open menu',exact:true}).getAttribute('aria-expanded')==='false','Escape closes mobile navigation');
await page.getByRole('button',{name:'The sources',exact:false}).click();
assert(await page.getByText('Emergency department record',{exact:true}).isVisible(),'Sources chapter renders');
await page.getByRole('button',{name:'The result',exact:false}).click();
await page.getByRole('button',{name:'Source 1',exact:true}).click();
assert(await page.getByText('Fictional excerpt.',{exact:true}).isVisible(),'Source citation expands its excerpt');
await page.getByRole('button',{name:'Source 1',exact:true}).click();
assert(await page.getByRole('button',{name:'Source 1',exact:true}).getAttribute('aria-expanded')==='false','Source citation collapses');
await page.getByRole('button',{name:'Play walkthrough',exact:true}).click();
assert(await page.getByRole('button',{name:'Pause walkthrough',exact:true}).isVisible(),'Walkthrough starts on demand');
await page.getByRole('button',{name:'Pause walkthrough',exact:true}).click();
assert(await page.getByRole('button',{name:'Play walkthrough',exact:true}).isVisible(),'Walkthrough pauses');
await page.getByText('Does Delta replace attorney review?',{exact:true}).click();
assert(await page.getByText('No. Delta supports your team.',{exact:false}).isVisible(),'FAQ opens');
const links=await page.locator('a').evaluateAll(es=>es.map(e=>e.getAttribute('href')));
assert(links.every(l=>l.startsWith('#')||l.startsWith('/concept')||l.startsWith('mailto:')||l==='https://calendar.app.google/LB4f9aLuz5a4RCrz6'||l==='https://app.casedelta.com'),'All links remain in concept or intended destinations');
assert(await page.locator('a[href="https://calendar.app.google/LB4f9aLuz5a4RCrz6"]').count()>=7,'Booking links target the authorized public calendar');
for (const route of ['privacy','terms']) {
 await page.goto(`http://localhost:3101/concept/${route}`);
 assert(await page.locator('h1').count()===1,`${route} renders`);
 assert((await page.locator('meta[name="robots"]').getAttribute('content')).includes('noindex'),`${route} is noindex`);
 const concept=await page.locator('main section').allTextContents();
 await page.goto(`http://localhost:3101/${route}`);

 // PageShell's actual nesting can vary; compare the text of each inner legal section.
 assert(concept.length>5,`${route} has full legal content`);
 for (const text of concept) assert((await page.locator('body').textContent()).replace(/\s+/g,' ').includes(text.replace(/\s+/g,' ')),`${route}: unchanged section ${text.slice(0,35)}`);
}
await page.goto('http://localhost:3101/concept');
await page.setViewportSize({width:1440,height:1000});
await page.screenshot({path:'design-review/concept-desktop.png',fullPage:true});
await page.locator('section').first().screenshot({path:'design-review/hero-desktop.png'});
await page.getByRole('button',{name:'The result',exact:false}).click();
await page.locator('header').evaluate(el=>el.style.visibility='hidden');
await page.locator('[class*="demonstration"]').screenshot({path:'public/concept/media/chronology-poster.png'});
await page.locator('header').evaluate(el=>el.style.visibility='');
await page.setViewportSize({width:390,height:844});
await page.evaluate(()=>scrollTo({top:0,behavior:'instant'}));
await page.screenshot({path:'design-review/concept-phone.png',fullPage:true});
if(errors.length) console.log({errors});
assert(errors.length===0,'No JavaScript page errors');
fs.writeFileSync('design-review/checks.json',JSON.stringify({checkedAt:new Date().toISOString(),checks,errors,legacyReducedMotionErrors:legacyErrors.length},null,2));
console.log(`${checks.length} checks passed`);
await browser.close();
