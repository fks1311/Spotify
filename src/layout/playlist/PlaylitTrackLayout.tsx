import { Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";

const PlaylitTrackLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>#</TableCell>
          <TableCell>Title</TableCell>
          <TableCell>Artist</TableCell>
          <TableCell>Album</TableCell>
          <TableCell>Date added</TableCell>
          <TableCell sx={{ width: "150px" }}>Duration</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>{children}</TableBody>
    </Table>
  );
};

export default PlaylitTrackLayout;
