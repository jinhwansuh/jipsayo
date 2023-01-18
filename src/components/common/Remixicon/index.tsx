interface Props {
  iconName: string;
  size: string;
}

const Remixicon = ({ iconName, size }: Props) => {
  return <i className={`${iconName}`} style={{ fontSize: `${size}` }} />;
};

export default Remixicon;
