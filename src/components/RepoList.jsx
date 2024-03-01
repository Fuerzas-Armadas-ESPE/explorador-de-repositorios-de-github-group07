import { useEffect, useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, CircularProgress, Typography } from "@mui/material";
import GitHubIcon from '@mui/icons-material/GitHub';
import "../App.css";

const RepoList = ({ username, stars, language }) => {
  const [repos, setRepos] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `https://api.github.com/users/${username}/repos?page=${page}&per_page=5`
        );
        let filteredRepos = response.data;

        // Aplicar filtros
        if (stars > 0) {
          filteredRepos = filteredRepos.filter(repo => repo.stargazers_count >= stars);
        }
        if (language) {
          filteredRepos = filteredRepos.filter(repo => repo.language === language);
        }

        const sortedRepos = filteredRepos.sort((a, b) => b.size - a.size);
        setRepos(sortedRepos);
      } catch (error) {
        console.error("Error fetching repos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [username, stars, language, page]);

  const handleNextPage = () => {
    setPage(page + 1);
  };

  const handlePrevPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  return (
    <div>
      <Typography variant="h5" sx={{ marginBottom: 2 }}>Top 5 repositorios con más participación de {username}</Typography>
      {loading ? (
        <CircularProgress />
      ) : (
        <>
          <TableContainer component={Paper}>
            <Table>
              <TableHead sx={{ backgroundColor: '#001f3f' }}>
                <TableRow>
                  <TableCell sx={{ color: 'white' }}>Nombre del Repositorio</TableCell>
                  <TableCell align="right" sx={{ color: 'white' }}>Tamaño</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {repos.map((repo) => (
                  <TableRow key={repo.id}>
                    <TableCell>{repo.name}</TableCell>
                    <TableCell align="right">{repo.size}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <div style={{ marginTop: "20px" }}>
            <Button variant="contained" className="prevNextButton" onClick={handlePrevPage} disabled={page === 1}>Anterior</Button>
            <Button variant="contained" className="prevNextButton" onClick={handleNextPage}>Siguiente</Button>
          </div>
          <div style={{ marginTop: "20px", display: "flex", flexDirection: "column", alignItems: "center" }}>
            <Typography variant="h4" sx={{ marginBottom: "10px" }}>¡Sígueme en GitHub!</Typography>
            <GitHubIcon fontSize="large" />
          </div>
        </>
      )}
    </div>
  );
};

RepoList.propTypes = {
  username: PropTypes.string.isRequired,
  stars: PropTypes.number.isRequired,
  language: PropTypes.string.isRequired,
};

export default RepoList;
