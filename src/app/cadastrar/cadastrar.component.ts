import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from '../model/Usuario';
import { AlertasService } from '../service/alertas.service';
import { AuthService } from '../service/auth.service';


@Component({
  selector: 'app-cadastrar',
  templateUrl: './cadastrar.component.html',
  styleUrls: ['./cadastrar.component.css']
})
export class CadastrarComponent implements OnInit {

  usuario: Usuario = new Usuario
  confirmarSenha: string
  tipoUser: string

  constructor(
    private authService: AuthService,
    private router: Router,
    private alertas: AlertasService
    
  ) { }

  ngOnInit() {
    window.scroll(0, 0)
  }

  confirmSenha(event: any) {
    this.confirmarSenha = event.target.value
  }

  tipoUsuario(event: any) {
    this.tipoUser = event.target.value
  }

  validarNome() {

    let txtNome = <HTMLSelectElement>document.querySelector('#alertaNome')
    let nome = (<HTMLSelectElement>document.querySelector('#nome')).value.length

    if (nome < 2) {
      txtNome.innerHTML = "Nome inválido"
      txtNome.style.color = 'red'

    } else {
      txtNome.innerHTML = "Nome válido"
      txtNome.style.color = 'green'
    }

  }

  validarEmail() {
    let email = <HTMLSelectElement>document.querySelector('#usuario')
    let txtEmail = <HTMLSelectElement>document.querySelector('#alertaEmail')
    let usuario = email.value.substring(0, email.value.indexOf("@"));
    let dominio = email.value.substring(email.value.indexOf("@") + 1, email.value.length);

    if ((usuario.length >= 1) &&
      (dominio.length >= 3) &&
      (usuario.search("@") == -1) &&
      (dominio.search("@") == -1) &&
      (usuario.search(" ") == -1) &&
      (dominio.search(" ") == -1) &&
      (dominio.search(".") != -1) &&
      (dominio.indexOf(".") >= 1) &&
      (dominio.lastIndexOf(".") < dominio.length - 1)) {
      txtEmail.innerHTML = "E-mail válido"
      txtEmail.style.color = 'green'

    }else {
      txtEmail.innerHTML = "E-mail inválido"
      txtEmail.style.color = 'red'

    }
  }
  
  validarSenha() {
    let txtSenha = <HTMLSelectElement>document.querySelector('#alertaSenha')
    let senha = (<HTMLSelectElement>document.querySelector('#senha')).value.length
    if (senha < 8) {
      txtSenha.innerHTML = "A senha deve conter no mínimo 8 dígitos"
      txtSenha.style.color = 'red'

    } else {
      txtSenha.innerHTML = "Senha válida"
      txtSenha.style.color = 'green'
    }
  }
  
  

  cadastrar() {

    this.usuario.tipo = this.tipoUser

    if (this.usuario.senha != this.confirmarSenha) {
      this.alertas.showAlertDanger("As senhas estão diferentes.")
    } else {
      this.authService.cadastrar(this.usuario).subscribe((resp: Usuario) => {
        this.usuario = resp
        this.router.navigate(['/entrar'])
        this.alertas.showAlertSuccess("Usuário cadastrado com sucesso!")
      })
    }
  }


}
