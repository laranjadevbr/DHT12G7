import React, { useState, useEffect } from 'react';
import axios from 'axios';
function Request (props) {
    const [ data, setData ] = useState([]);
    useEffect(() => {
        async function fetchData () {
            await axios({
                method : 'GET',
                url : 'https://pokeapi.co/api/v2/pokemon/',
            }).then((result) => {
                setData(result['data'].results);
            });
        }
        fetchData();
    }, []);
    return (
        <div className='request'>
            {
                data
                ?
                data.map((data, index) => {
                    return <li key={ index }>
                        { data['name'] }
                    </li>
                })
                :
                ''
            }
        </div>
    );
};
export default Request;