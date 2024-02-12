const createDate = (
  days: number = 0,
  months: number = 0,
  years: number = 0,
) => {
  let date = new Date();
  date.setDate(date.getDate() + days);
  date.setMonth(date.getMonth() + months);
  date.setFullYear(date.getFullYear() + years);
  return date;
};

export default createDate;
