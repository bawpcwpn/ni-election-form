import React from 'react';
import classNames from 'classnames';

type ButtonProps = React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>;
export const Button: React.FC<ButtonProps> = ({ className, type, ...props }) => {
    return (
        <button
            type={type || 'button'}
            className={classNames(
                'flex w-full justify-center rounded-md bg-green-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600 disabled:hover:bg-green-600 disabled:opacity-50',
                className,
            )}
            {...props}
        />
    );
};
