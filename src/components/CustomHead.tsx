import Head from 'next/head'
import favicon from '../public/favicon.ico'

type Props = {
  title?: string;
};

const CustomHead = ({ title = 'NextJs Auth RBAC Demo' }: Props) => (
  <Head>
    <link rel="shortcut icon" href={favicon.src} type="image/x-icon" />
    <meta charSet="utf-8" />
    <title>{title}</title>
  </Head>
)

export default CustomHead
