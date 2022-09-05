import React from 'react';
import Select from 'react-select';

const SelectField = (props: any) => {
    const { field, form, options, label, placeholder, disabled } = props;
    const { name, value } = field;
    const { errors, touched } = form;
    const showError = errors[name] && touched[name];
    const selectedOption = options.find((option: any) => option.value === value);

    const handleSelectedOptionChange = (selectedOption: any) => {
        const selectedValue = selectedOption ? selectedOption.value : selectedOption;

        const changeEvent = {
            target: {
                name: name,
                value: selectedValue,
            },
        };
        field.onChange(changeEvent);
    };

    return (
        <div>
            {label && <label htmlFor={name}>{label}</label>}

            <Select
                id={name}
                {...field}
                value={selectedOption}
                onChange={handleSelectedOptionChange}
                placeholder={placeholder}
                isDisabled={disabled}
                options={options}
                className={showError ? 'is-invalid' : ''}
            />
        </div>
    );
};

export default SelectField;
