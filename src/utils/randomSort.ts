export const randomSort = (array: number[]): number[] => {
  const randomSortedArray = [...array];
  for (let i = randomSortedArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [randomSortedArray[i], randomSortedArray[j]] = [
      randomSortedArray[j],
      randomSortedArray[i],
    ];
  }
  return randomSortedArray;
};
