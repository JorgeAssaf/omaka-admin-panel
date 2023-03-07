export interface TypographyProps {
    variant: 'section' | 'cardTitle' | 'cardInfo' | 'button' | 'chip' | 'label';
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
