import axios from "axios";
import { toast } from "react-toastify";

const statusHandlers: {
  [key: number]: (msg: string, status: number | null) => void;
  default: (msg: string) => void;
} = {
  400: (msg: string) =>
    toast.error("잘못된 요청입니다. 다시 시도해 주세요.", {
      toastId: "fetch-400-error",
    }),
  401: (msg: string, status) => {
    toast.error("로그인 정보가 유효하지 않거나 세션이 만료되었습니다.", {
      toastId: "fetch-401-error",
    });
  },
  403: () => {
    toast.error("접근 권한이 없습니다. 관리자에게 문의하세요.", {
      toastId: "fetch-403-erro",
    });
  },
  404: () => {
    toast.error("요청하신 서비스를 찾을 수 없습니다.", {
      toastId: "fetch-404-error",
    });
  },

  429: () => {
    toast.error("요청이 너무 많습니다. 잠시 후 다시 시도해 주세요.", {
      toastId: "fetch-429-error",
    });
  },
  500: () =>
    toast.error("서버 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.", {
      toastId: "fetch-500-error",
    }),
  default: () =>
    toast.error("예기치 못한 오류가 발생했습니다. 다시 시도해 주세요.", {
      toastId: "fetch-unknown-error",
    }),
};

interface ErrorResponse {
  message: string;
  status?: number;
}
export const handleApiError = (error: unknown) => {
  if (axios.isAxiosError(error)) {
    if (error.response) {
      const httpStatus = error.response?.status;
      const errorResponse = error.response?.data?.error as ErrorResponse;
      const httpMessage = errorResponse.message;
      const httpErrorCode = errorResponse?.status || null;

      const handle =
        httpStatus !== undefined && statusHandlers[httpStatus] ? statusHandlers[httpStatus] : statusHandlers.default;
      handle(httpMessage, httpErrorCode);
    } else {
      toast.error("서버 연결이 원활하지 않습니다.");
      toast.clearWaitingQueue();
      return;
    }
  } else {
    toast.error("네트워크 연결 오류 또는 기타 오류가 발생했습니다.");
    toast.clearWaitingQueue();
    return;
  }
};
