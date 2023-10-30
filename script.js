const html = document.querySelector("html");
const btnFoco = document.querySelector(".app__card-button--foco");
const btnCurto = document.querySelector(".app__card-button--curto");
const btnLongo = document.querySelector(".app__card-button--longo");
const btnAll = document.querySelectorAll(".app__card-button");
const imagem = document.querySelector(".app__image");
const titulo = document.querySelector(".app__title");

const objTitulos = {
  foco: `Otimize sua produtividade,<br />
  <strong class="app__title-strong">mergulhe no que importa.</strong>`,
  descansoCurto: `Que tal uma respirada?<br />
  <strong class="app__title-strong">Faça uma pausa curta.</strong>`,
  descansoLongo: `Hora de voltar à superfície.<br />
  <strong class="app__title-strong">Faça uma pausa longa.</strong>`,
};

btnFoco.addEventListener("click", () => {
  desativaBotoes();
  btnFoco.classList.add("active");
  alteraContexto("foco");
});

btnCurto.addEventListener("click", () => {
  desativaBotoes();
  btnCurto.classList.add("active");
  alteraContexto("descanso-curto");
});

btnLongo.addEventListener("click", () => {
  desativaBotoes();
  btnLongo.classList.add("active");
  alteraContexto("descanso-longo");
});

function alteraContexto(contexto) {
  html.setAttribute("data-contexto", contexto);
  imagem.setAttribute("src", `/imagens/${contexto}.png`);

  switch (contexto) {
    case "foco":
      titulo.innerHTML = objTitulos.foco;

      break;
    case "descanso-curto":
      titulo.innerHTML = objTitulos.descansoCurto;

      break;
    case "descanso-longo":
      titulo.innerHTML = objTitulos.descansoLongo;

      break;
    default:
      console.log("switch error");
  }
}
function desativaBotoes() {
  btnAll.forEach((item) => {
    item.classList.remove("active");
  });
}
