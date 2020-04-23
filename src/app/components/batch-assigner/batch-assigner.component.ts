import { CommonModule } from '@angular/common';
import { Component, NgModule, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { BatchAssignerService } from '../../services/batch-assigner.service';
import { LotteryService } from '../../services/lottery.service';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-batch-assigner',
  templateUrl: './batch-assigner.component.html',
  styleUrls: ['./batch-assigner.component.scss'],
})
export class BatchAssignerComponent implements OnInit {
  taskForm = this.formBuilder.group({
    tasks: ['', { updateOn: 'blur' }],
  });

  constructor(
    private formBuilder: FormBuilder,
    public lotteryService: LotteryService,
    public batchAssignerService: BatchAssignerService
  ) {}

  ngOnInit() {
    this.batchAssignerService.activeTasks$.subscribe((list) => {
      this.taskForm.patchValue({
        tasks: list,
      });
    });

    this.taskForm.controls.tasks.valueChanges
      .pipe(debounceTime(100))
      .subscribe((value) => {
        this.batchAssignerService.updateTasks(value);
      });
  }
}

// If the component needs imports from other modules, for example ngfor:

// Angular recognizes the imports of this NgModule in the same file of the component and automatically bundles them up.
// But, this will not work with providers... For that the module needs to be loaded:

@NgModule({
  imports: [CommonModule, ReactiveFormsModule],
  declarations: [BatchAssignerComponent],
})
export class BatchAssignerModule {}
