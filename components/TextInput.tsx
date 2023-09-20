import React, { forwardRef } from 'react';
import classNames from 'classnames';
import { FieldError } from 'react-hook-form';

type TextInputProps = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> & {
    label?: string;
    errors?: FieldError;
};

export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
    ({ label, errors, className, type, ...props }, ref) => {
        return (
            <div className={className}>
                {label && (
                    <div className="flex justify-between items-center">
                        <label
                            htmlFor={props?.id || props.name}
                            className="block text-sm font-medium leading-6 text-gray-900"
                        >
                            {label}
                        </label>
                        {!props.required && <span className="text-xs text-gray-500 uppercase">Optional</span>}
                    </div>
                )}

                <div className={classNames(label && 'mt-2')}>
                    <input
                        ref={ref}
                        type={type || 'text'}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
                        {...props}
                    />
                    {errors && <p className="text-sm text-red-500 mt-1">{errors.message}</p>}
                </div>
            </div>
        );
    },
);

TextInput.displayName = 'TextInput';
