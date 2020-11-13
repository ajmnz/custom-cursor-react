import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

import Cursor from './Cursor';
import {
  addHoverEvent, handleWindowEvent,
  removeHoverEvent, removeWindowEvent,
} from './utils';

import styles from './styles.module.css';

const CustomCursor = ({
  targets,
  customClass,
  fill,
  smoothness,
  strokeColor,
  strokeWidth,
  dimensions,
  opacity,
  targetOpacity,
  targetScale,
}) => {
  const ref = useRef(null);

  useEffect(() => {
    if (!ref) return null;

    const cursor = new Cursor(
      ref.current,
      smoothness,
      opacity,
      targetOpacity,
      targetScale,
    );

    addHoverEvent(cursor, targets);
    handleWindowEvent(cursor);

    return () => {
      removeHoverEvent(cursor, targets);
      removeWindowEvent(cursor);
      cursor.destroy();
    };
  }, [opacity, ref, smoothness, targetOpacity, targetScale, targets]);

  return (
    <div className={styles.cursor}>
      <svg
        ref={ref}
        className={customClass}
        height={dimensions}
        width={dimensions}
        viewBox={`0 0 ${dimensions} ${dimensions}`}
      >
        <circle
          cx={dimensions / 2}
          cy={dimensions / 2}
          r={(dimensions / 2) / 2}
          fill={fill}
          stroke={strokeColor}
          strokeWidth={strokeWidth}
        />
      </svg>
    </div>
  );
};

CustomCursor.propTypes = {
  targets: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.string,
  ]),
  customClass: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.string,
  ]),
  smoothness: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.shape({
      movement: PropTypes.number.isRequired,
      opacity: PropTypes.number.isRequired,
      scale: PropTypes.number.isRequired,
    }),
  ]),
  fill: PropTypes.string,
  strokeColor: PropTypes.string,
  strokeWidth: PropTypes.number,
  dimensions: PropTypes.number,
  opacity: PropTypes.number,
  targetOpacity: PropTypes.number,
  targetScale: PropTypes.number,
};

CustomCursor.defaultProps = {
  targets: '',
  customClass: 'cursor-circle',
  fill: '#000',
  smoothness: 0.2,
  strokeColor: '#000',
  strokeWidth: 0,
  dimensions: 50,
  opacity: 0.5,
  targetOpacity: 1,
  targetScale: 4,
};

export default CustomCursor;
