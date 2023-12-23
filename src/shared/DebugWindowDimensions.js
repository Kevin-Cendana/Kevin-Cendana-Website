import React from 'react';
import useWindowDimensions from '../hooks/useWindowDimensions';

const DebugWindowDimensions = () => {
    const { width, height } = useWindowDimensions();

    return (
        <div style={{
            position: 'fixed',
            bottom: 0,
            left: 0,
            backgroundColor: 'white',
            opacity: .8,
            color: 'black',
            padding: '.8rem',
            fontSize: '2rem',
            zIndex: 1000
        }}>
            W: {width}px / H: {height}px
        </div>
    );
};

export default DebugWindowDimensions;
