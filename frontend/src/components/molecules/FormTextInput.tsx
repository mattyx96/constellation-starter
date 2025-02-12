import React, { HTMLInputTypeAttribute } from 'react';
import { Text } from 'nebula-ds-react-library';

type Props = {
  type?: HTMLInputTypeAttribute;
  name: string;
  label: string;
  errors?: string[];
  value: string;
  disabled?: boolean;
  isRequired?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const FormTextInput = (props: Props) => {
  return (
    <div className="flex w-full flex-col">
      <div className="flex w-full flex-col">
        <label className="mb-2">
          <Text variant="body3" className={`${props.errors?.length ? '!text-input-color-error' : ''}`}>
            {props.label} {props.isRequired && '*'}
          </Text>
        </label>
        <input
          type={props.type}
          name={props.name}
          className={`body1 rounded-input-border-radius-xs-default rounded-bl-input-border-radius-xs-big border-border-1 border-background-accent-500 bg-transparent p-1 px-input-spacing-xs-h-default py-input-spacing-xs-v-default font-roboto-mono text-background-contrast-primary-500 focus:border-transparent focus:bg-input-background-color-focused focus:outline-none focus:ring-2 focus:ring-input-color-focused focus:ring-offset-0 disabled:opacity-40 ${
            props.errors?.length ? '!border-input-color-error' : ''
          }`}
          disabled={props.disabled}
          value={props.value}
          onChange={props.onChange}
        />
      </div>
      <Text
        component="span"
        variant="body4"
        className={`mt-2 ${props.errors?.length ? '' : 'hidden min-h-[1rem]'} w-full !text-input-color-error`}
      >
        {props.errors?.length ? props.errors.map((e) => e) : ''}
      </Text>
    </div>
  );
};
