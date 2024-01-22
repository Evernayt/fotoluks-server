const correctPhone = (phone: string) => {
  if (!phone) return '';
  const correctedPhone = phone
    .replace(/(\d)\s+(\d)/g, '$1$2')
    .replace(/(\+?7)(\d{10})/g, '8$2');
  return correctedPhone;
};

export default correctPhone;
