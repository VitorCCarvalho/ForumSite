import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { ForumPageComponent } from './pages/forum-page/forum-page.component';

export const routes: Routes = [
    {path: '', component: AppComponent},
    { path: 'forum-page', component: ForumPageComponent},
];
