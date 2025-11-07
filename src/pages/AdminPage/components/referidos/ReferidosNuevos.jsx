import ReferidosList from "./ReferidosList";
import Status from "../../constants/statusEnum";
const ReferidosNuevos = () => {
  return (
    <div>
      <h3>Referidos Nuevos</h3>
      <ReferidosList status={Status.NEW} />
    </div>
  );
};

export default ReferidosNuevos;
