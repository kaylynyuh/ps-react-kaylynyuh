import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ProgressBar from '../ProgressBar';
import EyeIcon from '../EyeIcon';
import TextInput from '../TextInput';

/** Password input with integrated label, quality tips, and show password toggle. */
const PasswordInput = ({
  htmlId, 
    value, 
    label, 
    error, 
    onChange, 
    placeholder, 
    maxLength, 
    showVisibilityToggle, 
    quality, 
    ...props 
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = event => {
    setShowPassword(!showPassword);
    if (event) event.preventDefault();
  }

  return (
    <TextInput
      htmlId={htmlId}
      label={label}
      placeholder={placeholder}
      type={showPassword ? 'text' : 'password'}
      onChange={onChange}
      value={value}
      maxLength={maxLength}
      error={error}
      required
      {...props}>
      {
        showVisibilityToggle &&
        <a
          href=""
          onClick={toggleShowPassword}
          style={{ marginLeft: 5 }}>
          <EyeIcon />
        </a>
      }
      {
        value.length > 0 && quality && <ProgressBar percent={quality} width={130} />
      }
    </TextInput>
  );
}

PasswordInput.propTypes = {
  /** Unique HTML ID. Used for tying label to HTML input. Handy hook for automated testing. */
  htmlId: PropTypes.string.isRequired,
  /** Input name. Recommend setting this to match object's property so a single change handler can be used by convention.*/
  name: PropTypes.string.isRequired,
  /** Password value */
  value: PropTypes.any,
  /** Input label */
  label: PropTypes.string,
  /** Function called when password input value changes */
  onChange: PropTypes.func.isRequired,
  /** Max password length accepted */
  maxLength: PropTypes.number,
  /** Placeholder displayed when no password is entered */
  placeholder: PropTypes.string,
  /** Set to true to show the toggle for displaying the currently entered password */
  showVisibilityToggle: PropTypes.bool,
  /** Display password quality visually via ProgressBar, accepts a number between 0 and 100 */
  quality: PropTypes.number,
  /** Validation error to display */
  error: PropTypes.string
};

PasswordInput.defaultProps = {
  maxLength: 50,
  showVisibilityToggle: false,
  label: 'Password'
};

export default PasswordInput;