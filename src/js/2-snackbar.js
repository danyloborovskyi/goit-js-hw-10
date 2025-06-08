import iziToast from "izitoast";
// Додатковий імпорт стилів
import "izitoast/dist/css/iziToast.min.css";

const form = document.querySelector(".form");
const delayInput = document.querySelector('input[name="delay"]');
const success = document.querySelector('input[value="fulfilled"]')
const error = document.querySelector('input[value="rejected"]')

form.addEventListener("submit", handleSubmit);

function handleSubmit(event) {
    event.preventDefault()
    const delayInputNum = +delayInput.value;

    return new Promise((resolve, reject) => {
        const selectedState = success.checked ? "fulfilled" : "rejected";

        setTimeout(() => {
            if (selectedState === "fulfilled") {
                resolve(`✅ Fulfilled promise in ${delayInputNum}ms`)
            } else if (selectedState === "rejected") {
                reject(`❌ Rejected promise in ${delayInputNum}ms`)
            }
        }, delayInputNum)
    })
    .then(message => {
    iziToast.success({
      title: "OK",
      message: message,
    });
  })
  .catch(message => {
    iziToast.error({
      title: "Error",
      message: message,
    });
  });
}