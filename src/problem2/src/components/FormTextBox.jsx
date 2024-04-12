import React from 'react';
import T from '../commont';

export class FormTextBox extends React.Component {
    static defaultProps = { formType: 'textBox' }
    state = { value: '' };

    componentDidMount() {
        if (this.props.value) this.setState({ value: this.props.value });
    }

    componentDidUpdate(prevProps) {
        if (prevProps.value !== this.props.value) {
            this.setState({ value: this.props.value });
        }
    }

    value = function (text) {
        if (arguments.length) {
            if (this.props.type === 'number') {
                this.input.value = text;
            } else {
                this.setState({ value: text });
            }
        } else {
            if (this.props.type === 'number') {
                return this.input.value;
            }
            return this.state.value;
        }
    };


    focus = () => this.input.focus();

    render() {
        let { type = 'text', smallText = '', label = '', placeholder = '', className = '', style = {}, readOnly = false, onChange = null,
            onLeave = null, required = false, richTextBox = false } = this.props, readOnlyText = this.state.value, displayElement = '';
        type = type.toLowerCase(); // type = text | number | email | password | phone | year

        const properties = {
            type,
            placeholder: placeholder || label,
            value: this.state.value,
            onChange: e => this.setState({ value: e.target.value }) || (onChange && onChange(e))
        };

        if (onLeave) properties.onBlur = () => onLeave(this.value());

        if (type === 'number') {
            if (readOnlyText) readOnlyText = T.numberDisplay(readOnlyText);
            properties.onKeyPress = e => ((!/[0-9]/.test(e.key)) && e.preventDefault());
        }

        if (label) {
            if (required) {
                if (readOnly === true) {
                    displayElement = <>
                        <label onClick={() => this.input.focus()} >
                            {label}:<span style={{ color: 'red' }}>*</span><b>&nbsp;{readOnlyText || ''}</b>
                        </label>
                    </>;
                } else {
                    displayElement = <>
                        <label onClick={() => this.input.focus()}>
                            {label}:&nbsp;<span style={{ color: 'red' }}>*</span>
                        </label>
                    </>;
                }
            } else {
                if (readOnly === true) {
                    displayElement = <>
                        <label onClick={() => this.input.focus()} >
                            {label}:<b>&nbsp;{readOnlyText || ''}</b>
                        </label>
                    </>;
                } else {
                    displayElement = <>
                        <label onClick={() => this.input.focus()}>
                            {label}:
                        </label>
                    </>;
                }
            }
        } else {
            displayElement = readOnly ? <b style={{ height: '30px' }}>{readOnlyText}</b> : '';
        }

        return (
            <div className={'input-container ' + (className || '')} style={{ ...style, paddingBottom: '20px' }}>
                {displayElement}
                {richTextBox ? <textarea ref={e => this.input = e} style={{ display: readOnly ? 'none' : 'block' }}{...properties} /> :
                    <input ref={e => this.input = e} style={{ display: readOnly ? 'none' : 'block' }}{...properties} />}

                {smallText ? <small>{smallText}</small> : null}
            </div>
        );
    }
}