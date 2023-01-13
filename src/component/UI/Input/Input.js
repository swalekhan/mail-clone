import { forwardRef } from "react"

const Input = (props, ref) =>{
    return (
        <>
            <label htmlFor={props.id}>{props.label}</label>
            <input ref={ref} {...props.input}/>
        </>
    )
}

export default forwardRef(Input)