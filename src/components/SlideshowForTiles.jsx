import React, { useState, useEffect } from 'react';
import { useStore } from '@nanostores/react';
import { comboViewerCounter, comboViewerInterval } from '../store';

export default function SlideshowForTiles({ childIndex, duration, children }) {
  const childrenAsReactArray = React.Children.toArray(children);

  const $comboViewerCounter = useStore(comboViewerCounter)
  const $comboViewerInterval = useStore(comboViewerInterval)

  return (
    <div className="slideshow">
      {
        (childIndex === $comboViewerCounter) ? 
          childrenAsReactArray[0] : <></>
      }
    </div>
  );
}