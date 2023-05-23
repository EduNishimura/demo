var times = []

///////// CRUD //////////


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

///////// FIM DO CRUD //////////


///////// Método úteis /////////

///////// Mostra alunos //////////
async function showTimes() {
  await readTimes();
  const root = document.getElementById("root");
  
  root.innerHTML = "";

  for(let i=0; i<times.length; i++) {
    addTimeTo(root, times[i])
  }
}

///////// ?adiciona cartão aluno? //////////
function addTimeTo(element, time) {
  const newElement = `
  <section>
    <h1>${time.nome}</h1>
    <div>ID: ${time.id}</div>
    <div>Ano de fundação: ${time.anoF}</div>
    <div>Cidade: ${time.cidade}</div>
    <div>Estado: ${time.estado}</div>
    <button onclick="loadEditTime(${time.id})">edit</button>
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
  const timeL = getTimeById(id);
  
  if(!timeL) {
    console.error(`Problema ao tentar acessar o time ${id}`);
    return;
  }

  document.getElementById('time_nome').value = timeL.nome;
  document.getElementById('time_anof').value = timeL.anoF;
  document.getElementById('time_cidade').value = timeL.cidade;
  document.getElementById('time_estado').value = timeL.estado;
  document.getElementById('edit_button').onclick = () => { updateAluno(timeL.id)};

}

async function updateAluno(id) {
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
    await showAlunos();
  } catch(err) {
    console.error(err);
  }
  
}

window.onload = showTimes;