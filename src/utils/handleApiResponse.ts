export const handleApiResponse = <T>(response: any): T | [] => {
  if (response?.isSuccess && response?.data?.success && response?.data?.data) {
    return response.data.data;
  }
  return [];
};
