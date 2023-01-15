import ScreenNameSetter from '../components/ScreenNameSetter';
import { useDispatch } from 'react-redux';
import { setScreenName } from '../redux/userSlice';
import { setActivePath } from '../redux/routeSlice';

export default function LandingPage() {
  const dispatch = useDispatch();

  const updateScreenName = (screenName: string) => {
    dispatch(setScreenName(screenName));
    dispatch(setActivePath('dashboard'));
  };

  return (
    <div className="container" id="homeScreen" data-anchor="homeScreenAnchor">
      <section className="mt-6 notification is-info is-flex is-flex-direction-column is-justify-content-center is-align-content-center">
        <p className="title">Lightning Bets</p>

        <ScreenNameSetter onSet={(screenName) => updateScreenName(screenName)} />
      </section>
    </div>
  );
}
