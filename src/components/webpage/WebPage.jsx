import './App.css';
import Profile from './components/Profile';
import React, { useEffect } from 'react'
import Links from './components/Links';
import { useSelector, useDispatch } from 'react-redux';
import Sponcers from './components/Sponsers';


function changeappearance(bodyStyle,cardStyle) {
  console.log(bodyStyle);

  document.documentElement.style.setProperty('--backgroungColor', bodyStyle.backgroundColor);
  document.documentElement.style.setProperty('--color', bodyStyle.color);
  document.documentElement.style.setProperty('--linkCardTextColor', cardStyle.color);
  document.documentElement.style.setProperty('--linkCardBackgroundColor', cardStyle.backgroundColor);
  document.documentElement.style.setProperty('--linkCardBorderRadius', cardStyle.borderRadius);
  document.documentElement.style.setProperty('--linkCardBorderColor', cardStyle.borderColor);
  document.documentElement.style.setProperty('--linkCardShadow', cardStyle.shadow);
  document.documentElement.style.setProperty('--linkCardBorderWidth', cardStyle.borderWidth);
}


function App() {
  const webpageConfig = useSelector(state => state.data.data);
  const sponsers = useSelector(state => state.sponsers.data)
  useEffect(() => {
    console.log(webpageConfig.appearance);
    changeappearance(webpageConfig.appearance.bodyStyle,webpageConfig.appearance.cardStyle);
  }, [webpageConfig])
  return (
    <div className="web-page grow">
      <Profile profile={webpageConfig.profile} ></Profile>
      <Links/>
      <Sponcers />

    </div>
  );
}

export default App;
