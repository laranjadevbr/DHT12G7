import React from 'react';
import Post from '../Post/';
let Feed = (props) => {
    let getRandom = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };
    const templateText = 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Officiis dignissimos molestiae nobis doloribus? Iusto fugiat dignissimos incidunt ea vel? Animi fugiat odio ipsam dolor autem, harum officia est nostrum voluptatum.';
    let getComment = (number) => {
        let array = [];
        for (let i = 0; i <= getRandom(1, number); i++) {
            array.push(templateText);
        }
        return array;
    }
    let rows = [];
    for (let i = 0; i <= 2; i++) {
        rows.push(<Post
            id={ 'post-' + i }
            title={ 'Post: ' + Number(i + 1) }
            comment={ getComment(3) }
        />);
    }
    return (
        <div id={ 'feed' } className={ 'feed' }>
            { rows }
        </div>
    );
}
export default Feed;