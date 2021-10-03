import refs from './refs.js';
import tests from './tests.js';

const { bodyRef, testBtnRef, backdropRef, modalCloseBtnRef, quizRef, nextBtnRef } = refs;

let currentSliderIndex = 0;
let userAnswer = 0;

quizRef.addEventListener('change', onInputRadioClick);
nextBtnRef.addEventListener('click', onNextBtnClickNextSlider);

// =====Відкриття та закриття модалки з тестом======
testBtnRef.addEventListener('click', (event) => {
  backdropRef.classList.add('is-open');
  showFirstQuestion();
});

modalCloseBtnRef.addEventListener('click', (event) => {
  backdropRef.classList.remove('is-open');
  
})
// ===========================

function buildQuiz() {
  const output = [];
  tests.forEach((currentQuestion, questionNumber) => {
    const answerMarkup = currentQuestion.answers.map(answer => {
      return `<div class="answer"><label><input type="radio" name="question${questionNumber}" value="${answer}" id="question${questionNumber}">${answer}</label></div>`
    }).join('');
    output.push(`<div class="slider"><span class="quiz-number">${questionNumber+1}/${tests.length}</span><p class="question"> ${currentQuestion.question} </p><div class="answers"> ${answerMarkup} </div></div>`);
  })
  quizRef.insertAdjacentHTML('afterbegin', output.join(''));
  
}
buildQuiz()

const slidersQuizRef = quizRef.querySelectorAll('.slider');


function showFirstQuestion() {
  quizRef.firstChild.classList.add('current-question');
}

function onNextBtnClickNextSlider(event) {
  findCurrentSliderIndex(slidersQuizRef);
  currentSliderIndex += 1;
  quizRef.firstChild.classList.remove('current-question');
  slidersQuizRef[currentSliderIndex].classList.add('current-question');
  slidersQuizRef[currentSliderIndex-1].classList.remove('current-question');
}

function onInputRadioClick(event) {
  event.target.setAttribute('checked', true);
  getUserAnswer();
  tests.forEach((question, questionNumber) => {
    if (questionNumber === currentSliderIndex) {
      userAnswer === question.correctAnswer ? event.target.closest('label').classList.add('correctAnswer') : event.target.closest('label').classList.add('falseAnswer');
    }
  })
 
}

function getUserAnswer() {
  const answerContainers = quizRef.querySelectorAll(".answers")
  answerContainers.forEach(question => {
    const currentAnswerArr = question.querySelectorAll('.answer');
    [...currentAnswerArr].find((answer, index) => {
      if (answer.firstChild.firstChild.hasAttribute('checked')) {
        userAnswer = index;
      } return
    })    
  })
  return userAnswer;
}

function findCurrentSliderIndex(array) {
  array.forEach((item, index) => {
    if (item.classList.contains('current-question')) {
      currentSliderIndex = index;
    }
  });
  return currentSliderIndex;
}

// function disableSliderInputs() {
//  if (!input.hasAttribute('checked')) {
//     input.setAttribute('disabled', true);
//   } 
// }
// disableSliderInputs()







// https://coderlessons.com/articles/veb-razrabotka-articles/kak-sdelat-prostoi-test-javascript