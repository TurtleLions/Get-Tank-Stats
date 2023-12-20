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
  document.getElementById('textbox').innerHTML = "Username: "+name+" Tier: "+wtier;
  id = await userNameToID(name);
  bodyData = await getAccountTanks(id);
  await getMainTankStats(bodyData, wtier);
  document.getElementById('textbox').innerHTML = tankA.usa.length+tankA.uk.length+tankA.germany.length+tankA.ussr.length+tankA.france.length+tankA.japan.length+tankA.china.length+tankA.european.length+tankA.other.length+" tanks found";
  let table = document.getElementById('tankstats')
  let newRow = table.insertRow(-1);
  let newCell = newRow.insertCell(0);

  let newCell1 = newRow.insertCell(-1);
  newCell1.innerHTML = "<b>Type</b>"

  let newCell2 = newRow.insertCell(-1);
  newCell2.innerHTML = "<b>Name</b>"

  let newCell3 = newRow.insertCell(-1);
  newCell3.innerHTML = "<b>Battles</b>"

  let newCell4 = newRow.insertCell(-1);
  newCell4.innerHTML = "<b>Winrate</b>"

  let newCell5 = newRow.insertCell(-1);
  newCell5.innerHTML = "<b>Average Damage</b>"

  let newRowusa = table.insertRow(-1);
  let newCellusa = newRowusa.insertCell(0);
  newCellusa.innerHTML = "<b>American</b>"
  for(let index in tankA.usa){
    await getTankStats(tankA.usa[index],table);
  }
  let newRowuk = table.insertRow(-1);
  let newCelluk = newRowuk.insertCell(0);
  newCelluk.innerHTML = "<b>British</b>"
  for(let index in tankA.uk){
    await getTankStats(tankA.uk[index],table);
  }
  let newRowgermany = table.insertRow(-1);
  let newCellgermany = newRowgermany.insertCell(0);
  newCellgermany.innerHTML = "<b>German</b>"
  for(let index in tankA.germany){
    await getTankStats(tankA.germany[index],table);
  }
  let newRowussr = table.insertRow(-1);
  let newCellussr = newRowussr.insertCell(0);
  newCellussr.innerHTML = "<b>Soviet</b>"
  for(let index in tankA.ussr){
    await getTankStats(tankA.ussr[index],table);
  }
  let newRowfrance = table.insertRow(-1);
  let newCellfrance = newRowfrance.insertCell(0);
  newCellfrance.innerHTML = "<b>French</b>"
  for(let index in tankA.france){
    await getTankStats(tankA.france[index],table);
  }
  let newRowjapan = table.insertRow(-1);
  let newCelljapan = newRowjapan.insertCell(0);
  newCelljapan.innerHTML = "<b>Japanese</b>"
  for(let index in tankA.japan){
    await getTankStats(tankA.japan[index],table);
  }
  let newRowchina = table.insertRow(-1);
  let newCellchina = newRowchina.insertCell(0);
  newCellchina.innerHTML = "<b>Chinese</b>"
  for(let index in tankA.china){
    await getTankStats(tankA.china[index],table);
  }
  let newRoweuropean = table.insertRow(-1);
  let newCelleuropean = newRoweuropean.insertCell(0);
  newCelleuropean.innerHTML = "<b>European</b>"
  for(let index in tankA.european){
    await getTankStats(tankA.european[index],table);
  }
  let newRowother = table.insertRow(-1);
  let newCellother = newRowother.insertCell(0);
  newCellother.innerHTML = "<b>Hybrid</b>"
  for(let index in tankA.other){
    await getTankStats(tankA.other[index],table);
  }
}

async function addRow(table, type, name, battles, wr, admg){
  let newRow = table.insertRow(-1);

  let newCell = newRow.insertCell(0);

  let newCell1 = newRow.insertCell(-1);
  let newText1 = document.createTextNode(type);
  newCell1.appendChild(newText1);

  let newCell2 = newRow.insertCell(-1);
  let newText2 = document.createTextNode(name);
  newCell2.appendChild(newText2);

  let newCell3 = newRow.insertCell(-1);
  let newText3 = document.createTextNode(battles);
  newCell3.appendChild(newText3);

  let newCell4 = newRow.insertCell(-1);
  let newText4 = document.createTextNode(wr);
  newCell4.appendChild(newText4);

  let newCell5 = newRow.insertCell(-1);
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
    wr = (Math.round(wr*10000)/100)+'%';
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