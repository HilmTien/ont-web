import { InfoSection } from "@/components/general/info-section";

export function MappoolInfo() {
  return (
    <InfoSection heading="Mappool">
      <ul className="list-disc">
        <li>
          I denne iterasjonen av o!NT vil vi nytte den samme{" "}
          <strong>
            <span className="text-accent">alternative mappoolstrukturen</span>
          </strong>{" "}
          som i o!NT 3 / 4.
        </li>
        <li>
          Det vil være{" "}
          <strong>
            <span className="text-accent">to pools</span>
          </strong>{" "}
          å velge maps fra,{" "}
          <strong>
            <span className="text-accent">A pool og B pool</span>
          </strong>
          .
        </li>
        <li>
          Det kommer en ny A pool og B pool for hver turneringsfase. De poolene
          skal bli brukt den fasen.
        </li>
        <li>
          A pool er mer fokusert på tradisjonelle maps, mechanics og standard
          maps. Typisk NM1, NM2, HD1, HR1
        </li>
        <li>
          B pool er mer fokusert på gimmicks, og inkluderer en rekke niche
          skillsets. Typisk NM6, HD2, HR2, FM2.
        </li>
        <li>
          Denne turneringen har{" "}
          <strong>
            <span className="text-accent">
              NM, HD, HR, DT, HDHR, EZ og Forcedmod
            </span>
          </strong>{" "}
          i et mappool.
        </li>
        <li>
          Gjennom hele turneringen har{" "}
          <strong>
            <span className="text-accent">alle spillere 1 ban</span>
          </strong>
          .
        </li>
        <li>
          Man står fritt til å banne hvilket map man vil (ingen lås på A eller B
          pool). Unntaket er tiebreaker.
        </li>
        <li>
          <strong>
            <span className="text-accent">Doublepicking er lov</span>
          </strong>
          , altså kan man velge eksklusivt A pool maps i en match om man vil.
        </li>
        <li>
          I ukene med BO7 / BO9 kamper vil det være:{" "}
          <strong>4 NM / 2 HD / 2 HR / 2 DT / 1 HDHR / 1 EZ / 1 FM</strong>
        </li>
        <li>
          I ukene med BO11 kamper vil det være:{" "}
          <strong>5 NM / 2 HD / 2 HR / 2 DT / 1 HDHR / 1 EZ / 2 FM</strong>
        </li>
        <li>
          I ukene med BO13 kamper vil det være:{" "}
          <strong>6 NM / 2 HD / 2 HR / 2 DT / 1 HDHR / 1 EZ / 2 FM</strong>
        </li>
        <li>
          Gruppespillet er BO7, Runoff rundene og Swiss (uavgjørende) er BO9,
          Swiss (avgjørende) er BO11, og Sluttspillet er BO13.
        </li>
        <li>
          Star Rating for de forskjellige ukene tilpasses etter spillerene som
          gjenstår.
        </li>
        <li>
          Foreløpige tallverdier for SR til A1 er følgende:{" "}
          <ul className="list-disc pl-4">
            <li>Gruppespill: 5.8*</li>
            <li>Runoff runde 1: 6.2*</li>
            <li>Runoff runde 2: 6.6*</li>
            <li>Swiss Uke 1: 7*</li>
            <li>Swiss Uke 2: 7.4*</li>
            <li>Swiss Uke 3: 7.6*</li>
            <li>Sluttspill: 7.8*</li>
          </ul>
        </li>
      </ul>
    </InfoSection>
  );
}
