import { Component, OnInit } from '@angular/core';
import { IBlog } from 'src/app/shared/interfaces/blog.interface';
import { Blog } from 'src/app/shared/model/blog.model';
import { BlogService } from 'src/app/shared/services/blog.service';

@Component({
  selector: 'app-admin-blogs',
  templateUrl: './admin-blogs.component.html',
  styleUrls: ['./admin-blogs.component.scss']
})
export class AdminBlogsComponent implements OnInit {

  BLOGS: IBlog[] = [];

  blogTitle: string;
  blogText: string;
  blogAuthor: string;

  editBlogID: number | string;
  editStatus: boolean;

  constructor(
    private blogService: BlogService
  ) { }

  ngOnInit(): void {
    this.getAdminBlogs();
  }

  resetForm(): void {
    this.blogTitle = null;
    this.blogText = null;
    this.blogAuthor = null;
  }

  getAdminBlogs(): void {
    this.blogService.getJSONBlog()
      .subscribe(
        data => {
          this.BLOGS = data;
        }
      );
  }

  addBlog(): void {
    if (this.blogTitle && this.blogText && this.blogAuthor) {
      let newBlog = new Blog(this.blogTitle, this.blogText, new Date(), this.blogAuthor);

      if (!this.editStatus) {
        this.blogService.postJSONBlog(newBlog)
          .subscribe(
            () => {
              this.getAdminBlogs();
            },
            error => {
              console.log(error);
            }
          );
      }
      else {
        newBlog.id = this.editBlogID;

        this.blogService.putJSONBlog(newBlog)
          .subscribe(
            () => {
              this.getAdminBlogs();
            },
            error => {
              console.log(error);
            }
          );

        this.editStatus = false;
        this.editBlogID = null;
      }

      this.resetForm();
    }
  }

  editBlog(blog: IBlog): void {
    this.editStatus = true;
    this.editBlogID = blog.id;

    this.blogTitle = blog.title;
    this.blogText = blog.text;
    this.blogAuthor = blog.author;
  }

  deleteBlog(blog: IBlog): void {
    this.blogService.deleteJSONBlog(+blog.id)
      .subscribe(
        () => {
          this.getAdminBlogs();
        }
      );
  }

}
