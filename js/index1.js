//Зачения статусов и валюты
const CURRENCY = `\u{20BD}`;
const LIMIT_EXHAUSTED = "Исчерпан";
const LIMIT_EXCEEDED = "Превышен";
const NO_EXPENSES = "Трат нет";
const SET_LIMIT = "-";

//Кнопки
const addBtnNode = document.querySelector(".js-expenses-btn");
const editBtnNode = document.querySelector(".js-edit-btn");
const confirmBtnNode = document.querySelector(".js-confirm-btn");
const resetBtn = document.querySelector(".js-reset-btn");

//Формы
const editFormNode = document.querySelector(".js-edit-form");
const inputFormNode = document.querySelector(".js-add-form");

//Поля ввода
const inputNode = document.querySelector(".js-expenses-input");
const limitInputNode = document.querySelector(".js-edit-input");

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

//-----------------Кнопки-----------------

//Кнопка подтверждения лимита
confirmBtnNode.addEventListener("click", function (e) {
  e.preventDefault();
  getLimitValue();
  clearLimitInput();
  renderLimit();
  changeInput();
  activateResetBtn();
  residualAmount.innerText =
    limit - calculateExpenses(expenses) + ` ${CURRENCY}`;
});

//Кнопка добавления трат
addBtnNode.addEventListener("click", function (e) {
  e.preventDefault();
  const expense = getExpenseFromUser();

  if (!expense) {
    return;
  }

  trackExpense(expense);

  activateResetBtn();

  render(expenses);
});

//Кнопка сброса
resetBtn.addEventListener("click", reset);

//Кнопка редактирования
editBtnNode.addEventListener("click", edit);

//-----------------Функции-----------------

//Отображение статусов при загрузке страницы
function init() {
  logNode.innerText = NO_EXPENSES;
  limitNode.innerText = SET_LIMIT;
  moneySpentNode.innerText = 0 + ` ${CURRENCY}`;
}

//Получаем значение из поля ввода лимита
function getLimitValue() {
  if (!limitInputNode.value) {
    return;
  }
  limit = parseInt(limitInputNode.value);
  clearLimitInput();
}

//Очищаем поле ввода лимита
function clearLimitInput() {
  limitInputNode.value = "";
}

//Очищаем поле ввода трат
function clearExpenseInput() {
  inputNode.value = "";
}

//Записываем значение лимита в лимит
function renderLimit() {
  limitNode.innerText = limit + ` ${CURRENCY}`;
}

//Переключаемся на поле ввода затрат
function changeInput() {
  inputFormNode.classList.toggle("expenses__form-add_active");
  editFormNode.classList.toggle("expenses__form-edit_inactive");
}

//Получаем значение траты от пользователя
function getExpenseFromUser() {
  if (!inputNode.value) {
    return;
  }

  const expense = parseInt(inputNode.value);
  clearExpenseInput();

  return expense;
}

//Записываем полученное значение траты от пользователя в массив с тратами
function trackExpense(expense) {
  expenses.push(expense);
}

//Выводим полученное значение траты в список истории трат
function renderExpenses(expenses) {
  let expensesListHTML = "";

  expenses.forEach((element) => {
    expensesListHTML += `<li>${element} ${CURRENCY}</li>`;
    logNode.innerHTML = `<ol class="expenses__list">${expensesListHTML}</ol>`;
  });
}

//Активируем кнопку сброса после добавления первой траты
function activateResetBtn() {
  resetBtn.classList.add("expenses__btn-reset_active");
  addBtnNode.classList.add("expenses__btn_active");
}

//Считаем траты
function calculateExpenses(expenses) {
  let sum = 0;

  expenses.forEach((element) => {
    sum += element;
  });
  return sum;
}

//Отрисовываем затраты, статус и историю
function render(expenses) {
  const sum = calculateExpenses(expenses);

  renderExpenses(expenses);
  renderStatus(sum);
  renderSum(sum);
}

//Отображаем статус
function renderStatus(sum) {
  if (sum < limit) {
    residualAmount.innerText = limit - sum + ` ${CURRENCY}`;
  } else if (sum == limit) {
    residualAmount.innerText = 0;
  } else {
    residualAmount.innerText = 0;
    creditNode.classList.add("expenses__credit_active");
    creditAmout.innerText = sum - limit + ` ${CURRENCY}`;
  }
}

function renderSum(sum) {
  moneySpentNode.innerText = sum + ` ${CURRENCY}`;
}

//Редактируем лимит
function edit() {
  inputFormNode.classList.remove("expenses__form-add_active");
  editFormNode.classList.remove("expenses__form-edit_inactive");
}

//Сбрасываем значения
function reset() {
  resetBtn.classList.remove("expenses__btn-reset_active");
  addBtnNode.classList.remove("expenses__btn_active");
  creditNode.classList.remove("expenses__credit_active");
  expenses.value = [];
  logNode.innerHTML = NO_EXPENSES;
  moneySpentNode.value = 0;
  moneySpentNode.innerText = 0;
  sum.value = 0;
  residualAmount.innerText = limit;
  creditAmout.innerText = "";
}
