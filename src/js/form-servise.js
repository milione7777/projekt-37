const getFormData = (form) => {
  console.log("Переданный form:", form); // Проверка
  if (!(form instanceof HTMLFormElement)) {
    console.error("Ошибка: передан не HTMLFormElement!", form);
    return null;
  }

  const formData = new FormData(form);
  return Object.fromEntries(formData.entries());
};

const fillInForm = (form, data) => {
  console.log("Переданный form:", form); // Проверяем, что передаётся
  console.log("Переданные данные:", data);

  if (!form || !(form instanceof HTMLFormElement)) {
    console.error("Ошибка: передан не HTMLFormElement!", form);
    return;
  }

  Object.keys(data).forEach((key) => {
    const input = form.querySelector(`[name="${key}"]`);
    if (input) {
      input.value = data[key];
    }
  });
};


export { getFormData, fillInForm };
