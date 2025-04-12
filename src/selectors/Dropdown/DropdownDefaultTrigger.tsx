const DropdownDefaultTrigger = ({ value }: { value: boolean }) => {
  return <span style={{ cursor: 'pointer' }}>{value ? '▼' : '▲'}</span>;
};

export default DropdownDefaultTrigger;
