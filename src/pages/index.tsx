import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Button,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Input,
} from "@chakra-ui/react";
import Link from "next/link";

interface Employee {
  _id: string;
  name: string;
  role: string;
  department: string;
  hireDate: string;
}

interface SortOptions {
  field: keyof Employee;
  direction: "asc" | "desc";
}

const Dashboard: React.FC = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [search, setSearch] = useState<string>("");
  const [sortOptions, setSortOptions] = useState<SortOptions | null>(null);

  useEffect(() => {
    const fetchEmployees = async () => {
      const response = await axios.get<Employee[]>(`${process.env.NEXT_PUBLIC_REACT_APP_URI}/api/employees`);
      setEmployees(response.data);
    };
    fetchEmployees();
  }, []);

  const filteredEmployees = employees.filter((employee) =>
    employee.name.toLowerCase().includes(search.toLocaleLowerCase())
  );

  const sortedEmployees = sortOptions
    ? [...filteredEmployees].sort((a, b) => {
        const aValue = a[sortOptions.field];
        const bValue = b[sortOptions.field];

        if (sortOptions.direction === "asc") {
          return aValue.localeCompare(bValue);
        } else {
          return bValue.localeCompare(aValue);
        }
      })
    : filteredEmployees;

  const handleSort = (field: keyof Employee) => {
    if (sortOptions && sortOptions.field === field) {
      setSortOptions({
        field,
        direction: sortOptions.direction === "asc" ? "desc" : "asc",
      });
    } else {
      setSortOptions({
        field,
        direction: "asc",
      });
    }
  };

  const deleteEmployee = async (id: string) => {
    await axios.delete(`${process.env.NEXT_PUBLIC_REACT_APP_URI}/api/employees/${id}`);
    const response = await axios.get<Employee[]>(`${process.env.NEXT_PUBLIC_REACT_APP_URI}/api/employees`);
    setEmployees(response.data);
  };

  return (
    <Box p={5}>
      <Box display="flex" justifyContent="space-between" mb={5}>
        <Input
          placeholder="Search employees"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Link href="/add-employee">
          <Button colorScheme="teal">Add Employee</Button>
        </Link>
      </Box>
      <Table>
        <Thead>
          <Tr>
            <Th>Name <Button size="xs" onClick={() => handleSort("name")}>Sort</Button></Th>
            <Th>Role <Button size="xs" onClick={() => handleSort("role")}>Sort</Button></Th>
            <Th>Department <Button size="xs" onClick={() => handleSort("department")}>Sort</Button></Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {sortedEmployees.map((employee) => (
            <Tr key={employee._id}>
              <Td>{employee.name}</Td>
              <Td>{employee.role}</Td>
              <Td>{employee.department}</Td>
              <Td>
                <Link href={`/edit-employee/${employee._id}`}>
                  <Button colorScheme="yellow" mr={3}>
                    Edit
                  </Button>
                </Link>
                <Button
                  colorScheme="red"
                  onClick={() => deleteEmployee(employee._id)}
                >
                  Delete
                </Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default Dashboard;
