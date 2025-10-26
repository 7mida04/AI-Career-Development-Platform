import React, { useState, useEffect } from 'react';
import { Button } from "./button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "../ui/card"

// Define the props interface for the component
interface ComponentSkeletonProps {
  title: string;
  description?: string;
}

const ComponentSkeleton: React.FC<ComponentSkeletonProps> = ({ title, description }) => {
  // State
  const [count, setCount] = useState<number>(0);

  // Effect
  useEffect(() => {
    // This effect runs after the component mounts
    console.log('Component mounted');

    // Cleanup function
    return () => {
      console.log('Component will unmount');
    };
  }, []); // Empty dependency array means this effect runs once on mount

  // Event handler
  const handleClick = () => {
    setCount((prevCount) => prevCount + 1);
  };

  // Render
  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>
        <p className="text-center text-2xl font-bold">{count}</p>
      </CardContent>
      <CardFooter className="flex justify-center">
        <Button onClick={handleClick}>Increment</Button>
      </CardFooter>
    </Card>
  );
};

export default ComponentSkeleton;

