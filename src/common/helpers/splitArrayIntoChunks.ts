const splitArrayIntoChunks = <T extends any>(
  arr: T[],
  perChunk: number,
): T[][] => {
  return arr.reduce((resultArray, item, index) => {
    const chunkIndex = Math.floor(index / perChunk);

    if (!resultArray[chunkIndex]) {
      resultArray[chunkIndex] = [];
    }

    resultArray[chunkIndex].push(item);

    return resultArray;
  }, []);
};

export default splitArrayIntoChunks;
