import React from "react";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full flex items-center justify-center min-h-screen
    ">
      {/* bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-green-400 via-green-600 to-green-800 */}
        {children}
    </div>

  )
  
};

export default AuthLayout;
