import React, { forwardRef } from 'react';
import classNames from 'classnames';

type TextInputProps = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> & {
    label?: string;
};

export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(({ label, className, type, ...props }, ref) => {
    return (
        <div className={className}>
            {label && (
                <label htmlFor={props?.id || props.name} className="block text-sm font-medium leading-6 text-gray-900">
                    {label}
                </label>
            )}

            <div className={classNames(label && 'mt-2')}>
                <input
                    ref={ref}
                    type={type || 'text'}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    {...props}
                />
            </div>
        </div>
    );
});

TextInput.displayName = 'TextInput';
