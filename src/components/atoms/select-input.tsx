import { SelectInputProps } from "../../types/typeAtoms";
import './styles.css';


export default function SelectInput({ options, onSelect,textPlaceholder }:SelectInputProps) {
    const allOptions = options.map((option) => (
      <option key={option.id} value={option.id}>
        {option.name}
      </option>
    ));
  
    return (
      <select className='atom_select_input' onChange={(e)=>onSelect((e.target as HTMLInputElement).value)}>
        <option value="">{textPlaceholder}</option>
        {allOptions}
      </select>
    );
  }