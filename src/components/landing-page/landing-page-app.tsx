import { signIn } from "@/auth";
import { createServerClient } from "@/lib/server";
import { formatSecondsToHHMM } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import Discord from "../icons/discord";
import Osu from "../icons/osu";
import Twitch from "../icons/twitch";
import Youtube from "../icons/youtube";

export default async function LandingPageApp() {
  // const session = await auth();

  const supabase = await createServerClient();

  const { data: matches } = await supabase.from("matches").select(
    `
      tournament_match_id,
      match_time,
      stream_link,
      team1_score,
      team2_score,
      team1_label,
      team2_label,
      team1:teams!team1_id(
        name,
        team_players(
          users(
            osu_id
          )
        )
      ),
      team2:teams!team2_id(
        name,
        team_players(
          users(
            osu_id
          )
        )
      )
    `,
  );

  const ongoingMatches = matches
    ?.filter(
      (match) =>
        new Date(match.match_time).getTime() - new Date().getTime() < 0 &&
        !match.team1_score &&
        !match.team2_score,
    )
    .sort(
      (a, b) =>
        new Date(a.match_time).getTime() - new Date(b.match_time).getTime(),
    );

  const scheduledMatches = matches
    ?.filter(
      (match) =>
        new Date(match.match_time).getTime() - new Date().getTime() > 0 &&
        new Date(match.match_time).getTime() - new Date().getTime() <
          43200000 &&
        !match.team1_score &&
        !match.team2_score,
    )
    .sort(
      (a, b) =>
        new Date(a.match_time).getTime() - new Date(b.match_time).getTime(),
    );

  // let canRegister: boolean;

  // const { data: tournament } = await supabase
  //   .from("tournaments")
  //   .select("can_register")
  //   .eq("id", 1)
  //   .single();

  // if (tournament) {
  //   canRegister = tournament.can_register;
  // } else {
  //   canRegister = false;
  // }

  // let registered: boolean;

  // if (session) {
  //   const { data: user } = await supabase
  //     .from("users")
  //     .select("registrations(id)")
  //     .eq("osu_id", session?.osuId)
  //     .single();

  //   if (!user) {
  //     registered = false;
  //   } else {
  //     registered = user.registrations.length != 0;
  //   }
  // } else {
  //   registered = false;
  // }

  return (
    <div className="mx-auto max-w-[75%]">
      <section className="bg-content shadow-container mb-4 flex flex-col items-center justify-between p-5 xl:flex-row">
        <div className="mx-auto flex flex-1 flex-col items-start justify-center space-y-4 xl:pl-15">
          <Image
            src={"/logos/ont/new-logo.png"}
            alt="Logo"
            width={3362}
            height={2377}
            sizes="100vw"
            className="w-40"
          />
          <p className="text-4xl font-bold">osu! Norge Turnering 5</p>
          <p className="text-2xl">
            Vi fokuserer <span className="underline">fortsatt</span> på høy
            produksjon.
          </p>
        </div>
        {ongoingMatches && ongoingMatches.length !== 0 ? (
          <div className="mx-auto mt-10 mr-auto flex flex-col gap-5">
            <h1 className="text-2xl font-bold">Pågående matches</h1>
            <div className="flex flex-col gap-2">
              {ongoingMatches.map((match) => (
                <div
                  key={match.tournament_match_id}
                  className="bg-navbar flex flex-col justify-between gap-1 rounded-md p-2 sm:min-w-96"
                >
                  <div className="flex flex-col">
                    <div className="flex gap-2">
                      <p>{match.tournament_match_id}</p>
                      <p>
                        {new Date(match.match_time).toLocaleTimeString(
                          "no-NO",
                          {
                            hour12: false,
                            hour: "numeric",
                            minute: "numeric",
                            timeZone: "Europe/Oslo",
                          },
                        )}
                      </p>
                      {match.stream_link ? (
                        <Link
                          href={match.stream_link}
                          className="ml-auto hover:font-semibold"
                          target="_blank"
                        >
                          Se direkte
                        </Link>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col justify-between sm:flex-row">
                    {match.team1 ? (
                      <div className="flex items-center justify-center gap-1">
                        <Image
                          src={
                            match.team1.team_players[0]
                              ? `https://a.ppy.sh/${match.team1.team_players[0].users.osu_id}`
                              : "/profile-pics/avatar-guest.png"
                          }
                          alt="Team 1 Logo"
                          width={256}
                          height={256}
                          unoptimized
                          className="w-10 rounded-md"
                        />
                        <p className="font-semibold">{match.team1.name}</p>
                      </div>
                    ) : (
                      ""
                    )}
                    {match.team2 ? (
                      <div className="flex items-center justify-center gap-1">
                        <p className="font-semibold">{match.team2.name}</p>
                        <Image
                          src={
                            match.team2.team_players[0]
                              ? `https://a.ppy.sh/${match.team2.team_players[0].users.osu_id}`
                              : "/profile-pics/avatar-guest.png"
                          }
                          alt="Team 1 Logo"
                          width={256}
                          height={256}
                          unoptimized
                          className="w-10 rounded-md"
                        />
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="border-accent mt-6 aspect-video w-full max-w-full flex-1 overflow-hidden rounded-md border-4 xl:mt-0 xl:max-w-[44%]">
            <iframe
              src="https://www.youtube.com/embed/MSeZTBKf5cI?autoplay=1&mute=1&controls=0&modestbranding=1&rel=0"
              title="YouTube video player"
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
              className="h-full w-full"
            ></iframe>
          </div>
        )}
      </section>

      <section className="flex flex-col gap-10 xl:flex-row">
        <div className="w-full xl:max-w-[45%]">
          <p className="border-accent mb-2 border-b-2 pb-2 text-xl font-semibold sm:text-2xl">
            TIDSLINJE
          </p>
          <ul className="space-y-1 text-xs sm:text-lg">
            <li className="flex justify-between">
              <span className="font-medium">Registeringsfase</span>
              <span>1. September - 7. September</span>
            </li>
            <li className="flex justify-between">
              <span className="font-medium">Screeningsfase</span>
              <span>8. September - 14. September</span>
            </li>
            <li className="flex justify-between">
              <span className="font-medium">Gruppespill</span>
              <span>15. September - 21. September</span>
            </li>
            <li className="flex justify-between">
              <span className="font-medium">Runoff runde 1</span>
              <span>22. September - 28. September</span>
            </li>
            <li className="flex justify-between">
              <span className="font-medium">Runoff runde 2</span>
              <span>29. September - 5. Oktober</span>
            </li>
            <li className="flex justify-between">
              <span className="font-medium">Swiss Uke 1 (0-0, 1-0, 0-1)</span>
              <span>6. Oktober - 12. Oktober</span>
            </li>
            <li className="flex justify-between">
              <span className="font-medium">Swiss Uke 2 (2-0, 1-1, 0-2)</span>
              <span>13. Oktober - 19. Oktober</span>
            </li>
            <li className="flex justify-between">
              <span className="font-medium">Swiss Uke 3 (2-1, 1-2, 2-2)</span>
              <span>20. Oktober - 26. Oktober</span>
            </li>
            <li className="flex justify-between">
              <span className="font-medium">Sluttspill (QF)</span>
              <span>27. Oktober - 2. November</span>
            </li>
            <li className="flex justify-between">
              <span className="font-medium">Sluttspill (SF + Finaler)</span>
              <span>3. November - 9. November</span>
            </li>
          </ul>
        </div>

        <div className="flex w-full min-w-[50%] flex-col gap-10 pb-10 xl:pb-0">
          <div
            className={
              scheduledMatches && scheduledMatches.length !== 0 ? "" : "hidden"
            }
          >
            <p className="border-accent mb-2 border-b-2 pb-2 text-xl font-semibold sm:text-2xl">
              KOMMENDE MATCHES
            </p>
            <div className="flex flex-col gap-5">
              {scheduledMatches
                ? scheduledMatches.map((match) => (
                    <div
                      key={match.tournament_match_id}
                      className="flex w-full justify-between gap-2"
                    >
                      <div className="flex flex-col text-nowrap sm:flex-row sm:gap-2">
                        <p>{match.tournament_match_id}</p>{" "}
                        <p>
                          {new Date(match.match_time).toLocaleTimeString(
                            "no-NO",
                            {
                              hour12: false,
                              hour: "numeric",
                              minute: "numeric",
                              timeZone: "Europe/Oslo",
                            },
                          )}
                        </p>
                      </div>
                      <div className="flex gap-5">
                        <div className="flex flex-col items-center gap-2 sm:min-w-80 sm:flex-row sm:justify-between">
                          {
                            <div className="flex items-center justify-center gap-1">
                              <Image
                                src={
                                  match.team1
                                    ? `https://a.ppy.sh/${match.team1.team_players[0].users.osu_id}`
                                    : "/profile-pics/avatar-guest.png"
                                }
                                alt="Team 1 Logo"
                                width={256}
                                height={256}
                                unoptimized
                                className="w-5 rounded-md sm:w-8"
                              />
                              <p className="text-sm font-semibold sm:text-base">
                                {match.team1?.name || match.team1_label}
                              </p>
                            </div>
                          }{" "}
                          {
                            <div className="flex items-center justify-center gap-1">
                              <p className="text-sm font-semibold sm:text-base">
                                {match.team2?.name || match.team2_label}
                              </p>
                              <Image
                                src={
                                  match.team2
                                    ? `https://a.ppy.sh/${match.team2.team_players[0].users.osu_id}`
                                    : "/profile-pics/avatar-guest.png"
                                }
                                alt="Team 1 Logo"
                                width={256}
                                height={256}
                                unoptimized
                                className="w-5 rounded-md sm:w-8"
                              />
                            </div>
                          }
                        </div>
                        <p className="flex items-center">
                          {formatSecondsToHHMM(
                            (new Date(match.match_time).getTime() -
                              new Date().getTime()) /
                              1000,
                          )}
                        </p>
                      </div>
                    </div>
                  ))
                : ""}
            </div>
          </div>
          <div className="mt-6 flex items-center justify-center gap-5 sm:gap-20">
            <Link
              href="https://discord.com/invite/zY5dwFEbSx/"
              target="_blank"
              className=""
            >
              <Discord className="size-7 sm:size-14" />
            </Link>
            <Link
              href="https://twitch.tv/osunorge"
              target="_blank"
              className=""
            >
              <Twitch className="size-7 sm:size-14" />
            </Link>

            <Link
              href="https://youtube.com/@osunorge"
              target="_blank"
              className=""
            >
              <Youtube className="size-7 sm:size-14" />
            </Link>

            <Link
              href="https://osu.ppy.sh/community/forums/topics/2125135"
              target="_blank"
              className=""
            >
              <Osu className="size-7 sm:size-14" />
            </Link>
          </div>

          {/* <div className="flex justify-center gap-4">
            <Link
              href="/mappools"
              className="bg-accent ml-10 flex h-12 w-80 items-center justify-center text-sm shadow-2xl sm:text-xl"
            >
              Mappool
            </Link>
            {canRegister ? (
              session ? (
                <RegisterButton tournamentId={1} registered={registered} />
              ) : (
                <div className="bg-disabled flex-1 py-3 text-center text-xl shadow-2xl">
                  Logg inn for å melde på
                </div>
              )
            ) : (
              <div className="bg-disabled flex h-12 w-80 items-center justify-center text-center text-sm shadow-2xl sm:text-xl">
                Registreringer er stengt
              </div>
            )}
          </div> */}
        </div>
      </section>

      {process.env.NODE_ENV == "development" && (
        <form
          action={async (data) => {
            "use server";
            await signIn("credentials", { name: data.get("user") });
          }}
          className="fixed right-24 bottom-4 hover:cursor-pointer"
        >
          <select name="user">
            <option value="MockHost">Host</option>
            <option value="MockReferee">Referee</option>
            <option value="MockCommentator">Commentator</option>
            <option value="MockStreamer">Streamer</option>
            <option value="MockPlayer1">Player 1</option>
            <option value="MockPlayer2">Player 2</option>
          </select>
          <button type="submit">(DEV) Mock Login</button>
        </form>
      )}
    </div>
  );
}
