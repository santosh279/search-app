const debounce = (func, delay) => {
  let timerId;
  return function () {
    if (timerId) {
      clearTimeout(timerId);
    }
    timerId = setTimeout(() => func.apply(this, arguments), delay);
  };
}

const trimDetails = (text, count) => {
  const result = text.slice(0, count) + (text.length > count ? '...' : '');
  return result;
};

export {
  debounce,
  trimDetails
}