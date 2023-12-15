'use strict';
// выбираем элементы
const score0Element = document.getElementById('score--0');
const score1Element = document.getElementById('score--1');
const current0Element = document.getElementById('current--0');
const current1Element = document.getElementById('current--1');

const player0Element = document.querySelector('.player--0');
const player1Element = document.querySelector('.player--1');
const diceElement = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

// стартовые значения
let currentScore, activePlayer, playing, scores;
// New game
const newGame = function () {
	// переназначает значения которые объявлены глобально
	scores = [0, 0];
	currentScore = 0;
	activePlayer = 0;
	playing = true;

	current0Element.textContent = 0;
	current1Element.textContent = 0;
	score0Element.textContent = 0;
	score1Element.textContent = 0;

	diceElement.classList.add('hidden');
	player0Element.classList.remove('player--winner');
	player1Element.classList.remove('player--winner');
	player0Element.classList.add('player--active');
	player1Element.classList.remove('player--active');
};
// вызываеи функцию чтобы значения переназначились и обнулились
newGame();

const switchPlayer = function () {
	document.getElementById(`current--${activePlayer}`).textContent = 0;
	currentScore = 0;
	activePlayer = activePlayer === 0 ? 1 : 0;
	player0Element.classList.toggle('player--active');
	player1Element.classList.toggle('player--active');
};
// бросок кости
btnRoll.addEventListener('click', function () {
	if (playing) {
		// 1. генерация случайного броска игральной кости
		const dice = Math.trunc(Math.random() * 6) + 1; // +1 для того чтобы генерация была жо 6 включительно
		// 2. отображение кости
		diceElement.classList.remove('hidden');
		diceElement.src = `dice-${dice}.png`;
		// 3. сравнение выпавшей кости с единицей: если правда -> переключить игрока
		if (dice !== 1) {
			//добавить кость к значению
			currentScore += dice;
			document.getElementById(`current--${activePlayer}`).textContent = currentScore;
		} else {
			// переключение игрока если dice === 1
			switchPlayer();
		}
	}
});

btnHold.addEventListener('click', function () {
	if (playing) {
		// 1. добавить текущий счет к счету активного игрока
		scores[activePlayer] += currentScore;
		document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];
		// 2. проверка счета: пока счет игрока <100 && !==100 игра продолжается
		//  окончание игры
		if (scores[activePlayer] >= 100) {
			// Окончание игры
			playing = false;
			document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
			document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
			diceElement.classList.add('hidden');
		} else {
			// 3. переключение игрока
			switchPlayer();
		}
	}
});

// новая игра
btnNew.addEventListener('click', newGame);
