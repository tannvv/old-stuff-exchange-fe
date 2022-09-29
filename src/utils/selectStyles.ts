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
            cursor: 'pointer',
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
            borderRadius: 10,
            paddingLeft: 8,
            paddingTop: 4,
            paddingBottom: 4,
            background: '#FFF6F4',
            cursor: 'pointer',
        };
    },
    singleValue: (base) => ({
        ...base,
        color: 'rgba(120,120,120)',
    }),
};

export const selectStylesCustomField: StylesConfig = {
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
            borderRadius: 6,
            paddingLeft: 8,
            paddingBottom: 0,
            paddingTop: 0,
            background: '#FFF6F4',
            fontSize: '0.86rem',
            alignItems: 'center',
            minHeight: 0,
            cursor: 'pointer',
        };
    },
    singleValue: (base) => ({
        ...base,
        color: 'rgba(120,120,120)',
        fontSize: '1.2rem',
    }),
    dropdownIndicator: (base) => ({
        ...base,
        paddingTop: 0,
        paddingBottom: 0,
    }),
    clearIndicator: (base) => ({
        ...base,
        paddingTop: 0,
        paddingBottom: 0,
    }),
};

export const selectStylesDefault: StylesConfig = {
    option: (styles: any, { data, isDisabled, isFocused, isSelected }) => {
        return {
            ...styles,
            fontSize: '1.4rem',
            fontWeight: 500,
            backgroundColor: isFocused && !isSelected ? 'rgba(240,240,240)' : isSelected ? 'rgba(200,200,200)' : null,
            color: isSelected ? 'black' : '#bbbbcc',
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
            borderRadius: 10,
            paddingLeft: 8,
            paddingTop: 4,
            paddingBottom: 4,
            background: '#FFF6F4',
            cursor: 'pointer',
        };
    },
    singleValue: (base) => ({
        ...base,
        color: 'rgba(120,120,120)',
        fontSize: '1.4rem',
        fontWeight: 600,
        padding: '4px',
    }),
};
