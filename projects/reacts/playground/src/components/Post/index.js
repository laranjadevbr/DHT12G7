import React from 'react';
import PropTypes from 'prop-types';
import './style.css';
function Post (props) {
    let getID = (element) => {
        return window.document.getElementById(element);
    }
    let changeFont = () => {
        getID(props['id']).style.fontSize = '25px';
    };
    let returnFont = () => {
        getID(props['id']).style.fontSize = '16px';
    };
    return (
        <div id={ props['id'] } className="post" onMouseOver={ changeFont } onMouseOut={ returnFont }>
            <p>{ props['title'] }</p>
            <ul>
                {
                    props['comment']
                    ?
                    props['comment'].map((result, index) => {
                        return <li key={ index } value={ result.toString() }>
                            { index + ') ' + result }
                        </li>
                    })
                    :
                    ''
                }
            </ul>
            <p>
                { 
                    props['comment']['length'] +
                    ' ' +
                    'comment' +
                    (props['comment']['length'] <= 1 ? '.' : 's.')
                }
            </p>
        </div>
    );
}
Post.defaultProps = {
    comment : null,
};
Post.propTypes = {
    title : PropTypes.string,
    comment : PropTypes.string,
};
export default Post;