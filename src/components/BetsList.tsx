export default function BetsList() {
  const bets = [{
    id: '0001',
    amount: 100,
    condition: 'BTC > 17200 on Jan 10 at 11:00am PST',
  },
    {
      id: '0002',
      amount: 500,
      condition: 'BTC > 17100 on Jan 10 at 11:00am PST',
    },
    {
      id: '0003',
      amount: 400,
      condition: 'BTC < 16900 on Jan 10 at 11:00am PST',
    }];

  return (
    <ul className='ml-4 p-5 box'>
      {bets.map(bet => <li>
        <button className='button is-primary mb-2'>
          Bet {bet.amount} satoshis: {bet.condition}
        </button>
      </li>)}
    </ul>);
}
