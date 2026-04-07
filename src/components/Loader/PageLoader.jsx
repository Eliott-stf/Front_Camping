import React from 'react'
import { BounceLoader } from 'react-spinners'

const PageLoader = () => {
    return (
        <div className='bg-black col h-screen'>
           <BounceLoader size={100} color="rgba(93, 67, 96, 1)"/>
        </div>
    )
}

export default PageLoader