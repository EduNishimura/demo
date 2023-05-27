var times = []

///////// CRUD //////////

/*        --------===CRUD PARA TIMES===-------         */ 
///////// POST //////////
async function createTime() {
  const hNome = document.getElementById('new_time_nome').value;
  const hAnof = document.getElementById('new_anof').value;
  const hCidade = document.getElementById('new_cidade').value;
  const hEstado = document.getElementById('new_estado').value;

  const postOptions = {
    method: 'POST',
    body: JSON.stringify({nome: hNome, anoF: hAnof, cidade: hCidade, estado: hEstado }),
    headers: {
      "Content-Type": "application/json",
    },
  }

  try { 
    const response = await fetch('/api/times', postOptions);
    await showTimes(); 
  } catch(err) {
    console.error(err);
  }
  
}
///////// GET //////////
async function readTimes() {
  try {
    const response = await fetch('/api/times');
    times = await response.json();
  } catch(err) {
    console.error(err);
    return [];
  }
}

///////// Mostra Times //////////
async function showTimes() {
  await readTimes();
  const root = document.getElementById("root");
  
  root.innerHTML = "";

  for(let i=0; i<times.length; i++) {
    addTimeTo(root, times[i])
  }
}

///////// adiciona cartao time //////////
function addTimeTo(element, time) {
  const newElement = `
  <section class="cards">
    <div id="card-title">
      ${time.nome}
    </div>
    <div>
      <div class="card-info">Origem: </div>  
      <div class="card-info">${time.anoF}</div>
      <div class="card-info">${time.cidade}</div>
      <div class="card-info">${time.estado}</div>
      <div class="card-info">ID: ${time.id}</div>
    </div>
    <button class="form-btn" id="clickEdit" onclick="loadEditTime(${time.id})">edit</button>
  </section>
  `;

  element.innerHTML += newElement;
}


///////// chamado pelo update //////////
function getTimeById(id) {
  for(let i=0; i<times.length; i++) {
    if(times[i].id === id) return times[i];
  }
  return undefined;
}


function loadEditTime(id) {

  document.getElementById("editForm").style.display = "flex";
  const timeL = getTimeById(id);
  
  if(!timeL) {
    console.error(`Problema ao tentar acessar o time ${id}`);
    return;
  }

  document.getElementById('time_nome').value = timeL.nome;
  document.getElementById('time_anof').value = timeL.anoF;
  document.getElementById('time_cidade').value = timeL.cidade;
  document.getElementById('time_estado').value = timeL.estado;
  document.getElementById('edit_button').onclick = () => { updateTime(timeL.id)};
  document.getElementById('delete_button').onclick = () => { delTime(timeL.id)};
}

///////////////////UPDATE////////////////////////////////

async function updateTime(id) {
  const time = getTimeById(id);
  const nome = document.getElementById('time_nome').value;
  const anoF = document.getElementById('time_anof').value;
  const cidade = document.getElementById('time_cidade').value;
  const estado = document.getElementById('time_estado').value;

  const putOptions = {
    method: 'PUT',
    body: JSON.stringify({nome: nome, anoF: anoF, cidade: cidade, estado: estado }),
    headers: {
      "Content-Type": "application/json",
    },
  }

  try {
    const result = await fetch(`/api/times/${time.id}`, putOptions);
    await showTimes();
  } catch(err) {
    console.error(err);
  }
  
}
/////////////////// DELETE //////////////////////
async function delTime(id){
  
  const time = getTimeById(id);

  try {
    const result = await fetch(`/api/times/${time.id}`, {method: 'DELETE'});
    await showTimes();
  } catch(err) {
    console.error(err);
  }
}

/////////////// SEARCH AREA /////////////////
////////////// SEARCH BY ID /////////////////

async function search_Time_id(){
  const inpId = document.getElementById('s_input_id').value;
  try {
    const response = await fetch(`/api/times/${inpId}`);
    times2 = await response.json();
  } catch(err) {
    console.error(err);
    return [];
  }
}

async function show_id() {
  if(document.getElementById('s_input_id').value == ""){
    showTimes(); 
  }
  await search_Time_id();
  const root = document.getElementById("root");
  
  root.innerHTML = `
  <section class="cards">
    <div id="card-title">
      ${time2.nome}
    </div>
    <div>
      <div class="card-info">Origem: </div>  
      <div class="card-info">${time2.anoF}</div>
      <div class="card-info">${time2.cidade}</div>
      <div class="card-info">${time2.estado}</div>
      <div class="card-info">ID: ${time2.id}</div>
    </div>
    <button class="form-btn" id="clickEdit" onclick="loadEditTime(${time2.id})">edit</button>
  </section>
  `; 
}
////////////// SEARCH BY NOME /////////////////
async function search_Time_nome(){

  const inpNome = document.getElementById('s_input_nome').value;

  try {
    const response = await fetch(`/api/times/search?nome=${inpNome}`);
    times = await response.json();
  } catch(err) {
    console.error(err);
    return [];
  }
}

async function show_nome() {

  await search_Time_nome();
  const root = document.getElementById("root");
  
  root.innerHTML = "";

  for(let i=0; i<times.length; i++) {
    addTimeTo(root, times[i])
  }
}

// FIM DE TIMES //

/*        --------===CRUD PARA JOGOS===-------         */

var jogos = []

//////// Post - jogos ////////
async function createJogo() {
  const cNomeA = document.getElementById('new_jogos_nomeA').value;
  const cNomeB = document.getElementById('new_jogos_nomeB').value;
  const cPontosA = document.getElementById('new_pontosA').value;
  const cPontosB = document.getElementById('new_pontosB').value;

  const postOptions = {
    method: 'POST',
    body: JSON.stringify({nomeA: cNomeA, nomeB: cNomeB, pontosA: cPontosA, pontosB: cPontosB }),
    headers: {
      "Content-Type": "application/json",
    },
  }

  try { 
    const response = await fetch('/api/jogos', postOptions);
    await showJogos(); 
  } catch(err) {
    console.error(err);
  }
  
}

///////// GET - jogos//////////
async function readJogos() {
  try {
    const response = await fetch('/api/jogos');
    jogos = await response.json();
  } catch(err) {
    console.error(err);
    return [];
  }
}

///////// Mostra Jogos //////////
async function showJogos() {
  await readJogos();
  const root = document.getElementById("root");
  
  root.innerHTML = "";

  for(let i=0; i<jogos.length; i++) {
    addJogoTo(root, jogos[i])
  }
}

///////// adiciona cartao jogo //////////
function addJogoTo(element, jogo) {
  const newElement = `
  <section class="cards" id="card-j">
    <div>${jogo.nomeA}</div>
    <div>${jogo.pontosA}</div>
    <div>x</div>
    <div>${jogo.pontosB}</div>
    <div>${jogo.nomeB}</div>
    <div>ID: ${jogo.id}</div>
    <div>
      <button class="form-btn" id="clickEditJ" onclick="loadEditJogo(${jogo.id})">edit</button>
    </div>
  </section>
  `;

  element.innerHTML += newElement;
}

///////// chamado pelo update //////////
function getJogoById(id) {
  for(let i=0; i<jogos.length; i++) {
    if(jogos[i].id === id) return jogos[i];
  }
  return undefined;
}


function loadEditJogo(id) {

  document.getElementById("editFormJ").style.display = "flex";
  const jogoL = getJogoById(id);
  
  if(!jogoL) {
    console.error(`Problema ao tentar acessar o jogo ${id}`);
    return;
  }

  document.getElementById('edit_jogos_nomeA').value = jogoL.nomeA;
  document.getElementById('edit_pontosA').value = jogoL.pontosA;
  document.getElementById('edit_jogos_nomeB').value = jogoL.nomeB;
  document.getElementById('edit_pontosB').value = jogoL.pontosB;
  document.getElementById('edit_button_jogos').onclick = () => { updateJogo(jogoL.id)};
  document.getElementById('delete_button_jogos').onclick = () => { delJogo(jogoL.id)};
}

///////////////////UPDATE - jogos//////////////////////////

async function updateJogo(id) {
  const jogo = getJogoById(id);
  const nomeA = document.getElementById('edit_jogos_nomeA').value;
  const pontosA = document.getElementById('edit_pontosA').value;
  const nomeB = document.getElementById('edit_jogos_nomeB').value;
  const pontosB = document.getElementById('edit_pontosB').value;

  const putOptions = {
    method: 'PUT',
    body: JSON.stringify({nomeA: nomeA, pontosA: pontosA, nomeB: nomeB, pontosB: pontosB }),
    headers: {
      "Content-Type": "application/json",
    },
  }

  try {
    const result = await fetch(`/api/jogos/${jogo.id}`, putOptions);
    await showJogos();
  } catch(err) {
    console.error(err);
  }
  
}
/////////////////// DELETE //////////////////////
async function delJogo(id){
  
  const jogo = getJogoById(id);

  try {
    const result = await fetch(`/api/jogos/${jogo.id}`, {method: 'DELETE'});
    await showJogos();
  } catch(err) {
    console.error(err);
  }
}

/////////////// SEARCH AREA /////////////////
////////////// SEARCH BY ID /////////////////

async function search_jogo_id(){
  const inpId = document.getElementById('s_jogo_id').value;
  try {
    const response = await fetch(`/api/jogos/${inpId}`);
    jogos2 = await response.json();
  } catch(err) {
    console.error(err);
    return [];
  }
}

async function show_jogo_id() {
  if(document.getElementById('s_jogo_id').value == ""){
    showJogos(); 
  }
  await search_jogo_id();
  const root = document.getElementById("root");
  
  root.innerHTML = `
  <section class="cards" id="card-j">
    <p>Time 1: ${jogos2.nomeA}</p>
    <p>Pontos: ${jogos2.pontosA}</p>
    <p>Pontos: ${jogos2.pontosB}</p>
    <p>Time 2: ${jogos2.nomeB}</p>
    <div>ID: ${jogos2.id}</div>
    <button id="clickEditJ" onclick="loadEditJogo(${jogos2.id})">edit</button>
  </section>
  `; 
}

////////////// SEARCH JOGO BY NOME A/////////////////
async function search_jogos_nomeA(){

  const inpNome = document.getElementById('s_nomeA').value;

  try {
    const response = await fetch(`/api/jogosA/search?nomeA=${inpNome}`);
    jogos = await response.json();
  } catch(err) {
    console.error(err);
    return [];
  }
}

async function show_nomeA() {

  await search_jogos_nomeA();
  const root = document.getElementById("root");
  
  root.innerHTML = "";

  for(let i=0; i<jogos.length; i++) {
    addJogoTo(root, jogos[i])
  }
}

////////////// SEARCH JOGO BY NOME B/////////////////

async function search_jogos_nomeB(){

  const inpNome = document.getElementById('s_nomeB').value;

  try {
    const response = await fetch(`/api/jogosB/search?nomeB=${inpNome}`);
    jogos = await response.json();
  } catch(err) {
    console.error(err);
    return [];
  }
}

async function show_nomeB() {

  await search_jogos_nomeB();
  const root = document.getElementById("root");
  
  root.innerHTML = "";

  for(let i=0; i<jogos.length; i++) {
    addJogoTo(root, jogos[i])
  }
}


/////////////////////////NAV BAR BTNS////////////////////////////////

async function start() {
  alert("Bem vindo ao Team Matches, aqui você pode conferir dados de jogos dos seus times favoritos, assim como informações deles!!!!");
  alert("Caso queira, você tambem pode adicionar novos dados, editar e excluir dados de jogos e times");
  showTimes();
  
  }
  
  async function showDisplay() {
  
    document.getElementById("createFormJ").style.display = "none";
    document.getElementById("createForm").style.display = "flex";
  
    document.getElementById("searchFormJ").style.display = "none";
    document.getElementById("searchForm").style.display = "flex"; 

    document.getElementById("editForm").style.display = "none";
    document.getElementById("editFormJ").style.display = "none";
  
    showTimes(); 
  
  }
  
  async function showDisplayJ() {
  
    document.getElementById("createForm").style.display = "none";
    document.getElementById("createFormJ").style.display = "flex";
  
    document.getElementById("searchForm").style.display = "none";
    document.getElementById("searchFormJ").style.display = "flex"; 

    document.getElementById("editForm").style.display = "none";
    document.getElementById("editFormJ").style.display = "none";
  
    showJogos();
  }
  
  async function CancelT() {
    document.getElementById("editForm").style.display = "none";
  
  }
  
  async function CancelJ() {
   document.getElementById("editFormJ").style.display = "none";
  
  }

  window.onload = start();