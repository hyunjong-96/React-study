import {useState,useCallback,useReducer} from 'react'

function reducer(state,action){
    switch(action.type){
        case 'CHANGE_INPUT':
            return{
                ...state,
                [action.name]:action.value
            }
        case 'RESET_INPUT':
            return{
                username:'',
                email:''
            }
        default:
            return state
    }
}

function useInputs(initialForm){
    const [form,dispatch] = useReducer(reducer,initialForm)
    // const [form, setForm] = useState(initialForm)

    const onChange = useCallback((e)=>{
        const {name,value}=e.target
        // setForm(form=>({...form,[name]:value}))
        dispatch({
            type:'CHANGE_INPUT',
            name,
            value
        })
    },[])

    // const reset = useCallback(()=>setForm(initialForm),[initialForm])
    const reset = useCallback(()=>dispatch({
        type:'RESET_INPUTS'
    }),[])
    return [form, onChange, reset]
}

export default useInputs