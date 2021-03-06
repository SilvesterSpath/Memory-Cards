const cardsContainer = document.getElementById('cards-container');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const currentEl = document.getElementById('current');
const showBtn = document.getElementById('show');
const hideBtn = document.getElementById('hide');
const questionEl = document.getElementById('question');
const answerEl = document.getElementById('answer');
const addCardBtn = document.getElementById('add-card');
const clearBtn = document.getElementById('clear');
const addContainer = document.getElementById('add-container');

// Keep track of current card
let currentActiveCard = 0;

// Store DOM cards
const cardsEl = [];

// Store card data
const cardsData = getCardsData();
/* const cardsData = [
  {
    question: 'What must a variable begin with?',
    answer: 'A letter, $ or _',
  },
  {
    question: 'What is a variable?',
    answer: 'Container for a piece of data',
  },
  {
    question: 'Example of Case Sensitive Variable?',
    answer: 'thisIsAVariable',
  },
]; */

// Create cards
function createCards(array) {
  array.forEach((i, j) => {
    const card = document.createElement('div');
    card.classList.add('card');

    if (j === 0) {
      card.classList.add('active');
    }

    card.innerHTML = `
    <div class="inner-card">
      <div class="inner-card-front">
        <p>
          ${i.question}
        </p>
      </div>
      <div class="inner-card-back">
        <p>
          ${i.answer}
        </p>
      </div>
    </div>
  `;

    card.addEventListener('click', () => card.classList.toggle('show-answer'));

    // Add to DOM cards
    cardsEl.push(card);
    cardsContainer.appendChild(card);

    updateCurrentText();
  });
}

// Create card
function createCard(question, answer) {
  const card = document.createElement('div');
  card.classList.add('card');
  card.innerHTML = `
    <div class="inner-card">
      <div class="inner-card-front">
        <p>
          ${question}
        </p>
      </div>
      <div class="inner-card-back">
        <p>
          ${answer}
        </p>
      </div>
    </div>
  `;
  cardsEl.push(card);
}

// Show number of cards
function updateCurrentText() {
  currentEl.innerText = `${currentActiveCard + 1}/${cardsEl.length}`;
}

// Get cards from localStorage
function getCardsData() {
  const cards = JSON.parse(localStorage.getItem('cards'));
  return cards === null ? [] : cards;
}

// Add cards into localStorage
function setCardsData(dataArray) {
  localStorage.setItem('cards', JSON.stringify(dataArray));
  window.location.reload();
}

createCards(cardsData);

// Event listeners
nextBtn.addEventListener('click', () => {
  cardsEl[currentActiveCard].className = 'card left';
  currentActiveCard++;
  if (currentActiveCard > cardsEl.length - 1) {
    currentActiveCard = cardsEl.length - 1;
  }

  cardsEl[currentActiveCard].className = 'card active';
  updateCurrentText();
});

prevBtn.addEventListener('click', () => {
  cardsEl[currentActiveCard].className = 'card right';
  currentActiveCard--;
  if (currentActiveCard <= 0) {
    currentActiveCard = 0;
  }

  cardsEl[currentActiveCard].className = 'card active';
  updateCurrentText();
});

clearBtn.addEventListener('click', () => {
  console.log('clear');
  localStorage.clear();
  window.location.reload();
});

// Show/hide add-container

showBtn.addEventListener('click', () => {
  addContainer.classList.add('show');
});

hideBtn.addEventListener('click', () => {
  addContainer.classList.remove('show');
});

// Add new card to cardsEl array
addCardBtn.addEventListener('click', () => {
  const question = questionEl.value;
  const answer = answerEl.value;

  if (question.trim() && answer.trim()) {
    const newCard = { question: question, answer: answer };
    createCard(question, answer);

    questionEl.value = '';
    answerEl.value = '';

    addContainer.classList.remove('show');
    cardsData.push(newCard);
    setCardsData(cardsData);
  }
});
