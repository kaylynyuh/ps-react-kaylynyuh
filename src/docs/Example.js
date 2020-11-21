import React, { useState } from 'react';
import PropTypes from 'prop-types';
import CodeExample from './CodeExample';

const Example = ({ componentName, example }) => {
  const { code, description, name } = example;
  const [showCode, setShowCode] = useState(false);

  const toggleCode = event => {
    event.preventDefault();
    setShowCode(!showCode)
  }

  // Must use CommonJS require to dynamically require because ES Modules must be statically analyzable.
  // Why? so we don't have to manually include imports for every component we make.
  // CommonJS require is dynamic whereas ES6 imports are only static.
  const ExampleComponent = require(`./examples/${componentName}/${name}`).default;
  return (
    <div className="example">
      {description && <h4>{description}</h4> }
      <ExampleComponent />
      <p>
        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
        <a href="#" onClick={toggleCode}>
          {showCode ? "Hide" : "Show"} Code
        </a>
      </p>
      {showCode && <CodeExample>{code}</CodeExample>}
    </div>
  )
}

Example.propTypes = {
  example: PropTypes.object.isRequired,
  componentName: PropTypes.string.isRequired
}

export default Example;