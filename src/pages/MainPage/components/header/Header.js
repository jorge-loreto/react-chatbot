import './header.css';
//import logoIteci from '../../assets/iteci-logo.jpeg';
import logoIteci from '../../../../assets/iteci-logo.jpeg';

function App() {
    return (
        <div className="chat-header">
            <img src={logoIteci} alt="Chat Logo"/>
            <h2>Bienvenido a Grupo iteci (v1.7)</h2>
            <p className="small-text">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;15 Agosto 2025</p>
        </div>
    );
}

export default App;
