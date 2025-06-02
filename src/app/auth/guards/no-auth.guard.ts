import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const noAuthGuard: CanActivateFn = (route, state) => {

  
    const authService = inject(AuthService);
    const router = inject(Router);

  if (authService.isAuthenticated()) {
      // Si el usuario ya está autenticado, redirigilo al home
    router.navigate(['/home'], { queryParams: { returnUrl: state.url } });
    return false;
  }

  return true;
};
