const LIMIT = 10000;
const CURRENCY = `\u{20BD}`;
const LIMIT_EXHAUSTED = "Исчерпан";
const LIMIT_EXCEEDED = "Превышен";
const NO_EXPENSES = "Трат нет";

const inputFormNode = document.querySelector(".js-add-form");
const editFormNode = document.querySelector(".js-edit-form");
const inputNode = document.querySelector(".js-expenses-input");
const btnNode = document.querySelector(".js-expenses-btn");
const logNode = document.querySelector(".js-expenses-log");
const totalNode = document.querySelector(".js-total");
const limitNode = document.querySelector(".js-expenses-limit");
const residualAmount = document.querySelector(".js-residual-amount");
const creditNode = document.querySelector(".js-credit-appearance");
const creditAmout = document.querySelector(".js-credit");
const resetBtn = document.querySelector(".js-reset-btn");

const editInputNode = document.querySelector(".js-edit-input");
const editBtnNode = document.querySelector(".js-edit-btn");
const confirmBtnNode = document.querySelector(".js-confirm-btn");

const expenses = [];

function edit() {
  inputFormNode.classList.toggle("expenses__form-add_active");
  editFormNode.classList.toggle("expenses__form-edit_active");
}

function init() {
  limitNode.innerText = LIMIT + ` ${CURRENCY}`;
  residualAmount.innerText = LIMIT + ` ${CURRENCY}`;
  logNode.innerText = NO_EXPENSES;
  totalNode.innerText = 0 + ` ${CURRENCY}`;
}

editBtnNode.addEventListener("click", edit);

init();

btnNode.addEventListener("click", function (e) {
  if (!inputNode.value) {
    return;
  }

  e.preventDefault();
  const limit = parseInt;
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

  let sum = 0;
  expenses.forEach((element) => {
    sum += element;

    totalNode.innerText = sum + ` ${CURRENCY}`;
  });

  if (sum < LIMIT) {
    residualAmount.innerText = LIMIT - sum + ` ${CURRENCY}`;
  } else if (sum == LIMIT) {
    limitNode.innerText = LIMIT_EXHAUSTED;
    residualAmount.innerText = 0;
  } else if (sum >= LIMIT) {
    limitNode.innerText = LIMIT_EXCEEDED;
    residualAmount.innerText = 0;
    creditNode.classList.add("expenses__credit_active");
    creditAmout.innerText = sum - LIMIT + ` ${CURRENCY}`;
  }
});

function reset() {
  resetBtn.classList.remove("expenses__btn-reset_active");
  btnNode.classList.remove("expenses__btn_active");
  creditNode.classList.remove("expenses__credit_active");
  expenses.length = 0;
  logNode.innerText = NO_EXPENSES;
  limitNode.innerText = LIMIT + ` ${CURRENCY}`;
  totalNode.innerText = 0 + ` ${CURRENCY}`;
  residualAmount.innerText = LIMIT + ` ${CURRENCY}`;
  creditAmout.innerText = "";
}

resetBtn.addEventListener("click", reset);
