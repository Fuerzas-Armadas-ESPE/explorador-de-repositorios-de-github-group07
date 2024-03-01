import { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Container,
  AppBar,
  Toolbar,
  InputAdornment,
} from "@mui/material";
import { AccountCircle, Star } from "@mui/icons-material"; 
import RepoList from "./components/RepoList";

function App() {
  const [username, setUsername] = useState("");
  const [showRepoList, setShowRepoList] = useState(false);
  const [stars, setStars] = useState(0); // Filtro por número de estrellas
  const [language, setLanguage] = useState(""); // Filtro por idioma


  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    setShowRepoList(true);
  };

  const handleStarsChange = (event) => {
    setStars(parseInt(event.target.value));
  };

  const handleLanguageChange = (event) => {
    setLanguage(event.target.value);
  };

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Mi Explorador de Repositorios
          </Typography>
        </Toolbar>
      </AppBar>
      <Container maxWidth="sm" sx={{ marginTop: "20px" }}>
        <form onSubmit={handleFormSubmit}>
          <TextField
            label="Nombre de Usuario"
            variant="outlined"
            value={username}
            onChange={handleUsernameChange}
            fullWidth
            sx={{
              marginBottom: "15px",
              boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
            }}
            inputProps={{ style: { padding: "12px" } }}
            InputLabelProps={{ style: { fontWeight: "bold" } }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AccountCircle color="action" />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            label="Número mínimo de estrellas"
            type="number"
            variant="outlined"
            value={stars}
            onChange={handleStarsChange}
            fullWidth
            sx={{
              marginBottom: "15px",
              boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
            }}
            inputProps={{ style: { padding: "12px" } }}
            InputLabelProps={{ style: { fontWeight: "bold" } }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Star color="action" />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            label="Número mínimo de estrellas"
            type="number"
            variant="outlined"
            value={stars}
            onChange={handleStarsChange}
            fullWidth
            sx={{ marginBottom: "10px" }}
          />
          <Button type="submit" variant="contained" fullWidth>
            Buscar Repositorios
          </Button>
        </form>
        {showRepoList && (
          <RepoList
            username={username}
            stars={stars}
            language={language}
          />
        )}
      </Container>
    </div>
  );
}

export default App;