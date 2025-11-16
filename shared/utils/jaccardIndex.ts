export const jaccardIndex = (a: string[], b: string[]) => {
  if (!a || !b) return 0;
  const setA = new Set(a);
  const setB = new Set(b);
  const intersectionLength = [...setA].filter((element) => [...setB].includes(element)).length;
  const unionLength = new Set([...setA, ...setB]).size;

  if (unionLength === 0) return 0;
  return intersectionLength / unionLength;
};
