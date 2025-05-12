import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserResponseDTO } from '../../models/user-response-dto';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';
import { Form, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Datum, InterestResponse } from '../../models/interest-response';
import { ActivatedRoute, Router } from '@angular/router';
import { PostMercadoPagoAuthResponse } from '../../models/post-create-mp-dto';

declare var bootstrap: any; // Para interactuar con los modales de Bootstrap

@Component({
  selector: 'app-edit-profile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './edit-profile.component.html',
  styleUrl: './edit-profile.component.css'
})
export class EditProfileComponent implements OnInit, OnDestroy {

  code: string = '';

  //Obtener los valores desde la url
  getParamsFromUrl() {
    this.route.queryParams.subscribe(params => {
      this.code = params['code'];
      console.log('Código desde la URL:', this.code);
    });

    if(this.code) {
      this.userService.PostMercadoPagoAuth(localStorage.getItem('token')!, { code: this.code, userId: this.idProfile }).subscribe({
        next: (response: PostMercadoPagoAuthResponse) => {
          if (response) {
            console.log('Código de Mercado Pago guardado:', response);
            // this.message = 'Código de Mercado Pago guardado correctamente.';
            this.message = 'Cuenta asociada correctamente.';
            this.successModal = new bootstrap.Modal(document.getElementById('successModal'));
            this.successModal.show();
          } else {
            console.error('Error al guardar el código de Mercado Pago:', response);
          }
        },
        error: (error) => {
          console.error('Error al guardar el código de Mercado Pago:', error);
          this.message = 'Error con el servidor. Intente más tarde.';
          this.errorModal = new bootstrap.Modal(document.getElementById('errorModal'));
          this.errorModal.show();
        } 
      });
    }

  }

  // Método para abrir el link de Mercado Pago
  goMPAuth() {
    window.open(this.urlMercadoPago, '_blank');
  }

  urlMercadoPago!: string;
  isMPLoading: boolean = false;

  loadLinkMercadoPago() {
    this.isMPLoading = true; // Activar el indicador de carga
    const sub = this.userService.postMercadoPagoLink2(localStorage.getItem('token')!, { userId: this.idProfile }).subscribe({
      next: (response: string) => {
        if (response) {
          this.urlMercadoPago = response;
          console.log('URL de Mercado Pago:', this.urlMercadoPago);
          this.isMPLoading = false; // Desactivar el indicador de carga
          this.goMPAuth(); // Abrir el link de Mercado Pago
        } else {
          console.error('Error al cargar la URL de Mercado Pago:', response);
        }
      },
      error: (error) => {
        console.error('Error al cargar la URL de Mercado Pago:', error);
      }
    });
    this.subscriptions.push(sub);
  }


  today: String = new Date().toISOString().split('T')[0];

  constructor(private userService: UserService, private router:Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.idProfile = Number(localStorage.getItem('idProfile')); // Get the ID from local storage
    this.loadUserProfile();
    this.loadInterests(); // Load the interests when the component initializes
    this.filteredInterests = [...this.allInterest];
    this.getParamsFromUrl(); // Get the params from the URL
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => {
      subscription.unsubscribe();
    });
  }

  editProfileForm: FormGroup = new FormGroup({
    firstName: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
    lastName: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    // Validar que la fecha de nacimiento sea menor a la fecha actual
    birthDate: new FormControl('', [Validators.required, this.validateBirthDate]),
    location: new FormControl(''),
    educationLevel: new FormControl(''),
    studyArea: new FormControl(''),
    institution: new FormControl(''),
    graduationYear: new FormControl(null),
    mentoringGoals: new FormControl(''),
    currentProfession: new FormControl(''),
    company: new FormControl(''),
    yearsOfExperience: new FormControl(null, [Validators.min(0), Validators.max(30)]),
    professionalBio: new FormControl(''),
    hourlyRate: new FormControl(null, [Validators.required, Validators.min(0)]),
    isVisible: new FormControl(false),
    interests: new FormControl([]), // Initialize interests as an empty array
    role: new FormControl(''),
    linkedinUrl: new FormControl(''),
    bio: new FormControl(''),
    isActive: new FormControl(false),
  }); // Initialize the form group for editing the profile

  isStudentRole: boolean = false;
  isTutorRole: boolean = false;
  interestSearchQuery: string = '';
  filteredInterests: any[] = [];
  allInterest: Datum[] = [];
  message: string = '';
  successModal: any;
  errorModal: any;
  userResponseDTO?: UserResponseDTO;
  userProfileData?: UserResponseDTO['data'];
  idProfile: number = 0;
  subscriptions: Subscription[] = [];

  isLoading: boolean = false; // Variable para controlar el estado de carga

  loadUserProfile() {
    const sub = this.userService.getUserById(this.idProfile, localStorage.getItem('token')!).subscribe({
      next: (response: UserResponseDTO) => {
        if (response.success) {
          this.userResponseDTO = response;
          this.userProfileData = response.data;
          console.log('User profile loaded:', this.userProfileData);
        } else {
          console.error('Error loading user profile:', response.message);
        }
        this.getUserProfile();
      },
      error: (error) => {
        console.error('Error loading user profile:', error);
      }
    });
    this.subscriptions.push(sub);
  }

  loadInterests() {
    const sub = this.userService.getInterests(localStorage.getItem('token')!).subscribe({
      next: (response: InterestResponse) => {
        if (response.success) {
          this.allInterest = response.data;
          console.log('Interests loaded:', this.allInterest);
          this.filteredInterests = [...this.allInterest];
        } else {
          console.error('Error loading interests:', response.message);
        }
      },
      error: (error) => {
        console.error('Error loading interests:', error);
      }
    });
    this.subscriptions.push(sub);
  }

  onSubmit() {
    // Evita múltiples envíos y muestra el indicador de carga
    if (this.isLoading) return;

    this.isLoading = true; // Activar el indicador de carga

    if (this.editProfileForm.valid) {
      const formData = this.editProfileForm.value;
      console.log('Form data:', formData);
      this.userService.updateProfile(
        localStorage.getItem('token')!, this.idProfile, formData
      ).subscribe({
        next: (response: UserResponseDTO) => {
          if (response.success) {
            console.log('Profile updated successfully:', response);
            this.message = response.message;
            this.successModal = new bootstrap.Modal(document.getElementById('successModal'));
            this.successModal.show();
            setTimeout(() => {
              this.successModal.hide();
              window.location.href = '/home'; // Redirect to home after 2 seconds
            }, 2000);
          } else {
            console.error('Error updating profile else:', response.message);
            this.message = response.message;
            this.errorModal = new bootstrap.Modal(document.getElementById('errorModal'));
            this.errorModal.show();
          }
        },
        error: (error) => {
          this.message = 'Error con el servidor. Intente más tarde.';
          this.errorModal = new bootstrap.Modal(document.getElementById('errorModal'));
          this.errorModal.show();
        }
      });
    }
  }

  addInterest(interest: Datum) {
    const currentInterests = this.editProfileForm.get('interests')?.value || [];
    if (!currentInterests.includes(interest.name)) {
      this.editProfileForm.get('interests')?.setValue([...currentInterests, interest.name]);
    }
  }

  toggleInterest(interest: any, event: any): void {
    const isChecked = event.target.checked;
    const interests = [...this.editProfileForm.get('interests')?.value];

    if (isChecked) {
      if (!interests.includes(interest.name)) {
        interests.push(interest.name);
      }
    } else {
      const index = interests.indexOf(interest.name);
      if (index !== -1) {
        interests.splice(index, 1);
      }
    }

    this.editProfileForm.get('interests')?.setValue(interests);
  }

  removeInterest(interest: string): void {
    const interests = [...this.editProfileForm.get('interests')?.value];
    const index = interests.indexOf(interest);
    if (index !== -1) {
      interests.splice(index, 1);
      this.editProfileForm.get('interests')?.setValue(interests);
    }
  }

  onRoleChange(event: Event) {
    const selectedRole = (event.target as HTMLSelectElement).value;
    this.isStudentRole = selectedRole === 'STUDENT';
    this.isTutorRole = selectedRole === 'TUTOR';
  }

  navigateToHome() {
    window.location.href = '/home';
  }

  getUserProfile() {
    this.editProfileForm.patchValue({
      firstName: this.userProfileData?.firstName,
      lastName: this.userProfileData?.lastName,
      email: this.userProfileData?.email,
      birthDate: this.userProfileData?.birthDate,
      location: this.userProfileData?.location,
      educationLevel: this.userProfileData?.educationLevel,
      studyArea: this.userProfileData?.studyArea,
      institution: this.userProfileData?.institution,
      graduationYear: this.userProfileData?.graduationYear,
      mentoringGoals: this.userProfileData?.mentoringGoals,
      currentProfession: this.userProfileData?.currentProfession,
      company: this.userProfileData?.company,
      yearsOfExperience: this.userProfileData?.yearsOfExperience,
      professionalBio: this.userProfileData?.professionalBio,
      hourlyRate: this.userProfileData?.hourlyRate,
      isVisible: this.userProfileData?.isVisible,
      interests: this.userProfileData?.interests || [],
      role: this.userProfileData?.role,
      linkedinUrl: this.userProfileData?.linkedinUrl,
      bio: this.userProfileData?.bio,
      isActive: this.userProfileData?.isActive
    });

    if (this.userProfileData) {
      this.isStudentRole = this.userProfileData.role === 'STUDENT';
      this.isTutorRole = this.userProfileData.role === 'TUTOR';
    }
  }

  filterInterests(): void {
    if (!this.interestSearchQuery || this.interestSearchQuery.trim() === '') {
      this.filteredInterests = [...this.allInterest];
    } else {
      const query = this.normalizeText(this.interestSearchQuery.toLowerCase().trim());
      this.filteredInterests = this.allInterest.filter(
        interest => this.normalizeText(interest.name.toLowerCase()).includes(query)
      );
    }
  }

  private normalizeText(text: string): string {
    return text.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  }

  validateBirthDate(control: FormControl): { [key: string]: any } | null {
    if (!control.value) return null;

    const birthDate = new Date(control.value);
    const today = new Date();
    // const minAgeDate = new Date();
    // minAgeDate.setFullYear(today.getFullYear() - 18); // Debe ser mayor de 18 años

    return birthDate <= today ? null : { invalidDate: true };
  }
}
