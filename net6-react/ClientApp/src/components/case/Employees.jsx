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
  const [selected, setSelected] = useState([]);
  const [CEO, setCEO] = useState();
  const [selectedBoss, setSelectedBoss] = useState();

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
    empData.forEach((employee) => {
      if (leader[employee.bossId] != null) {
        empObj[employee.id] = employee;
      }
    });
    console.log("Memoing bossHasBoss: ", empObj);
    return empObj;
  }, [empData, leader]);

  useEffect(() => {
    console.log("Getting Initial Content");
    async function fetchData() {
      const res = await fetch("employees/modified");
      res
        .json()
        .then((data) => {
          setEmpData(data);
        })
        .catch((err) => {
          console.error(err);
        });
      isLoading(false);
    }
    fetchData();
  }, []);

  const handleClick = (data) => {
    setSelected(data);
    if (data.bossId !== null) {
      setSelectedBoss(employee[data.bossId]);
    } else {
      setSelectedBoss();
    }
  };

  return (
    <div>
      {loading ? (
        <div>
          <p>Loading</p>
        </div>
      ) : (
        <div>
          <h1>Brukere i organisasjonen</h1>
          {/* {empData.map((employee) => {
            return (
              <div key={employee.id} onClick={() => handleClick(employee)}>
                <Employee Employee={employee} />
              </div>
            );
          })} */}

          {/* <Todo what="Fjerne denne" how="Fjern denne todoen">
            <strong>
              For resten av todoene er det bare å putte løsningen inni
              komponenten.
            </strong>
            <div>Slik som dette</div>
          </Todo> */}

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
            {selectedBoss ? (
              <div>
                <h1>Reporting to: {selectedBoss.name}</h1>
                <p>email: {selectedBoss.email}</p>
              </div>
            ) : (
              <div>
                <p>Reporting to nobody</p>
              </div>
            )}
          </Todo>
        </div>
      )}
    </div>
  );
};
