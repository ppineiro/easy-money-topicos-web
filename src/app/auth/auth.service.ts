import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  TOKEN_KEY = 'token';

  private url = 'https://easymoneyapi.azurewebsites.net';
  // private url = 'http://localhost:8000';

  userToken: string;

  constructor(
    private http: HttpClient,
    private router: Router,
    public jwtHelper: JwtHelperService,
  ) {
    this.leerToken();
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['auth', 'login']);
  }

  login(email, password) {
    const authData = {
      email,
      password,
    };
    console.log(email);
    console.log(password);
    return this.http.post(`${this.url}/sessions`, authData).subscribe(
      resp => {
        this.guardarToken(resp['token']);
        Swal.fire({
          type: 'success',
          title: 'Autenticación exitosa!',
          showConfirmButton: false,
          timer: 1000,
        });

        this.router.navigateByUrl('/dashboard');
      },
      err => {
        Swal.fire({
          type: 'error',
          title: 'Correo y/o contraseña incorrecta',
        });
      },
    );
  }

  olvidoPass(xEmail: string) {
    const authData = {
      email: xEmail,
    };
    console.log(authData);
    return this.http
      .post(`${this.url}/users/forgotPassword`, authData, {
        responseType: 'text',
      })
      .subscribe(
        resp => {
          console.log(resp);
          Swal.fire({
            type: 'success',
            title: 'Listo! Le enviamos la nueva contraseña a su correo',
            showConfirmButton: true,
          });
          this.router.navigateByUrl('/auth/login');
        },
        err => {
          console.log(err);
          Swal.fire({
            type: 'error',
            title: 'Correo incorrecto',
          });
        },
      );
  }

  getUsuarioActualId(): string {
    const token = localStorage.getItem('token');
    return this.jwtHelper.decodeToken(token).id;
  }

  private guardarToken(xToken: string) {
    this.userToken = xToken;
    localStorage.setItem('token', xToken);
  }

  leerToken() {
    if (localStorage.getItem('token')) {
      this.userToken = localStorage.getItem('token');
    } else {
      this.userToken = '';
    }

    return this.userToken;
  }

  estaAutenticado(): boolean {
    const token = localStorage.getItem('token');

    return !this.jwtHelper.isTokenExpired(token);
  }

  registro(nombre, email, password, ubicacion) {
    const authData = {
      nombre,
      email,
      password,
      ubicacion,
    };

    return this.http.post(`${this.url}/users`, authData).subscribe(
      resp => {
        Swal.fire({
          type: 'success',
          title: 'Registro exitoso!',
          showConfirmButton: false,
          timer: 1000,
        });

        this.router.navigateByUrl('/auth/login');
      },
      err => {
        Swal.fire({
          type: 'error',
          title: 'Error. Por favor verifique los datos.',
        });
      },
    );
  }
}
