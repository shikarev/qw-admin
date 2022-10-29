import React, {useState} from 'react';
import Incrementor from "./Incrementor";

const CounterButtons = (props:any) => {

    const min = 1;
    const max = 999;

    const [value, setValue] = useState(props.value);

    return (
        <>
            <Incrementor
                value={value}
                onChange={(v: React.SetStateAction<number>) => setValue(v)}
                min={min}
                max={max}
                ks
            />
        </>
    );
};

export default CounterButtons;