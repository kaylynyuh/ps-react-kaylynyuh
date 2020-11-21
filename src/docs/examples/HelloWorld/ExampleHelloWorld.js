import React from 'react';
// Its important that the path actually reflects a real world example
// of how the component would actually be imported into other apps.
// See webpack config for the alias responsbile for this import style.
import HelloWorld from 'ps-react/HelloWorld';

/** Custom message */
export default function ExampleHelloWorld() {
  return <HelloWorld message="Pluralsight viewers!" />
}