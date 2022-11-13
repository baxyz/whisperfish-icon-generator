import { Component, OnInit } from '@angular/core';
import {
  DEFAULT_SETTINGS,
  REPAINT_BACKGROUND_SHAPE_PROPERTIES,
  Settings,
} from '../settings';

const CONST = {
  SIZE: 2048,

  // Small round
  S_ROUND: 34,
  S_DELTA: 15,

  // Big round (half the size)
  B_ROUND: 1024,
  B_DELTA: 458,
};

@Component({
  selector: 'app-icon',
  templateUrl: './icon.component.svg',
  styleUrls: ['./icon.component.scss'],
})
export class IconComponent implements OnInit {
  readonly CONST = CONST;

  /**
   * The settings of the icon.
   */
  private _settings: Settings = { ...DEFAULT_SETTINGS };

  /**
   * Our internal UI interaction
   */
  private _ui = {
    backgroundPath: '',
  };

  /**
   * Public accessor for the settings.
   */
  public readonly settings: Readonly<Settings> = this._settings;

  /**
   * public accessor for the UI convenient variables.
   */
  public readonly ui: Readonly<typeof this._ui> = this._ui;

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

  // Lifecycle -----------------------------------------------------------------

  /**
   * Init the SVG
   */
  ngOnInit(): void {
    this.repaintBackgroundShape();
  }

  /**
   * Repaint the background shape.
   */
  private repaintBackgroundShape(): void {
    // For each corner, there is two options:
    // - small round (about 34px)
    // - big round (about 1024px, aka half the size)

    // To simplify the code, we will move to the middle point of every side,
    // starting from the left side, and going clockwise.

    // If it's a big round, we draw a bezier curve to the next side.

    // If it's a small round, we draw:
    // - a line next to the corner (same side)
    // - a bezier curve to the next corder side (next side)
    // - a line to the the middle point of this new side

    const path = [
      // Start on left center
      `M 0 ${CONST.B_ROUND}`,

      // Top left
      this._settings.backgroundTopLeft
        ? `C 0 ${CONST.B_DELTA} ${CONST.B_DELTA} 0 ${CONST.B_ROUND} 0`
        : `L 0 ${CONST.S_ROUND} C 0 ${CONST.S_DELTA} ${CONST.S_DELTA} 0 ${CONST.S_ROUND} 0 L ${CONST.B_ROUND} 0`,

      // Top right
      this._settings.backgroundTopRight
        ? `C ${CONST.SIZE - CONST.B_DELTA} 0 ${CONST.SIZE} ${CONST.B_DELTA} ${
            CONST.SIZE
          } ${CONST.B_ROUND}`
        : `L ${CONST.SIZE - CONST.S_ROUND} 0 C ${
            CONST.SIZE - CONST.S_DELTA
          } 0 ${CONST.SIZE} ${CONST.S_DELTA} ${CONST.SIZE} ${CONST.S_ROUND} L ${
            CONST.SIZE
          } ${CONST.B_ROUND}`,

      // Bottom right
      this._settings.backgroundBottomRight
        ? `C ${CONST.SIZE} ${CONST.SIZE - CONST.B_DELTA} ${
            CONST.SIZE - CONST.B_DELTA
          } ${CONST.SIZE} ${CONST.B_ROUND} ${CONST.SIZE}`
        : `L ${CONST.SIZE} ${CONST.SIZE - CONST.S_ROUND} C ${CONST.SIZE} ${
            CONST.SIZE - CONST.S_DELTA
          } ${CONST.SIZE - CONST.S_DELTA} ${CONST.SIZE} ${
            CONST.SIZE - CONST.S_ROUND
          } ${CONST.SIZE} L ${CONST.B_ROUND} ${CONST.SIZE}`,

      // Bottom left
      this._settings.backgroundBottomLeft
        ? `C ${CONST.B_DELTA} ${CONST.SIZE} 0 ${CONST.SIZE - CONST.B_DELTA} 0 ${
            CONST.B_ROUND
          }`
        : `L ${CONST.S_ROUND} ${CONST.SIZE} C ${CONST.S_DELTA} ${
            CONST.SIZE
          } 0 ${CONST.SIZE - CONST.S_DELTA} 0 ${
            CONST.SIZE - CONST.S_ROUND
          } L 0 ${CONST.B_ROUND}`,

      // Finish
      'Z',
    ];

    this._ui.backgroundPath = path.join(' ');
  }
}
