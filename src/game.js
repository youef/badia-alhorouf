const $=id=>document.getElementById(id),R=Math.random,AR=n=>String(n).replace(/\d/g,d=>'٠١٢٣٤٥٦٧٨٩'[d]),sh=a=>a.map(v=>[R(),v]).sort((x,y)=>x[0]-y[0]).map(v=>v[1]);
const ren=new THREE.WebGLRenderer({antialias:true});ren.setPixelRatio(Math.min(devicePixelRatio,2));ren.shadowMap.enabled=true;ren.toneMapping=THREE.ACESFilmicToneMapping;ren.outputEncoding=THREE.sRGBEncoding;document.body.prepend(ren.domElement);
const scene=new THREE.Scene();scene.fog=new THREE.Fog(0x9ad4f0,50,170);scene.background=new THREE.Color(0x9ad4f0);
const cam=new THREE.PerspectiveCamera(52,1,.1,500),hemi=new THREE.HemisphereLight(0xffffff,0xc9a25e,.85),dl=new THREE.DirectionalLight(0xfff1cf,1.2);
dl.position.set(40,70,30);dl.castShadow=true;dl.shadow.mapSize.set(2048,2048);Object.assign(dl.shadow.camera,{left:-75,right:75,top:75,bottom:-75,far:220});scene.add(hemi,dl);
const S=(c,o={})=>new THREE.MeshStandardMaterial(Object.assign({color:c,roughness:.85},o)),cvs=(w,h)=>{const c=document.createElement('canvas');c.width=w;c.height=h;return c;};
const T=c=>{const t=new THREE.CanvasTexture(c);t.encoding=THREE.sRGBEncoding;t.wrapS=t.wrapT=THREE.RepeatWrapping;return t;};
const cast=g=>{g.traverse(o=>{if(o.isMesh)o.castShadow=true;});return g;};
const M=(geo,m,x,y,z,p)=>{const e=new THREE.Mesh(geo,m);e.position.set(x,y,z);(p||scene).add(e);return e;};
// ground & scenery
const gc=cvs(256,256),gx=gc.getContext('2d');gx.fillStyle='#e0c285';gx.fillRect(0,0,256,256);for(let i=0;i<2200;i++){gx.fillStyle=R()<.5?'rgba(120,90,50,.13)':'rgba(255,240,200,.15)';gx.fillRect(R()*256,R()*256,3,3);}
const gt=T(gc);gt.repeat.set(60,60);const gd=M(new THREE.CircleGeometry(190,48),S(0xffffff,{map:gt,roughness:1}),0,0,0);gd.rotation.x=-Math.PI/2;gd.receiveShadow=true;
for(let i=0;i<16;i++){const a=i/16*6.28,r=112+R()*25;M(new THREE.SphereGeometry(1,16,10),S(0xd9b377),Math.cos(a)*r,-.5,Math.sin(a)*r).scale.set(14+R()*10,3+R()*3,10+R()*6);}
for(let i=0;i<10;i++){const a=i/10*6.28+.3;M(new THREE.ConeGeometry(30,36+R()*16,6),S(0x9a7452),Math.cos(a)*160,15,Math.sin(a)*160);}
for(let i=0;i<30;i++){const a=R()*6.28,r=15+R()*78;cast(M(new THREE.DodecahedronGeometry(.4+R()*.8),S(0x8a7a66),Math.cos(a)*r,.3,Math.sin(a)*r));}
const obs=[];
function palm(x,z){const g=new THREE.Group();M(new THREE.CylinderGeometry(.3,.45,6,8),S(0x7a5230),0,3,0,g);
 for(let j=0;j<8;j++){const p=new THREE.Group(),l=M(new THREE.BoxGeometry(.6,.08,3.4),S(0x2f8a4a),0,0,1.6,p);l.rotation.x=.4;p.position.y=6;p.rotation.y=j/8*6.28;g.add(p);}
 g.position.set(x,0,z);scene.add(cast(g));obs.push({x,z,r:1.1});}
for(let i=0;i<7;i++){const a=i/7*6.28;palm(Math.cos(a)*7,-34+Math.sin(a)*7);}
for(let i=0;i<26;i++){const a=R()*6.28,r=20+R()*70;palm(Math.cos(a)*r,Math.sin(a)*r);}
const sc2=cvs(64,16),sx=sc2.getContext('2d');['#1c1410','#4a3222','#1c1410','#e8dcc0','#2b1d14','#4a3222'].forEach((c,i)=>{sx.fillStyle=c;sx.fillRect(i*11,0,11,16);});const st=T(sc2);st.repeat.set(3,1);
function tent(x,z,rug,s=1){const g=new THREE.Group(),rm=S(0xffffff,{map:st}),dk=S(0x2b1d14);
 for(const s of[-1,1]){const r=M(new THREE.BoxGeometry(3.6,.14,6),rm,s*1.55,2.6,0,g);r.rotation.z=-s*.62;}
 M(new THREE.BoxGeometry(5.2,2.6,.12),dk,0,1.3,-2.9,g);
 for(const px of[-2.6,2.6])for(const pz of[-2.9,2.9])M(new THREE.CylinderGeometry(.09,.09,2.7,6),S(0x6b4a2a),px,1.35,pz,g);
 M(new THREE.BoxGeometry(4.6,.06,5.2),S(rug),0,.04,0,g);M(new THREE.BoxGeometry(1.4,.4,.6),S(0xb03a2e),-1.4,.25,-2.2,g);M(new THREE.BoxGeometry(1.4,.4,.6),S(0xb03a2e),1.4,.25,-2.2,g);
 M(new THREE.ConeGeometry(.2,.5,10),S(0xd4a017,{metalness:.6}),1.8,.3,.8,g);M(new THREE.SphereGeometry(.2,10,8),S(0xd4a017,{metalness:.6}),1.8,.65,.8,g);
 g.position.set(x,0,z);g.scale.setScalar(s);scene.add(cast(g));}
const H=[[22,0],[-22,0]],C=[[34,10],[-34,10]],TR=[[34,2],[-34,2]],FP=[[22,5.5],[-22,5.5]];
tent(22,0,0xa83232);tent(-22,0,0x2f5d9e);tent(-14,-42,0x6b4a2a);tent(46,-42,0x8a5a2a);tent(57,-50,0x4a6b3a);tent(22,-16,0xa84a32);tent(36,-18,0xa83232);tent(-22,-16,0x2f6d9e);tent(-36,-18,0x2f5d9e);const DX=68,DZ=-44;tent(DX,DZ,0x8a2a2a,1.6);
// well
const well=new THREE.Group();M(new THREE.CylinderGeometry(1.7,1.9,1,16,1,true),S(0x8d8d8d,{side:2}),0,.5,0,well);M(new THREE.CircleGeometry(1.5,16),S(0x2b8fd6,{roughness:.1}),0,.6,0,well).rotation.x=-Math.PI/2;
for(const x of[-1.5,1.5])M(new THREE.CylinderGeometry(.1,.1,3,6),S(0x6b4a2a),x,1.8,0,well);M(new THREE.CylinderGeometry(.08,.08,3.2,6),S(0x6b4a2a),0,3.2,0,well).rotation.z=Math.PI/2;
well.position.set(0,0,-34);scene.add(cast(well));obs.push({x:0,z:-34,r:2.3});
// troughs + fire
const tr=[0,0],trm=[],fire=[],flame=[];
for(let i=0;i<2;i++){const g=new THREE.Group();M(new THREE.BoxGeometry(3.2,.6,1.1),S(0x7a5230),0,.3,0,g);trm.push(M(new THREE.BoxGeometry(2.9,.5,.85),S(0x39a0e8,{roughness:.1}),0,.1,0,g));g.position.set(TR[i][0],0,TR[i][1]);scene.add(cast(g));
 const f=M(new THREE.ConeGeometry(.45,1.3,8),new THREE.MeshBasicMaterial({color:0xff8a1f}),FP[i][0],.8,FP[i][1]);f.visible=false;flame.push(f);
 M(new THREE.TorusGeometry(.8,.18,6,12),S(0x555555),FP[i][0],.15,FP[i][1]).rotation.x=Math.PI/2;
 const li=new THREE.PointLight(0xff9a40,0,24);li.position.set(FP[i][0],2,FP[i][1]);scene.add(li);fire.push(li);}
const st3=new THREE.BufferGeometry(),sp=[];for(let i=0;i<350;i++){const a=R()*6.28,e=.15+R()*1.2;sp.push(Math.cos(a)*Math.cos(e)*400,Math.sin(e)*400,Math.sin(a)*Math.cos(e)*400);}
st3.setAttribute('position',new THREE.Float32BufferAttribute(sp,3));const stars=new THREE.Points(st3,new THREE.PointsMaterial({color:0xffffff,size:2,sizeAttenuation:false,fog:false}));stars.visible=false;scene.add(stars);
// people
function chk(a,b){const c=cvs(64,64),x=c.getContext('2d');x.fillStyle=a;x.fillRect(0,0,64,64);x.fillStyle=b;for(let i=0;i<8;i++)for(let j=0;j<8;j++)if((i+j)%2==0)x.fillRect(i*8,j*8,8,8);return S(0xffffff,{map:T(c),side:2});}
function label(txt,col){const c=cvs(256,96),s=new THREE.Sprite(new THREE.SpriteMaterial({map:new THREE.CanvasTexture(c),depthTest:false})),dr=()=>{const x=c.getContext('2d');x.clearRect(0,0,256,96);x.fillStyle=col;x.fillRect(8,14,240,68);x.fillStyle='#fff';x.font='800 '+Math.min(44,Math.floor(430/txt.length))+'px Cairo,Tahoma,sans-serif';x.textAlign='center';x.textBaseline='middle';x.fillText(txt,128,50);s.material.map.needsUpdate=true;};dr();document.fonts.ready.then(dr);s.scale.set(3,1.1,1);return s;}
function mkPerson(o){
 const g=new THREE.Group(),sk=S(o.sk||0xc68b5e),th=S(o.th),dk=S(0x1b1b1b),wh=S(0xffffff);
 M(new THREE.LatheGeometry([[0,0],[.62,0],[.6,.35],[.48,1],[.38,1.5],[.22,1.8],[0,1.82]].map(v=>new THREE.Vector2(v[0],v[1])),20),th,0,0,0,g);
 M(new THREE.CylinderGeometry(.1,.12,.25,8),sk,0,1.9,0,g);M(new THREE.SphereGeometry(.3,20,16),sk,0,2.15,0,g).scale.set(1,1.1,1.02);M(new THREE.SphereGeometry(.05,8,8),sk,0,2.1,.3,g);
 for(const s of[-1,1]){M(new THREE.SphereGeometry(.07,8,8),sk,s*.3,2.15,0,g);M(new THREE.SphereGeometry(.055,10,8),wh,s*.11,2.21,.25,g);M(new THREE.SphereGeometry(.03,8,8),dk,s*.11,2.21,.298,g);M(new THREE.BoxGeometry(.1,.02,.02),dk,s*.11,2.3,.27,g);}
 M(new THREE.TorusGeometry(.08,.014,6,12,Math.PI),S(0x7a2e2e),0,2.05,.28,g).rotation.z=Math.PI;
 if(o.c=='g'){const gm=chk(o.g1,o.g2);M(new THREE.SphereGeometry(.37,22,12,0,6.28,0,1.7),gm,0,2.17,0,g);M(new THREE.CylinderGeometry(.38,.54,.85,22,1,true,.9,4.5),gm,0,1.92,0,g);M(new THREE.TorusGeometry(.36,.035,8,22),dk,0,2.42,0,g).rotation.x=Math.PI/2;M(new THREE.TorusGeometry(.37,.03,8,22),dk,0,2.36,0,g).rotation.x=Math.PI/2;}
 if(o.c=='s'){const b=S(0x141414,{side:2});M(new THREE.SphereGeometry(.37,20,12,0,6.28,0,1.9),b,0,2.15,0,g);M(new THREE.CylinderGeometry(.38,.5,.9,20,1,true,.9,4.5),b,0,1.9,0,g);}
 if(o.beard)M(new THREE.SphereGeometry(.27,14,10),S(o.beard),0,1.95,.1,g).scale.set(1,.7,.6);
 const limb=x=>{const p=new THREE.Group();p.position.set(x,1.62,0);M(new THREE.CylinderGeometry(.12,.1,.8,10),th,0,-.4,0,p);M(new THREE.SphereGeometry(.09,10,8),sk,0,-.94,0,p);g.add(p);return p;};
 const armL=limb(-.45),armR=limb(.45),feet=new THREE.Group(),br=S(0x4a2f1a),fL=M(new THREE.BoxGeometry(.2,.1,.4),br,-.2,.05,.1,feet),fR=M(new THREE.BoxGeometry(.2,.1,.4),br,.2,.05,.1,feet);g.add(feet);
 const jug=M(new THREE.CylinderGeometry(.22,.3,.55,10),S(0x9a5a2a),0,2.75,0,g);jug.visible=false;
 g.scale.setScalar(o.s||.95);scene.add(cast(g));const lap=M(new THREE.SphereGeometry(.6,12,8),th,0,.6,.4,g);lap.scale.set(1.1,.4,.9);lap.visible=false;return{g,armL,armR,feet,fL,fR,jug,lap};}
const walk=(p,t,mv)=>{const s=mv?Math.sin(t):0;p.armL.rotation.x=s*.8;p.armR.rotation.x=-s*.8;p.fL.position.z=.1+s*.3;p.fR.position.z=.1-s*.3;};
function mkPlayer(o){const p=mkPerson(o),lb=label(o.name,o.col);lb.position.y=3.3;p.g.add(lb);
 const ring=M(new THREE.RingGeometry(.9,1.15,24),new THREE.MeshBasicMaterial({color:o.ring,side:2}),0,.05,0);ring.rotation.x=-Math.PI/2;
 Object.assign(p,{ring,col:o.col,t:0,ang:0,jx:0,jz:0,act:false,busy:false,sit:false,st:0,jugs:0,cof:0,fire:false,k:o.k,cp:new THREE.Vector3(),cl:new THREE.Vector3(),lab:''});return p;}
const P=[mkPlayer({th:0xffffff,c:'g',g1:'#fff',g2:'#c8102e',ring:0xc8102e,name:'فواز',col:'#c8102e',k:{l:'KeyA',r:'KeyD',u:'KeyW',d:'KeyS',a:'KeyE'}}),
 mkPlayer({th:0xdce6f2,c:'g',g1:'#fff',g2:'#222',ring:0x1769c2,name:'زياد',col:'#1769c2',k:{l:'ArrowLeft',r:'ArrowRight',u:'ArrowUp',d:'ArrowDown',a:'Enter'}})];
P.forEach((p,i)=>p.g.position.set(H[i][0],0,H[i][1]+8));
// sheep
function mkSheep(){const g=new THREE.Group(),w=S(0xf2efe6),d=S(0x2a2218);M(new THREE.SphereGeometry(.6,12,10),w,0,.85,0,g).scale.set(1,.85,1.35);for(let i=0;i<5;i++)M(new THREE.SphereGeometry(.28,8,8),w,(R()-.5)*.7,1.15,(R()-.5)*1,g);
 M(new THREE.SphereGeometry(.24,10,8),d,0,.95,.85,g);for(const s of[-1,1]){M(new THREE.SphereGeometry(.1,6,6),d,s*.24,1.05,.8,g).scale.set(1,.5,1);for(const z of[-.4,.4])M(new THREE.CylinderGeometry(.05,.05,.5,5),d,s*.25,.25,z,g);}
 scene.add(cast(g));return{g,tx:0,tz:0,w:R()*6};}
function mkFlock(cx,cz,n,rad){const f={c:{x:cx,z:cz},rad,sheep:[],happy:0};for(let i=0;i<n;i++){const s=mkSheep();s.g.position.set(cx+(R()-.5)*rad*2,0,cz+(R()-.5)*rad*2);s.tx=s.g.position.x;s.tz=s.g.position.z;f.sheep.push(s);}return f;}
function flockStep(f,dt,now){f.happy-=dt;for(const s of f.sheep){const q=s.g.position,dx=s.tx-q.x,dz=s.tz-q.z,d=Math.hypot(dx,dz);
 if(d<.6||R()<.002){const a=R()*6.28,r=R()*f.rad;s.tx=f.c.x+Math.cos(a)*r;s.tz=f.c.z+Math.sin(a)*r;}
 else{const v=1.1*dt;q.x+=dx/d*v;q.z+=dz/d*v;let da=Math.atan2(dx,dz)-s.g.rotation.y;da=Math.atan2(Math.sin(da),Math.cos(da));s.g.rotation.y+=da*Math.min(1,4*dt);}
 q.y=f.happy>0?Math.abs(Math.sin(now/120+s.w))*.6:Math.abs(Math.sin(now/260+s.w))*.04;}}
const flocks=[mkFlock(C[0][0],C[0][1],6,6),mkFlock(C[1][0],C[1][1],6,6)],pas=mkFlock(0,40,9,5);
const shep=mkPerson({th:0xcdb892,c:'g',g1:'#fff',g2:'#6b5a3a',beard:0x2a2018,s:1});
// women at the well
const wm=[0,1,2].map(i=>{const p=mkPerson({th:0x151515,c:'s',sk:0xd2a074,s:.92});return{p,u:i*.3,dir:1,wait:i*1.2,t:0};});
// camp of the elders
const crowd=[[46,-40.6,0x4a3b2a,'g',0xcfcfcf,.95,1],[48.4,-40.4,0xdcd0b0,'g',0x888888,.95,1],[55,-46,0x151515,'s',0,.92,0],[52,-44,0xffffff,'g',0,.55,0],[50,-47,0xe8c8a0,'g',0,.5,0]].map(a=>{const p=mkPerson({th:a[2],c:a[3],g1:'#fff',g2:'#a33',beard:a[4]||0,s:a[5]});p.g.position.set(a[0],a[6]?-.45:0,a[1]);p.sit=a[6];p.bx=a[0];p.bz=a[1];p.bs=a[5];return p;});
const ef=M(new THREE.ConeGeometry(.45,1.3,8),new THREE.MeshBasicMaterial({color:0xff8a1f}),50,.8,-37);
// learning
const LET=[['أ','أرنب','🐇'],['ت','تمر','🌴'],['ج','جمل','🐪'],['ح','حصان','🐎'],['خ','خيمة','⛺'],['د','دلة','☕'],['ش','شاي','🍵'],['ص','صقر','🦅'],['غ','غنم','🐑'],['ق','قهوة','☕'],['ك','كلب','🐕'],['م','ماء','💧'],['ن','نار','🔥'],['ه','هيل','🌿'],['و','وردة','🌹'],['ع','عنزة','🐐'],['ف','فنجان','☕'],['ل','ليمون','🍋']];
const WRD=[['☕','قهوة'],['🔥','نار'],['💧','ماء'],['🐪','جمل'],['🐑','غنم'],['🌴','نخلة'],['⛺','خيمة'],['🐎','حصان'],['🦅','صقر'],['🌙','قمر']];
const STO=[['الشيخ يشرب ____ في المجلس','قهوة',['حجر','سيف']],['الجمل يمشي في ____','الصحراء',['البحر','السماء']],['الغنم تشرب ____ من البئر','ماء',['رمل','نار']],['نشعل ____ في الليل','نار',['ثلج','ورد']],['نأكل ____ مع القهوة','تمر',['حديد','ريح']]];
const pick=a=>a[R()*a.length|0];
function toast(i,m){const e=$('tt'+i);e.textContent=m;e.style.display='block';clearTimeout(e.h);e.h=setTimeout(()=>e.style.display='none',2200);}
function hud(i){const p=P[i];$('sc'+i).textContent='⭐'+AR(p.st)+'  💧'+AR(p.jugs)+'  ☕'+AR(p.cof)+'  🪣'+AR(tr[i])+'/٥';}
function open(i,title,btns){const q=$('q'+i);q.innerHTML='<div>'+title+'</div>'+btns.map((b,k)=>'<button>'+b[0]+'</button>').join('');q.style.display='block';P[i].busy=true;q.querySelectorAll('button').forEach((b,k)=>b.onclick=btns[k][1]);}
function closeQ(i){$('q'+i).style.display='none';P[i].busy=false;P[i].sit=false;}
function ask(i,title,right,wrong,ok){open(i,title,sh([right,...wrong]).map(o=>[o,()=>{if(o===right){beep(900,.15);P[i].st++;closeQ(i);hud(i);ok();}else{beep(200,.2);$('q'+i).firstChild.textContent='حاول مرة ثانية 💪';}}]).concat([['✖',()=>closeQ(i)]]));}
function numQ(i,what,ok){const n=2+R()*8|0,w=sh([n-2,n-1,n+1,n+2].filter(x=>x>0)).slice(0,2);ask(i,what+'<br>'+'🐑'.repeat(n)+'<br>كم العدد؟',AR(n),w.map(AR),ok);}
function letQ(i,ok){const e=pick(LET);ask(i,'ما الحرف الأول في «'+e[1]+'» '+e[2]+' ؟',e[0],sh(LET.filter(x=>x[0]!=e[0])).slice(0,2).map(x=>x[0]),ok);}
function wordQ(i,ok){const e=pick(WRD);ask(i,'ما اسم هذا؟ '+e[0],e[1],sh(WRD.filter(x=>x[1]!=e[1])).slice(0,2).map(x=>x[1]),ok);}
function sitMenu(i){const p=P[i];p.sit=true;p.g.position.set(H[i][0],0,H[i][1]+.3);p.ang=0;
 const ev=tod>.58&&tod<.8;
 open(i,'جلسة الخيمة',[
  ['☕ القهوة',()=>{if(!p.fire){toast(i,'أشعل النار أول 🔥');closeQ(i);}else wordQ(i,()=>{p.cof++;hud(i);toast(i,'القهوة جاهزة ☕');closeQ(i);});}],
  [ev?'🍲 العشاء':'⏳ انتظر العشاء',()=>{if(!ev){tod=.6;toast(i,'حان المغرب 🌅');closeQ(i);}else numQ(i,'كم تمرة على العشاء؟',()=>{p.st+=2;hud(i);toast(i,'بالعافية 🍲');closeQ(i);});}],
  ['😴 نم للصباح',()=>{tod=0;toast(i,'صباح جديد ☀️');closeQ(i);}],['✖',()=>closeQ(i)]]);}
function acts(i){const p=P[i],f=flocks[i];let cx=0,cz=0;f.sheep.forEach(s=>{cx+=s.g.position.x;cz+=s.g.position.z;});cx/=f.sheep.length;cz/=f.sheep.length;
 return[{x:0,z:-31,r:5,l:'املأ جرّة 💧',f:()=>letQ(i,()=>{p.jugs++;hud(i);toast(i,'جرّة ماء 💧');})},
 {x:TR[i][0],z:TR[i][1],r:4,l:'اسكب الماء 🪣',f:()=>{if(!p.jugs)return toast(i,'جب ماء من البئر أول 💧');tr[i]+=p.jugs;p.jugs=0;if(tr[i]>=5){tr[i]=0;p.st+=3;f.happy=3;beep(1000,.3);toast(i,'رويت غنمك! 🐑');}else toast(i,'الحوض '+AR(tr[i])+'/٥');hud(i);}},
 {x:cx,z:cz,r:7,l:'عدّ الغنم 🐑',f:()=>numQ(i,'عدّ الغنم',()=>toast(i,'أحسنت! 🐑'))},
 {x:H[i][0],z:H[i][1]+1,r:4.5,l:'اجلس ☕',f:()=>sitMenu(i)},
 {x:FP[i][0],z:FP[i][1],r:3.5,l:'أشعل النار 🔥',f:()=>{if(p.fire)return toast(i,'النار مشتعلة 🔥');numQ(i,'كم حطبة نحتاج؟',()=>{p.fire=true;toast(i,'اشتعلت النار 🔥');});}},
 ...xa(i)];}
let tod=0.02,ac;function beep(f,d=.12){try{ac=ac||new(window.AudioContext||window.webkitAudioContext)();const o=ac.createOscillator(),g=ac.createGain(),n=ac.currentTime;o.type='triangle';o.frequency.value=f;g.gain.setValueAtTime(.12,n);g.gain.exponentialRampToValueAtTime(.001,n+d);o.connect(g);g.connect(ac.destination);o.start(n);o.stop(n+d);}catch(e){}}
// input
import { createGameStore, normalizeMode } from './app/store.js';
import { BuildingSystem } from './app/buildings.js';
const gameStore=createGameStore();
let profileState=gameStore.load();
let gameMode="two",activePlayer=0,soundsOn=true,zoom=[1,1];const playerIndices=()=>gameMode==="two"?[0,1]:[activePlayer];const keys={},DK=[['Digit1','Digit2','Digit3','Digit4'],['Digit7','Digit8','Digit9','Digit0']];
addEventListener('keydown',e=>{keys[e.code]=1;if(e.code==='Tab'){e.preventDefault();if(gameMode!=='two'){activePlayer=activePlayer?0:1;layout();toast(activePlayer,'تم التبديل إلى '+(activePlayer?'زياد 🔵':'فواز 🔴'));}};if(/Arrow|Space|Enter/.test(e.code))e.preventDefault();if(e.repeat)return;P.forEach((p,i)=>{if(e.code==p.k.a&&!p.busy)p.act=true;const k=DK[i].indexOf(e.code);if(p.busy&&k>=0){const b=$('q'+i).querySelectorAll('button')[k];b&&b.click();}});});
addEventListener('keyup',e=>keys[e.code]=0);document.addEventListener('gesturestart',e=>e.preventDefault());
['f','z'].forEach((c,i)=>{const d=document.createElement('div');d.className='pane '+c;d.id='pn'+i;d.innerHTML='<div class="sc" id="sc'+i+'"></div><div class="tt" id="tt'+i+'"></div><div class="q" id="q'+i+'"></div><div class="joy" id="j'+i+'"><i></i></div><button class="b" id="ab'+i+'">—</button>';document.body.append(d);
 const p=P[i],el=$('j'+i),kn=el.firstElementChild,mv=e=>{const r=el.getBoundingClientRect();let x=(e.clientX-r.left-56)/56,y=(e.clientY-r.top-56)/56;const l=Math.hypot(x,y);if(l>1){x/=l;y/=l;}p.jx=x;p.jz=y;kn.style.left=34+x*34+'px';kn.style.top=34+y*34+'px';};
 el.onpointerdown=e=>{el.setPointerCapture(e.pointerId);mv(e);};el.onpointermove=e=>{if(el.hasPointerCapture(e.pointerId))mv(e);};el.onpointerup=el.onpointercancel=()=>{p.jx=p.jz=0;kn.style.left=kn.style.top='34px';};
 $('ab'+i).onpointerdown=()=>{if(!p.busy)p.act=true;};hud(i);});
$('go').onclick=e=>{e.target.blur();$('ov').style.display='none';ac&&ac.resume();beep(600,.15);};
function rect(i){const W=innerWidth,H2=innerHeight;if(gameMode!=='two')return{x:0,t:0,w:W,h:H2};return W>=H2?{x:i?0:W/2,t:0,w:W/2,h:H2}:{x:0,t:i?H2/2:0,w:W,h:H2/2};}
function layout(){const W=innerWidth,H2=innerHeight;ren.setSize(W,H2);P.forEach((p,i)=>{const v=rect(i),e=$('pn'+i).style;e.display=gameMode==='two'||i===activePlayer?'block':'none';e.left=v.x+'px';e.top=v.t+'px';e.width=v.w+'px';e.height=v.h+'px';});
 const d=$('dv').style;if(W>=H2){d.left=W/2-2+'px';d.top=0;d.width='4px';d.height='100%';}else{d.left=0;d.top=H2/2-2+'px';d.width='100%';d.height='4px';}}
addEventListener('resize',layout);layout();
// day & night
const KS=[[0,0x9ad4f0],[.55,0x7cc4ee],[.65,0xf0905a],[.74,0x1a2250],[.93,0x0b1330],[1,0x9ad4f0]];
function skyAt(t){for(let i=1;i<KS.length;i++)if(t<=KS[i][0]){const a=KS[i-1],b=KS[i];return new THREE.Color(a[1]).lerp(new THREE.Color(b[1]),(t-a[0])/(b[0]-a[0]));}}
const dayI=t=>t<.6?1:t<.72?1-(t-.6)/.12*.75:t<.93?.25:.25+(t-.93)/.07*.75;
function step(p,i,dt){
 const k=p.k,hp=p.g.position,lock=p.busy||p.sit;
 let dx=lock?0:p.jx+(keys[k.r]?1:0)-(keys[k.l]?1:0),dz=lock?0:p.jz+(keys[k.d]?1:0)-(keys[k.u]?1:0);const l=Math.hypot(dx,dz);
 if(l>.1){dx/=Math.max(l,1);dz/=Math.max(l,1);hp.x+=dx*7.5*dt;hp.z+=dz*7.5*dt;let d=Math.atan2(dx,dz)-p.ang;d=Math.atan2(Math.sin(d),Math.cos(d));p.ang+=d*Math.min(1,10*dt);p.t+=dt*11;}else p.t*=.9;
 const r=Math.hypot(hp.x,hp.z);if(r>95){hp.x*=95/r;hp.z*=95/r;}
 for(const o of obs){const ex=hp.x-o.x,ez=hp.z-o.z,d=Math.hypot(ex,ez);if(d<o.r){hp.x=o.x+ex/d*o.r;hp.z=o.z+ez/d*o.r;}}
 p.g.rotation.y=p.ang;const s=Math.sin(p.t);
 p.lap.visible=!!p.sit;if(p.sit){hp.y=-.45;p.feet.visible=false;p.armL.rotation.x=p.armR.rotation.x=-.9;}else{hp.y=Math.abs(s)*.07;p.feet.visible=true;walk(p,p.t,true);}
 p.ring.position.set(hp.x,.05,hp.z);
 let best=null,bd=1e9;if(!p.busy&&!p.sit)for(const a of acts(i)){const d=Math.hypot(a.x-hp.x,a.z-hp.z);if(d<a.r&&d<bd){bd=d;best=a;}}
 const lab=best?best.l:'—';if(lab!=p.lab){p.lab=lab;const b=$('ab'+i);b.textContent=lab;b.style.opacity=best?1:.35;}
 if(p.act){p.act=false;if(best)best.f();}
}
function loop(now){
 
/* ===== التوسعة الجديدة: السوق، الحلال، الطبخ والضيافة ===== */
(function(){
  const oldXa = xa;
  const money = [80,80], herd = [0,0], camels = [0,0], horsesOwned = [0,0];
  const meal = [0,0], raw = [0,0], campsBuilt = [0,0];
  const wife = [null,null];

  function makeCamel(){
    const g=new THREE.Group(), body=S(0xb98752), dark=S(0x5a3820);
    M(new THREE.SphereGeometry(1,14,10),body,0,1.35,0,g).scale.set(.7,.75,1.35);
    M(new THREE.CylinderGeometry(.22,.3,1.25,8),body,0,2.45,.75,g).rotation.x=-.35;
    M(new THREE.SphereGeometry(.42,12,9),body,0,3.05,1.05,g).scale.set(.9,1.05,1.05);
    M(new THREE.SphereGeometry(.12,8,6),dark,-.18,3.15,1.4,g);
    M(new THREE.SphereGeometry(.12,8,6),dark,.18,3.15,1.4,g);
    for(const x of[-.35,.35])for(const z of[-.8,.8])M(new THREE.CylinderGeometry(.09,.12,1.45,7),body,x,.65,z,g);
    M(new THREE.TorusGeometry(.35,.04,8,18),dark,0,2.2,.1,g).rotation.x=Math.PI/2;
    scene.add(cast(g)); return g;
  }
  function makePen(x,z,labelText,col){
    const g=new THREE.Group(), m=S(0x76502f);
    for(const q of[-2.8,2.8])M(new THREE.BoxGeometry(.12,1.2,6),m,q,.6,0,g);
    for(const q of[-2,0,2])M(new THREE.BoxGeometry(5.6,1.0,.12),m,0,.6,q,g);
    const l=label(labelText,col);l.scale.set(4.5,1.4,1);l.position.y=2.4;g.add(l);
    g.position.set(x,0,z);scene.add(cast(g)); return g;
  }
  makePen(30,-4,'حظيرة الإبل','#8b5a2b');
  makePen(-30,-4,'حظيرة الغنم','#7a4a2a');
  makePen(0,48,'إسطبل الخيل','#6b2a2a');

  const camelsByPlayer=[[],[]];
  [[30,-2],[-30,-2]].forEach((q,i)=>{ for(let n=0;n<2;n++){const g=makeCamel();g.position.set(q[0]+(n?2:-2),0,q[1]+(n?1:-1));camelsByPlayer[i].push(g);} });

  function makeWife(i){
    const p=mkPerson({th:0x1b1b1b,c:'s',sk:0xd09a72,s:.9});
    p.g.position.set(H[i][0]+(i?3:-3),0,H[i][1]-3);
    const l=label(i?'زوجة زياد':'زوجة فواز',i?'#1769c2':'#c8102e');l.scale.set(4.2,1.2,1);l.position.y=3.2;p.g.add(l);
    return p;
  }
  wife[0]=makeWife(0); wife[1]=makeWife(1);

  function stat(i){
    return '💰'+AR(money[i])+' · 🐑'+AR(herd[i])+' · 🐪'+AR(camels[i])+' · 🐎'+AR(horsesOwned[i])+' · 🍲'+AR(meal[i]);
  }
  function shop(i){
    const p=P[i];
    open(i,'سوق البادية<br><small>'+stat(i)+'</small>',[
      ['🐑 شراء شاة 20',()=>{if(money[i]<20)return toast(i,'النقود لا تكفي');money[i]-=20;herd[i]++;p.st++;hud(i);toast(i,'اشتريت شاة 🐑');closeQ(i);}],
      ['🐪 شراء جمل 50',()=>{if(money[i]<50)return toast(i,'النقود لا تكفي');money[i]-=50;camels[i]++;p.st+=2;hud(i);toast(i,'اشتريت جملاً 🐪');closeQ(i);}],
      ['🐎 شراء حصان 70',()=>{if(money[i]<70)return toast(i,'النقود لا تكفي');money[i]-=70;horsesOwned[i]++;p.st+=3;toast(i,'اشتريت حصاناً 🐎');closeQ(i);}],
      ['💰 بيع شاة +14',()=>{if(!herd[i])return toast(i,'لا توجد شاة للبيع');herd[i]--;money[i]+=14;toast(i,'بعت شاة');closeQ(i);}],
      ['💰 بيع جمل +40',()=>{if(!camels[i])return toast(i,'لا يوجد جمل للبيع');camels[i]--;money[i]+=40;toast(i,'بعت جملاً');closeQ(i);}],
      ['✖',()=>closeQ(i)]
    ]);
  }
  function buildCamp(i){
    const p=P[i];
    if(campsBuilt[i]>=3)return toast(i,'بنيت الحد الأقصى من المخيمات');
    if(money[i]<35)return toast(i,'تحتاج 35 ديناراً للبناء');
    money[i]-=35;campsBuilt[i]++;
    const x=H[i][0]+(i?-(10+campsBuilt[i]*4):(10+campsBuilt[i]*4)),z=H[i][1]-8;
    tent(x,z,i?0x315d92:0xa83232,.8);
    toast(i,'أضفت مخيماً جديداً ⛺');closeQ(i);
  }
  function cookMenu(i){
    const p=P[i];
    if(!raw[i])return toast(i,'أحضر ذبيحة أولاً');
    open(i,'مطبخ البيت — '+stat(i),[
      ['🍲 طبخ الذبيحة',()=>{numQ(i,'كم خطوة للطبخ؟',()=>{raw[i]--;meal[i]++;p.st+=5;toast(i,'طبخت وجبة كاملة 🍲');say(wife[i],'العشاء جاهز يا أهل البيت');closeQ(i);});}],
      ['🍽️ تقديم للعائلة والضيف',()=>{if(!meal[i])return toast(i,'لا توجد وجبة جاهزة');meal[i]--;p.st+=4;toast(i,'قُدمت الوجبة للعائلة والضيف ❤️');closeQ(i);}],
      ['✖',()=>closeQ(i)]
    ]);
  }
  function familyMeal(i){
    const p=P[i];
    open(i,'مطبخ '+(i?'زياد':'فواز')+' 🏠',[
      ['🔪 أخذ شاة للذبح',()=>{if(!herd[i])return toast(i,'اشترِ شاة أولاً');herd[i]--;raw[i]=1;toast(i,'أخذت الشاة إلى مكان الذبح');closeQ(i);}],
      ['🍲 أعطِ الذبيحة للزوجة',()=>{if(!raw[i])return toast(i,'لا توجد ذبيحة');say(wife[i],'أبشر، أطبخها لكم');cookMenu(i);}],
      ['🍽️ طبخ وتقديم',()=>cookMenu(i)],
      ['✖',()=>closeQ(i)]
    ]);
  }
  function upgrade(i){
    open(i,'تطوير المنطقة 🏕️',[
      ['⛺ بناء مخيم +35',()=>buildCamp(i)],
      ['🐑 زيادة حظيرة الغنم',()=>{if(money[i]<25)return toast(i,'تحتاج 25 ديناراً');money[i]-=25;herd[i]+=2;toast(i,'تم توسيع حظيرة الغنم');closeQ(i);}],
      ['🐪 تجهيز منطقة الإبل',()=>{if(money[i]<30)return toast(i,'تحتاج 30 ديناراً');money[i]-=30;camels[i]++;toast(i,'جهزت مكاناً للإبل');closeQ(i);}],
      ['✖',()=>closeQ(i)]
    ]);
  }

  const marketActions=[
    {x:10,z:-10,r:6,l:'🛒 سوق البادية',f:function(i){shop(i)}},
    {x:-10,z:-10,r:6,l:'🏗️ تطوير المنطقة',f:function(i){upgrade(i)}},
    {x:0,z:-6,r:5,l:'🍲 مطبخ الأسرة',f:function(i){familyMeal(i)}}
  ];
  function animalHunt(i){
    const p=P[i];
    ask(i,'اختر فريسة للعشاء','أرنب',['ضب','جربوع'],()=>{
      raw[i]=1;p.st+=2;hud(i);toast(i,'عدت بصيدٍ طازج 🐇');say(wife[i],'سأجهز العشاء'); 
    });
  }
  const extra=oldXa(0);
  function expandedXa(i){
    return oldXa(i).concat(marketActions.map(a=>({x:a.x+(i?0:0),z:a.z,r:a.r,l:a.l,f:()=>a.f(i)}))).concat([
      {x:H[i][0]+(i?-3:3),z:H[i][1]-3,r:4,l:'👩 الزوجة',f:()=>familyMeal(i)},
      {x:60,z:24,r:8,l:'🐇 صيد للعشاء',f:()=>animalHunt(i)},
      {x:30,z:-4,r:7,l:'🐪 منطقة الإبل',f:()=>shop(i)},
      {x:-30,z:-4,r:7,l:'🐑 حظيرة الغنم',f:()=>shop(i)},
      {x:0,z:48,r:8,l:'🐎 إسطبل الخيل',f:()=>raceQ(i)}
    ]);
  }
  xa=expandedXa;
  const oldHud=hud;
  hud=function(i){oldHud(i);const e=$('sc'+i);e.textContent='⭐'+AR(P[i].st)+'  '+stat(i);};
  P.forEach((p,i)=>hud(i));
  const oldLoop=loop;
  // دخل بسيط مع مرور اليوم حتى يصبح الاقتصاد قابلاً للّعب.
  let incomeT=0;
  const tickIncome=(dt)=>{
    incomeT+=dt;
    if(incomeT>45){incomeT=0;money[0]+=5+herd[0];money[1]+=5+herd[1];P.forEach((p,i)=>toast(i,'دخل الحلال وصل 💰'+AR(5+herd[i])));}
  };
  const originalV2=v2;
  v2=function(dt,now){originalV2(dt,now);tickIncome(dt);};
})();

requestAnimationFrame(loop);const dt=Math.min((now-(loop.l||now))/1000,.05);loop.l=now;
 playerIndices().forEach(i=>step(P[i],i,dt));
 tod=(tod+dt/150)%1;const di=dayI(tod),sk=skyAt(tod);scene.background=sk;scene.fog.color.copy(sk);hemi.intensity=.2+.65*di;dl.intensity=1.2*di;stars.visible=di<.6;
 const tl=tod<.55?'☀️ نهار':tod<.74?'🌅 مغرب':'🌙 ليل';if($('tm').textContent!=tl)$('tm').textContent=tl;
 for(let i=0;i<2;i++){const f=P[i].fire;flame[i].visible=f;fire[i].intensity=f?(.8+(1-di)*1.2)*(.9+R()*.2):0;if(f)flame[i].scale.y=.8+R()*.5;
  trm[i].scale.y=Math.max(.05,tr[i]/5);trm[i].position.y=.1+tr[i]/5*.2;flockStep(flocks[i],dt,now);}
 ef.scale.y=.8+R()*.5;
 const sa=now/1000*.045;shep.g.position.set(Math.cos(sa)*20,0,40+Math.sin(sa)*13);shep.g.rotation.y=Math.atan2(-Math.sin(sa)*20,Math.cos(sa)*13);walk(shep,now/330,true);
 pas.c.x=shep.g.position.x-Math.sin(shep.g.rotation.y)*3;pas.c.z=shep.g.position.z-Math.cos(shep.g.rotation.y)*3;flockStep(pas,dt,now);
 wm.forEach(w=>{if(w.wait>0){w.wait-=dt;w.p.armL.rotation.x=-.9;w.p.armR.rotation.x=-.9;}else{w.u+=w.dir*dt*.08;if(w.u>=1||w.u<=0){w.u=Math.max(0,Math.min(1,w.u));w.dir*=-1;w.wait=3;w.p.jug.visible=w.dir==-1;}w.t+=dt*7;walk(w.p,w.t,true);}
  const x=-12*w.u,z=-31-7*w.u;w.p.g.position.set(x+(w.u>0&&w.u<1?0:0)+wm.indexOf(w)*1.3,0,z);w.p.g.rotation.y=Math.atan2(-12*w.dir,-7*w.dir);});
 crowd.forEach((c,i)=>{if(c.bs<.6)c.g.position.y=Math.abs(Math.sin(now/300+i))*.4;else if(!c.sit)c.g.rotation.y=Math.sin(now/1500+i)*.3;c.armL.rotation.x=c.sit?-.5:0;c.armR.rotation.x=c.sit?-.5:0;c.feet.visible=!c.sit;c.lap.visible=!!c.sit;});
 v2(dt,now);const H2=innerHeight;ren.setScissorTest(true);
 playerIndices().forEach(i=>{const p=P[i],v=rect(i),q=(race.on&&race.gu[i]!=null)?hs[race.x.indexOf(Math.max(...race.x))].g.position:p.g.position,k=(v.w/v.h<1.2?1.5:1)*zoom[i];
  p.cp.lerp(new THREE.Vector3(q.x,6.5*k,q.z+9*k),.08);p.cl.lerp(new THREE.Vector3(q.x,1.5,q.z-1),.15);
  ren.setViewport(v.x,H2-v.t-v.h,v.w,v.h);ren.setScissor(v.x,H2-v.t-v.h,v.w,v.h);cam.aspect=v.w/v.h;cam.updateProjectionMatrix();cam.position.copy(p.cp);cam.lookAt(p.cl);ren.render(scene,cam);});
}

// ===== الجزء الثاني: ديوان، خيل، صيد، ضيف، أصوات =====
const AC=()=>ac=ac||new(window.AudioContext||window.webkitAudioContext)(),V3=THREE.Vector3;
function tn(f1,f2,d,ty,g,at){try{const a=AC(),o=a.createOscillator(),v=a.createGain(),n=a.currentTime+(at||0);o.type=ty;o.frequency.setValueAtTime(f1,n);o.frequency.linearRampToValueAtTime(f2,n+d);v.gain.setValueAtTime(g,n);v.gain.exponentialRampToValueAtTime(.001,n+d);o.connect(v);v.connect(a.destination);o.start(n);o.stop(n+d);}catch(e){}}
function snd(k){if(!soundsOn)return;if(k=='baa'){tn(300,220,.55,'sawtooth',.05);tn(310,230,.55,'square',.02);}else if(k=='cry'){tn(2200,1100,.5,'sine',.1);tn(1800,900,.4,'sine',.08,.35);}else if(k=='hoof'){for(let j=0;j<24;j++)tn(110,60,.07,'triangle',.18,j*.11);}else if(k=='crackle'){for(let j=0;j<6;j++)tn(900+R()*900,200,.03,'square',.05,R()*.8);}else if(k=='cricket'){for(let j=0;j<6;j++)tn(4300,4300,.04,'square',.015,j*.09);}}
function speak(t){try{const u=new SpeechSynthesisUtterance(t);u.lang='ar-SA';u.rate=.9;speechSynthesis.cancel();speechSynthesis.speak(u);}catch(e){}}
const near=(a,b,r)=>Math.hypot(a.x-b.x,a.z-b.z)<r;
function say(p,t){const b=label(t,'#5a3a1a');b.scale.set(6,1.9,1);b.position.y=3.8;if(p.bub)p.g.remove(p.bub);p.g.add(b);p.bub=b;setTimeout(()=>{if(p.bub==b){p.g.remove(b);p.bub=null;}},3600);if(soundsOn&&P.some(q=>near(q.g.position,p.g.position,18)))speak(t);}
const LN=['يا هلا والله بالضيوف','صبّ القهوة يا ولد','الربيع هالسنة خير والفقع كثير','الصقر الحر ما ياكل إلا من صيده','سقّوا الغنم قبل المغرب','الله يحييكم ما جيتوا إلا على خير','البادية مدرسة يا عيال','حيّا الله من جانا'];
function sign(x,z,t,c){const g=new THREE.Group();M(new THREE.CylinderGeometry(.12,.12,4,6),S(0x6b4a2a),0,2,0,g);const l=label(t,c);l.scale.set(6.4,2.2,1);l.position.y=4.6;g.add(l);g.position.set(x,0,z);scene.add(cast(g));}
sign(13,9,'مخيم فواز','#c8102e');sign(-13,9,'مخيم زياد','#1769c2');sign(40,-33,'مخيم عائلة أبو خالد','#7a4a1a');sign(DX,DZ+7,'ديوان الشيخ سالم','#1f6b43');sign(-8,-33,'بئر الماء والحريم','#555');sign(-27,58,'ميدان الخيل','#6b2a2a');sign(60,17,'ميدان الصيد','#2a4a6b');
const fam=[[19,-12,'s',0x151515,.92],[25,-11,'g',0xffffff,.55],[-19,-12,'s',0x151515,.92],[-25,-11,'g',0xffffff,.55]].map(a=>{const p=mkPerson({th:a[3],c:a[2],g1:'#fff',g2:'#a33',s:a[4]});p.g.position.set(a[0],0,a[1]);p.bs=a[4];return p;});
// الديوان
const sheikhs=[[-3.4,-1.8,0xf0e8d8],[-1.2,-2.5,0xd8cdb0],[1.2,-2.5,0x4a3b2a],[3.4,-1.8,0xe8e0d0]].map(a=>{const p=mkPerson({th:a[2],c:'g',g1:'#fff',g2:'#a33',beard:0xcfcfcf});p.g.position.set(DX+a[0],-.45,DZ+a[1]);p.g.rotation.y=Math.atan2(-a[0],1-a[1]);p.lap.visible=true;p.feet.visible=false;p.armL.rotation.x=p.armR.rotation.x=-.8;return p;});
const df=M(new THREE.ConeGeometry(.45,1.3,8),new THREE.MeshBasicMaterial({color:0xff8a1f}),DX,.8,DZ+.4);M(new THREE.ConeGeometry(.25,.6,10),S(0xd4a017,{metalness:.6}),DX+.9,.4,DZ+.4);
function diwanQ(i){const p=P[i],q=p.g.position;q.set(DX+(i?-2:2),0,DZ+1.8);p.ang=Math.atan2(DX-q.x,DZ-q.z);p.sit=true;const s=pick(STO);say(sheikhs[0],pick(LN));setTimeout(()=>say(sheikhs[1],pick(LN)),3000);setTimeout(()=>{if(p.sit&&!p.busy)ask(i,'الشيخ يحكي: '+s[0],s[1],s[2],()=>{p.st+=3;hud(i);toast(i,'الله يعطيك العافية 👴');});},6000);}
// الخيل
function mkHorse(col){const g=new THREE.Group(),m=S(col),k=S(0x111111),legs=[];M(new THREE.SphereGeometry(1,14,10),m,0,1.7,0,g).scale.set(.55,.6,1.3);M(new THREE.CylinderGeometry(.2,.3,1.3,8),m,0,2.4,1.1,g).rotation.x=-.7;M(new THREE.BoxGeometry(.3,.35,.8),m,0,3,1.65,g).rotation.x=.3;M(new THREE.BoxGeometry(.1,.7,.5),k,0,2.7,.8,g).rotation.x=-.4;M(new THREE.CylinderGeometry(.08,.02,1,6),k,0,1.5,-1.4,g).rotation.x=.4;
 for(const x of[-.3,.3])for(const z of[-.8,.8]){const p=new THREE.Group();p.position.set(x,1.2,z);M(new THREE.BoxGeometry(.2,1.3,.2),m,0,-.65,0,p);g.add(p);legs.push(p);}scene.add(cast(g));return{g,legs};}
const HC=[['الأسود',0x1a1a1a,'#c8102e'],['الأبيض',0xf0f0f0,'#2f5d9e'],['الأشقر',0xc08a4a,'#1f6b43']],race={on:0,t:0,x:[0,0,0],sp:[],gu:[null,null],cd:0};
const hs=HC.map((c,k)=>{const h=mkHorse(c[1]),j=mkPerson({th:0xffffff,c:'g',g1:'#fff',g2:c[2],s:.7});j.g.position.set(0,2.4,.1);j.armL.rotation.x=j.armR.rotation.x=-.8;j.feet.visible=false;h.g.add(j.g);h.g.position.set(-22,0,60+k*4);h.g.rotation.y=Math.PI/2;return h;});
function raceQ(i){if(race.on&&race.t>2.5)return toast(i,'السباق جاري 🐎');open(i,'مَن يفوز؟ اختر الحصان',HC.map((c,k)=>[c[0],()=>{race.gu[i]=k;closeQ(i);if(!race.on){const w=R()*3|0;race.sp=[0,1,2].map(j=>5+R()+(j==w?1.3:0));race.on=1;race.t=0;race.x=[0,0,0];snd('hoof');}}]).concat([['✖',()=>closeQ(i)]]));}
// الصيد
const HX=60,HZ=24,PERCH=new V3(HX+8,1.9,HZ),fl2=[],bd=[];
function mkBird(big){const g=new THREE.Group(),m=S(big?0x4a3626:0x8a7a66),w=big?1.4:.7,wL=M(new THREE.BoxGeometry(w,.05,.35),m,-w/2,0,0,g),wR=M(new THREE.BoxGeometry(w,.05,.35),m,w/2,0,0,g);M(new THREE.SphereGeometry(big?.28:.16,8,6),m,0,0,0,g).scale.set(1,.8,1.6);if(big)M(new THREE.SphereGeometry(.2,8,6),S(0xf0ece0),0,-.08,.12,g);scene.add(g);return{g,wL,wR};}
function lbl(b){if(b.lb)b.g.remove(b.lb);const c=LET.map(x=>x[0]).filter(c=>!bd.some(o=>o!==b&&o.w==c));b.w=pick(c);b.lb=label(b.w,'#3b2412');b.lb.scale.set(1.5,.6,1);b.lb.position.y=.9;b.g.add(b.lb);}
for(let j=0;j<6;j++){const b=mkBird(0);Object.assign(b,{a:j*1.05,r:7+R()*8,h:6+R()*3,s:.35+R()*.2,state:'fly'});bd.push(b);lbl(b);}
const fal=mkBird(1);fal.g.position.copy(PERCH);M(new THREE.CylinderGeometry(.1,.1,1.9,6),S(0x6b4a2a),HX+8,.95,HZ);
function fly(m,a,b,d,arc,cb){fl2.push({m,a:a.clone(),b:b.clone(),t:0,d,arc,cb});}
function huntQ(i,m){const t=pick(bd.filter(b=>b.state=='fly'));if(!t)return toast(i,'انتظر الطيور 🐦');if(m&&fal.busy)return toast(i,'الصقر في الجو 🦅');
 ask(i,'اصطد الطير الذي عليه حرف «'+t.w+'»'+(m?' بالصقر 🦅':' بالمقلاع 🎯'),t.w,sh(bd.filter(b=>b!==t).map(b=>b.w)).slice(0,2),()=>{if(t.state!='fly')return;t.state='hold';const to=t.g.position.clone();
  if(m){fal.busy=1;snd('cry');fly(fal.g,PERCH,to,1.3,3,()=>{t.state='fall';P[i].st+=3;hud(i);toast(i,'الصقر صاد! 🦅');fly(fal.g,to,PERCH,1.3,3,()=>fal.busy=0);});}
  else{const s=M(new THREE.SphereGeometry(.15,6,6),S(0x888888),0,0,0),a=P[i].g.position.clone();a.y=1.8;fly(s,a,to,.5,1,()=>{scene.remove(s);t.state='fall';P[i].st+=2;hud(i);toast(i,'صدت الطير! 🎯');});}});}
// ضب وجرابيع والأطفال
function mkAn(k){const g=new THREE.Group();if(k=='d'){const m=S(0x8a7a3a);M(new THREE.SphereGeometry(.5,12,8),m,0,.22,0,g).scale.set(.8,.4,1.8);M(new THREE.SphereGeometry(.22,10,8),m,0,.25,.95,g).scale.set(1,.7,1.2);M(new THREE.ConeGeometry(.14,1.3,6),m,0,.15,-1.3,g).rotation.x=-Math.PI/2;}
 else{const m=S(0xd9b27c);M(new THREE.SphereGeometry(.35,12,10),m,0,.6,0,g).scale.set(1,1,1.2);M(new THREE.SphereGeometry(.22,10,8),m,0,.8,.38,g);for(const x of[-.12,.12])M(new THREE.SphereGeometry(.12,8,8),m,x,1.1,.35,g).scale.set(.5,1.6,.4);M(new THREE.CylinderGeometry(.03,.03,1.2,6),m,0,.5,-.8,g).rotation.x=1.2;}scene.add(cast(g));return g;}
const AR0={x:8,z:20},an=['j','d','j'].map((k,n)=>{const a={k,g:mkAn(k),ph:R()*6,wa:R()*6.28};a.g.position.set(8+n*6,0,18-n*4);return a;}),
 kd=[0xffffff,0xe8d8b0,0xdce6f2].map((c,k)=>{const p=mkPerson({th:c,c:'g',g1:'#fff',g2:'#a33',s:.55});p.g.position.set(AR0.x+k*3,0,AR0.z+8);p.tg=k%3;p.cw=0;p.t=0;return p;});
// الضيف
const gs=[null,null];let gT=25,talkT=6,sT=2;
function guestUpd(dt){gT-=dt;if(gT<=0){gT=70+R()*30;const i=R()<.5?0:1;if(!gs[i]){const p=mkPerson({th:0xb9c4a8,c:'g',g1:'#fff',g2:'#2a6a3a',beard:0x3a2a1a});p.g.position.set(H[i][0]+(i?-45:45),0,H[i][1]+30);gs[i]={p,st:'come',t:0};}}
 gs.forEach((g,i)=>{if(!g)return;const q=g.p.g.position;let tx,tz;if(g.st=='come'||g.st=='wait'){tx=H[i][0]+(i?-3:3);tz=H[i][1]+11;}else if(g.st=='sit'){tx=H[i][0]+1.9;tz=H[i][1]-.2;}else{tx=H[i][0]+(i?-60:60);tz=H[i][1]+40;}
  const dx=tx-q.x,dz=tz-q.z,d=Math.hypot(dx,dz);g.p.lap.visible=g.st=='sit'&&d<.5;
  if(d>.4){q.x+=dx/d*3.2*dt;q.z+=dz/d*3.2*dt;g.p.g.rotation.y=Math.atan2(dx,dz);g.pt=(g.pt||0)+dt*11;walk(g.p,g.pt,true);g.p.feet.visible=true;q.y=0;}
  else{if(g.st=='come'){g.st='wait';say(g.p,'السلام عليكم');toast(i,'جاءكم ضيف! رحّب به 🤝');}else if(g.st=='sit'){q.y=-.45;g.p.feet.visible=false;g.p.g.rotation.y=-1.3;g.p.armL.rotation.x=g.p.armR.rotation.x=-.9;g.t+=dt;if(g.t>45){g.st='leave';q.y=0;}}}
  if(g.st=='leave'&&Math.hypot(q.x-H[i][0],q.z-H[i][1])>50){scene.remove(g.p.g);gs[i]=null;}});}
function xa(i){const p=P[i],a=[{x:DX,z:DZ+3,r:6,l:'اجلس بالديوان 👴',f:()=>diwanQ(i)},{x:-22,z:64,r:9,l:'سباق الخيل 🐎',f:()=>raceQ(i)},{x:HX,z:HZ+6,r:7,l:'المقلاع 🎯',f:()=>huntQ(i,0)},{x:HX+8,z:HZ,r:4,l:'أطلق الصقر 🦅',f:()=>huntQ(i,1)}];
 an.forEach(n=>a.push({x:n.g.position.x,z:n.g.position.z,r:2.8,l:n.k=='j'?'امسك الجربوع 🐭':'امسك الضب 🦎',f:()=>ask(i,'ما اسم هذا؟ '+(n.k=='j'?'🐭':'🦎'),n.k=='j'?'جربوع':'ضب',n.k=='j'?['ضب','أرنب']:['جربوع','ثعلب'],()=>{p.st+=2;hud(i);n.g.position.x+=(R()-.5)*30;n.g.position.z+=(R()-.5)*30;toast(i,'مسكته ثم أطلقته 😄');})}));
 const g=gs[i];if(g&&g.st=='wait')a.push({x:g.p.g.position.x,z:g.p.g.position.z,r:4,l:'رحّب بالضيف 🤝',f:()=>ask(i,'كيف ترحّب بالضيف؟','حيّاك الله',['اسكت','وين رايح؟'],()=>{g.st='sit';say(g.p,'الله يحييك');})});
 if(g&&g.st=='sit')a.push({x:g.p.g.position.x,z:g.p.g.position.z,r:4,l:'قدّم القهوة ☕',f:()=>{if(p.cof<1)return toast(i,'اصنع القهوة أول ☕');p.cof--;p.st+=3;hud(i);say(g.p,'الله يعطيك العافية');}});
 return a;}
function v2(dt,now){
 P.forEach(p=>{if(p.sit&&!p.busy&&(Math.hypot(p.jx,p.jz)>.6||keys[p.k.l]||keys[p.k.r]||keys[p.k.u]||keys[p.k.d]))p.sit=false;});
 talkT-=dt;if(talkT<=0){talkT=8+R()*5;say(pick(sheikhs.concat([crowd[0],crowd[1]])),pick(LN));}
 sT-=dt;if(sT<=0){sT=3.5;P.forEach((p,i)=>{if(near(p.g.position,{x:flocks[i].c.x,z:flocks[i].c.z},14)&&R()<.7)snd('baa');if(p.fire&&near(p.g.position,{x:FP[i][0],z:FP[i][1]},14))snd('crackle');});if(dayI(tod)<.5&&R()<.6)snd('cricket');}
 df.scale.y=.8+R()*.5;fam.forEach((c,i)=>{if(c.bs<.6)c.g.position.y=Math.abs(Math.sin(now/300+i))*.4;else c.g.rotation.y=.5+Math.sin(now/1500+i)*.3;});
 an.forEach(a=>{const q=a.g.position;let fx=0,fz=0;const RR=a.k=='j'?9:7;
  kd.map(c=>c.g.position).concat(P.map(p=>p.g.position)).forEach(o=>{const ex=q.x-o.x,ez=q.z-o.z,d=Math.hypot(ex,ez)||.1;if(d<RR){fx+=ex/d*(RR-d);fz+=ez/d*(RR-d);}});
  let dx,dz,v;const l=Math.hypot(fx,fz);if(l>.1){dx=fx/l;dz=fz/l;v=a.k=='j'?9:6;}else{a.wa+=(R()-.5)*dt*3;dx=Math.cos(a.wa);dz=Math.sin(a.wa);v=1.2;}
  const cx=q.x-AR0.x,cz=q.z-AR0.z,r=Math.hypot(cx,cz);if(r>26){dx=dx*.3-cx/r;dz=dz*.3-cz/r;const n=Math.hypot(dx,dz);dx/=n;dz/=n;}
  q.x+=dx*v*dt;q.z+=dz*v*dt;a.ph+=dt*(v>3?14:3);a.g.rotation.y=Math.atan2(dx,dz);q.y=a.k=='j'&&v>3?Math.abs(Math.sin(a.ph*.7))*1.2:0;});
 kd.forEach(c=>{const t=an[c.tg].g.position,q=c.g.position;if(c.cw>0){c.cw-=dt;q.y=Math.abs(Math.sin(now/120))*.5;return;}
  const dx=t.x-q.x,dz=t.z-q.z,d=Math.hypot(dx,dz);if(d<1.5){c.cw=1;t.x+=(R()-.5)*20;t.z+=(R()-.5)*20;c.tg=R()*3|0;}else{q.x+=dx/d*6.2*dt;q.z+=dz/d*6.2*dt;c.g.rotation.y=Math.atan2(dx,dz);c.t+=dt*12;walk(c,c.t,true);q.y=0;}});
 bd.forEach((b,j)=>{b.a+=dt*b.s;if(b.state=='fly'){b.g.position.set(HX+Math.cos(b.a)*b.r,b.h+Math.sin(now/700+j),HZ+Math.sin(b.a)*b.r);b.g.rotation.y=-b.a;}else if(b.state=='fall'){b.g.position.y-=10*dt;if(b.g.position.y<.3){b.g.position.y=.3;b.state='gone';b.tm=1.5;}}else if(b.state=='gone'){b.tm-=dt;if(b.tm<0){b.state='fly';lbl(b);}}
  const w=b.state=='fly'?Math.sin(now/70+j)*.9:0;b.wL.rotation.z=w;b.wR.rotation.z=-w;});
 const fw=fal.busy?Math.sin(now/60)*.9:0;fal.wL.rotation.z=fw;fal.wR.rotation.z=-fw;
 for(let n=fl2.length-1;n>=0;n--){const f=fl2[n];f.t+=dt;const u=Math.min(1,f.t/f.d);f.m.position.lerpVectors(f.a,f.b,u);f.m.position.y+=Math.sin(u*Math.PI)*f.arc;if(u>=1){fl2.splice(n,1);f.cb&&f.cb();}}
 if(race.on){race.t+=dt;hs.forEach((h,k)=>{if(race.on==1)race.x[k]+=race.sp[k]*dt;h.legs.forEach((l,n)=>l.rotation.x=Math.sin(now/70+(n%2?0:Math.PI))*.7);h.g.position.x=-22+race.x[k];h.g.position.y=Math.abs(Math.sin(now/70))*.15;});
  if(race.on==1&&Math.max(...race.x)>=44){const w=race.x.indexOf(Math.max(...race.x));race.on=2;race.cd=3;P.forEach((p,i)=>{const g=race.gu[i];if(g==null)return;if(g==w){p.st+=3;hud(i);beep(1000,.3);toast(i,'فاز الحصان '+HC[w][0]+' 🏆 وفزت!');}else toast(i,'فاز الحصان '+HC[w][0]+' · حاول مرة ثانية');});}
  else if(race.on==2){race.cd-=dt;hs.forEach(h=>h.legs.forEach(l=>l.rotation.x=0));if(race.cd<0){race.on=0;race.gu=[null,null];race.x=[0,0,0];hs.forEach((h,k)=>h.g.position.set(-22,0,60+k*4));}}}
 guestUpd(dt);}
requestAnimationFrame(loop);

/* ===== اختيار الشخصيات + التبديل + الزوم + الخريطة + الأداء ===== */
(function(){
  const modeF=$('modeF'),modeZ=$('modeZ'),mode2=$('mode2'),hint=$('modeHint');
  function setMode(m){m=normalizeMode(m);gameMode=m;gameStore.setMode(m);if(m!=='two') activePlayer=m==='f'?0:1;
    [modeF,modeZ,mode2].forEach(b=>b.classList.remove('sel'));
    (m==='f'?modeF:m==='z'?modeZ:mode2).classList.add('sel');
    hint.textContent=m==='two'?'شخصيتان على نفس الجهاز — فواز وزياد':m==='f'?'تلعب بفواز على الشاشة كاملة — اضغط 🔄 للتبديل':'تلعب بزياد على الشاشة كاملة — اضغط 🔄 للتبديل';
    layout();
  }
  modeF.onclick=(e)=>{e.preventDefault();setMode('f')};modeZ.onclick=(e)=>{e.preventDefault();setMode('z')};mode2.onclick=(e)=>{e.preventDefault();setMode('two')};
  $('go').onclick=()=>{ $('ov').style.display='none'; $('switchPlayer').style.display='block'; $('soundToggle').style.display='block'; $('zoomCtl').style.display='flex'; $('miniMap').style.display='block'; layout(); ac&&ac.resume(); beep(600,.15); };
  $('switchPlayer').onclick=()=>{if(gameMode==='two'){toast(0,'وضع شخصيتين: فواز وزياد يعملان معًا 👥');return;}activePlayer=activePlayer?0:1;layout();toast(activePlayer,'الآن تلعب بـ '+(activePlayer?'زياد 🔵':'فواز 🔴'));};
  $('soundToggle').onclick=()=>{soundsOn=!soundsOn;$('soundToggle').textContent=soundsOn?'🔊 الصوت':'🔇 صامت';if(soundsOn){ac&&ac.resume();beep(700,.1);}};
  $('zoomIn').onclick=()=>{const ids=playerIndices();ids.forEach(i=>zoom[i]=Math.max(.65,Math.min(1.8,zoom[i]-.12)));};
  $('zoomOut').onclick=()=>{const ids=playerIndices();ids.forEach(i=>zoom[i]=Math.max(.65,Math.min(1.8,zoom[i]+.12)));};
  $('zoomReset').onclick=()=>playerIndices().forEach(i=>zoom[i]=1);
  addEventListener('wheel',e=>{if($('ov').style.display!=='none'){return;}const ids=playerIndices();const d=e.deltaY>0?.08:-.08;ids.forEach(i=>zoom[i]=Math.max(.65,Math.min(1.8,zoom[i]+d)));},{passive:true});
  let pinch=0;
  addEventListener('touchmove',e=>{if(e.touches.length!==2)return;const a=e.touches[0],b=e.touches[1],d=Math.hypot(a.clientX-b.clientX,a.clientY-b.clientY);if(pinch){const delta=(pinch-d)/300;playerIndices().forEach(i=>zoom[i]=Math.max(.65,Math.min(1.8,zoom[i]+delta));}pinch=d;},{passive:true});
  addEventListener('touchend',e=>{if(e.touches.length<2)pinch=0;},{passive:true});
  const mm=$('miniMap'),mx=mm.getContext('2d');
  function drawMap(){
    if(mm.style.display==='none')return;
    mx.clearRect(0,0,240,240);mx.fillStyle='rgba(224,194,133,.75)';mx.fillRect(0,0,240,240);
    mx.strokeStyle='rgba(80,50,20,.35)';for(let x=0;x<=240;x+=30){mx.beginPath();mx.moveTo(x,0);mx.lineTo(x,240);mx.stroke();}for(let y=0;y<=240;y+=30){mx.beginPath();mx.moveTo(0,y);mx.lineTo(240,y);mx.stroke();}
    const sx=v=>120+v*1.05,sz=v=>120+v*1.05;
    [[0,-34,'💧'],[DX,DZ,'👴'],[-22,64,'🐎'],[HX,HZ,'🦅'],[22,0,'⛺'],[-22,0,'⛺']].forEach(a=>{mx.font='18px sans-serif';mx.fillText(a[2],sx(a[0])-9,sz(a[1])+7);});
    P.forEach((p,i)=>{if(gameMode!=='two'&&i!==activePlayer)return;mx.beginPath();mx.arc(sx(p.g.position.x),sz(p.g.position.z),7,0,Math.PI*2);mx.fillStyle=i?'#1769c2':'#c8102e';mx.fill();mx.fillStyle='#fff';mx.font='800 9px Cairo';mx.textAlign='center';mx.fillText(i?'ز':'ف',sx(p.g.position.x),sz(p.g.position.z)+3);});
  }
  const oldV2=v2;
  v2=function(dt,now){oldV2(dt,now);drawMap();};
  setMode(profileState.mode||'two');
})();

const buildings=new BuildingSystem({storageKey:'badia-buildings-v1',bounds:{minX:-82,maxX:82,minZ:-82,maxZ:82},sizes:{camp:8,majlis:7,sheepPen:7,camelPen:8,stable:9,palm:2.5,well:4}});
function persistGame(){gameStore.save({mode:gameMode,activePlayer,profiles:P.map((p,i)=>({name:['فواز','زياد'][i],stars:p.st||0,water:p.jugs||0,coffee:p.cof||0,money:typeof money!=='undefined'?money[i]:80})),buildings:buildings.serialize()})}
setInterval(persistGame,15000);addEventListener('beforeunload',persistGame);document.querySelectorAll('[data-dira]').forEach(b=>b.addEventListener('click',()=>{const i=activePlayer;if(b.dataset.dira==='save'){persistGame();toast(i,'تم الحفظ 💾')}else if(b.dataset.dira==='build'){const x=P[i].g.position.x+Math.sin(P[i].ang)*6,z=P[i].g.position.z+Math.cos(P[i].ang)*6;const r=buildings.place('camp',x,z,{owner:i});toast(i,r.ok?'تم بناء المخيم 🏕️':r.reason)}else toast(i,b.dataset.dira==='market'?'السوق مرتبط بملف الشخصية 🛒':'المطبخ مرتبط بمسار الغنم 🍲')}));