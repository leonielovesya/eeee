import React from 'react';
import { MessageCircle, PlusCircle } from 'lucide-react';
import { Button } from '../ui/button';

const Sidebar: React.FC = () => {
  const chats = [
    { id: 1, title: 'rbx condo game' },
    { id: 2, title: "roblox corn" },
    { id: 3, title: 'Is taiwan a country' },
  ];

  return (
    <aside className="w-50 min-h-screen bg-foreground border-border border-1 border-t-0 p-2">
      <h2 className="text-white opacity-80 font-medium mb-4">Chats</h2>

      <Button className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2 px-4 py-2 mb-2" variant="secondary">
        <PlusCircle className="w-5 h-5" />
        <span>New Chat</span>
      </Button>

      <div className="space-y-2">
        {chats.map(chat => (
          <div key={chat.id} className="flex text-muted-foreground items-center p-2 rounded-lg cursor-pointer">
            <MessageCircle className="w-5 h-5 mr-1" />
            <span>{chat.title}</span>
          </div>
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;
