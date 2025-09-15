import { InfoSection } from "@/components/general/info-section";

export function PrizesInfo() {
  return (
    <InfoSection heading="Premier">
      <p>
        Premiepotten er på{" "}
        <span className="font-bold text-amber-400">10 000 NOK</span>.
      </p>
      Foreløpig vil fordelingen være slik:
      <ul>
        <li>
          1. plass - <span className="font-bold text-amber-400">2 500 NOK</span>{" "}
          + tournament badge (avventer)
        </li>
        <li>
          2. plass - <span className="font-bold text-amber-400">2 250 NOK</span>
        </li>
        <li>
          3. plass - <span className="font-bold text-amber-400">1 750 NOK</span>
        </li>
        <li>
          4. plass - <span className="font-bold text-amber-400">1 000 NOK</span>
        </li>
        <li>
          5. - 8. plass -{" "}
          <span className="font-bold text-amber-400">500 NOK</span>
        </li>
      </ul>
    </InfoSection>
  );
}
