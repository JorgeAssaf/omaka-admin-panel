import { useRef } from "preact/hooks";
import { Buttons } from "../../components/atoms/buttons";
import Colors from "../../utils/colors";
import { DescripcionPlan } from "./descripcion-plan";
import { Close } from "@mui/icons-material";
import { SvgIcon } from "@mui/material";
import StripePricingTable from './stripe-tables';

type ModalContrataInterface = {
  onClose: any;
  nivel: string;
};

const styleModal = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "45rem",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
  outline: 0
};

export const ModalContrata = ({ onClose, nivel }: ModalContrataInterface) => {
  const modalRef = useRef<HTMLDivElement>(null);

  const handleOverlayClick = (e: any) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      onClose();
    }
  };



  return (
    <div className="modal-overlay" onClick={(e) => handleOverlayClick(e)}>
      <div className="modal-wrapper full" ref={modalRef}>
        <button className="modal-close-button" onClick={() => onClose()}>
          <SvgIcon
            component={Close}
            fontSize="small"
            htmlColor={Colors().tizatl600}
          />
        </button>
        <div className="modal-content">
          <div className="modal-contrata">
            <StripePricingTable />
          </div>
        </div>
      </div>
    </div>
  );
};
