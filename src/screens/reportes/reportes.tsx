import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { tomarRutas } from "../../api/rateQuerys";
import ItemReportTable from "../../components/atoms/itemReportTable";
import Loading from "../../components/atoms/loading";
import HeaderSection from "../../components/header/headerSection";
import { getListaPedidos } from "../../redux/actions";
import { RootState } from "../../redux/reducers/mainReducer";
import { AppDispatch } from "../../redux/store";
import { ParentScreenProps } from "../../types/typeAtoms";
import { RateType } from "../../types/typeRate";
import { getDateAndHour } from "../../utils/dateAndTime";
import { PanelDeControl } from "../panel-de-control/panel-de-control";
import DetallesReporte from "./detalles-reporte";
import "./styles.css";

type ReportListProps = {
  historyRateList: RateType[];
  setRateDetails: (rate: RateType) => void;
};


const Reportes = () => {
  const [loading, setLoading] = useState(false);
  const [activeRateList, setActiveRateList] = useState<RateType[]>([]);
  const [historyRateList, setHistoryRateList] = useState<RateType[]>([]);
  const [rateDetails, setRateDetails] = useState({} as RateType);
  const { DatosPersonales } = useSelector((state: RootState) => state.user.userData as any);
  const dispatch = useDispatch<AppDispatch>();
  const getRateList = async () => {
    setLoading(true);
    const reqBack = await tomarRutas(DatosPersonales.idUsuario, true);
    if (reqBack.status == "OK") {
      setActiveRateList(reqBack.activeRates);
      setHistoryRateList(reqBack.historyRates);
    }
    setLoading(false);
  };

  const getOrderList = async () => {
    dispatch(getListaPedidos(DatosPersonales.idUsuario));
  };
  
  useEffect(() => {  
      getRateList();
      getOrderList();
  }, []);


  if (loading) {
    return (
      <div className="full-container center absolute">
        <Loading />
      </div>
    );
  }

  return (
    <PanelDeControl currentSection='/panel/reportes'>
      <div className="reportes-container">
        {rateDetails.idRuta ? (
          <DetallesReporte setRateDetails={()=>setRateDetails({} as RateType )} rate={rateDetails} />
        ) : (
          <ReportList
            setRateDetails={setRateDetails}
            historyRateList={historyRateList}
          />
        )}
      </div>
    </PanelDeControl>
  );
};



const ReportList = ({ historyRateList, setRateDetails }: ReportListProps) => {
  return (
    <div className='table-container'>
    <div className='header-table-container'>
      <p className='table-child-header' >Nombre ruta</p>
      <p className='table-child-header' >Repartidor</p>
      <p className='table-child-header' >Fecha creacion</p>
      <p className='table-child-header' >Fecha entrega</p>
      <p className='table-child-header small' >Pedidos entregados</p>
      <p className='table-child-header small' >Pedidos detenidos</p>
      <p className='table-child-header small' >Status</p>
    </div>
          {historyRateList.map((route) => (
            <ItemReportTable datosRow={route} setRateDetails={setRateDetails} />
          ))}
    </div>
  );
};

export default Reportes;

