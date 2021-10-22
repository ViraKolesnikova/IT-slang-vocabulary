import refs from './refs.js';
import tests from './tests.js';

// =======Доступи========
const {
  bodyRef,
  testBtnRef,
  backdropRef,
  modalCloseBtnRef,
  quizRef,
  nextBtnRef,
  resultBtnRef,
  resultRef
} = refs;
// =======================

let currentSliderIndex = 0;
let userAnswer = 0;
let quizResult = 0;


// =============Івент Лісенери===============
quizRef.addEventListener('change', onInputRadioClick);
nextBtnRef.addEventListener('click', onNextBtnClickNextSlider);
resultBtnRef.addEventListener('click', onResultBtnClick);

// =====Відкриття та закриття модалки з тестом======
testBtnRef.addEventListener('click', (event) => {
  backdropRef.classList.add('is-open');
  showFirstQuestion();
  resultRef.innerHTML = '';
  
});

modalCloseBtnRef.addEventListener('click', (event) => {
  backdropRef.classList.remove('is-open');
  removeLastQuestion();
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

// =======Доступ до встроєних в розмітку елементів======
const slidersQuizRef = quizRef.querySelectorAll('.slider');
const answerContainers = quizRef.querySelectorAll(".answers");
// =========================================

// ============Функції по івентах===============
function onNextBtnClickNextSlider(event) {
  findCurrentSliderIndex(slidersQuizRef);
  currentSliderIndex += 1;
  quizRef.firstChild.classList.remove('current-question');
  slidersQuizRef[currentSliderIndex].classList.add('current-question');
  slidersQuizRef[currentSliderIndex - 1].classList.remove('current-question');
  disableNextBtn(currentSliderIndex, slidersQuizRef);  
}

function onInputRadioClick(event) {
  event.target.setAttribute('checked', true);
  disableSliderInputs();  
  getUserAnswer();
  
  const chosenLabel = event.target.closest('label');
  tests.forEach((question, questionNumber) => {
    if (questionNumber === currentSliderIndex) {
      changeColorOfUserAnswer(chosenLabel, question);
      getQuizResult(question);
    }
  })  
}

function onResultBtnClick(event) {
  const resultMarkup = `Вітаємо! Ви набрали ${quizResult} з ${slidersQuizRef.length} балів`;
  removeLastQuestion();
  resultRef.insertAdjacentHTML('afterbegin', resultMarkup);
  event.target.setAttribute('disabled', true)
  event.target.classList.add('disabled');
  // resultRef.style.display = 'block'
}
// ============Допоміжні функції==============

function showFirstQuestion() {
  quizRef.firstChild.classList.add('current-question');
}

function removeLastQuestion() {
  slidersQuizRef.forEach(slider => {
    if (slider.classList.contains('current-question')) {
      slider.classList.remove('current-question');      
    }
    return;
  }) 
}

function getUserAnswer() {  
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

function changeColorOfUserAnswer(elem, test) {
  return userAnswer === test.correctAnswer
    ? elem.classList.add('correctAnswer')
    : elem.classList.add('falseAnswer');
}

function findCurrentSliderIndex(array) {
  array.forEach((item, index) => {
    if (item.classList.contains('current-question')) {
      currentSliderIndex = index;
    }
  });
  return currentSliderIndex;
}

function disableSliderInputs() {
  findCurrentSliderIndex(slidersQuizRef);
  const currentInputs = slidersQuizRef[currentSliderIndex].querySelectorAll('input');
  currentInputs.forEach(input => {
    if (!input.hasAttribute('checked', true)) {
      input.setAttribute('disabled', true);
    }
  })
}

function getQuizResult(test) {
  if (userAnswer === test.correctAnswer) {
    return quizResult += 1;
  }
  return;
}

function disableNextBtn(index, array) {
  if (index+1 === array.length) {
    nextBtnRef.setAttribute('disabled', true);
    nextBtnRef.classList.add('disabled');
  }
}




