import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule} from '@angular/router';

import { GameComponent } from './rpsls/game/game.component';
import { LoginComponent } from './rpsls/login/login.component';

const appRoutes: Routes = [
    {
        path: '',
        component: LoginComponent,
    },
    {
        path: 'game/:name',
        component: GameComponent,
    }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);