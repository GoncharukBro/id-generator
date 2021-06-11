const state = {
  idList: [],
  idLength: 10,
};

/**
 * Генерирует случайное число на основе заданного диапазона чисел
 * @param {number} min минимальное число диапазона возможного значения
 * @param {number} max максимальное число диапазона возможного значения
 * @returns случайное число
 */
function random(min, max) {
  return Math.floor(min + Math.random() * (max + 1 - min));
}

/**
 * Генерирует id на основе заданных символов. Данная функция только лишь генерирует значение
 * и не учитывает совпадение в массиве значений.
 * @param {number} length длина для генерации id
 * @returns сгенерированный id
 */
function generateId(length) {
  const symbols =
    '0123456789AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz';

  return [...new Array(length)]
    .map(() => symbols[random(0, symbols.length - 1)])
    .join('');
}

/**
 * Проверяет сгенерированное значение id и добавляет в массив значений
 * @returns уникальное значение id
 */
function generateUniqueId() {
  try {
    let id = '';

    // Генерируем значение id и проверяем его на уникальность.
    // В случае успеха пушим значение в массив значений id
    const checkId = () => {
      id = generateId(state.idLength);

      if (state.idList.includes(id)) {
        checkId();
      } else {
        state.idList.push(id);
      }
    };

    checkId();

    return id;
  } catch (error) {
    // Если невозможно сгенерировать уникальное значение, по причине того,
    // что все возможные вариации уже существуют в массиве,
    // прибавляем 1 к длине значения id и повторяем попытку
    if (error instanceof RangeError) {
      state.idLength += 1;
      return generateUniqueId();
    }
  }
}
