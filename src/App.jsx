import { useState } from "react";
import FormPage from "./components/FormPage";
import Welcome from "./components/Welcome";

function App() {
  const [showForm, setShowForm] = useState(false);

  function handleSetForm() {
    setShowForm(true);
  }

  return (
    <div 
      className="flex items-center justify-center min-h-screen bg-gradient-to-b from-blue-800 to-blue-950"
      onClick={handleSetForm}
    >
      {showForm ? <FormPage /> : <Welcome changePage={handleSetForm}/>}
    </div>
  );
}

export default App;
