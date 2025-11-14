document.addEventListener('DOMContentLoaded', () => {
  // Получаем оба поля
  const dateFirst = document.getElementById('date-first');
  const dateSecond = document.getElementById('date-second');

  // Функция для форматирования ввода
  function formatDateInput(e) {
    let value = e.target.value.replace(/\D/g, ''); // Только цифры

    if (value.length > 2) {
      value = value.slice(0, 2) + '.' + value.slice(2);
    }
    if (value.length > 5) {
      value = value.slice(0, 5) + '.' + value.slice(5, 9);
    }

    e.target.value = value;
  }

  // Функция для проверки формата даты
  function validateDate(input) {
    const regex = /^\d{2}\.\d{2}\.\d{4}$/;
    if (!regex.test(input.value)) {
      input.classList.add('error');
      return false;
    } else {
      input.classList.remove('error');
      return true;
    }
  }

  // Привязываем обработчики к обоим полям
  [dateFirst, dateSecond].forEach(input => {
    input.addEventListener('input', formatDateInput);

    input.addEventListener('blur', () => validateDate(input));

    // Очищаем ошибку при фокусе
    input.addEventListener('focus', () => input.classList.remove('error'));
  });

  // Дополнительно: проверка логики «дата от ≤ дата до» (опционально)
  function checkDateRange() {
    if (!validateDate(dateFirst) || !validateDate(dateSecond)) return;

    const [d1, m1, y1] = dateFirst.value.split('.').map(Number);
    const [d2, m2, y2] = dateSecond.value.split('.').map(Number);

    const date1 = new Date(y1, m1 - 1, d1);
    const date2 = new Date(y2, m2 - 1, d2);

    if (date1 > date2) {
      alert('Дата "от" не может быть позже даты "до"!');
      dateSecond.classList.add('error');
    }
  }

  // Проверяем диапазон при изменении любого поля
  dateFirst.addEventListener('change', checkDateRange);
  dateSecond.addEventListener('change', checkDateRange);
});