// list of plants

import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { Link } from "react-router-dom";

import PlantCard from "../components/PlantCard";
import { Heading } from "../styles/StyledComponents";

const Card = styled.div`
  text-align: center;
  width: 90%;
  margin: 3rem auto;
  padding: 10px;
  background-color: #d4d4aa;
  color: #000;
  transition: all 0.3s ease-in;
  &:hover {
    background-color: #fff;
    color: #fff;
  }
`;

export default function Home() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  // get plant data from database
  useEffect(() => {
    axios
      .get(`https://www.dnd5eapi.co/api/monsters`)
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, [loading]);

  const handleDelete = event => {
    setLoading(true);
    event.preventDefault();
    // console.log(event.target.value);
    axios
      .delete(
        `https://water-my-plant-bw.herokuapp.com/api/plants/${event.target.value}`
      )
      .then(response => {
        // console.log(response.data);
        setData(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.log(error);
      });
  };

  if (!Array.isArray(data) || !data.length) {
    return (
      <div>
        <Heading>My Plants</Heading>
        <Card>
          <h2>No plants added yet</h2>
          <p>
            Add a plant <Link to="/plants">here</Link>
          </p>
        </Card>
      </div>
    );
  }

  return (
    <div>
      <Heading>My Plants</Heading>
      {data.map(plant => {
        return (
          <PlantCard
            value={plant.id}
            key={plant.id}
            name={plant.plant_name}
            species={plant.plant_species}
            schedule={plant.water_schedule}
            handleDelete={handleDelete}
          />
        );
      })}
    </div>
  );
}
