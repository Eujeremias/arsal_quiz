const $startGameButton = document.querySelector(".start-quiz")
const $questionsContainer = document.querySelector(".questions-container")
const $answersContainer = document.querySelector(".answers-container")
const $questionText = document.querySelector(".question")
const $container = document.querySelector(".container")
const $nextQuestionButton = document.querySelector(".next-question")

$startGameButton.addEventListener("click", startGame)
$nextQuestionButton.addEventListener("click", displayNextQuestion)

let currentQuestionIndex = 0
let totalCorrect = 0

const questions = [
    {
        question: "Quais são os serviços que a ARSAL regula?",
        answers: [
            { text: "Energia", correct: false },
            { text: "Transporte Interestadual", correct: false }, // Correção de "Inderestadual" para "Interestadual"
            { text: "Combustível", correct: false },
            { text: "Transporte Municipal", correct: true }
        ]
    },
    {
        question: "Quem é o melhor estagiário da ARSAL?",
        answers: [
            { text: "Jeremias", correct: true },
            { text: "Matheus", correct: false },
            { text: "Combustível", correct: false },
            { text: "Transporte Municipal", correct: false }
        ]
    },
    {
        question: "Qual o setor mais competente?",
        answers: [
            { text: "Transporte", correct: true },
            { text: "Sala Lilas", correct: false },
            { text: "Jurídico", correct: false },
            { text: "Financeiro", correct: false }
        ]
    }
]

function startGame() {
    $startGameButton.classList.add("hide")
    $questionsContainer.classList.remove("hide")
    displayNextQuestion()
}

function displayNextQuestion() {
    resetState()

    if(questions.length === currentQuestionIndex){
        return finishGame()
    }

    $questionText.textContent = questions[currentQuestionIndex].question
    questions[currentQuestionIndex].answers.forEach(answer => {
        const newAnswer = document.createElement("button")
        newAnswer.classList.add("button", "answer")
        newAnswer.textContent = answer.text
        if (answer.correct) {
            newAnswer.dataset.correct = answer.correct
        }
        $answersContainer.appendChild(newAnswer)

        newAnswer.addEventListener("click", selectAnswer)
    })
}

function resetState(){
    while($answersContainer.firstChild){
        $answersContainer.removeChild($answersContainer.firstChild)   
    }
    
    document.body.removeAttribute("class")
    $nextQuestionButton.classList.add("hide")
}

function selectAnswer(event){
    const answerClicked = event.target
    console.log(answerClicked)
    if(answerClicked.dataset.correct){
        document.body.classList.add("correct")
        totalCorrect++
    }else{
        document.body.classList.add("incorrect")
    }

    document.querySelectorAll(".answer").forEach(button=>{
        if(button.dataset.correct){
            button.classList.add("correct")
        }else{
            button.classList.add("incorrect")
        }

        // inabilita os outros botões
        button.disabled = true
    })

    $nextQuestionButton.classList.remove("hide")
    currentQuestionIndex++
}

function finishGame(){
    const totalQuestion = questions.length
    const perfomance = Math.floor(totalCorrect * 100 / totalQuestion)

    let message = ""

    switch(true){
        case(perfomance >= 90):
            message = "Excelente :)"
            break
        case(perfomance >= 70):
            message = "Muito bom :)"
            break
        case(perfomance >= 50):
            message = "Bom"
            break
        default:
            message = "Pode melhorar :("
    }

    $questionsContainer.innerHTML = 
    `
        <p class="final-message">
            Você acertou ${totalCorrect} de ${questions.length} questões!
            <span>Resultado: ${message} </span>
        </p>

        <button onclick=window.location.reload() class="button">
            Refazer teste
        </button>
    `
}