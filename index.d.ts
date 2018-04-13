import * as React from 'react';

export interface makeReactNativeFieldProps {
  name: string;
}

export interface withInputTypePropsProps {
  type: string;
}

export interface withErrorProps {
  name: string;
}

export interface withTouchedProps {
  name: string;
}

export type makeInputGreatAgainProps = makeReactNativeFieldProps &
  withInputTypePropsProps &
  withErrorProps &
  withTouchedProps;

export function makeReactNativeField<Props>(
  WrappedComponent: React.ComponentType<Props>
): React.ComponentClass<Props & makeReactNativeFieldProps>;

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
  WrappedComponent: React.ComponentType<Props>
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

export default makeInputGreatAgain;
