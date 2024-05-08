import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { loggedUser } from '../../services/singletonuser.service';

@Component({
  selector: 'app-edit-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './edit-profile.page.html',
  styleUrl: './edit-profile.page.css'
})


export class EditProfilePage{
  constructor(private http : HttpClient, public userlog: loggedUser) { 
  }

  updateFollowing(username: string, id: string, description: string, photo: string){
    const url = "http://localhost:8080/api/users/updateProfile/" + id;
    this.http.put(url, { username: username, id: id, description: description, photo: photo}).subscribe({
      next: (response: any) => {
        console.log('following actualizado con éxito', response);
      },
      error: (error: any) => {
        console.error('Error al actualizar el usuario', error);
      }
    });
  }
  
  onSubmit() {
    const username = (document.getElementById('username') as HTMLInputElement).value;
    const description = (document.getElementById('description') as HTMLInputElement).value;
    const photo = (document.getElementById('photo') as HTMLInputElement).value;
    const id = this.userlog.getData()._id;
    
    this.updateFollowing(username, id, description, photo);
  }
}
