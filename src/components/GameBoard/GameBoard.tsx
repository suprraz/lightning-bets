import './gameboard.css';
import Puck from '../Puck/Puck';
import { useEffect, useState } from 'react';
import Goal from '../Goal/Goal';

const screenWidth = 500;
const screenHeight = 350;
const puckSize = 20;
const knobSize = 30;
const contactDist = 20;

export default function GameBoard() {
  const [moving, setMoving] = useState(false);
  const [x, setX] = useState(Math.floor(screenWidth / 2));
  const [y, setY] = useState(Math.floor(screenHeight / 2));
  const [knobFrozen, setKnobFrozen] = useState(false);

  const [knobX, setKnobX] = useState(0);
  const [knobY, setKnobY] = useState(screenHeight - knobSize);

  const [dx, setDx] = useState(0);
  const [dy, setDy] = useState(0);

  useEffect(() => {
    if (!moving) {
      let nextX;
      let nextY;

      if (dx > 0) {
        if (x < screenWidth - puckSize) {
          nextX = x + dx;
        } else {
          setDx(0 - dx);
          nextX = x - dx;
        }
      } else {
        if (x > 0) {
          nextX = x + dx;
        } else {
          setDx(0 - dx);
          nextX = x - dx;
        }
      }

      if (dy > 0) {
        if (y < screenHeight - puckSize) {
          nextY = y + dy;
        } else {
          setDy(0 - dy);
          nextY = y - dy;
        }
      } else {
        if (y > 0) {
          nextY = y + dy;
        } else {
          setDy(0 - dy);
          nextY = y - dy;
        }
      }

      setX(nextX);
      setY(nextY);

      setMoving(true);

      setTimeout(() => {
        setMoving(false);
      }, 20);
    }
  }, [x, y, dx, dy, moving]);

  const handleMouseMove = (e: any) => {
    if (e.target?.classList?.contains('game-board') && !knobFrozen) {
      const mouseX = e.layerX - knobSize / 2;
      const mouseY = e.layerY - knobSize / 2;

      setKnobX(mouseX);
      setKnobY(mouseY);

      const distX = Math.max(mouseX, x + puckSize / 2) - Math.min(mouseX, x + puckSize / 2);
      const distY = Math.max(mouseY, y + puckSize / 2) - Math.min(mouseY, y + puckSize / 2);
      const dist = Math.sqrt(distX * distX + distY * distY);

      if (dist < contactDist) {
        const ampX = e.movementX / 5.0;
        setDx(ampX);

        const ampY = e.movementY / 5.0;
        setDy(ampY);

        setKnobFrozen(true);
        setTimeout(() => {
          setKnobFrozen(false);
        }, 1000);
      }
    }
  };

  const handleKeyDown = (e: any) => {
    if (e.keyCode === 39) {
      e.stopPropagation();
      console.log('keyright ', dx + 1);
      setDx(dx + 0.1);
    }

    if (e.keyCode === 37) {
      e.stopPropagation();
      console.log('keyleft', dx - 1);
      setDx(dx - 0.1);
    }

    if (e.keyCode === 40) {
      e.stopPropagation();
      console.log('keydown');
      setDy(dy + 0.1);
    }

    if (e.keyCode === 38) {
      e.stopPropagation();
      console.log('keyup');
      setDy(dy - 0.1);
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  });

  return (
    <section className={`game-board ${knobFrozen ? 'freeze-knob' : ''}`}>
      <Puck x={x} y={y} />
      <Goal right={false} />
      <Goal right />
    </section>
  );
}
