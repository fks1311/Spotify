import { Box, styled, Typography } from "@mui/material";

interface ItemLayoutProps {
  title: string;
  width: string;
  children: React.ReactNode;
}
const ItemLayout = ({ title, width, children }: ItemLayoutProps) => {
  return (
    <Layout width={width}>
      <Title variant="h5">{title}</Title>
      {children}
    </Layout>
  );
};

const Layout = styled(Box)(({ width }) => ({ padding: "1rem", width: `${width}` }));
const Title = styled(Typography)({ fontWeight: 700, marginBottom: "1rem" });

export default ItemLayout;
