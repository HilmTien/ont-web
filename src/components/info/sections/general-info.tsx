import { InfoSection } from "@/components/general/info-section";
import Image from "next/image";

export function GeneralInfo() {
  return (
    <InfoSection heading="Generelt">
      <ul className="list-disc">
        <li>
          o!NT 5 er en{" "}
          <strong>
            <span className="text-accent">1v1 osu! Standard</span>
          </strong>{" "}
          head-to-head turnering for{" "}
          <strong>
            <span className="text-accent">norske statsborgere</span>
          </strong>
          .
        </li>
        <li>
          Det er{" "}
          <strong>
            <span className="text-accent">ingen rang restriksjoner</span>
          </strong>
          . Alle kan delta.
        </li>
        <li>
          Alle deltagere er pålagt å være i vår{" "}
          <strong>
            <span className="text-accent">Discord server</span>
          </strong>{" "}
          med osu! brukernavnet sitt som servernavn! Du kan klikke{" "}
          <a
            href="https://discord.com/invite/zY5dwFEbSx/"
            target="_blank"
            className="text-accent hover:underline"
          >
            her
          </a>{" "}
          for å bli med.
        </li>
        <li>
          Alle tider og datoer er oppgitt i{" "}
          <strong>
            <span className="text-accent">norsk lokaltid</span>
          </strong>{" "}
          (CET / CEST).
        </li>
        <li>
          Kun de med{" "}
          <strong>
            <span className="text-accent">norsk flagg</span>
          </strong>{" "}
          kan{" "}
          <strong>
            <span className="text-accent">delta</span>
          </strong>{" "}
          i turneringen.
        </li>
        <li>
          Ingen i personalet får delta i turneringen. Strømmere, kommentatorere
          og grafiske designere telles ikke som en del av personalet.
        </li>
        <li>
          Det er{" "}
          <strong>
            <span className="text-accent">obligatorisk</span>
          </strong>{" "}
          å være på turneringsserveren. Man må i tillegg sett server-navnet sitt
          lik sitt osu! brukernavn.
        </li>
        <li>
          Etter registreringsfasen er over, vil en liste av alle spillere bli
          sendt til osu!staff for godkjennelse. De vil etter omtrent 1 uke sende
          tilbake en liste over alle spillere som ikke får delta i turneringen.
        </li>
        <li>
          <strong>
            <span className="text-accent">Ingen</span>
          </strong>{" "}
          skal gå gjennom kvalifiseringer i denne turneringen.
        </li>
        <li>
          BWS formelen for denne iterasjonen er nærliggende formelen i o!NT 2 og
          er gitt ved{" "}
          <code>BWS = global_rank ^ (0.5 * 0.9^badge_count + 0.5)</code>
        </li>
        <li>
          Det er de{" "}
          <strong>
            <span className="text-accent">topp 48</span>
          </strong>{" "}
          spillerene sortert etter BWS som kvalifiserer til turneringen.
        </li>
        <li>
          De{" "}
          <strong>
            <span className="text-accent">topp 8</span>
          </strong>{" "}
          spillerene sortert etter BWS hopper over{" "}
          <strong>
            <span className="text-accent">2</span>
          </strong>{" "}
          uker med turneringsspill.
        </li>
        <li>
          Spillerene rangert{" "}
          <strong>
            <span className="text-accent">9 - 16</span>
          </strong>{" "}
          etter BWS hopper over{" "}
          <strong>
            <span className="text-accent">1</span>
          </strong>{" "}
          uke med turneringsspill.
        </li>
        <li>
          I gruppespillet vil de{" "}
          <strong>
            <span className="text-accent">nederste 24</span>
          </strong>{" "}
          spillerene spille mot hverandre.
        </li>
        <li>
          Gruppespillet spilles som en 1 runders round-robin hvor kun vinneren
          av grupperen går videre i turneringen.
        </li>
        <li>Gruppene blir laget som beskrevet i diagrammene.</li>
        <li>
          For hver Swiss runde kan man kun møte motstandere med{" "}
          <strong>
            <span className="text-accent">lik matchscore</span>
          </strong>{" "}
          (lik Win-Loss).
        </li>
        <li>
          Under swissfasen kan man i utgangspunktet ikke møte samme motstander
          flere ganger.
        </li>
        <li>
          Dersom en duplikat matchup skjer, vil man bytte motstander med en
          annen i samme bracket.
        </li>
        <li>
          Dette byttet vil alltid være til fordel mot spilleren som ikke har
          duplikat matchup, og erstatningsspilleren som velges skal være nærmest
          mulig i plassering i forhold til problemspilleren
        </li>
        <li>
          Bracketfasen er en{" "}
          <strong>
            <span className="text-accent">8 spiller single elimination</span>
          </strong>{" "}
          bracket med kamp om tredjeplass.
        </li>
        <li>
          Plasseringen i bracketfasen bestemmes eksklusivt av plasseringen fra
          Swiss. Dette står også beskrevet i diagrammene.
        </li>
        <li>Mappool og timeplan blir lagt ut på mandager.</li>
      </ul>
      <div className="flex flex-wrap gap-x-8">
        <div className="flex flex-col items-center">
          <h3 className="text-2xl">Gruppespill format</h3>
          <Image
            src={"/stage-info/groups.png"}
            width={800}
            height={1000}
            className="w-70"
            alt={"Groups format"}
          />
        </div>
        <div className="flex flex-col items-center">
          <h3 className="text-2xl">Runoff runde 1 format</h3>
          <Image
            src={"/stage-info/runoff-1.png"}
            width={1250}
            height={1250}
            className="w-100"
            alt={"Runoff round 1 format"}
          />
        </div>
        <div className="flex flex-col items-center">
          <h3 className="text-2xl">Runoff runde 2 format</h3>
          <Image
            src={"/stage-info/runoff-2.png"}
            width={1250}
            height={1250}
            className="w-100"
            alt={"Runoff round 2 format"}
          />
        </div>
        <div className="flex flex-col items-center">
          <h3 className="text-2xl">Swiss format</h3>
          <Image
            src={"/stage-info/swiss.png"}
            width={2000}
            height={2000}
            className="w-150"
            alt={"Swiss format"}
          />
        </div>
        <div className="flex flex-col items-center">
          <h3 className="text-2xl">Sluttspill format</h3>
          <Image
            src={"/stage-info/playoffs.png"}
            width={1500}
            height={1000}
            className="w-100"
            alt={"Playoffs format"}
          />
        </div>
      </div>
    </InfoSection>
  );
}
