import React, { useEffect, useState } from "react";
import PetsViewer from "./PetsViewer";

const Pets = () => {
  const [filter, setFilter] = useState("all");
  const [sortOption, setSortOption] = useState("default");
  const [petsData, setPetsData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await fetch('http://localhost:4000/approvedPets');
        if (!response.ok) {
          throw new Error('An error occurred');
        }
        const data = await response.json();
        setPetsData(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);

  // Filter pets based on type
  const filteredPets = petsData.filter((pet) => {
    if (filter === "all") {
      return true;
    }
    return pet.type === filter;
  });

  // Sort pets based on selected option
  const sortedPets = [...filteredPets].sort((a, b) => {
    switch (sortOption) {
      case "age-younger":
        return a.age - b.age;
      case "age-older":
        return b.age - a.age;
      case "name-asc":
        return a.name.localeCompare(b.name);
      case "name-desc":
        return b.name.localeCompare(a.name);
      default:
        return 0; // No sorting
    }
  });

  return (
    <>
      {/* Filter Section */}
      <div className="filter-selection">
        <label htmlFor="filter">Filter by Type:</label>
        <select
          id="filter"
          value={filter}
          onChange={(event) => setFilter(event.target.value)}
        >
          <option value="all">All Pets</option>
          <option value="Dog">Dogs</option>
          <option value="Cat">Cats</option>
          <option value="Rabbit">Rabbits</option>
          <option value="Bird">Birds</option>
          <option value="Fish">Fish</option>
          <option value="Other">Other</option>
        </select>
      </div>

      {/* Sort Section */}
      <div className="sort-selection">
        <label htmlFor="sort">Sort by:</label>
        <select
          id="sort"
          value={sortOption}
          onChange={(event) => setSortOption(event.target.value)}
        >
          <option value="default">Default</option>
          <option value="age-younger">Age: Younger → Older</option>
          <option value="age-older">Age: Older → Younger</option>
          <option value="name-asc">Name: A → Z</option>
          <option value="name-desc">Name: Z → A</option>
        </select>
      </div>

      {/* Pets Display Section */}
      <div className="pet-container">
        {loading ? (
          <p>Loading...</p>
        ) : sortedPets.length > 0 ? (
          sortedPets.map((petDetail, index) => (
            <PetsViewer pet={petDetail} key={index} />
          ))
        ) : (
          <p className="oops-msg">Oops!... No pets available</p>
        )}
      </div>
    </>
  );
};

export default Pets;
