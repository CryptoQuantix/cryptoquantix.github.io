import React, { useEffect, useRef, useState, useCallback } from 'react';
import Matter from 'matter-js'; // Assuming matter-js is installed or available
import { PhysicsObject, GravityMode } from '../types';

// Extend window to support dev tools if needed
declare global {
  interface Window {
    engine: Matter.Engine;
  }
}

interface PhysicsSceneProps {
  gravityMode: GravityMode;
  newObjectsQueue: string[];
  onObjectsConsumed: () => void;
}

const PhysicsScene: React.FC<PhysicsSceneProps> = ({ gravityMode, newObjectsQueue, onObjectsConsumed }) => {
  const sceneRef = useRef<HTMLDivElement>(null);
  const engineRef = useRef<Matter.Engine | null>(null);
  const renderLoopRef = useRef<number | null>(null);
  
  // We store react state to render the DOM elements, but their positions are updated via refs directly for performance
  const [bodies, setBodies] = useState<PhysicsObject[]>([]);
  const bodyRefs = useRef<Map<string, HTMLDivElement>>(new Map());

  // Initialize Engine
  useEffect(() => {
    const Engine = Matter.Engine;
    const Render = Matter.Render;
    const World = Matter.World;
    const Bodies = Matter.Bodies;
    const Mouse = Matter.Mouse;
    const MouseConstraint = Matter.MouseConstraint;
    const Composite = Matter.Composite;
    const Runner = Matter.Runner;

    const engine = Engine.create();
    engineRef.current = engine;
    
    // Default Gravity
    engine.gravity.y = 1;

    // Create a runner
    const runner = Runner.create();
    
    // Add Mouse Interaction
    // We need a mouse constraint to drag objects around
    // Since we are rendering DOM elements, we map the mouse to the container
    if (sceneRef.current) {
      const mouse = Mouse.create(sceneRef.current);
      const mouseConstraint = MouseConstraint.create(engine, {
        mouse: mouse,
        constraint: {
          stiffness: 0.1, // Softer drag
          render: { visible: false }
        }
      });
      Composite.add(engine.world, mouseConstraint);

      // Keep the mouse in sync with scrolling (though we disabled scroll)
      // mouse.element.removeEventListener("mousewheel", (mouse as any).mousewheel);
      // mouse.element.removeEventListener("DOMMouseScroll", (mouse as any).mousewheel);
    }

    // Walls
    const width = window.innerWidth;
    const height = window.innerHeight;
    const wallOptions = { isStatic: true, render: { visible: false } };
    const walls = [
      Bodies.rectangle(width / 2, height + 50, width, 100, wallOptions), // Floor
      Bodies.rectangle(width / 2, -500, width, 100, wallOptions), // Ceiling (high up)
      Bodies.rectangle(-50, height / 2, 100, height * 5, wallOptions), // Left
      Bodies.rectangle(width + 50, height / 2, 100, height * 5, wallOptions), // Right
    ];
    Composite.add(engine.world, walls);

    // Initial random bodies
    const initialShapes = ['Hello', 'World', 'Antigravity', 'React', 'Gemini'].map((text, i) => {
      const x = Math.random() * (width - 100) + 50;
      const y = Math.random() * (height / 2);
      const w = text.length * 15 + 40;
      const h = 60;
      
      const body = Bodies.rectangle(x, y, w, h, {
        chamfer: { radius: 30 }, // Rounded corners (pill shape)
        restitution: 0.9, // Bouncy
        friction: 0.005,
        frictionAir: 0.02,
        density: 0.05,
        label: text, // Store text in label
      });
      return body;
    });
    Composite.add(engine.world, initialShapes);

    // Initial State Sync
    const syncBodies = () => {
      const allBodies = Composite.allBodies(engine.world);
      const physicsObjects: PhysicsObject[] = allBodies
        .filter(b => !b.isStatic && b.label !== 'Mouse Constraint') // Filter out walls
        .map(b => ({
          id: b.id.toString(),
          text: b.label,
          x: b.position.x,
          y: b.position.y,
          width: (b.bounds.max.x - b.bounds.min.x),
          height: (b.bounds.max.y - b.bounds.min.y),
          angle: b.angle,
          type: 'rectangle'
        }));
      setBodies(physicsObjects);
    };
    syncBodies();

    Runner.run(runner, engine);

    // Custom Render Loop for syncing DOM
    const loop = () => {
      const allBodies = Composite.allBodies(engine.world);
      
      allBodies.forEach(b => {
        if (b.isStatic) return;
        const domEl = bodyRefs.current.get(b.id.toString());
        if (domEl) {
          // Direct DOM manipulation for 60fps performance without React reconciler overhead
          domEl.style.transform = `translate(${b.position.x - (b.bounds.max.x - b.bounds.min.x)/2}px, ${b.position.y - (b.bounds.max.y - b.bounds.min.y)/2}px) rotate(${b.angle}rad)`;
        }
      });
      
      renderLoopRef.current = requestAnimationFrame(loop);
    };
    loop();

    // Resize handler
    const handleResize = () => {
       // Ideally recreate walls, for now we just reload or ignore
       // A proper implementation would update wall body positions
       Matter.Body.setPosition(walls[0], { x: window.innerWidth / 2, y: window.innerHeight + 50 });
       Matter.Body.setPosition(walls[3], { x: window.innerWidth + 50, y: window.innerHeight / 2 });
    };
    window.addEventListener('resize', handleResize);

    return () => {
      Runner.stop(runner);
      Matter.Engine.clear(engine);
      if (renderLoopRef.current) cancelAnimationFrame(renderLoopRef.current);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Handle Gravity Changes
  useEffect(() => {
    if (!engineRef.current) return;
    const engine = engineRef.current;
    
    switch (gravityMode) {
      case GravityMode.ZERO:
        engine.gravity.y = 0;
        engine.gravity.x = 0;
        break;
      case GravityMode.REVERSE:
        engine.gravity.y = -0.5;
        engine.gravity.x = 0;
        break;
      case GravityMode.MOON:
         engine.gravity.y = 0.2;
         engine.gravity.x = 0;
         break;
      case GravityMode.NORMAL:
      default:
        engine.gravity.y = 1;
        engine.gravity.x = 0;
        break;
    }
    
    // Wake up all bodies when gravity changes so they react immediately
    Matter.Composite.allBodies(engine.current.world).forEach(b => {
        Matter.Body.setAwake(b, true);
        if(gravityMode === GravityMode.ZERO) {
           // Give a tiny random impulse to make them float nicely
           Matter.Body.applyForce(b, b.position, {
             x: (Math.random() - 0.5) * 0.05,
             y: (Math.random() - 0.5) * 0.05
           })
        }
    });

  }, [gravityMode]);

  // Handle New Objects
  useEffect(() => {
    if (newObjectsQueue.length > 0 && engineRef.current) {
      const engine = engineRef.current;
      const width = window.innerWidth;
      
      const newBodies = newObjectsQueue.map(text => {
        const w = text.length * 14 + 50; // Dynamic width based on text
        const h = 60;
        const x = Math.random() * (width - 200) + 100;
        const y = -100; // Start above screen
        
        return Matter.Bodies.rectangle(x, y, w, h, {
           chamfer: { radius: 30 },
           restitution: 0.8,
           friction: 0.005,
           frictionAir: 0.01,
           label: text
        });
      });

      Matter.Composite.add(engine.world, newBodies);
      
      // Update React state so DOM nodes are created
      setBodies(prev => [
        ...prev, 
        ...newBodies.map(b => ({
          id: b.id.toString(),
          text: b.label,
          x: b.position.x,
          y: b.position.y,
          width: (b.bounds.max.x - b.bounds.min.x),
          height: (b.bounds.max.y - b.bounds.min.y),
          angle: b.angle,
          type: 'rectangle' as const
        }))
      ]);

      onObjectsConsumed();
    }
  }, [newObjectsQueue, onObjectsConsumed]);

  return (
    <div ref={sceneRef} className="absolute inset-0 w-full h-full overflow-hidden bg-white z-0">
      {bodies.map((body) => (
        <div
          key={body.id}
          ref={(el) => {
            if (el) bodyRefs.current.set(body.id, el);
            else bodyRefs.current.delete(body.id);
          }}
          className="physics-body flex items-center justify-center bg-white border-2 border-black rounded-full shadow-lg"
          style={{
            width: `${body.width}px`,
            height: `${body.height}px`,
            // Transform is set by animation loop
          }}
        >
          <span className="font-bold text-lg pointer-events-none select-none text-black">
            {body.text}
          </span>
        </div>
      ))}
    </div>
  );
};

export default PhysicsScene;
