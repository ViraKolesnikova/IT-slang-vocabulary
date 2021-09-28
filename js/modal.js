import refs from './refs.js';
import tests from './tests.js';

const { bodyRef, testBtnRef, backdropRef, modalCloseBtnRef, quizRef } = refs;
console.log(quizRef);

testBtnRef.addEventListener('click', (event) => {
  backdropRef.classList.add('is-open');
});

modalCloseBtnRef.addEventListener('click', (event) => {
  backdropRef.classList.remove('is-open');
})


function buildQuiz() {
  const output = [];
  tests.forEach((currentQuestion, questionNumber) => {
    const answerMarkup = currentQuestion.answers.map(answer => {
      return `<input type="radio" name="question${questionNumber}" value="${answer}" id="question${questionNumber}"><label for="#question${questionNumber}">${answer}</label>`
    }).join('');
    output.push(`<div class="slider"><p class="question"> ${currentQuestion.question} </p><div class="answers"> ${answerMarkup} </div></div>`);
  })
  quizRef.insertAdjacentHTML('afterbegin', output.join(''));
}

buildQuiz()






// https://coderlessons.com/articles/veb-razrabotka-articles/kak-sdelat-prostoi-test-javascript