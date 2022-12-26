import Head from 'next/head';

interface Props {
  title: string;
}

const NextHead = ({ title }: Props) => {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
    </>
  );
};

export default NextHead;
