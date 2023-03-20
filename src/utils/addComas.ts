export const addCommas = (number: number) => {
  const str = number.toString();

  const chars = str.split("");

  chars.reverse();

  for (let i = 3; i < chars.length; i += 4) {
    chars.splice(i, 0, ",");
  }

  return chars.reverse().join("");
}