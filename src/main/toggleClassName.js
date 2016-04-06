// Toggle class name for an element.
export function toggleClassName(el, className, force) {
  let originalClassName = el.className,
    lowerClassNames = originalClassName.toLowerCase().split(' '),
    lowerClassName = className.toLowerCase();

  let i = lowerClassNames.indexOf(lowerClassName);
  if (typeof force == 'undefined') {
    force = i < 0;
  }
  if (force) {
    if (i >= 0) {
      return; // Class already added.
    }
    if (lowerClassNames.length) {
      el.className = originalClassName + ' ' + className;
    } else {
      el.className = className;
    }
  } else {
    if (i < 0) {
      return; // Class already removed.
    }
    let classNames = originalClassName.split(' ');
    for (let count = 0; i >= 0; count++) {
      // Class name can be repeated multiple times.
      classNames.splice(i - count, 1);
      i = lowerClassNames.indexOf(lowerClassName, i + 1);
    }
    el.className = classNames.join(' ');
  }
}
