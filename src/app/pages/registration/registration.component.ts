
import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';

import { MasterService } from '../../service/master.service';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, MatInputModule, MatButtonModule],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.css'
})
export class RegistrationComponent {
  registerForm: FormGroup;
  // Initialize registration form
  constructor(private fb: FormBuilder) {
  this.registerForm = this.fb.group({
    username: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    roles: [[], Validators.required],
  });
}
// Method to get the form data in the desired JSON format
getFormData() {
  const formData = this.registerForm.value;
  return {
    username: formData.username,
    email: formData.email,
    password: formData.password,
    roles: Array.isArray(formData.roles) ? formData.roles : [formData.roles]
  };
}
masterService=inject(MasterService);
onRegister() {
  if (this.registerForm.valid) {
    const registerData = this.getFormData(); 
    //alert("registerData: " + JSON.stringify(registerData)); // Debugging: Check the format of registerData

    this.masterService.registerNewUser(registerData).subscribe(
      (response: string) => {
        // alert(response || "Registration is successful");
        console.log('User registered successfully:', response);

        this.registerForm.reset();
      },
      (error: any) => {
        console.error('Error during registration:', error);
        alert('Registration failed. Please try again.');
      }
    );
  } else {
    console.log('Form is invalid');
  }
}
}
