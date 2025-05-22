export const fetchAutoFillData = async (endpoint: string, params: Record<string, any>) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ autofilledValue: 'Mocked API Value' });
    }, 1000);
  });
};