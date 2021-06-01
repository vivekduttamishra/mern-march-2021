import HomeScreen from './screens/home-screen';
import LoginScreen from './screens/login-screen';
import RegisterScreen from './screens/register-screen';
import ProfileScreen from './screens/profile-screen';
import BookInfoScreen from './screens/book-info-screen';



const routes= [
    {name: 'HomeScreen',  path:'/', exact: true, component: HomeScreen},
    {name:'LoginScreen',  path:'/user/login', component: LoginScreen},
    {name:'RegisterScreen', path:'/user/register', component: RegisterScreen},
    {name:'ProfileScreen', path:'/user/profile', component: ProfileScreen},
    {name:'BookInfoScreen', path:'/books/:isbn', component: BookInfoScreen}
];

export default routes;