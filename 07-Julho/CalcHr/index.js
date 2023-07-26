

function addOperacao(operacao) {
  document.getElementById('operacao').value = operacao;

  let valor1 = document.getElementById('valor1').value;
  document.getElementById('resultado').value = mask(valor1) + operacao;
}

function adicionar(num) {
  let resultado = document.getElementById('resultado').value;
  let primeiroValor = document.getElementById('valor1').value;
  let segundoValor = document.getElementById('valor2').value;
  let operacao = document.getElementById('operacao').value;

  if (operacao === '+' || operacao === '-') {
    resultado = mask(primeiroValor) + operacao + mask(segundoValor + num);
    document.getElementById('valor2').value = segundoValor + num;
  } 
  else if (operacao === '*' || operacao === '/') {
    resultado = mask(primeiroValor) + operacao + (segundoValor + num);
    document.getElementById('valor2').value = segundoValor + num;
  } 
  else {
    resultado = mask(primeiroValor + num);
    document.getElementById('valor1').value = primeiroValor + num;
  }

  document.getElementById('resultado').value = resultado;
}




function limpar() {
  const ValoresParaLimpar = ['resultado', 'valor1', 'valor2', 'operacao'];
  for (const valor of ValoresParaLimpar) {
    document.getElementById(valor).value = null;
  }
}

function voltar() {
  let resultado = document.getElementById('resultado').value;
  document.getElementById('resultado').value = resultado.substring(0, resultado.length - 1);
}

function convertToTime(minutes) {
  let hours = Math.floor(minutes / 60);
  let mins = minutes % 60;
  let formattedHours = hours.toString().padStart(2, '0');
  let formattedMinutes = mins.toString().padStart(2, '0');
  return formattedHours + ':' + formattedMinutes;
}

function adicionarAoHistorico(valorHistorico) {
  const ul = document.getElementById('list');
  const li = document.createElement('li');
  li.textContent = valorHistorico;
  ul.appendChild(li);
}

function calcular() {
  let primeiroValor = document.getElementById('valor1').value;
  let segundoValor = document.getElementById('valor2').value;
  let operacao = document.getElementById('operacao').value


  let array1 = mask(primeiroValor).split(':');
  let array2 = mask(segundoValor).split(':');
  let tempo1 = parseInt(array1[0]) * 60 + parseInt(array1[1]);
  let tempo2 = parseInt(array2[0]) * 60 + parseInt(array2[1]);


  const operacoes = {
    '+': function() {
      resultado = tempo1 + tempo2;
      resultado = convertToTime(resultado);
    },
    '-': function() {
      resultado = tempo1 - tempo2;
      resultado = convertToTime(resultado);
    },
    '*': function() {
      resultado = tempo1 * parseFloat(segundoValor);
      resultado = convertToTime(resultado);
    },
    '/': function() {
      resultado = tempo1 / parseFloat(segundoValor);
      resultado = convertToTime(resultado);
    }
  };

  operacoes[operacao]();

  document.getElementById('resultado').value = resultado;
  let texto = `${mask(primeiroValor)} ${operacao} ${mask(segundoValor)} = ${resultado}`;
  adicionarAoHistorico(texto);

  const resultadoFormatado = resultado.split(':').join('')
  comecarNovoCalculo(resultadoFormatado);
}

function mask(numero) {

  const numeroString = numero.toString();
    const comprimentoMaximo = Math.max(4, numeroString.length);
    const numeroFormatado = numeroString.padStart(comprimentoMaximo, '0');
    return numeroFormatado.substr(0, comprimentoMaximo - 2) + ':' + numeroFormatado.substr(comprimentoMaximo - 2);


}


function comecarNovoCalculo(resultado) {
  const resultadoSalvo = resultado;
  limpar();
  document.getElementById('resultado').value = mask(resultadoSalvo);
  document.getElementById('valor1').value = resultadoSalvo;
  

}

function LiberarVirgula() {
  const ponto = document.getElementById('ponto')
  ponto.disabled = false

}

function LimparHistorico() {
  const Childs = document.getElementsByTagName('li')
  const Historico = document.getElementById('list')
  while ( Childs.length > 0 ) {
    Historico.removeChild(Childs[0])
  }
}



