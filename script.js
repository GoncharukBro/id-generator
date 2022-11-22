const SYMBOLS = '0123456789AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz';

let length = 10;
let list = [];

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
  return [...new Array(length)].map(() => SYMBOLS[random(0, SYMBOLS.length - 1)]).join('');
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
      id = generateId(length);

      if (list.includes(id)) {
        checkId();
      } else {
        list.push(id);
      }
    };

    checkId();

    return id;
  } catch (error) {
    // Если невозможно сгенерировать уникальное значение, по причине того,
    // что все возможные вариации уже существуют в массиве,
    // прибавляем 1 к длине значения id и повторяем попытку
    if (error instanceof RangeError) {
      length += 1;
      return generateUniqueId();
    }
  }
}
