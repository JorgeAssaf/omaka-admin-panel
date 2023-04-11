import { useState, useEffect } from "react";

import { IconText } from "../atoms/iconText";
import "./styles.css";
import Colors from "../../utils/colors";
import Typography from "../atoms/typography";
import { ClientType, OrderType } from "../../types/typeOrders";
import { InformationChip } from "../atoms/information-chip";
import { getDateAndHour } from "../../utils/dateAndTime";
import { SuggerClientListProps } from "../../types/typeAtoms";
import { CardList } from "../cardList/cards-list";
import { getClientByUser } from "../../api/ordersQuerys";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/reducers/mainReducer";
import { removeAccentsMarks } from "../../utils/stringModifier";

const SuggerClientList = ({
  direccionText,
  setClientDetails
}: SuggerClientListProps) => {
  const [clientsFromDB, setClientsFromDB] = useState([] as ClientType[]);
  const [clientsFiltered, setClientsFiltered] = useState([] as ClientType[]);
  const [isSelect, setIsSelect] = useState(true);
  const [activeClient, setActiveClient] = useState({} as ClientType);
  const { DatosPersonales } = useSelector((state: RootState) => state.user.userData as any);
  const clickPrueba = () => {
    setIsSelect(!isSelect);
  };
  const selectClient = (cliente :ClientType) => {
    setActiveClient(cliente)
    setClientDetails(cliente)
  }
  useEffect(() => {
    if(!direccionText){
        getOrderToSearch();
    }
  }, [direccionText])

  useEffect(() => {
    if(direccionText){
        let respFiltered = filtrarClientes();
        setClientsFiltered(respFiltered);
    }else{
        setClientsFiltered([]);
    }
  }, [direccionText])

  function filtrarClientes() {
    return clientsFromDB.filter((cliente) => {
      // Convertir la búsqueda y los atributos del cliente a minúsculas para hacer una comparación insensible a mayúsculas.
      const busquedaMin = removeAccentsMarks(direccionText.toLowerCase());
      const nombreMin = removeAccentsMarks(cliente.nombreCliente.toLowerCase());
      const direccionMin = removeAccentsMarks(cliente.direccionPedido.toLowerCase());
  
      // Verificar si la búsqueda coincide con el nombre o la dirección del cliente.
      return nombreMin.includes(busquedaMin) || direccionMin.includes(busquedaMin);
    });
  }
  
  const getOrderToSearch = async () => {
    let busquedaRes = await getClientByUser(DatosPersonales.idUsuario);
    setClientsFromDB(busquedaRes ? busquedaRes : []);
  };

  return (
    <CardList
      onClickItem={selectClient}
      tipo="cliente"
      data={clientsFiltered}
      activeItem={activeClient.idCliente}
    />
  );
};

export default SuggerClientList;
