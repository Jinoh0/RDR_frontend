import React, { useState } from "react";
import axios, { AxiosResponse } from "axios";
import { Box, Button, FormControl, FormLabel, Input } from "@chakra-ui/react";
import { useRouter } from "next/router";

const AddEmployee : React.FC = () => {
  const [name, setName] = useState<string>("");
  const [role, setRole] = useState<string>("");
  const [department, setDepartment] = useState<string>("");
  const [hireDate, setHireDate] = useState<string>("");
  const router = useRouter();

  interface EmployeeResponse {
    _id: string;
    name: string;
    role: string;
    department: string;
    hireDate: string;
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response: AxiosResponse<EmployeeResponse> = await axios.post(`${process.env.NEXT_PUBLIC_REACT_APP_URI}/api/employees`, { name, role, department, hireDate });
      console.log("Employee added:", response.data);
      router.push("/");
    } catch (error) {
      console.error("Error adding employee:", error);
    }
  };

  return (
    <Box p={5}>
      <form onSubmit={handleSubmit}>
        <FormControl isRequired>
          <FormLabel>Name</FormLabel>
          <Input
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </FormControl>
        <FormControl isRequired mt={3}>
          <FormLabel>Role</FormLabel>
          <Input
            placeholder="Role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          />
        </FormControl>
        <FormControl isRequired mt={3}>
          <FormLabel>Department</FormLabel>
          <Input
            placeholder="Department"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
          />
        </FormControl>
        <FormControl isRequired mt={3}>
          <FormLabel>Hire Date</FormLabel>
          <Input
            type="date"
            value={hireDate}
            onChange={(e) => setHireDate(e.target.value)}
          />
        </FormControl>
        <Button mt={5} colorScheme="teal" type="submit">
          Add Employee
        </Button>
      </form>
    </Box>
  );
};

export default AddEmployee;
