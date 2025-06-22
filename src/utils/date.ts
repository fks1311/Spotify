export const formatDate = (date: string) => {
  const [year, month, day] = date.split("-");
  return `${parseInt(month)}월 ${parseInt(day)}일`;
};
