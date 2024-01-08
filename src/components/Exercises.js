import React, { useState, useEffect } from "react";
import Pagination from "@mui/material/Pagination";
import { Box, Stack, Typography } from "@mui/material";
import { exerciseOptions, fetchData } from "../utils/fetchData";
import ExerciseCard from "./ExerciseCard";

const Exercises = ({ exercises, setExercises, bodyPart }) => {

  const [currentPage, setCurrentPage] = useState(1);
  const exercisesPerPage = 9;

  // Pagination
  const indexOfLastExercise = currentPage * exercisesPerPage;
  const indexOfFirstExercise = indexOfLastExercise - exercisesPerPage;
  const currentExercises = exercises.slice(indexOfFirstExercise, indexOfLastExercise);

  useEffect(() => {
    const fetchExercisesData = async () => {
      let exerciseData = [];

      if(bodyPart === 'all'){
        exerciseData = await fetchData(
          "https://exercisedb.p.rapidapi.com/exercises?limit=900",
          exerciseOptions
        );
      }
      else{
        exerciseData = await fetchData(
          `https://exercisedb.p.rapidapi.com/exercises/bodyPart/${bodyPart}?limit=900`,
          exerciseOptions
        );
      }

      setExercises(exerciseData);
    }
  
    fetchExercisesData();
    
  }, [bodyPart])
  


  const paginate = (e, value) => {
    setCurrentPage(value);

    window.scrollTo({top:1800 , behaviour:'smooth'});
  }

  // console.log(exercises);
  return (
    <Box id="exercises" sx={{ mt: { lg: "110px" } }} mt="50px" p="20px">
      <Typography variant="h3" mb="46px">
        Showing Results
      </Typography>
      <Stack
        direction="row"
        sx={{ gap: { lg: "110px", xs: "50px" } }}
        flexWrap="wrap"
        justifyContent="center"
      >
        {currentExercises.map((exercise, index) => (
          <ExerciseCard key={index} exercise={exercise} />
        ))}
      </Stack>
      <Stack mt="100px" alignItems='center'>
        {exercises.length > 9 && (
          <Pagination 
          color="standard"
          shape="rounded"
          defaultPage={1}
          count={Math.ceil(exercises.length/exercisesPerPage)}
          page={currentPage}
          onChange={paginate}
          size="large"
          />
        )}
      </Stack>
    </Box>
  );
};

export default Exercises;
