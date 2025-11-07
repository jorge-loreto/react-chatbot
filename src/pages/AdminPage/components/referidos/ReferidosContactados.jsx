import ReferidosList from "./ReferidosList";
import Status from "../../constants/statusEnum";

const ReferidosContactados = () => {
  return (
    <div>
      <h3>Referidos Contactados</h3>

      <ReferidosList status={Status.CONTACTED} />
    </div>
  );
};

export default ReferidosContactados;
