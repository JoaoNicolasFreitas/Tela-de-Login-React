"use client";

import { useState } from "react";
import {
  validarEmail,
  validarSenha,
  validarNome,
  validarTelefone,
  validarCPF,
  confirmarValor,
  formatarTelefone,
  formatarCPF
} from "./Validacao";

const Auth = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    cpf: "",
    email: "",
    confirmEmail: "",
    password: "",
    confirmPassword: ""
  });

  const [errors, setErrors] = useState({
    name: "",
    phone: "",
    cpf: "",
    email: "",
    confirmEmail: "",
    password: "",
    confirmPassword: ""
  });

  const [touched, setTouched] = useState({
    name: false,
    phone: false,
    cpf: false,
    email: false,
    confirmEmail: false,
    password: false,
    confirmPassword: false
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    let formattedValue = value;
    
    if (name === "phone") {
      formattedValue = formatarTelefone(value);
    } else if (name === "cpf") {
      formattedValue = formatarCPF(value);
    }
    
    setFormData({
      ...formData,
      [name]: formattedValue
    });
  };

  const handleBlur = (field: string) => {
    setTouched({
      ...touched,
      [field]: true
    });
    
    validateField(field);
  };

  const validateField = (field: string) => {
    let errorMessage = "";
    
    switch (field) {
      case "name":
        errorMessage = validarNome(formData.name) || "";
        break;
      case "phone":
        errorMessage = validarTelefone(formData.phone) || "";
        break;
      case "cpf":
        errorMessage = validarCPF(formData.cpf) || "";
        break;
      case "email":
        errorMessage = validarEmail(formData.email) || "";
        break;
      case "confirmEmail":
        errorMessage = confirmarValor(
          formData.email, 
          formData.confirmEmail, 
          "Os e-mails não coincidem."
        ) || "";
        break;
      case "password":
        errorMessage = validarSenha(formData.password) || "";
        break;
      case "confirmPassword":
        errorMessage = confirmarValor(
          formData.password, 
          formData.confirmPassword, 
          "As senhas não coincidem."
        ) || "";
        break;
    }
    
    setErrors(prev => ({
      ...prev,
      [field]: errorMessage
    }));
    
    return errorMessage;
  };

  const validateForm = () => {
    const fields = isRegister 
      ? ["name", "phone", "cpf", "email", "confirmEmail", "password", "confirmPassword"] 
      : ["email", "password"];
      
    const newErrors = { ...errors };
    let isValid = true;
    
    fields.forEach(field => {
      const error = validateField(field);
      if (error) {
        isValid = false;
        newErrors[field as keyof typeof errors] = error;
      }
    });
    
    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
   
    const allTouched = Object.keys(touched).reduce((acc, key) => {
      return { ...acc, [key]: true };
    }, {});
    setTouched(allTouched as typeof touched);
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    try {
      
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log("Dados enviados:", formData);
      
     
      if (!isRegister) {
       
        setFormData(prev => ({ ...prev, password: "" }));
      } else {
      
        setFormData({
          name: "",
          phone: "",
          cpf: "",
          email: "",
          confirmEmail: "",
          password: "",
          confirmPassword: ""
        });
        setTouched({
          name: false,
          phone: false,
          cpf: false,
          email: false,
          confirmEmail: false,
          password: false,
          confirmPassword: false
        });
      }
    } catch (error) {
      console.error("Erro ao enviar dados:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleMode = () => {
    setIsRegister(!isRegister);
    setErrors({
      name: "",
      phone: "",
      cpf: "",
      email: "",
      confirmEmail: "",
      password: "",
      confirmPassword: ""
    });
    setTouched({
      name: false,
      phone: false,
      cpf: false,
      email: false,
      confirmEmail: false,
      password: false,
      confirmPassword: false
    });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 p-4">
      <div className="w-full max-w-md p-6 bg-gray-800 rounded-xl shadow-xl border border-gray-700">
        <h2 className="text-2xl font-bold text-white text-center mb-4">
          {isRegister ? "Criar Conta" : "Bem-vindo"}
        </h2>
        
        <p className="text-gray-400 text-center text-sm mb-6">
          {isRegister 
            ? "Preencha os dados para criar sua conta" 
            : "Entre com seus dados para acessar"}
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col space-y-3">
          {isRegister && (
            <>
              <div>
                {touched.name && errors.name && (
                  <p className="text-red-500 text-xs mb-1">{errors.name}</p>
                )}
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                    </svg>
                  </span>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Nome completo"
                    value={formData.name}
                    onChange={handleChange}
                    onBlur={() => handleBlur("name")}
                    className={`w-full p-2.5 pl-10 rounded-lg bg-gray-700 text-white border ${
                      touched.name && errors.name ? "border-red-500" : "border-gray-600"
                    } focus:border-orange-500 focus:outline-none transition-colors text-sm`}
                  />
                </div>
              </div>

              <div>
                {touched.phone && errors.phone && (
                  <p className="text-red-500 text-xs mb-1">{errors.phone}</p>
                )}
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                    </svg>
                  </span>
                  <input
                    id="phone"
                    name="phone"
                    type="text"
                    placeholder="Telefone"
                    value={formData.phone}
                    onChange={handleChange}
                    onBlur={() => handleBlur("phone")}
                    className={`w-full p-2.5 pl-10 rounded-lg bg-gray-700 text-white border ${
                      touched.phone && errors.phone ? "border-red-500" : "border-gray-600"
                    } focus:border-orange-500 focus:outline-none transition-colors text-sm`}
                    maxLength={15}
                  />
                </div>
              </div>

              <div>
                {touched.cpf && errors.cpf && (
                  <p className="text-red-500 text-xs mb-1">{errors.cpf}</p>
                )}
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 2a1 1 0 00-1 1v1a1 1 0 002 0V3a1 1 0 00-1-1zM4 4h3a3 3 0 006 0h3a2 2 0 012 2v9a2 2 0 01-2 2H4a2 2 0 01-2-2V6a2 2 0 012-2zm2.5 7a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm2.45 4a2.5 2.5 0 10-4.9 0h4.9zM12 9a1 1 0 100 2h3a1 1 0 100-2h-3zm-1 4a1 1 0 011-1h2a1 1 0 110 2h-2a1 1 0 01-1-1z" clipRule="evenodd" />
                    </svg>
                  </span>
                  <input
                    id="cpf"
                    name="cpf"
                    type="text"
                    placeholder="CPF"
                    value={formData.cpf}
                    onChange={handleChange}
                    onBlur={() => handleBlur("cpf")}
                    className={`w-full p-2.5 pl-10 rounded-lg bg-gray-700 text-white border ${
                      touched.cpf && errors.cpf ? "border-red-500" : "border-gray-600"
                    } focus:border-orange-500 focus:outline-none transition-colors text-sm`}
                    maxLength={14}
                  />
                </div>
              </div>
            </>
          )}

          <div>
            {touched.email && errors.email && (
              <p className="text-red-500 text-xs mb-1">{errors.email}</p>
            )}
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
              </span>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="E-mail"
                value={formData.email}
                onChange={handleChange}
                onBlur={() => handleBlur("email")}
                className={`w-full p-2.5 pl-10 rounded-lg bg-gray-700 text-white border ${
                  touched.email && errors.email ? "border-red-500" : "border-gray-600"
                } focus:border-orange-500 focus:outline-none transition-colors text-sm`}
              />
            </div>
          </div>

          {isRegister && (
            <div>
              {touched.confirmEmail && errors.confirmEmail && (
                <p className="text-red-500 text-xs mb-1">{errors.confirmEmail}</p>
              )}
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                </span>
                <input
                  id="confirmEmail"
                  name="confirmEmail"
                  type="email"
                  placeholder="Confirmar E-mail"
                  value={formData.confirmEmail}
                  onChange={handleChange}
                  onBlur={() => handleBlur("confirmEmail")}
                  className={`w-full p-2.5 pl-10 rounded-lg bg-gray-700 text-white border ${
                    touched.confirmEmail && errors.confirmEmail ? "border-red-500" : "border-gray-600"
                  } focus:border-orange-500 focus:outline-none transition-colors text-sm`}
                />
              </div>
            </div>
          )}

          <div>
            {touched.password && errors.password && (
              <p className="text-red-500 text-xs mb-1">{errors.password}</p>
            )}
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                </svg>
              </span>
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Senha"
                value={formData.password}
                onChange={handleChange}
                onBlur={() => handleBlur("password")}
                className={`w-full p-2.5 pl-10 rounded-lg bg-gray-700 text-white border ${
                  touched.password && errors.password ? "border-red-500" : "border-gray-600"
                } focus:border-orange-500 focus:outline-none transition-colors text-sm`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 px-3 flex items-center text-gray-400 hover:text-white"
              >
                {showPassword ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                    <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z" clipRule="evenodd" />
                    <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {isRegister && (
            <div>
              {touched.confirmPassword && errors.confirmPassword && (
                <p className="text-red-500 text-xs mb-1">{errors.confirmPassword}</p>
              )}
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                  </svg>
                </span>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showPassword ? "text" : "password"}
                  placeholder="Confirmar Senha"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  onBlur={() => handleBlur("confirmPassword")}
                  className={`w-full p-2.5 pl-10 rounded-lg bg-gray-700 text-white border ${
                    touched.confirmPassword && errors.confirmPassword ? "border-red-500" : "border-gray-600"
                  } focus:border-orange-500 focus:outline-none transition-colors text-sm`}
                />
              </div>
            </div>
          )}

          {!isRegister && (
            <div className="flex justify-end">
              <button type="button" className="text-xs text-orange-500 hover:text-orange-400">
                Esqueceu a senha?
              </button>
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className={`mt-2 p-2.5 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold rounded-lg transition-all duration-300 transform hover:scale-[1.02] ${
              isLoading ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {isLoading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                {isRegister ? "Cadastrando..." : "Entrando..."}
              </span>
            ) : (
              <>{isRegister ? "Criar conta" : "Entrar"}</>
            )}
          </button>
        </form>

        <div className="mt-4 text-center">
          <p className="text-gray-400 text-sm">
            {isRegister ? "Já tem uma conta?" : "Ainda não tem uma conta?"}{" "}
            <button
              type="button"
              onClick={toggleMode}
              className="text-orange-500 hover:text-orange-400 font-medium transition-colors"
            >
              {isRegister ? "Faça login" : "Cadastre-se"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Auth;