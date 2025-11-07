import ReferidosList from "./ReferidosList";
import Status from "../../constants/statusEnum";
const ReferidosAlumnos = () => {
  return (
    <div>
      <h3>Referidos Alumnos</h3>
      <ReferidosList status={Status.STUDENT} />
    </div>
  );
};

export default ReferidosAlumnos;
