import { Routes } from '@angular/router';
import { HomePage } from './pages/home/home.page';
import { LoginPage } from './pages/login/login.page';
import { ProductionPage } from './pages/production/production.page';
import { CommunityPage } from './pages/community/community.page';
import { MaterialPage } from './pages/material/material.page';
import { ProfilePage } from './pages/profile/profile.page';
import { EditProfilePage } from './pages/edit-profile/edit-profile.page';
import { EditProductionsPage } from './pages/edit-productions/edit-productions.page';


export const routes: Routes = [ 
    { path: "", redirectTo: "home", pathMatch: "full" },
    { path: "home", component: HomePage },
    { path: "production", component: ProductionPage },
    { path: "community", component: CommunityPage },
    { path: "login", component: LoginPage },
    { path: "material/:id", component: MaterialPage },
    { path: "profile/:id", component: ProfilePage },
    { path: "edit-profile", component: EditProfilePage},
    { path: "edit-productions", component: EditProductionsPage}
];
