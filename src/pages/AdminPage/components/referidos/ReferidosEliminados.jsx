import ReferidosList from "./ReferidosList";
import Status from "../../constants/statusEnum";
const ReferidosEliminados = () => {
  return (
    <div>
      <h3>Referidos Eliminados</h3>
      <ReferidosList status={Status.DELETED} />
    </div>
  );
};

export default ReferidosEliminados;
