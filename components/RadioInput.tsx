import React, { forwardRef } from 'react';
import classNames from 'classnames';

type TextInputProps = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> & {
    label: string;
};

export const RadioInput = forwardRef<HTMLInputElement, TextInputProps>(({ label, className, type, ...props }, ref) => {
    return (
        <div className={classNames('relative flex gap-x-3 items-center', className)}>
            <input
                id="push-everything"
                name="push-notifications"
                type="radio"
                className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
            />
            {label && (
                <label htmlFor={props?.id || props.name} className="block text-sm font-medium leading-6 text-gray-900">
                    {label}
                </label>
            )}
        </div>
    );
});

RadioInput.displayName = 'RadioInput';
