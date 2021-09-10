import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {logger} from "codelyzer/util/logger";
import {Observable} from "rxjs";
import {MyValidators} from "./MyValidators";


@Component({
  selector: 'app-one',
  templateUrl: './one.component.html',
  styleUrls: ['./one.component.scss']
})
export class OneComponent implements OnInit {

form: FormGroup



  selectedFrameworks = 3;
  frameworks = [
    {id: 1, name: 'Angular.js'},
    {id: 2, name: 'React.js'},
    {id: 3, name: 'Vue.js'},
  ];

  frameworkVersion = {
    angular: ['1.1.1', '1.2.1', '1.3.3'],
    react: ['2.1.2', '3.2.4', '4.3.1'],
    vue: ['3.3.1', '5.2.1', '5.1.3'],
  };

  version = '1.1.1';
  versions = [];

  selectedCompanies;
  companies: any[] = [];
  companiesNames = ['Tennis', 'Football', 'Games', 'Food', 'YouTube', 'Films', 'Serials', 'Pets', 'Girls'];

  constructor( ) {
  }

  ngOnInit(){

    this.form = new FormGroup({
      userName: new FormControl('',[
        Validators.required,
        Validators.minLength(2)
      ]),
      userLastName: new FormControl('',[
        Validators.required,
        Validators.minLength(3)
      ]),
      birthday: new FormControl('',Validators.required),
      framework: new FormControl(null,Validators.required),
      frameworkVersion: new FormControl(null,Validators.required),
      email: new FormControl('',[
        Validators.email,
        Validators.required,
        MyValidators.restrictedEmails
      ], MyValidators.uniqEmail),
      hobbies: new FormControl('',
        Validators.required)
    })


    this.companiesNames.forEach((c, i) => {
      this.companies.push({id: i, name: c});
    });
  }

  submit() {
    console.log('Form submited: ', this.form)
    const formData = {...this.form.value}
    this.form.reset()
  }


  onSetFramework(event) {
    if (event.id === 1) {
      this.versions = this.frameworkVersion.angular
    } else if (event.id === 2) {
      this.versions = this.frameworkVersion.react
    } else {
      this.versions = this.frameworkVersion.vue
    }
    this.version = null;
  }


  addTagFn(name) {
    return {name: name, tag: true};
  }

};
