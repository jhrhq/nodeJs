import getUser from '../model/user.model.js';

export const userHomePage = (req, res) => {
  const data = getUser();
  res.render('user', data);
};
