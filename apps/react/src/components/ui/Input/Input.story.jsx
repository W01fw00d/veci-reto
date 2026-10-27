import Input from './Input.jsx';

export function Default({ label = 'Example input', placeholder = 'Type here...' } = {}) {
  return (
    <label>
      {label}
      <Input placeholder={placeholder} />
    </label>
  );
}
