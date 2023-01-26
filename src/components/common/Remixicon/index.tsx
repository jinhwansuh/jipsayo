// https://remixicon.com/

interface Props {
  iconName: string;
  size: string;
  color?: string;
}

const Remixicon = ({ iconName, size, color }: Props) => {
  return (
    <i
      className={`${iconName}`}
      style={{ fontSize: `${size}`, color: color || 'black' }}
    />
  );
};

export default Remixicon;
