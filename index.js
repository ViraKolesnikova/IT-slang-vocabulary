import data from './data.js'

const refs = {
  inputRef: document.querySelector('.search-input'),
  searchBtnRef: document.querySelector('.search-button'),
  alphabetListRef: document.querySelector('.alphabet-list'),
  termRef: document.querySelector('.searched-term'),
  definitionRef: document.querySelector('.word-definition'),
  listRef: document.querySelector('.word-list'),
  
}

const { inputRef, searchBtnRef, alphabetListRef, termRef, definitionRef, listRef, searchForm } = refs;

searchBtnRef.addEventListener('click', onInputSearch);
inputRef.addEventListener('focus', onInputFocus);
alphabetListRef.addEventListener('click', onLetterClick);
listRef.addEventListener('click', onTermLinkClick);


function onInputSearch(event) {
  event.preventDefault();
  const result = data.find(object => {
    return inputRef.value.toLowerCase() === object.term.toLowerCase();
  })
 result === undefined ? isAbsentDefinition() : getSearchedDefinition(result);
}

function onInputFocus(event) {
  clearInput();
  showDefaultDefinition();
  listRef.innerHTML = '';
}

function getSearchedDefinition(obj) {
  termRef.textContent = obj.term;
  definitionRef.textContent = obj.meaning;
  clearInput();
}

function isAbsentDefinition() {
  termRef.textContent = inputRef.value;
  definitionRef.textContent = 'Нажаль, в словнику не знайдено такого терміну...'; 
}

function showDefaultDefinition() {
  termRef.textContent = 'Термін';
  definitionRef.textContent = 'Тлумачення';
}

function onLetterClick(event) {
  clearInput();
  listRef.replaceChildren();
  if (event.target.nodeName !== 'BUTTON') {
    return
  };
  const filteredArr = [];
  const activeEl = event.target;
  
  definitionRef.textContent = '';
  termRef.textContent = `"${event.target.textContent}"`;
  filterTermsByLetter(filteredArr, activeEl);
  const listItems = createSortedByAlphabetListItems(filteredArr);
  
  listRef.insertAdjacentHTML('afterbegin', listItems);
}

function onTermLinkClick(event) {
  event.preventDefault();
  if (event.target.nodeName !== 'A') {
    return
  };
  const foundObj = data.find(object => {
    return event.target.textContent.toLowerCase() === object.term.toLowerCase();
  })
  listRef.innerHTML = '';
  termRef.textContent = foundObj.term;
  definitionRef.textContent = foundObj.meaning;
}

function filterTermsByLetter(arr, elem) {
   data.filter(obj => {
    return elem.textContent === obj.term[0].toLocaleUpperCase();
   }).forEach(obj => arr.push(obj.term));
  return arr;
}

function createSortedByAlphabetListItems(arr) {
  const list = arr.sort((a, b) => {
    return a.localeCompare(b)
  }).map(elem => {
    return `<li class = "word-list-item"><a href="" class="word-list-link">${elem}</a></li>`
  }).join('');
  return list;
}

function clearInput() {
  inputRef.value = '';
}
