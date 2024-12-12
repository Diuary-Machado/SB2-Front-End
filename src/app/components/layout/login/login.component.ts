import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { LoginService } from '../../../auth/login.service';
import { Login } from '../../../auth/login';
import { ClienteService } from '../../../services/cliente/cliente.service';
import Swal from 'sweetalert2';
import { Cliente } from '../../../models/cliente/cliente';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, MdbFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})

export class LoginComponent {
  
  login = new Login();
  cliente: Cliente = new Cliente(1,'Nome do Cliente','123.456.789-00','cliente@email.com','senhaDoCliente');

  router = inject(Router);
  loginService = inject(LoginService);
  clienteService = inject(ClienteService);

  constructor(){
    this.loginService.removerToken();
  }

  logar() {
    this.loginService.logar(this.login).subscribe({
      next: token => { 
        if (token) {
          // Adiciona o token ao localStorage
          this.loginService.addToken(token);
          console.log('Login bem-sucedido! Token armazenado:', token);
  
          // Redireciona automaticamente para a rota do admin
          this.router.navigate(['/admin/dashboard']);
        }
      },
      error: erro => {
        // Exibe um alerta de erro ao usuário
        console.error('Erro ao fazer login:', erro);
        Swal.fire({
          title: 'Erro',
          text: 'Usuário ou senha incorretos',
          icon: 'error',
          confirmButtonText: 'Ok'
        });
      }
    });
  }
    //   error: erro => {
    //     Swal.fire({
    //       title: erro.error ? erro.error.toString()  : erro.message.toString(),
    //       icon: 'error',
    //       confirmButtonText: 'Ok'
    //     });
    //   }
    // });
  // }
}