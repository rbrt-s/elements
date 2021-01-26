import {
  Component,
  ComponentInterface,
  Element,
  Event,
  EventEmitter,
  h,
  Host,
  Listen,
  Prop,
  State,
  Watch,
} from '@stencil/core';
import flatpickr from 'flatpickr';
import { Instance } from 'flatpickr/dist/types/instance';
import { BaseOptions } from 'flatpickr/dist/types/options';
import { getDatepickerLocale } from './local';
import {
  getTypeSpecificOption,
  PickerTypeOptions,
} from './type-specific-options';
import { validateRange, validateSingle } from './validation';

@Component({
  tag: 'ino-datepicker',
  styleUrl: 'ino-datepicker.scss',
  shadow: false,
})
export class Datepicker implements ComponentInterface {
  @Element() el!: HTMLElement;

  private flatpickr!: Instance;

  private inputEl: HTMLInoInputElement;

  /**
   * Autofocuses this element.
   */
  @Prop({ attribute: 'autofocus' }) autoFocus?: boolean;

  /**
   * Disables this element.
   */
  @Prop() disabled?: boolean;

  /**
   * The input name of this element.
   */
  @Prop() name?: string;

  /**
   * Marks this element as required.
   */
  @Prop() required?: boolean;

  /**
   * If true, an *optional* message is displayed if not required,
   * otherwise a * marker is displayed if required
   */
  @Prop() inoShowLabelHint?: boolean;

  /**
   * The currently selected date shown in the input field **unmanaged**. The given value
   * will not be formatted as date.
   */
  @Prop() value?: string = '';

  @Watch('value')
  valueChanged(value?: string) {
    if (!this.flatpickr || this.disabled) {
      this.isValid = true;
      return;
    }

    if (!value) {
      this.isValid = !this.required;
      return;
    }

    const dateFormat = this.flatpickr.config.dateFormat;

    if (this.inoRange) {
      this.isValid = validateRange(value, dateFormat);
    }

    if (!this.inoRange) {
      this.isValid = validateSingle(value, dateFormat, this.min, this.max);
    }

    if (this.isValid) {
      this.flatpickr.setDate(value, true);
    }
  }

  /**
   * The minimum date that a user can start picking from (inclusive).
   */
  @Prop() min?: string;

  @Watch('min')
  minChanged(value: string) {
    this.flatpickr?.set('minDate', value);
  }

  /**
   * The maximum date that a user can pick to (inclusive).
   */
  @Prop() max?: string;

  @Watch('max')
  maxChanged(value: string) {
    this.flatpickr?.set('maxDate', value);
  }

  /**
   * Styles the datepicker as outlined element.
   */
  @Prop() inoOutline?: boolean;

  /**
   * Defines the label for this element.
   */
  @Prop() inoLabel?: string;

  /**
   * The helper text.
   */
  @Prop() inoHelper?: string;

  /**
   * Displays the helper permanently.
   */
  @Prop() inoHelperPersistent?: boolean;

  /**
   * Styles the helper text as a validation message.
   */
  @Prop() inoHelperValidation?: boolean;

  /**
   * If true, enables the user to choose two dates as an interval.
   * Only works with inoType="date"
   */
  @Prop() inoRange?: boolean;

  @Watch('inoRange')
  inoRangeChanged() {
    if (!this.disabled) {
      this.create();
    }
  }

  @Watch('disabled')
  disabledChanged(newValue: boolean) {
    newValue ? this.dispose() : this.create();
  }

  /**
   * A string to change the date format.
   * Possible values are listed [here](https://flatpickr.js.org/formatting/).
   * The default value is `d-m-Y` which accepts values like `01-01-2019`.
   */
  @Prop() inoDateFormat? = 'd-m-Y';

  @Watch('inoDateFormat')
  inoDateFormatChanged(dateFormat: string) {
    this.flatpickr?.set('dateFormat', dateFormat);
  }

  /**
   * A string/array containing the initial date of the datepicker overlay. If you're using `inoRange = true` provide an array.
   */
  @Prop() inoDefaultDate?: string | string[];

  @Watch('inoDefaultDate')
  inoDefaultDateChanged(defaultDate: string) {
    this.flatpickr?.set('defaultDate', defaultDate);
  }

  /**
   * A number containing the initial hour in the date-time picker overlay.
   * The default is `12`
   */
  @Prop() inoDefaultHour = 12;

  @Watch('inoDefaultHour')
  inoDefaultHourChanged(value: string) {
    this.flatpickr?.set('defaultHour', value);
  }

  /**
   * A number containing the initial minute in the date-time picker overlay.
   * The default is `0`
   */
  @Prop() inoDefaultMinute? = 0;

  @Watch('inoDefaultMinute')
  inoDefaultMinuteChanged(value: string) {
    this.flatpickr?.set('defaultMinute', value);
  }

  /**
   * If true, displays time picker in 12 hour mode with AM/PM selection.
   */
  @Prop() inoTwelveHourTime?: boolean;

  @Watch('inoTwelveHourTime')
  inoTwelveHourTimeChanged(value: boolean) {
    this.flatpickr?.set('time_24hr', !value);
  }

  /**
   * Selects the correct picker corresponding to the given type.
   */
  @Prop() inoType?: PickerTypeOptions = 'date';

  @Watch('inoType')
  inoTypeChanged() {
    if (!this.disabled) this.create();
  }

  /**
   * Adjusts the step for the minute input (incl. scrolling)
   * Default is 5
   */
  @Prop() minuteStep = 5;

  @Watch('minuteStep')
  minuteStepChanged(value: number) {
    this.flatpickr?.set('minuteIncrement', value);
  }

  /**
   * Adjusts the step for the hour input (incl. scrolling)
   * Default is 1
   */
  @Prop() hourStep = 1;

  @State() isValid: boolean = true;

  @Watch('hourStep')
  hourStepChanged(value: number) {
    this.flatpickr?.set('hourIncrement', value);
  }

  @Listen('click')
  inoInputClickedHandler(e) {
    const target = e.target;

    if (this.disabled || !this.inputEl.contains(target)) {
      return;
    }

    this.flatpickr.toggle();
  }

  monthChangePrevHandler = () => this.monthChangeHandler(-1);
  monthChangeNextHandler = () => this.monthChangeHandler(1);

  /**
   * Handles the functionality of the arrows inside the flatpickers, in case of a month picker.
   * Usually these are used for changing months but in the month picker they change the year,
   * so a custom functionality is necessary.
   * When pressing an arrow a new date with the corresponding year is returned as event
   * The yearOffset indicates weather the year is decremented (-1) or incremented(1).
   */
  monthChangeHandler(yearOffset: -1 | 1) {
    // No date selected yet
    if (!this.value || this.flatpickr.selectedDates.length !== 1) {
      return;
    }

    const currentDate = this.flatpickr.parseDate(this.value);
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const day = currentDate.getDate();
    const newYear = year + yearOffset;
    const newDate = new Date(newYear, month, day);
    const formattedDate = this.flatpickr.formatDate(
      newDate,
      this.flatpickr.config.dateFormat
    );
    this.valueChange.emit(formattedDate);
  }

  /**
   * Emits when the value of the datepicker changes.
   * The value can be found in `event.detail`
   */
  @Event() valueChange!: EventEmitter<string>;

  componentDidLoad() {
    if (!this.disabled) {
      this.create();
    }
  }

  disconnectedCallback() {
    this.dispose();
  }

  private create() {
    this.dispose();

    if (this.disabled) {
      return;
    }

    const sharedOptions: Partial<BaseOptions> = {
      allowInput: !this.inoRange,
      clickOpens: false,
      ignoredFocusElements: [],
      locale: getDatepickerLocale(this.el),
      onValueUpdate: (_, newValue) => this.valueChange.emit(newValue),
    };

    const typeSpecificOptions: Partial<BaseOptions> = getTypeSpecificOption(
      this.inoType,
      {
        defaultHour: this.inoDefaultHour,
        defaultMinute: this.inoDefaultMinute,
        enableTime: true,
        time_24hr: !this.inoTwelveHourTime,
        minuteIncrement: this.minuteStep,
        hourIncrement: this.hourStep,
        dateFormat: this.inoDateFormat,
        minDate: this.min,
        maxDate: this.max,
        mode: this.inoRange ? 'range' : 'single',
      }
    );

    const options = { ...sharedOptions, ...typeSpecificOptions };

    const target = this.el.querySelector('ino-input > div') as HTMLElement;
    this.flatpickr = flatpickr(target, options);

    if (this.inoType === 'month') {
      this.flatpickr.prevMonthNav.addEventListener(
        'click',
        this.monthChangePrevHandler
      );
      this.flatpickr.nextMonthNav.addEventListener(
        'click',
        this.monthChangeNextHandler
      );
    }}

  private dispose() {
    if (this.flatpickr) {
      this.flatpickr.destroy();
    }
  }

  render() {
    return (
      <Host>
        <ino-input
          ref={(el) => (this.inputEl = el)}
          type="text"
          autocomplete="off"
          disabled={this.disabled}
          autoFocus={this.autoFocus}
          name={this.name}
          required={this.required}
          ino-label={this.inoLabel}
          ino-error={!this.isValid}
          ino-icon-leading
          value={this.value}
          ino-helper={this.inoHelper}
          ino-outline={this.inoOutline}
          ino-helper-persistent={this.inoHelperPersistent}
          ino-helper-validation={this.inoHelperValidation}
          ino-show-label-hint={this.inoShowLabelHint}
          onValueChange={(e) => this.valueChange.emit(e.detail)}
        >
          <ino-icon
            ino-clickable={!this.disabled}
            slot={'ino-icon-leading'}
            ino-icon={this.inoType === 'time' ? 'time' : 'calendar'}
          ></ino-icon>
        </ino-input>
      </Host>
    );
  }
}
