import { Component, Element, Event, EventEmitter, Prop } from '@stencil/core';

@Component({
  tag: 'ino-chip',
  styleUrl: 'ino-chip.scss',
  shadow: false
})
export class Chip {
  @Element() el: HTMLElement;

  /**
   * Sets the label of this chip.
   */
  @Prop() inoLabel?: string;

  /**
   * Sets the icon on before the label in this chip.
   */
  @Prop() inoIcon?: string;

  /**
   * If true, add a close icon on the right side of this chip.
   * It enables an `inoRemove`-Event that can be listened to.
   */
  @Prop() inoRemovable?: boolean;

  /**
   * Sets the fill color of this element.
   * Possible values: `solid` (default) or `outline`.
   */
  @Prop() inoFill?: string;

  /**
   * Sets the name of the color scheme of this component.
   * Possible values: `primary` (default),  `secondary`, `tertiary`,
   * `success`, `warning`, `danger`.
   */
  @Prop() inoColorScheme?: string;


  /**
   * Event that emits as soon as the user removes this chip.
   * Listen to this event to hide or destroy this chip.
   * The event only emits if the property `inoRemovable` is true.
   */
  @Event() inoRemove: EventEmitter;


  private handleClick(e: Event) {
    e.preventDefault();
    this.inoRemove.emit(true);
  }

  private handleKeyPress(e: KeyboardEvent) {
    // Key press == Enter
    if (e.keyCode === 13) {
      e.preventDefault();
      this.inoRemove.emit(true);
    }
  }

  render() {
    return (
      <div class="composer">
        {this.inoIcon && <ino-icon class="leading" ino-icon={this.inoIcon}></ino-icon>}
        {this.inoLabel}
        {this.inoRemovable &&
          <ino-icon class="cancel" ino-icon="cancel" tabindex="0" role="button"
            onClick={e => this.handleClick(e)}
            onKeyPress={e => this.handleKeyPress(e)}>
          </ino-icon>}
      </div>
    );
  }
}
