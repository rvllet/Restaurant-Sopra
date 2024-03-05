import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserService } from '../services/user.service';
export const isAdminGuard: CanActivateFn = (route, state) => {

  const usersService = inject(UserService);
  const router = inject(Router);


  if(usersService.getRole() != 'chef'){
    return router.createUrlTree(['/welcome']);
  }
  return true;
};

