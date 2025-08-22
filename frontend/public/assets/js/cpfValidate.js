const CPF_TAMANHO = 11;
const MODULO_DIGITO = 11;
const PRIMEIRO_DIGITO = 9;
const SEGUNDO_DIGITO = 10;

function validarCPF(cpf) {

  let resto = 0;
  cpf = cpf.replace(/[^\d]+/g, ''); // Remove tudo que não for número

  if (!verificarDigitos(cpf)) return false; // Tamanho inválido ou todos os dígitos iguais

  cpf = cpf.split('').map(Number);

  // Validação do primeiro dígito verificador

  resto = calcularDigitoVerificador(cpf, PRIMEIRO_DIGITO)
  if (resto !== cpf[9]) return false;

  // Validação do segundo dígito verificador

  resto = calcularDigitoVerificador(cpf, SEGUNDO_DIGITO);
  if (resto !== cpf[10]) return false;

  return true;

}

function verificarDigitos(cpf) { // Verifica se o CPF tem o tamanho correto e se não é uma sequência de dígitos iguais

  const CPF_REGEX = /^(\d)\1+$/; // Verifica se todos os dígitos são iguais

  if (cpf.length !== CPF_TAMANHO || CPF_REGEX.test(cpf)) {
    return false;
  }

  return true;

}

function calcularDigitoVerificador(cpf, tamanhoDigitos){

  let soma = 0;
  for (let i = 0; i < tamanhoDigitos; i++) {
    soma += cpf[i] * ((tamanhoDigitos+1) - i); //peso vai de 10 a 2 no primeiro dígito e 11 a 2 no segundo
  }

  let resto = (soma * 10) % MODULO_DIGITO;
  if (resto === 10 || resto === MODULO_DIGITO) resto = 0;
  return resto;

}