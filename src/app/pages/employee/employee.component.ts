import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { MasterService } from '../../service/master.service';
import { IApiResponse, IChildDept, IParentDept } from '../../model/interface/master';
import { FormsModule } from '@angular/forms';
import { Employee } from '../../model/class/Employee';
import { map, Observable, Subscription } from 'rxjs';
import { AsyncPipe, CommonModule } from '@angular/common';

@Component({
  selector: 'app-employee',
  standalone: true,
  imports: [FormsModule, AsyncPipe, CommonModule],
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmployeeComponent implements OnInit, OnDestroy {
  isFormVisiable = signal<boolean>(false);
  masterSrv = inject(MasterService);
  parentDept$ : Observable<IParentDept[]> = new Observable<IParentDept[]>();
  employeeList : Employee[] = [];
  childDeptList = signal<IChildDept[]>([]);
  isLoader = signal<boolean>(true);
  isApiCallInProgress = signal<boolean>(false);
  parentDeptId: number = 0;
  employeeObj: Employee = new Employee();
  subscriptionList: Subscription[] = [];
employeeName: any;
contactNo: any;
emailId: any;

  constructor(private changeDetection: ChangeDetectorRef) {
    this.parentDept$ = this.masterSrv.getAllDept().pipe(
      map((data: IApiResponse) => {
        return data.data;
      })
    );
  }

  ngOnInit(): void {
    this.getEmployees();
  }

  getEmployees() {
    this.subscriptionList.push(this.masterSrv.getAllEmp().subscribe((res: Employee[]) => {
      this.employeeList = res;
      this.changeDetection.detectChanges();
      this.isLoader.set(false);
    }));
  }

  onParentDeptChange() {
    console.log("Parent Department Changed: ", this.parentDeptId); // Debugging the parent department change
  alert("test"+this.parentDeptId);
    this.masterSrv.getChildDeptById(this.parentDeptId).subscribe((res: IApiResponse) => {
      console.log("Child Department Response: ", res); // Log the API response
  
      // Ensure res.data is an array
      if (Array.isArray(res.data)) {
        this.childDeptList.set(res.data); // Update the childDeptList signal
      } else {
        console.error("Invalid child department data:", res.data);
      }
    }, error => {
      console.error("Error fetching child departments:", error);
      alert('Failed to fetch child departments');
    });
  }
  

  onSave() {
    if (this.isApiCallInProgress() === false) {
      this.isApiCallInProgress.set(true);
     // alert("parentDeptId***="+this.parentDeptId);
     // alert("subDeptId***="+this.employeeObj.subDeptId);
      this.employeeObj.subDeptId=2
      this.masterSrv.saveEmp(this.employeeObj).subscribe((res: IApiResponse) => {
        alert('Employee Created');
        this.getEmployees();
        this.isApiCallInProgress.set(false);
        this.employeeObj = new Employee();
      }, error => {
        this.isApiCallInProgress.set(false);
        this.showError('Error while creating employee');
      });
    }
  }

  onEdit(data: Employee) {
    this.employeeObj = data;
    alert("deptid="+data.deptId);
    alert("subId="+data.subDeptId);
    
    this.isFormVisiable.set(true);
  }

  onUpdate() {
    this.masterSrv.updateEmp(this.employeeObj).subscribe((res: IApiResponse) => {
      alert('Employee Updated');
      this.getEmployees();
      this.employeeObj = new Employee();
    }, error => {
      this.showError('Error while updating employee');
    });
  }

  onDelete(id: number) {
    const isDelete = confirm('Are you sure you want to delete?');
    if (isDelete) {
      this.masterSrv.deleteEmpById(id).subscribe((res: IApiResponse) => {
        const index = this.employeeList.findIndex((m: Employee) => m.employeeId === id);
        if (index !== -1) {
          this.employeeList.splice(index, 1);
          this.changeDetection.detectChanges();
        }
        alert('Employee Deleted');
      }, error => {
        this.showError('Error while deleting employee');
      });
    }
  }

  ngOnDestroy(): void {
    this.subscriptionList.forEach((sub: Subscription) => {
      sub.unsubscribe();
    });
  }

  private showError(message: string) {
    alert(message);
  }
}
