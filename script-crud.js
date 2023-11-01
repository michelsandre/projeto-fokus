// Elementos
const taskListContainer = document.querySelector(".app__section-task-list");
const formTask = document.querySelector(".app__form-add-task");
const toggleFormTaskBtn = document.querySelector(".app__button--add-task");
const formLabel = document.querySelector(".app__form-label");
const textArea = document.querySelector(".app__form-textarea");
const cancelButton = document.querySelector(
  ".app__form-footer__button--cancel"
);
const clearAllTasks = document.querySelector("#btn-remover-todas");

// SVG
const taskIconSvg = `
<svg class="app__section-task-icon-status" width="24" height="24" viewBox="0 0 24 24"
    fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="12" fill="#FFF" />
    <path
        d="M9 16.1719L19.5938 5.57812L21 6.98438L9 18.9844L3.42188 13.4062L4.82812 12L9 16.1719Z"
        fill="#01080E" />
</svg>
`;

// Variaveis
let tasks = [];
const localData = JSON.parse(localStorage.getItem("tasks"));

// localStorage.clear();
console.log(localStorage);

// Se tiver dados no localStorage, atribui a tasks
tasks = !localData ? [] : localData;

// Atualiza listas de tarefas
refreshTasks();

// Inicializa as tarefas
function refreshTasks() {
  taskListContainer.innerHTML = "";
  tasks.forEach((task) => {
    const taskItem = createTask(task);
    taskListContainer.appendChild(taskItem);
  });
}

// FUNCAO DOS BOTOES
// Submeter o formulario e add tarefa
formTask.addEventListener("submit", (evento) => {
  evento.preventDefault();
  const task = {
    description: textArea.value,
    completed: false,
  };

  tasks.push(task);
  textArea.value = null;
  localStorage.setItem("tasks", JSON.stringify(tasks));
  refreshTasks();
});

// Função para o botão adicionar tarefa
toggleFormTaskBtn.addEventListener("click", () => {
  formLabel.textContent = "Adicionando tarefas";
  toggleForm();
});

// Função para o botão cancelar
cancelButton.addEventListener("click", () => {
  textArea.value = null;
  toggleForm();
});

// Funcão para o botão limpar todas as tarefas
clearAllTasks.addEventListener("click", () => {
  localStorage.clear("tasks");
  tasks = [];
  refreshTasks();
});
///////////////////////////

// FUNCOES
// Cria lista de tarefas
function createTask(task) {
  const li = document.createElement("li");
  li.classList.add("app__section-task-list-item");

  const svgIcon = document.createElement("svg");
  svgIcon.innerHTML = taskIconSvg;

  const paragraph = document.createElement("p");
  paragraph.classList.add("app__section-task-list-item-description");

  paragraph.textContent = task.description;

  li.appendChild(svgIcon);
  li.appendChild(paragraph);
  return li;
}

// Função para mostrar/esconder formulario
function toggleForm() {
  formTask.classList.toggle("hidden");
}
///////////////////////////
