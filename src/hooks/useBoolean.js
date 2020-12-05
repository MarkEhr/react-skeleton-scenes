import {useState, useCallback} from 'react';

/**
 * Usage:
 *
 * const [ value, setTrue, setFalse, toggleValue, setValue ] = useBoolean( true );
 *
 * @param initial
 * @returns {*[]}
 */
const useBoolean = ( initial = false )=>{

    const [elBool, setElBool ]= useState( !!initial );

    return [
        elBool,//value
        useCallback( ()=>setElBool(true), [] ),//set true
        useCallback( ()=>setElBool(false), [] ),//set false
        useCallback( ()=>setElBool( elBool=>!elBool ), [] ),//toggle
        setElBool//setter
    ]

};

export default useBoolean;
