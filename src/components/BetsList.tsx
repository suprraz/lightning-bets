import { useSelector } from 'react-redux';
import { selectActiveBets } from '../redux/betsSlice';
import { netBroadcast } from '../messaging/netBroadcast';
import { selectScreenName } from '../redux/userSlice';
import { v4 as uuidv4 } from 'uuid';

const bets = [
  {
    id: '0001',
    amount: 100,
    condition: {
      label: 'btc > 19000 on 2023-01-15',
      url: 'https://api.coinpaprika.com/v1/coins/btc-bitcoin/ohlcv/historical?start=2023-01-15&end=2023-01-15',
      validator: '[0].open',
      comparison: '>',
      value: 19000
    }
  },
  {
    id: '0002',
    amount: 500,
    condition: {
      label: 'btc < 19000 on 2023-01-15',
      url: 'https://api.coinpaprika.com/v1/coins/btc-bitcoin/ohlcv/historical?start=2019-01-01&end=2019-01-20',
      validator: '[0].open',
      comparison: '<',
      value: 19000
    }
  }
];

function getBets() {
  return [
    { ...bets[0], id: uuidv4() },
    { ...bets[1], id: uuidv4() }
  ];
}

export default function BetsList() {
  const screenName = useSelector(selectScreenName);

  const activeBets = useSelector(selectActiveBets);

  const createBet = () => {
    netBroadcast('betList', { betList: getBets(), screenName });
  };

  return (
    <ul className="ml-4 p-5 box">
      <li key="createBet">
        <button onClick={() => createBet()}>Create Bet</button>
      </li>
      {activeBets.map((bet) => (
        <li key={bet.id}>
          <button className="button is-primary mb-2">
            <div>{`Bet ${bet.amount} satoshis: ${bet.condition.label}`}</div>
          </button>
        </li>
      ))}
    </ul>
  );
}
