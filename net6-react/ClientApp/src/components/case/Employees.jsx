import { Todo } from "./Todo";

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

export const Employees = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 16,
      }}
    >
      <h1>Brukere i organisasjonen</h1>

      <Todo what="Fjerne denne" how="Fjern denne todoen">
        <strong>For resten av todoene er det bare å putte løsningen inni komponenten.</strong>
        <div>Slik som dette</div>
      </Todo>

      <Todo what="Vise sjefen" how="Vis sjefen for organisasjonen her med <Employee />-komponenten" />

      <Todo what="Vise hvem folk rapporterer til" how="Folk som har en sjef, gruppert på sjef. Vis navn på sjefen, og <Employee /> for den ansatte " />

      <Todo what="Gutta på gulvet" how="<Employee /> for alle ansatte der sjefen har en sjef" />

      <Todo what="Valgt bruker" how="Vise valgt bruker her" />

      <Todo
        what="De som rapporterer til valgt bruker"
        how="Vise navn og e-psotadresser for de som rapporterer til valgt bruker. Implementer med map + object deconstruct, eller finn på noe eget lurt"
      />
    </div>
  );
};
