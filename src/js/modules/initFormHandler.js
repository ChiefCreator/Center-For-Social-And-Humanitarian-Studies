export default function initFormHandler() {
  const form = document.getElementById("form-feedback");
  const errors = {};

  form.addEventListener("submit", handleSubmit);

  function handleSubmit(e) {
    e.preventDefault();

    const data = getFormData(form);

    validateFormData(data, errors,);

    if (Object.keys(errors).length > 0) {
      form["name"].addEventListener("input", () => {
        validateFieldName(form["name"].value, errors, form);
      });  

      form["email"].addEventListener("input", () => {
        validateFielEmail(form["email"].value, errors, form);
      });  

      const checkboxInput = form["agreement"];
      const checkbox = checkboxInput.closest(".checkbox");
      const checkboxItem = checkbox.querySelector(".checkbox-item");
      const checkboxLabel = checkbox.querySelector(".checkbox__label");

      checkboxItem.addEventListener("click", () => checkboxInput.dispatchEvent(new Event("change", { bubbles: true })));
      checkboxLabel.addEventListener("click", () => checkboxInput.dispatchEvent(new Event("change", { bubbles: true })));
      checkboxInput.addEventListener("change", () => {
        validateFielAgreement(checkboxInput.checked, errors, form);
      });  

      return;
    };
  }

  function getFormData(form) {
    return {
      name: form.name.value.trim(),
      email: form.email.value.trim(),
      description: form.description.textContent.trim(),
      agreement: form.agreement.checked,
    };
  }
  function validateFormData(data, errors) {
    const { name, email, agreement } = data;

    validateFieldName(name, errors, form);
    validateFielEmail(email, errors, form);
    validateFielAgreement(agreement, errors, form);
  }

  function validateFieldName(val, errors, form) {
    if (!val) {
      errors.name = "Необходимо ввести имя";
    } else if (val.length < 2) {
      errors.name = "Имя должно состоять минимум из 2 символов";
    } else {
      delete errors.name;
    }

    updateField("name", errors.name, form);
  }
  function validateFielEmail(val, errors, form) {
    const validateEmail = (email) => {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    if (!val) {
      errors.email = "Необходимо ввести email";
    } else if (!validateEmail(val)) {
      errors.email = "Некорректный email";
    } else {
      delete errors.email;
    }

    updateField("email", errors.email, form);
  }
  function validateFielAgreement(val, errors, form) {
    if (!val) {
      errors.agreement = "Необходимо согласиться с условиями";
    } else {
      delete errors.agreement;
    }

    updateField("agreement", errors.agreement, form);
  }

  function updateField(name, errorMessage, form) {
    switch(name) {
      case "name":
      case "email": {
        const input = form[name];
        const field = input.closest(".form-field");
        const fieldErrorText = field.querySelector(".form-field__error");
        
        if (fieldErrorText) {
          fieldErrorText.textContent = errorMessage;
        }
        field.classList.toggle("error", !!errorMessage);

        return;
      }
      case "agreement": {
        const checkbox = form[name].closest(".checkbox");

        checkbox.classList.toggle("error", !!errorMessage);
      }
    }
  }
}
