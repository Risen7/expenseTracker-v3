const transactionss = JSON.parse(localStorage.getItem("transactionss")) || [];

const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'PHP',
    // signDisplay: "always",
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
const save = document.getElementById("save");
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

form.addEventListener('submit', addTransaction);

function updateTotal() {
    const incomeTotal = transactionss
        .filter((trx) => trx.type === "income")
        .reduce((total, trx) => total + trx.amount, 0);
    const expenseTotal = transactionss
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
    if(transactionss.length === 0) {
        status.textContent = "No transactions";
        return;
    }

    transactionss.forEach(({ id, name, amount, date, type }) => {
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
updateTotal();

function deleteTransaction(id) {
    const index = transactionss.findIndex((trx) => trx.id === id)
    transactionss.splice(index, 1);

    updateTotal();
    saveTransactions(); 
    renderList();
}

function addTransaction(e) {
    e.preventDefault();
    const formData = new FormData(this);
    transactionss.push({
        id: transactionss.length + 1,
        name: formData.get("name"),
        amount: parseFloat(formData.get("amount")),
        date: new Date(formData.get("date")),
        type: "on" === formData.get("type") ? "income" : "expense",
    });

    this.reset();
    updateTotal();  
    saveTransactions();
    renderList();
}

// function addBudget() {
//     if(budgetSavings.value == "onHand"){
//         var onHandVal = parseInt(amount2.value); 
//         onHand.innerHTML = formatter.format(parseInt(amount2.value)); 
//         if(onBankVal == null) {
//             onBankVal = 0;
//         }
//         console.log("onHand-",onHandVal);
//     } else if(budgetSavings.value == "onBank") {  
//         var onBankVal =  parseInt(amount2.value); 
//         onBank.innerHTML = formatter.format(parseInt(amount2.value)); 
//         if(onHandVal == null) {
//             onHandVal = 0;
//         }
//         console.log("onBank", onBankVal);
//     } else if(budgetSavings.value == "kfc") {
//         kfc.innerHTML = formatter.format(parseInt(amount2.value) + 0);
//     } else if(budgetSavings.value == "inviMoney") {
//         inviMoney.innerHTML = formatter.format(parseInt(amount2.value) + 0);
//     }
//     console.log("after if onHand-",onHandVal);
//     console.log("after if onBank-",onBankVal);
//     budget.innerHTML = formatter.format(onHandVal + onBankVal);
// }

function addBudget() {
    if(budgetSavings.value == "onHand"){
        var onHandVal = parseInt(amount2.value); 
        onHand.innerHTML = (parseInt(amount2.value)); 
        if(onBankVal == null) {
            onBankVal = 0;
        }
        console.log("onHand-",onHandVal);
    } else if(budgetSavings.value == "onBank") {  
        var onBankVal =  parseInt(amount2.value); 
        onBank.innerHTML = (parseInt(amount2.value)); 
        if(onHandVal == null) {
            onHandVal = 0;
        }
        console.log("onBank", onBankVal);
    } else if(budgetSavings.value == "kfc") {
        kfc.innerHTML = formatter.format(parseInt(amount2.value) + 0);
    } else if(budgetSavings.value == "inviMoney") {
        inviMoney.innerHTML = formatter.format(parseInt(amount2.value) + 0);
    }
    console.log("after if onHand-",onHandVal);
    console.log("after if onBank-",onBankVal);

    budget.innerHTML = parseInt(onHand.innerHTML) + parseInt(onBank.innerHTML);
}

function addHistory() {
    const li = document.createElement('history') 
    const titleIn = document.createElement('h1')  
    titleIn.innerHTML = titleInput.value; 
    li.appendChild(titleIn);
    li.innerHTML = `<div id="titleDiv">
    <h1>${titleInput.value}</h1><span id="drop"></span></div>
    ${save.innerHTML}`;
    expList.appendChild(li);
    titleInput.value = "";
    saveH();
    saveHistory();
    removeExp();
}

function renderExp() {
   expList.innerHTML = localStorage.getItem("saveHist");
}

function renderBudget() {
    saveBud2.innerHTML = localStorage.getItem("saveBud");
}

function removeExp() {
    transactionss.splice(0,transactionss.length);
    updateTotal();
    saveTransactions();
    renderList();
}

function saveTransactions() {
    transactionss.sort((a,b) => new Date(b.date) - new Date(a.date));
    localStorage.setItem("transactionss", JSON.stringify(transactionss));
}

function saveHistory() {
    localStorage.setItem("save", save.innerHTML);
}

function saveH() {
    localStorage.setItem("saveHist", expList.innerHTML);
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
