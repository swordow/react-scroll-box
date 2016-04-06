// Default easing function.
export function easeCircOut(percentage, elapsedTime, min, max, duration) {
  return max * Math.sqrt(1 - (percentage -= 1) * percentage) + min;
}
