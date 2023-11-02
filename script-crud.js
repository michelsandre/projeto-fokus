// ELEMENTOS

const taskListContainer = document.querySelector(".app__section-task-list");
const formTask = document.querySelector(".app__form-add-task");
const toggleFormTaskBtn = document.querySelector(".app__button--add-task");
const formLabel = document.querySelector(".app__form-label");
const textArea = document.querySelector(".app__form-textarea");
const cancelButton = document.querySelector(
  ".app__form-footer__button--cancel"
);
const deleteButton = document.querySelector(
  ".app__form-footer__button--delete"
);
const clearAllTasks = document.querySelector("#btn-remover-todas");
const clearAllCompletedTasks = document.querySelector(
  "#btn-remover-concluidas"
);
const activeTaskDescription = document.querySelector(
  ".app__section-active-task-description"
);

// Icone SVG
const taskIconSvg = `
<svg class="app__section-task-icon-status" width="24" height="24" viewBox="0 0 24 24"
    fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="12" fill="#FFF" />
    <path
        d="M9 16.1719L19.5938 5.57812L21 6.98438L9 18.9844L3.42188 13.4062L4.82812 12L9 16.1719Z"
        fill="#01080E" />
</svg>
`;

///////////////////////////

// VARIAVEIS

const localData = JSON.parse(localStorage.getItem("tasks")); // Busca dados do local storage
let tasks = !localData ? [] : localData; // Se tiver dados no localStorage, atribui a tasks

let selectedTask = null; // Armazenar item selecionado
let taskInEditing = null; // Armazenar item em edicao

///////////////////////////

// INICIO
// Atualiza listas de tarefas
refreshTasks();

///////////////////////////

// FUNCAO DOS BOTOES

// Submeter o formulario e add tarefa
formTask.addEventListener("submit", (event) => {
  event.preventDefault();

  if (taskInEditing) {
    taskInEditing.description = textArea.value;
  } else {
    const task = {
      description: textArea.value,
      completed: false,
    };

    tasks.push(task);
  }
  clearForm();
  saveLocalStorage();
  refreshTasks();
});

// Função para o botão adicionar tarefa
toggleFormTaskBtn.addEventListener("click", () => {
  formLabel.textContent = "Adicionando tarefas";
  clearForm();
});

// Função para o botão cancelar
cancelButton.addEventListener("click", () => clearForm());

// Funcão para o botão limpar todas as tarefas
clearAllTasks.addEventListener("click", () => {
  localStorage.clear("tasks");
  tasks = [];
  refreshTasks();
});

// Função para o botão limpar todas tarefas concluidas
clearAllCompletedTasks.addEventListener("click", () => {
  tasks = tasks.filter((task) => !task.completed);
  saveLocalStorage();
  refreshTasks();
});

// Função botão deleter
deleteButton.addEventListener("click", () => {
  deleteTask();
});

///////////////////////////

// FUNCOES

// Inicializa as tarefas
function refreshTasks() {
  taskListContainer.innerHTML = "";
  tasks.forEach((task) => {
    const taskItem = createTask(task);
    taskListContainer.appendChild(taskItem);
  });
}

// Cria lista de tarefas com marcação de check e botões de editar
function createTask(task) {
  const li = document.createElement("li");
  li.classList.add("app__section-task-list-item");

  const svgIcon = document.createElement("svg"); // Cria icone svg
  svgIcon.innerHTML = taskIconSvg;

  const paragraph = document.createElement("p"); // Cria elemento de descrição
  paragraph.classList.add("app__section-task-list-item-description");
  paragraph.textContent = task.description; // Atribui descrição da tarefas

  const button = document.createElement("button"); // Cria botão de editar
  button.classList.add("app_button-edit");
  button.setAttribute("type", "button");

  const editIcon = document.createElement("img"); // Cria imagem do botão editar
  editIcon.setAttribute("src", "/imagens/edit.png");

  button.appendChild(editIcon); // Atribui imagem ao botão
  li.appendChild(svgIcon); // Atribui svg ao elmento li
  li.appendChild(paragraph); // Atribui p ao elemento li
  li.appendChild(button); // Atribui botão ao elemento li

  // Atribui função de marcação de tarefa concluída ao SVG
  svgIcon.addEventListener("click", (event) => {
    if (task == selectedTask) {
      event.stopPropagation();
      button.setAttribute("disabled", true);
      li.classList.add("app__section-task-list-item-complete");
      selectedTask.completed = true;
      saveLocalStorage();
    }
  });

  // Atribui a função de selecionar tarefa ao clicar no paragrafo
  li.onclick = () => {
    selectTask(li, task);
  };

  // Adiciona função ao botão de editar
  button.addEventListener("click", (event) => {
    event.stopPropagation();
    editTask(task);
  });

  // Verifica se a tarefa está concluida e altera estilo
  if (task.completed) {
    button.setAttribute("disabled", true);
    li.classList.add("app__section-task-list-item-complete");
  }

  return li;
}

// Função de selecioanr a tarefa
const selectTask = (li, task) => {
  if (task.completed) {
    return;
  }
  clearSelectionTasks(li);
  li.classList.toggle("app__section-task-list-item-active");

  const itemSelected = li.classList.contains(
    "app__section-task-list-item-active"
  );

  if (itemSelected) {
    selectedTask = task;
    activeTaskDescription.textContent = task.description;
  } else {
    selectedTask = null;
    activeTaskDescription.textContent = null;
  }
};

// Funcão de editar tarefa
const editTask = (task) => {
  if (taskInEditing == task) {
    clearForm();
    return;
  }

  formLabel.textContent = "Editando tarefa";
  taskInEditing = task;
  textArea.value = task.description;
  formTask.classList.remove("hidden");
};

// Função para deletar tarefa
const deleteTask = () => {
  if (selectedTask) {
    tasks = tasks.filter((task) => task != taskInEditing);
    saveLocalStorage();
    clearForm();
    refreshTasks();
  } else {
    clearForm();
  }
};
// Função para mostrar/esconder formulario
const clearForm = () => {
  formTask.classList.toggle("hidden");
  textArea.value = null;
  taskInEditing = null;
  paragraphInEditing = null;
};

// Salvar tasks para localStorage
const saveLocalStorage = () => {
  localStorage.setItem("tasks", JSON.stringify(tasks));
};

// Limpar seleção dos demais itens de tarefas
function clearSelectionTasks(li) {
  const taskItems = document.querySelectorAll(
    ".app__section-task-list-item-active"
  );

  taskItems.forEach((taskItem) => {
    if (taskItem != li) {
      taskItem.classList.remove("app__section-task-list-item-active");
    }
  });
}

// Função executada após timer finalizado
document.addEventListener("TarefaFinalizada", (e) => {
  if (selectedTask) {
    selectedTask.completed = true;
    activeTaskDescription.textContent = e.detail.message;
    saveLocalStorage();
    refreshTasks();
  }
});
///////////////////////////
