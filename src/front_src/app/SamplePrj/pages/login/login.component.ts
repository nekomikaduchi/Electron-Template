import { Component, OnInit } from '@angular/core';
import { Auth } from 'aws-amplify';
import { CustomApiService } from '../../../shared/service/customApi.service';
import { ElectronService } from '../../../shared/service/electron.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  services: any;

  constructor(
    private eleService: ElectronService,
    private apiService: CustomApiService
  ) {
    this.services = {
      async handleSignIn(formData: Record<string, any>) {
        let { username, password } = formData;
        return Auth.signIn({
          username,
          password,
        }).then(async function (res: any) {
          // ログインに成功したらEmailをElectronStoreに保存する
          eleService.saveLoginEmail(username);
          return res;
        });
      },
      async handleSignUp(formData: Record<string, any>) {
        let { username, password, attributes } = formData;
        return Auth.signUp({
          username,
          password,
          attributes,
        }).then(async function (res: any) {
          // Cognitoのユーザー作成が成功したら
          // DynamoDBにユーザーデータを作成する
          await apiService.CreateUser({
            id: res.userSub,
            mail: username,
            dispName: username,
            role: 1,
            spApiFlg: false,
            lineFlg: false,
          });

          return res;
        });
      },
    };
  }

  ngOnInit() {
    // Amplify UIのフィールドにデフォルト値を入れる方法が
    // 分からないので苦肉の策
    this.setEmail();
  }

  private setEmail = () => {
    let input: any = document.querySelector(
      'amplify-sign-in input[name="username"]'
    );
    if (input) {
      input.value = this.eleService.loginEmail;
    } else {
      setTimeout(() => {
        this.setEmail();
      }, 250);
    }
  };
}
