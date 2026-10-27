import Panel from './Panel.jsx';

export function Default({ label = 'Example panel' } = {}) {
  return (
    <Panel aria-label={label}>
      <p>Panel content</p>
    </Panel>
  );
}
