import Image from "next/image";
import React from 'react';
import { Button } from "../ui/button";

const Header: React.FC = () => {
  return (
    <header className="flex items-center bg-foreground p-4 w-full border-b border-border">
      <Image 
        width={55} 
        height={10} 
        draggable={false} 
        src="/immi2.png" 
        alt="immi" 
        className="select-none rounded-sm" 
      />
      <div className="ml-auto flex space-x-1">
        <Button variant="secondary">Sign in</Button>
        <Button variant="secondary">Sign up</Button>
      </div>
    </header>
  );
}

export default Header;
