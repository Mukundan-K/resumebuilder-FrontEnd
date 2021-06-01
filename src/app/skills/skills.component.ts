import { Component, OnInit } from '@angular/core';
import {FormBuilder} from '@angular/forms';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css']
})
export class SkillsComponent implements OnInit {

    skilldetails={ 
        skill1:'',
        level1:'',
        skill2:'',
        level2:'',
        skill3:'',
        level3:'',
        skill4:'',
        level4:'',
        skill5:'',
        level5:''
    }

  constructor(private fb : FormBuilder) { }

  ngOnInit(): void {  }
  skillform= this.fb.group(
    { 
        skill1:[''],
        level1:[''],
        skill2:[''],
        level2:[''],
        skill3:[''],
        level3:[''],
        skill4:[''],
        level4:[''],
        skill5:[''],
        level5:['']
    }
  );

  addskill(){
        localStorage.setItem('skill',JSON.stringify(this.skilldetails));
        document.getElementById('saved').innerHTML="<div class=alert&#32;alert-primary&#32;col-md-3 role=alert> Saved! </div>"
  }
}
