import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ShoelaceModule } from 'shoelace-style-angular';
import { ShoelaceFormControlsModule } from 'shoelace-style-angular/form-controls';

import { AppComponent } from './app.component';
import { IconComponent } from './icon';

@NgModule({
  declarations: [AppComponent, IconComponent],
  imports: [BrowserModule, ShoelaceModule],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
