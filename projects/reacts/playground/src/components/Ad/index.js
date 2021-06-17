import React from 'react';
export default function Ad (props) {
    return (
        <p>
            {
                props['children']
            }
        </p>
    );
}