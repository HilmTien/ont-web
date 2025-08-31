export function MatchInfo() {
  return (
    <ul className="list-disc">
      <li>
        Er en spiller på et lag borte i{" "}
        <strong>
          <span className="text-accent">5 minutter</span>
        </strong>{" "}
        etter at matchen var planlagt vil de{" "}
        <strong>
          <span className="text-accent">tape rollen</span>
        </strong>
        .
      </li>
      <li>
        Er en spiller på et lag borte i{" "}
        <strong>
          <span className="text-accent">10 minutter</span>
        </strong>{" "}
        etter at matchen var planlagt vil de{" "}
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
        Ufullstendig lagoppstilling fører til tap for laget med manglende
        spillere.
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
        Lagkapteinene vil få rolle{" "}
        <strong>
          <span className="text-accent">en gang</span>
        </strong>{" "}
        med kommandoen "!roll" (!roll med et tall f.eks !roll 2000 er ikke lov),
        og{" "}
        <strong>
          den høyeste rollen<span className="text-accent"></span>
        </strong>{" "}
        bestemmer hvem som{" "}
        <strong>
          <span className="text-accent">er lag A og B</span>
        </strong>
        .
      </li>
      <li>
        Pick og ban order går som følgende:{" "}
        <pre>
          1. Lag A Tier 1 2. Lag B Tier 2 3. Lag B Tier 1 4. Lag A Tier 2
        </pre>
      </li>
      <li>
        Et lag har vunnet matchen hvis de har vunnet:{" "}
        <strong>
          <span className="text-accent">5 kart i swiss</span>
        </strong>
        , eller{" "}
        <strong>
          <span className="text-accent">6 kart i swiss</span>
        </strong>{" "}
        dersom kampen er en avgjørende kamp (dvs. 2-x / x-2 kamper) og{" "}
        <strong>
          <span className="text-accent">7 kart i Bracket stagen</span>
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
          <span className="text-accent">ikke er banned på sin egen tier</span>
        </strong>
        , ikke er{" "}
        <strong>
          <span className="text-accent">tiebreaker</span>
        </strong>
        , og{" "}
        <strong>
          <span className="text-accent">har ikke blitt picket allerede</span>
        </strong>{" "}
        (også på tvers av tiers).
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
        <ul className="list-disc">
          <li>Nomod er ikke lov utenom bruk av modkapital (1 HD + 1 HR).</li>
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
        </ul>
      </li>
      <li>
        ACC og SV1 mappene vil{" "}
        <strong>
          <span className="text-accent">vil ha freemod på</span>
        </strong>
        , men det er ingen tvang av mods.
      </li>
      <li>
        Ved uavgjorte situasjoner vil utfallet bestemmes i denne rekkefølgen:{" "}
        <ul className="list-disc">
          <li>Spilleren som hadde flest mods vinner. EZ telles ikke her.</li>
          <li>
            Mappet omspilles med krav om en ekstra mod (unntak HDHR) (maks én
            gang).
          </li>
          <li>Spilleren med færrest 100 count vinner.</li>
          <li>Mappet bestemmes som uavgjort og begge lag tjener 1 poeng.</li>
        </ul>
      </li>
      <li>
        Alle Easy scores vil bli{" "}
        <strong>
          <span className="text-accent">multiplisert med 2</span>
        </strong>{" "}
        med mindre det blir spesifisert noe annet.
      </li>
      <li>
        På A pool tiebreaker er{" "}
        <strong>
          <span className="text-accent">freemod aktivert</span>
        </strong>
        , men ingen mod er påkrevd.
      </li>
      <li>
        På B pool tiebreaker gjelder{" "}
        <strong>
          <span className="text-accent">forcedmodreglene</span>
        </strong>
        . Man kan ha samme modkombinasjon på et lag.
      </li>
      <li>I tillegg kan man ikke bruke modkapital på tiebreakeren.</li>
      <li>
        I en uavgjort situasjon (5-5 for eksempel) vil tiebreaker bli valgt på
        følgende måte: Dersom det har blitt spilt{" "}
        <strong>
          <span className="text-accent">strengt flere</span>
        </strong>{" "}
        A pool maps under matchen skal B tiebreaker bli spilt. Ellers blir A
        Tiebreaker spilt.
      </li>
      <li>
        <del>
          Når tiebreaker skal bli spilt sender begge lagene én DM til dommeren
          med Tieren de ønsker å la spille.
        </del>
      </li>
      <li>
        <del>
          Dersom lagene sender samme Tier, blir det den Tieren, ellers blir
          Tieren bestemt med !roll 2 (1 = Tier 1, 2 = Tier 2).
        </del>
      </li>
      <li>
        Tiebreaker spilles som en{" "}
        <strong>
          <span className="text-accent">2v2</span>
        </strong>{" "}
        fra og med Bracket fasen.
      </li>
    </ul>
  );
}
