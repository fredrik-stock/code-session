export const Employee = (props) => {
  if (!props.Employee) {
    return null;
  }
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
