import { Component, OnInit } from '@angular/core';
import { DEFAULT_SETTINGS, Settings } from '../settings';
import {
  CONST,
  REPAINT_BACKGROUND_SHAPE_PROPERTIES,
  REPAINT_SHAPE_SHAPE_PROPERTIES,
} from './icon.constant';
import {
  getBackgroundBottomLeftPath,
  getBackgroundBottomRightPath,
  getBackgroundTopLeftPath,
  getBackgroundTopRightPath,
  getDotsPath,
  getEyePath,
  getShapePath,
} from './icon.helpers';

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
  private _path = {
    background: '',
    shape: '',
  };

  /**
   * Public accessor for the settings.
   */
  public readonly settings: Readonly<Settings> = this._settings;

  /**
   * public accessor for the UI convenient variables.
   */
  public readonly path: Readonly<typeof this._path> = this._path;

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
      setTimeout(() => this.repaintBackground());
    }

    // Special case: repaint shape' shape
    if (REPAINT_SHAPE_SHAPE_PROPERTIES.includes(property)) {
      setTimeout(() => this.repaintShape());
    }
  }

  // Lifecycle -----------------------------------------------------------------

  /**
   * Init the SVG
   */
  ngOnInit(): void {
    this.repaintBackground();
    this.repaintShape();
  }

  /**
   * Repaint the background shape.
   */
  private repaintBackground(): void {
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

    this._path.background = [
      `M 0 ${CONST.B_ROUND}`,
      getBackgroundTopLeftPath(this._settings),
      getBackgroundTopRightPath(this._settings),
      getBackgroundBottomRightPath(this._settings),
      getBackgroundBottomLeftPath(this._settings),
      'Z',
    ]
      .filter((t) => Boolean(t))
      .join(' ');
  }

  /**
   * Repaint the Shape' shape.
   */
  private repaintShape(): void {
    // First, we select the shape to draw.
    // Second, we extrude the eye.
    // Third, we extrude the dots.

    this._path.shape = [
      getShapePath(this._settings),
      getEyePath(this.settings),
      getDotsPath(this.settings),
    ]
      .filter((t) => Boolean(t))
      .join(' ');
  }
}
