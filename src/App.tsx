import { useEffect, useState } from "react";

function App() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("https://agilityfeatdemoapi-g0ddg8cxdbesf9cz.canadacentral-01.azurewebsites.net/WeatherForecast")
      .then((res) => res.json())
      .then((data) => setMessage(JSON.stringify(data, null, 2)))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <div>
      <h1>React + .NET Core (Azure)</h1>
      <pre>{message}</pre>
    </div>
  );
}

export default App;
