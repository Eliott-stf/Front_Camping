import React from 'react';

const CustomInput = ({ label, state, type, placeholder = '', callable }) => {
  return (
    <div className="mb-5">
        <label className="block text-plum-900 font-semibold mb-2 text-sm">
            {label}
        </label>
        <input 
            className="w-full px-4 py-3 rounded-md bg-white border border-plum-300 text-plum-900 placeholder-plum-400 focus:outline-none focus:border-plum-500 focus:ring-2 focus:ring-plum-200 transition-all duration-200 shadow-sm"
            type={type}
            placeholder={placeholder}
            value={state}
            onChange={callable}
        />
    </div>
  );
};

export default CustomInput;