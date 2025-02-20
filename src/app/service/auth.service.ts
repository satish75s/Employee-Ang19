import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  loadToken() {
    throw new Error('Method not implemented.');
  }
  constructor() {}

  getToken(): string | null {
    return localStorage.getItem('AccessToken'); // Assuming the token is stored in localStorage
  }

  

  getRoles(): string[] {
    const token = this.getToken();
    if (token) {
      const decodedToken: any = jwtDecode(token);
      return decodedToken.roles || []; // Assuming roles are stored in the 'roles' field of the token payload
    }
    return [];
  }

  hasRole(role: string): boolean {
    const roles = this.getRoles();
    console.log('Roles from token:', roles); // Debug: Log the roles array
  
    const roleNames = roles.map((roleObj: any) => roleObj.authority);
    console.log('Extracted role names:', roleNames); // Debug: Log the extracted role names
  
    const hasRole = roleNames.includes(role);
    console.log(`Has role '${role}':`, hasRole); // Debug: Log the result
  
    return hasRole;
  }
}