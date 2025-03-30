import React, { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ChatMessageListProps {
  className?: string;
  children: ReactNode;
}

const ChatMessageList = ({ className, children }: ChatMessageListProps) => {
  return (
    <div className="relative w-full h-full">
      <div
        className={cn(
          "flex flex-col w-full h-full p-4",
          className
        )}
      >
        <div className="flex flex-col gap-6">{children}</div>
      </div>
    </div>
  );
};

ChatMessageList.displayName = "ChatMessageList";

export { ChatMessageList };
