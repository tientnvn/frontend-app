// This is the JSON way to define React Router rules in a Rekit app.
// Learn more from: http://rekit.js.org/docs/routing.html

// This is the JSON way to define React Router rules in a Rekit app.
// Learn more from: http://rekit.js.org/docs/routing.html
import {
  WelcomePage,
  RotateImagePage,
  Layout,
  HotelReservation,
} from './';

export default {
  path: '/',
  name: 'Exercises',
  component: Layout,
  childRoutes: [
    { path: '', name: 'Welcome page', component: WelcomePage },
    { path: 'exercise-01', name: 'Rotate image', component: RotateImagePage },
    { path: 'exercise-02', name: 'Hotel reservation', component: HotelReservation },
  ],
};
