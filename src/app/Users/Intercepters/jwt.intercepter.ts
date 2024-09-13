import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private toastrService: ToastrService, private router: Router) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('Token');
    
    // Add token to headers for all requests except login or register
    if (token && !this.isAuthRoute(request.url)) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }
    
    // Handle the request and catch errors
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) { // Unauthorized error
          this.toastrService.error('Session expired or unauthorized. Please log in again.');
          localStorage.removeItem('Token'); // Optionally clear the token
          this.router.navigate(['/login']); // Redirect to login
        }
        
        return throwError(error); // Pass the error to the next handler
      })
    );
  }

  // Helper method to check if the request URL is login or register
  private isAuthRoute(url: string): boolean {
    const authRoutes = ['/Userlogin', '/User-register']; // Modify based on your API paths
    return authRoutes.some(route => url.includes(route));
  }
}
