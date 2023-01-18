import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { BetType, selectBetlist, takeBet, updateBets } from '../redux/slices/betsSlice';
import { netMulticast } from '../messaging/netMulticast';
import { selectScreenName } from '../redux/slices/userSlice';
import { v4 as uuidv4 } from 'uuid';
import { useEffect } from 'react';

const mockBets: BetType[] = [
  {
    id: '0001',
    amount: 100,
    status: 'open',
    condition: {
      label: 'btc > 19000 on 2023-01-15',
      url: 'https://api.coinpaprika.com/v1/coins/btc-bitcoin/ohlcv/historical?start=2023-01-15&end=2023-01-15',
      validator: '[0].open',
      comparison: '>',
      value: 19000
    },
    updated: Date.now()
  },
  {
    id: '0002',
    amount: 500,
    status: 'open',
    condition: {
      label: 'btc < 19000 on 2023-01-15',
      url: 'https://api.coinpaprika.com/v1/coins/btc-bitcoin/ohlcv/historical?start=2019-01-01&end=2019-01-20',
      validator: '[0].open',
      comparison: '<',
      value: 19000
    },
    updated: Date.now()
  }
];

function makeBet() {
  return {
    ...mockBets[0],
    id: uuidv4(),
    comparison: Math.random() > 0.5 ? '<' : '>'
  };
}

export default function BetsList() {
  const dispatch = useDispatch();

  const screenName = useSelector(selectScreenName);

  const betList = useSelector(selectBetlist, shallowEqual);

  const onMakeBet = () => {
    const bet = makeBet();
    dispatch(updateBets([bet]));
  };

  const onTakeBet = (betId: string) => {
    dispatch(takeBet(betId));
  };

  useEffect(() => {
    netMulticast('betList', { betList, screenName });
  }, [betList, screenName]);

  return (
    <ul className="ml-4 p-5 box">
      <li key="createBet">
        <button onClick={() => onMakeBet()}>Create Bet</button>
      </li>
      {betList.map((bet) => (
        <li key={bet.id}>
          <button
            onClick={() => onTakeBet(bet.id)}
            className={`button mb-2 ${bet.status === 'open' ? 'is-primary' : ''}`}>
            <div>{`Bet ${bet.amount} satoshis: ${bet.condition.label}`}</div>
          </button>
        </li>
      ))}
    </ul>
  );
}
