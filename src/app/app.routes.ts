import { Routes } from '@angular/router';
import { Principal } from './principal/principal';
import { Cadastro } from './cadastro/cadastro';
import { Login } from './login/login';
import { Admin } from './admin/admin';

export const routes: Routes = [
    {
        path: '',
        component: Principal
    },
    {
        path: 'cadastro',
        component: Cadastro
    },
    {
        path: 'login',
        component: Login
    },
    {
        path: 'admin',
        component: Admin
    }
];
