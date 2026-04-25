const formData = {
    email: "",
    message: "",
}
const form = document.querySelector(".feedback-form");

const localStorageKey = "feedback-form-state";

const savedData = localStorage.getItem(localStorageKey);

if (savedData) {
  const parsed = JSON.parse(savedData);

  formData.email = parsed.email || "";
  formData.message = parsed.message || "";

  form.elements.email.value = formData.email;
  form.elements.message.value = formData.message;
}


form.addEventListener("input", event => {
  const { name, value } = event.target;

  if (name in formData) {
    formData[name] = value;
    localStorage.setItem(localStorageKey, JSON.stringify(formData));
  }
});

form.addEventListener("submit", event => {
  event.preventDefault();

  if (!formData.email || !formData.message) {
    alert("Fill please all fields");
    return;
  }

  console.log(formData);

  localStorage.removeItem(localStorageKey);
  form.reset();

  formData.email = "";
  formData.message = "";
});


