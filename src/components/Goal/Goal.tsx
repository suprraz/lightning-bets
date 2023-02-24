export default function Goal({ right }: { right: boolean }) {
  return <div className={`goal ${right ? 'right' : ''}`}></div>;
}
