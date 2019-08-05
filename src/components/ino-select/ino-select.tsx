import { MDCSelect } from '@material/select';
import {
  Component,
  Element,
  Event,
  EventEmitter,
  Listen,
  Prop,
  Watch
} from '@stencil/core';
import classNames from 'classnames';

@Component({
  tag: 'ino-select',
  styleUrl: 'ino-select.scss',
  shadow: false
})
export class Select {
  // An internal instance of the material design form field.
  private mdcInstance: MDCSelect;
  private nativeSelectElement?: HTMLSelectElement;

  @Element() el!: HTMLElement;
  /**
   * Marks this element as autofocused.
   */
  @Prop() autofocus?: boolean;

  /**
   * Disables this element.
   */
  @Prop() disabled?: boolean;

  /**
   * The form this element belongs to.
   */
  @Prop() form?: string;

  /**
   * The name of this element.
   */
  @Prop() name?: string;

  /**
   * Marks this element as required.
   */
  @Prop() required?: boolean;

  /**
   * Prepends a selected, empty and disabled option.
   *
   * The label is positioned as placeholder and floats to
   * the top after selecting an option.
   */
  @Prop() inoPrependDefault?: boolean;

  /**
   * The label of this element
   */
  @Prop() inoLabel?: string;

  /**
   * Styles this select box as outlined element.
   */
  @Prop() inoOutline?: boolean;

  /**
   * The value of this element. (**unmanaged**)
   */
  @Prop() value = '';

  @Watch('value')
  handleValueChange(value: string) {
    this.setSelectValue(value);
  }

  /**
   * Emits when a selection changes. Contains new value in `event.detail`.
   */
  @Event() valueChange!: EventEmitter<string>;

  componentDidLoad() {
    this.mdcInstance = new MDCSelect(this.el.querySelector('.mdc-select'));

    if (this.value) {
      this.setSelectValue(this.value);
    }
  }

  componentWillUnLoad() {
    this.mdcInstance.destroy();
  }

  private setSelectValue(value: string) {
    if (this.nativeSelectElement) {
      this.nativeSelectElement.value = this.mdcInstance.value = value;
    }
  }

  @Listen('change')
  handleChange(e) {
    e.stopPropagation();
    e.preventDefault();
  }

  @Listen('input')
  handleInput(e) {
    e.preventDefault();
    const value = e.target.value;
    this.valueChange.emit(value);
  }

  render() {
    const classSelect = classNames({
      'mdc-select': true,
      'mdc-select--disabled': this.disabled,
      'mdc-select--outlined': this.inoOutline,
      'mdc-select--box': !this.inoOutline
    });

    return (
      <div class={classSelect}>
        <i class="mdc-select__dropdown-icon" />
        <select
          ref={el => (this.nativeSelectElement = el)}
          class="mdc-select__native-control"
          autoFocus={this.autofocus}
          disabled={this.disabled}
          form={this.form}
          name={this.name}
          required={this.required}
        >
          {this.inoPrependDefault && <option disabled selected value="" />}
          <slot />
        </select>
        <ino-label
          ino-outline={this.inoOutline}
          ino-text={this.inoLabel}
          ino-required={this.required}
        />
      </div>
    );
  }
}
