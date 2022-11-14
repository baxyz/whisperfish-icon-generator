import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FileSaverModule } from 'ngx-filesaver';
import { ShoelaceModule } from 'shoelace-style-angular';

import { AppComponent } from './app.component';
import { IconComponent } from './icon';

@NgModule({
  declarations: [AppComponent, IconComponent],
  imports: [BrowserModule, ShoelaceModule, FileSaverModule],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
