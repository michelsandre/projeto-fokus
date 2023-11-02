// Objetos
const html = document.querySelector("html");
const btnFoco = document.querySelector(".app__card-button--foco");
const btnCurto = document.querySelector(".app__card-button--curto");
const btnLongo = document.querySelector(".app__card-button--longo");
const botoes = document.querySelectorAll(".app__card-button");
const imagem = document.querySelector(".app__image");
const titulo = document.querySelector(".app__title");
const musicaFocoInput = document.querySelector("#alternar-musica");
const btnStartPause = document.querySelector("#start-pause");
const tempoNaTela = document.querySelector("#timer");

// Adicionar arquivo de audio e tocar
const musica = new Audio("/sons/luna-rise-part-one.mp3");
musica.loop = true;

const musicaPlay = new Audio("/sons/play.wav");
const musicaPause = new Audio("/sons/pause.mp3");
const musicaFinalizado = new Audio("/sons/beep.mp3");

// Temporizador
let tempoDecorrido = 1 * 60; // segundos
let intervaloId;
mostrarTempo();

// Titulos em função do contexto
const objTitulos = {
  foco: `Otimize sua produtividade,<br />
  <strong class="app__title-strong">mergulhe no que importa.</strong>`,
  descansoCurto: `Que tal uma respirada?<br />
  <strong class="app__title-strong">Faça uma pausa curta.</strong>`,
  descansoLongo: `Hora de voltar à superfície.<br />
  <strong class="app__title-strong">Faça uma pausa longa.</strong>`,
};

// Eventos
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

btnStartPause.addEventListener("click", iniciarOuPausar);

// Altera contexto
function alteraContexto(contexto) {
  html.setAttribute("data-contexto", contexto);
  imagem.setAttribute("src", `/imagens/${contexto}.png`);

  switch (contexto) {
    case "foco":
      titulo.innerHTML = objTitulos.foco;
      tempoDecorrido = 25 * 60;

      break;
    case "descanso-curto":
      titulo.innerHTML = objTitulos.descansoCurto;
      tempoDecorrido = 5 * 60;

      break;
    case "descanso-longo":
      titulo.innerHTML = objTitulos.descansoLongo;
      tempoDecorrido = 15 * 60;

      break;
    default:
      console.log("switch error");
  }

  desativaBotoes();
  mostrarTempo();
}

// Desativa os botoes
function desativaBotoes() {
  botoes.forEach((item) => {
    item.classList.remove("active");
  });
}

// Contagem regressiva
const contagemRegressiva = () => {
  if (tempoDecorrido <= 0) {
    zerar();
    musicaFinalizado.play();
    alternaBotaoPlayPause("play");

    const focoAtivo = html.getAttribute("data-contexto") === "foco";
    if (focoAtivo) {
      var event = new CustomEvent("TarefaFinalizada", {
        detail: {
          message: "A tarefa foi concluída com sucesso",
          time: new Date(),
        },
        bubbles: true,
        cancelable: true,
      });
      document.dispatchEvent(event);
      tempoDecorrido = 5;
      mostrarTempo();
    }
    return;
  }
  tempoDecorrido -= 1;
  mostrarTempo();
};

// Iniciar ou pausar timer
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

// Zerar contador
function zerar() {
  clearInterval(intervaloId);
  intervaloId = null;
}

// Alterna botão entre play e pause
function alternaBotaoPlayPause(status) {
  switch (status) {
    case "play":
      btnStartPause
        .querySelector("img")
        .setAttribute("src", "/imagens/play_arrow.png");
      btnStartPause.querySelector("span").textContent = "Começar";
      break;
    case "pause":
      btnStartPause
        .querySelector("img")
        .setAttribute("src", "/imagens/pause.png");
      btnStartPause.querySelector("span").textContent = "Pausar";
      break;
  }
}

// Mostra o tempo na tela
function mostrarTempo() {
  // let tempo =
  //   tempoDecorrido >= 60
  //     ? parseInt(tempoDecorrido / 60) +
  //       ":" +
  //       (tempoDecorrido % 60).toLocaleString(undefined, {
  //         minimumIntegerDigits: 2,
  //       })
  //     : "0:" + tempoDecorrido;
  let tempo = new Date(tempoDecorrido * 1000); // para milisegundos;
  let tempoFormatado = tempo.toLocaleString(undefined, {
    minute: "2-digit",
    second: "2-digit",
  });

  tempoNaTela.innerHTML = tempoFormatado;
}
