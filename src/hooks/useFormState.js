import {useState} from "react";
import useCallbackCreator from "use-callback-creator";

export default ( initialState={} )=>{

    const [form, setForm] = useState(initialState);

    const handleInputChange=useCallbackCreator((name, e) =>  {
        setForm({...form, [name]:e.target.value}, [form]) ;
    });

    const handleSimpleChange=useCallbackCreator((name, value)=>  setForm({...form, [name]:value}) ,[form]);

    return {
        form,
        setForm,
        handleInputChange,
        handleSimpleChange
    }

};
