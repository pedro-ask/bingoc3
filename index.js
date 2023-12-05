var jogadores = [];
var numeros_sorteados = [];
var intervalo;

function desenharCartela(jogador){
     
    const pai_div_cartela = document.getElementById('body_cartelas');

    const div_cartela = document.createElement('div');
    div_cartela.className = 'cartela';

    pai_div_cartela.appendChild(div_cartela);

    const h4_jogador = document.createElement('h4');
    h4_jogador.innerText =  jogador.nome;

    div_cartela.appendChild(h4_jogador);

    const tabela = document.createElement('table');
    const thead = document.createElement('thead');
    const tbody = document.createElement('tbody');

    const thB = document.createElement('th');
    const thI = document.createElement('th');
    const thN = document.createElement('th');
    const thG = document.createElement('th');
    const thO = document.createElement('th');

    thB.innerText = 'B';
    thI.innerText = 'I';
    thN.innerText = 'N';
    thG.innerText = 'G';
    thO.innerText = 'O';

    thead.appendChild(thB);
    thead.appendChild(thI);
    thead.appendChild(thN);
    thead.appendChild(thG);
    thead.appendChild(thO);

    for(var i = 0; i < 5; i++){
        const tr = document.createElement('tr');
        for(var j = 0; j < 5; j++){
            const td = document.createElement('td');
            td.innerText = jogador.cartela[j][i];
            if (j === 2 && i === 2){
                td.innerText = 'X';
            }
            tr.appendChild(td);
        }
        tbody.appendChild(tr);
    }

    tabela.appendChild(thead);
    tabela.appendChild(tbody);

    div_cartela.appendChild(tabela);
}

function gerarColuna(quantidade, inicio, fim){
    var coluna = [];

    while(coluna.length < quantidade){
        var aleatorio = Math.floor(Math.random()* (fim - inicio) + inicio);
        if(!coluna.includes(aleatorio)){
            coluna.push(aleatorio);
        }
    }

    return coluna;
}

function gerarCartela(){
    var cartela = [gerarColuna(5,1,15), gerarColuna(5,16,30), gerarColuna(5,31,45), gerarColuna(5,46,60), gerarColuna(5,61,75)];

    return cartela;
}

function inscreverJogador(){
    const nome = prompt('Digite o nome do jogador:');

    if(nome.length < 4){
        alert('Nome precisa ter mais de 4 caracteres');
        return;
    }

    const cartela = gerarCartela();

    const jogador = {
        nome: nome,
        cartela: cartela
    }

    jogadores.push(jogador);
    console.log(jogadores);
    desenharCartela(jogador);
}

function jogar(){
    if(jogadores.length < 2){
        alert('É necessário haver ao menos dois jogadores!');
        return;
    }

    intervalo = setInterval(function(){
        while(true){
            var aleatorio = Math.floor(Math.random()*75 + 1);
            if(!numeros_sorteados.includes(aleatorio)){
                numeros_sorteados.push(aleatorio);
                break;
            }
        }

        const body_numeros = document.getElementById('body_numeros');

        const span = document.createElement('span');
        span.innerText = aleatorio;

        body_numeros.appendChild(span);

        conferirJogo(aleatorio);
    }, 500)
}

function conferirJogo(sorteado){
    var numeros_cartelas = document.getElementsByTagName('td');

    for(var i = 0; i < numeros_cartelas.length; i++){
        if(numeros_cartelas[i].innerText == sorteado){
            numeros_cartelas[i].style.backgroundColor = 'red'
        }
    }

    for (var i = 0; i < jogadores.length; i++) {
        if (verificarVitoria(jogadores[i])) {
            alert(jogadores[i].nome + ' ganhou o bingo!');
            clearInterval(intervalo);
            break;
        }
    }
}


function verificarVitoria(jogador) {
    var cartela = jogador.cartela;
    for (var i = 0; i < cartela.length; i++) {
        for (var j = 0; j < cartela[i].length; j++) {
            var numero = cartela[i][j];
            var encontrado = false;
            var numeros_cartelas = document.getElementsByTagName('td');
            for (var k = 0; k < numeros_cartelas.length; k++) {
                if (numeros_cartelas[k].innerText == numero && numeros_cartelas[k].style.backgroundColor === 'purple') {
                    encontrado = true;
                    break;
                }
            }
            if (!encontrado) {
                return false;
            }
        }
    }
    return true;
}