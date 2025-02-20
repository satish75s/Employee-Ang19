import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { IApiResponse, IProject } from '../../model/interface/master';
import { MasterService } from '../../service/master.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-project',
  standalone: true,
  imports: [RouterLink,DatePipe],
  templateUrl: './project.component.html',
  styleUrl: './project.component.css'
})
export class ProjectComponent implements OnInit {

  projectList: IProject[]=[];
  masterSrv = inject(MasterService)
  router = inject(Router)
  chageDetection: any;

  ngOnInit(): void {
    this.getProjects();
  }

  getProjects() {
    this.masterSrv.getAllProjects().subscribe((Res: IProject[])=>{
      this.projectList =  Res;
    })
  }
  onEdit(id: number) {
    this.router.navigate(['new-project',id])
  }
  onDelete(id: number) {
    
    const isDelete = confirm("Are you sure want ot Delete");
        if(isDelete) {
          this.masterSrv.deleteProjById(id).subscribe((res:IApiResponse)=>{
            debugger;
            const index =  this.projectList.findIndex((m:IProject)=>m.projectId ==id);
            this.projectList.splice(index,1)
            this.chageDetection.detectChanges();
            alert("Project Deleted") 
          },error=>{
            alert('API Error')
          })
        }
  }
}
