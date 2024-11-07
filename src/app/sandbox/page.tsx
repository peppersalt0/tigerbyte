'use client'

import { useState, useRef, useEffect } from 'react';

interface Node {
  x: number;
  y: number;
  value: string;
  isDragging: boolean;
  velocityX: number;
  velocityY: number;
  scale: number;
  isEditing: boolean;
  colorIndex: number;
}

export default function SandboxPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const nodeRef = useRef<Node>({ 
    x: 100, 
    y: 100, 
    value: '42',
    isDragging: false,
    velocityX: 0,
    velocityY: 0,
    scale: 1,
    isEditing: false,
    colorIndex: 0
  });
  
  const colors = [
    '#000000', // Black
    '#FFFFFF', // White
    '#0072BB', // Blue
    '#FF0000', // Red
    '#00FF00', // Green
    '#FFD700', // Gold
    '#FF69B4', // Hot Pink
    '#9932CC',  // Dark Orchid
  ];
  
  const lastMousePosRef = useRef({ x: 0, y: 0 });
  const [inputPosition, setInputPosition] = useState({ x: 0, y: 0, show: false });
  const [, forceRender] = useState({});

  useEffect(() => {
    const img = new Image();
    img.src = 'images/otter.jpg';
    img.onload = () => {
      imageRef.current = img;
      forceRender({});
    };
  }, []);

  useEffect(() => {
    let animationFrameId: number;
    
    const animate = () => {
      const node = nodeRef.current;
      const canvas = canvasRef.current;
      
      if (!node.isDragging && !node.isEditing && canvas) {
        node.velocityX *= 0.98;
        node.velocityY *= 0.98;
        node.x += node.velocityX;
        node.y += node.velocityY;
        node.scale += (1 - node.scale) * 0.1;

        const nodeSize = 50;
        if (node.x < nodeSize) {
          node.x = nodeSize;
          node.velocityX = Math.abs(node.velocityX) * 0.8;
        } else if (node.x > canvas.width - nodeSize) {
          node.x = canvas.width - nodeSize;
          node.velocityX = -Math.abs(node.velocityX) * 0.8;
        }

        if (node.y < nodeSize) {
          node.y = nodeSize;
          node.velocityY = Math.abs(node.velocityY) * 0.8;
        } else if (node.y > canvas.height - nodeSize) {
          node.y = canvas.height - nodeSize;
          node.velocityY = -Math.abs(node.velocityY) * 0.8;
        }

        if (Math.abs(node.velocityX) > 0.01 || 
            Math.abs(node.velocityY) > 0.01 || 
            Math.abs(node.scale - 1) > 0.001) {
          forceRender({});
        }
      } else if (node.isDragging) {
        node.scale += (1.2 - node.scale) * 0.2;
        forceRender({});
      }
      
      draw();
      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  useEffect(() => {
    const resizeCanvas = () => {
      const canvas = canvasRef.current;
      const container = containerRef.current;
      if (!canvas || !container) return;

      const rect = container.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    return () => window.removeEventListener('resize', resizeCanvas);
  }, []);

  const draw = () => {
    const canvas = canvasRef.current;
    const img = imageRef.current;
    if (!canvas || !img) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const node = nodeRef.current;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const baseSize = 100;
    const scaledSize = baseSize * node.scale;
    
    ctx.drawImage(
      img,
      node.x - scaledSize/2,
      node.y - scaledSize/2,
      scaledSize,
      scaledSize
    );

    if (!node.isEditing) {
        const currentColor = colors[node.colorIndex];
        ctx.fillStyle = currentColor;
        ctx.font = 'bold 20px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        
        const shadowColor = currentColor === '#000000' ? 'rgba(255, 255, 255, 0.5)' : 'rgba(0, 0, 0, 0.5)';
        ctx.shadowColor = shadowColor;
        ctx.shadowBlur = 4;
        ctx.shadowOffsetX = 1;
        ctx.shadowOffsetY = 1;
        
        ctx.fillText(node.value, node.x, node.y);
        
        ctx.shadowColor = 'transparent';
        ctx.shadowBlur = 0;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;
    }
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const node = nodeRef.current;
    const distance = Math.sqrt(
      Math.pow(x - node.x, 2) + Math.pow(y - node.y, 2)
    );

    if (distance < 50) {
      lastMousePosRef.current = { x, y };
      node.isDragging = true;
      node.velocityX = 0;
      node.velocityY = 0;
      forceRender({});
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const node = nodeRef.current;
    if (!node.isDragging) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    node.velocityX = (x - lastMousePosRef.current.x) * 0.5;
    node.velocityY = (y - lastMousePosRef.current.y) * 0.5;
    
    node.x = x;
    node.y = y;
    lastMousePosRef.current = { x, y };
    
    forceRender({});
  };

  const handleMouseUp = () => {
    const node = nodeRef.current;
    if (node.isDragging) {
      node.isDragging = false;
      forceRender({});
    }
  };

  const handleDoubleClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const node = nodeRef.current;
    const distance = Math.sqrt(
      Math.pow(x - node.x, 2) + Math.pow(y - node.y, 2)
    );

    if (distance < 50) {
      node.isEditing = true;
      setInputPosition({ 
        x: node.x, 
        y: node.y, 
        show: true 
      });
    }
  };

  const handleInputComplete = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && inputRef.current) {
      nodeRef.current.value = inputRef.current.value;
      nodeRef.current.isEditing = false;
      setInputPosition(prev => ({ ...prev, show: false }));
    }
  };

  const handleInputBlur = () => {
    if (inputRef.current) {
      nodeRef.current.value = inputRef.current.value;
      nodeRef.current.isEditing = false;
      setInputPosition(prev => ({ ...prev, show: false }));
    }
  };

  const handleContextMenu = (e: React.MouseEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const node = nodeRef.current;
    const distance = Math.sqrt(
      Math.pow(x - node.x, 2) + Math.pow(y - node.y, 2)
    );

    if (distance < 50) {
      node.colorIndex = (node.colorIndex + 1) % colors.length;
      forceRender({});
    }
  };

  return (
    <div className="h-full flex flex-col gap-4" ref={containerRef}>
      <div className="flex justify-left">
        <div className="inline-flex border border-gray-300 rounded px-4 py-2 text-gray-800 font-bold text-center">
          Right Click Node To Cycle Colors <br />
          Double Click Node to Change Value
        </div>
      </div>
      <div className="flex-1 relative">
        <canvas
          ref={canvasRef}
          className="w-full h-full border border-gray-300 rounded"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onDoubleClick={handleDoubleClick}
          onContextMenu={handleContextMenu}
        />
        {inputPosition.show && (
          <input
            ref={inputRef}
            type="text"
            className="absolute transform -translate-x-1/2 -translate-y-1/2 w-16 text-center"
            style={{
              left: inputPosition.x,
              top: inputPosition.y
            }}
            defaultValue={nodeRef.current.value}
            onKeyDown={handleInputComplete}
            onBlur={handleInputBlur}
            autoFocus
          />
        )}
      </div>
    </div>
  );
}