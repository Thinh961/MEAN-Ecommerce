import { HttpInterceptorFn } from "@angular/common/http";

export const tokenHttpInterceptor: HttpInterceptorFn = (req, next) => {
  const token = typeof window !== 'undefined' ? localStorage.getItem("token") : null;
  if (token) {
    req = req.clone({
      setHeaders: {
        Authorization: token
      },
    });
  }
  return next(req);
};
