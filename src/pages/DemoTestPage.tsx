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
          <Button variant="contained" sx={{ mt: 2 }} onClick={fetchMessage}>
            API Call
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
};

export default DemoTestPage;
