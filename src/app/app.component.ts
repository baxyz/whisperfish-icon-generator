import { Component } from '@angular/core';
import { ClrTimelineLayout, ClrTimelineStepState } from '@clr/angular';

interface Settings {
  BgTopLeft: boolean;
  BgTopRight: boolean;
  BgBottomLeft: boolean;
  BgBottomRight: boolean;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  readonly Layout = ClrTimelineLayout;
  readonly State = ClrTimelineStepState;

  settings: Settings = {
    BgTopLeft: true,
    BgTopRight: false,
    BgBottomLeft: true,
    BgBottomRight: false,
  };

  update<K extends keyof Settings>(key: K, value: Settings[K]) {
    this.settings[key] = value;

    console.log(JSON.stringify(this.settings));
  }

  etob(event: Event): boolean {
    const element = event.target as HTMLInputElement;
    if (element.type === 'checkbox') {
      return element.checked;
    } else {
      return element.value !== 'false';
    }
  }
}
