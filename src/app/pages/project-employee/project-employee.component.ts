import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IApiResponse, IProject, IProjectEmployee } from '../../model/interface/master';
import { MasterService } from '../../service/master.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { Employee } from '../../model/class/Employee';
import { AsyncPipe, CommonModule } from '@angular/common';

@Component({
  selector: 'app-project-employee',
  standalone: true,
  imports: [ReactiveFormsModule,AsyncPipe,CommonModule],
  templateUrl: './project-employee.component.html',
  styleUrl: './project-employee.component.css'
})
export class ProjectEmployeeComponent implements OnInit {

  projectEmployeeList = signal<IProjectEmployee[]>([]);
  masterSrv = inject(MasterService)
  form: FormGroup = new FormGroup({})
  projectList$ : Observable<IProject[]> = new Observable<IProject[]>;
  EmpList$ : Observable<Employee[]> = new Observable<Employee[]>;
  chageDetection: any;
  isEditMode = false; // Track if the form is in edit mode
  constructor() {
    this.initializeForm();
    this.projectList$ = this.masterSrv.getAllProjects();
    this.EmpList$ = this.masterSrv.getAllEmp();
  }

  ngOnInit(): void {
    this.getAllData();
  }

  initializeForm() {
    this.form = new FormGroup({
      empProjectId: new FormControl(0),
      projectId: new FormControl(0),
      empId: new FormControl(0),
      assignedDate: new FormControl(''),
      role: new FormControl(''),
      isActive: new FormControl(false),
    })
  }

  onDelete(id: number) {
    const isDelete = confirm("Are you sure want ot Delete");
    if(isDelete) {
      this.masterSrv.deleteProjectEmpMapById(id).subscribe((res: IApiResponse) => {
        this.getAllData();
        this.chageDetection.detectChanges();
        alert("Employee Deleted");
        
      }, error => {
        alert('API Error');
      });
    }
  }
  
/*  onUpdate(empProjectId:number){
    alert("yet to implement code") 
  }*/
    onCancel() {
      this.isEditMode = false; // Reset edit mode
      this.form.reset(); // Clear the form
    }

  onUpdate(item: IProjectEmployee) {
    this.isEditMode = true; // Set edit mode to true
    this.form.patchValue({
      empProjectId: item.empProjectId,
      projectId: item.projectId,
      empId: item.empId,
      assignedDate: item.assignedDate,
      role: item.role,
      isActive: item.isActive,
    });
  }
  getAllData() {
    this.masterSrv.getProjectEmp().subscribe((Res: IProjectEmployee[]) => {
      this.projectEmployeeList.set(Res)
    })
  }
  onSave() {
    const formVlaue = this.form.value;
    this.masterSrv.saveProjectEmp(formVlaue).subscribe((res:IProject)=>{
      debugger;
      alert("Employee Added to Project Created") 
      this.getAllData();
      this.isEditMode = false;
     this.form.reset();
    },error=>{
      alert('API Error')
    })
  }
}
