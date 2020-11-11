/* eslint-disable no-param-reassign */
const addHoverEvent = (cursor, targets) => {
  if (!targets) return;

  if (Array.isArray(targets)) {
    targets.forEach((target) => {
      [...document.querySelectorAll(target)].forEach((el) => {
        el.addEventListener('mouseenter', cursor.enter);
        el.addEventListener('mouseleave', cursor.leave);
      });
    });
  } else {
    [...document.querySelectorAll(targets)].forEach((el) => {
      el.addEventListener('mouseenter', cursor.enter);
      el.addEventListener('mouseleave', cursor.leave);
    });
  }
};

const removeHoverEvent = (cursor, targets) => {
  if (!targets) return;

  if (Array.isArray(targets)) {
    targets.forEach((target) => {
      [...document.querySelectorAll(target)].forEach((el) => {
        el.removeEventListener('mouseenter', cursor.enter);
        el.removeEventListener('mouseleave', cursor.leave);
      });
    });
  } else {
    [...document.querySelectorAll(targets)].forEach((el) => {
      el.removeEventListener('mouseenter', cursor.enter);
      el.removeEventListener('mouseleave', cursor.leave);
    });
  }
};

const handleWindowEvent = (cursor) => {
  document.body.addEventListener('mouseleave', cursor.hide);
  document.body.addEventListener('mouseenter', cursor.show);
};

const removeWindowEvent = (cursor) => {
  document.body.removeEventListener('mouseleave', cursor.hide);
  document.body.removeEventListener('mouseenter', cursor.show);
};

// Linear interpolation
const lerp = (a, b, n) => (1 - n) * a + n * b;

// Get mouse position
const getMousePos = (e) => {
  let posX = 0;
  let posY = 0;

  if (!e) e = window.event;

  posX = e.clientX;
  posY = e.clientY;

  return {
    x: posX,
    y: posY,
  };
};

export {
  addHoverEvent, removeHoverEvent,
  handleWindowEvent, removeWindowEvent,
  lerp, getMousePos,
};
