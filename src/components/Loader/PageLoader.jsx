import React from 'react'
import { ScaleLoader } from 'react-spinners'

const PageLoader = () => {
    return (
        <div className='bg-black col h-screen'>
            <ScaleLoader size={100} color='rgba(30, 215, 96, 1)' />
        </div>
    )
}

export default PageLoader