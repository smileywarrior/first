import React, { useState } from "react";
import { Container, TextField, Button, Typography, Box, Grid, Link, Snackbar, IconButton, Slide, CircularProgress } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import DeleteIcon from "@mui/icons-material/Delete";
import LinkIcon from "@mui/icons-material/Link";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import LinkOffIcon from "@mui/icons-material/LinkOff";
import SecurityIcon from "@mui/icons-material/Security";
import BarChartIcon from "@mui/icons-material/BarChart";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import DevicesIcon from "@mui/icons-material/Devices";
import axios from "axios";
import "./App.css";

const SlideTransition = (props) => {
  return <Slide {...props} direction="up" />;
};

function App() {
  const [url, setUrl] = useState("");
  const [shortenedUrl, setShortenedUrl] = useState("");
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);  // Track errors

  // API base URL (make sure to update it based on your backend's URL)
  const API_URL = 'https://first-production-5a6e.up.railway.app/'; // Replace with your backend's URL

const fetchData = async () => {
  try {
    const response = await fetch(`${API_URL}/endpoint`);
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};


  const handleShorten = async () => {
    if (!url) {
      return;
    }
    setLoading(true);
    setError(null);  // Clear previous error messages
    try {
      const response = await axios.post(`${API_URL}/shorten`, { originalUrl: url });
      setShortenedUrl(response.data.shortenedUrl);
      setLoading(false);
    } catch (error) {
      console.error("Error shortening URL", error);
      setError("There was an issue with shortening your URL. Please try again later.");
      setLoading(false);
    }
  };

  const handleCopy = () => {
    if (shortenedUrl) {
      navigator.clipboard.writeText(shortenedUrl);
      setOpen(true);
    }
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") return;
    setOpen(false);
  };

  const handleDelete = () => {
    setUrl("");
    setShortenedUrl("");
    setError(null);
  };

  return (
    <Box sx={{ height: "100vh", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column" }}>
      <Container maxWidth="sm" sx={{ textAlign: "center", p: 4, boxShadow: 5, borderRadius: 3, bgcolor: "#F8F9FA", color: "#343A40", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
        <Typography variant="h4" gutterBottom sx={{ color: "#007BFF" }}>
          SHORTEN YOUR URL
        </Typography>
        <Typography variant="body1" gutterBottom sx={{ color: "#343A40" }}>
          Transform long URLs into something short and manageable.
        </Typography>
        <TextField
          fullWidth
          label="Paste your link here"
          variant="outlined"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          sx={{ mb: 2, bgcolor: "#FFFFFF", borderRadius: 1, input: { color: "#343A40" }, label: { color: "#343A40" } }}
        />
        <Button
          variant="contained"
          startIcon={<LinkIcon />}
          fullWidth
          onClick={handleShorten}
          sx={{ mb: 2, fontWeight: "bold", backgroundColor: "#007BFF", color: "#FFFFFF", '&:hover': { backgroundColor: "#07BFF" } }}
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} color="inherit" /> : "Shorten URL"}
        </Button>
        {error && (
          <Typography variant="body2" sx={{ color: "red", mb: 2 }}>
            {error}
          </Typography>
        )}
        {shortenedUrl && (
          <Box sx={{ mt: 2, width: "100%" }}>
            <TextField
              fullWidth
              variant="outlined"
              value={shortenedUrl}
              InputProps={{ readOnly: true }}
              sx={{ bgcolor: "#FFFFFF", borderRadius: 1, input: { color: "#343A40" } }}
            />
            <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
              <Button
                variant="contained"
                startIcon={<ContentCopyIcon />}
                onClick={handleCopy}
                sx={{ mr: 1, fontWeight: "bold", backgroundColor: "#28A745", color: "#FFFFFF" }}
              >
                Copy
              </Button>
              <Button
                variant="contained"
                color="error"
                startIcon={<DeleteIcon />}
                onClick={handleDelete}
                sx={{ fontWeight: "bold", backgroundColor: "#DC3545", color: "#FFFFFF" }}
              >
                Delete
              </Button>
            </Box>
          </Box>
        )}
      </Container>

      {/* Features Section */}
      <Grid container spacing={4} justifyContent="center" sx={{ mt: 4, textAlign: "center" }}>
        {[{ icon: <ThumbUpIcon fontSize="large" sx={{ color: "black", transition: "0.3s", '&:hover': { color: "#007BFF", transform: "scale(1.2)" } }} />, text: "Easy" },
          { icon: <LinkOffIcon fontSize="large" sx={{ color: "black", transition: "0.3s", '&:hover': { color: "#FF5733", transform: "scale(1.2)" } }} />, text: "Shortened" },
          { icon: <SecurityIcon fontSize="large" sx={{ color: "black", transition: "0.3s", '&:hover': { color: "#28A745", transform: "scale(1.2)" } }} />, text: "Secure" },
          { icon: <BarChartIcon fontSize="large" sx={{ color: "black", transition: "0.3s", '&:hover': { color: "#FFC107", transform: "scale(1.2)" } }} />, text: "Statistics" },
          { icon: <CheckCircleIcon fontSize="large" sx={{ color: "black", transition: "0.3s", '&:hover': { color: "#17A2B8", transform: "scale(1.2)" } }} />, text: "Reliable" },
          { icon: <DevicesIcon fontSize="large" sx={{ color: "black", transition: "0.3s", '&:hover': { color: "#6F42C1", transform: "scale(1.2)" } }} />, text: "Devices" }].map((feature, index) => (
            <Grid item xs={6} sm={4} md={2} key={index} sx={{ mb: 2 }}>
              <Box>
                {feature.icon}
                <Typography variant="h6" fontWeight="bold">
                  {feature.text}
                </Typography>
              </Box>
            </Grid>
          ))}
      </Grid>

      {/* Footer */}
      <Box sx={{ mt: 4, py: 3, textAlign: "center", width: "100%" }}>
        <Typography variant="body2" gutterBottom>
          © 2025 ShortUrl.at - Tool to shorten a long link
        </Typography>
        <Box>
          {["ShortURL", "URL Click Counter", "Unshorten URL", "Report Malicious URL", "Terms of Service", "Privacy", "Contact"].map((item, index) => (
            <Link key={index} href="#" sx={{ color: "black", mx: 1, textDecoration: "none" }}>
              {item}
            </Link>
          ))}
        </Box>
      </Box>

      {/* Snackbar for copy notification */}
      <Snackbar open={open} autoHideDuration={3000} onClose={handleClose} message={shortenedUrl ? `Copied: ${shortenedUrl}` : "No URL available"} TransitionComponent={SlideTransition} action={<IconButton size="small" color="inherit" onClick={handleClose}><CloseIcon fontSize="small" /></IconButton>} />
    </Box>
  );
}

export default App;

