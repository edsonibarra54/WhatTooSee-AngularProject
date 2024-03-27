import { Routes } from '@angular/router';
import { HomePage } from './pages/home/home.page';
import { LoginPage } from './pages/login/login.page';
import { ProductionPage } from './pages/production/production.page';
import { CommunityPage } from './pages/community/community.page';

export const routes: Routes = [ 
    { path: "", redirectTo: "home", pathMatch: "full" },
    { path: "home", component: HomePage },
    { path: "production", component: ProductionPage },
    { path: "community", component: CommunityPage },
    { path: "login", component: LoginPage }
];
