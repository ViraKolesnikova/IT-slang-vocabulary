import data from './data.js';
import refs from './refs.js';
import tests from './tests.js';
// console.log(tests);
// console.log(data);
// console.log(refs);


const { inputRef,
  searchBtnRef,
  alphabetListRef,
  termRef,
  definitionRef,
  listRef,
  headerRef,
  mainRef,
  themeSwitcherRef,
  bodyRef,
  burgerBoxRef,
checkboxRef} = refs;

// EVENTS
searchBtnRef.addEventListener('click', onInputSearch);
inputRef.addEventListener('focus', onInputFocus);
alphabetListRef.addEventListener('click', onLetterClick);
alphabetListRef.addEventListener('touchend', onLetterClick);
listRef.addEventListener('click', onTermLinkClick);
themeSwitcherRef.addEventListener('change', onThemeSwitcherChange);
burgerBoxRef.addEventListener('click', onBurgerMenuClick);

changeMainPositionToHeader();
loadSavedTheme();

// INPUT FUNCTIONS
function onInputSearch(event) {
  event.preventDefault();
  listRef.innerHTML = '';
  const result = data.find(object => {
    return inputRef.value.toLowerCase().trim() === object.term.toLowerCase();
  })
  result === undefined ? isAbsentDefinition() : getSearchedDefinition(result);
  scrollToWordDiscription(listRef);
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
  termRef.textContent = inputRef.value.trim();
  definitionRef.textContent = 'Нажаль, в словнику не знайдено такого терміну...'; 
}

function showDefaultDefinition() {
  termRef.textContent = 'Термін';
  definitionRef.textContent = 'Тлумачення';
}

function clearInput() {
  inputRef.value = '';
}


// ALPHABET FUNCTIONS
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
  scrollToWordDiscription(listRef);
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


// ====================
function changeMainPositionToHeader() {
  mainRef.style.paddingTop = headerRef.offsetHeight + 'px';
  // console.log(mainRef.style.marginTop);
}

// TOGGLE SWITCH
function onThemeSwitcherChange(event) {
  bodyRef.classList.contains('dark-theme') ? changeToLightTheme() : changeToDarkTheme()
}

function changeToDarkTheme() {
  bodyRef.classList.add('dark-theme');
  themeSwitcherRef.checked = true;
  localStorage.setItem('theme', 'dark');
}

function changeToLightTheme() {
  bodyRef.classList.remove('dark-theme');
  themeSwitcherRef.checked = false;
  localStorage.removeItem('theme');
}

// SAVE THEME
function loadSavedTheme() {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    return changeToDarkTheme();
  }
}

// HAMBURGER MENU
function onBurgerMenuClick(event) {
  checkboxRef.checked = false;
}

// SCROLL
function scrollToWordDiscription(place) {
  setTimeout(() => {
      place.scrollIntoView({
        behavior: 'smooth',
        block: 'end',
      });
    }, 500);    
}