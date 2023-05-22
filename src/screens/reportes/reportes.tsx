import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { tomarRutas } from "../../api/rateQuerys";
import ItemReportTable from "../../components/atoms/itemReportTable";
import { getListaPedidos } from "../../redux/actions";
import { RootState } from "../../redux/reducers/mainReducer";
import { AppDispatch } from "../../redux/store";
import { RateType } from "../../types/typeRate";
import { PanelDeControl } from "../panel-de-control/panel-de-control";
import DetallesReporte from "./detalles-reporte";
import "./styles.css";
import { Pagination } from "@mui/material";

type ReportListProps = {
  historyRateList: RateType[];
  setRateDetails: (rate: RateType) => void;
  totalOfPages: number;
  currentPage: number;
  loading: boolean;
  handleChange: (event: React.ChangeEvent<unknown>, value: number) => void;
};

const Reportes = () => {
  const [loading, setLoading] = useState(false);
  const [historyRateList, setHistoryRateList] = useState<RateType[]>([]);
  const [filteredRates, setFilteredRates] = useState<RateType[]>([]);
  const [rateDetails, setRateDetails] = useState({} as RateType);
  const [ratesForPage, setRatesForPage] = useState(15);
  const [totalOfPages, setTotalOfPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  const { DatosPersonales } = useSelector(
    (state: RootState) => state.user.userData as any
  );
  const dispatch = useDispatch<AppDispatch>();
  const getRateList = async () => {
    setLoading(true);
    const reqBack = await tomarRutas(DatosPersonales?.idUsuario, true);
    if (reqBack.status == "OK") {
      setHistoryRateList(reqBack.historyRates);
      setFilteredRates(
        reqBack.historyRates.length > 5
          ? reqBack.historyRates.slice(0, 5)
          : reqBack.historyRates
      );
      setTotalOfPages(
        reqBack.historyRates.length > 5
          ? Math.ceil(reqBack.historyRates.length / ratesForPage)
          : 1
      );
    }
    setLoading(false);
  };

  const getOrderList = async () => {
    dispatch(getListaPedidos(DatosPersonales?.idUsuario));
  };

  useEffect(() => {
    getRateList();
    getOrderList();
  }, []);

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
    const offset = ratesForPage * currentPage;
    setFilteredRates(historyRateList.slice(offset, ratesForPage));
  };

 

  return (
    <PanelDeControl currentSection="/panel/reportes">
      <div className="reportes-container">
        {rateDetails.idRuta ? (
          <DetallesReporte
            setRateDetails={() => setRateDetails({} as RateType)}
            rate={rateDetails}
          />
        ) : (
          <ReportList
            totalOfPages={totalOfPages}
            currentPage={currentPage}
            handleChange={handleChange}
            setRateDetails={setRateDetails}
            historyRateList={filteredRates}
            loading={loading}
          />
        )}
      </div>
    </PanelDeControl>
  );
};

const ReportList = ({
  currentPage,
  totalOfPages,
  handleChange,
  historyRateList,
  setRateDetails,
  loading
}: ReportListProps) => {
  return (
    <div className="table-container">
      <div className="header-table-container">
        <p className="table-child-header">Nombre ruta</p>
        <p className="table-child-header">Repartidor</p>
        <p className="table-child-header">Fecha creacion</p>
        <p className="table-child-header">Fecha entrega</p>
        <p className="table-child-header small">Pedidos entregados</p>
        <p className="table-child-header small">Pedidos detenidos</p>
        <p className="table-child-header small">Status</p>
      </div>
      {historyRateList.map((route) => (
        <ItemReportTable datosRow={route} setRateDetails={setRateDetails} />
      ))}
      {!loading ? (
        <div className="flex-row-center">
          <Pagination
            page={currentPage}
            count={totalOfPages}
            color="primary"
            onChange={handleChange}
          />
        </div>
      ) : null}
    </div>
  );
};

export default Reportes;
