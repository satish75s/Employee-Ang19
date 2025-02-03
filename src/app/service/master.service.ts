import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IApiResponse, IProject, IProjectEmployee } from '../model/interface/master';
import { Employee } from '../model/class/Employee';
import cors from "cors";

@Injectable({
  providedIn: 'root'
})




export class MasterService {



 // apiUrl: string = 'https://projectapi.gerasim.in/api/EmployeeManagement/';
 apiUrl: string = 'http://localhost:8080/';

  constructor(private http: HttpClient) { }


  getAllDept(): Observable<IApiResponse> {
    return this.http.get<IApiResponse>(this.apiUrl + "department");
  }
  getChildDeptById(deptid: number): Observable<IApiResponse> {
    debugger;
    return this.http.get<IApiResponse> (this.apiUrl + "department/subDeptByParentId/"+deptid);
  }
 
  saveEmp(obj: Employee): Observable<IApiResponse> {
    debugger;
    return this.http.post<IApiResponse>(this.apiUrl + "emp", obj);
  }
  getAllEmp(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.apiUrl + "emp");
  }

  updateEmp(obj: Employee): Observable<IApiResponse> {
    debugger;
    return this.http.put<IApiResponse>(this.apiUrl + "emp?empId=" + obj.employeeId, obj);
  }

  deleteEmpById(id: number): Observable<IApiResponse> {
    debugger;
    return this.http.delete<IApiResponse>(this.apiUrl + "DeleteEmployee/" +id);
  }

  saveProject(obj: Employee): Observable<IProject> {
    debugger;
    return this.http.post<IProject>(this.apiUrl + "project", obj);
  }
  updateProject(obj: IProject): Observable<IProject> {
    debugger;
    return this.http.put<IProject>(this.apiUrl + "project?projectId="+obj.projectId, obj);
  }

  getAllProjects(): Observable<IProject[]> {
    return this.http.get<IProject[]>(this.apiUrl + "project");
  }

  getRppjectById(id: number): Observable<IProject> {
    return this.http.get<IProject>(this.apiUrl + "project/"+id);
  }

  getProjectEmp(): Observable<IProjectEmployee[]> {
    return this.http.get<IProjectEmployee[]>(this.apiUrl + "project-emp-map");
  }
 
  saveProjectEmp(obj: IProjectEmployee): Observable<IProject> {
    debugger;
    return this.http.post<IProject>(this.apiUrl + "project-emp-map", obj);
  } 
  updateProjectEmp(obj: IProjectEmployee): Observable<IProjectEmployee> {
    debugger;
    return this.http.put<IProjectEmployee>(this.apiUrl + "project-emp-map?empProjectId="+obj.empProjectId, obj);
  }

  getDashbvaordData(): Observable<any> {
    return this.http.get<any>(this.apiUrl + "project-emp-map/GetDashboard");
  }

 
}
