import { HttpHeaders, HttpInterceptorFn } from '@angular/common/http';

export const customInterceptor: HttpInterceptorFn = (req, next) => {

  const excludedUrls = [
    'http://localhost:8085/**'
   // 'http://localhost:8080/**'
    
  ];
  if (excludedUrls.some(url => req.url.includes(url))) {
    
    return next(req); // Skip the interceptor for these URLs
  }
  const token = localStorage.getItem("AccessToken");
 
  
   const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  
  // Fixing the template literal in Authorization header
  const clonedReq = req.clone({headers});
  
  
  console.log("Cloned Request with Authorization:", clonedReq);

  return next(clonedReq);
};

