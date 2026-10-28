// Abra npm run dev -- --port 5176 antes; WIKI_URL permite conferir um preview.
import { chromium } from 'playwright';
import fs from 'node:fs';
const base=process.env.WIKI_URL ?? 'http://127.0.0.1:5176';
const browser=await chromium.launch({headless:true});
const erros=[];const problemas=[];let paginas=0;
const page=await browser.newPage();
page.on('pageerror',e=>erros.push(e.message));
page.on('response',r=>{if(r.status()>=400&&!r.url().includes('fonts.googleapis'))erros.push(`${r.status()} ${r.url()}`)});
await page.goto(base);
const rotas=await page.locator('.grupo-itens a').evaluateAll(es=>es.map(e=>e.getAttribute('href')));
for(const largura of [375,768,1440]){
 await page.setViewportSize({width:largura,height:900});
 for(const rota of rotas){
  await page.goto(base+'/'+rota);await page.waitForTimeout(100);
  const p=await page.evaluate(()=>{
   const problemas=[];
   if(document.documentElement.scrollWidth>innerWidth+1)problemas.push('rolagem horizontal da página');
   for(const el of document.querySelectorAll('.ficha-texto,.caixa-corpo,.atalho'))if(el.scrollWidth>el.clientWidth+1)problemas.push(`texto fora do cartão: ${el.textContent.slice(0,55)}`);
   for(const img of document.images)if(img.complete&&img.naturalWidth===0)problemas.push(`imagem vazia: ${img.src}`);
   return problemas;
  });
  problemas.push(...p.map(p=>`${largura} ${rota}: ${p}`));paginas++;
  if([375,1440].includes(largura)&&['#/inicio','#/aparencia','#/armaduras','#/pocoes','#/duelo','#/online'].includes(rota)){
   await page.waitForTimeout(400);await page.screenshot({path:`/tmp/algoland-wiki-${largura}-${rota.slice(2)}.png`,fullPage:rota!=='#/inicio'});
  }
 }
}
// Busca inclui os sistemas recém-documentados.
await page.setViewportSize({width:1440,height:900});
for(const [termo,esperado] of [['duelo','Duelo online'],['mercado','Mercado entre jogadores'],['transferir','Transferir save'],['cabelo','Personagem e aparência']]){
 await page.goto(base+'/');await page.getByRole('button',{name:'Buscar na wiki',exact:true}).click();await page.getByPlaceholder('Buscar páginas (ex.: melancia, medusa, chat)').fill(termo);
 if(!(await page.locator('.paleta li').allTextContents()).some(t=>t.includes(esperado)))problemas.push('busca: '+termo);
}
const resultado={paginas,erros:[...new Set(erros)],problemas:[...new Set(problemas)]};fs.writeFileSync('/tmp/algoland-wiki-qa.json',JSON.stringify(resultado,null,2));console.log(JSON.stringify(resultado));
await browser.close();if(erros.length||problemas.length)process.exitCode=1;
