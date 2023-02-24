export default function Puck({ x, y }: { x: number; y: number }) {
  const style = {
    top: y + 'px',
    left: x + 'px'
  };
  return <div className="puck" style={style}></div>;
}
