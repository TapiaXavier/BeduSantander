// app.js

//el uso de "$" es que se utilizara una variable referente a la interface.

//_ es para decir " que esa variable es privada"

const $forms = document.querySelectorAll(".signup-form");

const getTemplate = () => {
  return fetch("./template.html").then((response) => response.text());
};

const sendEmailToApi = (address, template) => {
  fetch(`https://bedu-email-sender-api.herokuapp.com/send`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      address: address,
      template: template,
    }),
  })
    .then((results) => {
      console.log(results);
      document.getElementById("email").value = ""
      alert("E-mail send!!!")
    })
    .catch((error) => {
      console.error(error);
      document.getElementById("email").value = ""
      alert("Send failed")
    });
};

const sendEmail = (event) => {
  event.preventDefault();
  const email = event.target.querySelector("input").value;
  getTemplate()
    .then((template) => {
      sendEmailToApi(email, template);
    })
    .catch((error) => {
      console.log(error, "error al convertir el template.");
    });
};

for (let i = 0; i < $forms.length; i++) {
  $forms[i].addEventListener("submit", sendEmail);
}

console.log($forms);