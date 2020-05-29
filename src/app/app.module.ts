import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CardToDoComponent } from './LessonToDoJson/card-to-do/card-to-do.component';

@NgModule({
  declarations: [
    AppComponent,
    CardToDoComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
