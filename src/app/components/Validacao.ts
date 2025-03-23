// Validação de e-mail
export const validarEmail = (email: string): string | null => {
    if (!email.trim()) return "O e-mail é obrigatório.";
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return "Formato de e-mail inválido. Ex: nome@exemplo.com";
    }
    
    return null;
  };
  
  
  export const validarSenha = (senha: string): string | null => {
    if (!senha) return "A senha é obrigatória.";
    if (senha.length < 6) return "A senha deve ter no mínimo 6 caracteres.";
    

    const temNumero = /\d/.test(senha);
    const temLetraMaiuscula = /[A-Z]/.test(senha);
    const temCaracterEspecial = /[!@#$%^&*(),.?":{}|<>]/.test(senha);
    
    if (senha.length < 8) {
      return "Recomendamos uma senha com pelo menos 8 caracteres.";
    }
    
    if (!temNumero || !temLetraMaiuscula || !temCaracterEspecial) {
      return "Para maior segurança, use letras maiúsculas, números e símbolos.";
    }
    
    return null;
  };
  
  
  export const validarNome = (nome: string): string | null => {
    if (!nome.trim()) return "O nome é obrigatório.";
    if (nome.trim().length < 3) return "O nome deve ter pelo menos 3 caracteres.";
    
  
    const palavras = nome.trim().split(/\s+/);
    if (palavras.length < 2) {
      return "Por favor, informe seu nome completo.";
    }
    
    return null;
  };
  
 
  export const formatarTelefone = (telefone: string): string => {
    // Remove todos os caracteres não numéricos
    const apenasNumeros = telefone.replace(/\D/g, '');
    
   
    if (apenasNumeros.length <= 2) {
      return apenasNumeros.replace(/^(\d{0,2})/, '($1');
    } else if (apenasNumeros.length <= 7) {
      return apenasNumeros.replace(/^(\d{2})(\d{0,5})/, '($1) $2');
    } else if (apenasNumeros.length <= 11) {
      return apenasNumeros.replace(/^(\d{2})(\d{5})(\d{0,4})/, '($1) $2-$3');
    } else {

      return apenasNumeros.substring(0, 11).replace(/^(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    }
  };
  
  export const validarTelefone = (telefone: string): string | null => {
    if (!telefone.trim()) return "O telefone é obrigatório.";
    
  
    const apenasNumeros = telefone.replace(/\D/g, '');
    
    if (apenasNumeros.length !== 11) {
      return "O telefone deve ter 11 dígitos (incluindo DDD).";
    }
    
    const telefoneRegex = /^\(\d{2}\) \d{5}-\d{4}$/;
    if (!telefoneRegex.test(telefone)) {
      return "Formato de telefone inválido. Use: (XX) XXXXX-XXXX";
    }
    
    return null;
  };
  
 
  export const formatarCPF = (cpf: string): string => {
    
    const apenasNumeros = cpf.replace(/\D/g, '');
    
  
    if (apenasNumeros.length <= 3) {
      return apenasNumeros;
    } else if (apenasNumeros.length <= 6) {
      return apenasNumeros.replace(/^(\d{3})(\d{0,3})/, '$1.$2');
    } else if (apenasNumeros.length <= 9) {
      return apenasNumeros.replace(/^(\d{3})(\d{3})(\d{0,3})/, '$1.$2.$3');
    } else {
      // Limita a 11 dígitos
      return apenasNumeros.substring(0, 11).replace(/^(\d{3})(\d{3})(\d{3})(\d{0,2})/, '$1.$2.$3-$4');
    }
  };
  
  export const validarCPF = (cpf: string): string | null => {
    if (!cpf.trim()) return "O CPF é obrigatório.";
    

    const apenasNumeros = cpf.replace(/\D/g, '');
    
    if (apenasNumeros.length !== 11) {
      return "O CPF deve ter 11 dígitos.";
    }
    
    
    if (/^(\d)\1{10}$/.test(apenasNumeros)) {
      return "CPF inválido.";
    }
    

    const cpfRegex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
    if (!cpfRegex.test(cpf)) {
      return "Formato de CPF inválido. Use: XXX.XXX.XXX-XX";
    }
    

    let soma = 0;
    let resto;
    
    for (let i = 1; i <= 9; i++) {
      soma += parseInt(apenasNumeros.substring(i - 1, i)) * (11 - i);
    }
    
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(apenasNumeros.substring(9, 10))) {
      return "CPF inválido.";
    }
    
    soma = 0;
    for (let i = 1; i <= 10; i++) {
      soma += parseInt(apenasNumeros.substring(i - 1, i)) * (12 - i);
    }
    
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(apenasNumeros.substring(10, 11))) {
      return "CPF inválido.";
    }
    
    return null;
  };
  

  export const confirmarValor = (valor1: string, valor2: string, mensagem: string): string | null => {
    if (!valor2) return "Este campo é obrigatório.";
    if (valor1 !== valor2) return mensagem;
    return null;
  };