import { ClientType, OrderType } from "./typeOrders";
import { RateType } from "./typeRate";

export interface TypographyProps {
    variant: 'title' | 'subTitle' | 'section' | 'cardTitle' | 'cardInfo' | 'button' | 'chip' | 'label';
    color?: string;
    customedStyles?: Object;
    children: string;
  }
export interface LabelInputProps {
  label?: string;
  placeholder?: string;
  value?: string;
  onChange: (value: string) => void;
  type?: string;
  required? : boolean;
  inputProps?: any;
  ref?: any;
}

export interface SelectInputProps {
  options: SelectInputOption[];
  onSelect: (option: number) => void;
  textPlaceholder: string;
}

export interface SelectInputOption {
  id: number;
  name: string;
}

export interface ParentScreenProps {
  sectionActive: string;
}

export interface ItemReportTableProps {
  datosRow: RateType,
  setRateDetails: (rate: RateType) => void
}
export interface ItemOrderTableProps {
  datosRow: OrderType,
  fechaInicio: any,
  setOrderDetails: (rate: OrderType) => void
}

export interface ModalDetallesPedidoProps {
  order: OrderType;
  onClose: ()=> void;
}

export interface SuggerClientListProps {
  direccionText: string;
  setClientDetails: (cliente: ClientType)=> void;
}

export interface ModalTypes {
  title: string;
  subtitle: string;
  onClose: ()=> void;
}


export interface MarkerUserProps {
  lat: number;
  lng:  number;
  color: string;
  kmh: string;
  lastUpdate: any;
  title: string;
}
