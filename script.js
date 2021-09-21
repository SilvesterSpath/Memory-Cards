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
const cardsData = [
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
];

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

// Show number of cards
function updateCurrentText() {
  currentEl.innerText = `${currentActiveCard + 1}/${cardsEl.length}`;
}

createCards(cardsData);

// Event listeners
nextBtn.addEventListener('click', () => {});
