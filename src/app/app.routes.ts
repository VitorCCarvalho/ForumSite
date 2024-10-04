import { Routes } from '@angular/router';
import { ForumPageComponent } from './pages/forum-page/forum-page.component';
import { HomeComponent } from './pages/home/home.component';
import { FthreadPageComponent } from './pages/fthread-page/fthread-page.component';
import { NewThreadPageComponent } from './pages/new-thread-page/new-thread-page.component';

export const routes: Routes = [
    {path: '', component: HomeComponent},
    { path: 'forum-page', component: ForumPageComponent},
    { path: 'fthread-page', component: FthreadPageComponent},
    { path: 'new-thread-page', component: NewThreadPageComponent}
];
