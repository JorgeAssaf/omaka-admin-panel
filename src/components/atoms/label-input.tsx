import { LabelInputProps } from "../../types/typeAtoms";
import './styles.css';


export default function LabelInput({ label='',placeholder='', value='', onChange,type = 'text',required = false, inputProps={} }:LabelInputProps) {  
    return (
      <label className='atom_label'>
          {label}
          <input
            className='atom_input'
            {...inputProps}
            placeholder={placeholder}
            type={type}
            value={value}
            onChange={(event) =>
              onChange((event.target as HTMLInputElement).value)
            }
            required={required}
          />
        </label>
    );
  }