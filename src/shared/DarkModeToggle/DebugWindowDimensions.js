import React from 'react';
import useWindowDimensions from '../hooks/useWindowDimensions';

const DebugWindowDimensions = () => {
    const { width, height } = useWindowDimensions();

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            right: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.75)',
            color: 'white',
            padding: '0.5rem',
            zIndex: 1000
        }}>
            {width}px / {height}px
        </div>
    );
};

export default DebugWindowDimensions;
