import bcrypt from "bcryptjs";

export const hashPassword = (password) => {
  const satl = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(password, satl);
};

export const comparePassword = (password, hashPassword) => {
  return bcrypt.compare(password, hashPassword);
};
