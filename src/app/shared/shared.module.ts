import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatChipsModule } from '@angular/material/chips';
import { MatMenuModule } from '@angular/material/menu';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatStepperModule } from '@angular/material/stepper';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';

import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { DepartmentPipe } from './pipes/department.pipe';
import { AnimalTypePipe } from './pipes/animal-type.pipe';
import { MatNativeDateModule } from '@angular/material/core';
import { ConfirmDeleteComponent } from './components/confirm-delete/confirm-delete.component';
import { ConfirmActionComponent } from './components/confirm-action/confirm-action.component';

import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { PageHeaderComponent } from './components/page-header/page-header.component';

@NgModule({
  declarations: [
    ToolbarComponent,
    ConfirmDeleteComponent,
    ConfirmActionComponent,
    DepartmentPipe,
    AnimalTypePipe,
    PageHeaderComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatGridListModule,
    MatRadioModule,
    MatSelectModule,
    MatToolbarModule,
    MatDialogModule,
    MatCardModule,
    MatTabsModule,
    MatExpansionModule,
    MatChipsModule,
    MatMenuModule,
    MatSlideToggleModule,
    MatProgressSpinnerModule,
    MatStepperModule,
    MatSnackBarModule,
    NgbAlertModule,
    NgxMaterialTimepickerModule,
  ],
  exports: [
    ToolbarComponent,
    ConfirmDeleteComponent,
    ConfirmActionComponent,
    PageHeaderComponent,
    DepartmentPipe,
    AnimalTypePipe,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatGridListModule,
    MatRadioModule,
    MatSelectModule,
    MatToolbarModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCardModule,
    MatTabsModule,
    MatExpansionModule,
    MatChipsModule,
    MatStepperModule,
    MatSlideToggleModule,
    MatMenuModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    NgbAlertModule,
    NgxMaterialTimepickerModule,
  ],
})
export class SharedModule {}
