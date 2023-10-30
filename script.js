const html = document.querySelector("html");
const btnFoco = document.querySelector(".app__card-button--foco");
const btnCurto = document.querySelector(".app__card-button--curto");
const btnLongo = document.querySelector(".app__card-button--longo");
const botoes = document.querySelectorAll(".app__card-button");
const imagem = document.querySelector(".app__image");
const titulo = document.querySelector(".app__title");
const musicaFocoInput = document.querySelector("#alternar-musica");
const btnStartPause = document.querySelector("#start-pause");
const btnStartPauseArrow = document
  .querySelector("#start-pause")
  .querySelector("img");

// Adicionar arquivo de audio e tocar
const musica = new Audio("/sons/luna-rise-part-one.mp3");
musica.loop = true;

const musicaPlay = new Audio("/sons/play.wav");
const musicaPause = new Audio("/sons/pause.mp3");
const musicaFinalizado = new Audio("/sons/beep.mp3");

//Temporizador
let tempoDecorridoEmSegundos = 5;
let intervaloId;

const objTitulos = {
  foco: `Otimize sua produtividade,<br />
  <strong class="app__title-strong">mergulhe no que importa.</strong>`,
  descansoCurto: `Que tal uma respirada?<br />
  <strong class="app__title-strong">Faça uma pausa curta.</strong>`,
  descansoLongo: `Hora de voltar à superfície.<br />
  <strong class="app__title-strong">Faça uma pausa longa.</strong>`,
};

musicaFocoInput.addEventListener("change", () => {
  if (musica.paused) {
    musica.play();
  } else {
    musica.pause();
  }
});

btnFoco.addEventListener("click", () => {
  alteraContexto("foco");
  btnFoco.classList.add("active");
});

btnCurto.addEventListener("click", () => {
  alteraContexto("descanso-curto");
  btnCurto.classList.add("active");
});

btnLongo.addEventListener("click", () => {
  alteraContexto("descanso-longo");
  btnLongo.classList.add("active");
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

  desativaBotoes();
}
function desativaBotoes() {
  botoes.forEach((item) => {
    item.classList.remove("active");
  });
}

const contagemRegressiva = () => {
  if (tempoDecorridoEmSegundos <= 0) {
    zerar();
    musicaFinalizado.play();
    return;
  }
  tempoDecorridoEmSegundos -= 1;
  console.log(`Temporizador: ${tempoDecorridoEmSegundos}`);
};

btnStartPause.addEventListener("click", iniciarOuPausar);

function iniciarOuPausar() {
  if (intervaloId) {
    zerar();
    musicaPause.play();
    alternaBotaoPlayPause("play");
    return;
  }
  musicaPlay.play();
  alternaBotaoPlayPause("pause");
  intervaloId = setInterval(contagemRegressiva, 1000);
}
function zerar() {
  clearInterval(intervaloId);
  intervaloId = null;
}

function alternaBotaoPlayPause(status) {
  switch (status) {
    case "play":
      btnStartPauseArrow.setAttribute("src", "/imagens/play_arrow.png");
      btnStartPause.querySelector("span").textContent = "Começar";
      break;
    case "pause":
      btnStartPauseArrow.setAttribute("src", "/imagens/pause.png");
      btnStartPause.querySelector("span").textContent = "Pausar";
      break;
  }
}
