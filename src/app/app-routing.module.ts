import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BlogsComponent } from './pages/blogs/blogs.component';

import { AdminComponent } from './admin/admin.component';
import { AdminBlogsComponent } from './admin/admin-blogs/admin-blogs.component';
import { AdminCategoryComponent } from './admin/admin-category/admin-category.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'blogs' },
  { path: 'blogs', component: BlogsComponent },
  { path: 'admin', pathMatch: 'full', redirectTo: 'admin/blog' },
  {
    path: 'admin', component: AdminComponent, children: [
      { path: 'category', component: AdminCategoryComponent },
      { path: 'blog', component: AdminBlogsComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
