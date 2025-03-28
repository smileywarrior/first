import React, { useState } from "react";
import { Container, TextField, Button, Typography, Box, Paper, Snackbar, IconButton, CircularProgress } from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import DeleteIcon from "@mui/icons-material/Delete";
import LinkIcon from "@mui/icons-material/Link";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";

function ShortenerPage() {
  const [url, setUrl] = useState("");
  const [alias, setAlias] = useState("");
  const [shortenedUrl, setShortenedUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  
  const API_URL = "http://localhost:5000/api/url/shorten";

  const handleShorten = async () => {
    if (!url) return;
    setLoading(true);
    try {
      const response = await axios.post(API_URL, { originalUrl: url, alias });
      setShortenedUrl(response.data.shortenedUrl);
    } catch (error) {
      alert("Error shortening URL");
    }
    setLoading(false);
  };

  const handleCopy = () => {
    if (shortenedUrl) {
      navigator.clipboard.writeText(shortenedUrl);
      setOpen(true);
    }
  };

  return (
    <Box sx={{ height: "100vh", display: "flex", alignItems: "center", justifyContent: "center", bgcolor: "#f8f9fa" }}>
      <Container maxWidth="sm">
        <Paper elevation={3} sx={{ p: 4, textAlign: "center", borderRadius: 3 }}>
          <Typography variant="h4" gutterBottom sx={{ color: "#007BFF" }}>
            Tiny-Style URL Shortener
          </Typography>
          <TextField
            fullWidth
            label="Paste your link here"
            variant="outlined"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Custom Alias (Optional)"
            variant="outlined"
            value={alias}
            onChange={(e) => setAlias(e.target.value)}
            sx={{ mb: 2 }}
          />
          <Button
            variant="contained"
            startIcon={<LinkIcon />}
            fullWidth
            onClick={handleShorten}
            sx={{ mb: 2, fontWeight: "bold", bgcolor: "#007BFF" }}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : "Shorten URL"}
          </Button>
          {shortenedUrl && (
            <Box sx={{ mt: 2 }}>
              <Typography variant="body1" sx={{ mb: 1, fontWeight: "bold" }}>
                Shortened URL:
              </Typography>
              <TextField fullWidth variant="outlined" value={shortenedUrl} InputProps={{ readOnly: true }} />
              <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
                <Button
                  variant="contained"
                  startIcon={<ContentCopyIcon />}
                  onClick={handleCopy}
                  sx={{ mr: 1, bgcolor: "#28A745" }}
                >
                  Copy
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  startIcon={<DeleteIcon />}
                  onClick={() => { setUrl(""); setShortenedUrl(""); setAlias(""); }}
                >
                  Clear
                </Button>
              </Box>
            </Box>
          )}
        </Paper>
        <Typography variant="body2" sx={{ textAlign: "center", mt: 4, color: "gray" }}>
          © 2025 YourShortener - A Tiny.cc Clone
        </Typography>
      </Container>
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={() => setOpen(false)}
        message="Copied to clipboard!"
        action={
          <IconButton size="small" color="inherit" onClick={() => setOpen(false)}>
            <CloseIcon fontSize="small" />
          </IconButton>
        }
      />
    </Box>
  );
}

export default ShortenerPage;
