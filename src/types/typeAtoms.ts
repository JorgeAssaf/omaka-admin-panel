export interface TypographyProps {
    variant: 'section' | 'cardTitle' | 'cardInfo' | 'button' | 'chip' | 'label';
    color?: string;
    customedStyles?: Object;
    children: string;
  }

export interface SelectInputProps {
  options: SelectInputOption[];
  onSelect: (option: string) => void;
  textPlaceholder: string;
}

export interface SelectInputOption {
  id: number;
  name: string;
}