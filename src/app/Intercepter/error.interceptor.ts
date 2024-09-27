import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr'; // Assuming you're using Toastr for notifications
import { Router } from '@angular/router';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private toastr: ToastrService, private router: Router) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        // Check if the error is from the server (HTTP error)
        if (error instanceof HttpErrorResponse) {
          // Handle different status codes
          switch (error.status) {
            case 400:
              // Bad Request (e.g., Google-linked account, validation errors)
              this.toastr.error(error.error.message || 'Bad request');
              break;
            case 401:
              // Unauthorized (e.g., invalid credentials)
              this.toastr.error('Unauthorized access. Please check your login credentials.');
              this.router.navigate(['/login']);
              break;
            case 404:
              // Not Found (e.g., user not registered)
              this.toastr.error('Account not found. Please register.');
              break;
            case 500:
              // Server error (e.g., internal server issues)
              this.toastr.error('Internal server error. Please try again later.');
              break;
            default:
              // Generic error handler for other status codes
              this.toastr.error('An unexpected error occurred.');
              break;
          }
        }

        // Rethrow the error so that any component that subscribed to this request can also handle it
        return throwError(error);
      })
    );
  }
}
