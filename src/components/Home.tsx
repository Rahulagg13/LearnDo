import { Container, Typography, Stack, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const language = [
  { name: "Japanese", code: "ja" },
  { name: "Hindi", code: "hi" },
  { name: "French", code: "fr" },
  { name: "Spanish", code: "es" },
];

const Home = () => {
  const navigate = useNavigate();

  const handleLanguageSelector = (lang: string): void => {
    navigate(`/learn?language=${lang}`);
  };
  return (
    <Container maxWidth="sm">
      <Typography variant="h3" p="2rem" textAlign="center">
        Welcome, Begin your journey of learning.
      </Typography>
      <Stack
        direction={"row"}
        spacing={"2rem"}
        p={"2rem"}
        alignItems={"center"}
        justifyContent={"center"}
      >
        {language.map((i) => (
          <Button
            key={i.code}
            variant="contained"
            onClick={() => handleLanguageSelector(i.code)}
          >
            {i.name}
          </Button>
        ))}
      </Stack>
      <Typography textAlign="center">
        Choose your language from above
      </Typography>
    </Container>
  );
};

export default Home;
