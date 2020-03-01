import { Component, ViewChild, TemplateRef, NgZone, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.templates.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements AfterViewInit {
  // title = 'beagle-angular'
  // loadParams = {
  //   path: 'd803e59aadc5c3cc8def28553f17d61f/raw/b7918f950ae6a0fb763f34f5637c76f8309fac7a/beagle-example.json',
  // }
  //----
  // @ViewChild('teste1', { static: true }) tempTeste1: TemplateRef<any>
  // @ViewChild('teste2', { static: true }) tempTeste2: TemplateRef<any>
  // @ViewChild('teste3', { static: true }) tempTeste3: TemplateRef<any>
  // @ViewChild('teste4', { static: true }) tempTeste4: TemplateRef<any>
  // @ViewChild('teste5', { static: true }) tempTeste5: TemplateRef<any>
  // ctx = { numbers: [2,4,1] }

  // getTemplate(n) {
  //   const templates = [null, this.tempTeste1, this.tempTeste2, this.tempTeste3, this.tempTeste4, this.tempTeste5]
  //   return templates[n]
  // }
  //----

  @ViewChild('appCard', { static: true }) appCardTemplate: TemplateRef<any>
  @ViewChild('appForm', { static: true }) appFormTemplate: TemplateRef<any>
  @ViewChild('appContainer', { static: true }) appContainerTemplate: TemplateRef<any>
  @ViewChild('appInput', { static: true }) appInputTemplate: TemplateRef<any>

  constructor(private ngZone: NgZone) {}

  tree = {
    type: 'app-card',
    style: { margin: '50px' },
    children: [
      {
        type: 'app-form',
        url: 'https://webhook.site/59c13af0-f9cc-4a05-87d1-2630cb583be5',
        method: 'post',
        children: [
          {
            type: 'app-container',
            style: { padding: '50px' },
            children: [
              {
                type: 'app-input',
                name: "name",
                placeholder: "Nome",
                validations: ['required'],
              },
              {
                type: 'app-input',
                name: "name",
                placeholder: "E-mail",
                validations: ['required', 'email'],
              },
              {
                type: 'app-input',
                name: "age",
                placeholder: "Idade",
                validations: ['required', 'validateMajority'],
              }
            ]
          }
        ]
      }
    ]
  }

  getTemplate(type: string) {
    const templates = {
      'app-card': this.appCardTemplate,
      'app-form': this.appFormTemplate,
      'app-container': this.appContainerTemplate,
      'app-input': this.appInputTemplate,
    }
    return templates[type]
  }

  ngAfterViewInit() {
    setTimeout(() => this.ngZone.run(() => this.tree.children[0].children[0].children.push({
      type: 'app-input',
      name: "dynamic",
      placeholder: "Dynamic",
      validations: ['required'],
    })), 5000)
  }
}
