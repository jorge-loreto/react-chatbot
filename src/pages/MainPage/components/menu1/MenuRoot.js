import React, { useEffect, useState, useRef } from "react";
import { rootApi } from "../api/apiRoot";
import MenuRoot2 from "../menu2/MenuRoot2";
import MenuRoot3 from "../menu3/MenuRoot3";
import ChatPlaceCategory from "../chat-place/ChatPlaceCategory";
import FortuneWheel from '../rueda/FortuneWheel';
import GenerateCode from "../utils/GenerateCode";
import FormComponent from "../referidos/FormComponent";
import CampusSelector from "../campusSelector/CampusSelector";
import CategoryIcons from "../loader/CategoryIcons";


const App = () => {
    const [selectedOption, setSelectedOption] = useState(999);
    const [loading, setLoading] = useState(false);
    const [menuOptions, setMenuOptions] = useState([
        { id: "option1", name: "Loading ..." }
    ]);
    const [plantelSelected, setPlantelSelected] = useState({});
    const hasFetched = useRef(false); // Track first render
    const [curso, setCurso] = useState(777);
    const premioRef = useRef({
        nombre: 'test',
        celular: '496-123-7890',
        id : '',
        category: '',
        plantel: '',
        premio: '',
        fecha: '',
        valido: '',
        fechaInicio:'',
        horario:'',
        inscripcion: 0,
        telefonoEscuela: '',
        tarjetaBancomer: '',
        oxxo: '',
      });

     useEffect(() => {
        if (hasFetched.current) return; // Prevent second execution
        hasFetched.current = true;

        const fetchData = async () => {
            setLoading(true);
            try {
                console.log("Calling places API...");
                const data = await rootApi();
                console.log('DATA RESPONSE: {}', data);
                if (data && Array.isArray(data)) {
                    const options = data.map((place) => ({
                        id: place.id.toString(),
                        name: place.name
                    }));
                    // Remove the object where 'name' or 'description' contains 'GENERAL'
                    const filteredData = data.filter(item => !item.name.includes('GENERAL') && !item.description.includes('GENERAL'));

                    console.log('filteredData: {}', filteredData);
                    setMenuOptions(filteredData);
                }
            } catch (err) {
                console.error("Failed to fetch places:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        if (curso===777) return;
        setSelectedOption(777)
    }, [curso]);

    return (
        <div style={styles.container}>
            {selectedOption === 999 ? (
                <div style={styles.menu}>
                    {loading ? (
                        <div>
                            <p>Loading...</p>
                            <h2>Programas disponibles</h2>
                            <CategoryIcons />
                        </div>
                    ) : (
                        <CampusSelector 
                            menuOptions={menuOptions} 
                            loading={false} 
                            setSelectedOption={setSelectedOption} 
                            setPlantelSelected={setPlantelSelected}  />  
                    )}
                    
                </div>
            ) : selectedOption === 888?(
                <div style={styles.option}>
                    
                    <button style={styles.button2} onClick={() => {
                        setSelectedOption(999)
                        setCurso(777);
                    }}>
                        Menu Anterior
                    </button>
                    <MenuRoot2 place={menuOptions[plantelSelected]} curso={curso} setCurso={setCurso}></MenuRoot2>
                </div>
            ): selectedOption === 777 ?(
                <div style={styles.option}>
                    <button style={styles.button2} onClick={() => {
                        setSelectedOption(999)
                        setCurso(777);
                    }}>
                        Principal
                    </button>

                    <button style={styles.button} onClick={() => {
                        setSelectedOption(888);
                        setCurso(777);
                    }}>
                        Menu Anterior
                    </button>

                    <MenuRoot3 place={menuOptions[plantelSelected]} curso={curso} setSelectedOption={setSelectedOption} ></MenuRoot3>
                    
                    <button style={styles.button3} onClick={() => {
                        /*setSelectedOption(888);
                        setCurso(777);*/
                        setSelectedOption(666);
                    }}>
                        Preguntas frecuentes
                    </button>
                    <button style={styles.button} onClick={() => {
                        /*setSelectedOption(888);
                        setCurso(777);*/
                        setSelectedOption(555);//llama a REFERIDO
                    }}>
                        🎁 ¡Gira y gana!
                    </button>
                </div>
            
            ): selectedOption === 555 ? (
                <div style={styles.option}>
                    <button style={styles.button2} onClick={() => {
                        setSelectedOption(999)
                        setCurso(777);
                    }}>
                        Principal
                    </button>
                    <button style={styles.button} onClick={() => {
                        setSelectedOption(777);
                    }}>
                        Menu Anterior
                    </button>
                    <FortuneWheel 
                        place={menuOptions[plantelSelected]} 
                        curso={curso} 
                        setSelectedOption={setSelectedOption}
                        premioRef={premioRef}
                        />
                </div>
            ): selectedOption === 444 ? (
                <div style={styles.option}>
                    <button style={styles.button2} onClick={() => {
                        setSelectedOption(999)
                        setCurso(777);
                    }}>
                        Principal
                    </button>
                    <button style={styles.button} onClick={() => {
                        setSelectedOption(777);
                    }}>
                        Menu Anterior
                    </button>
                    <GenerateCode data={premioRef.current}></GenerateCode>
                   
                </div>
            ): selectedOption === 1001 ? (
                <div style={styles.option}>
                    <button style={styles.button2} onClick={() => {
                        setSelectedOption(999)
                        setCurso(777);
                    }}>
                        Principal
                    </button>
                    <button style={styles.button} onClick={() => {
                        setSelectedOption(777);
                    }}>
                        Menu Anterior
                    </button>
                    <FormComponent 
                        setSelectedOption={setSelectedOption}
                        premioRef={premioRef}/>
                   
                </div>
            ): 
            (
                <div style={styles.option}>
                    <button style={styles.button} onClick={() => {
                        setSelectedOption(777);
                    }}>
                        Menu Anterior
                    </button>
                   <ChatPlaceCategory place={menuOptions[plantelSelected]} curso={curso}></ChatPlaceCategory>
                </div>
            )}
        </div>
    );
};

const styles = {
    container: { textAlign: "center", padding: "20px" },
    menu: { marginTop: "1px" },
    option: { marginTop: "1px" },
    button: {
        margin: "10px",
        padding: "10px 5px",
        fontSize: "16px",
        cursor: "pointer",
        borderRadius: "5px",
        border: "1px solid black",
        backgroundColor: "#007bff",
        color: "#fff"
    },
    button2: {
        margin: "10px",
        padding: "10px 5px",
        fontSize: "16px",
        cursor: "pointer",
        borderRadius: "5px",
        border: "1px solid black",
        backgroundColor: "#007bff",
        color: "#fff",
        textAlign: "left"
    },
    button3: {
        display: "none"
    },
};

export default App;
