import { Component } from '@angular/core';
import {
  DEFAULT_SETTINGS,
  REPAINT_BACKGROUND_SHAPE_PROPERTIES,
  Settings,
} from '../settings';

@Component({
  selector: 'app-icon',
  templateUrl: './icon.component.svg',
  styleUrls: ['./icon.component.scss'],
})
export class IconComponent {
  /**
   * The settings of the icon.
   */
  private _settings: Settings = { ...DEFAULT_SETTINGS };

  /**
   * Public accessor for the settings.
   */
  public readonly settings: Readonly<Settings> = this._settings;

  /**
   * Simple setter for the settings.
   * This also allow to repaint some parts if needed.
   *
   * @param property The property to set.
   * @param value The value to set.
   */
  public change<P extends keyof Settings>(
    property: P,
    value: Settings[P]
  ): void {
    // Simply update the settings
    this._settings[property] = value;

    // Special case: repaint background shape
    if (REPAINT_BACKGROUND_SHAPE_PROPERTIES.includes(property)) {
      setTimeout(() => this.repaintBackgroundShape());
    }
  }

  /**
   * Repaint the background shape.
   */
  private repaintBackgroundShape(): void {
    console.log('repaintBackgroundShape');
  }
}
