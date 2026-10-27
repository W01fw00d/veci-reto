import TextInput from '.';

export default function Default({ label = 'Example input', placeholder = 'Type here...' } = {}) {
  return (
    <label>
      {label}
      <TextInput placeholder={placeholder} />
    </label>
  );
}
