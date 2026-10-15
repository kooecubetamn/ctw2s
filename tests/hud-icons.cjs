const fs=require('fs'),vm=require('vm'),assert=require('assert');
const elements=new Map(),calls=[];
const context={clearRect(){},drawImage(...a){calls.push(a)},fillRect(){},save(){},restore(){},beginPath(){},arc(){},fill(){},stroke(){},fillText(){}};
function el(id){if(!elements.has(id))elements.set(id,{width:216,height:116,value:'54877',style:{setProperty(){}},textContent:'',getContext:()=>context,setAttribute(){}});return elements.get(id)}
class Image{naturalWidth=2048;complete=true;set src(v){this.url=v}}
class WebSocket{readyState=1;constructor(){WebSocket.instance=this}send(){}close(){}}
const sandbox={document:{getElementById:el,querySelectorAll:()=>[],querySelector:()=>el('main')},Image,WebSocket,localStorage:{getItem:()=>null},setInterval:()=>1,clearInterval(){},console,Intl,Date,Math,DataView,Uint8Array,atob:s=>Buffer.from(s,'base64').toString('binary')};
vm.createContext(sandbox);vm.runInContext(fs.readFileSync('panel.html','utf8').match(/<script>([\s\S]*)<\/script>/)[1],sandbox);
vm.runInContext("showWeaponIcon('rifle');showWeaponIcon(null);weaponAtlas.onload();symbolAtlas.onload();",sandbox);
let player=Buffer.alloc(0x218);player[0x216]=127;player[0x217]=127;
WebSocket.instance.onmessage({data:JSON.stringify({ticket:'position',base64:player.toString('base64')})});
assert.equal(el('health').textContent,'100%');assert.equal(el('armor').textContent,'100%');assert.equal(el('weaponname').textContent,'Puños');
player[0xb0]=5;player.writeUInt32LE(0x097c2ee0,0xc4+5*4);
WebSocket.instance.onmessage({data:JSON.stringify({ticket:'position',base64:player.toString('base64')})});
const weapon=Buffer.alloc(20);weapon.writeUInt32LE(0x08b6bd70,12);weapon.writeUInt16LE(946,16);weapon.writeUInt16LE(3,18);
WebSocket.instance.onmessage({data:JSON.stringify({ticket:'weapon:5:'+0x097c2ee0,base64:weapon.toString('base64')})});
assert.equal(el('ammo').textContent,'943 - 3');assert.equal(el('weaponname').textContent,'Fusil');assert.equal(el('weaponicon').hidden,false);
vm.runInContext('disconnect()',sandbox);assert.equal(el('weaponicon').hidden,true);
for(const f of ['weapons','symbols'])assert.equal(fs.readFileSync('assets/'+f+'.png').subarray(1,4).toString(),'PNG');
console.log('OK: initialization, atlas loading, fists/rifle switch, 943 - 3 ammo, 100% vitals, disconnect, PNG files');
