import Panel from '.';

export default function Default({ label = 'Example panel' } = {}) {
  return (
    <Panel aria-label={label}>
      <p>Panel content</p>
    </Panel>
  );
}
