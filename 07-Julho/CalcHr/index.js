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
  } else if (operacao === '*' || operacao === '/') {
    resultado = mask(primeiroValor) + operacao + (segundoValor + num);
    document.getElementById('valor2').value = segundoValor + num;
  } else {
    resultado = mask(primeiroValor + num);
    document.getElementById('valor1').value = primeiroValor + num;
  }

  document.getElementById('resultado').value = resultado;
}

function limpar() {
  const paraLimpar = ['resultado', 'valor1', 'valor2', 'operacao'];
  for (let i = 0; i < paraLimpar.length; i++) {
    document.getElementById(paraLimpar[i]).value = '';
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
  let ul = document.getElementById('list');
  let li = document.createElement('li');
  li.textContent = valorHistorico;
  ul.appendChild(li);
}

function calcular() {
  let primeiroValor = document.getElementById('valor1').value;
  let segundoValor = document.getElementById('valor2').value;
  let operacao = document.getElementById('operacao').value;

  let resultado;

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
      resultado = Multiplicar_DividirHORA(tempo1, segundoValor, operacao);
    },
    '/': function() {
      resultado = Multiplicar_DividirHORA(tempo1, segundoValor, operacao);
    }
  };

  operacoes[operacao]();

  document.getElementById('resultado').value = resultado;
  let texto = `${mask(primeiroValor)} ${operacao} ${mask(segundoValor)} = ${resultado}`;
  adicionarAoHistorico(texto);

  const resultadoFormatado = resultado.split(':').join('')
  console.log(resultadoFormatado)
  comecarNovoCalculo(resultadoFormatado);
}

function mask(numero) {
  numero = numero.toString();
  if (numero.length === 1) {
    numero = `00:0${numero}`;
  } else if (numero.length === 2) {
    numero = `00:${numero.slice(0, 2)}`;
  } else if (numero.length === 3) {
    numero = `0${numero.slice(0, 1)}:${numero.slice(-2)}`;
  } else if (numero.length > 3) {
    numero = `${numero.slice(0, numero.length - 2)}:${numero.slice(-2)}`;
  }
  return numero;
}

function Multiplicar_DividirHORA(totalMinutos, multiplicador, operador) {
  multiplicador = parseFloat(multiplicador);
  let resultadoMinutos;

  if (operador === '*') {
    resultadoMinutos = totalMinutos * multiplicador;
  } else {
    resultadoMinutos = totalMinutos / multiplicador;
  }

  let resultadoHoras = Math.floor(resultadoMinutos / 60);
  let resultadoMinutosRestantes = Math.round(resultadoMinutos % 60);

  let resultadoFormatado = `${resultadoHoras.toString().padStart(2, '0')}:${resultadoMinutosRestantes.toString().padStart(2, '0')}`;

  return resultadoFormatado;
}

function comecarNovoCalculo(resultado) {
  const resultadoSalvo = resultado;
  limpar();
  document.getElementById('resultado').value = mask(resultadoSalvo);
  document.getElementById('valor1').value = resultadoSalvo;
  

}