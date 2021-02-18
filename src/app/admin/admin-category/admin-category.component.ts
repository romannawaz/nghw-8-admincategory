import { Component, OnInit, TemplateRef } from '@angular/core';
import { CategoryService } from 'src/app/shared/services/category.service';

// Boostrap Modal
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ICategory } from 'src/app/shared/interfaces/category.interface';
import { Category } from 'src/app/shared/model/category.model';

@Component({
  selector: 'app-admin-category',
  templateUrl: './admin-category.component.html',
  styleUrls: ['./admin-category.component.scss']
})
export class AdminCategoryComponent implements OnInit {

  modalRef: BsModalRef;

  constructor(
    private modalService: BsModalService,
    private categoryService: CategoryService
  ) { }

  CATEGORIES: ICategory[] = [];

  search: string;

  category: string;

  editCategoryID: number | string;
  editStatus: boolean;

  ngOnInit(): void {
    this.getAdminCategories();
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  getAdminCategories(): void {
    this.categoryService.getJSONCategories()
      .subscribe(
        data => {
          this.CATEGORIES = data;
        }
      )
  }

  addCategory(): void {
    if (this.category) {
      let newCategory = new Category(this.category);

      if (!this.editStatus) {
        this.categoryService.postJSONCategory(newCategory)
          .subscribe(
            () => {
              this.getAdminCategories();
            }
          );

      }
      else {
        newCategory.id = this.editCategoryID;

        this.categoryService.putJSONCategory(newCategory)
          .subscribe(
            () => {
              this.getAdminCategories();
            }
          );

        this.editStatus = false;
        this.editCategoryID = null;
      }

      this.modalRef.hide();
      this.category = null;
    }
  }

  editCategory(category: ICategory): void {
    this.category = category.name;

    this.editStatus = true;
    this.editCategoryID = category.id;
  }

  deleteCategory(category: ICategory): void {
    this.categoryService.deleteJSONCategory(category.id)
      .subscribe(
        () => {
          this.getAdminCategories();
        }
      );
  }

}
