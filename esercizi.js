// Glossario esercizi di HomeFitness.
// Riga: [id, sezione, categoria, nome, foto, esecuzione]
// foto = cartella in esercizi/ (immagini da free-exercise-db, pubblico dominio – Unlicense), null = disegno generico.
window.SEZIONI_ES = [
  { id: 'forza', nome: 'Forza', sub: 'per gruppo muscolare', cat: ['Petto', 'Dorso', 'Spalle', 'Bicipiti', 'Tricipiti', 'Quadricipiti', 'Glutei e femorali', 'Polpacci', 'Addome', 'Total body e cardio'] },
  { id: 'core', nome: 'Core stability', sub: 'stabilità del tronco', cat: ['Anti-estensione', 'Anti-flessione laterale', 'Anti-rotazione', 'Anti-flessione'] },
  { id: 'mob', nome: 'Mobilità', sub: 'per distretto', cat: ['Caviglia', 'Ginocchio', 'Anca', 'Schiena', 'Spalle'] }
];

window.ESERCIZI = [
  // ---------- FORZA: Petto ----------
  ['panca-piana', 'forza', 'Petto', 'Panca piana con bilanciere', 'Barbell_Bench_Press_-_Medium_Grip', 'Scapole addotte e piedi a terra; scendi al petto controllando e spingi fino a braccia tese.'],
  ['panca-inclinata', 'forza', 'Petto', 'Panca inclinata con bilanciere', 'Barbell_Incline_Bench_Press_-_Medium_Grip', 'Schienale a 30–45°; abbassa il bilanciere sulla parte alta del petto e spingi.'],
  ['distensioni-manubri', 'forza', 'Petto', 'Distensioni con manubri su panca', 'Dumbbell_Bench_Press', 'Manubri all’altezza del petto, gomiti a circa 45° dal busto; spingi in alto avvicinando i manubri.'],
  ['croci-manubri', 'forza', 'Petto', 'Croci con manubri', 'Dumbbell_Flyes', 'Gomiti leggermente flessi e fissi; apri le braccia fino a sentire l’allungamento del petto e richiudi.'],
  ['croci-cavi', 'forza', 'Petto', 'Croci ai cavi', 'Flat_Bench_Cable_Flyes', 'Movimento ad arco con gomiti morbidi; stringi il petto a fine movimento.'],
  ['piegamenti', 'forza', 'Petto', 'Piegamenti (push-up)', 'Pushups', 'Corpo in linea dalla testa ai talloni; scendi col petto vicino a terra e spingi.'],
  ['piegamenti-rialzo', 'forza', 'Petto', 'Piegamenti con mani su rialzo', 'Incline_Push-Up', 'Versione facilitata: mani su panca o rialzo, corpo in linea.'],
  ['piegamenti-piedi-alti', 'forza', 'Petto', 'Piegamenti con piedi rialzati', 'Push-Ups_With_Feet_Elevated', 'Versione più difficile: piedi su panca, addome contratto.'],
  ['dip-petto', 'forza', 'Petto', 'Dip alle parallele (petto)', 'Dips_-_Chest_Version', 'Busto inclinato in avanti; scendi fino a 90° di gomito e risali.'],
  ['chest-press', 'forza', 'Petto', 'Chest press alla macchina', 'Machine_Bench_Press', 'Maniglie all’altezza del petto; spingi senza bloccare i gomiti.'],

  // ---------- FORZA: Dorso ----------
  ['trazioni', 'forza', 'Dorso', 'Trazioni alla sbarra', 'Pullups', 'Presa prona larga; tira il petto verso la sbarra portando i gomiti in basso.'],
  ['trazioni-elastico', 'forza', 'Dorso', 'Trazioni assistite con elastico', 'Band_Assisted_Pull-Up', 'Elastico sotto le ginocchia o i piedi per alleggerire; stessa tecnica delle trazioni.'],
  ['chin-up', 'forza', 'Dorso', 'Trazioni presa supina (chin-up)', 'Chin-Up', 'Palmi verso di te, presa alla larghezza delle spalle; mento sopra la sbarra.'],
  ['lat-machine', 'forza', 'Dorso', 'Lat machine avanti', 'Wide-Grip_Lat_Pulldown', 'Busto leggermente inclinato indietro; porta la barra al petto alto.'],
  ['lat-presa-stretta', 'forza', 'Dorso', 'Lat machine presa stretta', 'Close-Grip_Front_Lat_Pulldown', 'Presa stretta; tira verso lo sterno tenendo il petto alto.'],
  ['rematore-bilanciere', 'forza', 'Dorso', 'Rematore con bilanciere', 'Bent_Over_Barbell_Row', 'Busto inclinato a circa 45°, schiena neutra; tira il bilanciere verso l’ombelico.'],
  ['rematore-manubrio', 'forza', 'Dorso', 'Rematore con manubrio a un braccio', 'One-Arm_Dumbbell_Row', 'Mano e ginocchio sulla panca; tira il manubrio verso il fianco.'],
  ['pulley', 'forza', 'Dorso', 'Pulley basso', 'Seated_Cable_Rows', 'Schiena dritta; tira il triangolo verso l’addome stringendo le scapole.'],
  ['rematore-inverso', 'forza', 'Dorso', 'Rematore inverso (corpo libero/TRX)', 'Inverted_Row', 'Corpo rigido sotto una sbarra o con TRX; porta il petto verso le mani.'],
  ['pullover-cavo', 'forza', 'Dorso', 'Pulldown a braccia tese', 'Straight-Arm_Pulldown', 'Braccia quasi tese; porta la barra dalle spalle alle cosce usando il gran dorsale.'],
  ['band-pull-apart', 'forza', 'Dorso', 'Aperture con elastico (pull-apart)', 'Band_Pull_Apart', 'Braccia tese davanti al petto; apri l’elastico avvicinando le scapole.'],

  // ---------- FORZA: Spalle ----------
  ['military-press', 'forza', 'Spalle', 'Military press con bilanciere', 'Standing_Military_Press', 'In piedi, glutei e addome contratti; spingi il bilanciere sopra la testa.'],
  ['shoulder-press', 'forza', 'Spalle', 'Lento con manubri', 'Dumbbell_Shoulder_Press', 'Manubri all’altezza delle orecchie; spingi in alto senza inarcare la schiena.'],
  ['arnold-press', 'forza', 'Spalle', 'Arnold press', 'Arnold_Dumbbell_Press', 'Parti con palmi verso di te e ruota durante la spinta.'],
  ['alzate-laterali', 'forza', 'Spalle', 'Alzate laterali', 'Side_Lateral_Raise', 'Gomiti leggermente flessi; alza i manubri fino all’altezza delle spalle.'],
  ['alzate-frontali', 'forza', 'Spalle', 'Alzate frontali', 'Front_Plate_Raise', 'Braccia tese davanti; alza fino all’altezza degli occhi senza slanci.'],
  ['alzate-posteriori', 'forza', 'Spalle', 'Alzate posteriori a busto flesso', 'Seated_Bent-Over_Rear_Delt_Raise', 'Busto flesso in avanti; apri le braccia lateralmente lavorando il deltoide posteriore.'],
  ['face-pull', 'forza', 'Spalle', 'Face pull', 'Face_Pull', 'Corda all’altezza del viso; tira verso la fronte aprendo i gomiti e ruotando fuori.'],
  ['rot-esterna-elastico', 'forza', 'Spalle', 'Rotazione esterna con elastico', 'External_Rotation_with_Band', 'Gomito al fianco a 90°; ruota l’avambraccio verso l’esterno lentamente.'],
  ['tirata-mento', 'forza', 'Spalle', 'Tirata al mento', 'Upright_Barbell_Row', 'Presa media; solleva il bilanciere lungo il corpo fino al petto, gomiti alti.'],
  ['scrollate', 'forza', 'Spalle', 'Scrollate con manubri', 'Dumbbell_Shrug', 'Braccia tese; solleva le spalle verso le orecchie e scendi lentamente.'],

  // ---------- FORZA: Bicipiti ----------
  ['curl-bilanciere', 'forza', 'Bicipiti', 'Curl con bilanciere', 'Barbell_Curl', 'Gomiti fermi ai fianchi; fletti fino in alto e scendi controllando.'],
  ['curl-alternato', 'forza', 'Bicipiti', 'Curl alternato con manubri', 'Dumbbell_Alternate_Bicep_Curl', 'Un braccio alla volta, ruotando il palmo verso l’alto durante la salita.'],
  ['curl-martello', 'forza', 'Bicipiti', 'Curl a martello', 'Hammer_Curls', 'Palmi uno di fronte all’altro per tutto il movimento.'],
  ['curl-scott', 'forza', 'Bicipiti', 'Curl alla panca Scott', 'Preacher_Curl', 'Braccia appoggiate sul cuscino; evita di distendere del tutto di scatto.'],
  ['curl-concentrato', 'forza', 'Bicipiti', 'Curl concentrato', 'Concentration_Curls', 'Seduto, gomito contro la coscia; fletti lentamente.'],
  ['curl-inclinato', 'forza', 'Bicipiti', 'Curl su panca inclinata', 'Incline_Dumbbell_Curl', 'Braccia a pendolo dietro il busto per allungare il bicipite.'],

  // ---------- FORZA: Tricipiti ----------
  ['pushdown', 'forza', 'Tricipiti', 'Push down ai cavi', 'Triceps_Pushdown', 'Gomiti fermi ai fianchi; distendi le braccia verso il basso.'],
  ['pushdown-corda', 'forza', 'Tricipiti', 'Push down con corda', 'Triceps_Pushdown_-_Rope_Attachment', 'A fine movimento apri la corda verso l’esterno.'],
  ['french-press', 'forza', 'Tricipiti', 'French press (skull crusher)', 'EZ-Bar_Skullcrusher', 'Sdraiato, gomiti verso il soffitto; porta la barra verso la fronte e distendi.'],
  ['estensioni-sopra-testa', 'forza', 'Tricipiti', 'Estensioni sopra la testa con manubrio', 'Standing_Dumbbell_Triceps_Extension', 'Manubrio dietro la testa, gomiti vicini; distendi verso l’alto.'],
  ['kickback', 'forza', 'Tricipiti', 'Kickback con manubrio', 'Tricep_Dumbbell_Kickback', 'Busto flesso, gomito alto e fermo; distendi il braccio indietro.'],
  ['dip-panca', 'forza', 'Tricipiti', 'Dip su panca', 'Bench_Dips', 'Mani sulla panca dietro di te; scendi piegando i gomiti e risali.'],
  ['panca-stretta', 'forza', 'Tricipiti', 'Panca presa stretta', 'Close-Grip_Barbell_Bench_Press', 'Mani alla larghezza delle spalle, gomiti vicini al corpo.'],
  ['piegamenti-stretti', 'forza', 'Tricipiti', 'Piegamenti presa stretta', 'Push-Ups_-_Close_Triceps_Position', 'Mani vicine sotto il petto, gomiti che scorrono lungo i fianchi.'],

  // ---------- FORZA: Quadricipiti ----------
  ['squat-corpo-libero', 'forza', 'Quadricipiti', 'Squat a corpo libero', 'Bodyweight_Squat', 'Piedi alla larghezza delle spalle; scendi come per sederti, ginocchia in linea con le punte.'],
  ['goblet-squat', 'forza', 'Quadricipiti', 'Goblet squat', 'Goblet_Squat', 'Manubrio o kettlebell al petto; scendi profondo col busto alto.'],
  ['squat-bilanciere', 'forza', 'Quadricipiti', 'Squat con bilanciere', 'Barbell_Squat', 'Bilanciere sui trapezi; scendi almeno al parallelo mantenendo la schiena neutra.'],
  ['front-squat', 'forza', 'Quadricipiti', 'Front squat', 'Front_Barbell_Squat', 'Bilanciere sulle spalle davanti, gomiti alti; busto verticale.'],
  ['squat-panca', 'forza', 'Quadricipiti', 'Squat su panca (box squat)', 'Dumbbell_Squat_To_A_Bench', 'Scendi fino a sfiorare la panca e risali: utile per imparare la profondità.'],
  ['affondi', 'forza', 'Quadricipiti', 'Affondi in avanti', 'Dumbbell_Lunges', 'Passo lungo in avanti; ginocchio dietro vicino a terra, busto dritto.'],
  ['affondi-indietro', 'forza', 'Quadricipiti', 'Affondi indietro', 'Dumbbell_Rear_Lunge', 'Passo indietro: più facile per le ginocchia rispetto all’affondo in avanti.'],
  ['affondi-camminati', 'forza', 'Quadricipiti', 'Affondi camminati', 'Bodyweight_Walking_Lunge', 'Affondi alternati avanzando; mantieni il busto stabile.'],
  ['split-squat', 'forza', 'Quadricipiti', 'Split squat', 'Split_Squat_with_Dumbbells', 'Gambe divaricate avanti-dietro e fisse; scendi e risali sul posto.'],
  ['bulgaro', 'forza', 'Quadricipiti', 'Squat bulgaro (piede dietro rialzato)', 'Smith_Single-Leg_Split_Squat', 'Piede posteriore su panca; scendi sulla gamba anteriore.'],
  ['step-up', 'forza', 'Quadricipiti', 'Step up', 'Dumbbell_Step_Ups', 'Sali sul rialzo spingendo col tallone della gamba davanti.'],
  ['leg-press', 'forza', 'Quadricipiti', 'Leg press', 'Leg_Press', 'Piedi a metà pedana; scendi senza staccare il bacino dallo schienale.'],
  ['leg-extension', 'forza', 'Quadricipiti', 'Leg extension', 'Leg_Extensions', 'Distendi le ginocchia e scendi lentamente.'],
  ['pistol', 'forza', 'Quadricipiti', 'Pistol squat (squat a una gamba)', 'Kettlebell_Pistol_Squat', 'Avanzato: squat su una gamba con l’altra tesa avanti.'],

  // ---------- FORZA: Glutei e femorali ----------
  ['stacco', 'forza', 'Glutei e femorali', 'Stacco da terra', 'Barbell_Deadlift', 'Bilanciere vicino agli stinchi, schiena neutra; spingi il pavimento ed estendi le anche.'],
  ['stacco-rumeno', 'forza', 'Glutei e femorali', 'Stacco rumeno', 'Romanian_Deadlift', 'Ginocchia leggermente flesse; porta il bacino indietro facendo scorrere il bilanciere sulle cosce.'],
  ['stacco-manubri', 'forza', 'Glutei e femorali', 'Stacco a gambe semitese con manubri', 'Stiff-Legged_Dumbbell_Deadlift', 'Come il rumeno, con manubri; senti l’allungamento dei femorali.'],
  ['stacco-una-gamba', 'forza', 'Glutei e femorali', 'Stacco su una gamba', 'Kettlebell_One-Legged_Deadlift', 'In equilibrio su una gamba; busto e gamba libera si muovono insieme come un’asse.'],
  ['stacco-sumo', 'forza', 'Glutei e femorali', 'Stacco sumo', 'Sumo_Deadlift', 'Piedi larghi e punte fuori, presa interna; spingi con le gambe.'],
  ['hip-thrust', 'forza', 'Glutei e femorali', 'Hip thrust', 'Barbell_Hip_Thrust', 'Scapole su panca; spingi il bacino in alto contraendo i glutei.'],
  ['ponte-glutei', 'forza', 'Glutei e femorali', 'Ponte per i glutei', 'Butt_Lift_Bridge', 'Supino, piedi vicini ai glutei; solleva il bacino fino ad allineare cosce e busto.'],
  ['ponte-una-gamba', 'forza', 'Glutei e femorali', 'Ponte glutei a una gamba', 'Single_Leg_Glute_Bridge', 'Una gamba sollevata; il bacino non deve ruotare.'],
  ['good-morning', 'forza', 'Glutei e femorali', 'Good morning', 'Good_Morning', 'Bilanciere sulle spalle; flessione delle anche con schiena neutra.'],
  ['kettlebell-swing', 'forza', 'Glutei e femorali', 'Kettlebell swing', 'One-Arm_Kettlebell_Swings', 'Spinta esplosiva delle anche; le braccia accompagnano soltanto.'],
  ['leg-curl', 'forza', 'Glutei e femorali', 'Leg curl sdraiato', 'Lying_Leg_Curls', 'Fletti le ginocchia portando i talloni verso i glutei.'],
  ['leg-curl-fitball', 'forza', 'Glutei e femorali', 'Leg curl su fitball', 'Ball_Leg_Curl', 'Supino con talloni sulla palla, bacino alto; avvicina la palla.'],
  ['nordic', 'forza', 'Glutei e femorali', 'Nordic hamstring curl', 'Natural_Glute_Ham_Raise', 'In ginocchio con caviglie bloccate; scendi in avanti il più lentamente possibile.'],
  ['kickback-glutei', 'forza', 'Glutei e femorali', 'Slanci posteriori (glute kickback)', 'Glute_Kickback', 'In quadrupedia; spingi una gamba indietro e in alto senza inarcare la schiena.'],
  ['abduzioni', 'forza', 'Glutei e femorali', 'Abduzioni alla macchina', 'Thigh_Abductor', 'Apri le gambe contro resistenza; lavora il gluteo medio.'],
  ['adduzioni', 'forza', 'Glutei e femorali', 'Adduzioni alla macchina', 'Thigh_Adductor', 'Chiudi le gambe contro resistenza in modo controllato.'],
  ['iperestensioni', 'forza', 'Glutei e femorali', 'Iperestensioni (back extension)', 'Hyperextensions_Back_Extensions', 'Bacino sul cuscino; sali fino ad allineare il busto alle gambe.'],

  // ---------- FORZA: Polpacci ----------
  ['calf-in-piedi', 'forza', 'Polpacci', 'Calf raise in piedi', 'Standing_Calf_Raises', 'Sali sulle punte il più in alto possibile e scendi sotto il livello del gradino.'],
  ['calf-seduto', 'forza', 'Polpacci', 'Calf raise da seduto', 'Seated_Calf_Raise', 'Ginocchia flesse: lavora soprattutto il soleo.'],
  ['calf-una-gamba', 'forza', 'Polpacci', 'Calf raise a una gamba con manubrio', 'Standing_Dumbbell_Calf_Raise', 'Su un gradino, una gamba alla volta; movimento completo.'],

  // ---------- FORZA: Addome ----------
  ['crunch', 'forza', 'Addome', 'Crunch', 'Crunches', 'Supino a ginocchia flesse; solleva le spalle arrotolando il busto, senza tirare il collo.'],
  ['crunch-inverso', 'forza', 'Addome', 'Crunch inverso', 'Reverse_Crunch', 'Porta le ginocchia verso il petto sollevando il bacino da terra.'],
  ['crunch-obliquo', 'forza', 'Addome', 'Crunch obliquo', 'Oblique_Crunches_-_On_The_Floor', 'Porta la spalla verso il ginocchio opposto.'],
  ['crunch-cavo', 'forza', 'Addome', 'Crunch al cavo in ginocchio', 'Cable_Crunch', 'Corda dietro la testa; arrotola il busto verso le ginocchia.'],
  ['leg-raise-sbarra', 'forza', 'Addome', 'Sollevamento gambe alla sbarra', 'Hanging_Leg_Raise', 'Appeso, solleva le gambe senza slanci.'],
  ['russian-twist', 'forza', 'Addome', 'Russian twist', 'Russian_Twist', 'Seduto col busto inclinato indietro; ruota da un lato all’altro.'],
  ['flutter-kick', 'forza', 'Addome', 'Flutter kick (sforbiciate)', 'Flutter_Kicks', 'Supino, zona lombare a terra; piccole sforbiciate con gambe tese.'],

  // ---------- FORZA: Total body e cardio ----------
  ['farmer-walk', 'forza', 'Total body e cardio', 'Farmer walk', 'Farmers_Walk', 'Cammina con due pesi ai lati, spalle basse e busto dritto.'],
  ['thruster', 'forza', 'Total body e cardio', 'Thruster', 'Kettlebell_Thruster', 'Squat e, risalendo, spinta dei pesi sopra la testa in un unico movimento.'],
  ['turkish-getup', 'forza', 'Total body e cardio', 'Turkish get-up', 'Kettlebell_Turkish_Get-Up_Squat_style', 'Da sdraiato a in piedi tenendo il peso sopra la testa, passo dopo passo.'],
  ['mountain-climber', 'forza', 'Total body e cardio', 'Mountain climber', 'Mountain_Climbers', 'In posizione di plank, porta alternativamente le ginocchia al petto.'],
  ['jumping-jack', 'forza', 'Total body e cardio', 'Jumping jack', 'Star_Jump', 'Saltelli aprendo e chiudendo braccia e gambe.'],
  ['corda', 'forza', 'Total body e cardio', 'Salto della corda', 'Rope_Jumping', 'Saltelli bassi sugli avampiedi, polsi che fanno girare la corda.'],
  ['squat-jump', 'forza', 'Total body e cardio', 'Squat jump', 'Freehand_Jump_Squat', 'Squat e salto verso l’alto; atterra morbido.'],
  ['box-jump', 'forza', 'Total body e cardio', 'Box jump', 'Front_Box_Jump', 'Salta sul rialzo atterrando a ginocchia flesse; scendi camminando.'],
  ['battle-rope', 'forza', 'Total body e cardio', 'Battle rope', 'Battling_Ropes', 'Onde alternate con le corde mantenendo una mezza accosciata.'],
  ['burpee', 'forza', 'Total body e cardio', 'Burpee', null, 'Accosciata, mani a terra, gambe indietro in plank, piegamento facoltativo, ritorno e salto.'],

  // ---------- CORE: Anti-estensione ----------
  ['plank', 'core', 'Anti-estensione', 'Plank', 'Plank', 'Avambracci a terra, corpo in linea; glutei e addome contratti, non far cadere il bacino.'],
  ['dead-bug', 'core', 'Anti-estensione', 'Dead bug', 'Dead_Bug', 'Supino, braccia e gambe in alto; estendi braccio e gamba opposti tenendo la schiena a terra.'],
  ['rollout-ginocchio', 'core', 'Anti-estensione', 'Rollout in ginocchio', 'Barbell_Ab_Rollout_-_On_Knees', 'In ginocchio, rotola in avanti col bilanciere o la ruota senza inarcare la schiena.'],
  ['ab-wheel', 'core', 'Anti-estensione', 'Ab wheel (ruota addominale)', 'Ab_Roller', 'Come il rollout: vai lontano solo finché la schiena resta neutra.'],
  ['hollow-hold', 'core', 'Anti-estensione', 'Hollow hold', null, 'Supino, zona lombare schiacciata a terra; spalle e gambe sollevate a “barchetta”.'],
  ['body-saw', 'core', 'Anti-estensione', 'Body saw', null, 'Plank con piedi su sliders o asciugamano; spostati avanti e indietro dalle spalle.'],
  ['plank-tocco-spalla', 'core', 'Anti-estensione', 'Plank con tocco spalla', null, 'Plank sulle mani; tocca la spalla opposta senza far oscillare il bacino.'],
  ['stir-the-pot', 'core', 'Anti-estensione', 'Stir the pot su fitball', null, 'Plank con avambracci sulla fitball; disegna piccoli cerchi.'],

  // ---------- CORE: Anti-flessione laterale ----------
  ['side-plank', 'core', 'Anti-flessione laterale', 'Plank laterale', 'Side_Bridge', 'Su un avambraccio, corpo in linea; spingi il bacino in alto.'],
  ['side-plank-ginocchia', 'core', 'Anti-flessione laterale', 'Plank laterale sulle ginocchia', null, 'Versione facilitata con ginocchia flesse a terra.'],
  ['side-plank-abduzione', 'core', 'Anti-flessione laterale', 'Plank laterale con abduzione', null, 'In plank laterale solleva la gamba di sopra: aggiunge il gluteo medio.'],
  ['copenhagen', 'core', 'Anti-flessione laterale', 'Copenhagen plank', null, 'Plank laterale con la gamba di sopra appoggiata su una panca: lavora gli adduttori.'],
  ['suitcase-carry', 'core', 'Anti-flessione laterale', 'Suitcase carry (camminata con un peso)', null, 'Cammina con un solo peso da un lato restando perfettamente dritto.'],
  ['windmill', 'core', 'Anti-flessione laterale', 'Windmill con kettlebell', 'Kettlebell_Windmill', 'Peso sopra la testa, sguardo sul peso; scendi lateralmente verso il piede opposto.'],

  // ---------- CORE: Anti-rotazione ----------
  ['pallof', 'core', 'Anti-rotazione', 'Pallof press', 'Pallof_Press', 'Di fianco al cavo o all’elastico; spingi le mani avanti senza farti ruotare.'],
  ['pallof-mezzo-ginocchio', 'core', 'Anti-rotazione', 'Pallof press in mezzo ginocchio', null, 'Un ginocchio a terra: più stabilità richiesta al bacino.'],
  ['bird-dog', 'core', 'Anti-rotazione', 'Bird dog', null, 'In quadrupedia; estendi braccio e gamba opposti tenendo il bacino fermo e parallelo al suolo.'],
  ['renegade-row', 'core', 'Anti-rotazione', 'Renegade row', 'Alternating_Renegade_Row', 'Plank sulle mani con manubri; rematore alternato senza ruotare il bacino.'],
  ['plank-braccio-alzato', 'core', 'Anti-rotazione', 'Plank con braccio sollevato', null, 'In plank sulle mani, porta un braccio teso in avanti e tieni.'],
  ['chop-mezzo-ginocchio', 'core', 'Anti-rotazione', 'Chop in mezzo ginocchio', null, 'Cavo o elastico dall’alto; tira in diagonale verso l’anca opposta col busto fermo.'],
  ['bear-hold', 'core', 'Anti-rotazione', 'Bear hold con sollevamento', null, 'Quadrupedia con ginocchia a 2 cm da terra; solleva mano o piede senza muovere il busto.'],

  // ---------- CORE: Anti-flessione ----------
  ['superman', 'core', 'Anti-flessione', 'Superman', 'Superman', 'Prono; solleva braccia e gambe di pochi centimetri e tieni.'],
  ['back-extension-iso', 'core', 'Anti-flessione', 'Tenuta in iperestensione', 'Hyperextensions_Back_Extensions', 'Mantieni il busto allineato alle gambe sulla panca per iperestensioni.'],
  ['ponte-isometrico', 'core', 'Anti-flessione', 'Ponte glutei isometrico', 'Butt_Lift_Bridge', 'Bacino in alto e fermo, glutei contratti, respiro regolare.'],
  ['plank-inverso', 'core', 'Anti-flessione', 'Plank inverso', null, 'Seduto con mani dietro; solleva il bacino fino ad allineare il corpo.'],
  ['good-morning-elastico', 'core', 'Anti-flessione', 'Good morning con elastico', 'Band_Good_Morning', 'Flessione delle anche con schiena neutra contro la resistenza dell’elastico.'],

  // ---------- MOBILITÀ: Caviglia ----------
  ['circonduzioni-caviglia', 'mob', 'Caviglia', 'Circonduzioni della caviglia', 'Ankle_Circles', 'Disegna cerchi ampi con il piede in entrambi i sensi.'],
  ['knee-to-wall', 'mob', 'Caviglia', 'Ginocchio al muro (dorsiflessione)', null, 'Piede a qualche cm dal muro; porta il ginocchio a toccarlo senza staccare il tallone.'],
  ['stretch-polpaccio', 'mob', 'Caviglia', 'Allungamento del polpaccio al muro', 'Calf_Stretch_Hands_Against_Wall', 'Gamba dietro tesa e tallone a terra; spingi il bacino verso il muro.'],
  ['stretch-soleo', 'mob', 'Caviglia', 'Allungamento del soleo', 'Standing_Gastrocnemius_Calf_Stretch', 'Come il polpaccio ma con il ginocchio dietro piegato.'],
  ['stretch-peronei', 'mob', 'Caviglia', 'Allungamento dei peronei', 'Peroneals_Stretch', 'Seduto, porta la pianta del piede verso l’interno con la mano.'],
  ['tibiale-rullo', 'mob', 'Caviglia', 'Rullo sul tibiale anteriore', 'Anterior_Tibialis-SMR', 'In ginocchio sul foam roller, fai scorrere la parte anteriore della gamba.'],
  ['polpaccio-rullo', 'mob', 'Caviglia', 'Rullo sul polpaccio', 'Calves-SMR', 'Polpaccio sul foam roller; sollevati sulle mani e scorri lentamente.'],

  // ---------- MOBILITÀ: Ginocchio ----------
  ['stretch-quadricipite', 'mob', 'Ginocchio', 'Allungamento del quadricipite in piedi', 'Quad_Stretch', 'Afferra la caviglia e porta il tallone al gluteo, ginocchia vicine.'],
  ['quadricipite-fianco', 'mob', 'Ginocchio', 'Allungamento del quadricipite sul fianco', 'On_Your_Side_Quad_Stretch', 'Sdraiato sul fianco, tira il tallone verso il gluteo.'],
  ['stretch-femorali', 'mob', 'Ginocchio', 'Allungamento dei femorali', 'Hamstring_Stretch', 'Gamba tesa, porta il busto in avanti con la schiena lunga.'],
  ['femorali-supino', 'mob', 'Ginocchio', 'Allungamento femorali da supino', 'Leg-Up_Hamstring_Stretch', 'Supino, solleva una gamba tesa aiutandoti con un elastico o le mani.'],
  ['circonduzioni-ginocchia', 'mob', 'Ginocchio', 'Circonduzioni delle ginocchia', 'Knee_Circles', 'Ginocchia unite e mani sopra; piccoli cerchi lenti.'],
  ['quadricipite-rullo', 'mob', 'Ginocchio', 'Rullo sul quadricipite', 'Quadriceps-SMR', 'Prono sul foam roller; scorri dall’anca al ginocchio.'],
  ['bandelletta-rullo', 'mob', 'Ginocchio', 'Rullo sulla bandelletta ileotibiale', 'Iliotibial_Tract-SMR', 'Sul fianco sul foam roller; scorri lentamente lungo la coscia esterna.'],
  ['tke', 'mob', 'Ginocchio', 'Estensione terminale con elastico (TKE)', null, 'Elastico dietro il ginocchio; distendi completamente il ginocchio contro la resistenza.'],

  // ---------- MOBILITÀ: Anca ----------
  ['circonduzioni-anca', 'mob', 'Anca', 'Circonduzioni dell’anca', 'Standing_Hip_Circles', 'In piedi, mani sui fianchi; cerchi ampi col bacino.'],
  ['flessori-ginocchio', 'mob', 'Anca', 'Allungamento dei flessori dell’anca', 'Kneeling_Hip_Flexor', 'In affondo con ginocchio a terra; spingi il bacino avanti contraendo il gluteo.'],
  ['flessori-quad', 'mob', 'Anca', 'Flessori dell’anca e quadricipite', 'Intermediate_Hip_Flexor_and_Quad_Stretch', 'Come il precedente, afferrando il piede dietro.'],
  ['piriforme', 'mob', 'Anca', 'Allungamento del piriforme (figura 4)', 'Ankle_On_The_Knee', 'Caviglia sul ginocchio opposto; porta il busto avanti o la gamba verso il petto.'],
  ['novanta-novanta', 'mob', 'Anca', 'Mobilità 90/90', null, 'Seduto con entrambe le gambe a 90°; ruota le ginocchia da un lato all’altro.'],
  ['farfalla', 'mob', 'Anca', 'Farfalla (adduttori)', 'Adductor_Groin', 'Seduto, piante dei piedi unite; abbassa le ginocchia verso terra.'],
  ['adduttori-laterale', 'mob', 'Anca', 'Allungamento adduttori in affondo laterale', 'Side_Lying_Groin_Stretch', 'Una gamba tesa di lato; sposta il peso sull’altra.'],
  ['rana', 'mob', 'Anca', 'Posizione della rana', null, 'In quadrupedia, allarga le ginocchia e porta il bacino indietro.'],
  ['groiners', 'mob', 'Anca', 'Groiners', 'Groiners', 'Da plank porta un piede accanto alla mano e torna; alterna.'],
  ['worlds-greatest', 'mob', 'Anca', 'World’s greatest stretch', 'Worlds_Greatest_Stretch', 'Affondo profondo, gomito verso il piede, poi rotazione del busto col braccio verso l’alto.'],
  ['gluteo-supino', 'mob', 'Anca', 'Allungamento del gluteo da supino', 'IT_Band_and_Glute_Stretch', 'Supino, porta il ginocchio verso la spalla opposta.'],
  ['ginocchio-petto', 'mob', 'Anca', 'Ginocchia al petto', 'Hug_Knees_To_Chest', 'Supino, abbraccia le ginocchia e dondola dolcemente.'],

  // ---------- MOBILITÀ: Schiena ----------
  ['gatto-cammello', 'mob', 'Schiena', 'Gatto-cammello', 'Cat_Stretch', 'In quadrupedia; alterna schiena arrotondata e schiena incavata, lentamente.'],
  ['bambino', 'mob', 'Schiena', 'Posizione del bambino', 'Childs_Pose', 'In ginocchio, glutei sui talloni; allunga le braccia avanti e respira.'],
  ['open-book', 'mob', 'Schiena', 'Open book (rotazione toracica)', null, 'Sul fianco a ginocchia flesse; apri il braccio di sopra seguendolo con lo sguardo.'],
  ['rotazioni-quadrupedia', 'mob', 'Schiena', 'Rotazioni toraciche in quadrupedia', null, 'Mano dietro la testa; porta il gomito verso il soffitto e poi verso il braccio d’appoggio.'],
  ['torsione-supina', 'mob', 'Schiena', 'Torsione spinale da supino', 'Spinal_Stretch', 'Supino, porta le ginocchia da un lato tenendo le spalle a terra.'],
  ['schiena-seduto', 'mob', 'Schiena', 'Allungamento lombare da seduto', 'Chair_Lower_Back_Stretch', 'Seduto, scendi in avanti col busto tra le ginocchia.'],
  ['dorsale-alto', 'mob', 'Schiena', 'Allungamento della schiena alta', 'Middle_Back_Stretch', 'Abbraccia te stesso e arrotonda la parte alta della schiena.'],
  ['rotazione-busto', 'mob', 'Schiena', 'Rotazioni del busto in piedi', 'Torso_Rotation', 'Ruota il busto a destra e sinistra con bacino fermo.'],
  ['lombare-rullo', 'mob', 'Schiena', 'Rullo sulla schiena', 'Lower_Back-SMR', 'Foam roller sotto la schiena; scorri lentamente evitando di insistere sulla zona lombare bassa.'],

  // ---------- MOBILITÀ: Spalle ----------
  ['circonduzioni-spalle', 'mob', 'Spalle', 'Circonduzioni delle spalle', 'Shoulder_Circles', 'Cerchi ampi con le spalle, avanti e indietro.'],
  ['giro-del-mondo', 'mob', 'Spalle', 'Giro del mondo con bastone', 'Round_The_World_Shoulder_Stretch', 'Bastone a presa larga; portalo da davanti a dietro la testa a braccia tese.'],
  ['petto-spalla', 'mob', 'Spalle', 'Allungamento del petto e della spalla', 'Chest_And_Front_Of_Shoulder_Stretch', 'Mani intrecciate dietro la schiena; solleva le braccia aprendo il petto.'],
  ['petto-dinamico', 'mob', 'Spalle', 'Aperture dinamiche del petto', 'Dynamic_Chest_Stretch', 'Apri e chiudi le braccia davanti al petto in modo ritmico.'],
  ['tricipite-stretch', 'mob', 'Spalle', 'Allungamento del tricipite', 'Triceps_Stretch', 'Mano dietro la testa; con l’altra spingi il gomito verso il basso.'],
  ['dorsale-stretch', 'mob', 'Spalle', 'Allungamento del gran dorsale', 'Overhead_Lat', 'Braccio sopra la testa; inclinati lateralmente.'],
  ['wall-slide', 'mob', 'Spalle', 'Wall slide', null, 'Schiena e braccia contro il muro; fai scivolare le braccia in alto e in basso.'],
  ['sleeper', 'mob', 'Spalle', 'Sleeper stretch', null, 'Sul fianco, gomito a 90°; con l’altra mano porta l’avambraccio verso terra.'],
  ['rot-interna-elastico', 'mob', 'Spalle', 'Rotazione interna con elastico', 'Internal_Rotation_with_Band', 'Gomito al fianco; ruota l’avambraccio verso la pancia.'],
  ['dorsale-rullo', 'mob', 'Spalle', 'Rullo sul gran dorsale', 'Latissimus_Dorsi-SMR', 'Sul fianco col rullo sotto l’ascella; scorri lentamente.']
].map(r => ({ id: r[0], sez: r[1], cat: r[2], nome: r[3], foto: r[4], desc: r[5] }));
