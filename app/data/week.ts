// Modèle de la semaine type. Les données qui changent (cases cochées, config TT/LB)
// sont stockées séparément (localStorage en Phase 1, Supabase en Phase 2).
//
// vis (visibilité d'un event) :
//   undefined = toujours visible
//   'bureau'  = visible seulement si PAS en télétravail
//   'tt'      = visible seulement en télétravail
//   'lb'      = visible seulement si Laïka au bureau

export type Visibility = "bureau" | "tt" | "lb";

export interface PlanEvent {
  id: string;
  time: string;
  title: string;
  sub: string;
  vis?: Visibility;
}

export interface Section {
  name: string;
  events: PlanEvent[];
}

export interface Day {
  name: string;
  weekend: boolean;
  chips?: string[];
  sections: Section[];
}

export const WEEK: Day[] = [
  {
    name: "Lun",
    weekend: false,
    sections: [
      {
        name: "MATIN",
        events: [
          { id: "l1", time: "05h30 – 06h15", title: "Balade Laïka", sub: "45 min — elle est calme pour la journée", vis: "bureau" },
          { id: "l2", time: "06h15 – 06h45", title: "Préparation + sac sport", sub: "Préparer tenue gym la veille pour gagner du temps", vis: "bureau" },
          { id: "l_lb", time: "06h40", title: "Laïka au bureau aujourd'hui", sub: "Prévoir eau + gamelle + couverture dans le sac", vis: "lb" },
          { id: "l3", time: "06h50 – 07h06", title: "À pied → gare Vouvry", sub: "15 min · partir à 06h50", vis: "bureau" },
          { id: "l4", time: "07h06 – 08h12", title: "R91 → Prilly-Malley", sub: "Voie 1 · 1h06 · arrivée 08h12", vis: "bureau" },
          { id: "l_tt1", time: "06h30 – 07h15", title: "Balade Laïka", sub: "Plus tranquille — pas de train ce matin", vis: "tt" },
          { id: "l_tt2", time: "07h15 – 08h00", title: "Petit-déjeuner + installation", sub: "Bureau à la maison — préparer la journée", vis: "tt" },
        ],
      },
      {
        name: "JOURNÉE",
        events: [
          { id: "l5", time: "08h12 – 12h00", title: "Travail", sub: "3h45 de concentration — bloc matin", vis: "bureau" },
          { id: "l_tt3", time: "08h00 – 12h00", title: "Travail — deep work", sub: "Fenêtre de concentration maximale", vis: "tt" },
          { id: "l6", time: "12h00 – 12h35", title: "Cardio salle", sub: "35 min elliptique / vélo / tapis", vis: "bureau" },
          { id: "l7", time: "12h35 – 13h05", title: "Pilates (séance du jour)", sub: "Corps déjà chaud → enchaîner directement", vis: "bureau" },
          { id: "l8", time: "13h05 – 13h30", title: "Douche + repas express", sub: "Lunch préparé la veille", vis: "bureau" },
          { id: "l_tn1", time: "12h00 – 12h30", title: "Balade Laïka midi", sub: "30 min — pause ressourcement", vis: "tt" },
          { id: "l_tn2", time: "12h30 – 12h45", title: "Assemblage + repas Laïka", sub: "Sandwich / salade — je mange devant l'ordi", vis: "tt" },
          { id: "l9", time: "13h30 – 17h30", title: "Travail — bloc après-midi", sub: "Réunions + deep work" },
        ],
      },
      {
        name: "SOIRÉE",
        events: [
          { id: "l10", time: "17h45 – 18h51", title: "R91 retour → Vouvry", sub: "Voie 1 · arrivée 18h51", vis: "bureau" },
          { id: "l11", time: "18h55 – 19h10", title: "À pied → maison", sub: "15 min", vis: "bureau" },
          { id: "l_tt4", time: "17h30", title: "Fin de journée TT", sub: "Fermer le bureau — déconnecter", vis: "tt" },
          { id: "l12", time: "19h15 – 20h00", title: "Balade Laïka soir", sub: "45 min — indispensable après journée seule" },
          { id: "l13", time: "20h00 – 20h15", title: "Repas Laïka", sub: "Croquettes + eau fraîche" },
          { id: "l14", time: "20h15 – 21h00", title: "Dîner + décompression", sub: "Pas d'écrans si possible" },
          { id: "l15", time: "21h00", title: "Prépa lendemain", sub: "Tenue gym + lunch + sac" },
        ],
      },
    ],
  },
  {
    name: "Mar",
    weekend: false,
    sections: [
      {
        name: "MATIN",
        events: [
          { id: "ma1", time: "05h30 – 06h15", title: "Balade Laïka", sub: "45 min — départ calme pour la journée", vis: "bureau" },
          { id: "ma2", time: "06h15 – 06h45", title: "Préparation", sub: "Tenue prête la veille — gain de temps", vis: "bureau" },
          { id: "ma_lb", time: "06h40", title: "Laïka au bureau aujourd'hui", sub: "Prévoir eau + gamelle + couverture dans le sac", vis: "lb" },
          { id: "ma3", time: "06h50 – 07h06", title: "À pied → gare Vouvry", sub: "15 min · partir à 06h50", vis: "bureau" },
          { id: "ma4", time: "07h06 – 08h12", title: "R91 → Prilly-Malley", sub: "Voie 1 · 1h06 · arrivée 08h12", vis: "bureau" },
          { id: "ma_tt1", time: "06h30 – 07h15", title: "Balade Laïka", sub: "Plus tranquille — pas de train ce matin", vis: "tt" },
          { id: "ma_tt2", time: "07h15 – 08h00", title: "Petit-déjeuner + installation", sub: "Bureau à la maison — préparer la journée", vis: "tt" },
        ],
      },
      {
        name: "JOURNÉE",
        events: [
          { id: "ma5", time: "08h12 – 12h00", title: "Travail — bloc matin", sub: "Deep work — emails + projets", vis: "bureau" },
          { id: "ma_tt3", time: "08h00 – 12h00", title: "Travail — deep work", sub: "Fenêtre de concentration maximale", vis: "tt" },
          { id: "ma6", time: "12h00 – 12h50", title: "Cardio salle", sub: "50 min — séance longue", vis: "bureau" },
          { id: "ma7", time: "12h50 – 13h30", title: "Douche + repas", sub: "Lunch préparé la veille", vis: "bureau" },
          { id: "ma_tn1", time: "12h00 – 12h30", title: "Balade Laïka midi", sub: "30 min — pause ressourcement", vis: "tt" },
          { id: "ma_tn2", time: "12h30 – 12h45", title: "Assemblage + repas Laïka", sub: "Sandwich / salade — je mange devant l'ordi", vis: "tt" },
          { id: "ma8", time: "13h30 – 17h30", title: "Travail — après-midi", sub: "Réunions + deep work" },
        ],
      },
      {
        name: "SOIRÉE",
        events: [
          { id: "ma9", time: "17h45 – 18h51", title: "R91 retour → Vouvry", sub: "Voie 1 · arrivée 18h51", vis: "bureau" },
          { id: "ma10", time: "18h55 – 19h10", title: "À pied → maison", sub: "15 min", vis: "bureau" },
          { id: "ma_tt4", time: "17h30", title: "Fin de journée TT", sub: "Fermer le bureau — déconnecter", vis: "tt" },
          { id: "ma11", time: "19h15 – 20h00", title: "Balade Laïka soir", sub: "45 min" },
          { id: "ma12", time: "20h00 – 20h15", title: "Repas Laïka", sub: "Croquettes + eau fraîche" },
          { id: "ma13", time: "20h15 – 21h30", title: "Soirée libre", sub: "Temps perso — lecture, série, amis" },
        ],
      },
    ],
  },
  {
    name: "Mer",
    weekend: false,
    sections: [
      {
        name: "MATIN",
        events: [
          { id: "me1", time: "05h30 – 06h15", title: "Balade Laïka", sub: "45 min — départ calme pour la journée", vis: "bureau" },
          { id: "me2", time: "06h15 – 06h45", title: "Préparation", sub: "Tenue prête la veille — gain de temps", vis: "bureau" },
          { id: "me_lb", time: "06h40", title: "Laïka au bureau aujourd'hui", sub: "Prévoir eau + gamelle + couverture dans le sac", vis: "lb" },
          { id: "me3", time: "06h50 – 07h06", title: "À pied → gare Vouvry", sub: "15 min · partir à 06h50", vis: "bureau" },
          { id: "me4", time: "07h06 – 08h12", title: "R91 → Prilly-Malley", sub: "Voie 1 · 1h06 · arrivée 08h12", vis: "bureau" },
          { id: "me_tt1", time: "06h30 – 07h15", title: "Balade Laïka", sub: "Plus tranquille — pas de train ce matin", vis: "tt" },
          { id: "me_tt2", time: "07h15 – 08h00", title: "Petit-déjeuner + installation", sub: "Bureau à la maison — préparer la journée", vis: "tt" },
          { id: "me5", time: "10h00 – 10h15", title: "Pause active", sub: "Étirements ou mini-promenade", vis: "tt" },
        ],
      },
      {
        name: "JOURNÉE",
        events: [
          { id: "me6b", time: "08h12 – 12h00", title: "Travail — bloc matin", sub: "Deep work — emails + projets", vis: "bureau" },
          { id: "me6", time: "08h00 – 12h00", title: "Travail — deep work", sub: "Fenêtre de concentration maximale", vis: "tt" },
          { id: "me7b", time: "12h00 – 12h35", title: "Pilates (séance du jour)", sub: "Corps déjà chaud → enchaîner directement", vis: "bureau" },
          { id: "me8b", time: "12h35 – 13h15", title: "Douche + repas express", sub: "Lunch préparé la veille", vis: "bureau" },
          { id: "me_tn1", time: "12h00 – 12h30", title: "Balade Laïka midi", sub: "30 min — pause ressourcement", vis: "tt" },
          { id: "me_tn2", time: "12h30 – 12h45", title: "Assemblage + repas Laïka", sub: "Sandwich / salade — je mange devant l'ordi", vis: "tt" },
          { id: "me9", time: "13h15 – 17h30", title: "Travail — après-midi", sub: "Réunions + suivi projets" },
        ],
      },
      {
        name: "SOIRÉE",
        events: [
          { id: "me10", time: "17h45 – 18h51", title: "R91 retour → Vouvry", sub: "Voie 1 · arrivée 18h51", vis: "bureau" },
          { id: "me11", time: "18h55 – 19h10", title: "À pied → maison", sub: "15 min", vis: "bureau" },
          { id: "me_tt3", time: "17h30", title: "Fin de journée TT", sub: "Fermer le bureau — déconnecter", vis: "tt" },
          { id: "me12", time: "17h30 – 18h30", title: "Balade Laïka longue", sub: "1h — profiter d'être à la maison", vis: "tt" },
          { id: "me12b", time: "19h15 – 20h00", title: "Balade Laïka soir", sub: "45 min", vis: "bureau" },
          { id: "me13", time: "18h30 – 18h45", title: "Repas Laïka", sub: "Croquettes + eau fraîche", vis: "tt" },
          { id: "me13b", time: "20h00 – 20h15", title: "Repas Laïka", sub: "Croquettes + eau fraîche", vis: "bureau" },
          { id: "me14", time: "19h00 – 20h00", title: "Temps libre", sub: "Sport léger, lecture, projets perso", vis: "tt" },
          { id: "me15", time: "20h00", title: "Dîner", sub: "Cuisiner ou commander" },
        ],
      },
    ],
  },
  {
    name: "Jeu",
    weekend: false,
    sections: [
      {
        name: "MATIN",
        events: [
          { id: "j1", time: "05h30 – 06h15", title: "Balade Laïka", sub: "45 min — rituel matinal", vis: "bureau" },
          { id: "j2", time: "06h15 – 06h45", title: "Préparation + sac sport", sub: "Tenue prête la veille", vis: "bureau" },
          { id: "j_lb", time: "06h40", title: "Laïka au bureau aujourd'hui", sub: "Prévoir eau + gamelle + couverture dans le sac", vis: "lb" },
          { id: "j3", time: "06h50 – 07h06", title: "À pied → gare Vouvry", sub: "15 min · partir à 06h50", vis: "bureau" },
          { id: "j4", time: "07h06 – 08h12", title: "R91 → Prilly-Malley", sub: "Voie 1 · 1h06 · arrivée 08h12", vis: "bureau" },
          { id: "j_tt1", time: "06h30 – 07h15", title: "Balade Laïka", sub: "Plus tranquille — pas de train ce matin", vis: "tt" },
          { id: "j_tt2", time: "07h15 – 08h00", title: "Petit-déjeuner + installation", sub: "Bureau à la maison — préparer la journée", vis: "tt" },
        ],
      },
      {
        name: "JOURNÉE",
        events: [
          { id: "j5", time: "08h12 – 12h00", title: "Travail — bloc matin", sub: "Réunions + projets", vis: "bureau" },
          { id: "j_tt3", time: "08h00 – 12h00", title: "Travail — deep work", sub: "Fenêtre de concentration maximale", vis: "tt" },
          { id: "j6", time: "12h00 – 12h35", title: "Cardio salle", sub: "35 min elliptique / vélo / tapis", vis: "bureau" },
          { id: "j7", time: "12h35 – 13h05", title: "Pilates (séance du jour)", sub: "Corps chaud → enchaîner directement", vis: "bureau" },
          { id: "j8", time: "13h05 – 13h30", title: "Douche + repas express", sub: "Lunch préparé la veille", vis: "bureau" },
          { id: "j_tn1", time: "12h00 – 12h30", title: "Balade Laïka midi", sub: "30 min — pause ressourcement", vis: "tt" },
          { id: "j_tn2", time: "12h30 – 12h45", title: "Assemblage + repas Laïka", sub: "Sandwich / salade — je mange devant l'ordi", vis: "tt" },
          { id: "j9", time: "13h30 – 17h30", title: "Travail — après-midi", sub: "Deep work + clôture de semaine" },
        ],
      },
      {
        name: "SOIRÉE",
        events: [
          { id: "j10", time: "17h45 – 18h51", title: "R91 retour → Vouvry", sub: "Voie 1 · arrivée 18h51", vis: "bureau" },
          { id: "j11", time: "18h55 – 19h10", title: "À pied → maison", sub: "15 min", vis: "bureau" },
          { id: "j_tt4", time: "17h30", title: "Fin de journée TT", sub: "Fermer le bureau — déconnecter", vis: "tt" },
          { id: "j12", time: "19h15 – 20h00", title: "Balade Laïka soir", sub: "45 min — après longue journée" },
          { id: "j13", time: "20h00 – 20h15", title: "Repas Laïka", sub: "Croquettes + eau fraîche" },
          { id: "j14", time: "20h15 – 21h30", title: "Dîner + soirée libre", sub: "Décompression avant vendredi TT" },
        ],
      },
    ],
  },
  {
    name: "Ven",
    weekend: false,
    sections: [
      {
        name: "MATIN",
        events: [
          { id: "v1", time: "05h30 – 06h15", title: "Balade Laïka", sub: "Plus longue — fin de semaine", vis: "bureau" },
          { id: "v2", time: "06h15 – 06h45", title: "Préparation", sub: "Tenue prête la veille", vis: "bureau" },
          { id: "v_lb", time: "06h40", title: "Laïka au bureau aujourd'hui", sub: "Prévoir eau + gamelle + couverture dans le sac", vis: "lb" },
          { id: "v3", time: "06h50 – 07h06", title: "À pied → gare Vouvry", sub: "15 min · partir à 06h50", vis: "bureau" },
          { id: "v4", time: "07h06 – 08h12", title: "R91 → Prilly-Malley", sub: "Voie 1 · 1h06 · arrivée 08h12", vis: "bureau" },
          { id: "v_tt1", time: "06h30 – 07h15", title: "Balade Laïka", sub: "Plus tranquille — pas de train ce matin", vis: "tt" },
          { id: "v_tt2", time: "07h15 – 08h00", title: "Petit-déjeuner + installation", sub: "Bureau à la maison — café tranquille", vis: "tt" },
        ],
      },
      {
        name: "JOURNÉE",
        events: [
          { id: "v5", time: "08h12 – 12h00", title: "Travail — matin", sub: "Finaliser la semaine + réunions bilan", vis: "bureau" },
          { id: "v_tt3", time: "08h00 – 12h00", title: "Travail — matin", sub: "Finaliser la semaine + réunions bilan", vis: "tt" },
          { id: "v6", time: "12h00 – 12h35", title: "Pilates (séance du jour)", sub: "5e séance si possible !", vis: "bureau" },
          { id: "v7", time: "12h35 – 13h30", title: "Déjeuner long", sub: "Vendredi — mérite une vraie pause", vis: "bureau" },
          { id: "v_tn1", time: "12h00 – 12h30", title: "Balade Laïka midi", sub: "30 min — pause ressourcement", vis: "tt" },
          { id: "v_tn2", time: "12h30 – 12h45", title: "Assemblage + repas Laïka", sub: "Sandwich / salade — je mange devant l'ordi", vis: "tt" },
          { id: "v8", time: "13h30 – 17h00", title: "Travail — après-midi", sub: "Clôturer, préparer semaine suivante" },
        ],
      },
      {
        name: "SOIRÉE",
        events: [
          { id: "v9", time: "17h15 – 18h21", title: "R91 retour → Vouvry", sub: "Voie 1 · arrivée 18h21", vis: "bureau" },
          { id: "v10", time: "18h25 – 18h40", title: "À pied → maison", sub: "15 min", vis: "bureau" },
          { id: "v_tt4", time: "17h00", title: "Fin de journée TT", sub: "Fermer le bureau — déconnecter", vis: "tt" },
          { id: "v11", time: "17h00 – 18h00", title: "Balade Laïka longue", sub: "1h — fêter le weekend !", vis: "tt" },
          { id: "v11b", time: "18h45 – 19h30", title: "Balade Laïka longue", sub: "1h — fêter le weekend !", vis: "bureau" },
          { id: "v12", time: "18h00 – 18h15", title: "Repas Laïka", sub: "Croquettes + eau fraîche", vis: "tt" },
          { id: "v12b", time: "19h30 – 19h45", title: "Repas Laïka", sub: "Croquettes + eau fraîche", vis: "bureau" },
          { id: "v13", time: "18h30 – 22h00", title: "Soirée weekend", sub: "Amis, sortie, dîner ou soirée perso", vis: "tt" },
          { id: "v13b", time: "20h00 – 22h00", title: "Soirée weekend", sub: "Amis, sortie, dîner ou soirée perso", vis: "bureau" },
        ],
      },
    ],
  },
  {
    name: "Sam",
    weekend: true,
    chips: ["Weekend", "Laïka", "Sport"],
    sections: [
      {
        name: "MATIN",
        events: [
          { id: "s1", time: "07h30 – 08h30", title: "Grande balade Laïka", sub: "1h — forêt, montagne ou bords de lac" },
          { id: "s2", time: "08h30 – 09h30", title: "Petit-déjeuner du weekend", sub: "Prendre vraiment le temps" },
          { id: "s3", time: "09h30 – 10h15", title: "Pilates ou yoga doux", sub: "Séance à la maison — récupération active" },
        ],
      },
      {
        name: "JOURNÉE",
        events: [
          { id: "s4", time: "10h30 – 12h30", title: "Temps libre", sub: "Courses, amis, projets perso" },
          { id: "s5", time: "12h30 – 14h00", title: "Déjeuner", sub: "Sortir manger ou cuisiner" },
          { id: "s6", time: "14h00 – 17h00", title: "Activité outdoor", sub: "Randonnée, vélo, ski ou détente" },
        ],
      },
      {
        name: "SOIRÉE",
        events: [
          { id: "s7", time: "17h00 – 17h45", title: "Balade Laïka soir", sub: "45 min" },
          { id: "s8", time: "17h45 – 18h00", title: "Repas Laïka", sub: "Croquettes + eau fraîche" },
          { id: "s9", time: "18h00 – 23h00", title: "Soirée libre", sub: "Profiter — aucune obligation demain matin" },
        ],
      },
    ],
  },
  {
    name: "Dim",
    weekend: true,
    chips: ["Repos", "Laïka"],
    sections: [
      {
        name: "MATIN",
        events: [
          { id: "d1", time: "08h00 – 09h00", title: "Balade Laïka", sub: "Matinée tranquille — rythme doux" },
          { id: "d2", time: "09h00 – 10h30", title: "Petit-déjeuner + lecture", sub: "Pas d'écrans le matin — déconnexion" },
        ],
      },
      {
        name: "JOURNÉE",
        events: [
          { id: "d3", time: "10h30 – 12h30", title: "Activité douce", sub: "Yoga, marche, musée, café avec amis..." },
          { id: "d4", time: "12h30 – 14h00", title: "Déjeuner du dimanche", sub: "Cuisiner quelque chose de bon" },
          { id: "d5", time: "14h00 – 16h30", title: "Temps libre", sub: "Sieste, projets perso, zéro obligation" },
        ],
      },
      {
        name: "SOIRÉE",
        events: [
          { id: "d6", time: "16h30 – 17h30", title: "Balade Laïka", sub: "1h — avant la semaine" },
          { id: "d7", time: "17h30 – 17h45", title: "Repas Laïka", sub: "Croquettes + eau fraîche" },
          { id: "d8", time: "18h00 – 19h00", title: "Préparation semaine", sub: "Tenues, lunchs, planning → semaine sereine" },
          { id: "d9", time: "19h30 – 20h30", title: "Dîner + coucher tôt", sub: "Lever 05h30 lundi — en forme pour démarrer" },
        ],
      },
    ],
  },
];

export interface WeekSettings {
  tt: boolean[]; // télétravail par jour (Lun→Dim)
  lb: boolean[]; // Laïka au bureau par jour
}

export const DEFAULT_SETTINGS: WeekSettings = {
  tt: [false, false, true, false, true, false, false],
  lb: [false, false, false, false, false, false, false],
};

export const DAY_NAMES = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi"];
