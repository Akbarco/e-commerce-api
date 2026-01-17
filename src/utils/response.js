export const succesResponse = (res, massage, data = null, status = 200) => {
  return res.status(status).json({
    succes: true,
    massage,
    data,
  });
};
export const erorResponse = (res, massage, data = null, status = 400) => {
  return res.status(status).json({
    succes: false,
    data,
  });
};
