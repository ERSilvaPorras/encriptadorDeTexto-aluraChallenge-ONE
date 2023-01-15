/* Variables  %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
const encryptionKeysLists = [["a", "ai"], ["e", "enter"], ["i", "imes"], ["o", "ober"], ["u", "ufat"]];

/* Elements HTML  %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
const $textarea = document.querySelector("[name=text]");
const $labelResult = document.querySelector(".encrypt-text-label");
const $btnCopy = document.querySelector(".btn-copy");

/* Custom Elements HTML  %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
$textarea.focus();
$labelResult.innerHTML = `
<div class="content-copy">
  <img src="assets/img/registration${Math.ceil(Math.random()*4)}.png"/>
  <h3>Ningun mensaje encontrado</h3>
  <p>Ingresa el texto que desees encriptar o desencriptar</p>
</div>
`;
$btnCopy.hidden = "true";

document.addEventListener("click", (e) => {
  const text = $textarea.value;
  if (text !== "") {
    if (e.target.matches("[value=encrypt]")) {
      $labelResult.textContent = encryptText(text, encryptionKeysLists, false);
    }
    if (e.target.matches("[value=decrypt]")) {
      $labelResult.textContent = encryptText(text, encryptionKeysLists, true);
    }
    if (e.target.matches("[value=copy]")) {
      copyText();
    }
  }
});

/* Functions  %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
// sort list of encryption keys, avoiding problems in the order of replacement.
function sortEncryptionKeys(encryptionKeys) {
  for (let i = 0; i < encryptionKeys.length; i++) {
    for (let j = 1; j < encryptionKeys.length; j++) {
      if (
        encryptionKeys[i][1].includes(encryptionKeys[j][0]) &&
        encryptionKeys[i] !== encryptionKeys[j] &&
        j >= i
      ) {
        let aux = encryptionKeys[j];
        encryptionKeys.splice(j, 1);
        if (i === 0 && j >= i) {
          encryptionKeys.splice(0, 0, aux);
        } else {
          encryptionKeys.splice(i - 1, 0, aux);
        }
      }
    }
  }
}

// encrypts text by requiring encryption keys, search indexes, and key replacement indexes
function encrypt(text, encryptionKeys, searchIndex, replacementIndex) {
  for (let i = 0; i < encryptionKeys.length; i++) {
    if (text.includes(encryptionKeys[i][searchIndex]));
    text = text.replaceAll(
      encryptionKeys[i][searchIndex],
      encryptionKeys[i][replacementIndex]
    );
  }
  return text;
}

// manages the type of replacement to be made
function encryptText(text, encryptionKeys, reverse) {
  text = text.toLowerCase();
  let encryptedText = "";
  if (reverse) {
    sortEncryptionKeys(encryptionKeys);
    encryptedText = encrypt(text, encryptionKeys, 1, 0);
  } else {
    encryptedText = encrypt(text, encryptionKeys, 0, 1);
  }
  $btnCopy.style.visibility = "visible";
  return encryptedText;
}

// Allows copying encrypted text to clipboard
function copyText() {
  navigator.clipboard.writeText($labelResult.textContent);
}
