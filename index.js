import quizQuestions from "./questions.js"

const questionEl = document.getElementById('question')
const numberEl = document.getElementById('num')
const answersEl = document.getElementById('answers')
const containerEl = document.getElementById('container')
const welcomeTitleEl = document.getElementById('welcome-title')
const startDivEl =  document.getElementById('start-div')

// Controllers
let currentQuestionNumber = 0
let correctAnswers = quizQuestions.length

// Event listener added to the whole page that calls checkAnswer()
document.addEventListener('click', checkAnswer)

// Function that starts the game and check if user answers right or wrong
function checkAnswer(e){
    
    if(e.target.id && e.target.id === 'start-btn'){
        gameStarter()
    }

    // When the user answers the last question:
    else if (e.target.id && currentQuestionNumber === quizQuestions.length){
        
        questionEl.innerHTML = 'You just finished this test!'
        numberEl.innerHTML = `
        You answered ${correctAnswers} questions correctly 
        out of ${quizQuestions.length}`
        
        answersEl.innerHTML = ''
        
        setTimeout(function(){
        questionEl.innerHTML = ''
        startDivEl.classList.remove('hide')
        welcomeTitleEl.textContent = "Start again?"
        }, 2000)
    }

    // If the user answers right:
    else if(currentQuestionNumber > 0 && e.target.id === quizQuestions[currentQuestionNumber - 1].answer){
        
        document.getElementById(e.target.id).classList.add('right-answer')
        
        // Shows 'correct' msg:
        const correctAnswerMsg = document.createElement('div')
        correctAnswerMsg.textContent = 'Correct!'
        containerEl.appendChild(correctAnswerMsg)
        
        // Updates number of correct answers
        if(document.getElementsByClassName('wrong-answer').length !== 0){
            correctAnswers-- 
        }

        // Adds CSS transition class
        setTimeout(function() {
            containerEl.classList.add('transition')
            
        }, 1800)
        setTimeout(function(){
            containerEl.classList.remove('transition')
            containerEl.classList.add('transition2')
        }, 2300)
        // Renders next question after 2s
        setTimeout(function() {

            containerEl.classList.remove('transition2')
            currentQuestionNumber++
            correctAnswerMsg.textContent = ''
            renderQuestion(currentQuestionNumber)
        }, 2600)       
    }

    // If the user answers wrong:
    else if (e.target.id && e.target.id.match(/^[a-d]$/i)){
        
        document.getElementById(e.target.id).classList.add('wrong-answer')
        document.getElementById(e.target.id).classList.remove('answer-btn')
    }
}


    // Renders first question by adding  1 to currentQuestionNumber
    function gameStarter(){
      numberEl.innerHTML = ''
      welcomeTitleEl.textContent = ''
      currentQuestionNumber = 1
      renderQuestion(currentQuestionNumber)
      startDivEl.classList.add('hide')
    }

function renderQuestion(number) {
    
    for (let element of quizQuestions) {
        if (element.id === number){
            
            questionEl.textContent = element.question
            numberEl.innerHTML = `Question (${element.id} of ${quizQuestions.length})`
            answersEl.innerHTML = ''

            for (const [key, value] of Object.entries(element.choices)) {
                const option = document.createElement('li')
                option.setAttribute("id", key);
                option.classList.add('answer-btn')
                option.textContent = value
                answersEl.appendChild(option)
            }
        }
        
    }
}

