// Assignment Code
var generateBtn = document.querySelector("#generate");
var symbols = [];
var lowercaseLetters = [];
var uppercaseLetters = [];
var numbers = [];
var passwordLength = 0;

setPasswordTypes();

function setPasswordTypes() {
  setSymbols();
  setLetters();
  setNumbers();
//  console.log(`${symbols}\n${lowercaseLetters}\n${uppercaseLetters}\n${numbers}`);
}

//symbols = 0x21 -> 0x2f && 0x3a -> 0x40 && 0x5b -> 0x60 && 0x7b -> 0x7e (UTF-8)
function setSymbols() {
  for(let i = 0x21; i <= 0x2f; i++)
  {
    symbols.push(String.fromCharCode(i));
  }

  for(let i = 0x3a; i <= 0x40; i++)
  {
    symbols.push(String.fromCharCode(i));
  }

  for(let i = 0x5b; i <= 0x60; i++)
  {
    symbols.push(String.fromCharCode(i));
  }
  
  for(let i = 0x7b; i <= 0x7e; i++)
  {
    symbols.push(String.fromCharCode(i));
  }
}

function setLetters() {
  //uppercase letters
  for(let i = 0x41; i <= 0x5a; i++)
  {
    uppercaseLetters.push(String.fromCharCode(i));
  }
  //lowercase letters
  for(let i = 0x61; i <= 0x7a; i++)
  {
    lowercaseLetters.push(String.fromCharCode(i));
  }
}

function setNumbers() {
  for(let i = 0x30; i <=0x39; i++)
  {
    numbers.push(String.fromCharCode(i));
  }
}

function generatePrompts(passwordSet, typeSelected) {
  if(confirm("Would you like to include lowercase characters in your password?"))
  {
    typeSelected.lowercase = true;
    passwordSet.push(lowercaseLetters);
    typeSelected.typeNumber++;
  }
  if(confirm("Would you like to include uppercase characters in your password?"))
  {
    typeSelected.uppercase = true;
    passwordSet.push(uppercaseLetters);
    typeSelected.typeNumber++;
  }
  if(confirm("Would you like to include numbers in your password?"))
  {
    typeSelected.numbers = true;
    passwordSet.push(numbers);
    typeSelected.typeNumber++;
  }
  if(confirm("Would you like to include symbols in your password?"))
  {
    typeSelected.symbols = true;
    passwordSet.push(symbols);
    typeSelected.typeNumber++;
  }
  return typeSelected.typeNumber === 0;
}

function generatePassword(passwordSet, passwordLength) {
  var password = "";
  for(let i = 0; i < passwordLength; i++)
  {
    var newCharSet = passwordSet[Math.floor(Math.random() * passwordSet.length)];
    var newChar = newCharSet[Math.floor(Math.random() * newCharSet.length)];
    password += newChar;
  }
  return password;
}

// Write password to the #password input
function writePassword() {
  var passwordSet = [];
  var typeSelected = {
    lowercase: false,
    uppercase: false,
    numbers: false,
    symbols: false,
    typeNumber: 0,
  };
  passwordLength = prompt("Please enter a password length between 8 and 128 characters long.");
  while(!passwordLength.match(/^\d+$/) || (passwordLength > 128 || passwordLength < 8))
  {
    console.log(passwordLength != typeof(number));
    passwordLength = prompt("Invalid input. Please enter a password length between 8 and 128 characters long.");
  }
  while(generatePrompts(passwordSet, typeSelected))
  {
    alert("Please select at least one character type to generate the password.");
  }
  var password = generatePassword(passwordSet, passwordLength);
  var passwordText = document.querySelector("#password");

  passwordText.value = password;

}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);
