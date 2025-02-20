import React, { useEffect, useState } from "react";
import { Box, Button, Card, CardContent, Typography } from "@mui/material";
import apiClient from "../utils/apiClient";
import { Result } from "../services/Result"; // Ensure this is correctly defined

interface DemoTestResponse {
  message: string;
}

const DemoTestPage: React.FC = () => {
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchMessage = async () => {
    try {
        const response = await apiClient.get<DemoTestResponse>("/DemoTest") as unknown as Result;
      setMessage(response.message || "No message received from API");
      setError(null);
    } catch (err) {
      setMessage(null);
      setError("Failed to connect to the API. Check the environment configuration.");
    }
  };

  useEffect(() => {
    fetchMessage();
  }, []);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        API Connection Test
      </Typography>
      <Card sx={{ width: "50%", boxShadow: 3, textAlign: "center" }}>
        <CardContent>
          {message ? (
            <Typography variant="h6" color="success.main">
              API Response: {message}
            </Typography>
          ) : error ? (
            <Typography variant="h6" color="error">
              {error}
            </Typography>
          ) : (
            <Typography>Loading...</Typography>
          )}

          <Box sx={{ mt: 2 }}>
            <Typography variant="body2" sx={{ mb: 1 }}>
              "There is no spoon, just a working API..." 🥄💻
            </Typography>
            <img
              src="https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExa2M4bm45OHRvZHVqdWczNDBwNnlpamc3OXJsbnczZDhtM24zNGhzZyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/pKJ6d8xt93yGQ/giphy.gif"
              alt="Matrix GIF"
              width="200"
              style={{ borderRadius: "10px" }}
            />
          </Box>

          <Button variant="contained" sx={{ mt: 2 }} onClick={fetchMessage}>
            Retry API Call
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
};

export default DemoTestPage;
