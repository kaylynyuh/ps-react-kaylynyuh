import React from 'react';
import ProgressBar from 'ps-react/ProgressBar';

/** 70% progress and height 20px*/
export default function Example70Percent() {
  return <ProgressBar percent={70} width={150} height={20}/>
}