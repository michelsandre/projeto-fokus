# Projeto Fokus

Práitica de lógica de programação através deste desafio de um aplicativo de timer pomodoro.

## 🚀 Funcionalidades

- Timer regressivo para Foco
- Timer regressivo para Descanso Curto
- Timer regressivo para Descanso Longo
- Utilização de audio
- Uso de formatação dos minutos e segundos utilizando `toLocaleString(undefined, {minute: '2-digit',second: '2-digit'})`

## 🛠 Tecnologia aplicada

Javascript, HTML, CSS...

## 🕹 Uso/Exemplos

#### Função de mostra tempo na tela formatado

```javascript
function mostrarTempo() {
  let tempo = new Date(tempoDecorrido * 1000); // para milisegundos;
  let tempoFormatado = tempo.toLocaleString(undefined, {
    minute: "2-digit",
    second: "2-digit",
  });

  tempoNaTela.innerHTML = tempoFormatado;
}
```

## Design do projeto

Projeto do Design Fokus no Figma: [Link](https://www.figma.com/file/dEaMv34Wd5G7TBMPo8fPlK/Projeto-Fokus?type=design&node-id=35-181&mode=design)

## Autores

- [@michelsandre](https://www.github.com/michelsandre)
