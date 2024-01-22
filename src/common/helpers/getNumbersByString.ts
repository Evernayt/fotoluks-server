const getNumbersByString = (text: string) => {
  return typeof text === 'string' ? Number(text.replace(/\D/g, '')) : 0;
};

export default getNumbersByString;
