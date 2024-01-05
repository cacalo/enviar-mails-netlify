import { Component, WritableSignal, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  exito:WritableSignal<boolean|undefined> = signal(undefined);;
  cargando= signal(false);

  form = {
    nombre: '',
    email: '',
    asunto: '',
    mensaje: '',
  };

  async enviarMensaje(event: SubmitEvent) {
    event.preventDefault();
    this.cargando.set(true);
    const res = await fetch("/.netlify/functions/formularioContacto", {
      method: "POST",
      headers: {
        "Content-Type" : "application/json"
      },
      body: JSON.stringify(this.form)
    })
    this.cargando.set(false);
    this.exito.set(res.ok);
  }
}
