import React, { useState, useEffect, useMemo } from "react";
import { Todo } from "./Todo";
import { Employee } from "./Employee";

/** 1. Last inn data, vis indikasjon på at data laster
 *
 *  Ansatte ligger på EmployeesController i moderprosjektet, så direkte på /employees
 *  Struktur på ansatt-typen kan sees i User.ts, eller i EmployeesController.
 *
 * Hvordan håndterer du ventingen?
 * Hva om det går galt?
 * Hvordan sikrer du at data lastes én gang?
 */

/** 2. Lag en komponent, <Employee employee={employee} />, som viser brukerdetaljer:
 *
 *    Id, Navn, epost
 *    Roller
 *    Navn på personen brukere rapporterer til
 *
 *    Når klikket på skal gjeldende bruker settes som valgt bruker i Users-komponenten
 */

/** 3. Lag to lookups / hashtables / records for brukere:
 *    - Keyet på sjef ({sjefId: Brukere[]})
 *    - Keyet på bruker-id
 *
 * Hva vil nytten være av disse to?
 */

/** 4. Memoiser en liste over brukere der sjefen har en sjef */

/** X. Til slutt, etter C#-biten: Flipp over til å bruke Modified-endepunktet
 *    Alt burde fungere 100% som vanlig etter flipp.
 */

// bossId: null
// email: "ola@x.no"
// id: 1
// name: "Ola Olsen"
// roles: ['Daglig leder']

export const Employees = () => {
  const [loading, isLoading] = useState(true);
  const [empData, setEmpData] = useState([]);
  const [CEO, setCEO] = useState({});
  const [selected, setSelected] = useState({});

  const leader = useMemo(() => {
    const leaderObj = {};
    empData.forEach((employee) => {
      if (employee.bossId !== null) {
        if (leaderObj.hasOwnProperty(employee.bossId)) {
          leaderObj[employee.bossId].push(employee);
        } else {
          leaderObj[employee.bossId] = [employee];
        }
      } else {
        setCEO(employee);
      }
    });
    console.log("Memoing Leaders: ", leaderObj);
    return leaderObj;
  }, [empData]);

  const employee = useMemo(() => {
    const empObj = {};
    empData.forEach((employee) => {
      empObj[employee.id] = employee;
    });
    console.log("Memoing Employee: ", empObj);
    return empObj;
  }, [empData]);

  const bossHasBoss = useMemo(() => {
    const empObj = {};
    empData.forEach((emp) => {
      // Check if emp has a boss
      if (emp.bossId !== null) {
        // Check if boss has a boss.
        if (employee[emp.bossId].bossId !== null) {
          empObj[emp.id] = emp;
        }
      }
    });
    console.log("Memoing bossHasBoss: ", empObj);
    return empObj;
  }, [employee, empData]);

  useEffect(() => {
    console.log("Getting Initial Content");
    async function fetchData() {
      const res = await fetch("employees/modified");
      res
        .json()
        .then((data) => {
          setEmpData(data);
          isLoading(false);
        })
        .catch((err) => {
          console.error(err);
          isLoading(false);
        });
    }
    fetchData();
  }, []);

  const handleClick = (data) => {
    setSelected(data);
  };

  if (loading) {
    return (
      <div>
        <p>Loading</p>
      </div>
    );
  } else {
    return (
      <div>
        <h1>Brukere i organisasjonen</h1>
        <Todo
          what="Vise sjefen"
          how="Vis sjefen for organisasjonen her med <Employee />-komponenten">
          {CEO && (
            <div
              style={{ border: "2px solid black" }}
              onClick={() => handleClick(CEO)}>
              <Employee Employee={CEO} />
            </div>
          )}
        </Todo>

        <Todo
          what="Vise hvem folk rapporterer til"
          how="Folk som har en sjef, gruppert på sjef. Vis navn på sjefen, og <Employee /> for den ansatte ">
          {leader && (
            <div>
              {Object.keys(leader).map((key) => {
                return (
                  <div key={key}>
                    <h1>{employee[key].name}</h1>
                    {leader[key].map((e) => {
                      return (
                        <div
                          style={{ border: "2px solid black" }}
                          key={e.id}
                          onClick={() => handleClick(e)}>
                          <Employee Employee={e} />
                        </div>
                      );
                    })}
                  </div>
                );
              })}
            </div>
          )}
        </Todo>

        <Todo
          what="Gutta på gulvet"
          how="<Employee /> for alle ansatte der sjefen har en sjef">
          {bossHasBoss && (
            <div>
              {Object.keys(bossHasBoss).map((key) => {
                return (
                  <div
                    style={{ border: "2px solid black" }}
                    onClick={() => handleClick(bossHasBoss[key])}
                    key={key}>
                    <Employee Employee={bossHasBoss[key]} />
                  </div>
                );
              })}
            </div>
          )}
        </Todo>
        <Todo what="Valgt bruker" how="Vise valgt bruker her">
          <Employee Employee={selected} />
        </Todo>

        <Todo
          what="De som rapporterer til valgt bruker"
          how="Vise navn og e-psotadresser for de som rapporterer til valgt bruker. Implementer med map + object deconstruct, eller finn på noe eget lurt">
          {/* Check if currently selected user is a leader */}
          {leader[selected.id] ? (
            <>
              {leader[selected.id].map((follower) => {
                return (
                  <div>
                    <p>
                      <b>Navn: </b>
                      {follower.name}
                    </p>
                    <p>
                      <b>Epost: </b>
                      {follower.email}
                    </p>
                    <hr />
                  </div>
                );
              })}
            </>
          ) : (
            <div>
              <p>Ingen rapporterer til den valgte brukeren.</p>
            </div>
          )}
        </Todo>
      </div>
    );
  }
};
