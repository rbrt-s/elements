import { Component, ComponentInterface, Element, Event, EventEmitter, Host, Prop, h } from '@stencil/core';
import classNames from 'classnames';

@Component({
  tag: 'ino-tab',
  styleUrl: 'ino-tab.scss',
  shadow: false
})
export class Tab implements ComponentInterface {
  @Element() el!: HTMLElement;

  /**
   * Indicates a leading icon in the tab.
   */
  @Prop() inoIcon?: string;

  /**
   * Indicates a label text in the tab.
   */
  @Prop() inoLabel?: string;

  /**
   * Indicates that the tab icon and label should flow vertically instead of horizontally.
   */
  @Prop() inoStacked: boolean = false;

  /**
   * Indicates that the tab only expands to the width of its content.
   */
  @Prop() inoIndicatorContentWidth: boolean = false;

  /**
   * Emitted when the tab did load.
   */
  @Event() loadEl!: EventEmitter;

  /**
   * Emitted when the tab did unload.
   */
  @Event() unloadEl!: EventEmitter;

  componentDidLoad() {
    this.loadEl.emit({ tab: this });
  }

  componentDidUnLoad() {
    this.unloadEl.emit({ tab: this });
  }

  render() {
    const tabClasses = classNames({
      'mdc-tab': true,
      'mdc-tab--stacked': this.inoStacked
    });

    const indicatorWidth = (
      <span class="mdc-tab-indicator">
        <span class="mdc-tab-indicator__content mdc-tab-indicator__content--underline" />
      </span>
    );

    return (
      <Host>
        <button class={tabClasses} role="tab" aria-selected="false">
          <span class="mdc-tab__content">
            {this.inoIcon && (
              <ino-icon class="mdc-tab__icon" ino-icon={this.inoIcon} />
            )}
            {this.inoLabel && (
              <span class="mdc-tab__text-label">{this.inoLabel}</span>
            )}
            {this.inoIndicatorContentWidth && indicatorWidth}
          </span>
          {!this.inoIndicatorContentWidth && indicatorWidth}
          <span class="mdc-tab__ripple" />
        </button>
      </Host>
    );
  }
}