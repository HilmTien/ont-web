import { InfoSection } from "@/components/general/info-section";

export function BehaviourInfo() {
  return (
    <InfoSection heading="Overordnede regler">
      <ul className="list-disc">
        <li>
          Alle spillerene må ha{" "}
          <strong>
            <span className="text-accent">god og sportslig oppførsel</span>
          </strong>
          . All tegn på{" "}
          <strong>
            <span className="text-accent">
              hat, trakassering og verbalt misbruk
            </span>
          </strong>{" "}
          vil føre til{" "}
          <strong>
            <span className="text-accent">diskvalifikasjon</span>
          </strong>{" "}
          for{" "}
          <strong>
            <span className="text-accent">spilleren</span>
          </strong>{" "}
          og potensielt en{" "}
          <strong>
            <span className="text-accent">
              turneringsban fra alle offisielle turneringer selv utenom o!NT
            </span>
          </strong>
          !
        </li>
        <li>
          Dette inkluderer{" "}
          <strong>
            <span className="text-accent">hatefulle ytringer</span>
          </strong>
          , bruk av{" "}
          <strong>
            <span className="text-accent">skjellsord</span>
          </strong>
          , og annen{" "}
          <strong>
            <span className="text-accent">krenkende symbolikk</span>
          </strong>
          . For eksempel er &quot;tegning&quot; med smoke av swastikasymbolet et{" "}
          <strong>
            <span className="text-accent">grovt brudd</span>
          </strong>{" "}
          på denne regelen, spesielt hvis matchen blir strømmet.{" "}
          <strong>
            <span className="text-accent">Alle involvert</span>
          </strong>{" "}
          i slik oppførsel vil bli{" "}
          <strong>
            <span className="text-accent">straffet</span>
          </strong>
          .
        </li>
        <li>
          Dersom man omberammer kampen sin{" "}
          <strong>
            <span className="text-accent">mister man strømmeretten</span>
          </strong>{" "}
          i favør mot matchen som allerede er i tidsrammen.
        </li>
        <li>
          En match med endret tid er den nye tiden. Det går ikke an å reversere
          en omberamming dersom begge partene ikke er i enighet.
        </li>
        <li>
          Dersom spillerene ikke kommer i enighet om en tid, vil matchen bli
          spilt på den{" "}
          <strong>
            <span className="text-accent">opprinnelige tiden</span>
          </strong>
          .
        </li>
      </ul>
    </InfoSection>
  );
}
