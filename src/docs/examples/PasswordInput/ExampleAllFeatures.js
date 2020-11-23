import React, { useState } from 'react';
import PasswordInput from 'ps-react/PasswordInput';

/** All features enabled */
const ExampleAllFeatures = (props) => {
  const [password, setPassword] = useState(false);

  const getQuality = () => {
    const length = password.length;
    return length > 10 ? 100 : length * 10;
  }

  return (
    <div>
      <PasswordInput
        htmlId="password-input-example-all-features"
        name="password"
        onChange={ event => setPassword(event.target.value)}
        value={password}
        minLength={8}
        placeholder="Enter password"
        showVisibilityToggle
        quality={() => getQuality()}
        {...props} />
    </div>
  )
}

export default ExampleAllFeatures;