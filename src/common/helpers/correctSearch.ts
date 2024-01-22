const correctSearch = (text: string) => {
  if (!text) return '';
  const correctedText = text.replace(/[+\-<>()~*"]/g, ' ');
  return correctedText.trim();
};

export default correctSearch;
