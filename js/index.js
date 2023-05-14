//Зачения статусов и валюты
const CURRENCY = `\u{20BD}`;
const LIMIT_EXHAUSTED = "Исчерпан";
const LIMIT_EXCEEDED = "Превышен";
const NO_EXPENSES = "Трат нет";

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

function init() {
  logNode.innerText = NO_EXPENSES;
  moneySpentNode.innerText = 0 + ` ${CURRENCY}`;
}

init();

function edit() {
  inputFormNode.classList.toggle("expenses__form-add_active");
  editFormNode.classList.toggle("expenses__form-edit_inactive");
}

editBtnNode.addEventListener("click", edit);

btnNode.addEventListener("click", function (e) {
  if (!inputNode.value) {
    return;
  }

  e.preventDefault();
  const expense = parseInt(inputNode.value);
  inputNode.value = "";

  resetBtn.classList.add("expenses__btn-reset_active");
  btnNode.classList.add("expenses__btn_active");

  expenses.push(expense);

  let expensesListHTML = "";

  expenses.forEach((element) => {
    expensesListHTML += `<li>${element} ${CURRENCY}</li>`;
  });

  logNode.innerHTML = `<ol class="expenses__list">${expensesListHTML}</ol>`;

  //Вынести sum
  let sum = 0;
  expenses.forEach((element) => {
    sum += element;

    moneySpentNode.innerText = sum + ` ${CURRENCY}`;
  });

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

function newLimit() {
  limit = parseInt(editInputNode.value);
  editInputNode.value = "";

  residualAmount.innerText = limit - sum + ` ${CURRENCY}`;
}

confirmBtnNode.addEventListener("click", function (e) {
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

// function reset() {
//   resetBtn.classList.remove("expenses__btn-reset_active");
//   btnNode.classList.remove("expenses__btn_active");
//   creditNode.classList.remove("expenses__credit_active");
//   expenses.length = 0;
//   logNode.innerText = NO_EXPENSES;
//   // limitNode.innerText = LIMIT + ` ${CURRENCY}`;
//   totalNode.innerText = 0 + ` ${CURRENCY}`;
//   // residualAmount.innerText = LIMIT + ` ${CURRENCY}`;
//   creditAmout.innerText = "";
// }

// resetBtn.addEventListener("click", reset);
