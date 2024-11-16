import { useState, useEffect } from "react";
import Card from "./components/card/Card";
import { Search } from "lucide-react";
import './app.css';
import Modal from "./components/modal/Modal";

function App() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch('https://jsonplaceholder.typicode.com/users');
        if (!res.ok) {
          throw new Error('Failed to fetch data');
        }
        const responseData = await res.json();
        setData(responseData);
        setFilteredData(responseData);
      } catch (e) {
        console.error(e.message);
        setError(e.message);
      } finally {
        setIsLoading(false);
      }
    }
    
    fetchData();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    const query = searchQuery.trim();
    
    if (!query) {
      setFilteredData(data);
      return;
    }

    const filtered = data.filter(item => 
      item.id.toString().includes(query)
    );
    setFilteredData(filtered);
  };

  useEffect(() => {
    const query = searchQuery.trim();
    if (!query) {
      setFilteredData(data);
      return;
    }
    
    const filtered = data.filter(item => 
      item.id.toString() === query
    );
    setFilteredData(filtered);
  }, [searchQuery, data]);

  const openModal = (item) => {
    setSelectedItem(item);
  };

  const closeModal = () => {
    setSelectedItem();
  };

   const deleteItem = () => {
    if (!selectedItem) return;
    
    const newData = data.filter(item => item.id !== selectedItem.id);
    setData(newData);
    
    const newFilteredData = filteredData.filter(item => item.id !== selectedItem.id);
    setFilteredData(newFilteredData);
    
    if (newFilteredData.length === 0) {
      setSearchQuery('');
    }
    
    closeModal();
  };

  if (isLoading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  return (
    <>
      <nav className="navBar">
        <h1>Welcome Admin</h1>
        <form onSubmit={handleSearch} className="search-form">
          <input
            type="number"
            placeholder="Search by ID"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
            min="1"
          />
          <button type="submit" className="search-button">
            <Search className="search-icon" />
          </button>
        </form>
      </nav>
      <div className="container">
        {filteredData.map((item) => (
          <div 
            key={item.id}
            onClick={() => openModal(item)}
            className="card-wrapper"
          >
            <Card data={item} />
          </div>
        ))}
      </div>

      {selectedItem && (
        <Modal item={selectedItem} closeModal={closeModal} deleteItem={deleteItem}/>
      )}
    </>
  );
}

export default App;