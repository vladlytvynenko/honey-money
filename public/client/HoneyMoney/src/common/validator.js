import {useState} from 'react';
import validator from 'validator';

export const useValidatorRegister = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password_confirm, setPasswordConfirm] = useState('');

  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isFirstNameValid, setIsFirstNameValid] = useState(true);
  const [isLastNameValid, setIsLastNameValid] = useState(true);
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const [isPasswordConfirmValid, setIsPasswordConfirmValid] = useState(true);

  const firstNameChanged = firstName => {
    setFirstName(firstName);
    setIsFirstNameValid(true);
  };

  const lastNameChanged = lastName => {
    setLastName(lastName);
    setIsLastNameValid(true);
  };

  const emailChanged = email => {
    setEmail(email);
    setIsEmailValid(true);
  };

  const passwordChanged = password => {
    setPassword(password);
    setIsPasswordValid(true);
  };

  const passwordConfirmChanged = passwordConfirm => {
    setPasswordConfirm(passwordConfirm);
    setIsPasswordConfirmValid(true);
  };

  const validateFirstName = () => {
    const isFirstNameValid = validator.isByteLength(firstName, {
      min: 2,
      max: 10,
    });
    setIsFirstNameValid(() => isFirstNameValid);
    return isFirstNameValid;
  };

  const validateLastName = () => {
    const isLastNameValid = validator.isByteLength(lastName, {
      min: 2,
      max: 10,
    });
    setIsLastNameValid(isLastNameValid);
    return isLastNameValid;
  };

  const validateEmail = () => {
    const isEmailValid = validator.isEmail(email);
    setIsEmailValid(isEmailValid);
    return isEmailValid;
  };

  const validatePassword = () => {
    const regExp = new RegExp(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/);
    const isPasswordValid = regExp.test(password);
    setIsPasswordValid(isPasswordValid);
    return isPasswordValid;
  };

  const validatePasswordConfirm = () => {
    const isPasswordConfirmValid = password === password_confirm;
    setIsPasswordConfirmValid(isPasswordConfirmValid);
    return isPasswordConfirmValid;
  };

  return {
    email,
    password,
    password_confirm,
    firstName,
    lastName,
    isEmailValid,
    isPasswordValid,
    isPasswordConfirmValid,
    isFirstNameValid,
    isLastNameValid,
    emailChanged,
    passwordChanged,
    passwordConfirmChanged,
    lastNameChanged,
    firstNameChanged,
    validateEmail,
    validatePassword,
    validatePasswordConfirm,
    validateFirstName,
    validateLastName,
  };
};

export const useValidatorLogIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isPasswordValid, setIsPasswordValid] = useState(true);

  const emailChanged = email => {
    setEmail(email);
    setIsEmailValid(true);
  };

  const passwordChanged = password => {
    setPassword(password);
    setIsPasswordValid(true);
  };

  const validateEmail = () => {
    const isEmailValid = validator.isEmail(email);
    setIsEmailValid(isEmailValid);
    return isEmailValid;
  };

  const validatePassword = () => {
    const regExp = new RegExp(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/);
    const isPasswordValid = regExp.test(password);
    setIsPasswordValid(isPasswordValid);
    return isPasswordValid;
  };

  return {
    email,
    password,
    isEmailValid,
    isPasswordValid,
    emailChanged,
    passwordChanged,
    validateEmail,
    validatePassword,
  };
};

