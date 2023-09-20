import React from 'react';

export const FieldError: React.FC<{ children?: React.ReactNode }> = ({ children }) => (
    <p className="text-red-600 mt-1 text-sm">{children}</p>
);
