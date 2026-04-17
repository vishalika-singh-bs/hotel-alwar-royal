import type { InputHTMLAttributes, TextareaHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
  multiline: true;
}

type Props = InputProps | TextareaProps;

export default function Input(props: Props) {
  const { label, error, className = '', ...rest } = props;
  const isMultiline = 'multiline' in props && props.multiline;

  const baseStyles =
    'w-full px-4 py-2.5 border rounded focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent transition-colors';
  const errorStyles = error ? 'border-red-500' : 'border-neutral-300';

  return (
    <div className={`mb-4 ${className}`}>
      <label className="block text-sm font-medium text-neutral-700 mb-1">{label}</label>
      {isMultiline ? (
        <textarea
          className={`${baseStyles} ${errorStyles} min-h-[120px] resize-y`}
          {...(rest as TextareaHTMLAttributes<HTMLTextAreaElement>)}
        />
      ) : (
        <input
          className={`${baseStyles} ${errorStyles}`}
          {...(rest as InputHTMLAttributes<HTMLInputElement>)}
        />
      )}
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
}
