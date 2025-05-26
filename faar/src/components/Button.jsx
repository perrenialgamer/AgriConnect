import React from 'react'

export default function Button({text
    ,type='button',
    bgColor='bg-blue-500',
    textColor='text-white',
    className='',
    ...props
    }) {
  return (
    <button className={`px-6 py-2 rounded-full  ${bgColor} ${textColor} ${className}`} {...props}>
        {text}
    </button>
  )
}

