export type MuiInputChangeEvent = React.ChangeEvent<
  HTMLInputElement | HTMLTextAreaElement
>;

export interface MuiInputProps {
  value: string | number;
  label: string;
  onChange?:
    | ((e: MuiInputChangeEvent) => void)
    | ((value?: string) => void)
    | ((key?: string, value?: string | number) => void);
  key?: string;
  type: string;
  placeholder: string;
  required: boolean;
}
