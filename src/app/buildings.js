export class BuildingSystem {
  constructor({storageKey='badia-buildings-v1',bounds={minX:-82,maxX:82,minZ:-82,maxZ:82},sizes={camp:8,majlis:7,sheepPen:7,camelPen:8,stable:9,palm:2.5,well:4}}={}) {
    this.storageKey=storageKey; this.bounds=bounds; this.sizes=sizes; this.items=this.load();
  }
  load(){try{const x=JSON.parse(localStorage.getItem(this.storageKey)||'[]');return Array.isArray(x)?x:[]}catch(e){return[]}}
  save(){try{localStorage.setItem(this.storageKey,JSON.stringify(this.items))}catch(e){}}
  serialize(){return this.items.map(x=>({...x}))}
  inside(x,z,r){return x-r>=this.bounds.minX&&x+r<=this.bounds.maxX&&z-r>=this.bounds.minZ&&z+r<=this.bounds.maxZ}
  overlap(x,z,r){return this.items.find(b=>Math.hypot(b.x-x,b.z-z)<(b.r+r)*.92)}
  place(type,x,z,meta={}){const r=this.sizes[type]||5;if(!this.inside(x,z,r))return{ok:false,reason:'المكان خارج حدود الديرة'};if(this.overlap(x,z,r))return{ok:false,reason:'المكان متداخل مع مبنى آخر'};const item={id:crypto.randomUUID(),type,x,z,r,owner:meta.owner??0,level:1};this.items.push(item);this.save();return{ok:true,item}}
  remove(id){const i=this.items.findIndex(x=>x.id===id);if(i<0)return{ok:false};const[item]=this.items.splice(i,1);this.save();return{ok:true,refund:Math.floor((item.r||5)*2)}}
  upgrade(id){const item=this.items.find(x=>x.id===id);if(!item)return{ok:false};item.level=Math.min(5,(item.level||1)+1);this.save();return{ok:true,item}}
}