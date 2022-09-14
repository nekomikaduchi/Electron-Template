import { Component, OnInit } from '@angular/core';
import { ElectronService } from 'src/front_src/app/shared/service/electron.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(private eleService: ElectronService) {}

  async ngOnInit() {
    const message = await this.eleService.sendTestMessage('メッセージ');

    if (message) {
      // this.eleService.openExternalLink(`https://www.google.com?q=${message}`);
    }
  }
}
