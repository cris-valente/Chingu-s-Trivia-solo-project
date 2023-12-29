const quizQuestions = [
    {
      question: 'Which HTML5 element should contain important links for navigating a website?',
      id: 1,
      topic: 'html',
      choices: {
        a: '<li>',
        b: '<ul>',
        c: '<header>',
        d: '<nav>'
      },
      answer: 'd'
    },
    {
      question: 'Which HTML5 element should contain important information about what page you are on and the topic of the page?',
      id: 2,
      topic: 'html',
      choices: {
        a: '<li>',
        b: '<ul>',
        c: '<header>',
        d: '<nav>'
      },
      answer: 'c'
    },
    {
      question: 'Which JavaScript variable declaration is used when the assigned value is likely to change?',
      id: 3,
      topic: 'javascript',
      choices: {
        a: 'let',
        b: 'var',
        c: 'variable',
        d: 'const'
      },
      answer: 'a'
    },
    {
      question: 'Which term in JavaScript can be used to describe a declared variable that has not yet been given a value?',
      id: 4,
      topic: 'javascript',
      choices: {
        a: 'null',
        b: 'undefined',
        c: 'typeError',
        d: 'NaN'
      },
      answer: 'b'
    },
    {
      question: 'Which selector could refer to an html element with the class of \'sm-col\'?',
      id: 5,
      topic: 'css',
      choices: {
        a: '#sm-col',
        b: '.sm, .col',
        c: '[class~=col]',
        d: '.sm_col'
      },
      answer: 'c'
    },
    {
      question: 'Setting an element height to \'10vh\' bases the height calculation on _________',
      id: 6,
      topic: 'css',
      choices: {
        a: 'viewfinder height',
        b: 'viewport width',
        c: 'visible height',
        d: 'viewport height'
      },
      answer: 'd'
    },
    {
      question: 'Which HTML5 property can be used for custom data?',
      id: 7,
      topic: 'html',
      choices: {
        a: 'data-',
        b: '-data-',
        c: 'data=',
        d: 'custom'
      },
      answer: 'a'
    },
    {
      question: 'Which HTML5 tag is used to define \'independant, self-contained content\' within a web page?',
      id: 8,
      topic: 'html',
      choices: {
        a: '<section>',
        b: '<main>',
        c: '<aside>',
        d: '<article>'
      },
      answer: 'd'
    },
    {
      question: 'Which of the following snippets does not result in a return value of 8?',
      id: 9,
      topic: 'javascript',
      choices: {
        a: '8**1',
        b: 'Math.pow(16, .75)',
        c: '2 * 2 * \'two\'',
        d: '2**+\'3\''
      },
      answer: 'c'
    },
    {
      question: 'Which of these statements is NOT true of browser-side JavaScript?',
      id: 10,
      topic: 'javascript',
      choices: {
        a: 'JavaScript can be used for functional programming.',
        b: 'JavaScript can be used for file reading and writing on client machines.',
        c: 'JavaScript does not require frameworks or libraries to be used.',
        d: 'Though not class-based, JavaScript is an Object-Oriented Programming Language.'
      },
      answer: 'b'
    }
  ]

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
        currentQuestionNumber = currentQuestionNumber + 1
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

