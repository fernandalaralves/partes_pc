const questions = [
    { q: "Qual componente exibe as informações do computador?", options: ["Mouse", "Monitor", "Teclado"], answer: 1 },
    { q: "Qual dispositivo é usado para digitar informações?", options: ["Monitor", "Teclado", "Impressora"], answer: 1 },
    { q: "Qual dispositivo move o cursor na tela?", options: ["Mouse", "Cooler", "HD"], answer: 0 },
    { q: "Qual peça resfria o computador?", options: ["Cooler", "Memória RAM", "Fonte"], answer: 0 },
    { q: "HDD e SSD são tipos de quê?", options: ["Memória fixa", "Memória volátil", "Placa de vídeo"], answer: 0 },
    { q: "A memória RAM é volátil ou fixa?", options: ["Volátil", "Fixa", "Nenhuma"], answer: 0 },
    { q: "O que significa SSD?", options: ["Solid State Drive", "Simple Storage Device", "Speed Storage Disk"], answer: 0 },
    { q: "O que significa HDD?", options: ["Hard Disk Drive", "High Data Device", "Hyper Disk Drive"], answer: 0 },
    { q: "Qual dispositivo é essencial para resfriamento?", options: ["Cooler", "Fonte", "Teclado"], answer: 0 },
    { q: "Qual peça exibe imagens?", options: ["Monitor", "Mouse", "Fonte"], answer: 0 },
    { q: "Qual armazena dados permanentemente?", options: ["SSD", "RAM", "Cache"], answer: 0 },
    { q: "Qual é mais rápido: SSD ou HDD?", options: ["SSD", "HDD", "Iguais"], answer: 0 },
    { q: "Qual dispositivo de entrada usamos para clicar?", options: ["Mouse", "Monitor", "RAM"], answer: 0 },
    { q: "Qual dispositivo de entrada usamos para digitar?", options: ["Teclado", "Monitor", "SSD"], answer: 0 },
    { q: "O que significa RAM?", options: ["Random Access Memory", "Read Access Memory", "Rapid Access Module"], answer: 0 },
    { q: "Qual dispositivo é considerado memória volátil?", options: ["RAM", "SSD", "HDD"], answer: 0 },
    { q: "Qual peça conecta todos os componentes internos?", options: ["Placa-mãe", "Cooler", "HD"], answer: 0 },
    { q: "Qual componente fornece energia ao computador?", options: ["Fonte", "Monitor", "Teclado"], answer: 0 },
    { q: "Qual peça é usada para processar dados?", options: ["Processador", "Monitor", "SSD"], answer: 0 },
    { q: "Qual unidade é usada para medir capacidade de armazenamento?", options: ["GB", "MHz", "V"], answer: 0 },
];

const quizContainer = document.getElementById("quiz");

questions.forEach((item, index) => {
    const questionDiv = document.createElement("div");
    questionDiv.classList.add("mb-3");
    
    const questionTitle = document.createElement("h5");
    questionTitle.textContent = `${index + 1}. ${item.q}`;
    questionDiv.appendChild(questionTitle);

    item.options.forEach((option, i) => {
        const label = document.createElement("label");
        label.classList.add("d-block");
        
        const radio = document.createElement("input");
        radio.type = "radio";
        radio.name = `question${index}`;
        radio.value = i;
        
        label.appendChild(radio);
        label.append(` ${option}`);
        questionDiv.appendChild(label);
    });

    quizContainer.appendChild(questionDiv);
});

function submitQuiz() {
  let score = 0;
  questions.forEach((item, index) => {
    const answer = document.querySelector(`input[name="question${index}"]:checked`);
    if (answer && parseInt(answer.value) === item.answer) {
      score++;
    }
  });

  const resultDiv = document.getElementById("result");
  const nextStepDiv = document.getElementById("nextStep");
  resultDiv.innerHTML = `<h4>Você acertou ${score} de ${questions.length} perguntas!</h4>`;
  nextStepDiv.innerHTML = "";

  if (score > 12) {
    nextStepDiv.innerHTML = `
      <p class="mb-2">Você foi muito bem! Que tal um jogo agora?</p>
      <div class="d-flex flex-wrap" style="gap:8px;">
        <a href="mines.html" class="btn btn-success">Jogar Campo Minado</a>
        <a href="snake.html" class="btn btn-info">Jogar Cobrinha</a>
      </div>
    `;
  } else {
    nextStepDiv.innerHTML = `
      <p class="mb-2">Poxa, não foi tão bem!</p>
      <button class="btn btn-warning" onclick="location.reload()">Tentar novamente</button>
    `;
  }
}
