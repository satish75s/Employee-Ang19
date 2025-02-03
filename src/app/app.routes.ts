import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { LayoutComponent } from './pages/layout/layout.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { EmployeeComponent } from './pages/employee/employee.component';
import { ProjectComponent } from './pages/project/project.component';
import { ProjectEmployeeComponent } from './pages/project-employee/project-employee.component';
import { ProjectFormComponent } from './pages/project-form/project-form.component';
import { authGuard } from './guard/auth.guard';


export const routes: Routes = [

    {
        path:'',
        redirectTo: 'login',
        pathMatch:'full'
    },
    {
        path:'login',
        component:LoginComponent
    },
    {
        path:'',
        component:LayoutComponent,
       
        children:[
            {
                path:'dashboard',
                component:DashboardComponent,
                canActivate:[authGuard]
            },
            {
                path:'employee',
                component:EmployeeComponent,
                canActivate:[authGuard]
            },
            {
                path:'projects',
                component:ProjectComponent,
                canActivate:[authGuard]
            },
            {
                path:'new-project/:id',
                component:ProjectFormComponent,
                canActivate:[authGuard]
            },
            {
                path:'project-employee',
                component:ProjectEmployeeComponent,
                canActivate:[authGuard]
            }
        ]
    }

];
