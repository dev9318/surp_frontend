import React, { useEffect, useState } from "react";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import NoteCard from "./card";

export default function Lists() {
  const [lists, setLists] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/list")
      .then((res) => res.json())
      .then((data) => setLists(data));
  }, []);

  const handleDelete = async (id) => {
    await fetch("http://localhost:8000/list/" + id, {
      method: "DELETE",
    });
    const newLists = lists.filter((list) => list.id != id);
    setLists(newLists);
  };

  return (
    <Container>
      <Grid container spacing={3}>
        {lists.map((list) => (
          <Grid item xs={12} md={6} lg={4} key={list.id}>
            <NoteCard list={list} handleDelete={handleDelete} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
