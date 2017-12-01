import { Component } from '@angular/core';
import { BoardService } from './services/board.service';
import { HumorService } from './services/humor.service';

import { FileUploader } from 'ng2-file-upload';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [BoardService, HumorService],
  
})
export class AppComponent {
  title = 'app';

}
