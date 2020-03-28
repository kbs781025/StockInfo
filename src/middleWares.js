import { routes } from "./routes";

export const localMiddleWare = (req, res, next) => {
  res.locals.loggedUser = req.user || {};
  res.locals.routes = routes;
  next();
};
