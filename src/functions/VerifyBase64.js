function verifyBase64(base64) {
  const base64Regex = /^([A-Za-z0-9+/]{4})*([A-Za-z0-9+/]{4}|[A-Za-z0-9+/]{3}=|[A-Za-z0-9+/]{2}==)$/;

  return base64Regex.test(base64);
}

module.exports = { verifyBase64 };
