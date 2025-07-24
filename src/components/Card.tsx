import React from "react";

export default function Card({ children, layout }: { children?: React.ReactNode, layout?: string }) {
    return (
        <div 
            className={`${layout} h-auto backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/8 transition-all duration-500 group`}
            style={{
              position: 'relative',
            }}
          >
            <div 
              className="absolute inset-0 rounded-2xl -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{
                background: 'linear-gradient(90deg, #F9B16E, #F68080)',
                backgroundSize: '300% 100%',
                padding: '3px',
                mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                maskComposite: 'exclude',
                animation: 'wave 5s ease-in-out infinite'
              }}
            />
            {children}
        </div>
    );
};
