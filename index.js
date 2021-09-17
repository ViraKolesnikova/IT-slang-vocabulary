import data from './data.js'

const refs = {
  inputRef: document.querySelector('.search-input'),
  searchBtnRef: document.querySelector('.search-button'),
  letterBtnRef: document.querySelectorAll('.alphabet-btn'),
  termRef: document.querySelector('.searched-term'),
  definitionRef: document.querySelector('.word-definition')
}

const { inputRef, searchBtnRef, letterBtnRef, termRef, definitionRef } = refs;

searchBtnRef.addEventListener('click', onInputSearch);
inputRef.addEventListener('focus', onInputFocus);


function onInputSearch(event) {
  event.preventDefault();
  const result = data.find(object => {
    return inputRef.value.toLowerCase() === object.term.toLowerCase();
  })
  // console.log(result);
  result === undefined ? isAbsentDefinition() : getSearchedDefinition(result);
}

function onInputFocus(event) {
  inputRef.value = '';
  termRef.textContent = 'Термін';
  definitionRef.textContent = 'Тлумачення';
}



function getSearchedDefinition(obj) {
  termRef.textContent = obj.term;
  definitionRef.textContent = obj.meaning;  
}

function isAbsentDefinition() {
  termRef.textContent = inputRef.value;
  definitionRef.textContent = 'Нажаль, в словнику не знайдено такого терміну...'; 
}