import { PDFDocument, rgb } from './vendor/pdf-lib.min.js';
import './vendor/fontkit.min.js';

const PAGE_WIDTH=595.28;
const PAGE_HEIGHT=841.89;
const MARGIN=38;
const INK=rgb(.08,.10,.13);
const ACCENT=rgb(.04,.36,.66);

export async function renderProtocolPdf(protocol,type,sections) {
  const pdf=await PDFDocument.create();
  pdf.registerFontkit(globalThis.fontkit);
  const fontResponse=await fetch(new URL('../assets/fonts/Roboto-Regular.ttf',import.meta.url));
  if(!fontResponse.ok)throw new Error('Písmo pro PDF se nepodařilo načíst.');
  const font=await pdf.embedFont(await fontResponse.arrayBuffer(),{subset:true});
  pdf.setTitle(protocol.protocol);
  let page,y;
  function nextPage() {
    page=pdf.addPage([PAGE_WIDTH,PAGE_HEIGHT]);
    y=PAGE_HEIGHT-MARGIN;
  }
  function space(height) {
    if(y-height<MARGIN)nextPage();
  }
  function text(value,size=10,color=INK) {
    const width=PAGE_WIDTH-2*MARGIN;
    let line='';
    function flush() {
      space(size+5);
      page.drawText(line,{x:MARGIN,y:y-size,font,size,color});
      y-=size+5;
      line='';
    }
    for(const word of String(value).split(/\s+/)) {
      const next=line?line+' '+word:word;
      if(line&&font.widthOfTextAtSize(next,size)>width)flush();
      if(line){line+=' '+word;continue;}
      for(const char of word) {
        if(line&&font.widthOfTextAtSize(line+char,size)>width)flush();
        line+=char;
      }
    }
    if(line)flush();
  }
  nextPage();
  text(type==='photos'?'Fotolist':'Protokol o kontrole objektu',22,ACCENT);
  text(protocol.protocol+' · '+protocol.date,12);
  text(protocol.address,12);
  text('Ukázkový technik · Fiktivní údaje');
  y-=12;
  if(type!=='photos') {
    for(const section of sections) {
      space(47);
      text(section.title,13,ACCENT);
      for(const [label,value] of section.rows)text(label+' – '+value);
      y-=9;
    }
    if(protocol.signature?.length) {
      space(102);
      text('Elektronický podpis',13,ACCENT);
      for(const stroke of protocol.signature) {
        const point=([x,pY])=>({x:MARGIN+x*2,y:y-pY*.74});
        for(let index=1;index<stroke.length;index++) {
          page.drawLine({start:point(stroke[index-1]),end:point(stroke[index]),thickness:1.3,color:INK});
        }
      }
      y-=86;
    }
  }
  if(type!=='protocol') {
    space(44);
    text('Fotolist',16,ACCENT);
    const photos=protocol.inspection?.photos||[];
    if(!photos.length)text('Bez fotodokumentace.');
    for(const photo of photos) {
      const image=new Image();
      image.src=new URL(photo.src,location.href).href;
      await image.decode();
      const canvas=document.createElement('canvas');
      canvas.width=Math.min(image.naturalWidth,900);
      canvas.height=Math.round(image.naturalHeight*canvas.width/image.naturalWidth);
      canvas.getContext('2d').drawImage(image,0,0,canvas.width,canvas.height);
      const jpeg=await pdf.embedJpg(canvas.toDataURL('image/jpeg',.84));
      const scale=Math.min(1,(PAGE_WIDTH-2*MARGIN)/jpeg.width,230/jpeg.height);
      const height=jpeg.height*scale;
      space(height+49);
      page.drawImage(jpeg,{x:MARGIN,y:y-height,width:jpeg.width*scale,height});
      y-=height+4;
      text(photo.description||photo.id);
      y-=12;
    }
  }
  return new Blob([await pdf.save()],{type:'application/pdf'});
}
