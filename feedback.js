/* =========================================================
   THE PLASTIC LEDGER — Feedback page
   Technical skill: input validation with conditionals
   ========================================================= */

const sendBtn = document.getElementById("send-btn");
const errorBox = document.getElementById("error");
const formCard = document.querySelector(".form-card");
const confirmCard = document.getElementById("confirm");

sendBtn.addEventListener("click", function () {
  const message = document.getElementById("message").value.trim();

  /* The message is the only required field, so it is the only one
     that is checked before the form is accepted.                   */
  if (message === "") {
    errorBox.textContent = "Please write a message before sending.";
    errorBox.classList.add("is-visible");
    return;
  }

  errorBox.classList.remove("is-visible");
  formCard.style.display = "none";
  confirmCard.style.display = "block";
});
