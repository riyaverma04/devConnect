import React, { useState } from 'react'

const Form = ({ label, type, valueToDisplay ,onChange}) => {
  
    return (
        <div className='w-full max-w-md space-y-1'>

           <fieldset className="fieldset p-0 m-0">
        <legend className="capitalize fieldset-legend text-[16px] font-bold">
          {label}
        </legend>

        {type === "file" ? (
          <input
            type="file"
            className="input pt-2"
            onChange={(e) => onChange(e.target.files[0])}   
            name={label}
          />
        ) : type === "textarea" ? (
          <textarea
            className="textarea"
            value={valueToDisplay || ""}
            onChange={(e) => onChange(e.target.value)}      
            name={label}
          />
        ) : (
          <input
            type={type}
            className="input"
            value={valueToDisplay || ""}
            onChange={(e) => onChange(e.target.value)}      
            name={label}
          />
        )}
      </fieldset>



        </div>
    )
}

export default Form
