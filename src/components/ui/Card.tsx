import React from "react";

type CardProps = {
  children?: React.ReactNode;
  className?: string;
  onClick?: () => void;
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

function Card({ children, className = "", onClick }: CardProps) {
  const baseStyles = "bg-background border border-border p-4 rounded-lg";
  const interactiveStyles = onClick ? "cursor-pointer hover:border-coral transition-colors" : "";
  
  return (
    <div
      onClick={onClick}
      className={`${baseStyles} ${interactiveStyles} ${className}`.trim()}
    >
      {children}
    </div>
  );
}

function CardHeader({ children, className = "" }: CardHeaderProps) {
  return (
    <div className={`flex flex-row items-center justify-between gap-4 space-y-0 ${className}`.trim()}>
      {children}
    </div>
  );
}

function CardTitle({ children, className = "" }: CardTitleProps) {
  return (
    <h3 className={`text-base font-semibold ${className}`.trim()}>
      {children}
    </h3>
  );
}

function CardContent({ children, className = "" }: CardContentProps) {
  return (
    <div className={`space-y-3 ${className}`.trim()}>
      {children}
    </div>
  );
}

Card.Header = CardHeader;
Card.Title = CardTitle;
Card.Content = CardContent;

export { CardHeader, CardTitle, CardContent };
export default Card;
