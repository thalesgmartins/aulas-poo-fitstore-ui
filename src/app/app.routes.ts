import { Routes } from '@angular/router';
import { Principal } from './principal/principal';
import { Cadastro } from './cadastro/cadastro';
import { Login } from './login/login';

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
    }
];
