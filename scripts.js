// seleciona os elementos do formulário. 

const form = document.querySelector("form")
const amount = document.getElementById("amount")
const expense = document.getElementById("expense")
const category = document.getElementById("category")


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

    function formatCurrencyBRL(value) {
// formato o valor no padrão BRL (Real Brasileiro)
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
    
   
    
}




 








