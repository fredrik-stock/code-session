export const Employee = (props) => {
  const Employee = props.Employee;

  return (
    <div style={{ textAlign: "center" }}>
      <p>
        <b>Employee ID: </b>
        {Employee.id}
      </p>
      <p>
        <b>Name: </b>
        {Employee.name}
      </p>
      <p>
        <b>Role: </b>
        {Employee.roles}
      </p>
      <p>
        <b>Email: </b>
        {Employee.email}
      </p>
      {Employee.bossId && (
        <p>
          <b>Employee Boss ID: </b>
          {Employee.bossId}
        </p>
      )}
    </div>
  );
};

// bossId: null
// email: "ola@x.no"
// id: 1
// name: "Ola Olsen"
// roles: ['Daglig leder']
