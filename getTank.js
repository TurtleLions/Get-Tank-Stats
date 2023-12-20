//import fetch from 'node-fetch';
//import promptSync from 'prompt-sync';
let application_id = '050744d1881d6e55169c3b169dfa1fde'
//const prompt = promptSync();
//const name = prompt('Enter your username: ');
//const wtier = prompt('Enter wanted tier: ');
let id;
let bodyData;
let tankA = {
  usa: [],
  uk: [],
  germany: [],
  ussr: [],
  france: [],
  japan: [],
  china: [],
  european: [],
  other: [],
};

getTank()
async function getTank(){
  let name = document.getElementById('name').value;
  let wtier = document.getElementById('tier').value;
  document.getElementById('textbox').textContent = ""+name+" "+wtier;
  id = await userNameToID(name);
  bodyData = await getAccountTanks(id);
  await getMainTankStats(bodyData, wtier);
  document.getElementById('textbox').textContent = tankA.usa.length+tankA.uk.length+tankA.germany.length+tankA.ussr.length+tankA.france.length+tankA.japan.length+tankA.china.length+tankA.european.length+tankA.other.length+" tanks found";
  var tankListPrint = '';
  tankListPrint+='American<br>';
  for(let index in tankA.usa){
    let printstring = await getTankStats(tankA.usa[index]);
    if(printstring!=null){
      tankListPrint+=printstring;
      tankListPrint+='<br>';
    }
  }
  tankListPrint+='<br>British<br>';
  for(let index in tankA.uk){
    let printstring = await getTankStats(tankA.uk[index]);
    if(printstring!=null){
      tankListPrint+=printstring;
      tankListPrint+='<br>';
    }
  }
  tankListPrint+='<br>German<br>';
  for(let index in tankA.germany){
    let printstring = await getTankStats(tankA.germany[index]);
    if(printstring!=null){
      tankListPrint+=printstring;
      tankListPrint+='<br>';
    }
  }
  tankListPrint+='<br>Soviet<br>';
  for(let index in tankA.ussr){
    let printstring = await getTankStats(tankA.ussr[index]);
    if(printstring!=null){
      tankListPrint+=printstring;
      tankListPrint+='<br>';
    }
  }
  tankListPrint+='<br>French<br>';
  for(let index in tankA.france){
    let printstring = await getTankStats(tankA.france[index]);
    if(printstring!=null){
      tankListPrint+=printstring;
      tankListPrint+='<br>';
    }
  }
  tankListPrint+='<br>Japanese<br>';
  for(let index in tankA.japan){
    let printstring = await getTankStats(tankA.japan[index]);
    if(printstring!=null){
      tankListPrint+=printstring;
      tankListPrint+='<br>';
    }
  }
  tankListPrint+='<br>Chinese<br>';
  for(let index in tankA.china){
    let printstring = await getTankStats(tankA.china[index]);
    if(printstring!=null){
      tankListPrint+=printstring;
      tankListPrint+='<br>';
    }
  }
  tankListPrint+='<br>European<br>';
  for(let index in tankA.european){
    let printstring = await getTankStats(tankA.european[index]);
    if(printstring!=null){
      tankListPrint+=printstring;
      tankListPrint+='<br>';
    }
  }
  tankListPrint+='<br>Hybrid<br>';
  for(let index in tankA.other){
    let printstring = await getTankStats(tankA.other[index]);
    if(printstring!=null){
      tankListPrint+=printstring;
      tankListPrint+='<br>';
    }
  }
  console.log(tankListPrint);
  document.getElementById('textbox').textContent = tankListPrint;
}

async function getTankStats(tankID){
  var returnString = '';
  const response1 = await fetch('https://api.wotblitz.com/wotb/encyclopedia/vehicles/?application_id='+application_id+'&tank_id='+tankID)
  const body1 = await response1.json();
  if(body1.data[tankID].name!==null){
    if(body1.data[tankID].type=='heavyTank'){
      returnString+='HT '
    }
    if(body1.data[tankID].type=='mediumTank'){
      returnString+='MT '
    }
    if(body1.data[tankID].type=='lightTank'){
      returnString+='LT '
    }
    if(body1.data[tankID].type=='AT-SPG'){
      returnString+='TD '
    }
    returnString += body1.data[tankID].name;
    let addedSpace = 30 - body1.data[tankID].name.length;
    for(let i = 0; i<addedSpace; i++){
      returnString+=' ';
    }
    const response2 = await fetch('https://api.wotblitz.com/wotb/account/tankstats/?application_id='+application_id+'&account_id='+id+'&tank_id='+tankID);
    const body2 = await response2.json();
    var wr = body2.data[id].all.wins/body2.data[id].all.battles;
    wr = Math.round(wr*10000)/100;
    var admg = body2.data[id].all.damage_dealt/body2.data[id].all.battles;
    admg = Math.round(admg*100)/100;
    returnString += '  Total Battles: '+body2.data[id].all.battles;
    addedSpace = 20 - ('Total Battles: '+body2.data[id].all.battles).length;
    for(let i = 0; i<addedSpace; i++){
      returnString+=' ';
    }
    returnString += '  Winrate: '+wr + '%';
    addedSpace = 20 - ('Winrate: '+wr + '%').length;
    for(let i = 0; i<addedSpace; i++){
      returnString+=' ';
    }
    returnString += '  Average Damage: '+admg;
    return returnString;
  }
  else{
    return null;
  }
}


async function userNameToID(name) {
  const response = await fetch('https://api.wotblitz.com/wotb/account/list/?application_id='+application_id+'&search=' + name);
  const body = await response.json();
  return body.data[0].account_id;
}

async function getAccountTanks(id) {
  const response = await fetch('https://api.wotblitz.com/wotb/tanks/achievements/?application_id='+application_id+'&account_id=' + id);
  const body = await response.json();
  return body.data[id];
}

async function getMainTankStats(bodyData, wtier) {
  for (const singleStat of bodyData) {
    let tankID = singleStat.tank_id;
    const response = await fetch('https://api.wotblitz.com/wotb/encyclopedia/vehicles/?application_id='+application_id+'&tank_id=' + tankID);
    const body = await response.json();
    if(body.data[tankID]!==null&&body.data[tankID].tier==wtier){
      tankA[body.data[tankID].nation].push(body.data[tankID].tank_id);
    }
  };
}