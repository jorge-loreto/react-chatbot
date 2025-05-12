import './header.css';
import logoIteci from '../../assets/iteci-logo.jpeg';

function App() {
    return (
        <div className="chat-header">
            <img src={logoIteci} alt="Chat Logo"/>
            <h2>Chat Iteci v1.3</h2>
            <p className="small-text">10 Mayo 2025</p>
        </div>
    );
}

export default App;
