import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box, Button, FormControl, FormLabel, Input } from "@chakra-ui/react";
import { useRouter } from "next/router";

interface Employee {
  name: string;
  role: string;
  department: string;
  hireDate: string;
}

const EditEmployee: React.FC = () => {
  const [name, setName] = useState<string>("");
  const [role, setRole] = useState<string>("");
  const [department, setDepartment] = useState<string>("");
  const [hireDate, setHireDate] = useState<string>("");
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await axios.get<Employee>(`${process.env.NEXT_PUBLIC_REACT_APP_URI}/api/employee/${id}`);
        const { name, role, department, hireDate } = response.data;
        setName(name);
        setRole(role);
        setDepartment(department);
        setHireDate(hireDate);
      } catch (error) {
        console.error("Error fetching employee:", error);
      }
    };
    if (id) {
      fetchEmployee();
    }
  }, [id]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await axios.put(
      `${process.env.NEXT_PUBLIC_REACT_APP_URI}/api/employees/${id}`,
      { name, role, department, hireDate }
    );
    router.push("/");
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
          Update Employee
        </Button>
      </form>
    </Box>
  );
};

export default EditEmployee;
