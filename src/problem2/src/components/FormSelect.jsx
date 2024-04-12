import React from 'react';
import chroma from 'chroma-js';
import Select from 'react-select';

export class FormSelect extends React.Component {
    static defaultProps = { formType: 'selectBox' };

    state = {};

    componentDidMount() {
        if (this.props.value !== undefined) this.value(this.props.value);
    }

    componentDidUpdate(prevProps) {
        if (prevProps.value !== this.props.value) this.value(this.props.value);
    }

    value(text) {
        function isOption(obj) {
            return obj && typeof obj == 'object' && 'value' in obj && 'label' in obj;
        }
        if (arguments.length) {
            const options = this.props.options;
            const fullOptions = options.map((option) => {
                if ('options' in option) { // Group
                    return option.options;
                } else {
                    return option;
                }
            }).flat();

            if (this.props.multiple) {
                if (!Array.isArray(text)) text = [text];
                const valueOptions = text.map(_text => {
                    if (typeof _text === 'string' || typeof _text === 'number') {
                        return fullOptions.find(item => item.value === _text);
                    } else {
                        return isOption(_text) ? _text : null;
                    }
                }).filter(_text => !!_text);

                this.handleChange(valueOptions);
            } else {
                if (text) {
                    if (Array.isArray(text)) text = text[0];
                    if (typeof text == 'string' || typeof text == 'number') {
                        const option = fullOptions.find(item => item.value === text);

                        this.handleChange(option);
                    } else {
                        if (isOption(text)) {
                            this.handleChange(text);
                        }
                    }
                } else {
                    this.handleChange(null);
                }
            }
        } else {
            const value = this.state.value;

            if (this.props.multiple) {
                return (Array.isArray(value) ? value.map(item => item.value) : []);
            } else {
                if (value) {
                    return ((Array.isArray(value) ? (value[0] ? value[0].value : null) : value.value));
                } else {
                    return null;
                }
            }
        }
    }

    focus() { this.select.focus(); }

    data() { return this.state.value; }

    handleChange(selectedOption) {
        this.setState({ value: selectedOption });
        if (this.props.onChange) this.props.onChange(selectedOption);
    }

    render() {
        const { style = {}, className = '', label = '', placeholder = '', readOnly = false, allowClear = false, required = false, smallText = '', multiple = false, options, menuPortalTarget } = this.props;
        const value = this.state.value;
        let valueText = '', displayElement;

        const selectStyles = (readOnly) => {
            return {
                control: (baseStyles, state) => {
                    return ({
                        ...baseStyles,
                        cursor: 'pointer',
                        borderWidth: 2,
                        border: state.menuIsOpen ? '2.5px solid #5c76ae !important' : '1px solid #b4b4b4 !important',
                        boxShadow: 'none',
                        display: readOnly ? 'none' : 'flex',
                    });
                },
                option: (styles, { data, isFocused, isSelected }) => {
                    const color = chroma(data.backgroundColor ? data.backgroundColor : '#1488db');

                    return {
                        ...styles,
                        backgroundColor: (isFocused && !isSelected) ? color.alpha(0.4).css() : isSelected ? color.alpha(1).css() : '',
                    };
                },
                multiValue: (styles, { data }) => {
                    return {
                        ...styles,
                        borderRadius: 3,
                        color: data.color ? data.color : '#fff',
                        backgroundColor: data.backgroundColor ? data.backgroundColor : '#1488db',
                    };
                },
                multiValueLabel: (styles, { data }) => ({
                    ...styles,
                    color: data.color ? data.color : '#fff',
                    fontSize: 14,
                }),
                multiValueRemove: (styles, { data }) => ({
                    ...styles,
                    ':hover': {
                        backgroundColor: data.backgroundColor ? data.backgroundColor : '#1488db',
                    },
                }),
            };
        };

        if (multiple && value && Array.isArray(value) && value.length) {
            valueText = value.map(item => item.label).join(', ');
        } else if (!multiple && value) {
            valueText = Array.isArray(value) ? (value[0] ? value[0].label : '') : value.label;
        }

        if (label) {
            displayElement = <>
                <label className='text-label' onClick={() => this.select.focus()} data-testid='labelFormSelect' style={{ marginBottom: '5px' }}>
                    {label + ':'}{!readOnly && required ? <span style={{ color: 'red' }}> *</span> : ''}
                </label>{readOnly ? <>: <b>{valueText}</b></> : ''}
            </>;
        } else {
            displayElement = readOnly ? <b>{valueText}</b> : null;
        }

        return (
            <div className={'form-group ' + className} style={{ ...style, paddingTop: '10px' }}>
                {displayElement}
                <Select
                    ref={(e) => this.select = e}
                    value={value}
                    openMenuOnFocus={true}
                    placeholder={placeholder || label}
                    isClearable={allowClear}
                    isMulti={multiple}
                    closeMenuOnSelect={!multiple}
                    styles={selectStyles(readOnly)}
                    options={options}
                    onChange={(option) => this.handleChange(option)}
                    menuPortalTarget={menuPortalTarget}
                />
                {smallText ? <small>{smallText}</small> : null}
            </div>
        );
    }
}