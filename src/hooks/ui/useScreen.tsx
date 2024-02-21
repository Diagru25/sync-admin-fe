import { useMediaQuery } from "@mantine/hooks";

const useScreen = () => {
  const isMobile = useMediaQuery("(max-width: 48em)");

  return isMobile;
};

export default useScreen;
