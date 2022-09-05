import { StylesConfig } from 'react-select';

export const selectStyles: StylesConfig = {
    option: (styles: any, { data, isDisabled, isFocused, isSelected }) => {
        return {
            ...styles,
            backgroundColor: isFocused && !isSelected ? 'rgba(240,240,240)' : isSelected ? 'rgba(200,200,200)' : null,
            color: isSelected ? 'black' : null,
            cursor: 'pointer',
        };
    },
    control: (base, state) => {
        return {
            ...base,
            border: 0,
            outline: 0,
            boxShadow: '0.2px 0.2px 3px #ccc',
            borderRadius: 12,
            paddingLeft: 8,
            paddingTop: 4,
            paddingBottom: 4,
        };
    },
    singleValue: (base) => ({
        ...base,
        color: 'rgba(120,120,120)',
    }),
};

export const selectStylesPrimary: StylesConfig = {
    option: (styles: any, { data, isDisabled, isFocused, isSelected }) => {
        return {
            ...styles,
            backgroundColor: isFocused && !isSelected ? 'rgba(240,240,240)' : isSelected ? 'rgba(200,200,200)' : null,
            color: isSelected ? 'black' : null,
            cursor: 'pointer',
            ':active': {
                backgroundColor: 'rgba(240,240,240)',
            },
        };
    },
    control: (base, state) => {
        return {
            ...base,
            border: 0,
            outline: 0,
            boxShadow: '0.2px 0.2px 3px #ccc',
            borderRadius: 12,
            paddingLeft: 8,
            paddingTop: 4,
            paddingBottom: 4,
            background: '#FFF6F4',
        };
    },
    singleValue: (base) => ({
        ...base,
        color: 'rgba(120,120,120)',
    }),
};
