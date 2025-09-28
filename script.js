class QuizGame {
    constructor() {
        this.questions = [
            {
                question: "Qual é o planeta mais próximo do Sol?",
                options: ["Vênus", "Mercúrio", "Terra", "Marte"],
                correct: 1
            },
            {
                question: "Quantos ossos tem o corpo humano adulto?",
                options: ["206", "300", "150", "250"],
                correct: 0
            },
            {
                question: "Qual é o elemento químico mais abundante no universo?",
                options: ["Oxigênio", "Carbono", "Hidrogênio", "Hélio"],
                correct: 2
            },
            {
                question: "Que animal é conhecido como 'rei da selva'?",
                options: ["Tigre", "Elefante", "Leão", "Gorila"],
                correct: 2
            },
            {
                question: "Qual é o maior oceano da Terra?",
                options: ["Atlântico", "Índico", "Ártico", "Pacífico"],
                correct: 3
            }
        ];

        this.currentQuestion = 0;
        this.score = 0;
        this.answered = false;

        this.initializeElements();
        this.attachEventListeners();
    }

    initializeElements() {
        this.startScreen = document.getElementById('start-screen');
        this.gameScreen = document.getElementById('game-screen');
        this.resultScreen = document.getElementById('result-screen');
        
        this.startBtn = document.getElementById('start-btn');
        this.nextBtn = document.getElementById('next-btn');
        this.restartBtn = document.getElementById('restart-btn');
        
        this.questionText = document.getElementById('question-text');
        this.optionsContainer = document.getElementById('options-container');
        this.scoreElement = document.getElementById('score');
        this.currentQuestionElement = document.getElementById('current-question');
        this.totalQuestionsElement = document.getElementById('total-questions');
        this.finalScoreElement = document.getElementById('final-score');
        this.performanceMessage = document.getElementById('performance-message');
    }

    attachEventListeners() {
        this.startBtn.addEventListener('click', () => this.startGame());
        this.nextBtn.addEventListener('click', () => this.nextQuestion());
        this.restartBtn.addEventListener('click', () => this.restartGame());
    }

    startGame() {
        this.startScreen.classList.remove('active');
        this.gameScreen.classList.add('active');
        this.showQuestion();
    }

    showQuestion() {
        const question = this.questions[this.currentQuestion];
        this.questionText.textContent = question.question;
        this.optionsContainer.innerHTML = '';
        
        this.answered = false;
        this.nextBtn.classList.add('hidden');

        question.options.forEach((option, index) => {
            const optionElement = document.createElement('div');
            optionElement.className = 'option';
            optionElement.textContent = option;
            optionElement.addEventListener('click', () => this.selectOption(index));
            this.optionsContainer.appendChild(optionElement);
        });

        this.updateProgress();
    }

    selectOption(selectedIndex) {
        if (this.answered) return;
        
        this.answered = true;
        const question = this.questions[this.currentQuestion];
        const options = this.optionsContainer.children;

        // Marcar resposta correta e incorreta
        for (let i = 0; i < options.length; i++) {
            options[i].classList.add('disabled');
            if (i === question.correct) {
                options[i].classList.add('correct');
            } else if (i === selectedIndex) {
                options[i].classList.add('incorrect');
            }
        }

        // Atualizar pontuação
        if (selectedIndex === question.correct) {
            this.score += 10;
            this.scoreElement.textContent = this.score;
        }

        this.nextBtn.classList.remove('hidden');
    }

    nextQuestion() {
        this.currentQuestion++;
        
        if (this.currentQuestion < this.questions.length) {
            this.showQuestion();
        } else {
            this.showResults();
        }
    }

    showResults() {
        this.gameScreen.classList.remove('active');
        this.resultScreen.classList.add('active');
        
        this.finalScoreElement.textContent = this.score;
        
        // Mensagem de desempenho
        const percentage = (this.score / (this.questions.length * 10)) * 100;
        let message = '';
        
        if (percentage >= 80) {
            message = "🎉 Excelente! Você é um verdadeiro cientista!";
        } else if (percentage >= 60) {
            message = "👍 Bom trabalho! Continue estudando!";
        } else if (percentage >= 40) {
            message = "💡 Não desanime! O conhecimento vem com o tempo!";
        } else {
            message = "📚 Hora de revisar os livros de ciências!";
        }
        
        this.performanceMessage.textContent = message;
    }

    restartGame() {
        this.currentQuestion = 0;
        this.score = 0;
        this.scoreElement.textContent = '0';
        
        this.resultScreen.classList.remove('active');
        this.startScreen.classList.add('active');
    }

    updateProgress() {
        this.currentQuestionElement.textContent = this.currentQuestion + 1;
        this.totalQuestionsElement.textContent = this.questions.length;
    }
}

// Inicializar o jogo quando a página carregar
document.addEventListener('DOMContentLoaded', () => {
    new QuizGame();
});
