import {
  AfterViewInit,
  Component,
  ElementRef,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { SlColorPicker } from '@shoelace-style/shoelace';
import { IconComponent } from './icon';
import { Settings } from './settings';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements AfterViewInit {
  @ViewChild('icon') icon!: IconComponent;

  devMode: boolean = false;

  constructor(readonly element: ElementRef, readonly renderer: Renderer2) {}

  ngAfterViewInit(): void {
    // Auto: Color pickers
    // Using only angular bindings in template is not enough due to refresh
    // issues. So we need to use the shoelace API to set the value.
    Array.from(this.element.nativeElement.querySelectorAll('sl-color-picker'))
      .map((element) => element as SlColorPicker)
      .forEach((picker) => {
        const key = picker.dataset['key'] as keyof Settings;
        picker.format = 'hex';
        picker.setColor(this.icon.settings[key] as string);
        picker.addEventListener('sl-change', (event) =>
          this.icon.change(key, this.etos(event))
        );
      });
  }

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

  setBackground(color1: string, color2: string): void {
    this.element.nativeElement
      .querySelector('sl-color-picker[data-key="backgroundColor1"]')
      .setColor(color1);
    this.element.nativeElement
      .querySelector('sl-color-picker[data-key="backgroundColor2"]')
      .setColor(color2);
  }

  download(): void {}
}
