import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { map, take } from 'rxjs';
import { AuthService } from '../../pages/auth/services/auth.service';


export const checkSessionGuard: CanActivateFn = (route, state) => {
  const authSvs = inject(AuthService);
  return authSvs.token$.pipe(
    take(1),
    map(token => {
      if (token) return true;

      //redirect a login
      inject(Router).createUrlTree(['/login']);
      return false;
    })
  )
};
