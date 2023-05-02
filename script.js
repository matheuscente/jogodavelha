const casas = document.querySelectorAll(".casa"),
    botao = document.querySelector('.botao'),
    botao2 = document.querySelectorAll('.botao')[2],
    botao3 = document.querySelectorAll('.botao')[1],
    modal = document.querySelector('.modal'),
    fade = document.querySelector('.fade'),
    vez = document.querySelector('.vez span'),
    resultado = document.querySelector('.resultado'),
    ganhador = document.querySelector('.ganhador'),
    p1 = document.querySelector('.p1'),
    p2 = document.querySelector('.p2'),
    combinacao =  [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ]

//mostra ou nao o ganhador
function mostra(texto) {
    if(texto === 'X' || texto === "O") {
        if(ganhador.classList.contains('desativo')){
            ganhador.classList.remove('desativo')
        }
            ganhador.classList.add('ativo')
            resultado.innerText = "VENCEU!"
            resultado.style.marginTop = '0px'
    } else {
        if(ganhador.classList.contains('ativo')){
            ganhador.classList.remove('ativo')
        }
            ganhador.classList.add('desativo')
            resultado.style.marginTop = '4rem'
    }
}

//muda o placar de jogo
function mudarPlacar() {
    const p1text = document.querySelector('.p1').innerText,
          p2text = document.querySelector('.p2').innerText
    let total= 0,
        p1 = Number(p1text),
        p2 = Number(p2text)

    if(ganhador.innerText === 'X') {
        p1 = p1 + 1
        total = p1
    } else if(ganhador.innerText === 'O') {
        p2 = p2 + 1
        total = p2
    }
    return total
}

//Exibe o modal de final de jogo 
function modalOn() {
    if(modal.classList.contains('modal-desativado')){
        modal.classList.remove('modal-desativado')
    }
    modal.classList.add('modal-ativo')
    if(fade.classList.contains('fade-desativado')){
        fade.classList.remove('fade-desativado')
    } fade.classList.add('fade-ativo')
}

//verifica se alguma combinação foi executada
function verificarCombinacao() {
    let ok
    combinacao.forEach((comb, a)=>{
            const marcadoX = comb.filter(item => casas[item].innerText === "X")
            const marcadoO = comb.filter(item => casas[item].innerText === "O")
            if(marcadoX.length == 3) {
                ok = true
            } else if(marcadoO.length == 3) {
                ok = true
            }
    })
    return ok
}

//verificar se a casa já está marcada
function marcado(texto) {
    if(texto) {
        return false
    } else {
        return true
    }
}

//verifica se todas as casas já estão marcadas
function todasMarcadas() {
    let contador = 0
    casas.forEach((casa, indice) => {
        if (casa.innerText) {
            contador = contador + 1
        }
    })
    if(contador == casas.length) {
       return true
    } else {
        return false
    }
}

casas.forEach((casa, indice) => {
    casa.addEventListener('click', () => {
        if (marcado(casa.innerText)) {
            if(vez.innerText === 'X') {
                casa.innerText = 'X'
                console.log(verificarCombinacao())
                if(todasMarcadas() == true) {
                    ganhador.innerText = ''
                    mostra(ganhador.innerText)
                    resultado.innerHTML = 'EMPATE!'
                    modalOn()
                }
                if(verificarCombinacao() == true) {
                    ganhador.innerText = 'X'
                    mostra(ganhador.innerText)
                    modalOn()
                   p1.innerText = mudarPlacar()
                }
                vez.innerText = 'O'
            } else if(vez.innerText === 'O') {
                casa.innerText = 'O'
                if(todasMarcadas() == true) {
                    ganhador.innerText = ''
                    mostra(ganhador.innerText)
                    resultado.innerHTML = 'EMPATE!'
                    modalOn()
                }
                if(verificarCombinacao() == true) {
                    ganhador.innerText = 'O'
                    mostra(ganhador.innerText)
                    modalOn()
                    p2.innerText = mudarPlacar()
                }
                vez.innerText = 'X'
            }
        } else {
            alert('Esta casa já está marcada!')
        }
    })
})

botao.addEventListener('click', () =>{
    casas.forEach((casa)=>{
        casa.innerText = ''
    })
})

botao2.addEventListener('click', () =>{
    modal.classList.remove('modal-ativo')
    fade.classList.remove('fade-ativo')
    fade.classList.add('fade-desativado')
    modal.classList.add('modal-desativado')
    casas.forEach((casa)=>{
        casa.innerText = ''
    })
})

botao3.addEventListener('click', () => {
    p1.innerText = 0
    p2.innerText = 0
})