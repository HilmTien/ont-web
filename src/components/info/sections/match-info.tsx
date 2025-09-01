export function MatchInfo() {
  return (
    <ul className="list-disc">
      <li>
        Er en spiller borte i{" "}
        <strong>
          <span className="text-accent">5 minutter</span>
        </strong>{" "}
        etter at matchen var planlagt vil vedkommende{" "}
        <strong>
          <span className="text-accent">tape rollen</span>
        </strong>
        .
      </li>
      <li>
        Er en spiller borte i{" "}
        <strong>
          <span className="text-accent">10 minutter</span>
        </strong>{" "}
        etter at matchen var planlagt vil vedkommende{" "}
        <strong>
          <span className="text-accent">tape matchen</span>
        </strong>
        !
      </li>
      <li>
        Selfref og asynkronte matches er{" "}
        <strong>
          <span className="text-accent">IKKE</span>
        </strong>{" "}
        lov gjennom hele turneringen!
      </li>
      <li>
        Oppvarming kan vare opptil{" "}
        <strong>
          <span className="text-accent">4 minutter</span>
        </strong>
        , men om begge lagene er enig, så kan det økes til{" "}
        <strong>
          <span className="text-accent">5 minutter og 30 sekunder</span>
        </strong>
        . Lengre enn det er{" "}
        <strong>
          <span className="text-accent">ikke tillatt</span>
        </strong>
        . Det vil ikke være mulig å spille oppvarming under qualifiers.
      </li>
      <li>
        Spillerene vil få rolle{" "}
        <strong>
          <span className="text-accent">en gang</span>
        </strong>{" "}
        med kommandoen &quot;!roll&quot; (!roll med et tall f.eks !roll 2000 er
        ikke lov), og{" "}
        <strong>
          den høyeste rollen<span className="text-accent"></span>
        </strong>{" "}
        bestemmer hvem som{" "}
        <strong>
          <span className="text-accent">velger først</span>
        </strong>{" "}
        (altså er spiller 1 i eksemplet under).
      </li>
      <li>
        Pick og ban order går som følgende:{" "}
        <p>1. Spiller 1, Spiller 2, Spiller 1, Spiller 2 // Picks</p>
        <p>2. Spiller 2, Spiller 1 // Bans</p>
        <p>3. Spiller 2, Spiller 1 // Picks, gjentar</p>
      </li>
      <li>
        En spiller har vunnet matchen hvis de har vunnet:{" "}
        <strong>
          <span className="text-accent">
            5 kart i gruppespillet, runoff-bracketsa og swiss
          </span>
        </strong>
        , eller{" "}
        <strong>
          <span className="text-accent">6 kart i swiss</span>
        </strong>{" "}
        dersom kampen er en avgjørende kamp (dvs. 2-x / x-2 kamper) og{" "}
        <strong>
          <span className="text-accent">7 kart i sluttspillet</span>
        </strong>
        .
      </li>
      <li>
        Man kan til{" "}
        <strong>
          <span className="text-accent">enhver tid</span>
        </strong>{" "}
        velge et map fra{" "}
        <strong>
          <span className="text-accent">begge pools</span>
        </strong>
        , så lenge mappet{" "}
        <strong>
          <span className="text-accent">ikke er banned</span>
        </strong>
        , ikke er{" "}
        <strong>
          <span className="text-accent">tiebreaker</span>
        </strong>
        , og{" "}
        <strong>
          <span className="text-accent">ikke har blitt picket allerede</span>
        </strong>{" "}
        .
      </li>
      <li>
        Maps vil bli spilt om igjen hvis en spiller forlater runden innen{" "}
        <strong>
          <span className="text-accent">30 sekunder</span>
        </strong>{" "}
        etter at mappet har startet. Det kan maksimalt bli gjenspilt runder{" "}
        <strong>
          <span className="text-accent">en gang per spiller per match</span>
        </strong>
        .
      </li>
      <li>
        Nofail vil være{" "}
        <strong>
          <span className="text-accent">aktivert</span>
        </strong>{" "}
        gjennom hele turneringen.
      </li>
      <li>
        Forcedmod reglene er som følgende:{" "}
        <ul className="list-disc pl-4">
          <li>Nomod er ikke lov.</li>
          <li>
            De lovlige moddene er:{" "}
            <strong>Easy, Hidden, Hard Rock, Flashlight</strong>{" "}
            <strong>
              <span className="text-accent">
                og alle mulige kombinasjoner med dem
              </span>
            </strong>
            .
          </li>
          <li>
            Alle Easy scores vil bli{" "}
            <strong>
              <span className="text-accent">multiplisert med 2</span>
            </strong>{" "}
            med mindre det blir spesifisert noe annet.
          </li>
        </ul>
      </li>
      <li>
        Ved uavgjorte kartsituasjoner vil utfallet bestemmes i denne
        rekkefølgen:{" "}
        <ul className="list-disc pl-4">
          <li>
            Spilleren som hadde flest mods på mappet vinner. EZ telles ikke her.
          </li>
          <li>Spilleren med færrest 100 count vinner.</li>
          <li>Mappet bestemmes som uavgjort og begge lag tjener 1 poeng.</li>
        </ul>
      </li>
      <li>
        På tiebreakeren er{" "}
        <strong>
          <span className="text-accent">freemod aktivert</span>
        </strong>
        , men ingen mod er påkrevd.
      </li>
      <li>
        I en uavgjort situasjon (5-5 for eksempel) vil tiebreakeren bli spilt.
      </li>
    </ul>
  );
}
