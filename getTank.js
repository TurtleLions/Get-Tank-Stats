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
  document.getElementById('textbox').innerHTML = ""+name+" "+wtier;
  id = await userNameToID(name);

  bodyData = await getAccountTanks(id);
  await getMainTankStats(bodyData, wtier);
  document.getElementById('textbox').innerHTML = tankA.usa.length+tankA.uk.length+tankA.germany.length+tankA.ussr.length+tankA.france.length+tankA.japan.length+tankA.china.length+tankA.european.length+tankA.other.length+" tanks found";
  let tableRef = document.getElementById('tankstats')
  await getTankStats(tankA.usa[index]);
  await getTankStats(tankA.uk[index]);
  await getTankStats(tankA.germany[index]);
  await getTankStats(tankA.ussr[index]);
  await getTankStats(tankA.france[index]);
  await getTankStats(tankA.japan[index]);
  await getTankStats(tankA.china[index]);
  await getTankStats(tankA.european[index]);
  await getTankStats(tankA.other[index]);
  // var tankListPrint = '';
  // tankListPrint+='American<br>';
  // for(let index in tankA.usa){
  //   let printstring = await getTankStats(tankA.usa[index]);
  //   if(printstring!=null){
  //     tankListPrint+=printstring;
  //     tankListPrint+='<br>';
  //   }
  // }
  // tankListPrint+='<br>British<br>';
  // for(let index in tankA.uk){
  //   let printstring = await getTankStats(tankA.uk[index]);
  //   if(printstring!=null){
  //     tankListPrint+=printstring;
  //     tankListPrint+='<br>';
  //   }
  // }
  // tankListPrint+='<br>German<br>';
  // for(let index in tankA.germany){
  //   let printstring = await getTankStats(tankA.germany[index]);
  //   if(printstring!=null){
  //     tankListPrint+=printstring;
  //     tankListPrint+='<br>';
  //   }
  // }
  // tankListPrint+='<br>Soviet<br>';
  // for(let index in tankA.ussr){
  //   let printstring = await getTankStats(tankA.ussr[index]);
  //   if(printstring!=null){
  //     tankListPrint+=printstring;
  //     tankListPrint+='<br>';
  //   }
  // }
  // tankListPrint+='<br>French<br>';
  // for(let index in tankA.france){
  //   let printstring = await getTankStats(tankA.france[index]);
  //   if(printstring!=null){
  //     tankListPrint+=printstring;
  //     tankListPrint+='<br>';
  //   }
  // }
  // tankListPrint+='<br>Japanese<br>';
  // for(let index in tankA.japan){
  //   let printstring = await getTankStats(tankA.japan[index]);
  //   if(printstring!=null){
  //     tankListPrint+=printstring;
  //     tankListPrint+='<br>';
  //   }
  // }
  // tankListPrint+='<br>Chinese<br>';
  // for(let index in tankA.china){
  //   let printstring = await getTankStats(tankA.china[index]);
  //   if(printstring!=null){
  //     tankListPrint+=printstring;
  //     tankListPrint+='<br>';
  //   }
  // }
  // tankListPrint+='<br>European<br>';
  // for(let index in tankA.european){
  //   let printstring = await getTankStats(tankA.european[index]);
  //   if(printstring!=null){
  //     tankListPrint+=printstring;
  //     tankListPrint+='<br>';
  //   }
  // }
  // tankListPrint+='<br>Hybrid<br>';
  // for(let index in tankA.other){
  //   let printstring = await getTankStats(tankA.other[index]);
  //   if(printstring!=null){
  //     tankListPrint+=printstring;
  //     tankListPrint+='<br>';
  //   }
  // }
  // console.log(tankListPrint);
  // document.getElementById('textbox').innerHTML = tankListPrint;
}

async function addRow(table, type, name, battles, wr, admg){
  let newRow = table.insertRow(-1);

  let newCell1 = newRow.insertCell(0);
  let newText1 = document.createTextNode(type);
  newCell1.appendChild(newText1);

  let newCell2 = newRow.insertCell(0);
  let newText2 = document.createTextNode(name);
  newCell2.appendChild(newText2);

  let newCell3 = newRow.insertCell(0);
  let newText3 = document.createTextNode(battles);
  newCell3.appendChild(newText3);

  let newCell4 = newRow.insertCell(0);
  let newText4 = document.createTextNode(wr);
  newCell4.appendChild(newText4);

  let newCell5 = newRow.insertCell(0);
  let newText5 = document.createTextNode(admg);
  newCell5.appendChild(newText5);
}

async function getTankStats(tankID,table){
  const response1 = await fetch('https://api.wotblitz.com/wotb/encyclopedia/vehicles/?application_id='+application_id+'&tank_id='+tankID)
  const body1 = await response1.json();
  let type = '';
  if(body1.data[tankID].name!==null){
    if(body1.data[tankID].type=='heavyTank'){
      type ='HT';
    }
    if(body1.data[tankID].type=='mediumTank'){
      type ='MT';
    }
    if(body1.data[tankID].type=='lightTank'){
      type ='LT';
    }
    if(body1.data[tankID].type=='AT-SPG'){
      type ='TD';
    }
    let name = body1.data[tankID].name;
    const response2 = await fetch('https://api.wotblitz.com/wotb/account/tankstats/?application_id='+application_id+'&account_id='+id+'&tank_id='+tankID);
    const body2 = await response2.json();
    var battles = body2.data[id].all.battles
    var wr = body2.data[id].all.wins/body2.data[id].all.battles;
    wr = Math.round(wr*10000)/100;
    var admg = body2.data[id].all.damage_dealt/body2.data[id].all.battles;
    admg = Math.round(admg*100)/100;
    await addRow(table, type, name, battles, wr, admg);
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