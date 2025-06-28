import { Box, Grid, styled, Typography } from "@mui/material";
import { Categories } from "../../../../models/category";

interface CategoryBoxProps {
  items: Categories[];
  inViewRef: React.RefObject<HTMLDivElement> | ((node?: Element | null) => void);
}

const CategoryBox = ({ items, inViewRef }: CategoryBoxProps) => {
  const categories = items.map((data) => ({
    ...data,
    randomColor: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
  }));

  return (
    <Grid container spacing={2}>
      {categories.map((category: any, idx: number) => (
        <Content key={category.id} size={{ xs: 12, sm: 6, md: 4 }}>
          <Contentbox color={category.randomColor} onClick={() => alert("진행 예정입니다")}>
            <CategoryName
              sx={{
                fontSize: {
                  xs: "1.5rem",
                  sm: "1rem",
                  md: "1rem",
                  lg: "1.5rem",
                  xl: "1.5rem",
                },
                fontWeight: 600,
              }}
            >
              {category.name}
            </CategoryName>
            <CategoryImg src={category.icons[0].url} />
          </Contentbox>
        </Content>
      ))}
      <div ref={inViewRef}></div>
    </Grid>
  );
};

const Content = styled(Grid)({});

interface ContentBoxStyleProps {
  color: "string";
}
const Contentbox = styled(Box)<ContentBoxStyleProps>(({ color }) => ({
  position: "relative",
  backgroundColor: color,
  borderRadius: "10px",
  overflow: "hidden",
  aspectRatio: "2 / 1",
  boxShadow: `rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px;;`,
  cursor: "pointer",
}));
const CategoryName = styled(Typography)({
  padding: "1rem",
  color: "white",
});
const CategoryImg = styled("img")({
  position: "absolute",
  width: "45%",
  bottom: "-10%",
  right: "-8%",
  transform: `rotate(25deg)`,
});

export default CategoryBox;
