let listadeNumeroSorteado = [];
let numeroLimite = 10;
let numeroSecreto = gerarNumero();
let tentativa = 1;

function exibirTextoNaTela(tag, texto) { //BUSCA TAGS NO HTML E ALTERA.
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate: 1.2});
}

function exibirMensagemInicial() {
    exibirTextoNaTela('h1', 'JOGO MÁGICO'); //CHAMA A FUNÇÃO.
    exibirTextoNaTela('p', 'ESCOLHA UM NÚMERO ENTRE 1 E 10');
}

exibirMensagemInicial();

function verificarChute() {
    let chute = document.querySelector('input').value;

    if (chute == numeroSecreto) {
        exibirTextoNaTela('h1', 'ACERTOU');
        let palavraTentativa = tentativa > 1 ? 'tentativas' : 'tentativa';
        let mensagemTentativas = `Você descobriu o número secreto com ${tentativa} ${palavraTentativa}`;
        exibirTextoNaTela('p', mensagemTentativas);
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else {
        if (chute < numeroSecreto) {
            exibirTextoNaTela('p', 'O número é maior');
        } else {
            if (chute > numeroSecreto) {
                exibirTextoNaTela('p', 'O número é menor');
            }
        }
        tentativa++;
        limparCampo();
    }

}

function gerarNumero() {
    let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);
    let quantidadeDeNumerosSorteados = listadeNumeroSorteado.length;

    if (quantidadeDeNumerosSorteados == numeroLimite) {
        listadeNumeroSorteado = [];
    }



    if (listadeNumeroSorteado.includes(numeroEscolhido)) {
        return gerarNumero();
    } else {
        listadeNumeroSorteado.push(numeroEscolhido);
        console.log(listadeNumeroSorteado);
        return numeroEscolhido;
    }

}

function limparCampo() {
    chute = document.querySelector('input');
    chute.value = '';
}

function reinicioJogo() {
    numeroSecreto = gerarNumero();
    limparCampo();
    tentativa = 1;
    exibirMensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled', true);
}