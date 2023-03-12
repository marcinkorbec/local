export default obj => {
  if (!obj) return '';
  const extImage = /[.]/.exec(obj?.path) ? /[^.]+$/.exec(obj?.path) : 'png';
  const encoded = obj?.encodedImage || obj;
  const base64String = `data:image/${extImage};base64,${encoded}`;

  return base64String;
};
