export const validateEmail = (email: string) => {
  const emailPattern = /^[\w.+-]+@([\w-]+\.){1,3}[\w-]{2,}$/;

  return emailPattern.test(email);
};
