import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { OpenAIApi, Configuration } from "openai";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'ngOpenAIDemo';
  contentData: any[] = [];
  editableFiled = new FormControl('')
  configuration = new Configuration({
    apiKey: "Enter your OpenAI API Key Over here",
  });

  openai = new OpenAIApi(this.configuration);
  response: any;

  constructor(private spinner: NgxSpinnerService) {

  }

  ngOnInit(): void {

  }

  public async openAIResponse(prompt: any) {
    this.spinner.show();
    this.response = await this.openai.createImage({
      prompt: prompt, //user entered input text will store here.
      n: 2, //number of images that are we expecting from OpenAI API.
      size: '512x512' //size of image that are we expecting from OpenAI API.
    }).then(x => {
      this.spinner.hide();
      this.contentData = x.data.data;
      console.log('x: ', x.data);
      if (this.editableFiled.value) {
        this.editableFiled.reset();
      }
    }).catch(y => {
      console.log('y: ', y);

    });
  }
  callOpenAI() {
    if (this.contentData.length > 0) {
      this.contentData = [];
    }
    this.openAIResponse(this.editableFiled.value); //getting the userinput value and pass to the function
  }
}