import React from "react";

type CardProps = {
  children?: React.ReactNode;
  className?: string;
  onClick?: () => void;
  animated?: boolean;
};

type CardHeaderProps = {
  children?: React.ReactNode;
  className?: string;
};

type CardTitleProps = {
  children?: React.ReactNode;
  className?: string;
};

type CardContentProps = {
  children?: React.ReactNode;
  className?: string;
};

function Card({ children, className = "", onClick, animated = true }: CardProps) {
  const baseStyles = "bg-background border border-border rounded-lg overflow-hidden";
  const animationStyles = animated ? "transition-all duration-300 ease-out" : "";
  const interactiveStyles = onClick 
    ? "cursor-pointer hover:border-coral hover:shadow-[0_8px_24px_rgba(200,90,48,0.12)] hover:scale-[1.02] active:scale-[0.98]" 
    : "shadow-sm hover:shadow-md transition-shadow duration-300";
  
  return (
    <div
      onClick={onClick}
      className={`${baseStyles} ${animationStyles} ${interactiveStyles} ${className}`.trim()}
    >
      {children}
    </div>
  );
}

function CardHeader({ children, className = "" }: CardHeaderProps) {
  return (
    <div className={`flex flex-row items-center justify-between gap-4 space-y-0 p-4 ${className}`.trim()}>
      {children}
    </div>
  );
}

function CardTitle({ children, className = "" }: CardTitleProps) {
  return (
    <h3 className={`text-base font-semibold text-foreground ${className}`.trim()}>
      {children}
    </h3>
  );
}

function CardContent({ children, className = "" }: CardContentProps) {
  return (
    <div className={`space-y-3 p-4 ${className}`.trim()}>
      {children}
    </div>
  );
}

Card.Header = CardHeader;
Card.Title = CardTitle;
Card.Content = CardContent;

export { CardHeader, CardTitle, CardContent };
export default Card;
