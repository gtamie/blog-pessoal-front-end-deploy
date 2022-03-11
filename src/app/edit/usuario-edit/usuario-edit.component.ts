import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from 'src/app/model/Usuario';
import { AlertasService } from 'src/app/service/alertas.service';
import { AuthService } from 'src/app/service/auth.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-usuario-edit',
  templateUrl: './usuario-edit.component.html',
  styleUrls: ['./usuario-edit.component.css']
})
export class UsuarioEditComponent implements OnInit {

  usuario: Usuario = new Usuario()
  idUsuario: number
  confirmarSenha: string
  tipoUser: string

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private alertas: AlertasService
  ) { }

  ngOnInit() {
    window.scroll(0,0)

    if(environment.token == ''){
      this.router.navigate(['/entrar'])
    }

    this.idUsuario = this.route.snapshot.params['id']
    this.findByIdUsuario(this.idUsuario)
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

  confirmSenha(event: any) {
    this.confirmarSenha = event.target.value
  }

  
  tipoUsuario(event: any) {
    this.tipoUser = event.target.value
  }

  atualizar(){ 
    
    this.usuario.tipo = this.tipoUser

    if (this.usuario.senha != this.confirmarSenha) {
      alert("As senhas estão diferentes.")
    } else {
      this.authService.atualizar(this.usuario).subscribe((resp: Usuario) => {
        this.usuario = resp
        this.router.navigate(['/inicio'])
        this.alertas.showAlertSuccess("Usuário atualizado com sucesso! Faça o login novamente.")
        environment.token = ''
        environment.nome = ''
        environment.foto = ''
        environment.id = 0

        this.router.navigate(['/entrar'])
      })
    }
  }

  findByIdUsuario(id: number){
    this.authService.getByIdUsuario(id).subscribe((resp: Usuario)=>{
      this.usuario = resp
    })
  }

}
