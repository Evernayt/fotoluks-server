const fileNameToUTF8 = (originalname: string) => {
  return Buffer.from(originalname, 'latin1').toString('utf8');
};

export default fileNameToUTF8;
