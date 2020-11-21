import React, { useEffect, useState } from 'react';
import Navigation from './Navigation';
import ComponentPage from './ComponentPage';
import componentData from '../../config/componentData';

const Docs = () => {
  const [route, setRoute] = useState(window.location.hash.substr(1));
  // the route in the URL should match the component's name
  // if there's no route specified, display first component of the list
  const component = route ? componentData.filter( component => component.name === route)[0] : componentData[0];

  useEffect(() => {
    window.addEventListener('hashchange', () => {
      setRoute({route: window.location.hash.substr(1)})
    });
    return () => {
      window.removeEventListener('hashchange', () => {
        setRoute({route: window.location.hash.substr(1)})
      });
    }
  })

  return (
    <div>
      <Navigation components={componentData.map(component => component.name)} />
      <ComponentPage component={component} />
    </div>
  )
}

export default Docs;