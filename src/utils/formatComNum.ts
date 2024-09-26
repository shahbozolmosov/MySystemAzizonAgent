export const formatComNum = (numericValue: string) => {
  return numericValue
    .split('.')
    .map((part, index) =>
      index === 0 ? part.replace(/\B(?=(\d{3})+(?!\d))/g, ',') : part,
    )
    .join('.');
};
