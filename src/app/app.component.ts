import {
  Component,
  ComponentFactoryResolver,
  OnInit,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { NgbPanelChangeEvent } from '@ng-bootstrap/ng-bootstrap';
import { debounceTime } from 'rxjs/operators';
import { LotteryService } from './services/lottery.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  @ViewChild('batchDesignerAnchor', { read: ViewContainerRef })
  batchDesignerAnchor: ViewContainerRef;

  private componentLoaded: boolean = false;

  lotteryForm = this.formBuilder.group({
    participants: ['', { updateOn: 'blur' }],
    previousWinners: ['', { updateOn: 'blur' }],
    lotteries: [''],
  });

  constructor(
    private formBuilder: FormBuilder,
    public lotteryService: LotteryService,
    // Lazy loading of component:
    private viewContainerRef: ViewContainerRef,
    private cfr: ComponentFactoryResolver // Lazy loading of module: // private compiler: Compiler, // private injector: Injector
  ) {}

  ngOnInit(): void {
    this.lotteryService.activeID$.subscribe((id) => {
      this.lotteryForm.patchValue({
        lotteries: id,
      });
    });

    this.lotteryForm.controls.lotteries.valueChanges.subscribe((id) => {
      this.lotteryService.setActiveLottery(id);
    });

    this.lotteryService.activeParticipants$.subscribe((list) => {
      this.lotteryForm.patchValue({
        participants: list,
      });
    });

    this.lotteryForm.controls.participants.valueChanges
      .pipe(debounceTime(100))
      .subscribe((value) => {
        this.lotteryService.updateParticipants(value);
      });

    this.lotteryService.activePreviousWinners$.subscribe((list) => {
      this.lotteryForm.patchValue({
        previousWinners: list,
      });
    });

    this.lotteryForm.controls.previousWinners.valueChanges
      .pipe(debounceTime(100))
      .subscribe((value) => {
        this.lotteryService.updatePreviousWinners(value);
      });
  }

  async lazyLoadBatchAssignerComponent(event: NgbPanelChangeEvent) {
    if (event.nextState) {
      if (this.componentLoaded) {
        return;
      }
      this.componentLoaded = true;

      // Lazy loading component works as long as no Module with providers is needed.
      // For other module imports, see the BatchAssignerComponent file

      // Lazy load the component:
      // this.batchDesignerAnchor.clear();
      const { BatchAssignerComponent } = await import(
        './components/batch-assigner/batch-assigner.component'
      );
      this.batchDesignerAnchor.createComponent(
        this.cfr.resolveComponentFactory(BatchAssignerComponent)
      );

      // It is also possible to lazy load a whole module.
      // const { BatchAssignerModule } = await import(
      //   './components/batch-assigner/batchAssigner.module'
      // );
      // const { BatchAssignerComponent } = await import(
      //   './components/batch-assigner/batch-assigner.component'
      // );

      // const moduleFactory =
      //   BatchAssignerModule instanceof NgModuleFactory
      //     ? BatchAssignerModule
      //     : await this.compiler.compileModuleAsync(BatchAssignerModule);
      // const moduleRef = moduleFactory.create(this.injector);
      // const componentFactory = moduleRef.componentFactoryResolver.resolveComponentFactory(
      //   BatchAssignerComponent
      // );
      // // this.batchDesignerAnchor.clear();
      // this.batchDesignerAnchor.createComponent(componentFactory);
    }
  }

  addLottery() {
    this.lotteryService.addLottery();
  }

  renameLottery() {
    this.lotteryService.renameLottery();
  }

  openFile($event) {
    const file: File = $event.target.files[0];
    const reader: FileReader = new FileReader();

    reader.onloadend = (event: any) => {
      // FileReaderProgressEvent type issue: https://github.com/Microsoft/TypeScript/issues/25510
      this.lotteryService.importState(JSON.parse(event.target.result));
    };

    reader.readAsText(file);
  }
}
