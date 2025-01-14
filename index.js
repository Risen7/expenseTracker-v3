const transactionsBud = JSON.parse(localStorage.getItem("transactionsBud")) || [];

const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'PHP',
    signDisplay: "always",
});
  
const list = document.getElementById("transactionList");
const form = document.getElementById("transactionForm");
const status = document.getElementById("status");
const balance = document.getElementById("balance");
const income = document.getElementById("income");
const expense = document.getElementById("expense");
const expTransactions = document.getElementById("transaction");
const header = document.getElementById("header");
const expList = document.getElementById("expenseList");
const expStatus = document.getElementById("expStatus");
const saveBud = document.getElementById("save");
const title = document.getElementById("title");
const actRemove = document.getElementById("actRemove");
const titleInput = document.getElementById("titleInput");
const liact = document.querySelectorAll('li');

const budget = document.getElementById("budget");  //---------------Total Budget Number Display--------------->
const budgetSavings = document.getElementById("budgetSavings"); //--Select Option Input----------------------->
const amount2 = document.getElementById("amount-2"); //-------------Input Text Amount------------------------->
const onHand = document.getElementById("onHand");  //---------------On Hand Number Display-------------------->
const onBank = document.getElementById("onBank");  //---------------On Bank Number Display-------------------->
const kfc = document.getElementById("kfc");  //---------------------KFC Number Display------------------------>
const inviMoney = document.getElementById("inviMoney");  //---------Invisible Money Number Display------------>
var onHandVal = 0;
var onBankVal = 0;

form.addEventListener('submit', addTransaction);

function updateTotal() {
    const incomeTotal = transactionsBud
        .filter((trx) => trx.type === "income")
        .reduce((total, trx) => total + trx.amount, 0);
    const expenseTotal = transactionsBud
        .filter((trx) => trx.type === "expense")
        .reduce((total, trx) => total + trx.amount, 0);

    const  balanceTotal = incomeTotal - expenseTotal;

    balance.textContent = formatter.format(balanceTotal).substring(1);
    income.textContent = formatter.format(incomeTotal);
    expense.textContent = formatter.format(expenseTotal * -1);

}

function renderList() {
    list.innerHTML = "";

    status.textContent = "";
    if(transactionsBud.length === 0) {
        status.textContent = "No transactions";
        return;
    }

    transactionsBud.forEach(({ id, name, amount, date, type }) => {
        const sign = 'income' === type ? 1 : -1;

        const li = document.createElement('li');

        li.innerHTML = `
            <div class="name">
                <h4>${name}</h4>
                <p>${new Date(date).toLocaleDateString()}</p>
            </div>

            <div class="amount ${type}">
                <span>${formatter.format(amount * sign)}</span>
            </div>
        
            <div class="action" id="actRemove">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" onclick="deleteTransaction(${id})">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
         </div>
        `;
        list.appendChild(li);
    });
}

renderList(); 
renderExp();
renderBudget();
updateTotal();

function deleteTransaction(id) {
    const index = transactionsBud.findIndex((trx) => trx.id === id)
    transactionsBud.splice(index, 1);

    updateTotal();
    saveTransactions(); 
    renderList();
}

function addTransaction(e) {
    e.preventDefault();
    const formData = new FormData(this);
    transactionsBud.push({
        id: transactionsBud.length + 1,
        name: formData.get("name"),
        amount: parseFloat(formData.get("amount")),
        date: new Date(formData.get("date")),
        type: "on" === formData.get("type") ? "income" : "expense",
    });

    this.reset();
    updateTotal();  
    saveTransactions();
    renderList();
};

function addBudget() {
    if(budgetSavings.value == "onHand"){ 
        onHandVal = parseInt(amount2.value);
        onHand.innerHTML = formatter.format(parseInt(amount2.value)).substring(1); 
        if(onBankVal == null) {
            onBankVal = parseInt(0);
        }
        saveBudget();
    }

    if(budgetSavings.value == "onBank") {  
        console.log("1 onHand = ", onBank);
        console.log("1 onBank = ", onHand);
        onBankVal = parseInt(amount2.value);
        console.log("2 onHand = ", onBank);
        console.log("2 onBank = ", onHand);
        onBank.innerHTML = formatter.format(parseInt(amount2.value)).substring(1); 
        console.log("3 onHand = ", onBank);
        console.log("3 onBank = ", onHand);
        if(onHandVal == null) {
            onHandVal = parseInt(0);
        }
        saveBudget();
        console.log("4 onHand = ", onBank);
        console.log("4 onBank = ", onHand);
    }

    if(budgetSavings.value == "kfc") {
        kfc.innerHTML = formatter.format(parseInt(amount2.value)).substring(1);
        console.log("5 onHand = ", onBank);
        console.log("5 onBank = ", onHand);
        saveBudget();
    }
    if(budgetSavings.value == "inviMoney") {
        inviMoney.innerHTML = formatter.format(parseInt(amount2.value)).substring(1);
        console.log("5 onHand = ", onBank);
        console.log("5 onBank = ", onHand);
        saveBudget();
    }
    renderBudget();
        console.log("6 onHand = ", onBank);
        console.log("6 onBank = ", onHand);
    if(onHandVal == undefined ) {
        console.log("7 onHand = ", onBank);
        console.log("7 onBank = ", onHand);
        onHandVal = parseInt(0);
        console.log("8 onHand = ", onBank);
        console.log("8 onBank = ", onHand);
    } else {
        console.log("9 onHand = ", onBank);
        console.log("9 onBank = ", onHand);
    }
    if(onBankVal == undefined ) {
        onBankVal = parseInt(0);
        console.log("10 onHand = ", onBank);
        console.log("10 onBank = ", onHand);
    } else {
        console.log("11 onHand = ", onBank);
        console.log("11 onBank = ", onHand);
    }
    console.log("12 onHand = ", onBank);
    console.log("12 onBank = ", onHand);
    console.log("?  |onHandVal - ", onHandVal, "| onBankVal - " + onBankVal, "|" , onHandVal + onBankVal);
    budget.innerHTML = formatter.format(parseInt(onHandVal) + parseInt(onBankVal)).substring(1);
    console.log("13 onHand = ", onBank);
    console.log("13 onBank = ", onHand);
    saveBudget();
}

function addHistory() {
    let text = "It will clear the transaction data and move to history. Are you sure you want to save?"
    if(confirm(text) == true) {
        const li = document.createElement('history') 
        const titleIn = document.createElement('h1')  
        titleIn.innerHTML = titleInput.value; 
        li.appendChild(titleIn);
        li.innerHTML = `<div id="titleDiv">
        <h1>${titleInput.value}</h1><span id="drop"></span></div>
        ${saveBud.innerHTML}`;
        expList.appendChild(li);
        titleInput.value = "";
        saveH();
        saveHistory();
        removeExp();
        alert("Data moved to History");
    } else {
        alert("Data not moved.")
    }
}

function renderExp() {
   expList.innerHTML = localStorage.getItem("saveHistBud");
}

function renderBudget() {
    let budgetOne = localStorage.getItem("budgetSav");
    onHandVal = localStorage.getItem("onHandVal");
    onBankVal = localStorage.getItem("onBankVal");
    let kfcOne = localStorage.getItem("kfcSav");
    let inviOne = localStorage.getItem("inviSav");
    budget.innerHTML = budgetOne  //.substring(1);
    
    onHand.innerHTML = formatter.format(onHandVal).substring(1);
    onBank.innerHTML = formatter.format(onBankVal).substring(1);
    kfc.innerHTML = kfcOne;
    inviMoney.innerHTML = inviOne;
    if(budget.innerHTML == ""){
        budget.innerHTML = formatter.format(0).substring(1);
    } 
    if (onHand.innerHTML == "") {
        onHand.innerHTML = formatter.format(0).substring(1);
    }
    if (onBank.innerHTML == "") {
        onBank.innerHTML = formatter.format(0).substring(1);
    }
    if (kfc.innerHTML == "") {
        kfc.innerHTML = formatter.format(0).substring(1);
    }
    if (inviMoney.innerHTML == "") {
        inviMoney.innerHTML = formatter.format(0).substring(1);
    }
    // console.log(onHandVal);
    // console.log(onBankVal);
    console.log("0 - onhand", onHand);
    console.log("0 - onbank", onBank);
}

function removeExp() {
    transactionsBud.splice(0,transactionsBud.length);
    updateTotal();
    saveTransactions();
    renderList();
}

function saveTransactions() {
    transactionsBud.sort((a,b) => new Date(b.date) - new Date(a.date));
    localStorage.setItem("transactionsBud", JSON.stringify(transactionsBud));
}

function saveHistory() {
    localStorage.setItem("saveBud", saveBud.innerHTML);
}

function saveH() {
    localStorage.setItem("saveHistBud", expList.innerHTML);
}

function saveBudget() {
    localStorage.setItem("onHandVal", onHandVal);
    localStorage.setItem("onBankVal", onBankVal);
    localStorage.setItem("budgetSav", budget.innerHTML);
    localStorage.setItem("kfcSav", kfc.innerHTML);
    localStorage.setItem("inviSav", inviMoney.innerHTML);
}

expList.addEventListener("click", function(e) {
    if(e.target.tagName === "H1" || "SPAN") {
        e.target.parentElement.parentElement.children[0].classList.toggle("active");
        e.target.parentElement.parentElement.children[1].classList.toggle("active");
        e.target.parentElement.parentElement.children[2].classList.toggle("active");
        saveH();
        saveHistory();
    }
})
