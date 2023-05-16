//Зачения статусов и валюты
const CURRENCY = `\u{20BD}`;
const LIMIT_EXHAUSTED = "Исчерпан";
const LIMIT_EXCEEDED = "Превышен";
const NO_EXPENSES = "Трат нет";
const SET_LIMIT = "Не установлен";

//Кнопки
const btnNode = document.querySelector(".js-expenses-btn");
const editBtnNode = document.querySelector(".js-edit-btn");
const confirmBtnNode = document.querySelector(".js-confirm-btn");
const resetBtn = document.querySelector(".js-reset-btn");

//Формы
const editFormNode = document.querySelector(".js-edit-form");
const inputFormNode = document.querySelector(".js-add-form");

//Поля ввода
const inputNode = document.querySelector(".js-expenses-input");
const editInputNode = document.querySelector(".js-edit-input");

//Лимит, потрачено, остаток, долг
const moneySpentNode = document.querySelector(".js-money-spent");
const limitNode = document.querySelector(".js-expenses-limit");
const residualAmount = document.querySelector(".js-residual-amount");
const creditNode = document.querySelector(".js-credit-appearance");
const creditAmout = document.querySelector(".js-credit");

//История расходов
const logNode = document.querySelector(".js-expenses-log");

const expenses = [];
let limit;

init(expenses);

btnNode.addEventListener("click", function (e) {
  //Предотвращаем стандартное поведение браузера
  e.preventDefault();
  //Получаем значение из поля ввода
  getExpenseFromUser();

  const expense = parseInt(inputNode.value);
  //Очищаем поле ввода
  clearInput();

  //Записываем расход
  trackExpense(expense);

  //Скрываем поле ввода лимита, показываем поле ввода трат
  resetBtn.classList.add("expenses__btn-reset_active");
  btnNode.classList.add("expenses__btn_active");

  //Выведем новый список трат
  renderExpenses(expenses);

  moneySpentNode.innerText = calculateExpenses(expenses) + ` ${CURRENCY}`;

  if (sum < limit) {
    residualAmount.innerText = limit - sum + ` ${CURRENCY}`;
  } else if (sum == limit) {
    residualAmount.innerText = 0;
  } else if (sum >= limit) {
    residualAmount.innerText = 0;
    creditNode.classList.add("expenses__credit_active");
    creditAmout.innerText = sum - limit + ` ${CURRENCY}`;
  }
});

editBtnNode.addEventListener("click", edit);

confirmBtnNode.addEventListener("click", function (e) {
  //Получаем значение из поля ввода
  if (!editInputNode.value) {
    return;
  }

  newLimit();

  limitNode.innerText = limit + ` ${CURRENCY}`;
  residualAmount.innerText = limit + ` ${CURRENCY}`;
  inputFormNode.classList.add("expenses__form-add_active");
  editFormNode.classList.add("expenses__form-edit_inactive");
  e.preventDefault();
});

//Функции
function init(expenses) {
  limitNode.innerText = SET_LIMIT;
  logNode.innerText = NO_EXPENSES;
  moneySpentNode.innerText = calculateExpenses(expenses) + ` ${CURRENCY}`;
}

function trackExpense() {
  expenses.push();
}

function clearInput() {
  inputNode.value = "";
}

//Считаем расходы
function calculateExpenses(expenses) {
  let sum = 0;

  expenses.forEach((element) => {
    sum += element;
  });

  return sum;
}

//Получаем новый лимит
function newLimit() {
  limit = parseInt(editInputNode.value);
  editInputNode.value = "";

  // residualAmount.innerText = limit - sum + ` ${CURRENCY}`;
}

function edit() {
  inputFormNode.classList.toggle("expenses__form-add_active");
  editFormNode.classList.toggle("expenses__form-edit_inactive");
}

//Выводим список трат
function renderExpenses(expenses) {
  let expensesListHTML = "";

  expenses.forEach((element) => {
    expensesListHTML += `<li>${element} ${CURRENCY}</li>`;
    logNode.innerHTML = `<ol class="expenses__list">${expensesListHTML}</ol>`;
  });
}
