const html = document.querySelector("html");
const btnFoco = document.querySelector(".app__card-button--foco");
const btnCurto = document.querySelector(".app__card-button--curto");
const btnLongo = document.querySelector(".app__card-button--longo");
const btnAll = document.querySelectorAll(".app__card-button");
const imagem = document.querySelector(".app__image");

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
}
function desativaBotoes() {
  btnAll.forEach((item) => {
    item.classList.remove("active");
  });
}
