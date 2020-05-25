import React from 'react';
import { history } from 'umi'

export default function index(props){
    history.push('/app');
    return <div></div>; 
}