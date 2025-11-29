import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline';
  active?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'secondary', 
  active = false,
  className = '', 
  ...props 
}) => {
  const baseStyles = "px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500";
  
  const variants = {
    primary: "bg-indigo-600 text-white hover:bg-indigo-700 shadow-md",
    secondary: active 
      ? "bg-indigo-600 text-white shadow-md" 
      : "bg-white text-slate-600 hover:bg-slate-100 hover:text-slate-900 border border-slate-200",
    ghost: "bg-transparent text-slate-600 hover:text-indigo-600 hover:bg-indigo-50",
    outline: "bg-transparent border border-slate-300 text-slate-700 hover:border-indigo-500 hover:text-indigo-600"
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${className}`} 
      {...props}
    >
      {children}
    </button>
  );
};