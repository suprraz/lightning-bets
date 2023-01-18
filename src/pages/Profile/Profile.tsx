import ScreenNameSetter from '../../components/ScreenNameSetter';
import { useDispatch, useSelector } from 'react-redux';
import { loadScreenName, saveScreenName, selectScreenName } from '../../redux/slices/userSlice';
import { useEffect } from 'react';
import { AppDispatch } from '../../redux/store';
import { setActivePath } from '../../redux/slices/routeSlice';

export default function Profile() {
  const dispatch = useDispatch<AppDispatch>();
  const screenName = useSelector(selectScreenName);

  useEffect(() => {
    if (!screenName) {
      dispatch(loadScreenName());
    }
  }, [screenName, dispatch]);

  useEffect(() => {
    if (screenName) {
      dispatch(setActivePath('dashboard'));
    }
  }, [screenName, dispatch]);

  const updateScreenName = (screenName: string) => {
    dispatch(saveScreenName(screenName));
  };

  return (
    <div className="container" id="homeScreen" data-anchor="homeScreenAnchor">
      <section className="mt-6 notification is-info is-flex is-flex-direction-column is-justify-content-center is-align-content-center">
        <p className="title">Lightning Bets</p>
        <p className="title">ScreenName: {screenName}</p>

        <ScreenNameSetter onSet={(screenName) => updateScreenName(screenName)} />
      </section>
    </div>
  );
}
