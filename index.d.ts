import * as React from 'react';

export interface makeReactNativeFieldProps {
  name: string;
}

export interface setFormikInitialValueProps {
  name: string;
}

export interface withInputTypePropsProps {
  type: string;
}

export interface withErrorProps {
  error: string;
}

export interface withTouchedProps {
  touched: boolean;
}

export interface withFormikControlProps {
  error?: string;
  value: string;
  onChange: string;
  setFieldValue(value: string): void;
  setFieldTouched(): void;
}

export type makeInputGreatAgainProps = makeReactNativeFieldProps &
  setFormikInitialValueProps &
  withInputTypePropsProps &
  withErrorProps &
  withTouchedProps;

export function makeReactNativeField<Props>(
  WrappedComponent: React.ComponentType<Props>
): React.ComponentClass<Props & makeReactNativeFieldProps>;

export function setFormikInitialValue<Props>(
  WrappedComponent: React.ComponentType<Props>
): React.ComponentClass<Props & setFormikInitialValueProps>;

export function withError<Props>(
  WrappedComponent: React.ComponentType<Props>
): React.ComponentClass<Props & withErrorProps>;

export function withInputTypeProps<Props>(
  WrappedComponent: React.ComponentType<Props>
): React.ComponentClass<Props & withInputTypePropsProps>;

export function withFormik<Props>(
  WrappedComponent: React.ComponentType<Props>
): React.ComponentClass<Props>;

export function withNextInputAutoFocusInput<Props>(
  WrappedComponent: React.ComponentType<Props>
): React.ComponentClass<Props>;

export function withNextInputAutoFocusForm<Props>(
  WrappedComponent: React.ComponentType<Props>,
  options?: {
    submitAfterLastInput: Boolean
  }
): React.ComponentClass<Props>;

export function withPickerValues<Props>(
  WrappedComponent: React.ComponentType<Props>
): React.ComponentClass<Props>;

export function withTouched<Props>(
  WrappedComponent: React.ComponentType<Props>
): React.ComponentClass<Props & withTouchedProps>;

export function makeInputGreatAgain<Props>(
  WrappedComponent: React.ComponentType<Props>
): React.ComponentClass<Props & makeInputGreatAgainProps>;

export function withFormikControl<Props>(
  WrappedComponent: React.ComponentType<Props>
): React.ComponentClass<Props & makeInputGreatAgainProps>;

export function handleTextInput<Props>(
  WrappedComponent: React.ComponentType<Props>
): React.ComponentClass<Props & makeInputGreatAgainProps>;

export default makeInputGreatAgain;
