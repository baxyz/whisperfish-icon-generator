import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  devMode: boolean = false;

  etob(event: Event): boolean {
    const element = event.target as HTMLInputElement;
    if (
      element.type === 'checkbox' ||
      [true, false].includes(element.checked)
    ) {
      return element.checked;
    } else {
      return element.value !== 'false';
    }
  }

  etos(event: Event): string {
    return (event.target as HTMLInputElement).value;
  }

  eton(event: Event): number {
    return +(event.target as HTMLInputElement).value;
  }
}
