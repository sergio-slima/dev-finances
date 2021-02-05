const Modal= {
    open(){
        //Abrir Modal
        document
            .querySelector('.modal-overlay')
            .classList.add('active')
    },
    close(){
        //Fechar Modal
        document
            .querySelector('.modal-overlay')
            .classList.remove('active')
    }
} 

const transactions = [
    {
        description: 'Luz',
        amount: -50000,
        date: '23/03/2014'
    },
    {
        description: 'Website',
        amount: 500000,
        date: '12/03/2014'
    },
    {
        description: 'Internet',
        amount: -20000,
        date: '02/05/2014'
    }
]

const Transaction = {
    all: transactions,

    add(transaction){
        Transaction.all.push(transaction)

        App.reload()
    },

    remove(index) {
        Transaction.all.splice(index, 1)

        App.reload()
    },

    incomes() {
        // variavel
        let income = 0;
        // pegar todas as transacoes
        // para cada transacao
        Transaction.all.forEach(transaction => {
            // se ela for maior que zero
            if (transaction.amount > 0) {
                // somar a variavel
                income += transaction.amount;
            }
        })
        return income;
    },

    expenses() {        
        let expense = 0;
        Transaction.all.forEach(transaction => {
            if (transaction.amount < 0) {
                expense += transaction.amount;
            }
        })
        return expense;
    },

    total() {
        return Transaction.incomes() + Transaction.expenses();
    }
}

const DOM = {
    transactionsContainer: document.querySelector('#data-table tbody'),

    addTransaction(transaction, index) {
        const tr = document.createElement('tr')
        tr.innerHTML = DOM.innerHTMLTransaction(transaction)

        DOM.transactionsContainer.appendChild(tr)
    },

    innerHTMLTransaction(transaction) {
        const CSSclass = transaction.amount > 0 ? "income" : "expense"

        const amount = Utils.formatCurrency(transaction.amount)

        const html = `
        <tr>
            <td class="description">${transaction.description}</td>
            <td class="${CSSclass}">${amount}</td>
            <td class="date">${transaction.date}</td>
            <td>
                <img src="./assets/minus.svg" alt="Remover Transação">
            </td>
        </tr>
        `
        return html
    },

    updateBalance() {
        document.getElementById('incomeDisplay').innerHTML = Utils.formatCurrency(Transaction.incomes())
        document.getElementById('expenseDisplay').innerHTML = Utils.formatCurrency(Transaction.expenses())
        document.getElementById('totalDisplay').innerHTML = Utils.formatCurrency(Transaction.total())
    },

    clearTransactions() {
        DOM.transactionsContainer.innerHTML = ""
    }
}

const Utils = {
    formatCurrency(value) {
        // const signal = Number(value) < 0 ? "-" : ""

        // value = String(value).replace(/\,?\.?/g, "")
        // value = Number(value) / 100
        // value = value.toLocaleString("pt-BR", {
        //     style: "currency",
        //     currency: "BRL"
        // })
        // return signal + value
        value = value * 100
        return Math.round(value)
    }
}

const App = {
    init() {
        Transaction.all.forEach(transaction => {
            DOM.addTransaction(transaction)
        })
        
        DOM.updateBalance()        
    },
    reload() {
        DOM.clearTransactions()
        App.ini()
    },
}

App.init()


