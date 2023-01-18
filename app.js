const input = document.querySelector("#input");
const encryptorScreen = document.querySelector("#screen");
const encryptorBtn = document.querySelector("#btn-encrypt");
const decryptBtn = document.querySelector("#btn-decrypt");
const message = document.querySelector("#message");
const copyBtn = document.querySelector("#copy");
const image = document.querySelector(".center");
const screenContainer = document.querySelector(".screen-container");
const copyMessage = document.querySelector(".copy");

const keys = ["ai", "enter", "imes", "ober", "ufat"];

function getText() {
  const text = input.value;
  const messageSpan = message.querySelector("span");
  const messageP = message.querySelector("p");

  if (!isValid(text)) {
    messageSpan.classList.add("error");
    messageP.classList.add("error");
    message.style.animation = "shake 0.8s ease both";
  } else {
    messageSpan.classList.remove("error");
    messageP.classList.remove("error");
    message.style.animation = "";
  }

  return isValid(text) ? text : "";
}

function showEncryptedMessage() {
  const text = getText();
  if (text) {
    encryptorBtn.removeEventListener("click", showEncryptedMessage);
    typewriterAnimation(encrypt(text), encryptorBtn, showEncryptedMessage);
    image.classList.add("hidden");
    screenContainer.classList.remove("hidden");
  } else {
    image.classList.remove("hidden");
    screenContainer.classList.add("hidden");
  }
}

function showDecryptedMessage() {
  const text = getText();
  if (text) {
    decryptBtn.removeEventListener("click", showDecryptedMessage);
    typewriterAnimation(decrypt(text), decryptBtn, showDecryptedMessage);
    image.classList.add("hidden");
    screenContainer.classList.remove("hidden");
  } else {
    image.classList.remove("hidden");
    screenContainer.classList.add("hidden");
  }
}

function encrypt(text) {
  let encryptedMessage = "";

  for (let i = 0; i < text.length; i++) {
    switch (text[i]) {
      case "a":
        encryptedMessage += keys[0];
        break;
      case "e":
        encryptedMessage += keys[1];
        break;
      case "i":
        encryptedMessage += keys[2];
        break;
      case "o":
        encryptedMessage += keys[3];
        break;
      case "u":
        encryptedMessage += keys[4];
        break;
      default:
        encryptedMessage += text[i];
    }
  }

  return encryptedMessage;
}

function decrypt(text) {
  let encryptedMessage = text;

  keys.forEach((key) => {
    encryptedMessage = encryptedMessage.replaceAll(key, key[0]);
  });

  return encryptedMessage;
}

function isValid(text) {
  return text ? !/[^a-z\sñ]/.test(text) : true;
}

function copy() {
  const text = encryptorScreen.innerText;

  if (text) {
    navigator.clipboard.writeText(text);
    document.styleSheets[0].addRule(".copy:after", "display: " + "flex" + ";");
    setTimeout(() => {
      document.styleSheets[0].addRule(
        ".copy:after",
        "display: " + "none" + ";"
      );
    }, 3000);
  }
}

function typewriterAnimation(text, btn, callback) {
  encryptorScreen.innerText = "";
  let init = 0;
  let last = text.length - 1;
  const interval = setInterval(() => {
    if (init <= last) {
      if (text[init] == " ") {
        encryptorScreen.innerText += "\u00A0";
      } else {
        encryptorScreen.innerText += text[init];
      }
      init++;
    } else {
      clearInterval(interval);
      btn.addEventListener("click", callback);
    }
  }, 30);
}

input.addEventListener("input", getText);
encryptorBtn.addEventListener("click", showEncryptedMessage);
decryptBtn.addEventListener("click", showDecryptedMessage);
copyBtn.addEventListener("click", copy);
