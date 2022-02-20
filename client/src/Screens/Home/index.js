import Dashboard from "../Dashboard";
import LandingPage from "../LandingPage";
import authAction from '../../Redux/actions/authAction'

export default function Home() {
    const isAuthenticated = authAction.isAuthenticated();
    return (isAuthenticated ? <Dashboard /> : <LandingPage />);
}