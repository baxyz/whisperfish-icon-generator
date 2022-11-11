import { Component } from '@angular/core';
import { IconSettings } from './icon';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  settings: IconSettings = {
    BgTopLeft: true,
    BgTopRight: false,
    BgBottomLeft: true,
    BgBottomRight: false,
  };

  update<K extends keyof IconSettings>(key: K, value: IconSettings[K]) {
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
