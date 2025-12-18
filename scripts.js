// seleciona os elementos do formulário. 


const amount = document.getElementById("amount")


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

  








