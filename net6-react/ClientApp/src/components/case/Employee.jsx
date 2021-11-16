export const Employee = (props) => {
  const Employee = props.Employee;

  return (
    <div>
      <p>Employee ID: {Employee.id}</p>
      <p>Name: {Employee.name}</p>
      <p>Role: {Employee.roles}</p>
      <p>Email: {Employee.email}</p>
      {Employee.bossId && <p>Employee Boss ID: {Employee.bossId}</p>}
    </div>
  );
};

// bossId: null
// email: "ola@x.no"
// id: 1
// name: "Ola Olsen"
// roles: ['Daglig leder']
