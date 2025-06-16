import { Alert } from "@mui/material";

interface ErrorMessageProps {
  errorMessage: string;
}
export const ErrorMessage = ({ errorMessage }: ErrorMessageProps) => {
  return <Alert severity="error">{errorMessage}</Alert>;
};
