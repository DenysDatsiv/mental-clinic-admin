import { HttpInterceptorFn } from '@angular/common/http';

// Cookies are sent automatically by the browser when withCredentials is set.
// We just ensure every request to our API includes credentials.
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req.clone({ withCredentials: true }));
};
