import {useState} from "react";
import useCallbackCreator from "use-callback-creator";

const useFormState = ( initialState={} )=>{

    const [form, setForm] = useState(initialState);

    const handleInputChange=useCallbackCreator((name, e) =>  {
        setForm({...form, [name]:e.target.value}) ;
    }, [form]);

    const handleSimpleChange=useCallbackCreator((name, value)=>
        setForm({...form, [name]:value})
        ,[form]);

    return {
        form,
        setForm,
        handleInputChange,
        handleSimpleChange
    }

};

export default useFormState;
