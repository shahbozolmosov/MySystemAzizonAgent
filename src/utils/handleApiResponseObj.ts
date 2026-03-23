export const handleApiResponseObj = <T>(response: any): T | null => {
  if (response?.isSuccess && response?.data?.success && response?.data?.data) {
    return response.data.data;
  }
  return null;
};
