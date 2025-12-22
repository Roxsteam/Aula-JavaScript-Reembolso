// seleciona os elementos do formulário. 

const form = document.querySelector("form")
const amount = document.getElementById("amount")
const expense = document.getElementById("expense")
const category = document.getElementById("category")

// seleciona os elementos da lista
const expenseList = document.querySelector("ul")
const expenseTotal = document.querySelector("aside header h2")

// pode-se usar o querySelector para navegar por dentro dos elementos, chegando no desejado
const expensesQuantity = document.querySelector("aside header p span")


// pode usar o amount.oninput (mesmo função do addEventListener)

// captura o evento de input para formatar o valor
amount.oninput = () => {
// obtém o valor atual do input e remove os caracteres não númericos
    let value = amount.value.replace(/\D/g, "")
    
    // transforma o valor em centavos (exemplo: 150/100 = 1.5 que é equivalente a R$ 1,50)
    value = Number(value) / 100

    // aualiza o valor do input
       amount.value = formatCurrencyBRL(value)
    }
// formato o valor no padrão BRL (Real Brasileiro)
function formatCurrencyBRL(value) {
value = value.toLocaleString("pt-BR", {
style: "currency",
currency: "BRL",
})
// Retorna o valor formatado
return value
    }

// captura do evento de submit do formulário para obter os valores
form.onsubmit = (event) => {
    // preventDefault() serve para prevenir o comportamento padrão de recarregar a página
        event.preventDefault()

  // cria um objeto com os detalhes da nova despesa.
    const newExpense = {
  // retorna os milissegundos desde a data de referência do JavaScript
  // estratégia somente para ter um ID.      
        id: new Date().getTime(),
        expense: expense.value,
        // retorna o value dentro do category
        category_id: category.value,
        //pega o texto selecionado dentro das opções do category
        category_name: category.options[category.selectedIndex].text,
        amount: amount.value,
        created_at: new Date(),
    }
    expenseAdd(newExpense)
}

// criando função para adicionar um novo item ao clicar em adicionar
function expenseAdd (newExpense) {

    try {
// cria o elemento para adicionar o item (li) na lista (ul)
        const expenseItem = document.createElement("li")
        expenseItem.classList.add("expense")
// cria o ícone da categoria

        const expenseIcon = document.createElement("img")

// escolhe os atributos do elemento criado 
// escolhe o ícone conforme a categoria escolhida (dinamicamente)      
        expenseIcon.setAttribute("src", `img/${newExpense.category_id}.svg`)
        expenseIcon.setAttribute("alt", newExpense.category_name)

// cria a info da despesa
        const expenseInfo = document.createElement("div")
        expenseInfo.classList.add("expense-info")
// cria o nome da despesa
        const expenseName = document.createElement("strong")
        expenseName.textContent = newExpense.expense

// cria a categoria da despesa
        const expenseCategory = document.createElement("span")
        expenseCategory.textContent = newExpense.category_name

// adiciona o nome e categoria na div das informações da despesa
        expenseInfo.append(expenseName, expenseCategory)
        
 // cria um elemento span
        const expenseAmount = document.createElement("span")
        expenseAmount.classList.add("expense-amount") 
        expenseAmount.innerHTML = `<small>R$</small> ${newExpense.amount.toUpperCase().replace("R$", "")}`
        
// criando o ícone de remover
        const expenseRemove = document.createElement("img")
        expenseRemove.classList.add("remove-icon")
        expenseRemove.setAttribute("src", `img/remove.svg`)
        expenseRemove.setAttribute("alt", "remover")


// adiciona as informações no item
expenseItem.append(expenseIcon, expenseInfo, expenseAmount, expenseRemove)

// adiciona o item na lista
expenseList.append(expenseItem)

//limpa os dados do formulário para adicionar um novo item
formClear ()

// executa a função para atualizar os valores totais após clicar em adicionar novo item na lista
updateTotais()

    } catch (error) {
        
        alert("Não foi possível atualizar a lista de despesas")
        console.log(error)
    }
}

// Atualiza os totais
function updateTotais() {

try {
// recupera todos os itens (li) da lista (ul)
const items = expenseList.children

// usando o if ternário foi feita uma verificação para mudança da palavra "despesa" conforme a quantidade
// leia-se se a quantidade de itens do items for maior que 01, a palavra será despesas, caso contrário, será despesa
expensesQuantity.textContent = `${items.length} ${items.length > 1 ? "despesas" : "despesa"}`

// variável para incrementar o total
let total = 0

// percorrendo cada item (li) da lista (ul)
for (let item = 0; item < items.length; item++){
    const itemAmount = items[item].querySelector(".expense-amount")

// remove caracteres não numéricos e substitui a vírgula pelo ponto 
    let value = itemAmount.textContent.replace(/[^\d,]/g, "").replace(",",".")


// converte o valor para float
value = parseFloat(value)
// Converter um número para float (ponto flutuante)
// significa transformá-lo em um tipo de dado que pode ter casas decimais

// verificar se é um número válido
if (isNaN(value)) {
return alert("Não foi possível calcular o total. O valor não parece ser um número")
}

// Incrementar o valor total (pode ser escrito: total = Number(total + value))
total += Number(value)
}


// criando a small para adicionar o R$ formatado
const symbolBRL = document.createElement("small")
symbolBRL.textContent = "R$"

// formato o valor e retira o R$
total = formatCurrencyBRL(total).toUpperCase().replace("R$", "")

// limpa o conteúdo do elemento
expenseTotal.innerHTML = ""

// adiciona o R$ e o valor total formatados
expenseTotal.append(symbolBRL, total)


} catch (error) {
    console.log(error)
    alert ("Não foi possível atualizar os valores totais")
}
}


// evento que captura o clique nos itens da lista

expenseList.addEventListener("click", function (event) {
// verificar se o elemento clicado é o ícone de remover

if (event.target.classList.contains("remove-icon")){

// obtendo o elemento pai da li
const item = event.target.closest(".expense")

//método que remove o item da lista
item.remove()
}

//atualiza o valor total (somatório dos itens da lista)
updateTotais()
})

 
// Método para limpar os campos após adicionar um item 

function formClear () {

    expense.value = ""
    amount.value = ""
    category.value = ""

    expense.focus()
}








