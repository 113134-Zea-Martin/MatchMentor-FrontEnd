import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const roleGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  // Si usas AuthService para obtener el rol, descomenta la siguiente línea:
  // const authService = inject(AuthService);

  const expectedRoles: string[] = route.data['roles'];
  const userRole = localStorage.getItem('userRole');
  // O si usas AuthService: const userRole = authService.getUserRole();

  if (userRole && expectedRoles.includes(userRole)) {
    return true;
  } else {
    router.navigate(['/home']); // o la ruta que prefieras
    return false;
  }
};