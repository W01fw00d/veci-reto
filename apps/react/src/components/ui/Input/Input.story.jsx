import Input from '.';

export function Default({ label = 'Example input', placeholder = 'Type here...' } = {}) {
  return (
    <label>
      {label}
      <Input placeholder={placeholder} />
    </label>
  );
}
