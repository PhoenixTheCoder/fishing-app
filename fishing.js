
var Client = require("./modules/Client");
const cfg = require('./config.json');
var levelup = require("level");
var crypto = require("crypto");
var fs = require("fs");

var fish = ["Angelfish", "Arapaima", "Arowana", "Barbel Steed", "Barred Knifejaw", "Bitterling", "Black Bass", "Blowfish", "Blue Marlin", "Bluegill", "Brook Trout", "Butterflyfish", "Can", "Carp", "Catfish", "Char", "Cherry Salmon", "Clownfish", "Coelacanth", "Crawfish", "Crucian Carp", "Dab", "Dace", "Dorado", "Eel", "Football fish", "Freshwater Goby", "Frog", "Gar", "Giant Snakehead", "Giant Trevally", "Goldfish", "Guppy", "Hammerhead Shark", "Horse Mackerel", "Jellyfish", "Key", "Killifish", "King Salmon", "Koi", "Large Bass", "Loach", "Lobster", "Mitten Crab", "Moray Eel", "Napoleonfish", "Neon Tetra", "Nibble Fish", "Oarfish", "Ocean Sunfish", "Octopus", "Olive Flounder", "Pale Chub", "Pike", "Piranha", "Pond Smelt", "Popeyed Goldfish", "Puffer Fish", "Rainbow Trout", "Ray", "Red Snapper", "Ribbon Eel", "Saddled Bichir", "Salmon", "Saw Shark", "Sea Bass", "Sea Butterfly", "Seahorse", "Shark", "Small Bass", "Softshell Turtle", "Squid", "Stringfish", "Surgeonfish", "Sweetfish", "Tadpole", "Tuna", "Whale Shark", "Yellow Perch", "Zebra Turkeyfish"];
var fish_without_images =  ["Blowfish", "Brook Trout", "Butterflyfish", "Can", "Giant Trevally", "Key", "Large Bass", "Lobster", "Mitten Crab", "Moray Eel", "Napoleonfish", "Neon Tetra", "Nibble Fish", "Oarfish", "Pike", "Ray", "Ribbon Eel", "Saddled Bichir", "Saw Shark", "Small Bass", "Softshell Turtle", "Surgeonfish", "Tadpole", "Whale Shark"];
var newfish = ["Sea lamprey","River lamprey","Least brook lamprey","Western American river lamprey","European brook lamprey","Western brook lamprey","Turkish brook lamprey","Pacific brook lamprey","Silver lamprey","Ohio lamprey","Chestnut lamprey","Northern brook lamprey","Southern brook lamprey","Mountain brook lamprey","Ukrainian brook lamprey","Carpathian lamprey","Greek brook lamprey","Korean lamprey","Caspian lamprey","Arctic lamprey","Siberian lamprey","Western Transcaucasian lamprey","Far Eastern brook lamprey","Lombardy brook lamprey","Alaskan brook lamprey","American brook lamprey","Pacific lamprey","Northern California lamprey","Kern brook lamprey","Pit–Klamath brook lamprey","Vancouver lamprey","Miller Lake lamprey","Klamath lamprey","Jacona lamprey","Chapala lamprey","Lampreys nei","Chilean lamprey","Australian lamprey","Pouched lamprey","Brown hagfish","Hagfish","Inshore hagfish","Pacific hagfish","Broadgilled hagfish","Hagfishes nei","Horn shark","Crested bullhead shark","Japanese bullhead shark","Mexican hornshark","Port Jackson shark","Galapagos bullhead shark","Whitespotted bullhead shark","Zebra bullhead shark","Bullhead sharks","Frilled shark","African frilled shark","Bluntnose sixgill shark","Bigeyed sixgill shark","Sharpnose sevengill shark","Broadnose sevengill shark","Frilled and cow sharks","Basking shark","Sand tiger shark","Indian sand tiger","Smalltooth sand tiger","Bigeye sand tiger shark","Goblin shark","Crocodile shark","Megamouth shark","Thresher","Pelagic thresher","Bigeye thresher","Thresher sharks nei","Shortfin mako","Longfin mako","Mako sharks","Porbeagle","Salmon shark","Great white shark","Mackerel sharks,porbeagles nei","Mackerel sharks","Zebra shark","Tasselled wobbegong","Japanese wobbegong","Spotted wobbegong","Ornate wobbegong","Northern wobbegong","Cobbler wobbegong","Nurse shark","Short-tail nurse shark","Nurse sharks nei","Tawny nurse shark","Indonesia speckled carpetshark","Papuan epaulette shark","Epaulette shark","Hooded carpetshark","Speckled carpetshark","Arabian carpetshark","Bluespotted bambooshark","Grey bambooshark","Slender bambooshark","Whitespotted bambooshark","Brownbanded bambooshark","Burmese bambooshark","Hasselt's bambooshark","Bamboosharks nei","Whale shark","Blind shark","Bluegray carpetshark","Barbelthroat carpetshark","Taiwan saddled carpetshark","Saddle carpetshark","Collared carpetshark","Rusty carpetshark","Necklace carpetshark","Carpet sharks","Roughtail catshark","Australian sawtail catshark","Gecko catshark","Blackmouth catshark","Mouse catshark","Broadfin sawtail catshark","Peppered catshark","African sawtail catshark","Blacktip sawtail catshark","Dwarf sawtail catshark","Atlantic sawtail catshark","Crest-tail catsharks nei","Small-spotted catshark","Nursehound","Polkadot catshark","Boa catshark","Yellowspotted catshark","West African catshark","Brownspotted catshark","Freckled catshark","Whitesaddled catshark","Blotched catshark","Chain catshark","Cloudy catshark","Dwarf catshark","Catsharks, nursehounds nei","Narrowmouthed catshark","Redspotted catshark","Narrowtail catshark","Slender catshark","Australian spotted catshark","Gulf catshark","Australian marbled catshark","Coral catshark","Puffadder shyshark","Brown shyshark","Dark shyshark","African spotted catshark","Izak catshark","Campeche catshark","McMillan's cat shark","Blackgill catshark","Salamander shark","Filetail catshark","Atlantic ghost catshark","Brown catshark","Hoary catshark","Longfin catshark","Smallbelly catshark","Broadnose catshark","Japanese catshark","Longnose catshark","Iceland catshark","Longhead catshark","Flathead catshark","Madeira catshark","Ghost catshark","Smalleye catshark","Largenose catshark","Smallfin catshark","Spatulasnout catshark","Deep-water catshark","Broadgill catshark","Saldanha catshark","Pale catshark","South China catshark","Spongehead catshark","Panama ghost catshark","Borneo catshark","Deep-water catsharks","Kanakorum catshark","Australian blackspot catshark","Arabian catshark","Speckled catshark","Blackspotted catshark","Dusky catshark","New Zealand catshark","Bristly catshark","Spotless catshark","Lined catshark","Mud catshark","Tiger catshark","Quagga catshark","Onefin catshark","Reticulated swellshark","Draughtsboard shark","Australian swellshark","Whitefinned swellshark","Indian swellshark","Balloon shark","Blotchy swell shark","Swellshark","Lollipop catshark","Striped catshark","Barbeled catshark","Leopard catshark","Catsharks, etc. nei","Blue shark","Daggernose shark","Broadfin shark","Whitenose shark","Sandbar shark","Graceful shark","Blacktip shark","Blacktip reef shark","Grey reef shark","Pigeye shark","Borneo shark","Blacknose shark","Nervous shark","Oceanic whitetip shark","Smalltail shark","Whitecheek shark","Creek whaler","Dusky shark","Silky shark","Bull shark","Silvertip shark","Copper shark","Spinner shark","Blackspot shark","Night shark","Hardnose shark","Finetooth shark","Bignose shark","Galapagos shark","Pondicherry shark","Caribbean reef shark","Spot-tail shark","Australian blacktip shark","Blacktail reef shark","Carcharhinus sharks nei","Tiger shark","Spadenose shark","Whitetip reef shark","Lemon shark","Sicklefin lemon shark","Sliteye shark","Ganges shark","Speartooth shark","Atlantic sharpnose shark","Milk shark","Brazilian sharpnose shark","Pacific sharpnose shark","Grey sharpnose shark","Caribbean sharpnose shark","Australian sharpnose shark","Sharpnose sharks nei","Requiem sharks nei","Winghead shark","Smooth hammerhead","Scalloped bonnethead","Whitefin hammerhead","Scalloped hammerhead","Scoophead","Smalleye hammerhead","Bonnethead","Great hammerhead","Hammerhead sharks nei","Hammerhead sharks, etc. nei","Gummy shark","Grey smooth-hound","Dusky smooth-hound","Sharptooth smooth-hound","Striped smooth-hound","Spotless smooth-hound","Brown smooth-hound","Smalleye smooth-hound","Spotted estuary smooth-hound","Sicklefin smooth-hound","Starspotted smooth-hound","Narrownose smooth-hound","Smooth-hound","Narrowfin smooth-hound","Starry smooth-hound","Speckled smooth-hound","Arabian smooth-hound","Whitespotted smooth-hound","Blackspotted smooth-hound","Humpback smooth-hound","Smooth-hounds nei","Tope shark","Sharpfin houndshark","Leopard shark","Spotted houndshark","Sharptooth houndshark","Banded houndshark","Longnose houndshark","Bigeye houndshark","Sailback houndshark","Blacktipe tope","Whiskery shark","Japanese topeshark","Whitefin topeshark","Flapnose houndshark","Houndsharks, smoothhounds nei","False catshark","Hooktooth shark","Snaggletooth shark","Whitetip weasel shark","Atlantic weasel shark","Straight-tooth weasel shark","Slender weasel shark","Sicklefin weasel shark","Barbeled houndshark","Harlequin catshark","Cuban ribbontail catshark","Pygmy ribbontail catshark","African ribbontail catshark","Slender smooth-hound","Graceful catshark","Ground sharks","Greenland shark","Little sleeper shark","Pacific sleeper shark","Roughskin spurdog","Mandarin dogfish","Taillight shark","Longnose pygmy shark","Longnose spurdog","Cuban dogfish","Japanese spurdog","Picked dogfish","Shortspine spurdog","Cyrano spurdog","Blacktailed spurdog","Shortnose spurdog","Dogfishes nei","Gulper shark","Little gulper shark","Leafscale gulper shark","Lowfin gulper shark","Needle dogfish","Dumb gulper shark","Smallfin gulper shark","Taiwan gulper shark","Mosaic gulper shark","Blackfin gulper shark","Black gulper shark","Gulper sharks nei","Velvet belly","Blurred smooth lantern shark","Shorttail lanternshark","Lined lanternshark","Great lanternshark","Smooth lanternshark","Broadbanded lanternshark","Southern lanternshark(Lucifer)","Carribean lanternshark","Blackbelly lanternshark","Mollers lantern shark","African lanternshark","Fringfin lanternshark","Thorny lanternshark","Splendid lanternshark","Brown lanternshark","Hawaiian lanternshark","Green lanternshark","Combtoothed lanternshark","Lanternsharks nei","Cookie cutter shark","Largetooth cookiecutter shark","Pygmy shark","Birdbeak dogfish","Rough longnose dogfish","Arrowhead dogfish","Longsnout dogfish","Deania dogfishes nei","Whitetail dogfish","Sherwood dogfish","Portuguese dogfish","Longnose velvet dogfish","Shortnose velvet dogfish","Roughskin dogfish","Plunket shark","Smallmouth knifetooth dogfish","Knifetooth dogfish","Largespine velvet dogfish","Velvet dogfish","Kitefin shark","Black dogfish","Granular dogfish","Bareskin dogfish","Combtooth dogfish","Ornate dogfish","Whitefin dogfish","Centroscyllium dogfishes nei","Hooktooth dogfish","Smalleye pygmy shark","Spined pygmy shark","Dogfish sharks nei","Dogfishes and hounds nei","Longnose sawshark","Japanese sawshark","Shortnose sawshark","Bahamas sawshark","Sixgill sawshark","Sawsharks nei","Angelshark","Sawback angelshark","African angelshark","Argentine angelshark","Australian angelshark","Pacific angelshark","Sand devil","Taiwan angleshark","Japanese angelshark","Clouded angelshark","Smoothback angelshark","Ornate angelshark","Ocellated angelshark","Angular angel shark","Hidden angel shark","Angelsharks, sand devils nei","Angular roughshark","Sailfin roughshark","Prickly dogfish","Caribbean roughshark","Japanese roughshark","Bramble shark","Prickly shark","Dogfish sharks, etc. nei","Short-snouted shovelnose ray","Eastern shovelnose ray","Western shovelnose ray","Thornback guitarfish","Whitespotted wedgefish","Giant guitarfish","African wedgefish","Annandale's guitarfish","Bluntnose guitarfish","Lesser guitarfish","Blackchin guitarfish","Chola guitarfish","Pacific guitarfish","Halavi ray","Slender guitarfish","Whitespotted guitarfish","Whitesnout guitarfish","Grayspottted guitarfish","Speckled guitarfish","Shovelnose guitarfish","Common guitarfish","Brown guitarfish","Thouin ray","Giant shovelnose ray","Brazilian guitarfish","Granulated guitarfish","Atlantic guitarfish","Guitarfishes nei","Banded guitarfish","Bowmouth guitarfish","Southern fiddler","Magpie fiddler ray","Guitarfishes, etc. nei","Pointed sawfish","Dwarf sawfish","Largetooth sawfish","Smalltooth sawfish","Common sawfish","Longcomb sawfish","Sawfishes","Blue skate","Thornback ray","Starry ray","Spotted ray","Blonde ray","Sandy ray","Shagreen ray","Yellowspotted skate","Small-eyed ray","Cuckoo ray","Longnosed skate","Undulate ray","Roughbelly skate","Starry skate","Prow-nose skate","Spotted skate","Prickly brown ray","Roundel skate","Wedgenose skate","Velez ray","White skate","Longnose skate","Bigmouth skate","Rondelet's ray","Round ray","Antarctic starry skate","Ocellate skate","African ray","Mediterranean starry ray","Sydney skate","Broad skate","Deep-water ray","Bigelow's ray","Big skate","Bullis skate","Blackspot skate","Spotback skate","Munchskin skate","White-spotted skate","Finspot ray","Cortez' ray","Eyespot skate","Ghost skate","Violet skate","Clearnose skate","Ecuatorial ray","Little skate","Freckled skate","Greenback skate","Arctic skate","California ray","Shorttail skate","Barndoor skate","Rattail skate","Thornback skate","Leopard skate","Sailray","Madeiran ray","Maltese ray","Brown ray","Rough skate","Norwegian skate","Winter skate","Spreadfin skate","Argus skate","Speckled ray","Slime skate","Rough ray","Smoothback skate","Raja rays nei","Eaton's skate","McCain's skate","Murray's skate","Deep-sea skate","Aleutian skate","Sandpaper skate","Kerguelen sandpaper skate","Commander skate","Dark-belly skate","Pale ray","Alaska skate","Richardson's ray","Flathead skate","Longnose deep-sea skate","Spinetail ray","Spiny skate","Roughtail skate","Okhotsk skate","Broadnose skate","Patagonian skate","Cuphead skate","Bathyraja rays nei","Longtail skate","Cuban legskate","Smoothnose legskate","Roughnose legskate","Triangular legskate","Southern round skate","Soft skate","Smooth skate","Krefft's ray","African pygmy skate","Allens skate","Smooth deep-sea skate","Peacock skate","Prickly deep-sea skate","Dapple-bellied softnose skate","New Zealand smooth skate","Yellownose skate","New Zealand rough skate","Rio skate","Blotched sand skate","Shortfin sand skate","Psammobatis sand skates nei","Smallnose fanskate","Bignose fanskate","Blue ray","Bigthorn skate","Rays and skates nei","Whip stingray","Southern stingray","Plain maskray","Bennett's stingray","Short-tail stingray","Whiptail stingray","Roughtail stingray","Diamond stingray","Estuary stingray","Sharpsnout stingray","Longnose stingray","Blue-spotted stingray","Pelagic stingray","Mekong stingray","Painted maskray","Longtail stingray","Daisy stingray","Smalleye stingray","Common stingray","Atlantic stingray","Bluntnose stingray","Thorntail stingray","Tortonese's stingray","Pale-edged stingray","Stingrays nei","Cowtail stingray","Round stingray","Ribbontail stingray","Round ribbontail ray","Porcupine ray","Butterfly ray","Bleeker's whipray","Freshwater whipray","Dragon stingray","Pink whipray","Sharpnose stingray","Mangrove whipray","Scaly whipray","Jenkins whipray","Blackedge whipray","Marbled whipray","Pacific chupare","Chupare stingray","White-rimmed stingray","Black-spotted whipray","Honeycomb stingray","Leopard whipray","Dwarf whipray","Stingrays, butterfly rays nei","South American freshwater stin","Longheaded eagle ray","Spotted eagle ray","Common eagle ray","Australian bull ray","Bat eagle ray","Bullnose eagle ray","Southern eagle ray","Purple eagle ray","Snouted eagle ray","Eagle ray","Japanese eagle ray","Rough eagle ray","Bull ray","Rough cownose ray","Cownose ray","Ticon cownose ray","Flapnose ray","Oman cownose ray","Lusitanian cownose ray","Australian cownose ray","Pacific cownose ray","Mottled eagle ray","Banded eagle ray","Ornate eagle ray","Eagle rays nei","Giant manta","Manta rays","Longhorned mobula","Lesser devil ray","Spinetail mobula","Shortfin devil ray","Devil fish","Munk's devil ray","Lesser Guinean devil ray","Chilean devil ray","Smoothtail mobula","Mobula nei","Mantas, devil rays nei","Spiny butterfly ray","Australian butterfly ray","Longsnout butterfly ray","Japanese butterflyray","California butterfly ray","Smooth butterfly ray","Long-tailed butterfly ray","Tentacled butterfly ray","Zonetail butterfly ray","Butterfly rays nei","Sixgill stingray","Western shovelnose stingaree","Striped stingaree","Masked stingaree","Sandyback stingaree","Circular stingaree","Spot-on-spot round ray","Crossback stingaree","Wide stingaree","Patchwork stingaree","Spotted stingaree","Haller's round ray","Yellow stingray","Lobed stingaree","Spotted round ray","Mitotic stingaree","Coastal stingaree","Sparsely-spotted stingaree","Yellowback stingaree","Common stingaree","Greenback stingaree","Brown stingaree","Spiny-tail round ray","Chilean round ray","Munda round ray","Dwarf round ray","Reticulate round ray","Rogers' round ray","Fake round ray","Spotted legskate","Black legskate","Deep-water stingray","Rays, stingrays, mantas nei","Rosette torpedo","Pacific electric ray","New Zealand torpedo","Black-spotted torpedo","Ringed torpedo","Shorttail torpedo","Marbled electric ray","Electric ray","Panther electric ray","Peruvian torpedo","Variable torpedo ray","Trapezoid torpedo","Common torpedo","Chilean torpedo","Argentine torpedo","Torpedo rays","Australian numbfish","Electric rays nei","Blind torpedo","Ocellated electric ray","Natal electric ray","Brazilian electric ray","Brown numbfish","Giant electric ray","Slender electric ray","Tasmanian numbfish","Spotted numbfish","Vermiculate electric ray","Banded numbfish","Onefin electric ray","Numbray","Blind electric ray","Oval electric ray","Electric rays, etc.nei","Rabbit fish","Silver chimaera","Spotted ratfish","Smalleyed rabbitfish","African chimaera","Philippine chimaera","Blackfin ghostshark","Large-eyed rabbitfish","Dark ghost shark","Purple chimaera","Ratfishes nei","Straightnose rabbitfish","Pacific spookfish","Knife-nosed chimaeras nei","Smallspine spookfish","Pacific longnose chimaera","Longnose chimaeras","Sicklefin chimaera","Ghost shark","Plownose chimaera","Cape elephantfish","Elephantfishes, etc. nei","Chimaeras, etc. nei","Australian lungfish","South American lungfish","Coelacanth","Reedfish","Marbled lungfish","West African lungfish","African lungfishes","Sturgeon","Danube sturgeon(=Osetr)","Adriatic sturgeon","Sterlet sturgeon","Starry sturgeon","Fringebarbel sturgeon","Lake sturgeon","Atlantic sturgeon","White sturgeon","Shortnose sturgeon","Siberian sturgeon","Amur sturgeon","Yangtze sturgeon","Green sturgeon","Sakhalin sturgeon","Persian sturgeon","Chinese sturgeon","Japanese sturgeon","Shovelnose sturgeon","Pallid sturgeon","Alabama sturgeon","Beluga","Kaluga","Dwarf sturgeon","Amu Darya sturgeon","Syr Darya sturgeon","Sturgeons nei","Mississippi paddlefish","Chinese swordfish","Bowfin","Longnose gar","Florida gar","Shortnose gar","Spotted gar","Cuban gar","Alligator gar","Tropical gar","Gars nei","Atlantic herring","Pacific herring","Dogtooth herring","Bleeker smoothbelly sardinella","Smoothbelly sardinella","Spotted sardinella","Caspian shad","Pontic shad","American shad","Allis shad","Twaite shad","Alewife","Blueback shad","Hickory shad","Caspian marine shad","Alabama shad","Caspian anadromous shad","Black Sea shad","Saposhnikovi shad","Agrakhan shad","Shads nei","Allis and twaite shads","Deepbody sardinella","Yellowtail sardinella","Goldstripe sardinella","Indian oil sardine","Blacktip sardinella","Fringescale sardinella","Sind sardinella","Round sardinella","East African sardinella","Mauritian sardinella","Madeiran sardinella","White sardinella","Japanese sardinella","Bali sardinella","Brazilian sardinella","Fiji sardinella","Sardinellas nei","Japanese pilchard","California pilchard","South American pilchard","Southern African pilchard","Australian pilchard","Kura shad","Caspian shads","Lake Tanganyika sprat","American gizzard shad","Threadfin shad","Amazon spinejaw sprat","Losera fangtooth pellonuline","Smalltoothed pellonula","Bigtoothed pellonula","Chacunda gizzard shad","Brazilian menhaden","Argentine menhaden","Atlantic menhaden","Gulf menhaden","Yellowfin menhaden","Menhadens nei","Borneo River sprat","Ganges River sprat","Rainbow sardine","Slender rainbow sardine","Rainbow sardines nei","Bonga shad","Red-eye round herring","Whitehead's round herring","Ganges River gizzard shad","Burmese river gizzard shad","False herring","Redear herring","Pacific flatiron herring","Scaled herring","Scaled sardines","Kelee shad","Dwarf round herring","Florida round herring","Hilsa shad","Laotian shad","Reeves shad","Toli shad","Longtail shad","Bloch's gizzard shad","Western Pacific gizzard shad","Australian river gizzard shad","Japanese gizzard shad","Arabian gizzard shad","Pacific thread herring","Atlantic thread herring","Slender thread herring","Middling thread herring","Thread herrings nei","Silver-stripe round herring","Delicate round herring","Ansorge fangtooth pellonuline","Nigerian fangtooth pellonuline","Indian river shad","Chinese gizzard shad","Black and Caspian Sea sprat","Anchovy sprat","Southern Caspian sprat","Black-Caspian Sea sprats nei","Dotted gizzard shad","Atlantic piquitinga","Pacific piquitinga","European pilchard(=Sardine)","Gilchrist's round herring","European sprat","Falkland sprat","Pacific menhaden","Bluestripe herring","Blacksaddle herring","Goto's herring","Gulf herring","Spotback herring","White sardine","Lake Tanganyika sardine","Araucanian herring","River Plate sprat","Jenyns's sprat","Australian freshwater herring","Two-finned round herring","Day's round herring","Sanaga pygmy herring","Roundbelly pellonuline","West African pygmy herring","Royal sprat","Sharpnosed sawtooth pellonul.","Lake Mweru sprat","Lake Tumba dwarf sprat","Thai river sprat","Sumatran river sprat","Malabar sprat","Smoothbelly pellonuline","Madagascar round herring","Sandy sprat","Herrings, sardines nei","Dagaas","European anchovy","Japanese anchovy","Argentine anchovy","Californian anchovy","Anchoveta(=Peruvian anchovy)","Southern African anchovy","Anchovies nei","Rio Negro pygmy anchovy","Devis' anchovy","Shorthead anchovy","Buccaneer anchovy","Jurua anchovy","Littlefin anchovy","Atlantic anchoveta","Pacific anchoveta","Regan's anchovy","Short anchovy","Marini's anchovy","Bermuda anchovy","Longnose anchovy","Eigenmann's anchovy","Slender anchovy","Rio anchovy","Panama anchovy","Broad-striped anchovy","Longfinger anchovy","Deep body anchovy","Bigfin anchovy","Cuban anchovy","Bay anchovy","Big-eye anchovy","Shortfinger anchovy","Spicule anchovy","Piquitinga anchovy","Trinidad anchovy","Bigscale anchovy","Zabaleta anchovy","Cayenne anchovy","Allen's anchovy","Elongate anchovy","Snubnose anchovy","Broadband anchovy","Guyana anchovy","James's anchovy","Natterer's anchovy","Vaillant's anchovy","Anchoviellas nei","Goldspotted grenadier anchovy","Yangtse grenadier anchovy","Longjaw grenadier anchovy","Osbeck's grenadier anchovy","Japanese grenadier anchovy","Bates' sabretooth anchovy","Atlantic sabretooth anchovy","Sabretooth anchovys nei","Sabretoothed thryssa","Dusky-hairfin anchovy","Gangetic hairfin anchovy","Shorthead hairfin anchovy","Scaly hairfin anchovy","Common hairfin anchovy","Commerson's anchovy","Bagan anchovy","China anchovy","Indian anchovy","Hardenberg's anchovy","Spined anchovy","Spotty-face anchovy","Andhra anchovy","Broadhead anchovy","Gulf of Carpenteria anchovy","Stolephorus anchovies nei","Hamilton's thryssa","Orangemouth anchovy","Malabar thryssa","Moustached thryssa","Oblique-jaw thryssa","Baelama anchovy","Longjaw thryssa","Dussumier's thryssa","False baelama anchovy","Kammal thryssa","New Guinea thryssa","Whitehead's thryssa","Fly River thryssa","Short-tail thryssa","Wingfin anchovy","Anchovies, etc. nei","Dorab wolf-herring","Whitefin wolf-herring","Wolf-herrings nei","Bigeye ilisha","Indian ilisha","Elongate ilisha","Coromandel ilisha","Javan ilisha","Pacific ilisha","West African ilisha","Lobejaw ilisha","Yellowfin river pellona","Indian pellona","Yellowfin herring","Tropical longfin herring","Tardoore","Guiana longfin herring","Amazon hatchet herring","Raconda","Diadromous clupeoids nei","Clupeoids nei","Milkfish","Naked shellear","Airbreathing shellear","Hingemouth","Beaked salmon","Atlantic salmon","Sea trout","Sevan trout","Trouts nei","Long-finned charr","Golden trout","Pink(=Humpback) salmon","Chum(=Keta=Dog) salmon","Cutthroat trout","Masu(=Cherry) salmon","Sockeye(=Red) salmon","Chinook(=Spring=King) salmon","Coho(=Silver) salmon","Rainbow trout","Apache trout","Mexican golden trout","Gila trout","Pacific salmons nei","Brook trout","Arctic char","Dolly varden","Lake trout(=Char)","Bull trout","Neiva","Chars nei","Adriatic trout","Huchen","Japanese huchen","Taimen","Lenok","Salmonids nei","Grayling","Mongolian grayling","Arctic grayling","Ayu sweetfish","Whitebait smelt","Capelin","European smelt","Rainbow smelt","Pond smelt","Surf smelt","Japanese smelt","Eulachon","Longfin smelt","Smelts nei","Greater argentine","Argentine","Argentines","Deep-sea smelt","Smalltoothed argentine","Argentines nei","Northern smoothtounge","Silver deepsea smelt","Goiter blacksmelt","Eared blacksmelt","Slender blacksmelt","Blacksmelts","Deep-sea smelts nei","Slender argentine","Chinese icefish","Clearhead icefish","Chinese noodlefish","Japanese icefish","Icefishes nei","Australian grayling","Stokell's smelt","Cucumberfish","Vendace","European whitefish","Houting","Irish pollan","Lake(=Common) whitefish","Lake cisco","Arctic cisco","Khadary-whitefish","Bloater","Kiyi","Muksun","Broad whitefish","Peled","Shortnose cisco","Sardine cisco","Tugun","Valaam whitefish","Whitefishes nei","Sheefish","Pygmy whitefish","Round whitefish","Mountain whitefish","Javelin spookfish","Barreleye","Mirrorbelly","Barrel-eye","Fangtooth smooth-head","Smallscale smooth-head","Michael Sars smooth-head","Koefoed's smooth-head","Baird's slickhead","Risso's smooth-head","Small scaled brown slickhead","Slickheads nei","Fiolenti's smooth-head","Longfin smooth-head","Toothless smooth-head","Loosescale smooth-head","Krefft's smooth-head","Grenadier smooth-head","Norman's smooth-head","Blackhead salmon","Starry smooth-head","Abyssal smooth-head","Softskin smooth-head","Madeiran smooth-head","Bluntsnout smooth-head","Threadfin slickhead","Antillean smooth-head","Hairfin smooth-head","Longtail slickhead","Threadfin smooth-head","Luminous slickhead","Palebelly searsid","Bighead searsid","Teardrop tubeshoulder","Bigeye searsid","Maul's searsid","Smallscale searsid","Multipore searsid","Leaf searsid","Legless searsid","Shining tubeshoulder","Schnakenbeck's searsid","Koefoed's searsid","Dwarf pencilfish","Koaro","Tasmanian mudfish","Banded kokopu","Inanga","Shortjaw kokopu","Common river galaxias","Cape galaxias","Tasmanian whitebait","Canterbury mudfish","Black mudfish","Salmonoids nei","Alaska blackfish","Olympic mudminnow","Mudminnow","Northern pike","Redfin pickerel","Amur pike","Spark anglemouth","Elongated bristlemouth fish","Atlantic fangjaw","Benttooth bristlemouth","Garrick","Veiled anglemouth","Tan bristlemouth","Slender bristlemouth","Hidden bristlemouth","Bristlemouths","Pacific hatchet fish","Hatchetfish","Half-naked hatchetfish","Sladen's hatchet fish","Bottlelights","Spiny hatchetfish","Diaphanous hatchet fish","Highlight hatchetfish","Silvery lightfish","Atlantic pearlside","Hatchetfishes nei","Richardson's snaggletooth","Snaggletooth","Boa dragonfish","Günther's boafish","Longbarb scaly dragonfish","Pawnee dragonfish","Dana viperfish","Sloane's viperfish","Proud dragonfish","Barbate dragonfish","Stoplight loosejaw","Valdivia black dragon fish","Scaleless black dragonfish","Longfin dragonfish","Oceanic lightfish","Power's deep-water bristle-mou","Arapaima","Arawana","Australian bonytongue","Asian bonytongue","African bonytongue","Clown knifefish","Giant featherback","Indochina featherback","Bronze featherback","Knifefishes","Reticulate knifefish","African knifefish","Mooneye","Freshwater butterflyfish","Elephantnose fish","Zambesi parrotfish","Bulldog","Bottlenose fishes nei","Ghost stonebasher","Churchill","Elephantsnout fishes nei","Aba","Hawaiian ladyfish","Ladyfish","Pacific ladyfish","West African ladyfish","Senegalese ladyfish","Tenpounder","Ladyfishes nei","Tarpon","Indo-Pacific tarpon","Bonefish","Roundjaw bonefish","Longfin bonefish","Bonefishes nei","Gigantura","Japanese thread-sail fish","Royal flagfin","Guinean flagfin","Zugmayer's pearleye","Pearleyes nei","Pearleyes, etc. nei","Balbo sabretooth","Omosudid","Long snouted lancetfish","Short snouted lancetfish","Lancetfishes nei","Daggertooth","Southern ocean daggertooth","Atlantic barracudina","Duckbill barracudina","Southern barracudina","Antarctic jonasfish","Spotted barracudina","Ringed barracudina","Barracudinas nei","Shortnose greeneye","Greeneyes","Waryfish","Blackfin waryfish","Grideye fish","Spiderfish","Abyssal spiderfish","Mediterranean spiderfish","Tripodfish","Bombay-duck","Deep-sea lizardfish","Highfin lizardfish","Snakefish","Inotted lizardfish","California lizardfish","Atlantic lizardfish","Variegated lizardfish","Redbarred lizardfish","Sand lizardfish","Triplecross lizardfish","Greater lizardfish","Brazilian lizardfish","Brushtooth lizardfish","Gracile lizardfish","Longfin lizardfish","Clouded lizardfish","Lizardfishes nei","Large-scaled lantern fish","Pacific blackchin","Spurcheek lanternfish","Stubby lanternfish","Roundnose lanternfish","Madeira lantern fish","Warming’s lanternfish","Cocco’s lanternfish","Benoit's lanternfish","Bermuda lantern fish","Reinhardt’s lanternfish","Tåning’s lanternfish","Spotted lanternfish","Wisner's lantern fish","Metallic lanternfish","Prickly lanternfish","Bluntsnout lanternfish","Hector's lanternfish","Jewel lanternfish","Lantern fish","Noble lanternfish","Slender lanternfish","Short-headed lantern fish","Small lantern fish","Spothead lantern fish","Taaning's lantern fish","Garman’s lanternfish","Flatface lanternfish","Horned lanternfish","Slopewater lanternfish","Anomalous lanternfish","Luminous lanternfish","Günther’s lanternfish","Dofleini's lantern fish","Gemellar’s lanternfish","Northern lampfish","Glacier lantern fish","Smallfin lanternfish","Skinnycheek lanternfish","Electric lantern fish","Electron subantarctic","Spinetail lanternfish","Patchwork lanternfish","Patchwork lampfishes","Nichol's lanternfish","Large-scale lantern fish","Waistcoat lanternfish","Blue lanternfish","Mexican lampfish","Lanternfishes nei","Pelican eel","Paddletail onejaw","Bobtail eel","Calypso tetra","Black neon tetra","Banded astyanax","Astyanax nei","Machaca","Mourning tetra","Dorada","Tiete tetra","Cochu's blue tetra","Featherfin tetra","Buenos Aires tetra","Dorado","Red piranha","San Francisco piranha","White piranha","Slender piranha","Redeye piranha","Speckled piranha","Blackedge tetra","Flametail tetra","Cachama","Lobetoothed piranha","Orangefin tetra","Wimple piranha","Darter characin","Bucktooth tetra","Goldstripe characin","Swordtail characin","Black tetra","Pirapatinga","Pacu","Patinga, hybrid","Silver tetra","Sailfin tetra","Naked characin","Copper tetra","Royal tetra","Croaking tetra","Rainbow tetra","Cardinal tetra","Neon tetra","False rummynose tetra","Black morpho tetra","Glass bloodfin","X-ray tetra","Dragonfin tetra","Blind tetra","Blackline penguinfish","Characins nei","Tambacu, hybrid","Tambatinga, hybrid","Blackwing hatchetfish","Giant hatchetfish","Silver hatchetfish","Banded leporinus","Threespot leporinus","Threespot headstander","Striped headstander","Pongo characin","Citharinus nei","Trahira","Giant trahira","Aimara","Kafue pike","Redspotted tetra","Splash tetra","Golden pencilfish","Streaked prochilod","Netted prochilod","Black prochilodus","Prochilods nei","Silver prochilodus","Stripped robber","Niger tetra","Longfin tetra","Nurse tetra","Barnard's robber","Elongate tigerfish","Tiger fish","Sierra leone dwarf characin","Jellybean tetra","Sharptooth tetra","Payara","Biara","Pike characin","Oneline tetra","Spotted citharinid","Silver distichodus","Sixbar distichodus","Grass-eaters nei","Banded knifefish","Electric eel","Black ghost","Glass knifefish","Longtail knifefish","Blue sucker","Lost River sucker","Longnose sucker","White sucker","Flannelmouth sucker","Largescale sucker","Tahoe sucker","Gray redhorse","Golden redhorse","Shorthead redhorse","Harelip sucker","Bigmouth buffalo","Buffalofishes nei","Chinese sucker","River carpsucker","Razorback sucker","Cui-ui","Spotted sucker","Lake chubsucker","Northern hog sucker","Suckers nei","Freshwater bream","Freshwater breams nei","Common carp","Barbless carp","Chinese false gudgeon","Blackbrow bleak","Tench","Bleak","Barbel","Mediterranean barbel","Smallmouth yellowfish","Clanwilliam yellowfish","Spotscale barb","Broadband barb","Ripon barbel","Algerian barb","Line-spotted barb","Slender barb","Straightfin barb","Papermouth","Largescale yellowfish","Threespot barb","Common nase","Iberian nase","Longfin dace","Crucian carp","Goldfish","Japanese white crucian carp","Prussian carp","White-finned gudgeon","Roach","Kutum","Caspian roach","Roaches nei","Rudd","Orfe(=Ide)","Common dace","Dnieper chub","Chub","Vairone","Schmidt's dace","Issyk-Kul dace","Chubs nei","Rosy bitterling","Bitterling","Big-scaled redfin","Orangefin labeo","Fringed-lipped peninsula carp","Kuria labeo","Roho labeo","Rednose labeo","Redeye labeo","Ningu","Orange River mudfish","Moggel","Black sharkminnow","Rhinofishes nei","Mud carp","Mrigal carp","Reba carp","Small scale mud carp","Pátzcuaro chub","Catla","Giant barb","Indian glass barb","Grass carp(=White amur)","Beardless barb","Giant danio","Sind danio","Zebra danio","Leopard danio","Schneider","Chihuahua chub","Utah chub","Tui chub","Humpback chub","Bonytail","Roundtail chub","Hampala barb","Silver carp","Bighead carp","Silver, bighead carps nei","Signal barb","Kanglang fish","Golden shiner","Nilem carp","Splittail","Isok barb","Sacramento squawfish","Slender rasbora","Harlequin rasbora","Gangetic scissortail rasbora","Silver rasbora","Brilliant rasbora","Twospot rasbora","Thai mahseer","Putitor mahseer","Tor barb","Semah mahseer","Seven khramulya","Trout barb","Emerald shiner","Red River shiner","Bigeye shiner","Bigmouth shiner","Arkansas River shiner","Blackchin shiner","Blacknose shiner","Spottail shiner","Longnose shiner","Yellowfin shiner","Ozark minnow","Rosyface shiner","Bedrock shiner","Flagfin shiner","Sand shiner","Weed shiner","Mimic shiner","Barbel steed","Spotted steed","Mola carplet","Attentive carplet","Silver cyprinid","Kinneret bleak","Fathead minnow","Copper mahseer","California roach","White amur bream","Freshwater minnow","Blacknose dace","Longnose dace","Speckled dace","Hornyhead chub","Bluehead chub","River chub","Satinfin shiner","Alabama shiner","Bluntface shiner","Red shiner","Proserpine shiner","Spotfin shiner","Blacktail shiner","Oily bitterling","Chinese bleak","Plains minnow","Devils River minnow","Roundnose minnow","Pike asp","Vimba bream","Macedonian vimba","Lake chub","Creek chub","Sichel","Rainbow gudgeon","Iraq blind barb","White cloud mountain minnow","Central stoneroller","Largescale stoneroller","Dalmatian barbelgudgeon","Sacramento blackfish","Hitch","Woundfin","Least chub","Riffle minnow","Asp","Redside dace","Tricolor sharkminnow","Danube bleak","Tarek","Russian bitterling","Stone moroko","Hoven's carp","Chiselmouth","Sharpbelly","Somalian blind barb","Tokyo bitterling","Redfin","Congo blind barb","Black carp","Striped shiner","Common shiner","Oregon chub","Wuchang bream","Black Amur bream","Peamouth","Little Colorado spinedace","Scaly osman","Loach minnow","Spotted barb","Arulius barb","Rosy barb","Blackspot barb","Pool barb","Sumatra barb","Ticto barb","Spanner barb","Asian barbs nei","Sharpray","Humpback","Predatory carp","Mongolian redfin","Yellowcheek","Redtail sharkminnor","Flying fox","Desert dace","Streamline chub","Flying barb","Lake minnow","Cutlips minnow","Garnet minnow","Flame chub","Siamese mud carp","Jerdon's carp","Iran cave barb","Tachanovsky's gudgeon","Czekanowski's minnow","Belica","Cherryfin shiner","Ouachita shiner","Speckled chub","Long pectoral-fin minnow","Pearl dace","Spikedace","River sardine","Moapa dace","Hardhead","Taiwan ku fish","Lake salmon","Pugnose minnow","Blackside dace","Northern redbelly dace","Southern redbelly dace","Finescale dace","Eurasian minnow","Somalian cavefish","Smallscale yellowfin","Flathead chub","Rock carp","Smallscale redfin","Relict dace","Redside shiner","Amur whitefin gudgeon","Large razorbelly minnow","Chinese lizard gudgeon","Sattar snowtrout","Snowtrout","Golden-line barbel","Stumptooth minnow","Yellowfin","White bream","Silver barb","Red tailed tinfoil","Tinfoil barb","Andalusian barbel","Naked osman","Big-head schizothoracin","Cyprinids nei","Siamese algae-eater","Horseface loach","Tiger loach","Bengal loach","Golden spined loach","Guntea loach","Pond loach","Weatherfish","Choi's spiny loach","Clown loach","Mottled loach","Stone loach","Tollo","Mayan sea catfish","New Granada sea catfish","Beardless sea catfish","Congo sea catfish","Madamango sea catfish","Blacktip sea catfish","Blackfin sea catfish","Threadfin sea catfish","Sona sea catfish","Giant catfish","Bronze catfish","Salmon catfish","Giant seacatfish","Giant sea catfish","Flatmouth sea catfish","Smoothmouth sea catfish","Rough-head sea catfish","Veined catfish","Spotted catfish","Engraved catfish","Sagor catfish","Hardhead sea catfish","Kukwari sea catfish","Crucifix sea catfish","Guinean sea catfish","Madagascar sea catfish","Smallmouthed salmon catfish","Daniel's catfish","Spoon-snouted catfish","Guri sea catfish","Day's catfish","Chili sea catfish","Lorentz catfish","Gafftopsail sea catfish","Chilhuil sea catfish","Red sea catfish","Coco sea catfish","Peruvian sea catfish","White barbel","White sea catfish","Soldier catfish","Thomas sea catfish","Softhead sea catfish","Bressou sea catfish","Gillbacker sea catfish","Brown sea catfish","Pemecou sea catfish","Passany sea catfish","Couma sea catfish","Thinspine sea catfish","Sea catfishes nei","Talking catfish","Whitebarred catfish","Blue-eye catfish","Ripsaw catfish","Raphael catfish","Granulated catfish","Singing catfish","Black catfish","Jaguar catfish","Manduba","Bottlenose catfish","Cobbler","Long-tailed catfish","Silver tandan","Narrowfront tandan","Shortfin tandan","Pale yellow tandan","Merauke tandan","Gray eel-catfish","Striped eel catfish","Papuan eel-catfish","Stinging eel catfish","Darkfin eel catfish","Eeltail catfishes","Whitelipped eel catfish","Tandan catfish","Freshwater cobbler","Wels(=Som) catfish","Amur catfish","Eurasian catfish","Chinese large-mouth catfish","Glass catfish","Striped glass catfish","Glass catfishes","Butter catfish","Wallago","Hilda's grunter","Bubu","Blacklancer catfish","False black lancer","Asian redtail catfish","Dotted catfish","Flatnose catfish","African bullhead","Asian bumblebee catfish","Chinese longsnout catfish","Gangetic mystus","Long whiskers catfish","Striped dwarf catfish","Twospot catfish","Bagrid catfish","Kibonde","Kokuni","Kukumai","Aluminum catfish","Ornate bagrid","Black catfishes nei","Rita","Bayad","Semutundu","Naked catfishes","Spatula-barbeled catfish","Yellow catfish","Channel catfish","Blue catfish","Headwater catfish","Yaqui catfish","Catfishes nei","Channel-blue catfish, hybrid","White catfish","Snail bullhead","Flat bullhead","Spotted bullhead","Black bullhead","Yellow bullhead","Brown bullhead","Mexican blindcat","Widemouth blindcat","Flathead catfish","Slender madtom","Stonecat","Tadpole madtom","Margined madtom","Brown madtom","Neosho madtom","Northern madtom","Toothless blindcat","Goonch","Mountain barbel","Squarehead catfish","Angler catfish","Glass schilbid","Silond catfish","Indian potasi","African butter catfish","Shoulderspot catfish","Eel catfish","Indian blind catfish","Philippine catfish","Hong Kong catfish","North African catfish","Bighead catfish","Mudfish","Blunt-toothed African catfish","Snake catfish","Torpedo-shaped catfishes nei","Africa-bighead catfish, hybrid","African catfish","Sampa","Longtail catfish","Electric catfish","Smallmouth electric catfish","Kumakuma","Gilded catfish","Zebra catfish","Laulao catfish","Zamurito","Slobbering catfish","Porthole shovelnose catfish","Tigerstriped catfish","South American catfish","Mandi","Capaz","Duckbill catfish","Leopard catfish","Redtail catfish","Flatwhiskered catfish","Graceful pimelodella","Coroatá","Jaú","Spotted sorubim","Barred sorubim","Tiger sorubim","Sorubims nei","Pati","Highwaterman catfish","Firewood catfish","Candiru","Porthole catfish","Cascarudo","Bronze corydoras","Peppered corydoras","Atipa","Whiptail catfish","Zucchini catfish","Golden otocinclus","Snow pleco","Amazon sailfin catfish","Suckermouth catfish","Wara wara","Armored catfish","Royal panaque","Mekong giant catfish","Pangas catfish","Striped catfish","Spot pangasius","Shortbarbel pangasius","Giant pangasius","Pangas catfishes nei","Stinging catfish","Bigeye squeaker","Angel squeaker","Bugeye squeaker","Clown squeaker","Featherfin squeaker","Orangestriped squeaker","Blotched upsidedown catfish","Blackspotted squeaker","Malawi squeaker","Onespot squeaker","Congo squeaker","Wahrindi","Plain squeaker","Upsidedown catfishes","Gnarled catfish","Bark catfish","Sevenbarbed banjo","Banjo","Banded banjo","Camouflaged catfish","Guitarrita","Ecuador banjo catfish","Freshwater siluroids nei","Narrownecked oceanic eel","Duckbill oceanic eel","European eel","Indian mottled eel","Japanese eel","American eel","Short-finned eel","Speckled longfin eel","African longfin eel","Giant mottled eel","New Zealand longfin eel","Mottled eel","River eels nei","Red eel","Allardice's moray","Turkey moray","Spotjaw moray","Banded moray","Speckled moray","Green moray","California moray","Spotted moray","Ocellated moray","Yellow-edged moray","Undulated moray","Purplemouth moray","Highfin moray","Sharktooth moray","Polygon moray","Brown moray","Dark moray","Canary moray","Kidako moray","Ghost moray","Starry moray","Laced moray","Broadbanded moray","Mediterranean moray","Reticulate moray","Stout moray","White-spotted moray","Jewel moray","Honeycomb moray","Hourglass moray","Bayer's moray","Leopard moray eel","Fangtooth moray","Viper moray","Zebra moray","Chain moray","Snowflake moray","Barred moray","Pebbletooth moray","White ribbon eel","Ribbon moray","Greyface moray","Peppered moray","Slender giant moray","Giant slender moray","Needle-tooth moray","Jigsaw moray","Morays nei","Slender shortfaced eel","Mauritanian shortfaced eel","Longtailed shortfaced eel","Shorttailed shortfaced eel","Spaghetti eel","Spaghetti eels nei","Shorttail pike conger","Daggertooth pike conger","Common pike conger","Pike-congers nei","Guinean pike conger","Red pike conger","Yellow pike conger","Indian pike conger","Dogface witch-eel","Facciola's sorcerer","Blacktail pike-conger","Slender duckbill eel","Whipsnout sorcerer","European conger","Argentine conger","Longfin African conger","American conger","Whitespotted conger","Manytooth conger","Conger eels nei","Longnose conger","Maputo conger","Evermann's conger","Whitespotted garden eel","Purplemouthed conger","Silvery conger","Bandtooth conger","Short-tail conger","Slender conger","Slender-tail conger","Spotted garden-eel","Margintail conger","Guinean conger","Conger eels, etc. nei","Spotted snake eel","Ornate Snake Eel","Rufus snake-eel","Punctuated snake-eel","Shrimp eel","Bluntnose snake-eel","Yellow snake-eel","Serpent eel","Short-tailed viper-eel","Johnston snake-eel","Short-maned sand-eel","Sailfin eel","Rice-paddy eel","Longfin snake-eel","Hoeven's snake eel","Spoon-nose eel","African spoon-nose eel","Speckled worm-eel","Leaden worm eel","Indo-Pacific slender worm-eel","Maimed snake eel","Acned snake-eel","Slender worm-eel","Saddled snake-eel","Oriental worm-eel","Sharpnose sand-eel","Mustachioed snake-eel","Finny snake eel","Horsehair eel","Ordinary eel","Stippled spoon-nose eel","Painted eel","Slantlip eel","Leopard eel","Shorttail snake eel","Crocodile snake eel","Stripe eel","Fangtooth snake-eel","Key worm eel","Freshwater snake-eel","Sooty sand-eel","Inhaca fringelip","Flappy snake-eel","Snake eels nei","Shortbelly eel","Batnose eel","Deep-water arrowtooth eel","Muddy arrowtooth eel","Snubnosed eel","Kaup's arrowtooth eel","Grey cutthroat eel","Basketwork eel","Cutthroat eels nei","Avocet snipe eel","Slender snipe eel","Flatnose xenocongrid eel","Mottled false moray","False moray","Bean's sawtooth eel","Sawtooth eels nei","Black serrivomerid eel","Eels, morays, congers nei","Hawaiian halosaurid fish","Abyssal halosaur","Australian halosaur","Halosaurs nei","Spiny eel","Spiny-back eel","Deep-sea spiny eels nei","Garfish","Cape needlefish","Keeltail needlefish","Flat needlefish","Senegal needlefish","Spottail needlefish","Californian needlefish","Timucu","Atlantic needlefish","Banded needlefish","Agujon needlefish","Hound needlefish","Red Sea houndfish","Needlefishes nei","Freshwater garfish","Needlefishes, etc. nei","Atlantic saury","Dwarf saury","Pacific saury","Sauries nei","Hardhead halfbeak","Tropical halfbeak","Choelo halfbeak","Slender halfbeak","Skipper halfbeak","Common halfbeak","African halfbeak","Japanese halfbeak","California halfbeak","Asian pencil halfbeak","Congaturi halfbeak","Quoy's garfish","Sind halfbeak","Simpletooth halfbeak","Black-barred halfbeak","Ballyhoo halfbeak","Yellowtip halfbeak","Balao halfbeak","Jumping halfbeak","Halfbeaks nei","Ribbon halfbeak","Flying halfbeak","Long billed halfbeak","Tropical two-wing flyingfish","Japanese flyingfish","Short-nosed flyingfish","Yellowing flyingfish","Sharpchin flyingfish","Shortfin flyingfish","Bluntnose flyingfish","Sailfin flyingfish","African sailfin flyingfish","Halfbeak","Atlantic smallwing flyingfish","Fourwing flyingfish","Black wing flyingfish","Bony flyingfish","Spotfin flyingfish","Blacksail flyingfish","Manyspotted flyingfish","Sutton's flyingfish","Margined flyingfish","Atlantic flyingfish","Guinean flyingfish","Bennett’s flyingfish","Flyingfishes nei","Duckbilled buntingi","Malabar ricefish","Javanese ricefish","Eggcarrying buntingi","Smalleye moray cod","Marbled moray cod","Smallhead moray cod","Patagonian moray cod","Moray cods nei","Ahuru","Dwarf codling","Tasmanian codling","Beardless codling","Gadella","Slender codling","Longfin codling","Guinean codling","Codling","Beardie","Bighead mora","Tadpole cod","Common mora","Black codling","Japanese codling","Metallic codling","Brown codling","Red codling","Southern bastard codling","Northern bastard codling","Grenadier cod","Mediterranean codling","North Atlantic codling","Patagonian codling","Small-headed cod","Lepidion codlings nei","Blue antimora","Tadpole codling","Moras nei","Unicorn cod","Antenna codlet","Smallscale codlet","Big-eye unicorn-cod","Tusk(=Cusk)","Atlantic cod","Pacific cod","Greenland cod","Northern cods nei","Burbot","Ling","Blue ling","Spanish ling","Lings nei","Greater forkbeard","Forkbeard","Longfin hake","Forkbeards nei","Brazilian codling","Red hake","White hake","Carolina hake","Southern codling","Spotted codling","Gulf hake","Urophycis nei","Haddock","Tadpole fish","Navaga(=Wachna cod)","Saffron cod","Pacific tomcod","Atlantic tomcod","Saithe(=Pollock)","Pollack","Alaska pollock(=Walleye poll.)","Norwegian pollock","Polar cod","Artic cod","East Siberian cod","Silvery pout","Threadfin rockling","Arctic rockling","Mediterranean bigeye rockling","Bigeye rockling","Shore rockling","Three-bearded rockling","Rocklings nei","Fivebeard rockling","Northern rockling","Norway pout","Poor cod","Pouting(=Bib)","Trisopterus nei","Blue whiting(=Poutassou)","Southern blue whiting","Whiting","Fourbeard rockling","European hake","Senegalese hake","Southern hake","Silver hake","South Pacific hake","Argentine hake","North Pacific hake","Benguela hake","Deep-water Cape hake","Offshore silver hake","Panama hake","Shallow-water Cape hake","Patagonian hake","Hakes nei","Cape hakes","Luminous hake","Patagonian grenadier","Blue grenadier","Cape grenadier","Merluccid hakes nei","Roughhead grenadier","Whitson's grenadier","Ridge scaled rattail","Bigeye grenadier","Caml grenadier","Grenadiers nei","Glasshead grenadier","Roundnose grenadier","Günther's grenadier","Pacific grenadier","Loosescale grenadier","Humboldt grenadier","Abyssal grenadier","Carmine grenadier","Popeye grenadier","Trident grenadier","Longfin grenadier","Amami grenadier","Mexican grenadier","Abyssal rattail","Largenose grenadier","Serrulate whiptail","Longrayed whiptail","Thickbeard grenadier","Grenadiers, whiptails nei","Surgeon grenadier","Aconcagua grenadier","Duckbill grenadier","Silver whiptail","Eyespot grenadier","Rough-head whiptail","Javelin","Two-barred whiptail","Shovelnose grenadier","Clearsnout grenadier","Blackfin grenadier","Chilean grenadier","Hollowsnout grenadier","Filesnout grenadier","Banded whiptail","Formosa grenadier","Six-band grenadier","Notable whiptail","Japanese grenadier","Campbell whiptail","Kamohara grenadier","Karrer's whiptail","Kermadec rattail","Mugura grenadier","Spearsnouted grenadier","Longhead grenadier","Longarm grenadier","Marini's grenadier","Mahia whiptail","Spearnose grenadier","Swordsnout grenadier","Hawknose grenadier","Spiny grenadier","Unicorn grenadier","Shoulderspot grenadier","Firebelly grenadier","Giant grenadier","Fragile grenadier","Armourhead grenadier","Roughsnout grenadier","Bullseye grenadier","Vaillant's grenadier","Globosehead rattail","Dogtooth grenadier","Roundhead grenadier","Bristly grenadier","Marlin-spike grenadier","Common Atlantic grenadier","Peruvian grenadier","Twelve-rayed grenadier","Broadsnout grenadier","Smooth grenadier","Parrot grenadier","Smalltooth grenadier","Spectacled grenadier","Short-tail grenadier","Roughtip grenadier","California grenadier","Softhead grenadier","Western softhead grenadier","Doublethread grenadier","Naked snout rattail","Pineapple rattail","Bulbous rattail","Thorntooth grenadier","Sturgeon grenadier","Slendertail grenadier","Bathypelagic rattail","Arrowtooth grenadier","Hawaiian grenadier","Plainfin grenadier","Sagami grenadier","Longbeard grenadier","Spinaker grenadier","Peterson's grenadier","Conesnout grenadier","Grenadiers, rattails nei","Pelagic cod","Arrowtail","Eucla cod","Gadiformes nei","Three-spined stickleback","Blackspotted stickleback","Sticklebacks","Brook stickleback","Ninespine stickleback","Southern ninespine stickleback","Sea stickleback","Fourspine stickleback","Tube-snout","Pipe fish","Short dragonfish","Longtail seamouth","Korean sandlance","Pacific cornetfish","Cornetfish","Bluespotted cornetfish","Red cornetfish","Flutemouth","Longspine snipefish","Slender snipefish","Orange bellowfish","Longspine bellowfish","Crested bellowfish","Snipefishes nei","Smooth razorfish","Grooved razor-fish","Speckled shrimpfish","Banded yellowfish","Ghost pipefish","Harlequin ghost pipefish","Fringed pipefish","Greater pipefish","Broadnosed pipefish","Nilsson's pipefish","Pipefishes nei","Sea pony","Short snouted seahorse","Long-snouted seahorse","Tiger tail seahorse","West African seahorse","Spotted seahorse","Longnose seahorse","Thorny seahorse","Seahorses nei","Straightnose pipefish","Worm pipefish","Short-bodied pipefish","Spotted pipefish","Alligator pipefish","Southern little pipehorse","Shortpouch pygmy pipehorse","Common seadragon","Leafy seadragon","Pink pipefish","Pugheaded pipefish","Gale's pipefish","Network pipefish","Messmate pipefish","Snubnose pipefish","Snake pipefish","Bluestripe pipefish","Tiger pipefish","Brock's pipefish","Ribboned pipefish","Blue-spotted pipefish","Beady pipefish","Macleay's crested pipefish","Prickly pipefish","Trawl pipefish","Brush-tailed pipefish","Deep-bodied pipefish","Orange pipefish","Shortnose pipefish","Flat-nosed pipefish","Short-tailed pipefish","Myers' pipefish","Mollison's pipefish","Elegant pipefish","Red pipefish","Rock pipefish","Pug-nosed pipefish","Ring-backed pipefish","Double-ended pipefish","Mother-of-pearl pipefish","Pipefishes, seahorses nei","Opah","Southern opah","Moonfish, opah, mambo","Spinyfin velifer","Sailfin velifer","Unicorn crestfish","Crested oarfish","Unicornfish","Polka-dot ribbonfish","Mediterranean dealfish","Dealfish","Blackflash ribbonfish","Slender ribbonfish","Dealfishes","Taper-tail ribbonfish","Scalloped ribbonfish","Ribbonfishes","King of herrings","Streamer fish","Oarfishes nei","Tube-eye","Jelly-head fish","Jellynose","Loppe's tadpole fish","Jellynose fishes nei","Festive ribbonfish","Hairyfish","Tapertail","Checkered pupfish","Cuban killifish","Potosi pupfish","Desert pupfish","Bolson pupfish","Parras pupfish","Sheepshead minnow","Goldspotted killifish","Flagfish","Scaleless killifish","Catarina pupfish","Spanish toothcarp","Whitepatched splitfin","Tuxpan splitfin","Opal allotoca","Butterfly splitfin","Bluetail goodea","White River springfish","Ash Meadows killifish","Darkedged splitfin","Blackfin goodea","Barred splitfin","Polka-dot splitfin","Bold characodon","Rainbow characodon","Goldbreast splitfin","Picotee goodeid","Redtail splitfin","Relict splitfin","Leopard splitfin","Bulldog goodeid","Largescale foureyes","Onesided livebearer","White-eye","Mosquitofish","Creole topminnow","Montezuma swordtail","Tanganyika killifish","Grand Cayman limia","Barred topminnow","Dusky millions fish","Guppy","Top minnow","Starhead killi","Ceylon killifish","Blue panchax","Saberfin killie","Argentine pearlfish","Gabon jewelfish","Barredtail pearlfish","Green rivulus","Chiapas killifish","Diamond killifish","Stippled studfish","Pygmy killifish","Bluefin killifish","Corfu toothcarp","Valencia toothcarp","Pink cusk-eel","Red cusk-eel","Black cusk-eel","Kingklip","Rock ling","Cusk-eels nei","Dusky cusk-eel","Snake blenny","Band cusk-eel","Bearded brotula","Goatsbeard brotula","False kinglip","Shortbeard cusk-eel","Specklefin cusk-eel","Black brotula","Spotted cusk-eel","Australian tusk","Legless cuskeel","Black-edged cusk-eel","Velvetnose brotula","Barbed brotula","Cusk-eels, brotulas nei","Messmate","Pinhead pearlfish","Dogtooth pearlfish","Pearlfishes nei","Freetail brotula","Pink brotula","Longarm brotula","Fleshfish","Orange brotula","Yellow pigmy brotula","Bighead brotula","Purple brotula","Gold brotula","Toothed Cuban cusk-eel","Key brotula","Trout-perch","Pirate perch","Ozark cavefish","Swampfish","Spring cavefish","Alabama cavefish","Southern cavefish","Velvet whalefish","Pink flabby whalefish","Flabby whalefish","Stout beardfish","Pacific beardfish","Alfonsino","Splendid alfonsino","Alfonsinos nei","Redfish","Bight redfish","Swallow-tail","Alfonsinos, etc. nei","Parin's spinyfish","Longwing spinyfin","Silver spinyfin","Spinyfins nei","Darwin's slimehead","Mediterranean slimehead","Orange roughy","Smallscale slimehead","Slender roughy","Sandpaper fish","Little pineapple fish","Slimeheads nei","Pineapplefish","Pineconefish","Splitfin flashlightfish","Atlantic flashlightfish","Flashlight fish","Gulf flashlightfish","Squirrelfish","Blackbar soldierfish","Pinecone soldierfish","Blotcheye soldierfish","Shoulderbar soldierfish","Blacktip soldierfish","Yellowfin soldierfish","Doubletooth soldierfish","Whitetip soldierfish","Clearfin squirrelfish","Sammara squirrelfish","Japanese soldierfish","Kai soldierfish","Shy soldier","Spinyface soldier","Silverspot squirrelfish","Sabre squirrelfish","Crown squirrelfish","Red squirrelfish","Redcoat","Violet squirrelfish","Squirrelfishes nei","Slender bigscale","Crested bigscale","Common fangtooth","John dory","Cape dory","Silvery John dory","Mirror dory","Capro dory","Red dory","New Zealand dory","King dory","Silver dory","Dories nei","Thorny tinselfish","Spotted tinselfish","Grammicolepidids nei","Boarfish","Deepbody boarfish","Indo-Pacific boarfish","Boarfishes nei","Spiky oreo","Smooth oreo dory","Ox-eyed oreo","Black oreo","Warty dory","Guinea oreo","Oreo dories nei","Parazen","Dwarf dory","Elongate dory","Moon silverside","Chilean silverside","Argentinian silverside","Big-scale sand smelt","Mediterranean sand smelt","Sand smelt","Cape silverside","Sand smelts nei","Balabac Island silverside","Hardyhead silverside","Topsmelt silverside","Pricklenose silverside","Longfin silverside","Beach silverside","Gulf grunion","Delta silverside","Inland silverside","Atlantic silverside","Rendahl's hardyhead","Thickscale silverside","Blackback silverside","Backwaters silverside","Panatella silverside","Barnes' silverside","Samoan silverside","Brook silverside","Jack silverside","Kiener's silverside","Silversides(=Sand smelts) nei","Katrana","Axelrod's rainbowfish","Red rainbowfish","Threadfin rainbowfish","North New Guinea rainbowfish","Glass blue-eye","Popondetta blue-eye","Redfinned blue-eye","Blue eyes","Marine sailfin silverside","Mercer's tusked silverside","Banana mullet","Flathead grey mullet","Lebranche mullet","White mullet","Parassi mullet","So-iuy mullet","Leaping African mullet","Thicklip grey mullet","So-iny (redlip) mullet","Otomebora mullet","Yellow-eye mullet","Fairy mullet","Mountain mullet","Sharp-nosed river mullet","Goldie river mullet","Lobed river mullet","River mullets nei","Bobo mullet","Half fringelip mullet","Thinlip grey mullet","Golden grey mullet","South African mullet","Leaping mullet","Goldspot mullet","Tade gray mullet","Largescale mullet","Largescaled mullet","Grooved mullet","Squaretail mullet","Klunzinger's mullet","Greenback mullet","Sicklefin mullet","Abu mullet","Diamond mullet","Persian mullet","Longfin mullet","Corsula","Snouted mullet","Sand grey mullet","Acute-jawed mullet","Boxlip mullet","Hornlip mullet","Longarm mullet","Bluespot mullet","Speigler's mullet","Thoburn's mullet","Broad-mouthed mullet","Mullets nei","Asian swamp eel","Obscure swamp eel","Marbled swamp eel","Fire eel","Burmese spineless eel","Mottled fusilier","Slender fusilier","Goldband fusilier","Double-lined fusilier","Banana fusilier","One-stripe fusilier","Capricorn fusilier","Dark-banded fusilier","Blue and gold fusilier","Redbelly yellowtail fusilier","Variable-lined fusilier","Lunar fusilier","Suez fusilier","Yellow and blueback fusilier","Yellowback fusilier","Fusiliers Caesio nei","Fusiliers nei","Union snook","Armed snook","Swordspine snook","Blackfin snook","Black snook","Fat snook","Tarpon snook","Yellowfin snook","Common snook","White snook","Largescale fat snook","Snooks(=Robalos) nei","Barramundi(=Giant seaperch)","Tanganyika lates","Albert lates","Bigeye lates","Forktail lates","Nile perch","Sleek lates","Freshwater perches nei","Waigieu seaperch","Redmouth grouper","Slender grouper","Goldribbon soapfish","Yellowtail bass","Arrowhead soapfish","Butterfly perch","Pink maomao","Graery threadfin seabass","Barred soapfish","Black grouper","Comb grouper","Gulf grouper","Gag","Venezuelan grouper","Scamp","Mottled grouper","Tiger grouper","Yellowfin grouper","Broomtail grouper","Island grouper","Yellowmouth grouper","Leopard grouper","Brazilian groupers nei","Dusky grouper","White grouper","Wavy-lined grouper","Hong Kong grouper","Spinycheek grouper","Giant grouper","Highfin grouper","Honeycomb grouper","Convict grouper","Sixbar grouper","Epaulet grouper","Greasy grouper","Nassau grouper","Rock hind","Spotted grouper","Speckled hind","Yellowedge grouper","Red hind","Starry grouper","Red grouper","Misty grouper","Snowy grouper","Hawaiian grouper","Dogtooth grouper","Blacktip grouper","Dungat grouper","Comet grouper","Warsaw grouper","White-edged grouper","Catface grouper","Areolate grouper","Jewfish","Malabar grouper","Halfmoon grouper","Blue-and-yellow grouper","Rooster hind","Banded grouper","Yellow grouper","Duskytail grouper","Longtooth grouper","Brownspotted grouper","Olive grouper","Orange-spotted grouper","Goldblotch grouper","Speckled blue grouper","Saddletail grouper","Rock grouper","Haifa grouper","Bridled grouper","Starspotted grouper","Striped grouper","Snubnose grouper","Speckled grouper","Camouflage grouper","Longfin grouper","Black-dotted grouper","Threespot grouper","Whitespotted grouper","Brown-marbled grouper","Marquesan grouper","Netfin grouper","White-blotched grouper","Eightbar grouper","Dot-dash grouper","Red-tipped grouper","Reticulate grouper","Potato grouper","Dotted grouper","Smallscaled grouper","Summan grouper","Oblique-banded grouper","Striped-fin grouper","Barred-chest grouper","Longspine grouper","Foursaddle grouper","One-blotch grouper","Moustache grouper","Groupers nei","Comber","Painted comber","Brown comber","Blackear bass","Belted sandfish","Blacktail comber","Ghanian comber","Combers nei","Goldenstriped soapfish","Ocellate soapfish","Streamer bass","Redbanded perch","Orange perch","African basslet","Wrasse bass","Swallowtail seaperch","Black seabass","Mutton hamlet","Rivulated mutton hamlet","Graysby","Coney","Peacock hind","Tomato hind","Bluespotted seabass","Niger hind","Bluespotted hind","Yellowfin hind","Freckled hind","Coral hind","Sixblotch hind","Golden hind","Garish hind","Strawberry hind","Darkfin hind","Chocolate hind","Leopard hind","Humpback grouper","Checked swallowtail","Leather bass","Smooth grouper","Sand perch","Mexican sand perch","Torpedo sand perch","Inshore sand perch","Pond perch","Spanish flag","Creole-fish","Spotted coralgrouper","Squaretail coralgrouper","Blacksaddled coralgrouper","Leopard coralgrouper","Roving coralgrouper","Marbled coralgrouper","Highfin coralgrouper","Greater soapfish","Spotted soapfish","Bigeye bass","Two-spot basslet","Sea goldie","Townsend's anthias","Sailfin anthias","Flathead perch","Boulenger's anthias","Golden grouper","School bass","Pearl-spotted fairy basslet","Pygmy sea bass","Hawkfish anthias","Oval grouper","Threadtail anthias","Argentine seabass","Koester","Yellowtail hamlet","Butter hamlet","Black hamlet","Threadfin anthias","Ara","Toadstool groper","Barred sand bass","Spotted sand bass","Kelp bass","Camotillo","Peruvian rock seabass","Reef bass","Masked grouper","Yellow-edged lyretail","White-edged lyretail","Sevenbar grouper","Gorgeous swallowtail","Groupers, seabasses nei","Westralian jewfish","Tiger grunter","Greenway's grunter","Black bream","Fortescue grunter","Silver grunter","Lorentz's grunter","Small-headed grunter","Barcoo grunter","Kimberley grunter","Jamur Lake grunter","Jarbua terapon","Small-scaled terapon","Largescaled terapon","Terapon perches nei","Fourlined terapon","Silver perch","Tigerperches nei","Wreckfish","Hapuku wreckfish","Bass groper","Hapuka","Giant seabass","Striped bass","White perch","White bass","Yellow bass","Atlantic seabasses","Striped bass, hybrid","Spotted seabass","European seabass","Seabasses nei","Yellow devilfish","Comet","Nightfish","Western pygmy perch","Pelagic basslet","Balston's pygmy perch","Oxleyan pygmy perch","Creole perch","Murray cod","Trout cod","Eastern freshwater cod","Japanese seabass","Mandarin fish","Big-eye mandarin fish","Leopard mandarin fish","Australian bass","Golden perch","Hawaiian flagtail","Mud sunfish","Flier","Pumpkinseed","Bluegill","Smallmouth bass","Largemouth black bass","Spotted bass","Rock bass","White crappie","Black crappie","Sacramento perch","Blackbanded sunfish","Glasseye","Japanese bigeye","Purple-spotted bigeye","Atlantic bigeye","Red bigeye","Moontail bullseye","Paeony bulleye","Bigeyes nei","Longfinned bullseye","Bigeyes,glasseyes,bulleyes nei","Broadbanded cardinalfish","Half-lined cardinal","Cardinal fish","Ring-tailed cardinalfish","Ruby cardinalfish","Cook's cardinalfish","Flagfin cardinalfish","Blackfoot cardinal","Perdix cardinalfish","Blackbelted cardinalfish","Orangelined cardinalfish","Bronze cardinalfish","Tiger cardinal","Large toothed cardinalfish","Twospot cardinalfish","Persian cardinalfish","Weed cardinalfish","Crosseyed cardinalfish","Mottled cardinalfish","Variegated cardinalfish","Gjellerup's mouth almighty","Crystal cardinal","Titan cardinalfish","Eightspine cardinalfish","Freckled cardinalfish","Paddlefish cardinalfish","Tarr's cardinalfish","Graceful-tailed cardinalfish","Luminous cardinalfish","Swallowtail cardinalfish","Sea urchin cardinalfish","Pajama cardinalfish","Bullseye","Doublebar cardinalfish","Twobelt cardinal","Spotfin cardinal","Iridescent cardinalfish","Cardinalfishes, etc. nei","Glowbelly","Three-spined cardinalfish","Silver splitfin","Blackmouth splitfin","Blackmouth bass","Smallscale splitfin","Aden splitfin","Splitfins nei","Glow-bellies, splitfins nei","European perch","American yellow perch","Balkhash perch","Western sand darter","Eastern sand darter","Asprete","Percarina","Ruffe","Donets ruffe","Danube ruffe","Schraetzer","Greenside darter","Rainbow darter","Fantail darter","Chihuahua darter","Logperch","Zingel","Walleye","Volga pikeperch","Pike-perch","Sauger","Walleyes nei","Spotted sillago","Flathead sillago","Trumpeter sillago","Silver sillago","Sand sillago","Flinders' sillago","Arabian sillago","Slender sillago","Clubfoot sillago","Sillago-whitings","Bighead tilefish","Grey tilefish","Ocean whitefish","Atlantic goldeneye tilefish","Horsehead tilefish","Ward's tilefish","Zebra tilefish","Ribbed tilefish","Great Northern tilefish","Tilefishes nei","Chameleon sand tilefish","Stark's tilefish","Quakerfish","Sand tilefish","Nosey dottyback","Oblique-lined dottyback","Fire-tail devil","Pencil snakelet","Orange dottyback","Olive dottyback","Dutoiti","Yellowtail dottyback","Blackstripe dottyback","Bluespotted dottyback","False trevally","Bluefish","Gnomefish","Cobia","Shrimp scad","Blackfin scad","Herring scad","Razorbelly scad","Yellowtail scad","Atlantic horse mackerel","Blue jack mackerel","Japanese jack mackerel","Chilean jack mackerel","Pacific jack mackerel","Mediterranean horse mackerel","Rough scad","Cape horse mackerel","Cunene horse mackerel","Greenback horse mackerel","African scad","Arabian scad","Yellowtail horse mackerel","Jack and horse mackerels nei","Fringefin trevally","Juan Fernandez trevally","Skipjack trevally","White trevally","Round scad","Redtail scad","Shortfin scad","Amberstripe scad","Japanese scad","Indian scad","Roughear scad","Mackerel scad","Scads nei","Bluespotted trevally","Green jack","Pacific crevalle jack","Blacktip trevally","Giant trevally","Horse-eye jack","Black jack","Bluefin trevally","Brassy trevally","Senegal jack","Bigeye trevally","Tille trevally","Blue runner","Crevalle jack","Bar jack","False scad","Yellow jack","Longfin crevalle jack","Jacks, crevalles nei","Atlantic moonfish","African moonfish","Hairfin lookdown","Caribbean moonfish","Mexican moonfish","Peruvian moonfish","Lookdown","Snubnose pompano","Florida pompano","Pompano","Great pompano","Southern pompano","Oyster pompano","Small spotted dart","Largespotted dart","Cayenne pompano","Swallowtail dart","Permit","Longfin pompano","Blackblotch pompano","Plata pompano","Guinean pompano","Indian pompano","Paloma pompano","Gafftopsail pompano","Steel pompano","Shortfin pompano","Pompanos nei","Greater amberjack","Japanese amberjack","Yellowtail amberjack","Guinean amberjack","Lesser amberjack","Samson fish","Fortune jack","Longfin yellowtail","Banded rudderfish","Amberjacks nei","Longjaw leatherjacket","Maracaibo leatherjacket","Shortjaw leatherjacket","Castin leatherjacket","Leatherjacket","Leatherjackets nei","Pilotfish","Silvermouth trevally","Longrakered trevally","Leerfish","Alexandria pompano","African pompano","Indian threadfish","Black pomfret","Cleftbelly trevally","Longfin trevally","Orangespotted trevally","Coastal trevally","Longnose trevally","Shadow trevally","Whitefin trevally","Blue trevally","Yellowspotted trevally","Bludger","Bumpnose trevally","Duskyshoulder trevally","Malabar trevally","Coachwhip trevally","Island trevally","Threadfin jack","Barcheek trevally","Brownback trevally","Imposter trevally","Rainbow runner","Golden trevally","Torpedo scad","Talang queenfish","Doublespotted queenfish","Barred queenfish","Needlescaled queenfish","Queenfishes","Atlantic bumper","Pacific bumper","Bumpers nei","Parona leatherjacket","Bigeye scad","Oxeye scad","Bluntnose jack","Bicolor jack","Yellowfin jack","Blackfin jack","Yellowstripe scad","Blackbanded trevally","Cottonmouth jack","Whitemouth jack","Whitetongue jack","Vadigo","Carangids nei","Roosterfish","Moonfish","Atlantic pomfret","Southern rays bream","Pacific pomfret","Bigtooth pomfret","Big-scale pomfret","Sickle pomfret","Atlantic fanfish","Prickly fanfish","Pacific fanfish","Spotted fanfish","Brilliant pomfret","Rough pomfret","Pomfrets, ocean breams nei","Common dolphinfish","Pompano dolphinfish","Dolphinfishes nei","Ruff","Australian salmon","Cape bonnetmouth","Rubyfish","Atlantic rubyfish","Japanese rubyfish","Bonnetmouths, rubyfishes nei","Bonnetmouth","Boga","Mangrove red snapper","Checkered snapper","Crimson snapper","Dory snapper","Blacktail snapper","John's snapper","Bigeye snapper","One-spot snapper","Blubberlip snapper","Malabar blood snapper","Emperor red snapper","Brownstripe red snapper","Mutton snapper","Schoolmaster snapper","Mullet snapper","Yellow snapper","Southern red snapper","Blackfin snapper","Northern red snapper","Colorado snapper","Cubera snapper","Grey snapper","Spotted rose snapper","Dog snapper","Mahogany snapper","Pacific dog snapper","Lane snapper","Silk snapper","African red snapper","African brown snapper","Russell's snapper","Gorean snapper","Two-spot red snapper","Humpback red snapper","Yellow-lined snapper","Golden African snapper","Yellow-banded snapper","Common bluestripe snapper","Yellowstreaked snapper","Timor snapper","Five-lined snapper","Blueline snapper","Blackspot snapper","Papuan black snapper","Pacific red snapper","Jordan's snapper","Humphead snapper","Guinea snapper","Bengal snapper","Lunartail snapper","Bluestriped snapper","Snappers nei","Yellowtail snapper","Rusty jobfish","Small toothed jobfish","Green jobfish","Black snapper","African forktail snapper","Tang's snapper","Japanese snapper","Vanuatu snapper","Saddle-back snapper","Yellowtail blue snapper","Cocoa snapper","Queen snapper","Deep-water red snapper","Deepwater longtail red snapper","Pale snapper","Black and white snapper","Scalemouth jobfish","Ornate jobfish","Crimson jobfish","Wenchman","Goldbanded jobfish","Lavender jobfish","Sharptooth jobfish","Goldflag jobfish","Golden eye jobfish","Oblique-banded snapper","Jobfishes nei","Vermilion snapper","Mexican barred snapper","Randall's snapper","Sailfin snapper","Chinamanfish","Pinjalo","Snappers, jobfishes nei","Smooth dwarf monocle bream","Rosy dwarf monocle bream","Scaly dwarf monocle bream","Small-toothed whiptail","Double whiptail","Paradise whiptail","Green-striped coral bream","Red filament threadfin bream","Ornate threadfin bream","Japanese threadfin bream","Golden threadfin bream","Mauvelip threadfin bream","Doublewhip threadfin bream","Redspine threadfin bream","Notchedfin threadfin bream","Fivelined threadfin bream","Balinese threadfin bream","Yellowbelly threadfin bream","Celebes threadfin bream","Graceful threadfin bream","Randall's threadfin bream","Delagoa threadfin bream","Slender threadfin bream","Threadfin breams nei","Whitecheek monocle bream","Thumbprint monocle bream","Arabian monocle bream","Two-lined monocle bream","Monogrammed monocle bream","Lattice monocle bream","Black-streaked monocle bream","Striped monocle bream","Yellowstripe monocle bream","Bridled monocle bream","Monocle breams","Threadfin and dwarf breams nei","Tripletail","Pacific tripletail","Toothpony","Toothponies nei","Splendid ponyfish","Twoblotch ponyfish","Goldstripe ponyfish","Dussumier's ponyfish","Common ponyfish","Striped ponyfish","Orangefin ponyfish","Whipfin ponyfish","Oblong ponyfish","Shortnose ponyfish","Ornate ponyfish","Ponyfishes(=Slipmouths)","Pugnose ponyfish","Deep pugnose ponyfish","Decorated ponyfish","Slender ponyfish","Ponyfishes(=Slipmouths) nei","Borriqueta porgy","Painted sweetlips","Xantic sargo","Spotted head sargo","Burrito grunt","Black margate","Porkfish","White margate","Black grunt","Caesar grunt","Yellowspotted grunt","French grunt","Spanish grunt","Spottail grunt","Cottonwick grunt","Sailor's grunt","White grunt","Bluestriped grunt","Grey grunt","Greybar grunt","Chere-chere grunt","Tomtate grunt","Yellowstripe grunt","Raucous grunt","Pigfish","Corocoro grunt","Torroto grunt","Cabinza grunt","African striped grunt","Crescent sweetlips","Trout sweetlips","Minstrel sweetlips","Biglip grunt","Rubberlip grunt","Lemonfish","Blackspotted rubberlip","Sordid rubberlip","Oriental sweetlips","Whitebarred rubberlip","Lesson's thicklip","Harry hotlips","Yellowbanded sweetlips","Dusky rubberlip","Sweetlips, rubberlips nei","Striped piggy","Smallspotted grunter","Silver grunt","Saddle grunt","Olive grunt","Smallspotted grunt","Purplemouth grunt","Sand grunt","Burro grunt","Longspine grunt","Bastard grunt","Sompat grunt","Parrot grunt","Cock grunter","Javelin grunter","Panama grunt","Pigsnout grunt","Bluecheek silver grunt","Banded grunter","Bronzestriped grunt","Bigeye grunt","Dara","Barred grunt","Wavyline grunt","Grunts, sweetlips nei","Yellowtail croaker","Boeseman croaker","Vacuocua croaker","Barbel drum","Totoaba","Brown meagre","Deep-water drum","Sciaenas nei","Freshwater drum","Acoupa weakfish","Whitefin weakfish","Peruvian weakfish","Sand weakfish","Jamaica weakfish","Smooth weakfish","Spotted weakfish","Smallscale weakfish","Gulf weakfish","Shortfin weakfish","Cachema weakfish","Squeteague(=Gray weakfish)","Smalltooth weakfish","Striped weakfish","Green weakfish","Orangemouth weakfish","Silver seatrout","Tonkin weakfish","Stolzmann's weakfish","Stripped weakfish","Weakfishes nei","San Francisco croaker","Amazon croaker","Longtail croaker","Mi-iuy (brown) croaker","Angola croaker","La Plata croaker","Half-mourning croaker","Fusco drum","Slender croaker","Whitemouth croaker","Atlantic croaker","Tallfin croaker","Croakers nei","Southern kingcroaker","Highfin king croaker","Snakehead kingcroaker","Panama kingcroaker","California kingcroaker","Northern kingfish","Gulf kingcroaker","Kingcroakers nei","New Grenada drum","Estuary croaker","Shi drum","Argentine croaker","Sand drum","Yellowfin drum","Polla drum","Canary drum(=Baardman)","Fusca drum","Steindachner's drum","Striped drum","Drums nei","Belanger's croaker","Coitor croaker","Sin croaker","Leaftail croaker","Bearded croaker","Sharpnose hammer croaker","Karut croaker","King weakfish","Meagre","Japanese meagre","Southern meagre(=Mulloway)","Squaretail kob","Amoy croaker","Arabian sea meagre","Meagres nei","Geelbek croaker","White weakfish","Bluestreak drum","High-hat","Jack-knifefish","White croaker","Steeplined drum","Silver drum","Shorthead drum","Shining drum","Pacific drum","Boe drum","Smalleye croaker","Pacific smalleye croaker","Spotted croaker","Tigertooth croaker","Bronze croaker","Pama croaker","Banded croaker","Peruvian banded croaker","Blackfin croaker","Black curbinata","South American silver croaker","Pacora","Black drum","White stardrum","American stardrum","Smalleye stardrum","Minor stardrum","Yawning stardrum","Rake stardrum","Ground croaker","Yelloweye croaker","Yellow drum","Blotched croaker","Honnibe croaker","Sharpnose croaker","Soldier croaker","Large yellow croaker","Yellow croaker","Silver weakfish","Bigtooth corvina","Spot croaker","Black croaker","Brazilian croaker","Guyanan croaker","Spotfin croaker","Red drum","Queen croaker","Law croaker","Cassava croaker","Longneck croaker","Cameroon croaker","Bobo croaker","Guinea croaker","West African croakers nei","Goatee croaker","Prickly croaker","Blackmouth croaker","Chaptis bahaba","Chinese bahaba","Reeve's croaker","Bengal corvina","Kathala croaker","Panna croaker","Silver croaker","Big-head pennah croaker","Pawak croaker","Bigeye croaker","Blackspotted croaker","Bigmouth croaker","Blotched tiger-toothed croaker","Corvina drum","Croakers, drums nei","Mozambique large-eye bream","Striped large-eye bream","Grey large-eye bream","Yellowsnout large-eye bream","Japanese large-eye bream","Blue-lined large-eye bream","Largeeye breams","Spangled emperor","Atlantic emperor","Longfin emperor","Thumbprint emperor","Sky emperor","Red snout emperor","Slender emperor","Pacific yellowtail emperor","Blackeye emperor","Grass emperor","Pink ear emperor","Smalltooth emperor","Trumpet emperor","Longface emperor","Spotcheek emperor","Ambon emperor","Orange-spotted emperor","Orange-striped emperor","Ornate emperor","Yellowlip emperor","Snubnose emperor","Yellowtail emperor","Longspine emperor","Redaxil emperor","Humpnose big-eye bream","Emperors(=Scavengers) nei","Fransmadam","Janbruin","Bulldog dentex","Blackspot(=red) seabream","Common pandora","Axillary seabream","Red pandora","Arabian pandora","Natal pandora","Pandoras nei","South American silver porgy","Annular seabream","White seabream","Common two-banded seabream","Zebra seabream","Sharpsnout seabream","Spottail seabream","Banded seabream","Red Sea seabream","Senegal seabream","Two-banded seabream","Sargo breams nei","Galapagos porgy","Grass porgy","Jolthead porgy","Pacific porgy","Saucereye porgy","Littlehead porgy","Sheepshead porgy","Porgies","Pink dentex","Large-eye dentex","Canary dentex","Common dentex","Angolan dentex","Congo dentex","Morocco dentex","Yellowback seabream","Barnard dentex","Dentex nei","Black seabream","Steentjie seabream","Saddled seabream","Sheepshead","Western Atlantic seabream","King soldier bream","Taiwan tai","Soldierbream","Carpenter seabream","Santer seabream","Black musselcracker","Bluespotted seabream","Red porgy","Redbanded seabream","Silver seabream","Japanese seabream","Southern common seabream","Pargo breams nei","Red steenbras","Dane seabream","Panga seabream","White stumpnose","Goldlined seabream","Cape stumpnose","Bigeye stumpnose","Haffara seabream","Stumpnoses nei","Musselcracker seabream","Gilthead seabream","Bogue","Daggerhead seabream","Roman seabream","Red stumpnose seabream","Englishman seabream","Slinger seabream","False red stumpnose","Daggerhead breams nei","Karanteen seabream","White steenbras","Sand steenbras","West coast seabream","Steenbrasses nei","Blue hottentot","Bronze seabream","Hottentot seabream","Copper breams(=Hottentots) nei","Scotsman seabream","Seventyfour seabream","Blueskin seabream","Frenchman seabream","Polystegan seabreams nei","Salema","Threadfin porgy","Crimson seabream","Sobaity seabream","Goldsilk seabream","Surf bream","Blackhead seabream","Yellowfin seabream","Twobar seabream","Scup","Longspine porgy","Pinfish","German seabream","Knife-back seabream","Porgies, seabreams nei","Blotched picarel","Picarel","Blackspot picarel","Bigeye picarel","Blacktail picarel","Picarels nei","Curled picarel","Picarels, etc. nei","Blue-striped mullet","Surmullet","Red mullet","Argentine goatfish","Surmullets(=Red mullets) nei","Yellowstripe goatfish","Yellowfin goatfish","Yellow goatfish","Doublebar goatfish","Gold-saddle goatfish","Red Sea goatfish","Long-barbel goatfish","Manybar goatfish","Sidespot goatfish","Indian goatfish","Dash-and-dot goatfish","Cinnabar goatfish","Pearly goatfish","Whitesaddle goatfish","Rosy goatfish","Goldband goatfish","Sulphur goatfish","Ochrebanded goatfish","Freckled goatfish","Yellowstriped goatfish","Dwarf goatfish","Band-tail goatfish","Por's goatfish","Asymmetrical goatfish","Gilded goatfish","Bensasi goatfish","Goatfishes","West African goatfish","Spotted goatfish","Goatfishes, red mullets nei","Live sharksucker","Slender suckerfish","Spearfish remora","Shark sucker","Marlin sucker","Shark suckers","White suckerfish","Suckerfishes, remoras nei","Galjoen","Banded galjoen","Galjoens nei","Spotted archerfish","Banded archerfish","Smallscale archerfish","Silver moony","African moony","Full moony","Eastern pomfred","Silverbelly","Deep-bodied mojarra","Whipfin silver-biddy","Strongspine silver-biddy","Yellow fin mojarra","Common silver-biddy","Slender silver-biddy","Guinean striped mojarra","Striped silver biddy","Longtail silverbiddy","Saddleback silver-biddy","Mojarras(=Silver-biddies) nei","Irish mojarra","Dow's mojarra","Flagfin mojarra","Black axillary mojarra","Longfin mojarra","Mojarras, etc. nei","Eastern footballer","Grey knifefish","Gulf opal eye","Parore","Opaleye","Halfmoon","Stripey","Western footballer","Sea sweep","Blue maomao","Moonlighter","Blue sea chub","Blue-bronze sea chub","Cortez sea chub","Yellow sea chub","Bermuda sea chub","Brown chub","Brassy chub","Kyphosus sea chubs nei","Stone-bream","Zebra- perch sea chub","Bluestriped chub","Sea chubs nei","Slender bullseye","Silver sweeper","Curved sweeper","Vanikoro sweeper","Spotted sicklefish","African sicklefish","Concertina fish","Sicklefishes nei","Lord Howe Island butterflyfish","Blackfin coralfish","Copperband butterflyfish","Truncate coralfish","Highfin coralfish","Pyramid butterflyfish","Blacknosed butterflyfish","Sixspine butterflyfish","Bicolor butterflyfish","Foureye butterflyfish","Threebanded butterflyfish","Banded butterflyfish","Four-banded butterflyfish","Golden butterflyfish","Mirror butterflyfish","Chevron butterflyfish","Redtail butterflyfish","Gardner's butterflyfish","Arabian butterflyfish","Black-spotted butterflyfish","Vagabond butterflyfish","Raccoon butterflyfish","Threadfin butterflyfish","Butterflyfishes nei","Pennant coralfish","Masked bannerfish","Longnose butterfly fish","Indian barred butterflyfish","Butterflyfishes","Old wife","Old wife fishes","Manefish","Manefishes nei","Fourspine leaffish","Malayan leaffish","Gangetic leaffish","African leaffish","Badis","Amazon leaffish","Striped boarfish","Sailfin armourhead","Short boarfish","Yellowspotted boarfish","Giant boarfish","Longsnout boarfish","Cape armourhead","Bigspined boarfish","Pelagic armourhead","Longfin armorhead","Slender armorhead","Pelagic armourheads nei","Longfin boarfish","Cape knifejaw","Natal knifejaw","Midas cichlid","Flier cichlid","Greenstreaked eartheater","Giant cichlid","Keyhole cichlid","Blackspot climbing perch","Featherfin cichlid","Malawi eyebiter","Mozambique tilapia","Nile tilapia","Blue tilapia","Sabaki tilapia","Longfin tilapia","Wami tilapia","Three spotted tilapia","Magadi tilapia","Karomo","Kariba tilapia","Black tilapia","Tilapias nei","Blue-Nile tilapia, hybrid","Mango tilapia","Blackchin tilapia","Green guapote","Black acara","Chameleon cichlid","Rio Grande cichlid","Jaguar guapote","Blackbelt cichlid","Mexican mojarra","Convict cichlid","Jack Dempsey","Cichlasoma nei","Peacock cichlid","Speckled pavon","Redbelly tilapia","Banded tilapia","Redbreast tilapia","Guinean tilapia","Otjikoto tilapia","Spotted tilapia","Okavango tilapia","Threespot torpedo","Argentine humphead","Giant Haplochromis","Rainbow cichlid","Moga","Lavender mbuna","Dikume","Malawi gar","Flag cichlid","Ram cichlid","Myaka","Fuscotaeniatus","Ringtail pike cichlid","Pike cichlid","Humphead cichlid","Deep-water hap","Haplochromis yellow black line","Pearl cichlid","Jewelfish","Banded jewelfish","Orange chromide","Pearlspot","Oscar","Velvety cichlids","Mouthbrooding cichlids","Green terror","Blue acara","Elongate mbuna","Zebra mbuna","Golden mbuna","Bluegray mbuna","Blue streak hap","Blue mbuna","Blue discus","Threadfin acara","Sharphead eartheater","Electric blue hap","Canary kurper","Uaru","Thinface cichlid","Yellow-belly bream","Chessboard cichlid","Lionhead cichlid","Nsess","Spotfin goby cichlid","Goldeneye cichlid","Cichlids nei","Bandfish","Red bandfish","Kelp perch","Rainbow seaperch","Reef perch","White seaperch","Pink seaperch","Black perch","Russian river tule perch","Shiner perch","Barred surfperch","Spotfin surfperch","Rubberlip seaperch","Spiny chromis","Golden damselfish","Black-banded demoiselle","Galapagos damsel","Big-lip damsel","Twinspot damselfish","Blueline demoiselle","Easter damselfish","Sheila's damselfish","Onespot demoiselle","White-spot damsel","Lagoon damselfish","Immaculate damsel","Bumphead damselfish","Guinean damselfish","Ocellated damsel","Yellowtail demoiselle","Regal demoiselle","Arabian demoiselle","Coquito sergeant","Kermadec scalyfin","Blackbar devil","Tahitian reef-damsel","Spinecheek anemonefish","Gulf damselfish","Damselfish","Valparaiso chromis","Peruvian chromis","Blacksmith","Yellow chromis","Azores chromis","Cadenat's chromis","Bicolor chromis","Arabian chromis","Weber's chromis","Yellowfin chromis","Chocolatedip chromis","Blue green damselfish","Cape damsel","Australian gregory","Dusky damselfish","Pacific gregory","Beaugregory","Cape Verde gregory","Jordan's damsel","Sergeant-major","Canary damsel","Night sergeant","Blackspot sergeant","Indo-Pacific sergeant","Scissortail sergeant","Garibaldi damselfish","Hawaiian dascyllus","Whitetail dascyllus","Reticulate dascyllus","Threespot dascyllus","Creole damsel","Speckled damselfish","Lemon damsel","Dark damsel","Slender damsel","Paletail damsel","Threeline damsel","Threespot damsel","Skunk clownfish","Barrier reef anemonefish","Yellowtail clownfish","Sebae anemonefish","Twobar anemonefish","Fusilier damselfish","Damselfishes","Scale-rayed wrasse","Western blue groper","Natal wrasse","Ballan wrasse","Cuckoo wrasse","Brown wrasse","Green wrasse","Labrus wrasses nei","Cigar wrasse","Girdled wrasse","Exquisite wrasse","Creole wrasse","Mutant wrasse","Sharp-headed wrasse","Largescale wrasse","Yellowtail tubelip","Dwarf wrasse","Sling-jaw wrasse","Ring wrasse","Tubelip wrasse","Allen's tubelip","Shoulder-spot wrasse","Rare wrasse","Minute wrasse","Spotty","Seagrass wrasse","Speckled maori wrasse","Cheeklined wrasse","Angular flasher","McCosker's flasher","Bleeding wrasse","Pelvic-spot wrasse","Striated wrasse","Rust-banded wrasse","Chiseltooth wrasse","Polynesian wrasse","Cocktail wrasse","Bluelined wrasse","Cutribbon wrasse","Rainbow slender wrasse","Spottail wrasse","Slender wrasse","Whitebanded sharpnose wrasse","Finspot wrasse","Blue-banded wrasse","Rock cook","Emerald wrasse","Rainbow wrasse","African coris","Clown coris","Queen coris","Goldsinny-wrasse","Pearly razorfish","Geographic wrasse","Spotted wrasse","Bluespotted wrasse","Spanish hogfish","Mexican hogfish","Harlequin wrasse","Golden-spot hogfish","Axilspot hogfish","Blackbar hogfish","Western Australia pigfish","Diana's hogfish","Tarry hogfish","Redbreasted wrasse","Tripletail wrasse","Humphead wrasse","Broomtail wrasse","Floral wrasse","Blackspot tuskfish","Robust tuskfish","Tuskfishes nei","Hogfish","Señorita","Tautog","Ornate wrasse","Bluehead","Saddle wrasse","Moon wrasse","Surge wrasse","Goldbar wrasse","Cunner","California sheephead","Bird wrasse","Green birdmouth wrasse","Black wrasse","Canarytop wrasse","Dusky wrasse","Bubblefin wrasse","U-spot wrasse","Blackear wrasse","Zigzag wrasse","Checkerboard wrasse","Grey wrasse","Corkwing wrasse","Symphodus wrasses nei","Bluestreak cleaner wrasse","Barred thicklip","Blackeye thicklip","Peacock wrasse","Two-spot razorfish","Fivefinger wrasse","Wrasses, hogfishes, etc. nei","Butterfish, greenbone","Japanese parrotfish","Carolines parrotfish","Spinytooth parrotfish","Heavybeak parrotfish","Daisy parrotfish","Steephead parrotfish","Bleeker's parrotfish","Pacific slopehead parrotfish","Bower's parrotfish","Loosetooth parrotfish","Emerald parrotfish","Redband parrotfish","Redtail parrotfish","Parrotfish","Redfin parrotfish","Greenblotch parrotfish","Blue parrotfish","Queen parrotfish","Forsten's parrotfish","Striped parrotfish","Princess parrotfish","Gulf parrotfish","Bridled parrotfish","Blue-barred parrotfish","Dusky parrotfish","Guinean parrotfish","Common parrotfish","Ember parrotfish","Eclipse parrotfish","Tricolour parrotfish","Arabian parrotfish","Rusty parrotfish","Purple-brown parrotfish","Marbled parrotfish","Bluelip parrotfish","Candelamoa parrotfish","Pacific longnose parrotfish","Bicolour parrotfish","Green humphead parrotfish","Parrotfishes nei","Reunion angelfish","Orangeback angelfish","Yellowhead angelfish","Dusky angelfish","Barred angelfish","Ballina angelfish","Ornate angelfish","Pitcairn angelfish","Clarion angelfish","Guinean angelfish","Bluering angelfish","Emperor angelfish","Arabian angelfish","Yellowbar angelfish","Semicircle angelfish","Regal angelfish","Purplemask angelfish","Angelfishes nei","Spotted hawkfish","Coral hawkfish","Redbarred hawkfish","Giant hawkfish","Stocky hawkfish","Swallowtail hawkfish","Sixband hawkfish","Flame hawkfish","Longnose hawkfish","Arc-eye hawkfish","Blackside hawkfish","Hawkfishes nei","Tasseled kelpfish","Silver spot","Notchheaded marblefish","St. Paul's fingerfin","Dusky morwong","Castaneta","Peruvian morwong","Red moki","Hawaiian morwong","Redlip morwong","Spottedtail morwong","Magpie perch","Redfingers","Porae","Tarakihi","Morwongs","Two-tone fingerfin","Bank steenbras","Natal fingerfin","Telescope fish","Striped trumpeter","Blue moki","Bastard trumpeter","Trumpeters nei","Yellowhead jawfish","Robust jawfish","Birdled jawfish","Royal gramma","Yellow basslet","Striped threadfin","Sixfinger threadfin","Blue bobo","Yellow bobo","Blackspot threadfin","Giant African threadfin","Slender fivefinger threadfin","Long-limb threadfin","King threadfin","River threadfin","African blackspot threadfin","Smallmouth threadfin","Arabian blackspot threadfin","Australian threadfin","Blackfin threadfin","Atlantic threadfin","Littlescale threadfin","Persian blackspot threadfin","Largemouth striped threadfin","Barbu","Fourfinger threadfin","Threefinger threadfin","E. Asian fourfinger threadfin","Lesser African threadfin","Royal threadfin","Paradise threadfin","Northern paradise fish","Eastern paradise fish","Hornaday’s paradise fish","Blackhand paradise fish","Elegant paradise fish","Kapuas elegant paradise fish","Indian threadfin","Dwarf paradise fish","Sevenfinger threadfin","Javanese threadfin","Splendid threadfin","Eightfinger threadfin","Indian sevenfinger threadfin","Yellowthread threadfin","Threadfins, tasselfishes nei","Slope bass","False scorpionfish","Plunderfish","Marbled plunderfish","Barbeled plunderfishes nei","Long-tailed groppo","Barred seabass","Lampfish","Channel bull blenny","Longfin icedevil","Pithead","Naked-head toothfish","Patagonian blennie","Antarctic toothfish","Patagonian toothfish","Antarctic toothfishes nei","Marbled rockcod","Humped rockcod","Yellowbelly rockcod","Grey rockcod","Black rockcod","Striped-eyed rockcod","Triangular rockcod","Narrowhead rockcod","Blue rockcod","Lobe-lip notothen","Notothenia nei","Magellanic rockcod","Maori chief","Black cod","Paranotothenia nei","Painted notie","Yellowfin notie","Toad notie","Patagonian rockcod","Longtail Southern cod","Yellowfin notothen","Patagonotothen nei","Blunt scalyhead","Emerald rockcod","Sharp-spined notothenia","Slender scalyhead","Scaly rockcod","Dusky rockcod","Spotted notothen","Crowned rockcod","Bigeye notothen","Orange notothen","Trematomus nei","Striped rockcod","Bald notothen","Stocky rockcod","Pagothenia nei","Antarctic silverfish","Antarctic rockcods, noties nei","Deep-water dragon","Mawson's dragonfish","Ploughfish","Dragonfishes nei","Long-fingered icefish","Jonah's icefish","Blackfin icefish","Mackerel icefish","Pike icefish","South Georgia icefish","Ocellated icefish","Myers' icefish","Unicorn icefish","Spiny icefish","Crocodile icefishes nei","Pennyfish","High-finned glass perchlet","Four-spined glass perchlet","Bald glassy","Slender glassy","Longspine glassy","Elongate glass-perchlet","Glassfishes","Black cardinal fish","Pencil cardinal","Robust cardinalfish","Cardinal fishes nei","Magellan plunderfish","Antarctic spiny plunderfish","S. Georgia spiny plunderfish","Spiny plunderfishes nei","Beachsalmon","Percoids nei","Atlantic wolffish","Northern wolffish","Spotted wolffish","Wolffishes(=Catfishes) nei","Wolf-eel","Alaskan ronquil","Stripefin ronquil","Northern ronquil","Pighead prickleback","Stone cockscomb","Lesser prickleback","Y-prickleback","High cockscomb","Pearly prickleback","Monkeyface prickleback","Mosshead warbonnet","Fourline snakeblenny","Trident prickleback","Longsnout prickleback","Slender eelblenny","Ribbon prickleback","Bluebarred prickleback","Whitebarred prickleback","Radiated shanny","Black prickleback","Penpoint gunnel","Stippled gunnel","Kelp gunnel","Rockweed gunnel","Tidepool gunnel","Rock gunnel","Quillfish","Eelpout","Cuskpout","Ocean pout","Persimmon eelpout","Arctic eelpout","Greater eelpout","Eelpouts","Wolf eelpout","Halfbarred pout","Stout slipskin","Bearded eelpout","Looseskin eelpout","Atlantic soft pout","Limp eelpout","Eelpouts nei","Graveldiver","Prowfish","Dwarf wrymouth","Red triplefin","Pacific sandlance","Small sandeel","American sand lance","Gill's sand lance","Sandeels(=Sandlances) nei","Scaly sandlance","Cape sandlance","Mediterranean sand eel","Smooth sandeel","Greater sand-eel","Great sandeel","Sandlances nei","Gaper","Black swallower","Duckbill flathead","Roundtail duckbill","Squaretail duckbill","Brazilian flathead","Duckbills nei","Torrent fish","Pacific sandperch","Namorado sandperch","Argentinian sandperch","New Zealand blue cod","U-mark sandperch","Whitespot sandsmelt","Latticed sandperch","Speckled sandperch","Barred sandperch","Smallscale grubfish","Brazilian sandperch","Chilean sandperch","Spotted sand-diver","Arabian sand diver","Longfin burrower","Sand dart","Greater weever","Lesser weever","Spotted weever","Starry weever","Guinean weever","Sailfin weever","Striped weever","Cape Verde weever","Weevers nei","Weeverfishes nei","Northern stargazer","Spotted stargazer","Fringed stargazer","Lancer stargazer","Stargazer","Longspine stargazer","West African stargazer","Whitespotted stargazer","Dollfus' stargazer","Stargazers","Giant stargazer","Stargazers nei","Slender stargazer","Estuary stargazer","Pacific sandfish","Japanese sandfish","Throat-spine gudgeon","Barred gudgeon","Duckbill sleeper","Tailface sleeper","Pacific fat sleeper","Fat sleeper","Dusky sleeper","Spotted sleeper","Emerald sleeper","Graham's gudgeon","Slender gudgeon","Mitchell gudgeon","Cave gudgeon","Snakehead gudgeon","Mud sleeper","Peacock gudgeon","Upland bully","Bigmouth sleeper","Marble goby","Fimbriate gudgeon","Sleepy cod","Gudgeons, sleepers nei","Blotchcheek goby","Tropical sand goby","Day's goby","Black goby","Rock goby","Red-mouthed goby","Giant goby","Bellotti's goby","Bucchich's goby","Sarato's goby","Slender goby","Roule's goby","Striped goby","Golden goby","Atlantic gobies nei","Transparent goby","West African freshwater goby","Frillfin goby","Dusky frillgoby","Pinkbar goby","Diagonal shrimp goby","Downing's shrimpgoby","Periophthalma prawn-goby","Triplespot shrimpgoby","Butterfly goby","Nocturn goby","Sleepy goby","Tank goby","Tusk goby","Walking goby","Indian O. slender mudskipper","Taileyed goby","Common goby","Sand goby","Balboa goby","Lyre goby","Blackfin goby","Biringo","Ninebar prawn-goby","Luther's prawn-goby","Slow goby","Longjaw mudsucker","Coralline goby","Guillet's goby","Crystal goby","Frogface goby","Eyebrow goby","Arrow goby","Miller's damsel","Starry goby","Small-eyed goby","Leopard dwarfgoby","Barbulifer","Sponge goby","Round goby","Barfin goby","Amur goby","Naked goby","Great blue spotted mudskipper","White-eye goby","Doublebar goby","Feather goby","Large whip goby","Whip coral goby","De Buen's goby","Chestnut goby","Grass goby","Agulhas goby","Adamson's goby","Anomolous goby","Onespot goby","Burrowing goby","Arabian goby","Gold-streaked prawn-goby","Comb goby","Four-spotted goby","Spikefin goby","Spotback goby","Cable's goby","Tidewater goby","Mud reef-goby","Barenape goby","Nineline goby","Gladiator goby","Poison goby","Reticulate goby","Rippled coralgoby","Checkered goby","Longjaw goby","Two-spotted goby","Crescent goby","Splitbanded goby","Poreless goby","Bumblebee fish","Cheekspot goby","Decorated goby","Ornate goby","Cardinal goby","Bay goby","Fries's goby","Halfblind goby","Oman goby","Whitecap goby","Largetooth goby","Flagfin prawn goby","Knout goby","Orangespotted goby","Sharptail goby","Hole goby","Spinecheek goby","Mauve goby","Meteor goby","Blackthroat goby","Redhead goby","Emerald coral goby","Barred mudskipper","Atlantic mudskipper","Walton's mudskipper","Scalynape goby","Girdled goby","Randall's goby","Tubenose goby","Secret goby","Bichique","Stimpson's goby","Twinspot goby","Grotto goby","Beaufort's goby","Eel worm goby","Tusked goby","Lord's goby","Fan shrimp-goby","Okinawa rubble goby","Winterbottom's goby","Red-barred rubble goby","Blind goby","Sixspot goby ","Ambanoro prawn-goby","Orangebelly goby","Cameroon goby","Slender mudskipper","Freshwater gobies nei","Gobies nei","Loach goby","Pugjaw wormfish","Curious wormfish","Yellowstripe wormfish","Elegant firefish","Fire goby","Rao's hover goby","Blue gudgeon","Wormfishes nei","Flathead wriggler","Chinese sleeper","Yellow tang","Sailfin tang","Twotone tang","Yellowtail tang","Spotted tang","Ocean surgeon","Blue tang surgeonfish","Black-spot surgeonfish","Orangespot surgeonfish","Doctorfish","Convict surgeonfish","Monrovia doctorfish","Lined surgeonfish","Brown surgeonfish","Black surgeonfish","Sohal surgeonfish","Ringtail surgeonfish","Elongate surgeonfish","Powderblue surgeonfish","Orangespine unicornfish","Bluespine unicornfish","Spotted unicornfish","Palette surgeonfish","Twospot surgeonfish","Striated surgeonfish","Biafra doctorfish","Surgeonfishes nei","Threadfin scat","Ninespine batfish","Orbfish","Panama spadefish","Orbicular batfish","Longfin batfish","Dusky batfish","Batfishes","African spadefish","Atlantic spadefish","Pacific spadefish","West African spadefish","Spadefishes nei","Spotted scat","Scats","Streamlined spinefoot","Blue-spotted spinefoot","Barred spinefoot","Mottled spinefoot","Streaked spinefoot","Marbled spinefoot","Labyrinth spinefoot","White-spotted spinefoot","Goldlined spinefoot","Golden-lined spinefoot","Dusky spinefoot","Magnificent rabbitfish","Black foxface","Blackeye rabbitfish","Masked spinefoot","Peppered spinefoot","Goldspotted spinefoot","Variegated spinefoot","Little spinefoot","Brown-spotted spinefoot","Shoemaker spinefoot","Threeblotched rabbitfish","Blotched foxface","Bicolored foxface","Vermiculated spinefoot","Barhead spinefoot","Foxface","Spinefeet(=Rabbitfishes) nei","Luvar","Moorish idol","Atlantic bonito","Striped bonito","Eastern Pacific bonito","Australian bonito","Bonitos nei","Chub mackerel","Atlantic mackerel","Blue mackerel","Scomber mackerels nei","Plain bonito","Wahoo","Dogtooth tuna","Short mackerel","Indian mackerel","Island mackerel","Indian mackerels nei","Chinese seerfish","Narrow-barred Spanish mackerel","Indo-Pacific king mackerel","Streaked seerfish","King mackerel","Atlantic Spanish mackerel","Cero","Pacific sierra","Queensland school mackerel","West African Spanish mackerel","Japanese Spanish mackerel","Broad-barred king mackerel","Serra Spanish mackerel","Korean seerfish","Monterey Spanish mackerel","Papuan seerfish","Kanadi kingfish","Australian spotted mackerel","Seerfishes nei","Butterfly kingfish","Leaping bonito","Shark mackerel","Double-lined mackerel","Frigate tuna","Bullet tuna","Frigate and bullet tunas","Little tunny(=Atl.black skipj)","Black skipjack","Kawakawa","Skipjack tuna","Atlantic bluefin tuna","Pacific bluefin tuna","Longtail tuna","Blackfin tuna","Albacore","Southern bluefin tuna","Yellowfin tuna","Bigeye tuna","True tunas nei","Slender tuna","Mackerels nei","Tunas nei","Indo-Pacific sailfish","Atlantic sailfish","Blue marlin","Black marlin","Mediterranean spearfish","Striped marlin","Atlantic white marlin","Shortbill spearfish","Longbill spearfish","Roundscale spearfish","Spearfishes nei","Marlins,sailfishes,etc. nei","Swordfish","Snoek","White snake mackerel","Striped escolar","American sackfish","Sackfish","Escolar","Black gemfish","Oilfish","Slender escolar","Antarctic escolar","Silver gemfish","Long-finned escolar","Royal escolar","Bengal escolar","Short-lined escolar","Nakamura's escolar","Paxton's escolar","Black snoek","Domine","Tonga escolar","Black snake mackerel","Roudi escolar","Snake mackerel","Snake mackerels, escolars nei","Razorback scabbardfish","Elongate frostfish","Bigeye frostfish","Slender frostfish","Frostfishes","Largehead hairtail","Pearly hairtail","Hairtails nei","Poey's scabbardfish","Silver scabbardfish","Pacific scabbardfish","Doubtful scabbardfish","Coromandel hairtail","Savalai hairtail","Black scabbardfish","Intermediate scabbardfish","Crested hairtail","Smallhead hairtail","Longtooth hairtail","Hairtails, scabbardfishes nei","Tuna-like fishes nei","Smalleye squaretail","Squaretails nei","Blue butterfish","Southwest Atlantic butterfish","Starry butterfish","Butterfishes nei","Silver pomfret","Chinese silver pomfret","Silver pomfrets nei","American harvestfish","Atlantic butterfish","Pacific pompano","Pacific harvestfish","Salema butterfish","Gulf butterfishes, etc. nei","Butterfishes, pomfrets nei","Indian driftfish","Silver-rag driftfish","Brown driftfish","Ariommatids nei","Climbing perch","Tailspot ctenopoma","Rocky kurper","Driftfish","Black fathead","Blue fathead","Cape fathead","Bigeye cigarfish","Shadow driftfish","Man-of-war fish","Freckled driftfish","Driftfishes nei","Rudderfish","Southern driftfish","New Zealand ruffe","Imperial blackfish","Violet warehou","Pemarco blackfish","Pelagic butterfish","Cornish blackfish","Schedophilus nei","Tasmanian ruffe","Choicy ruff","Common warehou","Palm ruff","Silver warehou","White warehou","Warehou nei","Bluenose warehou","Black driftfish","Barrelfish","Pacific rudderfish","Ruffs, barrelfishes nei","Giant gourami","Malay combtail","Banded gourami","Frail gourami","Siamese fighting fish","Spotted gourami","Eyespot gourami","Spiketail paradisefish","Snakeskin gourami","Three spot gourami","Gouramis nei","Pygmy gourami","Roundtail paradisefish","Kissing gourami","Pikehead","European barracuda","Sharpfin barracuda","Pickhandle barracuda","Obtuse barracuda","Pacific barracuda","Great barracuda","Mexican barracuda","Guachanche barracuda","Pelican barracuda","Southern sennet","Heller's barracuda","Yellowstripe barracuda","Guinean barracuda","Blackfin barracuda","Yellowtail barracuda","Bigeye barracuda","Yellowmouth barracuda","Barracudas nei","Barracudas, etc. nei","Bigeye stargazer","Sandy stargazer","Smoothlip stargazer","Sailfin stargazer","Tasselled triplefin","Carmine triplefin","Mottled twister","Giant triplefin","Southern barred triplefin","Spotted spiny-eye triplefin","Lizard triplefin","Cryptic triplefin","Lofty triplefin","Yellow triplefin","Highcrest triplefin","Blotched triplefin","Chatham deep-water triplefin","Obscure triplefin","Japanese blacktail triplefin","Spotted robust triplefin","Scaly headed triplefin","Eastern jumping blenny","Twinspot triplefin","Tropical scaly-headed triplefi","Blue-dot triplefin","Oblique-swimming triplefin","Longfinned triplefin","Bullhead triplefin","Clarke's triplefin","Black-faced blenny","Largemouth triplefin","Threefin blennies nei","Lace klipfish","Snaky klipfish","Slender platanna-klipfish","Cline","Ladder klipfish","Sad klipfish","Golden weedfish","Orange clinid","Mousey klipfish","Spotted kelpfish","Nosestripe klipfish","Grass klipfish","Leafy klipfish","Platanna klipfish","Clinids fishes nei","Dwarf blenny","Kirk's blenny","Aden blenny","Horned rockskipper","Arabian blenny","Simony's blenny","Orangedotted blenny","Butterfly blenny","Lance blenny","Giant blenny","Looseskin blenny","Striped blenny","Filamentous blenny","Montagu's blenny","Tripplespot blenny","Fourline blenny","Black blenny","Leopard blenny","Jugular blenny","Highbrow rockskipper","Oyster blenny","Barnaclebill blenny","Imspringer","Rippled rockskipper","Lined rockskipper","Scarface rockskipper","Spotted rockskipper","Spotty blenny","Fowler's rockskipper","Mangrove blenny","Fringed blenny","Pygmy blenny","Oman blenny","Arab blenny","Mekran blenny","Muzzled blenny","Omox blenny","Rock-pool blenny","Tentacled blenny","Cheekspot blenny","Tasseled blenny","Ambon rockskipper","Hepburn's blenny","Arabian fangblenny","Floral blenny","Variable sabretooth blenny","Sabertooth blenny","Townsend's fangblenny","Natal rockskipper","Barred-chin blenny","Jewelled blenny","Molly miller","Seychelle's blenny","Japanese snake blenny","Hairtail blenny","Combtooth blennies","Ragfish","Nurseryfish","Snakehead","Spotted snakehead","Striped snakehead","Indonesian snakehead","Barca snakehead","Blotched snakehead","Small snakehead","Snakeheads(=Murrels) nei","Tentacled dragonet","Dragonet","Indian deepwater dragonet","Smallhead dragonet","Blotchfin dragonet","Margaret's dragonet","Sand dragonet","Arrow dragonet","Fingered dragonet","Pygmy dragonet","Dainty dragonet","Shango dragonet","Common stinkfish","Japanese dragonet","Ladder dragonet","Lancer dragonet","Spotted stinkfish","Spotfin dragonet","Phaeton dragonet","Dragonets nei","Island kelpfish","Deep-water blenny","Galápagos four-eyed blenny","Foureye rockskipper","Sargassum blenny","Palehead blenny","Hairy blenny","Threadfin blenny","Mexican blenny","Redrump blenny","Roughhead blenny","Spinyhead blenny","Orangethroat pikeblenny","Angel blenny","Reefsand blenny","Banner blenny","Blackhead blenny","Wrasse blenny","Arrow blenny","Tufted blenny","Sarcastic fringehead","Warthead blenny","Panamanian worm blenny","Slender blenny","Longfin escolar","Carolina pygmy sunfish","Golden redfish","Norway redfish","Widow rockfish","Yellowtail rockfish","Treefish","Rosy rockfish","Olive rockfish","Blue rockfish","Pacific ocean perch","Bocaccio rockfish","Vermilion rockfish","Beaked redfish","Cape redfish","Acadian redfish","Canary rockfish","Chilipepper rockfish","Starry rockfish","Rougheye rockfish","Shortraker rockfish","Copper rockfish","Splitnose rockfish","Greenstriped rockfish","Shortbelly rockfish","Quillback rockfish","Korean rockfish","Yellowmouth rockfish","Silvergray rockfish","Black rockfish","Tiger rockfish","Redstripe rockfish","Yelloweye rockfish","Pygmy rockfish","Dusky rockfish","Stripetail rockfish","Harlequin rockfish","Northern rockfish","China rockfish","Rosethorn rockfish","Redbanded rockfish","Aurora rockfish","Sharpchin rockfish","Blackgill rockfish","Darkblotched rockfish","Patagonian redfish","Atlantic redfishes nei","Decoy scorpionfish","Black scorpionfish","Red scorpionfish","Barbfish","Plumed scorpionfish","California scorpionfish","Player scorpionfish","Pacific spotted scorpionfish","Sonora scorpionfish","Senegalese rockfish","Small red scorpionfish","Angola rockfish","Slender rockfish","Madeira rockfish","Spotted-fin rockfish","Scorpionfishes, rockfishes nei","Blackfoot firefish","Blackbelly rosefish","Red gurnard perch","Rosefishes nei","Ghanean rockfish","Offshore rockfish","Large-headed scorpionfish","Speckled scorpionfish","Lowfin scorpionfish","African spotted scorpionfish","Jenkin's scorpionfish","Humpbacked scorpionfish","Weedy stingfish","Bearded scorpionfish","Whiteblotched scorpionfish","Raggy scorpionfish","Spotfin scorpionfish","Leaf scorpionfish","Plaintail turkeyfish","Red lionfish","Broadbarred firefish","Radial firefish","Hawaiian turkeyfish","Devil firefish","Zebra turkeyfish","Twospot turkeyfish","Shortfin turkeyfish","Hawaiian lionfish","Shortspine thornyhead","Longspine thornyhead","Broadbanded thornyhead","Cape scorpionfish","Atlantic thornyhead","Spiny scorpionfish","Orange-banded scorpionfish","Channeled rockfish","Scorpionfishes nei","Shortfin searobin","Piper gurnard","Gurnards nei","Bluefin gurnard","Tub gurnard","Streaked gurnard","Cape gurnard","Gabon gurnard","Spiny red gurnard","Longfin gurnard","Lesser gurnard","Indo-Pacific gurnards","Red gurnard","Scaly gurnard","Butterfly gurnard","Carol's gurnard","Spiny gurnard","Large-scaled gurnard","Scalebreast gurnard","Bullhorn gurnard","Scalybreast gurnard","Spiny searobin","Bluewing searobin","Red searobin","Mexican searobin","Northern searobin","Atlantic searobins","Latchet(=Sharpbeak gurnard)","Spotted gurnard","Grey gurnard","Gurnards, searobins nei","Spotted coral croucher","Threefin velvetfish","Crested scorpionfish","Pitted stonefish","Onestick stingfish","Obliquebanded stingfish","Grey stingfish","Blackfin stonefish","Red Sea stonefish","Stonefish","Orangebanded stingfish","Warty prowfish","Whiskered prowfish","Lingcod","Okhotsk atka mackerel","Atka mackerel","Kelp greenling","Skilfish","Sablefish","Crocodile fish","Dwarf flathead","Spotfin flathead","Rough flathead","Japanese flathead","Spiny flathead","Tentacled flathead","Bartail flathead","Northern sand flathead","Sand flathead","Tiger flathead","Deep-water flathead","Broadhead flathead","Celebes flathead","Orange-freckled flathead","Welander's flathead","Blackblotch flathead","Thorny flathead","Halfspined flathead","Tuberculated flathead","Crocodile flathead","Guinea flathead","Flatheads nei","Antarctic horsefish","Alert pigfish","Scaled sculpin","Coralline sculpin","Rosylip sculpin","Spinynose sculpin","Sakhalin sculpin","Cherskii's sculpin","Longhorn sculpin","Plain sculpin","Shorthorn sculpin","Sculpins","Fluffy sculpin","Roughback sculpin","Buffalo sculpin","Yellow Irish lord","Dusky sculpin","Cabezon","Sharpnose sculpin","Lavender sculpin","Pacific staghorn sculpin","Belligerent sculpin","Scissortail sculpin","Jordan's sculpin","Moustache sculpin","Bigeye sculpin","Spectacled sculpin","Norway bullhead","Twohorn sculpin","Brightbelly sculpin","Snubnose sculpin","Thornback sculpin","Spineless sculpin","Smoothgum sculpin","Puget Sound sculpin","Kelp sculpin","Roughskin sculpin","Fourhorn sculpin","Longfin sculpin","Manacled sculpin","Grunt sculpin","Sculpins nei","Bighead sculpin","Stone sculpin","Baikal yellowfin","Big Baikal oilfish","Mote sculpin","Polar sculpin","Spinyhead sculpin","Smoothcheek sculpin","Pale toadfish","Northern spearnose poacher","Smooth alligatorfish","Aleutian alligatorfish","Gray starsnout","Rockhead","Fourhorn poacher","Atlantic poacher","Pygmy poacher","Tubenose poacher","Sawback poacher","Arctic alligatorfish","Blacktip poacher","Hooknose","Pricklebreast poacher","Lumpfish(=Lumpsucker)","Leatherfin lumpsucker","Smooth lumpsucker","Lumpfishes nei","Redskinfish","Fortescue","Marbled stingfish","South Australian cobbler","Bullrout","Wispy waspfish","Whiteface waspfish","Günther's waspfish","Bearded roguefish","Draco waspfish","African armoured searobin","Armoured gurnard","Robust armoured-gurnard","Spiny snailfish","Blacktail snailfish","Blotched snailfish","Spotted snailfish","Gulf snailfish","Variegated snailfish","Striped seasnail","Montagus seasnail","Kelp snailfish","Tanaka's snailfish","Pygmy snailfish","Tadpole snailfish","Bigtail snailfish","Slim snailfish","Snailfishes nei","Oriental flying gurnard","Flying gurnard","Flying gurnards nei","Red velvetfish","Short-armed waspfish","Ocellated waspfish","Painted greenling","Shortspine combfish","Short-headed sculpin","Crested sculpin","Sailfin sculpin","Mediterranean scaldfish","Imperial scaldfish","Thor's scaldfish","Cape scaldfish","Scaldback","Spotless lefteye flounder","Drab flounder","Scaldfishes nei","Angler flatfish","Blue flounder","Speckled-tail flounder","Wide-mouthed flounder","Crested flounder","Crosseyed flounder","Striped-fin flounder","Caribbean flounder","Wide-eyed flounder","Pacific eyed flounder","Mottled flounder","Leopard flounder","Eyed flounder","Pelican flounder","Slim flounder","Martens’ moonflounder","Largescale flounder","Clear fin-base flounder","Günther's flounder","Threespot flounder","Lefteye flounders nei","Scale-eye plaice","Atlantic halibut","Pacific halibut","Banded-fin flounder","European plaice","Arctic flounder","Alaska plaice","Cresthead flounder","English sole","Greenland halibut","Rikuzen flounder","Deep-sea sole","Arrow-tooth flounder","Kamchatka flounder","Petrale sole","Shotted halibut","Witch flounder","Rex sole","Willowy flounder","Comb flounder","Amer. plaice(=Long rough dab)","Flathead flounder","Flathead sole","Narrow-body righteye flounder","Peppered flounder","Southern lemon sole","Speckled sole","New Zealand sole","Tudor's flounder","Longsnout flounder","Yellowfin sole","Yellowtail flounder","Common dab","Longhead dab","Sakhalin sole","Limandas nei","Rock sole","Dusky sole","Slender sole","Slime flounder","Dover sole","Lemon sole","Derwent flounder","European flounder","Stone flounder","Starry flounder","Pacific sand sole","Yellow striped flounder","Winter flounder","Marbled flounder","Remo flounder","Sand flounder","Greenback flounder","Yellowbelly flounder","Sand flounders nei","Barfin flounder","Spotted halibut","Ridged-eye flounder","Curlfin sole","Hornyhead turbot","C-O sole","Diamond turbot","Sôhachi","Butter sole","Coloured righteye flounder","Righteye flounders nei","Black sole","Deep water sole","Solenette","Tufted sole","Common sole","Sand sole","Ovate sole","Senegalese sole","Blackhand sole","Adriatic sole","Snouted sole","Egyptian sole","Elongate sole","Stanaland's sole","Dwarf sole","Spotted sole","Wavyband sole","Wedge sole","Ocellated wedge sole","Whiskered sole","African solenette","Peacock sole","Finless sole","Zebra sole","Fringefin zebra sole","Convict zebra sole","Indian zebra sole","Unicorn sole","Bamboo sole","Cape sole","True sole","Narrowbanded sole","Commerson's sole","White-margined sole","Portuguese sole","Guinean sole","West coast sole","Mud sole","Southeast Atlantic soles nei","Foureyed sole","Thickback sole","Bastard sole","Lusitanian sole","Frechkop’s sole","Banded sole","Thickback soles nei","Oriental sole","Klein's sole","Cyclope sole","Soles nei","Fourlined tonguesole","Carrot tonguesole","Long tongue sole","Bengal tongue sole","Speckled tonguesole","Genko sole","Largescale tonguesole","Bengal toungesole","Red tonguesole","Malabar tonguesole","Canary tonguesole","Three-lined tounge sole","Senegalese tonguesole","Roughscale tonguesole","Zanzibar tonguesole","Nigerian tonguesole","Ghanian tonguesole","Guinean tonguesole","Tonguesole nei","Doublelined tonguesole","Blackbelly tonguesole","California tonguefish","Duskycheek tonguefish","Ginsburg's tonguefish","Elongate tonguesole","Blackcheek tonguefish","Vanmelle’s tonguefish","Tonguefishes","Norwegian topknot","Megrim","Four-spot megrim","Megrims nei","Topknot","Brill","Windowpane flounder","Turbot","Turbots nei","Spotted flounder","Yellow-dabbled flounder","Branched ray flounder","Twospot largescale flounder","Scale-eyed flounder","Citharids nei","Indian halibut","Spottail spiny turbot","Spiny turbot","Spiny turbots nei","Cyclope flounder","Three-spot flounder","Shrimp flounder","Fantail flounder","Bigmouth sanddab","Pacific sanddab","Speckled sanddab","Smooth flounder","Gulf Stream flounder","Sand whiff","Anglefin whiff","Bay whiff","Toothed flounder","God's flounder","Mexican flounder","Fringed flounder","Peruvian flounder","Smallmouth flounder","Bigeye flounder","Bigmouth flounder","Bastard halibut","Brazilian flounder","California flounder","Speckled flounder","Summer flounder","Fourspot flounder","Gulf flounder","Southern flounder","Fine flounder","Patagonian flounder","Bastard halibuts nei","Deep flounder","Roughscale flounder","Largetooth flounder","Javan flounder","Cinnamon flounder","Fivespot flounder","Three spotted flounder","Malayan flounder","Shoal flounder","Beach flounder","Channel flounder","Dusky flounder","Papillose flounder","Drab sole","Lined sole","Mazatlan sole","Hogchoker","Longtail sole","Antarctic armless flounder","Finless flounder","Tongue flatfish","Cockatoo righteye flounder","Huysman's righteye flounder","Flatfishes nei","Yellow boxfish","Bluetail trunkfish","Striped cowfish","Western smooth boxfish","Buffalo trunkfish","Smooth trunkfish","Rigid boxfish","Black-banded pigmy boxfish","Longhorn cowfish","Scrawled cowfish","Honeycomb cowfish","Chubby basketfish","Triangular boxfish","Humpback turretfish","Boxfishes nei","Evileye blaasop","Smooth puffer","Diamondback puffer","Oceanic puffer","Silver-cheeked toadfish","Lunartail puffer","Smooth blaasop","Half-smooth golden pufferfish","Bullseye puffer","Blunthead puffer","Checkered puffer","Northern puffer","Bandtail puffer","Atlantic puffers nei","Prickly puffer","Milkspotted puffer","Purple pufferfish","Tiger pufferfish","Obscure pufferfish","Yellowfin pufferfish","Yellowbelly pufferfish","Pufferfishes nei","Banded puffer","Spider-eye puffer","Valentin's sharpnose puffer","Starry toado","White-spotted puffer","Map puffer","Guineafowl puffer","Blackspotted puffer","Stellate puffer","Immaculate puffer","Prickly toadfish","Manystriped blowfish","Spotted puffer","Ringed toadfish","Rippled blaasop","Orange-spotted toadfish","Spiny blaasop","Puffers nei","Spotbase burrfish","Birdbeak burrfish","Hooked tonguesole","Shortheaded tonguesole","Lachner's tonguesole","Pacific burrfish","Spot-fin porcupinefish","Longspined porcupinefish","Black-blotched porcupinefish","Three-barred porcupinefish","Four-bar porcupinefish","Longspine burrfish","Deep-water burrfish","Globefish, porcupine fish","Reticulate spikefish","Trumpetsnout spikefish","Jambeau","Fleshy-lipped spikefish","Long-spined tripodfish","Short-nosed tripodfish","Black-flag tripodfish","Blacktip tripodfish","Threetooth puffer","Slender sunfish","Ocean sunfish","Sunfish","Sharptail mola","Ocean sunfishes nei","Broom filefish","Scribbled leatherjac. filefish","Unicorn leatherjacket filefish","Dotterel filefish","Orange filefish","Leatherjacket filefishes","Sandwich isle file","Whitespotted filefish ","Filefishes nei","Spiny-tailed leatherjacket","Pigmy leatherjacket","Bearded leatherjacket","Large-scaled leatherjacket","Prickly leatherjacket","Threadsail filefish","Planehead filefish","Reticulated leatherjacket","Black reef leatherjacket","Fan-bellied leatherjacket","Chinaman-leatherjacket","Red Sea longnose filefish","False puffer","Wedgetail filefish","Gulf filefish","Pig faced leather jacket","Hair-finned filefish","Velvet leatherjacket","Toothbrush leatherjacket","Yelloweye filefish","Rhinoceros leatherjacket","Fourband leatherjacket","Whitespotted pygmy filefish","Rough leatherjackets","Modest filefish","Lesser-spotted leatherjacket","Filefishes, leatherjackets nei","Orange-lined triggerfish","Grey triggerfish","Queen triggerfish","Finescale triggerfish","Bluespotted triggerfish","Clown triggerfish","Titan triggerfish","Largescale triggerfish","Rough triggerfish","Ocean triggerfish","Indian triggerfish","Black triggerfish","Red-toothed triggerfish","Yellowmargin triggerfish","White-banded triggerfish","Picasso triggerfish","Bluethroat triggerfish","Halfmoon triggerfish","Masked triggerfish","Gilded triggerfish","Outrigger triggerfish","Starry triggerfish","Triggerfishes, durgons nei","Emerald clingfish","Connemarra clingfish","Shore clingfish","Cornish sucker","Panamic clingfish","Small-headed clingfish","Chubby clingfish","Elegant clingfish","Rocksucker","Urchin clingfish","Two-spotted clingfish","Orange clingfish","Crinoid clingfish","Weedsucker","Slender clingfish","Hector's clingfish","Pygmy shore-eel","Giant clingfish","Papillate clingfish","Minute clingfish","Streaky clingfish","Southern clingfish","Bifid clingfish","Striped clingfish","Clingfishes nei","Bocon toadfish","Hairy toadfish","Pacuma toadfish","Toadfishes nei","Flat toadfish","Western frogfish","Lusitanian toadfish","White-ribbed toadfish","Two-faced toadfish","Pony toadfish","Dow's toadfish","Banded frogfish","Gulf toadfish","Guinean toadfish","Rossignol’s toadfish","Broadbodied toadfish","Cano toadfish","Grunting toadfish","Toadfishes, etc. nei","Angler(=Monk)","Blackbellied angler","American angler","Shortspine African angler","Devil anglerfish","Blackfin goosefish","Yellow goosefish","Monkfishes nei","Blackmouth angler","Spottedtail angler","Longspine African angler","Smooth angler","Natal angler","Anglerfishes nei","Glauert's anglerfish","Spotfin frogfish","Tailjet frogfish","Striated frogfish","Indian frogfish","Shaggy angler","Sargassumfish","Prickly anglerfish","Rough anglerfish","Marble-mouthed frogfish","Deep-water frogfish","Smooth anglerfish","Tasselled anglerfish","Butler's frogfish","Frogfishes nei","Pink frogmouth","Spiny sea bat","Batfish","Pancake batfish","Longnose batfish","Roundel batfish","Humpback anglerfish","Black seadevils nei","Smooth dreamer","Spiny dreamer","Dreamers nei","Triplewart seadevil","Kroyer's deep-sea angler fish","Horned lantern fish","Freshwater fishes nei","Groundfishes nei","Pelagic fishes nei","Finfishes nei","Marine fishes nei","Demersal percomorphs nei","Pelagic percomorphs nei","Diadromous fishes nei","Batoid fishes nei","Various sharks nei","Sharks, rays, skates, etc. nei","Cartilaginous fishes nei","Deep-water sharks nei","Water fleas","Brine shrimp","Brine shrimps nei","Copepods","Acorn barnacle","Scalpellidae barnacles nei","Goose barnacle","Goose barnacles nei","Lepadidae barnacles nei","Giant barnacle","Barnacle","Pacific goose barnacle","Leaf barnacle","Tanaidaceans","Fish biter","Spiny serolid isopod","Isopods, pillbugs, sowbugs","Amphipods","Rough mantis shrimp","Spottail mantis squillid","Kicking mantis shrimp","Sorcerer mantis shrimp","Catalina mantis","Bigelow mantis shrimp","Panama mantis shrimp","Small mantis shrimp","Angolan mantis srimp","Japanese squillid mantis shrim","Spotted squillid mantis shrimp","Mud mantis","Smooth squillid mantis shrimp","Red sea mantis shrimp","Smalleyed squillid mantis shri","Vietnamese squillid mantis shr","Fivespined squillid mantis shr","Common squillid mantis shrimp","Variable squillid mantis shrim","Squillids nei","Reef odontoactylid mantis shri","Pastel odontodactylid mantis s","Queen lizard mantis","Striped mantis","Lizard mantis","Smooth mantis shrimp","Common banded mantis shrimp","Robber harpiosquillid mantis s","Giant harpiosquillid mantis sh","Keeled witch mantis","Three spined mantis","Stomatopods nei","Antarctic krill","Ice krill","Pygmy krill","Spiny krill","Northern krill","Isada krill","Antarctic krill nei","Bigeye krill","Norwegian krill","Northern brown shrimp","Banana prawn","Yellowleg shrimp","Northern pink shrimp","Southern white shrimp","Kuruma prawn","Blue shrimp","Whiteleg shrimp","Giant tiger prawn","Eastern king prawn","Fleshy prawn","Caramote prawn","Aloha prawn","Redspotted shrimp","Green tiger prawn","Brown tiger prawn","Northern white shrimp","Crystal shrimp","Indian white prawn","Western king prawn","Western white shrimp","Redtail prawn","Southern pink shrimp","Sao Paulo shrimp","Southern brown shrimp","Witch prawn","Red-spot king prawn","False white prawn","Penaeus shrimps nei","Swimming shrimp","Titi shrimp","Speckled shrimp","Jinga shrimp","Yellow shrimp","Eastern school shrimp","Peregrine shrimp","Endeavour shrimp","Shiba shrimp","Kadal shrimp","Greasyback shrimp","Fire shrimp","Greentail shrimp","Wood shrimp","Western school shrimp","Demons prawn","York shrimp","Fine shrimp","Emerald shrimp","Middle shrimp","Ginger shrimp","Bird shrimp","Moyebi shrimp","Papua shrimp","Stork shrimp","Spiny greasyback shrimp","Sulu shrimp","Metapenaeus shrimps nei","Deep-water rose shrimp","Australian rose shrimp","Neptune rose shrimp","Explorer rose shrimp","Lancer rose shrimp","Flamingo shrimp","Domino shrimp","Rose shrimp","Parapenaeus shrimps nei","Kiddi shrimp","Guinea shrimp","Hawknose shrimp","Arafura shrimp","Coral shrimp","Coromandel shrimp","Spear shrimp","Dog shrimp","Torpedo shrimp","Dwarf shrimp","Parole shrimp","Rainbow shrimp","Smoothshell shrimp","Uncta shrimp","Adonis shrimp","Thin shrimp","Bally shrimp","Parapenaeopsis shrimps nei","Atlantic seabob","Pacific seabob","Xiphopenaeus shrimps nei","Hardback shrimp","Southern rough shrimp","Carabali shrimp","Roughneck shrimp","Indio shrimp","Brown rough shrimp","Pinto shrimp","Northern rough shrimp","Coarse shrimp","Zebra shrimp","Malayan rough shrimp","Yellow roughneck shrimp","Longlegged rough shrimp","Philippines rough shrimp","Smooth shrimp","Trachypenaeus shrimps nei","Needle shrimp","Megalops shrimp","Scythe shrimp","Four-spined needle shrimp","Tora velvet shrimp","Rice velvet shrimp","Whiskered velvet shrimp","Reef shrimp","Scout velvet shrimp","Kishi velvet shrimp","Caribbean velvet shrimp","Minstrel shrimp","Humpback shrimp","Broad velvet shrimp","Mogi velvet shrimp","Northern velvet shrimp","Southern velvet shrimp","Philip velvet shrimp","Pink velvet shrimp","Fiddler shrimp","Tolo velvet shrimp","Velvet shrimp","Beebe's velvet shrimp","Insular velvet shrimp","Mining shrimp","Orange shrimp","Periscope shrimp","Argentine stiletto shrimp","Penaeid shrimps nei","Pacific seabobs","Scarlet shrimp","Giant red shrimp","Indian red shrimp","Blue and red shrimp","Striped red shrimp","Arabian red shrimp","Smooth red shrimp","Stout red shrimp","Purplehead gamba prawn","Aristeus shrimps nei","Aristeid shrimps nei","Green shrimp","Coonstripe shrimp","Spot shrimp","Northern prawn","Ocean shrimp","Aesop shrimp","Dock shrimp","Humpy shrimp","Hokkai shrimp","Botan shrimp","Deep-water bigeye shrimp","Pandalus shrimps nei","Dorodotes shrimp","Chilean nylon shrimp","Madagascar nylon shrimp","Armed nylon shrimp","Humpback nylon shrimp","Smooth nylon shrimp","Mino nylon shrimp","Scarred nylon shrimp","Northern nylon shrimp","Indian nylon shrimp","Japanese nylon shrimp","Short-spined nylon shrimp","Three-spined nylon shrimp","Panama nylon shrimp","Golden shrimp","Striped soldier shrimp","Lesser striped shrimp","Gondwana striped shrimp","Catalonian striped shrimp","Striped gladiator shrimp","Italian deep-sea shrimp","Arrow shrimp","Guinea striped shrimp","Scarlet longbeak shrimp","Giant longbeak shrimp","Mexican longbeak shrimp","Colombian longbeak shrimp","Plesionika shrimps nei","Sidestripe shrimp","Morotoge shrimp","Pandalopsis shrimps nei","Hinged shrimp","Whip shrimp","Narwal shrimp","Oriental narwal shrimp","Pandalid shrimps nei","Pacific shrimps nei","Tsivakihini paste shrimp","Jawla paste shrimp","Akiami paste shrimp","Southern mauxia shrimp","Aviu shrimp","Australian paste shrimp","Northern mauxia shrimp","Taiwan mauxia shrimp","Alamang shrimp","Jembret shrimp","Sakura shrimp","Sergestid shrimps nei","Crimson coral shrimp","Banded coral shrimp","Gabon shrimp","Basket shrimp","Koros shrimp","Camacuto shrimp","Soldier brush shrimp","Ekusa shrimp","Moluccas brush shrimp","Smooth caridina","Bengal caridina","Sawtooth caridina","African caridina","Malagasy caridina","Needlenose caridina","Common caridina","Tonkin caridina","Pugnose caridina","Caridina shrimps nei","Nuka shrimp","Peaked shrimp","Subantarctic ruby prawn nei","Pacific ambereye","Japanese spinyridge","Quayle spinytail","Cipango prawn","Ridgetail prawn","Mamtom prawn","Siberian prawn","Oriental prawn","Roshna prawn","Vietnamese crest prawn","Ganges delta prawn","Bombay prawn","West African estuarine prawn","Whitebelly prawn","Spider prawn","Mississippi grass shrimp","Eastern grass shrimp","Chinese grass shrimp","Tonkin grass shrimp","Atlantic ditch shrimp","Marsh shrimp","Pond shrimp","Ebro shrimp","Lagoon shrimp","Indian small prawn","Baltic prawn","Mangrove prawn","Rockpool prawn","Chinese ditch prawn","Lake prawn","Delta prawn","Migrant prawn","Zaire prawn","Caribbean bait prawn","Common prawn","Gladiator prawn","Indian bait prawn","Potitinga prawn","Carpenter prawn","Posidonia prawn","Tropical river prawn","Barred grass shrimp","Hilton shrimp","Palaemon shrimps nei","Painted river prawn","Oriental river prawn","Shortleg river prawn","Riceland prawn","Giant river prawn","Amazonian river prawn","Monsoon river prawn","Cinnamon river prawn","Noumea river prawn","Cauque river prawn","Koua river prawn","Birma river prawn","New Caledonia river prawn","Ganges river prawn","Kaira river prawn","Congo river prawn","Rough river prawn","Sweet river prawn","Crane river prawn","Greybeard river prawn","Hawaii river prawn","Cascade river prawn","Orana river prawn","Slender river prawn","Striped river prawn","Jaro river prawn","Java river prawn","Agar river prawn","Kuncho river prawn","Philippine river prawn","Monkey river prawn","Scissor river prawn","Mountain river prawn","Malayam scale prawn","Madagascar scale prawn","Brackish river prawn","Knobtooth prawn","Ohio river prawn","Buchura river prawn","Patsa river prawn","Muff prawn","Volta river prawn","Hairy river prawn","Goda river prawn","Sunda river prawn","Longarm river prawn","Forest river prawn","Dimua river prawn","African river prawn","Hancock's river prawn","Western river prawn","Shortfinger river shrimp","Suriname river prawn","River prawns nei","Changallo shrimp","Freshwater prawns, shrimps nei","Palaemonid shrimps nei","Painted harlequin shrimp","Tanner's deep-water shrimp","Northern blunt-tail shrimp","Armoured shrimp","Spiny armoured shrimp","Panama armoured shrimp","Vicary armoured shrimp","Goblin prawn","Kuro shrimp","Japanese sand shrimp","Alaska shrimp","Common shrimp","Gray shrimp","California shrimp","Blacktailed shrimp","Bay shrimp","Sand shrimp","Crangon shrimps nei","Hardshell shrimp","Feather shrimp","Spiny shrimp","Bering shrimp","Four-spines nutshell shrimp","Sculptured shrimps nei","Areolated horned shrimp","Nutshell shrimp","Crangonid shrimps nei","Rock shrimp","Mediterranean rock shrimp","Ridgeback rock shrimp","Lesser rock shrimp","Tufted rock shrimp","Pacific rock shrimp","Knight rock shrimp","Eyespot rock shrimp","Kinglet rock shrimp","Burkenroad's rock shrimp","Coloured rock shrimp","Hardhusk rock shrimp","Keeled rock shrimp","Target shrimp","Martin's rock shrimp","Mixed rock shrimp","Peanut rock shrimp","Small peanut rock","Notched rock shrimp","Notched tidal rock shrimp","Trident shrimp","Salmon shrimp","Catherine shrimp","Argentine red shrimp","Royal red shrimp","Pleoticus shrimps nei","Veiled shrimp","Doris veiled shrimp","Hymenopenaeus shrimp nei","Kolibri shrimp","African mud shrimp","Ridgeback shrimp","Coastal mud shrimp","Flower shrimp","Guiana mud shrimp","Deep-sea mud shrimp","Chinese mud shrimp","Atlantic mud shrimp","Comb shrimp","Blossom shrimp","Razor mud shrimp","Deep-water mud shrimp","High ridge mud shrimp","Australia mus shrimp","Malayan mud shrimp","False comb shrimp","Algoa shrimp","Solenocera shrimps nei","Knife shrimp","Jack-knife shrimp","Chilean knife shrimp","Knife shrimps nei","Solenocerid shrimps nei","Spider shrimp","African spider shrimp","Spider prawns nei","Wellington shrimp","Kangaroo shrimp","Lesser glass shrimp","Japanese glass shrimp","Pink glass shrimp","White glass shrimp","Crimson pasiphaeid","Rabbitnose shrimp","Striped hinge beak shrimp","Sabre prawn","Flathead snapping shrimp","Teppo snapping shrimp","Forceps snapping shrimp","Nymph snapping shrimp","Red snapping shrimp","Daisy snapping shrimp","Bigclaw snapping shrimp","Armed snapping shrimp","Japanese snapping shrimp","Bristle snapping shrimp","Queensland snapping shrimp","Coral snapping shrimp","Telescope shrimp","Yamato shrimp","Greenland shrimp","Iso shrimp","Hunter shrimp","Companion shrimp","Cock shrimp","Shortspine shrimp","Toy shrimp","Flexed shrimp","Tsuno shrimp","Hoso shrimp","Medusa shrimp","Platenose shrimp","Flatnose shrimp","Lined shrimp","Monaco shrimp","Indian lined shrimp","Common cleaner shrimp","Cardinal shrimp","Friendly spine shrimp","Parrot shrimp","Spotted marbled shrimp","Processa shrimp","Nika shrimp","Peruvian one-handed shrimp","Processa shrimps nei","Natantian decapods nei","Longlegged spiny lobster","Japanese spiny lobster","Mexican spiny loster","Painted spiny lobster","Mud spiny lobster","Ornate spiny lobster","Royal spiny lobster","Caribbean spiny lobster","Brown spiny loster","Pronghorn spiny lobster","Smoothtail spiny lobster","Scalloped spiny lobster","Blue spiny lobster","Australian spiny lobster","Green spiny lobster","Spotted spiny lobster","Banded spiny lobster","Easter Island spiny lobster","Chinese spiny lobster","White whisker spiny lobster","Tropical spiny lobsters nei","Cape rock lobster","Juan Fernandez rock lobster","Green rock lobster","Tristan da Cunha rock lobster","Red rock lobster","Southern rock lobster","St.Paul rock lobster","Rock lobsters nei","Japanese furrow lobster","West Indian furrow lobster","Gibbon furrow lobster","Small furrow lobster","Polynesian furrow lobster","Buffalo blunthorn lobster","American blunthorn lobster","Unicorn blunthorn lobster","Japanese blunthorn lobster","Chilean jagged lobster","Cape jagged lobster","Pink spiny lobster","Common spiny lobster","Natal spiny lobster","Southern spiny lobster","Cape Verde spiny lobster","Palinurid spiny lobsters nei","Spear lobster","Oriental spear lobster","Japanese spear lobster","Spear lobsters nei","Arabian whip lobster","Banded whip lobster","Red whip lobster","Velvet whip lobster","Whip lobsters nei","Spiny lobsters nei","Pacific pincer lobster","Atlantic pincer lobster","Australian pincer lobster","Danube crayfish","Noble crayfish","Signal crayfish","Shasta crayfish","Sooty crayfish","White-clawed crayfish","Stone crayfish","European crayfishes nei","Red swamp crawfish","White crawfish","Florida crayfish","Ribbon crayfish","Procambarus crayfishes nei","Calico crayfish","Spinycheek crayfish","Rusty crayfish","Virile crayfish","Northern clearwater crayfish","Bottlebrush crayfish","Cypress crayfish","Appalachian brook grayfish","Mimic crayfish","Lavender burrowing crayfish","Ditch fencing crayfish","Pearl riverlet crayfish","Spider cave crayfish","American crayfishes nei","Giant tasmanian crayfish","Koura crayfish","Australian crayfish","Marron crayfish","Yabby crayfish","Red claw crayfish","Oceanian crayfishes nei","Velvet fan lobster","Serrate fan lobster","Glabrous fan lobster","Japanese fan lobster","Smooth fan lobster","Butterfly fan lobster","Hairy fan lobster","Sculptured mitten lobster","Caledonian mitten lobster","Red-spotted mitten lobster","Japanese mitten lobster","Easter Island mitten lobster","Marbled mitten lobster","Flathead lobster","Flathead lobsters nei","Soft locust lobster","Two-spotted locust lobster","Lesser slipper lobster","Blue-back locust lobster","Striated locust lobster","Pygmy locust lobster","Hunchback locust lobster","Locust lobsters nei","Mediterranean slipper lobster","Spanish slipper lobster","Galapagos slipper lobster","Brazilian slipper lobster","Hooded slipper lobster","Three-spot slipper lobster","Cape slipper lobster","Aesop slipper lobster","Red slipper lobster","Ridged slipper lobster","Easter Island slipper lobster","Blunt slipper lobster","Clamkiller slipper lobster","Rough spanish lobster","Small spanish lobster","Royal spanish lobster","Shield fan lobster","Slipper lobsters nei","Atlantic deep-sea lobster","Prickly deep-sea lobster","Red lobster","Sculptured lobster","Banded lobster","Mitten lobsterette","Indian Ocean lobsterette","Spinetail lobsterette","Florida lobsterette","Prickly lobsterette","Scarlet lobsterette","Ridge-back lobsterette","Gladiator lobsterette","Saya de Malha lobsterette","Ruby lobsterette","Pacific lobsterette","Two-toned lobsterette","Red and white lobsterette","Grooved lobsterette","Mozambique lobster","Andaman lobster","New Zealand lobster","Arafura lobster","Armoured lobster","Northwest lobster","Caribbean lobster","Bight lobster","Formosa lobster","Japanese lobster","Neptune lobster","Urugayian lobster","Okinawa sculptured lobster","Siboga lobster","China lobster","Red-banded lobster","Velvet lobster","Metanephrops lobsters nei","Norway lobster","American lobster","Cape lobster","European lobster","Homarus lobsters nei","Bellator lobster","Southern lobsterette","Nilenta lobsterette","True lobsters,lobsterettes nei","Fenix lobster","Musical furry lobster","Caribbean furry lobster","Indo-Pacific furry lobster","Scorpion mud lobster","Cape mud shrimp","Japanese mud shrimp","Blue mud shrimp","Mediterranean mud shrimp","Chines mud lobster","Australian ghost shrimp","Beach ghost shrimp","Bay ghost shrimp","Giant ghost shrimp","Japanese ghost shrimp","Pink ghost shrimp","Flower ghost shrimp","Cameroon ghost shrimp","Sand ghost shrimp","Ghost shrimps nei","Deep-water mud lobster","Baron mud lobster","Keeled mud lobster","Small pink lobster","Striped reef lobster","Violet-spotted reef lobster","Bullseye reef lobster","Red reef lobster","Lobsters nei","Euro-American crayfishes nei","Spiny mole crab","Toad mole crab","Big-claw purple hermit crab","Mangrove hermit crab","Tropical mole crab","Coldwater mole crab","Pacific mole crab","Striated mole crab","Coconut crab","Pelagic red crab","Carrot squat lobster","Bristle squat lobster","Stout squat lobster","Deep-water squat lobster","Radiant squat lobster","Long-clawed squat lobster","Swarming squat lobster","Rugose squat lobster","Blue squat lobster","Craylets, squat lobsters","Rough king crab","Red king crab","Blue king crab","Brown king crab","King crabs","Southern king crab","Subantarctic stone crab","Stone king crab","King crab","Golden king crab","King crabs nei","Softshell red crab","Red stone crab","Antarctic stone crab","Globose king crab","Red vermillion crab","King crabs, stone crabs nei","Right-handed hermit crabs nei","Anomuran decapods nei","Rough box crab","Spiny box crab","Spotted box crab","Nodose box crab","Flame box crab","Ornamented boxcrab","Ocellated box crab","Yellow box crab","Ridged box crab","Arched box crab","Small arched box crab","Common box crab","Giant box crab","Spectacled box crab","Shamefaced crab","Globose box crab","Flecked box crab","Havana box crab","Spoted box crab","Moon crab","Flower moon crab","Common moon crab","Paco box crab","Paromola","Japan. deep-water carrier crab","Homole crab","African ghost crab","Tufted ghost crab","Rounded ghost crab","Horned ghost crab","Common ghost crab","West african fiddler crab","Swamp ghost crab","Mangrove ghost crab","Mud crab","Lagoon land crab","Giant land crab","Chestnut crab","Mouthless land crab","Blue land crab","Longlegged land crab","Rugose land crab","Red Pacific land crab","Whitespotted land crab","Malpelo land crab","Purple land crab","Redeye sponge crab","Common sponge crab","Sleepy crab","Cannonball sponge crab","Japanese sponge crab","Spanner crab","Giant ciliate Ethusa","Square-shelled crab","Japanese rock crab","California red rock crab","Atlantic rock crab","Dungeness crab","Northern lemon rock crab","Edible crab","Jonah crab","Pacific rock crab","Toothed rock crab","Mola rock crab","Jonah crabs, rock crabs nei","African mud crab","Batwing coral crab","Marbled stone crab","Clown crab","Smooth spooner","Splendid spooner","Sawedged spooner","Spiny spooner","Punched stone crab","Spottedbelly rock crab","Beaded rock crab","Orange-hand stone crab","Smooth redeyed crab","Warty crab","Giant egg crab","Champagne crab","Mangrove stone crab","Smooth stone crab","Longfingered peeler crab","Giant stone crab","Black stone crab","Lumpy stone crab","Stridulating stone crab","Maroon stone crab","Red swimcrab","Speckled swimcrab","Sand swimcrab","Ridged swimming crab","Crucifix crab","Japanese swimming crab","Smoothshelled swimming crab","Twospined arm swimming crab","Banded-legged swimming crab","Blunt-toothed crab","Lesser swimming crab","Two-spot swimming crab","Hawaiian swimming crab","Spiny hands swimming crab","Soldier swimming crab","Charybdis crabs nei","Blue swimming crab","Iridescent swimming crab","Gazami crab","Lancer swimcrab","Blotched swimming crab","Threespot swimming crab","Rough swimcrab","Xantus swimcrab","Senegalese smooth swimcrab","Portunus swimcrabs nei","Periscope crab","Wide front swimcrab","Spiny claw swimming crab","Peppermint swimcrab","Pelagic swimcrab","Robustus swimcrab","Knobby swimcrab","Slender swimcrab","Bigfisted swimcrab","Blue crab","Marbled swimcrab","Gladiator swimcrab","Dana swimcrab","Giant swimcrab","Blunttooth swimcrab","Rugose swimcrab","Masked swimcrab","Maracaibo swimcrab","Shelling crab","Cuata swimcrab","Warrior swimcrab","Lesser blue crab","Sharptooth swimcrab","Callinectes swimcrabs nei","Sand crab","Green crab","Mediterranean shore crab","Carcinus crabs nei","Indo-Pacific swamp crab","Orange mud crab","Green mud crab","Purple mud crab","Velvet swimcrab","Wrinkled swimcrab","Blue-leg swimcrab","Arched swimming crab","Smooth swimcrab","Liocarcinus swimcrabs nei","Henslow’s swimming crab","Swimming crabs, etc. nei","Purple mangrove crab","Racer mangrove crab","Lightfoot crab","Mottled crab","Natal lightfoot crab","African matchbox crab","Marbled rock crab","Angola marsh crab","Hairy matchbox crab","Shore crab","Peregrine crab","Sundaic paddler crab","Violet vinegar crab","Pinkfingered vinegar crab","Thai vinegar crab","Rathbun's vinegar crab","Singapore vinegar crab","Tuberculated light-foot crab","Chinese mitten crab","Long-armed crab","Channel-clinging crab","Harbour spidercrab","Velvet spidercrab","Spinous spider crab","Lesser spider crab","Spiny spider crab","Maja spider crabs nei","Panamic spidercrab","Common decorator crab","Pronghorn decorator crab","Queen crab","Tanner crab","Red snow crab","Tanner crabs nei","Southern spider crab","Atlantic lyre crab","Arctic lyre crab","Toad, lyre crabs nei","Hair crab","Portly spider crab","El Dorado shrimp","West African geryon","Pink geryon","Pacific golden crab","Japanese golden crab","Austral golden crab","Indonesian golden crab","Polynesian golden crab","Deep-sea red crab","Red crab","Southwest Atlantic red crab","Golden deepsea crab","Chaceon geryons nei","Mediterranean geryon","Deep-sea crabs, geryons nei","Tidal spray crab","Nimble spray crab","Marine crabs nei","Freshwater crustaceans nei","Marine crustaceans nei","Glisten-worm solenogaster","Jawed solenogaster","Leaf-spiculed solenogaster","Articulate chiton","Stoke's chiton","Chitons nei","West Indian fuzzy chiton","Gold-flecked chiton","Northern red chiton","Portobelo chiton","Atlantic rose chiton","Eastern hanleya","Eastern beaded chiton","Eastern surf chiton","Pacific veiled chiton","Smooth glass-hair chiton","Occidental tuskshell","Stained tuskshell","Nineside toothshell","Salish toothshell","Common periwinkle","Periwinkles nei","Rough periwinkle","Hailstorm prickly-winkle","Coronate prickly-winkle","Pagoda prickly-winkle","Pyramidal prickly-winkle","Black murex","Radish murex","Ambiguous murex","Prince murex","Endive murex","Angular murex","Venus comb murex","Black-spined murex","Rarespined murex","Caltrop murex","Scalloped murex","Murex","Cabbage murex","Pink-mouthed murex","Regal murex","Banded murex","Margarita murex","Apple murex","Duplex murex","Chocolate rockshell","Callao rock shell","Two-row rock shell","Gourd rock shell","Aculeate rock shell","Alou rock shell","Belligerent rock shell","Toad purpura","Tuberose rock shell","Deltoid rock shell","Crowned rock shell","Nodose rock shell","Wide-foot purpura","Rudolph's purpura","Persian purpura","Turreted drill","Shoot rock shell","Carinate rock shell","Bent-beak murex","Snipe's bill murex","Goldmouth murex","Don Moore's murex","Messorius murex","Purple dye murex","Horned murex","Hedge hog murex","Crested murex","Blainville's murex","Adusta murex","Ramose murex","Firebrand murex","West Indian murex","Virginal murex","Francolina jopas","Wreath jopas","Vexillate jopas","Thomas' rapa whelk","Turnish shaped rapa","Sea snails","False abalone","Murex shells nei","Pink abalone","Black abalone","Southern green abalone","Red abalone","White abalone","Threaded abalone","Donkey's ear abalone","Japanese abalone","Giant abalone","Glistening abalone","Perlemoen abalone","Oval abalone","Blacklip abalone","Tuberculate abalone","Small abalone","Planate abalone","Variable abalone","Pinto abalone","Abalones nei","Snakeskin tegula","Articulate monodont","Turbinate monodont","Mutable monodont","Labio monodont","Top shell","Shining top-shell","Granular top-shell","Gualtieri's top-shell","Laugier's top-shell","Painted top-shell","Jussieu's chanculus","Adanson's gibbula","White gibbula","Red-brown gibbula","Divaricate gibbula","Chapel gibbula","Magus gibbula","Philbert's gibbula","Concave gibbula","Richard's gibbula","Umbilicate medit. Gibbula","Variegate gibbula","Cone-shaped top","Maculated top","Commercial top","Lined top","Trochus shells nei","Exasperating jujubine","Pyramid top","Fenestrate top","Dentate top shell","Common button top","Costate top","West Indian top shell","Rockpile turban","Wavy turban","Spirate turban","Rough turbo","Pacific turban","Horned turban","Stone turban","Squamate turban","Giant periwinkle","Silvermouth turban","Goldmouth turban","Green turban","Tapestry turban","Rough turban","Brown Pacific turban","Smooth moon turban","Coronate moon turban","Crass turban","Channelled turban","Chestnut turban","Turbans nei","Turban shells nei","Blood-stained turbo","Spurred turban","Carved star-shell","Imbricated star-shell","Green star-shell","Common spider conch","Giant spider conch","Chiragra spider conch","Orange spider conch","Milleped spider conch","Scorpio spider conch","Queen conch","Giant Eastern Pacific conch","Eastern Pacific fighting conch","Cock's comb conch","Granulated conch","Diana conch","Bubble conch","Dog conch","Gibbose conch","Plicate conch","Silver conch","Strawberry conch","Little pitcher conch","Samar conch","Swan conch","Widest Pacific conch","Marginate conch","Mutable conch","Laciniate conch","Variable conch","Milk conch","Roster-tail conch","Fighting conch","Hawk-wing conch","West African stromb","Three-knobbed conch","Stromboid conchs nei","Terebellum conch","Shinbone tibia","Conch shells nei","Whelk","Humphrey's buccinum","Gates' goblet","Striated buccinum","D'Orbigny's buccinum","Waved goblet","Striate pisania","Maculated ivory whelk","Mud ivory whelk","Spiral babylon","Antarctic whelk","Antarctic trophon","Pacific melongena","West Indian crown conch","Spiral melongena","Colossal melongena","Ternate melongena","Giant hairy melongena","Nutmeg melongena","Whelks","Dwarf frog shell","Purse frog shell","Common frog shell","Warty frog shell","Giant frog shell","Reddish frog shell","Frog shell nei","Pacific Scotch bonnet","Grooved helmet","Saburon helmet","Banded bonnet","Checkerboard bonnet","Grey bonnet","Spiny bonnet","Rugose bonnet","Horned helmet","Flame helmet","Emperor helmet","King helmet","Tessellate helmet","Bullmouth helmet","Helmets shells nei","Slender strombina","Dotted dove shell","Spiny slipper shell","Excavated slipper shell","Onyx slipper shell","Slipper-limpet crepidule","Nail-shaped crepidule","Goree slipper shell","American slipper-limpet","Brown cup-and-saucer","Chinese cup-and-saucer","Du Petit's spindle","Beaked fusus","Syracusan fusus","Distaff spindle","Nicobar spindle","Philippi's spindle","Prince horse conch","Salmon horse conch","Trapezium horse conch","Horse conches nei","Wooden fasciolaria","True tulip","Precious stone shell","Many-angled spindle","Brown-lined latirus","Chestnut latirus","Great keyhole limpet","Green Panama keyhole limpet","Barbados keyhole limpet","Rayed keyhole limpet","Cloudy keyhole limpet","Compressed keyhole limpet","Stromboli keyhole limpet","Lister's keyhole limpet","Giant owl limpet","File limpet","Pacific sugar limpet","Striate limpet","Broderip's moon snail","Chemnitz's moon snail","Beautifully-banded moon snail","Starry moon snail","Tiger moon snail","Calf moon snail","Gualteri's moon snail","Lined moon snail","Adanson's moon snail","Collar moon snail","Flamed moon snail","Morocco moon snail","Turton's moon snail","Hebrew moon-shell","Thousand-spotted moon-shell","Dillwyn's moon-shell","Ribboned moon-shell","Josephine's moon-shell","Eggwhite moon snail","Elephant's-foot moon snail","Chained moon-shell","Brown moon-shell","Guillemin's moon-shell","Pretty moon-shell","Entangled moon-shell","Flamed moon-shell","Bladder moon snail","Pear-shaped moon snail","Blackmouth moon snail","Seba's moon snail","Concave baby's ear","Tent olive","Redmouth olive","Amethyst olive","Purplemouth olive","Common olive","Blood olive","Tricolor olive","Black olive","Netted olice","Lettered olive","Tiger olive","Giant Mexican limpet","Rayed mediterranean limpet","Ferreous limpet","Black limpet","Rustic limpet","Rough limpet","Star-shaped limpet","Cinnabar limpet","Limpet","Mournful limpet","Limpets nei","Velvet helcion","Rayed limpet","Turtle limpet","Antarctic limpet","Depressed limpet","Kerguelen limpet","Decussate distorsio","Common distorsio","Reticulate distorsio","Humboldt's potamid","Obtuse horn shell","Girdled horn shell","Quadrate horn shell","Cut-off swamp cerith","Telescope snail","Mud creeper","Sulcate swamp cerith","Giant false limpet","Javanese false limpet","Fringed false limpet","Sirius false limpet","Pacific cask shell","Grinning tun","Helmet ton","Costate tun","Pacific partridge tun","Banded tun","Channeled tun","Spotted tun","Oily tun","Mosaic tun","Gauntlet vase","Ceram vase","Top vase","Spiny vase","Caribbean vase","Australian trumpet","Indian chank","Tuberculate kneefastia","Noble giant turrid","White keeled turrid","Lybian turrid","Indian turrid","Javanese turrid","Babylonia turrid","Common pelican-foot","Serre's pelican-foot","Hungarian cap-shell","Spicate cerithe","Mediterranean cerithe","Common cerithe","Coral cerith","Spinose cerith","Giant knobbed cerith","Necklace cerith","Banded vertagus","Common vergatus","Rough vergatus","Obelisk vergatus","Aluco vergatus","Lamellose coral-shell","Short coral-shell","Meyendorff's coral shell","Babel's latiaxis","Oil-vessel triton","Knobbed triton","Variegated triton","Corrugated triton","Cuticle-clad triton","Neapolitan triton","Shortneck triton","Nicobar hairy triton","Aquatile hairy triton","Intermediate hairy triton","Black-spotted triton","Common hairy triton","Pear triton","Angular triton","Oregon triton","Horny miter","Brown miter","Zoned miter","Adusta miter","Episcopal miter","Pontifical miter","Ebony miter","Mitres nei","Netted nassa","Thickened nassa","Filed nassa","Changeable nassa","Horned nassa","Cuvier's nassa","Gibbous nassa","Cake nassa","Coronate nassa","Burned nassa","Channeled nassa","Glans nassa","Cyclope nassa","Miran bullia","Horny auger","Monterosato's auger","Muddy auger","Screw turret","Duplicate turret","Oxpalate nerite","Chameleon nerite","Plicate nerite","Polished nerite","Costate nerite","Pitchy nerite","Flatspired nerite","Scaly nerite","Bleeding tooth","Senegal nerite","Turreted nerite","Great worm shell","Snake-like worm shell","Jellyfish worm shell","Sunburst carrier shell","Arabian cowrie","Map cowrie","Humpback cowrie","Mole cowrie","Tiger cowrie","Pacific deer cowrie","Gold ring cowrie","Eyed cowie","Boutet's cowrie","Serpent's head cowrie","Carnelian cowrie","Dragon cowrie","Depressed cowrie","Eglantine cowrie","Eroded cowrie","Isabelle cowrie","Monster cowrie","Lynx cowrie","Reticulated cowrie","Money cowrie","Walled cowrie","Onyx cowrie","Schilders' cowrie","Jester cowrie","Tummy cowrie","Histrio cowrie","Tortoise cowrie","Cowries nei","Common egg cowrie","Shuttlecock volva","Graceful fig shell","Underlined fig shell","Maculated dwarf triton","Bat volute","Diadem volute","Indian volute","Common music volute","Green music volute","Pig's snout volute","Marmorate volute","Elephant's snout volute","Neptune's volute","Olla volute","Volutes nei","Charcot's volute","Challenger volute","Golden volute","Angulate volute","Volute","Articulate harp","True harp","Major harp","Harp shells nei","Rugose iter","Little-fox miter","Lettered cone","Oak cone","Suratan cone","Beech cone","Crowned cone","Yellow Pacific cone","General cone","Leopard cone","Livid cone","Marble cone","Rayed cone","Tesselate cone","Textile cone","Mouse cone","Royal cone","Cone shells nei","Marlinspike","Fly spotted auger","Subulate auger","Sandbeach auger","Auger shells nei","Giant sundial","Clear sundial","Shoulderblade sea cat","Judas ear cassidula","Midas ear cassidula","Common pythia","Subantarctic struthiolaria","Chinese mystery snail","Round slippersnail","Gastropods nei","Greenish glauconomya","Mexican jewel box","Lazarus jewel box","Reflexed jewel box","Savigny's jewel box","Oxheart cockle","Hazelnut ark","Mossy ark","Noah's ark","Chuchoca ark","Ventricose ark","Turkey wing","Indo-Pacific ark","Ark clams nei","Hairy ark","Decussate ark","Almond ark","Lurid ark","Heavy African ark","Gambia ark","Incongruous ark","Chemnitz's ark","Globose ark","Inequivalve ark","Rudder ark","Inflated ark","Half-crenated ark","Corneous ark","Pill ark","Sowerby's ark","Half-propellor ark","Propellor ark","Blood cockle","Antique ark","Basket ark","Diluvial ark","Rusty ark","Grand ark","Mazatlan's ark","Many ribbed ark","Nodular ark","Reinhart's ark","Black ark","Eared ark","Brown ark","Senegal ark","Blood ark","Anadara clams nei","Washboard","Ohio pigtoe","Dromedary pearlymussel","Eastern pearlshell","Western pearlshell","Rainbow","Wavy-rayed lampmussel","Giant floater","Swan mussel","Triangle sail mussel","Cockscomb pearl mussel","Freshwater mussel shells","Blacklip pearl oyster","Silverlip pearl oyster","Jingle pearl oyster","Cape pearl-oyster","Japanese pearl oyster","Tiled pearl oyster","Atlantic pearl oyster","Mazatlan pearl oyster","Fringed pearl oyster","Spotted pearl oyster","Rayed pearl oyster","Pearl oysters nei","Pearl oyster shells nei","Penguin wing oyster","Western wing oyster","Swift wing oyster","European wing oyster","Wing oysters nei","Fingerprint oyster","Australian mud oyster","Red flat oyster","Chilean flat oyster","Japanese flat oyster","European flat oyster","Yaquina oyster","New Zealand dredge oyster","Denticulate rock oyster","Flat oysters nei","New Zealand rock oyster","Kegaki oyster","Philippines hooded oyster","Coral rock oyster","Palmate oyster","Hooded oyster","Sydney cupped oyster","Spiny rock oyster","Leaf oyster","Frons oyster","Angel oyster","Sand oyster","Stone oyster","Cock's comb oyster","Pacific cupped oyster","Mangrove cupped oyster","American cupped oyster","Ariake cupped oyster","Gryphea cupped oyster","Indian backwater oyster","Slipper cupped oyster","Lugubrious cupped oyster","Cortez oyster","Suminoe oyster","Columbia black oyster","Gasar cupped oyster","Cupped oysters nei","Megodon oyster","Dwarf oyster","Olympia oyster","Crested oyster","Flat and cupped oysters nei","Felippone's scallop","Tehuelche scallop","Queen scallop","Antarctic scallop","Japanese baking scallop","Modest scallop","Chinese scallop","Lunar Mexican scallop","San Diego scallop","Silken scallop","Vogde's scallop","Great Atlantic scallop","Groovesided scallop","Great Mediterranean scallop","New Zealand scallop","Southern Australia scallop","Zigzag scallop","Pecten scallops nei","Saucer scallop","Asian moon scallop","Paper moon scallop","Bifrons scallop","Smooth scallop","Proteus scallop","Flexuous scallop","Giant rock scallop","Pacific lion's paw","Lion's paw","Swift's scallop","American sea scallop","Royal cloak scallop","Cat's paw scallop","Club scallop","Calico scallop","Atlantic bay scallop","Peruvian calico scallop","Pacific calico scallop","Variegated scallop","Iceland scallop","Farrer's scallop","Noble scallop","Doughboy scallop","Spiny scallop","Hind's scallop","Senatorial scallop","Little bay scallop","Scaly Pacific scallop","Scallop","Cloak scallop","Flatribbed scallop","Leopard scallop","Distant scallop","Box scallop","Singapore scallop","Weathervane scallop","Yesso scallop","Delicate scallop","Patagonian scallop","Scallops nei","Ocean quahog","Korean mussel","Californian mussel","Chilean mussel","New Zealand blue mussel","Blue mussel","Kerguelen mussel","Norhtern blue mussel","River Plata mussel","Mediterranean mussel","Australian mussel","Mytilus mussels nei","Guyana swamp mussel","Strigate mangrove mussel","Reeve's mangrove mussel","Arcuate mussel","Atlantic ribbed mussel","Hooked mussel","European date mussel","Pacific date mussel","Cylinder date mussel","Date mussels nei","Senhouse horse mussel","Box mussel","Distorted mussel","Choro mussel","Black mussel","Pinpricked mussel","Eared horse mussel","Bearded horse mussel","Kurilean horse mussel","Yellowbanded horse mussel","Northern horse mussel","Philippine horse mussel","Capax horse mussel","Tulip mussel","Offshore horse mussel","Straight horse mussel","Shiny mussel","Rhomboid mussel","False tulip mussel","Adriatic horse mussel","Furrowed horse mussel","Horse mussels nei","South American rock mussel","Green mussel","New Zealand mussel","Indian brown mussel","African mussel","Perna mussels nei","Cholga mussel","Sea mussels nei","Striped venus","King's littleneck","Pullet carpet shell","Golden carpet shell","Banded carpet shell","Corrugated venus","Durable venus","Purple amiantis","West Indian pointed venus","Squamose venus","Smooth callista","Cross-barred venus","Kellett's Panama venus","King venus","Stutchbury's venus","Common Californian venus","Smooth Pacific venus","Ornate venus","Frilled Californian venus","Small banded venus","Semi-rough venus","African venus","Chamber venus","Koch's venus","Magellan clam","Peruvian yellow clam","Discrepant venus","Forked venus","Tumid venus","Comb venus","Venus nei","Equilateral venus","Hiant venus","Japan venus","Marbled venus","Camp pitar venus","Ornate pitar venus","Calico clam","Sunray venus","Fertile venus","Ovate clam","Japanese hard clam","Asiatic hard clam","Backwater hard clam","Lyrate hard clam","Spotted hard clam","Hard clams nei","Golden callista","Squalid callista","Princess venus","Youthful venus","Many-ridged venus","Clathrate venus","Reticulated venus","Grooved carpet shell","Japanese carpet shell","Variegated carpet shell","Carpet shells nei","Ridged pitar venus","Royal comb venus","Lightning venus","Rostrate pitar","Self-coloured pitar","Yellow pitar venus","Pellucid pitar venus","Rough pitar venus","Swollen venus","Tiar venus","Turgid venus","Lettered venus","Belcher's venus","Gay's little venus","Hians tivela","Triangular tivela","Pismo clam","Ventricose tivela","Byron tivela","Flat tivela","Triple venus","Tivelas nei","Heart venus","Rigid venus","Warty venus","Plicate venus","Script venus","Oriental cyclina","Mauve sunetta","Truncate sunetta","Venus clam","Butter clam","Common butter clam","Purple butter clam","Butter clams nei","Undulate venus","Rooster venus","Textile venus","Semigrooved venus","Short neck clams nei","Pacific littleneck clam","Taca clam","Rough littleneck","Columbian littleneck","Lesser littleneck","Brazilian comb venus","Thin-shelled littleneck","Northern quahog(=Hard clam)","Southern hardshell clam","Dosinia clam","Dunker's dosinia","Japanese dosinia","Ponderous dosinia","Mature dosinia","Smooth dosinia","Dosinias nei","Fine clam","Venus clams nei","Imperial surf clam","Rugose mactra","Common otter shell","Narrow otter shell","Oblong otter shell","Elongate mactra","Common rangia","Western Mexican rangia","Fat horse clam","Japanese horse clam","Pacific horse clam","Pacific horse clams nei","Maidenhair mactra","Pellucid mactra","Panamic winged mactra","Chinese trough shell","Wedge trough shell","Discors trough shell","Globose clam","Ihering's trough shell","Smooth mactra","Isabel surf clam","Lilac trough shell","Luzon troughshell","Maculated troughshell","Plain troughshell","Large trough shell","Symmetrical trough shell","Agate troughshell","Violet troughshell","Rayed trough shell","Grey rough shell","Largilliert's mactra","Polished mactra","Rostrate mactra","Californian mactra","Concealed surf clam","Trough shells nei","Glassy mactra","Atlantic surf clam","Stimpson's surf clam","Equal-sized surf clam","Oval surf clam","Solid surf clam","Subtruncate surf clam","Surf clams nei","Caribbean surf clam","Taquilla clams","Mactra surf clams nei","Giant bittersweet","Common European bittersweet","Speckled bittersweet","Black bittersweet","Pilose bittersweet","Reeve's bittersweet","Lined bittersweet","Violet bittersweet","Two-spotted bittersweet","Scripta bittersweet","Vovan bittersweet","Comb bittersweet","Tessellated bittersweet","Honeycomb oyster","Wrinkled oyster","Spoon oyster","Common galatea clam","Rough butterfly donax","Californian donax","Sculptured donax","Cuneate donax","Common Caribbean donax","Toothed donax","Pacific bean donax","Gracile donax","La Plata donax","Fleshy donax","Common peruvian donax","Punctate donax","Rugose donax","Leather donax","Half-striated donax","Striate donax","Truncate donax","Banded donax","Goolwa donax","Bean donax","Smooth donax","Lovely donax","Beautiful donax","Donax clams","Giant false donax","Tall false donax","Smooth false donax","Delessert's false donax","Rostrate false donax","Sharp razor clam","Javanese razor clam","Cylindrical razor shell","European razor clam","Akemate razor shell","Cape razor clam","Kemp's razor shell","Malacca razor shell","Pink-spotted razor shell","Rough jackknife","Gould's razor shell","Rostrate jackknife","Grand razor shell","Lamarck's razor shell","Guinea razor shell","Solen razor clams nei","Arched razor shell","Atl.jackknife(=Atl.razor clam)","Pod razor shell","Giant jackknife","Sword razor shell","Goree razor clam","Ensis razor clams nei","Pacific razor clam","Dall's razor clam","Sunset razor clam","Winter's razor clam","African knife shell","Razor clams, knife clams nei","Sand gaper","Blunt gaper","Gaper nei","Pacific geoduck","Aldovrandi's panope","Common hemidonax","Common jingle shell","Peruvian jingle shell","Abalone jingle shell","Violet batissa","Equilateral marsh clam","Carolina marsh clam","Common geloina","Broad geloina","Triangular mash clam","Inflated marsh clam","Slender marsh clam","Bengali geloina","Common Indian marsh clam","Japanese corbicula","Manila clam","Asian clam","Freshwater clams nei","Common basket lucina","Elegant basket lucina","Spiny cockle","European prickly cockle","Poorly ribbed cockle","Sand cockle","Tuberculate cockle","Olive green cockle","Common edible cockle","Costate cockle","Gaping cockle","Bulow's cockle","Basket cockle","Giant atlantic cockle","Japanese cockle","Paper cockle","Folded lagoon cockle","Norwegian egg cockle","Giant Pacific egg cockle","Oblong egg cockle","Common egg cockle","Egg cockles nei","Coloured lagoon cockle","Consors' cockle","American prickly cockle","Even cockle","American yellow cockle","Mexican cockle","Slender cockle","Pacific yellow cockle","Giant Pacific cockle","Reddish cockle","Angulate cockle","Orbit cockle","Wrinkled cockle","White strawberry cockle","Pacific half cockle","Pacific strawberry cockle","Atlantic strawberry cockle","True heart cockle","Broad cockle","Asiatic cockle","Chinese cockle","Greenland smoothcockle","Cockles nei","Striate beach clam","Pipi wedge clam","Corneous wedge clam","Macha clam","Yellow wedge clam","Tuatua wedge clam","Toheroa wedge clam","Flat tree oyster","Pacific tree oyster","Janus tree oyster","Saddle tree oyster","Wader tree oyster","Rayed tree oyster","Giant clam","Smooth giant clam","Fluted giant clam","Crocus giant clam","Elongate giant clam","Giant clams nei","Bear paw clam","China clam","Antarctic soft-shell clam","Truncate lantern clam","Spiny file shell","Common file shell","Inflated file shell","Rathbun's giant file shell","Giant file shell","Rough lima","Antarctic airy limopsis","Toothless lucine","Atlantic tiger lucine","Pacific tiger lucine","Interrupted lucine","Punctate lucine","Corrugate lucine","Divergent lucine","Pale lucina","Northern lucina","Pennsylvania lucine","Straight hammer oyster","White hammer oyster","Black hammer oyster","Kerguelen malletia","Broad ribbed cardita","Antique cardita","Tankerville's cardita","Twotoned cardita","Antarctic cardita","Ajar cardita","Halfround cardita","Olive ark","Kerguelen nut shell","Antarctic yoldia","White piddock","Pacific mud piddock","Dilate piddock","Manila piddock","Truncate barnea","Angel wing","Pacific coast angel wing","Oriental angel wing","Common piddock","Striate martesia","Talona pholaad","Brittle pen shell","Comb pen shell","Maura pen shell","Tuberculate pen shell","Flag pen shell","Chautard's pen shell","Pen shells nei","Noble pen shell","Rugose pen shell","Bicolor pen shell","Prickly pen shell","Rough pen shell","Elongate sunset clam","Minor sunset clam","Courtesan sunset clam","Squamose sunset clam","Truncate sunset clam","Depressed sunset clam","Faeroe sunset clam","Sunset clams nei","Western small false donax","Chinese sanguin","Nuttall's mahogany clam","Varnish clam","Operculate sanguin","Pacific asaphis","Diphos sanguin","Radiate semele","Bark semele","Chilean semele","Semeles nei","Constricted tagelus","Dombey's tagelus","Stout tagelus","Californian tagelus","Duckbill tagelus","Adanson's tagelus","Small short razor","Antique razor clam","Divaricate short razor","Rasp short razor","Bean solen","Atlantic thorny oyster","European thorny oyster","Digitate thorny oyster","Donkey thorny oyster","Pacific thorny oyster","Ducal thorny oyster","Bearded thorny oyster","Butler's thorny oyster","Imperial thorny oyster","Golden thorny oyster","Thorny oysters nei","Short macoma","Constricted macoma","Grand macoma","Bentnose macoma","White sand macoma","Cancellate panope","Fleshy tellin","Alternate tellin","Flat tellin","Cross tellin","Virgate tellin","Lacerate tellin","Similar red tellin","Foliated tellin","Cat's tongue tellin","Palate tellin","Remies tellin","Rasp tellin","Timor tellin","Glossy tellin","Beautiful tellin","Delicate tellin","Hyaline tellin","Senegambian tellin","Thin tellin","Tellins nei","Saddle grooved macoma","Paper tellin","Fragile tellin","Hooked ark","Windowpane oyster","Saddle oyster","Edible shipworm","Siamese shipworm","Undulated false lucine","False angel wing","Peppery furrow","Mediterranean awning clam","Paper thracia","Pubescent thracia","Zebra mussel","Dark falsemussel","Santo Domingo falsemussel","Clams, etc. nei","Koch’s bottletail squid","Southern bottletail squid","Striped dumpling squid","Needle cuttlefish","Common cuttlefish","African cuttlefish","Elegant cuttlefish","Pink cuttlefish","Andrea cuttlefish","Giant Australian cuttlefish","Arabian cuttlefish","Southern cuttlefish","Slender cuttlefish","Shortclub cuttlefish","Guinean cuttlefish","Golden cuttlefish","Kobi cuttlefish","Broadclub cuttlefish","Longarm cuttlefish","Spider cuttlefish","Kisslip cuttlefish","Madokai's cuttlefish","Reaper cuttlefish","Frog cuttlefish","Oman cuttlefish","Pharaoh cuttlefish","Hooded cuttlefish","Curvespine cuttlefish","Broadback cuttlefish","Trident cuttlefish","Giant African cuttlefish","Magnificent cuttlefish","Patchwork cuttlefish","Stumpy cuttlefish","Bartlett's cuttlefish","Knifebone cuttlefish","Ovalbone cuttlefish","Ken’s cuttlefish","Hedley’s cuttlefish","Papuan cuttlefish","Striking cuttlefish","Small striped cuttlefish","Little cuttlefish","Large striped cuttlefish","Rosecone cuttlefish","Smith’s cuttlefish","Starry cuttlefish","Grooved cuttlefish","Viet Nam cuttlefish","Voss’ cuttlefish","Whitley’s cuttlefish","Zanzibar cuttlefish","Cuttlefishes nei","Paintpot cuttlefish","Flamboyant cuttlefish","Japanese spineless cuttlefish","Spineless cuttlefish","Ornate cuttlefish","Sotty cuttlefish","Web’s cuttlefish","Sepiella cuttlefishes nei","Cuttlefish, bobtail squids nei","Odd bobtail squid","Stumpy bobtail squid","Japanese bobtail squid","Stout bobtail squid","Bully bobtail squid","North Pacific bobtail squid","Tortuga bobtail squid","Antilles bobtail squid","Big-eyed bobtail squid","Big bottom bobtail squid","Leucoptera bobtail squid","Humming-bird bobtail squid","Mimika bobtail squid","Southern bobtail squid","Dwarf bobtail squid","Analogous bobtail squid","Atlantic bobtail squid","Golden bobtail squid","Butterfly bobtail squid","Intermediate bobtail squid","Tongue bobtail squid","Robust bobtail squid","Steenstrup's bobtail squid","Spotty bobtail squid","Knobby bobtail squid","Sepiola bobtail squids nei","Lentil bobtail squid","Elegant bobtail squid","Mysterious bobtail squid","Common bobtail squid","Greater shining bobtail squid","Lesser shining bobtail squid","Carol bobtail squid","Little squid","Patagonian squid","Opalescent inshore squid","Mitre squid","Longfin squid","Swordtip squid","Spear squid","Beka squid","European squid","Kobi squid","Indian squid","Cape Hope squid","Veined squid","Japanese squid","Bigeye inshore squid","Slender inshore squid","Island inshore squid","Sao Paulo squid","Siboga squid","Surinam squid","Common squids nei","Southern reef squid","Bigfin reef squid","Caribbean reef squid","Reef squids nei","European common squid","Midsize squid","African squid","Alloteuthis squids nei","Western Atlantic brief squid","Guinean thumbstall squid","Panama brief squid","Thumbstall squids nei","Dart squid","Bartsch's squid","Long barrel squid","Inshore squids nei","Glassy flying squid","Neon flying squid","Webbed flying squid","Orangeback flying squid","Flying squids nei","Atlantic bird squid","Shiny bird squid","Northern shortfin squid","Broadtail shortfin squid","Argentine shortfin squid","Sharptail shortfin squid","Shortfin squids nei","Lesser flying squid","Jumbo flying squid","Luminous flying squid","Purpleback flying squid","European flying squid","Antarctic flying squid","Japanese flying squid","Angolan flying squid","Todarodes flying squids nei","Wellington flying squid","Gould's flying squid","Hawaiian flying squid","Nototodarus flying squids nei","Sevenstar flying squid","Ommastrephidae squids nei","Various squids nei","Greater hooked squid","Smooth hooked squid","Japanese hooked squid","Rugose hooked squid","Robust clubhook squid","Hooked squids nei","Angel squid","Common clubhook squid","Boreal clubhook squid","Atlantic cranch squid","Armed cranch squid","Antarctic cranch squid","Greater argonaut","Knobby argonaut","Argonauts nei","Turquet's octopus","Antarctic octopuses","Gloomy octopus","Tehuelche octopus","Big blue octopus","Whiparm octopus","White-spotted octopus","Common octopus","Brownstriped octopus","Sandbird octopus","Caribbean reef octopus","Chestnut octopus","Lilliput longarm octopus","North Pacific giant octopus","Marbled octopus","Globe octopus","Bumblebee octopus","Pygmy octopus","Lobed octopus","Mexican four-eyed octopus","Webfoot octopus","Spider octopus","Moon octopus","Atlantic banded octopus","Octopuses nei","Horned octopus","Musky octopus","Combed octopus","Horned and musky octopuses","North Atlantic octopus","Globose octopus","Spiney-horn octopus","January octopus","Dana octopus","Map octopus","Unihorn octopus","Old woman octopus","Fourhorn octopus","Antarctic knobbed octopus","Yellow octopus","Patagonian giant octopus","Octopuses, etc. nei","Long-armed squid","Umbrella squid","Flowervase jewell squid","Elongate jewell squid","Reverse jewell squid","Scaled squid","Coffeebean scaled squid","Pfeffer's enope squid","Jewel enope squid","Verany's enope squid","Sharpear enope squid","Roundear enope squid","Sparkling enope squid","Smallfin gonate squid","Schoolmaster gonate squid","Berryteuthis gonate squids nei","Boreopacific gonate squid","Mako gonate squid","Boreoatlantic gonate squid","Madokai gonate squid","Shortarm gonate squid","Atlantic gonate squid","Gonate squids nei","Deep-sea squid","Ornate arm squid","Common arm squid","Arm squids nei","Ruppell's octopus squid","Dana octopus squid","Diamondback squid","Glacial squid","Antarctic neosquid","Umbrella octopus nei","Emperor nautilus","Bellybutton nautilus","Ram's horn squid","Toothed-fin squid","Disc-fin squids nei","Palmate octopus","Tuberculate octopus","Cephalopods nei","Freshwater molluscs nei","Marine molluscs nei","Marine shells nei","Steller sea lion","Northern fur seal","California sea lion","Australian sea lion","New Zealand sea lion","South American fur seal","Guadalupe fur seal","South African fur seal","Juan Fernandez fur seal","Galapagos fur seal","Antarctic fur seal","New Zealand fur seal","Subantarctic fur seal","Fur seals nei","South American sea lion","Walrus","Mediterranean monk seal","Caribbean monk seal","Hawaiian monk seal","Northern elephant seal","Southern elephant seal","Ross seal","Leopard seal","Harp seal","Harbour seal","Ringed seal","Ribbon seal","Caspian seal","Baikal seal","Larga seal","Weddell seal","Bearded seal","Hooded seal","Grey seal","Crabeater seal","Seals nei","Sea otter","Marine otter","Polar bear","Dugong","West Indian manatee","Amazonian manatee","West African manatee","Ganges River dolphin","Indus River dolphin","Cuvier's beaked whale","Sherpherd's beaked whale","Blainville's beaked whale","Gray's beaked whale","Ginkgo-toothed beaked whale","Hector's beaked whale","Hubbs' beaked whale","Pigmy beaked whale","Sowerby's beaked whale","Gervais' beaked whale","True's beaked whale","Strap-toothed whale","Andrews' beaked whale","Stejneger's beaked whale","Beaked whales nei","Northern bottlenose whale","Southern bottlenose whale","Longman's beaked whale","Arnoux's beaked whale","Baird's beaked whale","Sperm whale","Irrawaddy dolphin","Australian snubfin dolphin","False killer whale","Long-finned pilot whale","Short-finned pilot whale","Pilot whales nei","Pygmy killer whale","Common dolphin","Long-beaked common dolphin","Risso's dolphin","Melon-headed whale","Tucuxi","Guyana dolphin","Atlantic hump-backed dolphin","Indo-Pac. hump-backed dolphin","Rough-toothed dolphin","Killer whale","Northern right whale dolphin","Southern right whale dolphin","Commerson's dolphin","Heaviside's dolphin","Hector's dolphin","Black dolphin","Pacific white-sided dolphin","Dusky dolphin","White-beaked dolphin","Atlantic white-sided dolphin","Hourglass dolphin","Peale's dolphin","Bottlenose dolphin","Indo-Pacif. bottlenose dolphin","Fraser's dolphin","Pantropical spotted dolphin","Spinner dolphin","Striped dolphin","Atlantic spotted dolphin","Clymene dolphin","Spotted dolphins nei","Dolphins nei","Harbour porpoise","Burmeister's porpoise","Vaquita","Spectacled porpoise","Finless porpoise","Dall's porpoise","White whale","Narwhal","Pygmy sperm whale","Dwarf sperm whale","Boto","Baiji","Franciscana","Toothed whales nei","Minke whale","Bryde's whale","Sei whale","Blue whale","Fin whale","Antarctic minke whale","Humpback whale","Balaenoptid whales nei","Northern right whale","Southern right whale","North Pacific right whale","Bowhead whale","Gray whale","Pygmy right whale","Baleen whales nei","Aquatic mammals nei","Indian green frog","Crab-eating frog","Asiatic bull frog","Indian skipper frog","Indian rice frog","Agile frog","European frog","European green frog","Common frog","Greek frog","Red-legged frog","American bull frog","Pig frog","Northern leopard frog","River frog","Frogs","African bull frog","African clawed frog","Chilean frog","Chinese giant salamander","Leatherback turtle","Common slider","Diamondback terrapins","Diamond back terrapins","Kemp's ridley turtle","Olive ridley turtle","Flatback turtle","Eastern Pacific green turtle","Green turtle","Hawksbill turtle","Loggerhead turtle","Chinese softshell turtle","Wattle-necked softshell turtle","Malayan softshell turtle","River and lake turtles nei","Marine turtles nei","Stokes' sea snake","Beaked sea snake","Annulated sea snake","Short sea snake","Small-headed sea snake","Pelagic sea snake","Viperine sea snake","Erabu sea snake","Broad-nosed caiman","Paraguayan caiman","Spectacled caiman","American alligator","Chinese alligator","Estuarine crocodile","Siamese crocodile","Australian crocodile","Nile crocodile","New Guinea crocodile","Cuban crocodile","Morelet's crocodile","American crocodile","Slender-snouted crocodile","Orinoco crocodile","Philippine crocodile","Mugger crocodile","African dwarf crocodile","False gharial","Gharial","Black caiman","Cuvier's Dwarf caiman","Smooth-fronted caiman","Crocodiles and alligators nei","Sooty albatross","Light-mantled sooty albatross","Amsterdam Island albatross","Southern royal albatross","Wandering albatross","Gibson's albatross","Northern royal albatross","Antipodean albatross","Tristan albatross","Laysan albatross","Black-footed albatross","Waved albatross","Short-tailed albatross","Indian yellow-nosed albatross","Campbell albatross","Black-browed albatross","Buller's albatross","Shy albatross","Atlant. yellow-nosed albatross","Grey-headed albatross","Chatham Islands albatross","Salvin's albatross","White-capped albatross","Albatrosses nei","Flesh-footed shearwater","Pink-footed shearwater","Great shearwater","Sooty shearwater","Short-tailed shearwater","Fluttering shearwater","Huttons shearwater","Wedge-tailed shearwater","Audubon's shearwater","Balearic shearwater","Manx shearwater","Yelkouan shearwater","Shearwaters nei","White-chinned petrel","Grey petrel","Parkinson's petrel","Westland petrel","Spectacled petrel","Petrels nei","Great-winged petrel","Kerguelen petrel","White-headed petrel","White-necked petrel","Gould's Petrel","Providence petrel","Mottled petrel","Trindade petrel","Bermuda petrel","Black-capped petrel","Antarctic petrel","Antarctic giant petrel","Hall's giant petrel","Giant petrels nei","Southern fulmar","Northern fulmar","Cory's shearwater","Cape Verde shearwater","Cape petrel","Antarctic prion","Fairy prion","Prions nei","Lesser snow petrel","Greater snow petrel","Snow petrels nei","Blue petrel","Tahiti petrel","Petrels and shearwaters nei","Wilson's storm petrel","Black-bellied storm petrel","B/W bellied storm petrels nei","European storm-petrel","Leach's storm-petrel","White-faced storm petrel","Common teal","Eurasian wigeon","Mallard","Greylag goose","Pink-footed goose","Bean goose","Tufted duck","Greater scaup","Brent goose","Canada goose","Barnacle goose","Common goldeneye","Long-tailed duck","Whooper swan","Mute swan","White-winged scoter","Black scoter","Goosander","Red-breasted merganser","Steller's eider","Common eider","King eider","Common shelduck","Ducks, geese and swans nei","Great skua","South polar skua","Brown skua","Chilean skua","Antarctic tern","Great crested tern","Sooty tern","Arctic tern","Common tern","Terns nei","Kelp gull","Silver gull","Herring gull","Laughing gull","Audouin's gull","Yellow-legged gull","Great black-backed gull","Mew gull","Lesser black-backed gull","Iceland gull","Glaucous gull","Sabine's gull","Common black-headed gull","Seagulls nei","Ivory gull","Black-legged kittiwake","Arctic skua","Skua","White-tailed sea-eagle","Adelie penguin","Chinstrap penguin","Gentoo penguin","Macaroni penguin","Rockhopper penguin","King penguin","Penguins nei","White-billed diver","Black-throated diver","Great northern diver","Red-throated diver","Snowy sheathbill","Imperial shag","European shag","Great cormorant","Cormorants nei","Australasian gannet","Northern gannet","Cape gannet","Masked booby","Boobies and gannets nei","South Georgia diving petrel","Atlantic puffin","Dovekie","Black guillemot","Common murre","Thick-billed murre","Razorbill","Grey heron","Horned grebe","Great crested grebe","Red-necked grebe","Xenophyophores","Bryozoans","Pterobranchs","Glass sponges","Honey comb","Sheepswool sponge","Elephant ear","Yellow sponge","Glove sponge","Greek bathing sponge","Reef sponge","Shiny sponge","Leather sponge","Sponges","Airy finger sponge","Orange frond sponge","Ostrich egg sponge","Rubber sponge","Fibreglass cup sponge","Maroon pimpled ear sponge","Siliceous sponges","Cnidarians nei","Wello fire coral","Red hydrocorals nei","Spiny white hydrocorals nei","Hydrocorals","Hydrozoans","Hydroids, hydromedusae","Common jellyfish","Cannonball jellyfish","Jellyfishes nei","Sardinia coral","Aka coral","Momo, boke magai, misu coral","Shiro, white coral","Angel skin coral","Garnet coral","Midway deep-sea coral","Precious corals nei","Catch bowl coral","Branch coral","Staghorn coral","Finger coral","Brush coral","Beadlet anemone","Girdle anemone","Snakelocks anemone","Golden anemone","Ice-cube tray coral","Leaf coral","Shoulderblade coral","Pillar coral","Cactus coral","Fungus coral","Brain trumpet coral","Bushy hard coral","Head coral","Curved mushroom coral","Distorted mushroom coral","Elongate mushroom coral","Common mushroom coral","Rough feather coral","Spiny mushroom coral","Bowl coral","Feather coral","Blue coral","Hermit anemone","Merulina coral","Brain root coral","Largebrain root coral","Lettuce coral","Cauliflower coral","Elkhorn cora","Rasp coral","Brocoli coral","Thin birdsnest coral","Birdsnest coral","Smooth cauliflower coral","Small star coral","Smooth star coral","Brain coral","Organpipe coral","Black coral","Umimatsu, pine coral","Wire coral","Unbranched bamboo coral","Branched bamboo coral","Sea plume","Gorgonians","Sea strawberry","Splitting fan coral","Flabellum cup corals nei","Bubble gum coral","Red trees","Long polyp soft corals nei","Madrepora coral","Hard corals, madrepores nei","Black corals and thorny corals","Zoanthids","Sea anemones","Soft corals","Sea pens","Brachiopods, lamp shells","Annelid worms","Sea mouse","Bloodworm","Ragworm","Quill worm","Segmented worms nei","Serpulid tube worms","Lugworm","Black lug, Runnydown","Eunice sea-worms","Thermiphione scaleworms","Gallery worm","Bristleworms nei","Feather duster worm","Marine worms","Peanut worm","Giant sea spiders nei","Sea spiders","Horseshoe crab","Tri-spine horseshoe crab","Mangrove horseshoe crab","Echinoderms","Red starfish","Cat's-foot star","Cross-fish","Magnificent sea-star","Abyssal star","Geometric star","Five-spined star","Armless stars","Pentagon star","Trojan star","Rock star","Sladen's star","Pentagonal tooth-star","Sun-star","Chubby sun-star","Rat-tail stars nei","Starfishes nei","Deepsea brittle star","Waite’s snake-star","Gorgons head basket-stars nei","Basket, brittle, snake stars","Brittle and snake stars","Basket stars","Japanese sea urchin","Red sea urchin","Sea urchins nei","Blue-spotted sea urchin","Porcupine sea urchin","Crowned sea urchin","Harpooner sea urchin","Green sea urchin","Deepsea urchin","Stony sea urchin","European edible sea urchin","Deepsea kina","Chilean sea urchin","Black sea urchin","Purple Pacific sea urchin","Hedgehog sea urchin","Circular sea bisquit","Violet sea urchin","Striped sea urchin","Sea egg","Giant keyhole sand dollar","Slitted sand dollar","Parasol urchin","Umbrella urchin","Pencil urchins","Banded-spine urchin","Microsoft mouse","Matheson’s heart urchin","Purple-heart urchin","Fleming’s urchin","Sea urchins, etc. nei","Surf redfish","Hairy blackfish","Deep-water redfish","Panning's blackfish","New Caledonia blackfish","Chalky cucumber","Leopard fish","Brownspotted sandfish","Brown sandfish","Cotton spinner","Sand fish","Black teatfish","Lollyfish","White teatfish","Bottleneck sea cucumber","Pinkfish","Snake fish","White threads fish","Elephant trunkfish","Blackspotted sea cucumber","Giant red sea cucumber","Prickly redfish","Amber fish","Giant sea cucumber","Four-sided sea cucumber","Japanese sea cucumber","Curryfish","Greenfish","Royal cucumber","Selenka's sea cucumber","Sea cucumbers nei","Feather stars and sea lilies","Ciona","Sea potato","Sea squirt","Red oyas","Red bait","Red sea squirt","Grooved sea squirt","Rock violet","Sand violet","Sea squirts nei","Salps","Aquatic invertebrates nei","Sea spirulina","Spirulina nei","Unicell. Chlorella green alga","Hairy chaetomorpha","Floating chaetomorpha","Green sea cushion","Branched sea cushion","Fragile codium","Sea mustard","Toothed sloton","Small seagrape","Coarse seagrape","Green sea feather","Green sea palm","Leafy caulerpa","Caulerpa seaweeds","Sea cactus","Green laver","Flat green nori","Hollow green nori","Welded green nori","Dark green nori","Bright green nori","Sea lettuce","Lacy sea lettuce","Chicory sea lettuce","Green seaweeds","Brown leafweed","Tangle","Japanese kelp","Sea belt","North European kelp","Kelps nei","Babberlocks","Arboreal ferret","Wakame","Wakame nei","Chilean kelp","Southern brown kelp","Giant kelp","Kelp nei","Bladder wrack","Toothed wrack","Adriatic wrack","Common rockweed","North Atlantic rockweed","Wracks nei","Sea thong","Bull kelp","Golden Cystoseira","Rough-stemmed sargassum","Double-bladed sargassum","Flat-stemmed sargassum","Common sargassum","Serrate sargassum","Common Pacific sargassum","Fusiform sargassum","Crowned sea bell","Triangular sea bell","Sea bell","Sweet-smelling seaweed","Olive forked ribbons","Limu lipoa","Forked ribbons","Mozuku","Brown seaweeds","Crozier weed","Tufted sea moss","Tattered sea moss","Robust sea moss","Membraneous phyllophora","Phyllophora nei","Rock chickory","False sea pine","Elkhorn sea moss","Zanzibar weed","Spiny eucheuma","Mottled sea club","Eucheuma seaweeds nei","Marine bindweed","Plocamium","Rough coral moss","Fine coral moss","Pacific coral moss","Lithothamnion","Stone weed","Chalk weed","Red forkweed","False gorgon","Leather gracilaria","Arcuate gracilaria","Dichotomously branched gracila","Segmented gracilaria","Spiny gracilaria","Broadleaf gracilaria","Veiled gracilaria","Warty gracilaria","Gracilaria seaweeds","Prostrate gracilaria","Clawed sea moss","Dulse","Sea spaghetti","Carragheen (Irish) moss","Skottsberg's gigartina","Iridea","Iridea nei","Hackle weed","Spurweed","Gigartina seaweeds nei","Ribboned nori","Spotted nori","Purple laver","Pink laver","Laver (Nori)","Frilled nori","Nori nei","Velvet ceramium","Common ceramium","Pacific ceramium","Ballia","Red panache","Corsican moss","Red seabroom","Blunt laurenzia","Pacific laurenzia","Swollen laurenzia","Erect sea moss","Cladodonta","Red delesseria","Moniliform sea moss","Magellanic ptilonia","Red harpoon","Red sea plume","Harpoon seaweeds","Giant gelidium","Hairy gelidium","Red gelidium","Dwarf gelidium","Japanese isinglass","Gelidium seaweeds","Spanish agar","Chaffweed","Manifold callophyllis","Red sea lettuce","Landlady's Wig","Fleshy dilsea","Red seaweeds","Neptune-grass","Eel-grass","Dwarf eel-grass","Sea nymph","Tule bulrush","Tule nei","Aquatic plants nei","Seaweeds nei","Seagrasses nei"];
var pokedex = [];

process.stdout.write("\n********************************START********************************\n");

levelup("./test.db", function(err, db) {
    if (!db) db = {};
	//var client = new Client(null, cfg.main.proxy);
	var client = new Client(cfg.main.proxy2);
	client.setChannel("test/fishing");
	client.start();

	client.on('hi', () => { client.setName('钓鱼') });
	var iface = require("readline").createInterface({input: process.stdin, output: process.stdout});

	iface.on("line", function(line) {
		if(doCommands({
			m: "a",
			a: line,
			p: client.getOwnParticipant(),
			t: Date.now()
		})) {
			if(line.trim().length > 0) {
				sendChat(line);
			}
		}
	});

	function receiveChat(msg) {
		process.stdout.write("\n"+
			//new Date(msg.t).toString()+"\n"+
			msg.p.name+":\n"+
			"\t"+msg.a+"\n");
		if(msg.p.id !== client.participantId) {
			last_chatter = msg.p.name;
		}
	};

	var chat_send_buffer = [];
	function sendChat(message) {
		if(message[0] == "/") {
			message[0] = "∕";
		}
		var arr = [];
		while(message.length > 511) {
			arr.push(message.substr(0, 511));
			message = "…"+message.substr(511);
		}
		arr.push(message);
		for(var i = 0; i < arr.length; i++) {
			chat_send_buffer.push({m: "a", message: arr[i]});
		}
	};
	setInterval(function() {
		if(client.isConnected()) {
			var msg = chat_send_buffer.shift();
			if(msg) {
				client.sendArray([msg]);
			}
		}
	}, 2000);

	client.on("c", function(msg) {
		for(var i = 0; i < msg.c.length; i++) {
			receiveChat(msg.c[i]);
		}
	});

	client.on("a", function(msg) {
		receiveChat(msg);
		doCommands(msg);
	});

	var exchange = new Exchange(db);

	function underline(text) {
		var result = "";
		for(var i = 0; i < text.length; i++) {
			result += text[i]+"̲";
		}
		return result;
	}

	function listOff(arr) {
		if(arr.length === 0) return "(none)";
		var map = {};
		map.__proto__.inc = function(key) {
			if(key.indexOf("(") !== -1)
					key = key.substr(0, key.indexOf("(") - 1);
			if(typeof(this[key]) === "undefined") {
				this[key] = 1;
			} else {
				this[key]++;
			}
		}
		for(var i = 0; i < arr.length; i++) {
			map.inc(arr[i]);
		}
		var count = 0;
		for(var j in map) {
			if(map.hasOwnProperty(j)) ++count;
		}
		var result = "";
		var i = 0;
		for(var j in map) {
			if(!map.hasOwnProperty(j)) continue;
			if(i && i !== count - 1) result += ", ";
			if(i && i === count - 1) result += " and ";
			result += "◍"+j+" x"+map[j];
			++i;
		}
		return result;
	}

	function startupSound() {
		client.sendArray([{m: "n", t: Date.now()+client.serverTimeOffset,
			n: [{n:"e6",v:0.1},{d:50, n:"c7",v:0.2}]}]);
	}

	function magicRando(arr) {
		var result = "";
		for(var i = 0; i < 256; i++) {
			result = arr[Math.floor(Math.random() * arr.length)];
			if(result.indexOf("(") !== -1)
					result = result.substr(0, result.indexOf("(") - 1);
			var md5 = crypto.createHash("md5");
			md5.update(result + "intermediaflatulencebuzzergiantroosterface");
			var hash = md5.digest();
			var rando = hash.readUInt8(0) / 0xff + 0.5;
			if(new Date().getDay() === 4) rando += 0.25;
			if(rando > 1) rando = 1;
			if(Math.random() < rando) {
				break;
			}
		}
		return result;
	}

	if(0) for(var i = 0; i < fish.length; i++) {
		result = fish[i];
		if(result.indexOf("(") !== -1)
				result = result.substr(0, result.indexOf("(") - 1);
		var md5 = crypto.createHash("md5");
		md5.update(result + "intermediaflatulencebuzzergiantroosterface");
		var hash = md5.digest();
		var rando = hash.readUInt8(0) / 0xff + 0.5;
		if(rando > 1) rando = 1;
		process.stdout.write(result+": "+rando+". ");
	}

	db.getPokemon = function(id, cb) {
		var key = "pokemon collection~"+id;
		db.get(key, function(err, value) {
			if(err || !value || value == "") {
				cb([]);
				return;
			}
			var result = [];
			value = value.split("\xff");
			for(var i = 0; i < value.length; i++) {
				var v = value[i].trim();
				if(v.length) result.push(v);
			}
			cb(result);
		});
	}

	db.putPokemon = function(id, arr) {
		var result = "";
		for(var i = 0; i < arr.length; i++) {
			var v = arr[i];
			if(!v) continue;
			v = v.trim();
			if(v.length > 0) {
				if(i) result += "\xff";
				result += v;
			}
		}
		var key = "pokemon collection~"+id;
		if(result.length)
			db.put(key, result);
		else
			db.del(key);
	}

	db.getFish = function(id, cb) {
		var key = "fish sack~"+id;
		db.get(key, function(err, value) {
			if(err || !value || value == "") {
				cb([]);
				return;
			}
			var result = [];
			value = value.split("\xff");
			for(var i = 0; i < value.length; i++) {
				var v = value[i].trim();
				if(v.length) result.push(v);
			}
			cb(result);
		});
	}

	db.putFish = function(id, arr) {
		var result = "";
		for(var i = 0; i < arr.length; i++) {
			var v = arr[i];
			if(!v) continue;
			v = v.trim();
			if(v.length > 0) {
				if(i) result += "\xff";
				result += v;
			}
		}
		var key = "fish sack~"+id;
		if(result.length)
			db.put(key, result);
		else
			db.del(key);
	}

	db.appendFish = function(id, arr) {
		db.getFish(id, function(myfish) {
			myfish = myfish.concat(arr);
			//console.log(id, myfish);
			db.putFish(id, myfish);
		});
	}

	db.getFruits = function(cb) {
		var key = "kekklefruit tree";
		db.get(key, function(err, value) {
			if(err || !value || value == "") {
				cb(0);
				return;
			}
			cb(parseInt(value));
		});
	}

	db.setFruits = function(num_fruits) {
		var key = "kekklefruit tree";
		db.put(key, num_fruits);
	}

	function kekklefruit_growth() {
		var minute = 60 * 1000;
		var ms = 1000 + Math.random() * 120 * minute;
		setTimeout(function() {
			db.getFruits(function(num_fruits) {
				db.setFruits(num_fruits + 1);
				kekklefruit_growth();
			});
		}, ms);
	}

	kekklefruit_growth();

	function remove_one_fruit() { // unuse?
		db.getFruits(function(num_fruits) {
			db.setFruits(num_fruits - 1);
		});
	}

	function rainstorm() {
		var minute = 60 * 1000;
		var ms = 1000 + Math.random() * 72 * 60 * minute;
		setTimeout(function() {
			var duration = 6 + Math.random() * 24;
			for(var i = 0; i < duration; i++) {
				sendChat("1");
			}
			rainstorm();
		}, ms);
	}

	rainstorm();

	function catchFish(part, silent) {
		var entry = "Missingno";
		//if(Math.random() > 0.05) {
			var type = magicRando(fish);
			if((new Date().getDay() & 1) && Math.random() < 0.25) type = "Small Bass";
			var size = (["small", "medium-sized", "rather large", "large"])[Math.floor(Math.random()*3)];
			if(size == "large" && Math.random() > 0.975) size = "Golden";
			if(!silent) sendChat("Our good friend " +part.name+" caught a "+size+" "+type + "!  ready to /eat or /fish again");

			entry = type + " (" + size + ")";

			if(fish_without_images.indexOf(type) == -1) {
                /*client.sendArray([
                    { m: "admin pass", password: "some random password", 
                    msg: { 
                        m: "sendnotification",
                        content: {
                            title: "\""+type+"\"", 
                            who: client.channel._id,
                            text: "", 
                            html: "",
                            target: "#piano",
                            duration: 7000,
                            class: "",
                            id: "Fish-caught"
                        }
                    }}
                ]);*/
			}
		/*} else {
			// rarer fish
			var type = magicRando(newfish);
			var stuff = ["Special catch!", "Let us all give recognition.", "Ahoy!", "Wow!", "Nice.", "Nice!", "Great!", "Sweet!", "Sweet,", "That's cool,", "Cool!", "Neat...", "Neat!", "Wow,", "Rad.", "Funk yeah!!", "omg", "like whoah,","Great success.","Good news everyone,","I have something importrant to say.","I have something important to say.","This is cool news..","I have something to report:","Good job!","Here's something...","Whoah!!","Oh! Oh! This is a good one.","Check it","Luck!!", "Lucky!", "In luck,","Excellent.","Oh my!","A rarer fish.","Rarer fish...","Rare!","Rare fish!","An uncommon fish!!","This is less common!","Score!","Uncommon fish!", "Uncommon fish caught!","Uncommon get!","Uncommon fish get!","This uncommon fish is brought to you by Microsoft. What are you doing to do today?","Uncommon fish sponsored by Heineken ----"];
			var exclamation = stuff[Math.floor(Math.random() * stuff.length)];
			if(!silent) sendChat(exclamation+" "+part.name+" caught a "+type + ".");

			entry = type;
		}*/

		db.getFish(part._id, function(myfish) {
			myfish.push(entry);
			db.putFish(part._id, myfish);

			if(myfish.length > 30 && myfish.length % 5 === 0) {
				if(!silent) sendChat("Our friend " +part.name+"'s fish sack grows ever larger.");
			}
		});
	};

	function bonusTry(part) {
		var key = "fishing~"+part._id;
		var bonus = getBonusById(part._id);
		if(bonus > 0) {
			setTimeout(function() {
				db.get(key, function(err, value) {
					if(value) {
						catchFish(part);
						giveBonus(part._id, -0.1);
						db.del(key);
					}
				});
			}, 5000 + Math.random() * 10000 + Math.max((2-bonus) * 10000, 0));
		}
	}

	function catchTrap(part) {
		var types = ["Blue Whale", "Giant Squid", "Giant Pacific Octopus", "Giant Oceanic Manta Ray", "Southern Elephant Seal", "Sperm Whale", "Giant Oarfish", "Whale Shark", "Japanese Spider Crab"];
		var type = magicRando(types);
		sendChat("Our friend " +part.name+" is getting a bite.");
		sendChat("Unfortunate catch!  It's a "+type+"...!");
		types = ["boom", "crash", "kaboom", "smash", "kersplash"];
		sendChat(types[Math.floor(Math.random()*types.length)]+"... "+types[Math.floor(Math.random()*types.length)]+"...");
		sendChat("Some of the fish were lost in the disaster...");

		sendChat("(not really. that part is disabled. just testing)");

		/*db.getFish(part._id, function(myfish) {
			var org = myfish.length;
			var keep = Math.floor(org * 0.2);
			myfish = myfish.slice(0, keep + 1);
			db.putFish(part._id, myfish);
		});*/
	};

	function catchPokemon(part, silent) {
		var pok = pokedex[Math.floor(Math.random() * pokedex.length)];
		db.getPokemon(part._id, function(pokemon) {
			//pokemon.push(pok.name);
			var count = pokemon.length;
			db.putPokemon(part._id, pokemon);

			var key2 = "name to user id~"+part.name+"~"+Date.now().toString(36);
			db.put(key2, part._id);

			var key2 = "user id to name~"+part._id+"~"+Date.now().toString(36);
			db.put(key2, part.name);

			if(!silent)
				sendChat(part.name + " received a " + pok.name.toUpperCase()+" for joining! By my count, "+part.name+" now has "+count+" individual pokemón.");
			
			//sendChat("/hug " + part.name.toLowerCase());
		});
	};

	function findParticipantByName(name) {
		if(!name || name.trim() == "") return undefined;
		for(var id in client.ppl) {
			if(client.ppl.hasOwnProperty(id) && client.ppl[id].name === name) {
				return client.ppl[id];
			}
		}
		return undefined;
	};

	function findParticipantByNameCaseInsensitive(name) {
		if(!name || name.trim() == "") return undefined;
		var part = findParticipantByName(name);
		if(!part) {
			name_lc = name.toLowerCase();
			for(var id in client.ppl) {
				if(client.ppl.hasOwnProperty(id) && client.ppl[id].name.toLowerCase() === name_lc) {
					part = client.ppl[id];
					break;
				}
			}
		}
		return part;
	};

	function findParticipantByNameFuzzy(name) {
		if(!name || name.trim() == "") return undefined;
		name = name.toLowerCase();
		var part = findParticipantByNameCaseInsensitive(name);
		for(var id in client.ppl) {
			if(client.ppl.hasOwnProperty(id) && client.ppl[id].name.toLowerCase().indexOf(name) === 0) {
				part = client.ppl[id];
				break;
			}
		}
		for(var id in client.ppl) {
			if(client.ppl.hasOwnProperty(id) && client.ppl[id].name.toLowerCase().indexOf(name) !== -1) {
				part = client.ppl[id];
				break;
			}
		}
		return part;
	};

	function doCommands(msg) {
		if(msg.p._id == "7383d882e9210f58b260ff61") return;
		if(msg.a[0] == "∕" && msg.p.id !== client.participantId) {
			msg.a[0] = "/";
		}
		/*if(!msg.a.match(/^\/.+/)) {
			return;
		}*/
		var args = msg.a.split(" ");
		var cmd = args[0].toLowerCase();
		args = args.slice(1);
		var argcat = function(start, end) {
			var parts = args.slice(start || 0, end || undefined);
			var result = "";
			for(var i = 0; i < parts.length; i++) {
				result += parts[i];
				if(i + 1 < parts.length) {
					result += " ";
				}
			}
			return result;
		};

		if(cmd === "/help" || cmd === "/about" || cmd === "/commands") {
			//sendChat("This is a test to see what leveldb is like. Commands: /put <key> <value>, /get <key>, /del <key>, /read [<start> [<end>]] \t"+underline("Fishing")+": \t/fish, /cast (starts fishing), /reel (stops fishing), /caught [name] (shows fish you've caught), /eat (eats one of your fish), /give [name] (gives fish to someone else), /steal [name] (steals fish from someone else)");
			sendChat(underline("Fishing")+": \t/fish, /cast (starts fishing), /reel (stops fishing), /caught [name] (shows fish you've caught), /eat (eats one of your fish), /give [name] (gives fish to someone else), /give_[number] [name] (give up to 100 at a time), /pick (picks fruit from the tree)");
			return;
		}
		if(cmd === "/name" && msg.p.id === client.participantId) {
			client.sendArray([{m: "userset", set: {name: argcat()}}]);
			return;
		}
		if(cmd === "/ch" && msg.p.id === client.participantId) {
			client.sendArray([{m: "ch", "_id": argcat()}]);
			return;
		}
		if(cmd === "/catch_fish" && msg.p.id === client.participantId) {
			var num = parseInt(argcat() || 1) || 1;
			for(var i = 0; i < num; i++) {
				setTimeout(function() {
					catchFish(msg.p, true);
				}, i * 100);
			}
			return;
		}
		if(cmd === "/give_fish_silently" && msg.p.id === client.participantId) {
			var part = findParticipantByNameFuzzy(argcat()) || msg.p;
			catchFish(part, true);
			return;
		}
		if(cmd === "/_20k" && msg.p.id === client.participantId) {
			//var part = findParticipantByNameFuzzy(argcat()) || msg.p;
			//catchFish(part, true);
			var keks = ["butter kek", "rice kek", "chocolate kek", "chocolate covered kek", "strawberry kek", "strawbarry kek", "sugar kek", "banana kek", "apple kek", "fish kek"];
			var more_keks = ["butter kek", "chocolate kek", "chocolate covered kek"];
			var arr = [];
			for(var i = 0; i < 20000; i++) {
				if(Math.random() < 0.25) {
					arr.push(keks[Math.floor(Math.random()*keks.length)]);
				} else if(Math.random() < 0.5) {
					arr.push(more_keks[Math.floor(Math.random()*more_keks.length)]);
				} else {
					arr.push(pokedex[Math.floor(Math.random() * pokedex.length)].name);
				}
			}
			db.appendFish(argcat(), arr);
			return;
		}
		if(cmd === "/_sand" && msg.p.id === client.participantId) {
			db.getFish(argcat(), function(myfish) {
				for(var i = 0; i < myfish.length; i++) {
					myfish[i] = "Sand";
				}
				db.putFish(argcat(), myfish);
				sendChat("What a terrible night to have a curse.");
			});
			return;
		}
		/*if(cmd === "/give_pokemon_silently" && msg.p.id === client.participantId) {
			var part = findParticipantByNameFuzzy(argcat()) || msg.p;
			catchPokemon(part, true);
			return;
		}*/
		if(cmd === "/ppl") {
			var list = "";
			for(var id in client.ppl) {
				if(client.ppl.hasOwnProperty(id)) {
					list += ", " + client.ppl[id].name;
				}
			}
			list = list.substr(2);
			sendChat("ppl: " + list);
			return;
		}
		if(cmd === "/user") {
			var part = findParticipantByNameFuzzy(argcat()) || msg.p;
			sendChat("Our friend " + msg.p.name + ": " + JSON.stringify(part));
			return;
		}
		if(cmd === "/color" || cmd === "/colour") {
			if(args.length == 0) return;
			var color;
			if(args[0].match(/^#[0-9a-f]{6}$/i)) {
				color = new Color(args[0]);
			} else {
				var part = findParticipantByNameFuzzy(argcat()) || msg.p;
				if(part) color = new Color(part.color);
			}
			if(!color) return;
			sendChat("Friend " + msg.p.name +": That looks like "+color.getName().toLowerCase());
			return;
		}
		if(cmd === "/pokedex" || cmd === "dex") {
			var pkmn = pokedex[args[0]];
			if(pkmn && pkmn.id) {
				var text = pkmn.id + ", " + pkmn.name + " (";
				var n = 0;
				for(var i in pkmn.type) {
					if(n) text += " / ";
					text += pkmn.type[i];
					++n;
				}
				text += ") (\"" + pkmn.classification + "\")";
			}
		}
		/*if(cmd === "/migrate_pokemon" && msg.p.id === client.participantId) {
			var count = 0;
			db.createReadStream({
				start: "0",
				end: "f~"
			})
			.on("data", function(data) {
				if(data.key.match(/^[0-9a-f]{24}~POKEMON$/i)) {
					var id = data.key.match(/[0-9a-f]{24}/)[0];
					var pok = [];
					data = data.value.split(" ");
					for(var i = 0; i < data.length; i++) {
						if(data[i] && data[i].trim().length) {
							pok.push(data[i].trim());
						}
					}
					putPokemon(id, pok);
					++count;
				}
			})
			.on("end", function() {
				sendChat("Migrated " + count + " records.");
			});
		}*/
		/*if(cmd === "/pokemon_count") {
			var arr = [];
			var count = 0;
			db.createReadStream({
				start: "pokemon collection~",
				end: "pokemon collection~~"
			})
			.on("data", function(data) {
				if(data.key.match(/^pokemon collection~[0-9a-f]{24}$/i)) {
					count += data.value.split("\xff").length;
					arr.push(data);
				}
			})
			.on("end", function() {
				var results = arr.sort(function(a,b) {
					return (a.value.split("\xff").length < b.value.split("\xff").length ? 1 : -1);
				});
				var names = [];
				var id = results[0].key.match(/[0-9a-f]{24}/)[0];
				db.createReadStream({
					start: "user id to name~"+id+"~",
					end: "user id to name~"+id+"~~",
					limit: 1
				})
				.on("data", function(data) {
					names.push(data.value);
				})
				.on("end", function() {
					var id = results[1].key.match(/[0-9a-f]{24}/)[0];
					db.createReadStream({
						start: "user id to name~"+id+"~",
						end: "user id to name~"+id+"~~",
						limit: 1
					})
					.on("data", function(data) {
						names.push(data.value);
					})
					.on("end", function() {
						var id = results[2].key.match(/[0-9a-f]{24}/)[0];
						db.createReadStream({
							start: "user id to name~"+id+"~",
							end: "user id to name~"+id+"~~",
							limit: 1
						})
						.on("data", function(data) {
							names.push(data.value);
						})
						.on("end", function() {
							var message = "By my count, there are "+count+" pokémon. Top pokémon owners: ";
							for(var i = 0; i < 3; i++) {
								if(i) message += ", ";
								message += (i+1) + ". " + names[i] + ": " + (results[i].value.split("\xff").length);
							}
							sendChat(message);
						});
					});
				});
			});
			return;
		}*/
		if(cmd === "/fish_count") {
			var count = 0;
			var arr = []
			db.createReadStream({
				start: "fish sack~",
				end: "fish sack~~"
			})
			.on("data", function(data) {
				if(data.key.match(/^fish sack~[0-9a-f]{24}$/i)) {
					arr.push(data);
					data = data.value.split("\xff");
					for(var i = 0; i < data.length; i++) {
						if(data[i].trim().length)
							++count;
					}
				}
			})
			.on("end", function() {
				var message = "Friend " + msg.p.name+": By my count, there are "+count+" fish in the fish sacks. The largest sacks are: ";
				if(arr.length < 1) {
					sendChat("0");
					return;
				}
				console.log(arr[0].key, arr[1].key, arr[2].key);
				var results = arr.sort(function(a,b) {
					return (a.value.split("\xff").length < b.value.split("\xff").length ? 1 : -1);
				});

				var names = [];
				var id = arr[0].key.match(/[0-9a-f]{24}/)[0];
				db.createReadStream({
					start: "user id to name~"+id+"~",
					end: "user id to name~"+id+"~~",
					limit: 1
				})
				.on("data", function(data) {
					names.push(data.value);
				})
				.on("end", function() {
					var id = arr[1].key.match(/[0-9a-f]{24}/)[0];
					db.createReadStream({
						start: "user id to name~"+id+"~",
						end: "user id to name~"+id+"~~",
						limit: 1
					})
					.on("data", function(data) {
						names.push(data.value);
					})
					.on("end", function() {
						var id = arr[2].key.match(/[0-9a-f]{24}/)[0];
						db.createReadStream({
							start: "user id to name~"+id+"~",
							end: "user id to name~"+id+"~~",
							limit: 1
						})
						.on("data", function(data) {
							names.push(data.value);
						})
						.on("end", function() {
							for(var i = 0; i < 3; i++) {
								if(i) message += ", ";
								message += (i+1) + ". " + names[i] + ": " + (results[i].value.split("\xff").length);
							}
							sendChat(message);
						});
					});				
				});
			});
			return;
		}
		if(cmd === "/names") {
			var user_id;
			var part = findParticipantByNameFuzzy(argcat()) || msg.p;
			if(!part) {
				if(!argcat().match(/^[0-9a-f]{24}$/)) {
					sendChat("Friendly friend " + msg.p.name+": wrong");
					return;
				}
				user_id = argcat();
			} else {
				user_id = part._id;
			}
			var results = [];
			db.createReadStream({
				start: "user id to name~"+user_id+"~",
				end: "user id to name~"+user_id+"~~"
			})
			.on("data", function(data) {
				if(results.indexOf(data.value) === -1)
					results.push(data.value);
			})
			.on("end", function() {
				if(results.length == 0) {
					sendChat("Friend " + msg.p.name+": no results");
					return;
				}
				var append = "";
				if(results.length > 10) {
					var len = results.length;
					results = results.slice(0, 9);
					append = " (and " + (len - 10) + " more)";
				}
				var message = "Friend " + msg.p.name +": Found names are ";
				for(var i = 0; i < results.length; i++) {
					if(i) message += ", ";
					if(i && i === results.length - 1)
						message += "and ";
					message += results[i];
				}
				sendChat(message+append);
			});
			return;
		}
		if(cmd === "/ids") {
			var name = argcat() || msg.p;
			name = name.toLowerCase();
			var results = [];
			db.createReadStream({
				start: "name to user id~",
				end: "name to user id~~"
			})
			.on("data", function(data) {
				if(data.key.toLowerCase().indexOf(name) !== -1)
					results.push(data.value+"("+data.key+")");
			})
			.on("end", function() {
				if(results.length == 0) {
					sendChat("Friend " + msg.p.name+": no results");
					return;
				}
				var message = "Friend " + msg.p.name +": ";
				for(var i = 0; i < results.length; i++) {
					if(i) message += ", ";
					if(i && i === results.length - 1)
						message += "and ";
					message += results[i];
				}
				sendChat(message);
			});
			return;
		}
		/*if(cmd === "/battle") {
			sendChat("our friend " + msg.p.name + ": Please choose your pokemon.  For help, try /help help");
			return;
		}*/
		if(cmd === "/hug") {
			var part = findParticipantByNameFuzzy(argcat());
			if(part) {
				var huges = ["a sloppy wet hug", "a rough, aggressive hug", "a squeeze", "an affectionate hug",
				"a deep, passionate hug", "a \"tongue hug\"", "a snug hug"];
				var hug =  huges[Math.floor(Math.random() * huges.length)];
				sendChat("Our friend " + msg.p.name + " gave " + part.name + " " + hug);
			} else {
				var message = "Friend " + msg.p.name + " missed and the hug went everywhere.";
				if(Math.random() < 0.25) {
					message += " Some of it went into the water and love was felt by the fish inside."
				}
				sendChat(message);
			}
			return;
		}
		if(cmd === "/fish" || cmd === "/cast") {
			var key = "fishing~"+msg.p._id;
			db.get(key, function(err, value) {
				if(value) {
					sendChat("Friend " + msg.p.name+": Your lure is already in the water (since "+((Date.now()-parseInt(value))/1000/60).toFixed(2)+" minutes ago)."); // If you want to /cast it again, you have to /reel it in, first.  (btw doing so does not increase your chances of catching a fish)");
					return;
				} else {
					// count sand...
					db.getFish(msg.p._id, function(myfish) {
						var sand_count = 0;
						for(var i = 0; i < myfish.length; i++) {
							if(myfish[i].toLowerCase() == "sand") sand_count++;
						}
						if(sand_count > 100) {
							sendChat("By my count, "+msg.p.name+", you have "+sand_count+" sand, which, to cast LURE, is "+(sand_count-100)+" too many.  /eat or /give some sand in order to /fish");
						} else {
							// normal fishing.
							sendChat("Our friend " + msg.p.name+" casts LURE into a water for catching fish.");
							bonusTry(msg.p);
							db.put(key, Date.now().toString());
						}
					});
					
				}
			});
			return;
		}
		if(cmd === "/reel") {
			var key = "fishing~"+msg.p._id;
			db.get(key, function(err, value) {
				if(!value) {
					sendChat("Friend " + msg.p.name+": You haven't /casted it.");
					return;
				} else {
					sendChat("Our friend " + msg.p.name+" reel his/her lure back inside, temporarily decreasing his/her chances of catching a fish by 100%.");
					db.del(key);
				}
			});
			return;
		}
		if(cmd === "/pick") {
			db.getFruits(function(num_fruits) {
				if(num_fruits > 0) {
					db.setFruits(num_fruits - 1);
					db.appendFish(msg.p._id, ["kekklefruit"]);
					sendChat("Our friend "+msg.p.name+" picked 1 fruit from the kekklefruit tree and placed it into his/her fish sack.");
				} else {
					var options = ["The tree is devoid of fruit.", "The tree is without fruit.", "The tree is barren.", "The tree is missing all its fruit.", "The tree is not with fruit.", "The tree is without fruit.", "The tree is not showing any fruit.", "The tree is not bearing fruit.", "The tree has not borne fruit.", "The tree is not showing fruit.", "The tree is not carrying fruit.", "The tree is not holding fruit.", "The tree is at 0 fruit.", "The tree has no fruit.", "The tree doesn't have any fruit to give.", "The tree doesn't have any fruit to take.", "The tree doesn't have any fruit left to plunder...", "The tree has not grown any new fruit.", "The tree can't give any more fruit right now.", "The fruit have all been taken.", "The fruit have all been picked.", "You don't see any fruit on the tree.", "Your hand is without fruit.  After reaching to pick one", "No fruit because there aren't any on the tree.", "No kekklefruit was upon the tree.", "The tree has long slender limbs, barren of fruit.", "The tree's limbs are not currently baring any fruit.", "This tree doesn't have fruit.", "Fruit are not a thing currently on the tree.", "Could not get fruit.", "Try again, please.", "(no fruit picked)", "It just doesn't have any fruit.", "There aren't any fruit.", "Can't get fruit, there's no fruit.", "The tree's not growing!!!!!!!", "Give the tree some time to grow fruit.", "The tree will grow fruit given time.", "The tree will have fruit again.", "The tree's just sitting there.  Fruitless.", "It'll grow fruit, give it a second.", "Keep trying, but wait until the tree has fruit.", "Wait until the tree has fruit.", "Pick again in a bit because the tree doesn't have any fruit right now.", "There aren't any fruit on the kekklefruit tree", "You pore over each branch meticulously looking for fruit, but are still coming back empty.", "You scour every branch of the tree for fruit, but still came back empty-handed.", "You try caressing the tree's body.  It didn't work.", "You try tugging on one of the branches.  It doesn't work.", "You started picking the fruit when you heard a sound or something that distracted you and made you forget what you were doing.  Then, you remember:  you tried to pick a fruit.  You take a deep breath and decide to try again", "You could have sworn you were wrapping your hand around a sweet kekklefruit, but it seemingly disappeared from reality right as you grasped it??", "No fruit.", "Trying again, there were no fruit to pick.", "There were no fruit to pick.", "There was no fruit for you to pick.", "There isn't anything that looks like a fruit growing on the tree, yet...", "The fruit just isn't edible yet.", "It's not ready, keep trying though.", "It's not ready...!", "It's not done.", "Wait, give it time to grow fruit.", "Just wait for the fruit to grow.", "Wait for the fruit to grow.  But don't wait until someone else grabs it first.", "You have to give the precious kekklefruits time to grow.", "Hold on, they're growing.", "Hold on.", "Watch the kekklefruit to make sure they have grown before picking them from the tree.", "Don't pick the kekklefruit until they're grown.", "The kekklefruit are still maturing.", "There isn't a pickable kekklefruit.", "You don't see any.", "I don't see any.", "It's like every time the tree grows fruit somebody is stealing it.", "Every time the tree grows fruit, somebody picks it.", "There's no fruit, so wait.", "Keep trying to get fruit.", "The fruit will be fine... when it grows.", "The fruit will do fine.  Then, pick it.", "The fruit looks like you could almost pick it!", "Picking is not available right now.", "Please try again later.", "No fruit.", "Look here.  Look there.  No fruit anywhere.", "The fruit just isn't there to pick.", "You can't pick the fruit because it's not ready to be picked.", "Don't pick the fruit until it finishes growing into a pickable fruit.", "Let the fruit grow, first.", "The tree is out of fruit.", "The tree's fruit count remains 0.", "Tree fruit unavailable.", "You try, but there's no fruit.", "The tree ran out of fruit.", "No pickable fruit.", "People took the tree's fruit.", "The tree was picked over entirely.", "The tree just didn't have any more fruit to give.", "The tree asked you to try again, please.", "The tree branches looked sinister with no fruit on them at all.", "Without its fruit, the tree looks kinda scary.", "The tree doesn't have fruit anymore.", "The tree doesn't have fruit anymore.  It looks weird that way.", "The tree's long slender branches reached high into the sky, looking nude without their fruit.", "Robbed of its precious fruit, the tree sat vexed.", "The tree's fruit supply is depleted.", "This tree has a strange animosity.", "They took it all.", "There's no more fruit.", "Don't have any fruit.", "You just have to wait for kekklefruit.", "Wait for fruit.", "Wait for fruit growth.", "Wait for the fruit growth.", "Wait for fruit to grow on the tree.", "Those tree fruit are just hard to come by right now.", "I haven't seen a fruit", "It didn't produce fruit yet.", "You're still waiting for it to produce fruit.", "You're still waiting for fruit to grow.", "The tree is bone dry!  Sans fruit!", "God, you'd do anything for a fruit.  But not yet.", "Just be patient.", "Be patient.", "Wait patiently for fruit.", "Your fruit will grow, just wait.", "Waiting for your fruit to grow.", "Pick the next fruit that grows.", "Pick a fruit after it grows.", "Get a fruit from the tree after they grow.", "Pick again after the tree has had time to grow fruit.", "Not yet, it's hasn't grown fruit yet.", "Wait a second, no fruit yet.", "You can has fruit after it grows.", "Try again repeatedly to see if you get a fruit or not.", "Try again, it grows fruit periodically.", "Wait", "No fruit just yet", "No fruit yet", "Noooot yet", "Just a little longer.", "Wait between each pick for fruit to grow.", "After a wait, fruit will grow on the tree.", "The tree's gonna grow plenty of fruit, just give it time.", "Without its fruit, this tree is looking slightly eerie.", "What a funny-looking tree without its fruit!", "You notice the way the tree looks without fruit.", "You notice the tree looks kinda odd with no fruit like that.", "You don't like looking at the tree when it doesn't have fruit.", "You express your desire for the tree to grow fruit.", "You're waiting for the fruit to grow so you can pick it.", "Ugh, no fruit..", "Keep trying to get fruit.", "The fruit gave under the forces... I guess it wasn't ready yet.", "The fruit's branches hadn't decided to tree yet.", "The fruit wasn't available.", "It's almost time for a fruit to be pickable.", "Should be a fruit pickable soon.", "It'll grow fruit for you to pick in a minute.", "It'll grow in a minute.", "It'll grow.", "It'll grow fruit.", "The fruit will grow on the tree's BRANCHES.", "You don't spy any fruit on the tree's branches.", "The tree's branches can be seen in detail without the fruit interrupting our view.", "You make sure, and there's no fruit on the tree.", "You search the tree for fruit, and are 100% sure there are none.", "You're 100% sure there aren't any pickable fruit yet.", "You try, but don't find any fruit.", "You look, but don't find any fruit.", "Can't see any FRUIT.", "Couldn't /pick", "It's just that there aren't any fruit on the tree.", "These things take time.", "These things can sometimes take time.", "You can't rush these things.", "You practice picking the fruit (there aren't any on the tree)", "It doesn't look like there are any fruit on the tree.", "0 kinds of fruit are growing on this tree", "You feel good about the possibility of fruit growing on the tree eventually.", "You whisper for the tree to grow nice fruits.", "This is exciting!  It'll grow fruit that you can eat.", "Alas, the tree wasn't currently displaying any fruit.", "Any fruit on the tree?  No...", "No fruit?  Okay...", "A quick scan shows no fruits on the tree that are ready for picking.", "You check and don't see any fruit.", "You give the tree a once-over to see if any fruit area ready.  Not yet, but you are resolute...", "You check on the tree.  No fruit, back to whatever it was you were doing.", "If this tree doesn't grow fruit soon you might start to get crazy.", "Actually, what if the tree doesn't grow any more fruit?", "What if the fruit never grows again?", "Ok, there's no fruit.", "You consider again what might happen if the fruit stopped growing.", "There is no fruit, so you just ponder about the tree.", "There's no fruit, so you just consider it for a moment.", "There's no fruit, so you think about the tree situation for another moment and then move on.", "There are no fruits, so you change the subject.", "Missed!", "Didn't chance upon a fruit.", "Didn't find the fruit.", "No fruit found.", "It's gonna be good fruit.", "The fruit from the tree will never change.", "The fruit from this tree will always grow, as long as the tree stands, at a pretty steady rate.", "You survey the tree for fruit, coming back empty-handed.", "It's not like the tree is on strike from producing fruit.", "The valuable fruit are not present.", "The revered fruit have been lost.", "You study the tree's fruitless branches.", "Good view of the branches with no fruit on them.", "Patiently and rapidly retry your command.", "You use a phone app to make sure the tree doesn't have any pickable fruit.", "You scan each fruit, finding no candidates for picking.", "The fruit of the tree are too young and supple to pick.", "You can't reach that one fruit up there.", "Oh, there's one.  But you can't reach it.", "You trying to pick fruit that isn't there.", "Where do you see fruit?", "Looks like the fruit aren't out today.", "You wonder what the fruit are doing.", "You wonder when the tree will bear fruit.", "You wonder when a fruit will be ready.", "You wonder if a fruit will grow.", "You think about how many fruits this tree must have produced with nobody even counting it or anything.", "You wonder how many fruit this tree has grown in its lifetime.", "It's not that time, yet.", "It's not time.", "Not... yet.", "The auto-analysis didn't show any completed fruit.", "The fruit aren't complete.", "Waiting for fruit growth completion.", "Please wait for the fruit to be ready.", "Don't rush it.", "Slow down, there aren't any fruit to pick yet.", "You check the fruit indicator under your favorite kekklefruit tree.  It reads:  0.", "Nope, don't see any.", "Is something taking all the fruit?", "I guess somebody else picked the fruit first.", "Somebody else got to it first.", "This", "If you focus, the fruit grows faster.", "You meditate to make the fruit grow faster.", "What you are doing doesn't make the fruit grow.", "Don't be too greedy.", "Fruit pick intercepted.", "Intercepted, try again.", "Denied.  Try again for success.", "False success message, no fruit actually picked", "I swear it'll grow fruit eventually lol", "You don't know how long it'll take before fruit grows on the tree.", "You don't know how long before the fruit will grow on the tree.", "Nobody knows how long it takes for fruit to grow on the tree."];
					var message = options[Math.floor(Math.random() * options.length)];
					sendChat(message);
				}
			});
			return;
		}
		if(cmd === "/tree" || cmd === "/fruit" || cmd === "/fruits") {
			db.getFruits(function(num_fruits) {
				sendChat("Friend "+msg.p.name+": " + num_fruits + ".");
			});
			return;
		}
		/*if(cmd === "/put") {
			db.put(args[0], argcat(1), function(err) {
				if(err) {
					sendChat("our friend " + msg.p.name + " put ERR: " + err);
				} else {
					sendChat("our friend " + msg.p.name + " put OK: "+args[0]+"=\""+argcat(1)+"\"");
				}
			});
			return;
		}
		if(cmd === "/get") {
			db.get(argcat(), function(err, value) {
				if(err) {
					sendChat("our friend " + msg.p.name + " get ERR: " + err);
				} else {
					sendChat("our friend " + msg.p.name + " get OK: " + argcat() + "=\""+value+"\"");
				}
			});
			return;
		}
		if(cmd === "/del") {
			db.del(argcat(), function(err) {
				if(err) {
					sendChat("our friend " + msg.p.name + " del ERR: " + err);
				} else {
					sendChat("our friend " + msg.p.name + " del OK");
				}
			});
			return;
		}
		if(cmd === "/read") {
			var max_len = 512;
			var result = "";
			var count = 0;
			var result_count = 0;
			db.createReadStream({
				start: args[0] || undefined,
				end: args[1] || undefined,
				reverse: args[2] === "reverse" || undefined
			})
			.on("data", function(data) {
				++count;
				if(result.length < max_len) {
					++result_count;
					result += data.key+"=\""+data.value + "\", ";
				}
			})
			.on("end", function() {
				result = result.substr(0, result.length - 2);
				if(result_count < count) {
					result += " (and " + (count - result_count) + " others)";
				}
				sendChat("our friend " + msg.p.name + " read " + count + " records: "+result);
			});
			return;
		}*/
		if(cmd === "/startup_sound") {
			startupSound();
		}
		/*if(cmd === "/pokemon") {
			var part = findParticipantByNameFuzzy(argcat()) || msg.p;
			db.getPokemon(part._id, function(pokemon) {
				sendChat(part.name + "'s Pokemon: " + listOff(pokemon));
			});
			return;
		}*/
		if(cmd === "/caught" || cmd === "/sack") {
			var part = findParticipantByNameFuzzy(argcat()) || msg.p;

			db.getFish(part._id, function(myfish) {
				var message = "";
				//if(myfish.length > 10) {
				//	var len = myfish.length;
				//	myfish = myfish.slice(0, 9);
				//	message = " (and " + (len - 10) + " more)";
				//}
				message = "Contents of "+part.name+"'s fish sack: "+listOff(myfish) + message;
				sendChat(message);
			});
			return;
		}

		/*if (cmd == "/sell") {
              let input = msg.a.substring(6).trim();
			  if (!input) return sendChat(`Please provide an item.`);
			  db.getFish(msg.p._id, function(myfosh) {
                if (!input.includes(myfosh)) {
					sendChat('Welp, you can sell that fish because you dont have it. Nice try tho.');
				} else {
					let price = Math.floor(Math.random() * 100) + 50;
					let yoinkers = myfish.filter(fesh => fesh.includes(input));
                    sendChat(`Your ${yoinkers} is now on sale for ${price}.`)
				}
			});
		}*/
		if(cmd === "/_caught" && msg.p.id === client.participantId) {
			var id = argcat();

			db.getFish(id, function(myfish) {
				var message = "";
				if(myfish.length > 1000) {
					var len = myfish.length;
					myfish = myfish.slice(0, 999);
					message = " (and " + (len - 1000) + " more)";
				}
				message = "Contents of "+id+"'s fish sack: "+listOff(myfish) + message;
				sendChat(message);
			});
			return;
		}
		if(cmd === "/count_fish") {
			var part = findParticipantByNameFuzzy(argcat()) || msg.p;
			db.getFish(part._id, function(myfish) {
				sendChat("Friend " + msg.p.name+": By my count, "+part.name+" has "+(myfish.length)+" fish.");
			});
			return;
		}
		if(cmd === "/_count_fish") {
			db.getFish(argcat(), function(myfish) {
				sendChat("Friend " + msg.p.name+": By my count, "+argcat()+" has "+(myfish.length)+" fish.");
			});
			return;
		}
		if(cmd === "/eat") {
			db.getFish(msg.p._id, function(myfish) {
				if(myfish.length < 1) {
					sendChat("Friend " + msg.p.name+": You have no food. /fish to get some.");
					return;
				}
				var idx = -1;
				var arg = argcat().trim().toLowerCase();
				for(var i = 0; i < myfish.length; i++) {
					if(myfish[i].toLowerCase().indexOf(arg) !== -1) {
						idx = i;
						break;
					}
				}
				if(idx == -1) {
					sendChat("Friend " +msg.p.name+": You don't have "+arg+".");
					return;
				}
				var food = myfish[idx];
				if(food.toLowerCase() == "sand") {
					if(getSandinessById(msg.p._id) >= 10) {
						sendChat("You can only eat about 10 sand per day.  Going to have to find something else to do with that sand.");
						if(Math.random() < 0.1) {
							sendChat("What a terrible night to have a curse.");
						}
					} else {
						// eat sand
						sendChat("Our friend "+msg.p.name+" ate of his/her sand.");
						giveSandiness(msg.p._id, 1);
						myfish.splice(idx, 1);
						db.putFish(msg.p._id, myfish);
					}
					return;
				}
				if(food.indexOf("(") !== -1)
					food = food.substr(0, food.indexOf("(") - 1);
				myfish.splice(idx, 1);
				db.putFish(msg.p._id, myfish);
				if(food.indexOf("kek") !== -1) {
					sendChat("Our friend " + msg.p.name+" ate his/her "+food+" and got a temporary fishing boost.");
					giveBonus(msg.p._id, 1);
					bonusTry(msg.p);
					return;
				}
				if(Math.random() < 0.5) {
					var tastes = ["fine", "sweet", "sour", "awfully familiar", "interesting",
						"icky", "fishy", "fishy", "fine", "colorful", "revolting", "good",
						"good", "great", "just fine", "weird", "funny", "odd", "strange", "salty",
						"like chicken", "like hamburger", "like dirt", "like a sewer", "like french fries",
						"cheesy", "hurty", "hot", "spicy", "a little off", "like the real thing",
						"like sunshine", "\"delish\"", "supreme", "like air", "amazing", "blue",
						"yellow", "like peanut butter", "delicious", "delicious", "spicy", "like grass",
						"like nothing he/she had ever tasted before", "pilly", "sweaty", "like garlic",
						"like people food", "salty", "wrong", "good enough for him/her", "like ham",
						"like the ones at McDonalds", "like a jellybean", "like snot", "like a penny, ew",
						"musical", "... fantastic", "sure enough", "right", "unusual", "a bit off", " indescribable",
						"gooey", "sticky", "kawaii", "like you aren't supposed to eat it, for some reason he/she can't describe",
						"like home", "like Christmas", "like Halloween", "like a fish", "like he/she expected but better",
						"like it made him/her turn a shade of 'turquoise.' Upon looking in a mirror he/she finds it didn't actually do so, though. But for a minute there it really tasted like it",
						"like the same thing he/she was already tasting beforehand", "perfectly fine to him/her", "", "like a million bux", "orange", "rare", "like it's supposed to"];
					var taste = tastes[Math.floor(Math.random()*tastes.length)];
					sendChat("Our friend " + msg.p.name+" ate "+food+". It tasted "+taste+".");
				} else {
					function rrggbbrand(){var a = Math.floor(Math.random() * 255).toString(16); return a.length < 2 ? "0"+a : a}
					var color = "#"+rrggbbrand()+rrggbbrand()+rrggbbrand();
						/*client.sendArray([{ m: 'admin pass', password: 'some random password', msg: { m: 'color', color: color, _id: msg.p._id }}])*/
						sendChat("Our friend " + msg.p.name+" ate his/her "+food+" and it made him/her turn "+(new Color(color).getName().toLowerCase())+".");
				}
			});
			return;
		}
		/*if(cmd === "/steal") {
			var thief = msg.p;
			var victim = findParticipantByNameFuzzy(argcat());
			if(!victim) {
				sendChat(thief.name+" couldn't find who to steal from");
				return;
			}
			if(victim._id == thief._id) {
				sendChat(thief.name+" fudged");
				return;
			}
			db.getFish(thief._id, function(thief_fish) {
				db.getFish(victim._id, function(victim_fish) {
					if(victim_fish.length > 0) {
						var num = Math.ceil(Math.random() * (victim_fish.length / 20));
						if(num < 1) {
							sendChat(thief.name + " didn't manage to steal anything from "+victim.name+".");
							return;
						}
						var result = "";
						for(var i = 0; i < num; i++) {
							var x = Math.floor(Math.random()*victim_fish.length);
							if(i) result += ", ";
							if(i && i == num - 1) result += "and ";
							result += victim_fish[x];
							thief_fish.push(victim_fish[x]);
							victim_fish.splice(x, 1);
						}
						sendChat(thief.name+" stole " + num +" of "+victim.name+"'s fish: " + result + "!");
						db.putFish(thief._id, thief_fish);
						db.putFish(victim._id, victim_fish);
					} else {
						sendChat(thief.name+": "+victim.name+"'s fish sack is empty.");
					}
				});
			});
			return;
		}*/
		if(cmd === "/give") {
			var thief = msg.p;
			var victim = findParticipantByNameFuzzy(args[0]);
			if(!victim) {
				sendChat("Friend " +thief.name+" missed");
				return;
			}
			if(victim._id == thief._id) {
				sendChat("Friendly friend " +thief.name+" fudged");
				return;
			}
			var target_fish = argcat(1);
			db.getFish(thief._id, function(thief_fish) {
				db.getFish(victim._id, function(victim_fish) {
					if(thief_fish.length > 0) {
						var idx = -1;
						var arg = target_fish.trim().toLowerCase();
						for(var i = 0; i < thief_fish.length; i++) {
							if(arg == "" || thief_fish[i].toLowerCase().indexOf(arg) !== -1) {
								idx = i;
								break;
							}
						}
						if(idx == -1) {
							sendChat("Friend " +thief.name+": You don't have "+arg+".");
							return;
						}
						var thefish = thief_fish[idx];
						thief_fish.splice(idx, 1);
						victim_fish.push(thefish);
						
						sendChat("Our friend " +thief.name+" gave "+victim.name+" his/her "+thefish);
						db.putFish(thief._id, thief_fish);
						db.putFish(victim._id, victim_fish);
					} else {
						sendChat("Friend " +thief.name+": You don't have the fish to give.");
					}
				});
			});
			return;
		} else if(cmd.indexOf("/give_") === 0){
			var amt = parseInt(cmd.substr(6));
			if(amt > 0) {
				if(amt > 100 && msg.p.id !== client.participantId) {
					sendChat("Friend "+msg.p.name+": you can only give up to 100 at a time.");
				} else {
					var thief = msg.p;
					var victim = findParticipantByNameFuzzy(args[0]);
					if(!victim) {
						sendChat("Friend " +thief.name+" missed");
						return;
					}
					if(victim._id == thief._id) {
						sendChat("Friendly friend " +thief.name+" fudged");
						return;
					}
					var target_fish = argcat(1);
					db.getFish(thief._id, function(thief_fish) {
						db.getFish(victim._id, function(victim_fish) {
							if(thief_fish.length > 0) {
								var arg = target_fish.trim().toLowerCase();
								var thefish = "items";
								for(var j = 0; j < amt; j++) {
									var idx = -1;
									for(var i = 0; i < thief_fish.length; i++) {
										if(arg == "" || thief_fish[i].toLowerCase().indexOf(arg) !== -1) {
											idx = i;
											break;
										}
									}
									if(idx == -1) {
										sendChat("Friend " +thief.name+": You don't have "+amt+" "+arg+".");
										return;
									}
									thefish = thief_fish[idx];
									thief_fish.splice(idx, 1);
									victim_fish.push(thefish);
								}
								sendChat("Our friend " +thief.name+" gave "+victim.name+" his/her e.g. ("+thefish+") x "+amt+".");
								db.putFish(thief._id, thief_fish);
								db.putFish(victim._id, victim_fish);
							} else {
								sendChat("Friend " +thief.name+": You don't have the fish to give.");
							}
						});
					});
					return;
				}
			}
		}
		if(cmd === "/bestow") {
			var thief = msg.p;
			var victim = client.ppl[args[0]];
			if(!victim) {
				sendChat("Friend " +thief.name+" missed");
				return;
			}
			if(victim._id == thief._id) {
				sendChat("Friendly friend " +thief.name+" fudged");
				return;
			}
			var target_fish = argcat(1);
			db.getFish(thief._id, function(thief_fish) {
				db.getFish(victim._id, function(victim_fish) {
					if(thief_fish.length > 0) {
						var idx = -1;
						var arg = target_fish.trim().toLowerCase();
						for(var i = 0; i < thief_fish.length; i++) {
							if(arg == "" || thief_fish[i].toLowerCase().indexOf(arg) !== -1) {
								idx = i;
								break;
							}
						}
						if(idx == -1) {
							sendChat("Friend " +thief.name+": You don't have "+arg+".");
							return;
						}
						var thefish = thief_fish[idx];
						thief_fish.splice(idx, 1);
						victim_fish.push(thefish);
						
						sendChat("Our friend " +thief.name+" bestowed "+victim.name+" his/her "+thefish);
						db.putFish(thief._id, thief_fish);
						db.putFish(victim._id, victim_fish);
					} else {
						sendChat("Friend " +thief.name+": You don't have the fish to bestow.");
					}
				});
			});
			return;
		} else if(cmd.indexOf("/bestow_") === 0){
			var amt = parseInt(cmd.substr(8));
			if(amt > 0) {
				if(amt > 100 && msg.p.id !== client.participantId) {
					sendChat("Friend "+msg.p.name+": you can only bestow up to 100 at a time.");
				} else {
					var thief = msg.p;
					var victim = client.ppl[args[0]];
					if(!victim) {
						sendChat("Friend " +thief.name+" missed");
						return;
					}
					if(victim._id == thief._id) {
						sendChat("Friendly friend " +thief.name+" fudged");
						return;
					}
					var target_fish = argcat(1);
					db.getFish(thief._id, function(thief_fish) {
						db.getFish(victim._id, function(victim_fish) {
							if(thief_fish.length > 0) {
								var arg = target_fish.trim().toLowerCase();
								var thefish = "items";
								for(var j = 0; j < amt; j++) {
									var idx = -1;
									for(var i = 0; i < thief_fish.length; i++) {
										if(arg == "" || thief_fish[i].toLowerCase().indexOf(arg) !== -1) {
											idx = i;
											break;
										}
									}
									if(idx == -1) {
										sendChat("Friend " +thief.name+": You don't have "+amt+" "+arg+".");
										return;
									}
									thefish = thief_fish[idx];
									thief_fish.splice(idx, 1);
									victim_fish.push(thefish);
								}
								sendChat("Our friend " +thief.name+" bestowed "+victim.name+" his/her e.g. ("+thefish+") x "+amt+".");
								db.putFish(thief._id, thief_fish);
								db.putFish(victim._id, victim_fish);
							} else {
								sendChat("Friend " +thief.name+": You don't have the fish to bestow.");
							}
						});
					});
					return;
				}
			}
		}
		if(cmd === "/_give" && msg.p.id === client.participantId) {
			var thief = msg.p;
			var victim = findParticipantByNameFuzzy(args[0]);
			if(!victim) {
				sendChat("Friend " +thief.name+" missed");
				return;
			}
			var target_fish = argcat(1);
			db.appendFish(victim._id, target_fish);
			sendChat("Friend "+thief.name+" gave "+victim.name+" " + target_fish);
			return;
		} else if(cmd.indexOf("/_give_") === 0 && msg.p.id === client.participantId){
			var amt = parseInt(cmd.substr(7));
			if(amt > 0) {
				var victim = args[0];
				var thefish = argcat(1);
				db.getFish(victim, function(victim_fish) {
					for(var i = 0; i < amt; i++) {
						victim_fish.push(thefish);
					}
					db.putFish(victim, victim_fish);
					console.log("gave "+victim+" "+amt+"x "+thefish);
				});
			}
			return;
		}
		if(cmd.indexOf("/_transfer") === 0 && msg.p.id === client.participantId){
			var from_id = args[0];
			var to_id = args[1];
			db.getFish(from_id, function(from_fish) {
				db.appendFish(to_id, from_fish);
				db.putFish(from_id, []);
				console.log("ok, then...");
			});
			return;
		}
		/*if(cmd === "/exchange" && msg.p.id === client.participantId) {
			exchange.getOrderBook("bid", undefined, function(bids) {
				exchange.getOrderBook("ask", undefined, function(asks) {
					db.get("exchange data~last", function(err, value) {
						console.log("bids: " + listOff(bids));
						console.log("asks: " + listOff(asks));
						console.log("last: " + (value || 0));
						db.getPokemon(msg.p._id, function(pok) {
							db.getFish(msg.p._id, function(fish) {
								console.log("Balance: " + fish.length + " FSH, " + pok.length+" POK");
							});
						});
					});
				});
			});
			return;
		}
		if(cmd === "/orders" && msg.p.id === client.participantId) {
			exchange.getOrderBook("bid", msg.p._id, function(bids) {
				exchange.getOrderBook("ask", msg.p._id, function(asks) {
					db.get("exchange data~last", function(err, value) {
						console.log("bids: " + listOff(bids));
						console.log("asks: " + listOff(asks));
						db.getPokemon(msg.p._id, function(pok) {
							db.getFish(msg.p._id, function(fish) {
								console.log(fish.length + " FSH, " + pok.length+" POK");
							});
						});
					});
				});
			});
			return;
		}
		if(cmd === "/cancel" && msg.p.id === client.participantId) {
			// id, type, amt, price
			exchange.cancel(msg.p._id, args[0], args[1], args[2], function(orders) {
				console.log("Cancelled "+listOff(orders));
			});
			return;
		}
		if(cmd === "/balance" && msg.p.id === client.participantId) {
			db.getPokemon(msg.p._id, function(pok) {
				db.getFish(msg.p._id, function(fish) {
					console.log(fish.length + " FSH, " + pok.length+" POK");
				});
			});
			return;
		}
		if(cmd === "/can_sell" && msg.p.id === client.participantId) {
			exchange.getCanSell(msg.p._id, parseInt(args[0]), parseInt(args[1]) || undefined, function(can) {
				console.log(can);
			});
			return;
		}
		if(cmd === "/can_buy" && msg.p.id === client.participantId) {
			exchange.getCanBuy(msg.p._id, parseInt(args[0]), parseInt(args[1]) || undefined, function(can) {
				console.log(can);
			});
			return;
		}
		if(cmd === "/sell" && msg.p.id === client.participantId) {
			exchange.getCanSell(msg.p._id, parseInt(args[0]), parseInt(args[1]) || undefined, function(can) {
				if(can) exchange.sell(msg.p._id, parseInt(args[0]), parseInt(args[1]) || undefined);
			});
			return;
		}
		if(cmd === "/buy" && msg.p.id === client.participantId) {
			exchange.getCanBuy(msg.p._id, parseInt(args[0]), parseInt(args[1]) || undefined, function(can) {
				if(can) exchange.buy(msg.p._id, parseInt(args[0]), parseInt(args[1]) || undefined);
			});
			return;
		}*/
		if(cmd.indexOf("/help") === 0) {
			sendChat("Friendly friend " + msg.p.name +": Help about help is disabled.  Due to abuse."); return;
			msg.a += " ";
			var count = 0;
			for(var i = 1; i < msg.a.length; i += 5) {
				if(msg.a.substr(i).indexOf("help ") === 0 ) {
					++count;
				} else {
					break;
				}
			}
			if(count > 1) {
				++count;

				/*var message = "";
				for(var i = 0; i < count; i++) {
					message += "help about ";
				}
				message[0] = "H";
				sendChat("our friend " + msg.p.name + ": " + message);
				return;*/

				var message = "Instead, try: /";
				for(var i = 0; i < count; i++) {
					message += "help ";
				}
				message += " (displays help about the \"help\" command ";
				for(var i = 1; i < count; i++) {
					var arr = ["within the", "of the", "inside of the", "belonging to the", "with the parent",
						"whose child is the", "corresponding to the","inside the","which helps with the",
						"telling you about the","explaining the","detailing the","that helps with the","in the",
						"that assists with the","where you learned about the","available for the",
						"when you tried the","which told you about the"];
					message += " " + arr[Math.floor(i % arr.length)];
					message += " \"help\" command"
				}
				message += ")";
				sendChat(message);
			}
			return;
		}
		return true; // doCommand
	};


	require("fs").readFile("./pokemongen1.json", function(err, data) {
		pokedex = JSON.parse(data);
		
		var WAIT_MS = 3000;
		var last_known_channel = undefined;
		var wait_until = Infinity;

		client.on("ch", function(msg) {
			if(msg.ch._id !== last_known_channel) {
				// looks like we have changed or joined channel
				startupSound();
				last_known_channel = msg.ch._id;
				wait_until = Date.now() + WAIT_MS;
			}
		});

		var _padd_time_ = 0;
		client.on("participant added", function(part) {
			setTimeout(function() {
				if(Date.now() > wait_until) {
					//catchPokemon(part, Date.now() - _padd_time_ < 10000);
					catchPokemon(part, true);
					_padd_time_ = Date.now();
				}
			}, 100);
		});

	});

	var last_chatter = undefined;
	//setInterval(function(){sendChat("/duel "+(last_chatter || "totoro"));}, 20000);

	var fishing_bonus_by_id = {};
	function getBonusById(id) {
		if(fishing_bonus_by_id.hasOwnProperty(id)) {
			return fishing_bonus_by_id[id];
		} else {
			return 0;
		}
	}
	function giveBonus(id, bonus) {
		bonus += getBonusById(id);
		fishing_bonus_by_id[id] = bonus;
	}

	var sandiness_by_id = {};
	function getSandinessById(id) {
		if(sandiness_by_id.hasOwnProperty(id)) {
			return sandiness_by_id[id];
		} else {
			return 0;
		}
	}
	function giveSandiness(id, sandiness) {
		sandiness += getSandinessById(id);
		sandiness_by_id[id] = sandiness;
	}
	setInterval(function() {
		for(var i in sandiness_by_id) {
			if(sandiness_by_id.hasOwnProperty(i)) {
				sandiness_by_id[i] = Math.max(sandiness_by_id[i] - 1, 0);
			}
		}
	}, 24*60*60000);

	var FISHING_CHANCE = 0.02;
	setInterval(function() {
		var results = [];
        db.createReadStream({
			start: "fishing~",
			end: "fishing~\xff"
		})
		.on("data", function(data) {
			if(data.value) results.push(data.key);
		})
		.on("end", function() {
			if(results.length === 0) return;
			if(Math.random() > FISHING_CHANCE * results.length) return;
			var winner = results[Math.floor(Math.random()*results.length)];
			if(winner.match(/^fishing~[0-9a-f]{24}$/)) {
				db.del(winner);
				var user_id = winner.substr(-24);
				var part;
				for(var i in client.ppl) {
					if(client.ppl[i]._id === user_id) {
						part = client.ppl[i];
						break;
					}
				}
				if(part) {
					db.getFish(part._id, function(myfish) {
						if(myfish.length > 100 && Math.random() < 0.01) {
							catchTrap(part);
							//catchFish(part);
						} else {
							catchFish(part);
						}
					});
				}
			}
		});
	}, 5000);

	setInterval(function() {
		return; // stop auto-fishing
		
		if(!client.isConnected()) return;

		var part = client.ppl[client.participantId];
		if(!part) return;

		var key = "fishing~"+part._id;
		db.get(key, function(err, value) {
			if(!value) {
				sendChat("/fish");
			} else {
				db.getFish(part._id, function(myfish) {
					if(!myfish.length) return;
					var rand = Math.floor(Math.random()*client.countParticipants());
					var dest;
					for(var i in client.ppl) {
						if(!client.ppl.hasOwnProperty(i)) continue;
						if(i == rand) break;
						else dest = client.ppl[i];
					}
					if(dest && dest.id !== client.participantId) {
						sendChat("/give "+dest.name.split(" ")[0]);
					}
				});
				/*if(findParticipantByNameFuzzy("potato")) {
					var asdf = findParticipantByNameFuzzy("electrashave") || findParticipantByNameFuzzy("potato") || findParticipantByNameFuzzy("totoro");
					if(asdf) sendChat("/duel "+asdf.name);
				}*/
			}

			/*else */
		});
	}, 120000);
	//sendChat("/fish");

	var pong = new Pong(client, db);
	setInterval(function() {
	pong.tick();
	}, 100);
});


var Pong = function(client, db) {
	this.client = client;
	this.db = db;
	this.vx = 1.5;
	this.vy = 2.2;
	var self = this;
	self.part = self.client.ppl[self.client.participantId];
	client.on("ch", function() {
		self.part = self.client.ppl[self.client.participantId];
	});
	this.player1 = undefined;
	this.player2 = undefined;
}

Pong.prototype.tick = function() {
	if(!this.client.isConnected() || !this.part) return;
	this.part.x += this.vx;
	this.part.y += this.vy;
	if(this.part.x < 0) {
		this.vx = -this.vx;
	} else if(this.part.x > 100) {
		this.vx = -this.vx;
	}
	if(this.part.y < 0) {
		this.vy = -this.vy;
	} else if(this.part.y > 100) {
		this.vy = -this.vy;
	}
	//this.vx += Math.random() * 0.5 - 0.25;
	//this.vy += Math.random() * 0.5 - 0.25;
	this.client.sendArray([{m: "m", x: this.part.x, y: this.part.y}]);
};





var Exchange = function(db) {
	this.db = db;
};

Exchange.prototype.takePokemon = function(user_id, amount) {
	var self = this;
	self.db.getPokemon(user_id, function(pok) {
		self.db.getPokemon("exchange", function(pok2) {
			for(var i = 0; i < amount; i++)
				pok2.push(pok.shift());
			self.db.putPokemon(user_id, pok);
			self.db.putPokemon("exchange", pok2);
		});
	});
};

Exchange.prototype.takeFish = function(user_id, amount) {
	var self = this;
	self.db.getFish(user_id, function(fish) {
		self.db.getFish("exchange", function(fish2) {
			for(var i = 0; i < amount; i++)
				fish2.push(fish.shift());
			self.db.putFish(user_id, fish);
			self.db.putFish("exchange", fish2);
		});
	});
};

Exchange.prototype.givePokemon = function(user_id, amount) {
	var self = this;
	self.db.getPokemon(user_id, function(pok) {
		self.db.getPokemon("exchange", function(pok2) {
			for(var i = 0; i < amount; i++)
				pok.push(pok2.shift());
			self.db.putPokemon(user_id, pok);
			self.db.putPokemon("exchange", pok2);
		});
	});
};

Exchange.prototype.giveFish = function(user_id, amount) {
	var self = this;
	self.db.getFish(user_id, function(fish) {
		self.db.getFish("exchange", function(fish2) {
			for(var i = 0; i < amount; i++)
				fish.push(fish2.shift());
			self.db.putFish(user_id, fish);
			self.db.putFish("exchange", fish2);
		});
	});
};

Exchange.prototype.placeAskOrder = function(user_id, amount, price) {
	this.takePokemon(user_id, amount);
	this.db.put("exchange ask~"+Exchange.intToKey(price)+"~"+Exchange.intToKey(Date.now())+"~"+user_id,
		amount.toString());
};

Exchange.prototype.placeBidOrder = function(user_id, amount, price) {
	this.takeFish(user_id, price * amount);
	this.db.put("exchange bid~"+Exchange.intToKey(price)+"~"+Exchange.intToKey(-Date.now())+"~"+user_id,
		amount.toString());
};

Exchange.prototype.fillAsks = function(user_id, amount, price, market) {
	var self = this;
	self.db.createReadStream({
		start: "exchange ask~"+Exchange.intToKey(price)+"~",
		end: "exchange ask~~"
	})
	.on("data", function(data) {
		if(amount < 1) return;
		var tprice = parseInt(data.key.match(/^exchange ask~(.*)~/)[1], 36);
		if(!market && tprice > price) return;
		var value = parseInt(data.value || 0) || 0;
		var tamt = 0;
		if(value > amount) {
			tamt = amount;
			self.db.put(data.key, (value - tamt).toString());
		} else {
			tamt = value;
			self.db.del(data.key);
		}
		amount -= tamt;
		self.db.put("exchange data~last", tprice);
		
		var other_user_id = data.key.match(/[0-9a-f]{24}/i)[0];
		self.takeFish(user_id, price * tamt);
		self.takePokemon(other_user_id, tamt);
		setTimeout(function() {
			self.giveFish(other_user_id, tprice * tamt);
			self.givePokemon(user_id, tamt);
		}, 200);
	})
	.on("end", function() {
		if(amount) {
			self.placeBidOrder(user_id, amount, price);
		}
	});
};

Exchange.prototype.fillBids = function(user_id, amount, price, market) {
	var self = this;
	self.db.createReadStream({
		start: "exchange bid~~",
		end: "exchange bid~"+Exchange.intToKey(price)+"~",
		reverse: true
	})
	.on("data", function(data) {
		if(amount < 1) return;
		var tprice = parseInt(data.key.match(/^exchange bid~(.*)~/)[1], 36);
		if(!market && tprice < price) return;
		var value = parseInt(data.value || 0) || 0;
		var tamt = 0;
		if(value > amount) {
			tamt = amount;
			self.db.put(data.key, (value - tamt).toString());
		} else {
			tamt = value;
			self.db.del(data.key);
		}
		amount -= tamt;
		self.db.put("exchange data~last", tprice);
		
		var other_user_id = data.key.match(/[0-9a-f]{24}/i)[0];
		self.takePokemon(user_id, tamt);
		self.takeFish(other_user_id, tprice * tamt);
		setTimeout(function() {
			self.givePokemon(other_user_id, tamt);
			self.giveFish(user_id, tprice * tamt);
		}, 200);
	})
	.on("end", function() {
		if(amount) {
			self.placeAskOrder(user_id, amount, market ? 1 : price);
		}
	});
};

Exchange.prototype.buy = function(user_id, amount, price) {
	if(typeof price === "number") {
		this.fillAsks(user_id, amount, price, false);
	} else {
		this.fillAsks(user_id, amount, 1, true);
	}
};

Exchange.prototype.sell = function(user_id, amount, price) {
	if(typeof price === "number") {
		this.fillBids(user_id, amount, price, false);
	} else {
		this.fillBids(user_id, amount, 1000000, true);
	}
};

Exchange.prototype.getCanSell = function(user_id, amount, price, cb) {
	if(amount < 1) cb(false);
	else if(price === 0) cb(false);
	else if(!Exchange.validateInt(amount)) cb(false);
	else if(typeof price === "number" && !Exchange.validateInt(price)) cb(false);
	else this.db.getPokemon(user_id, function(pok) {
		if(pok.length < amount) cb(false);
		else cb(true);
	});
};

Exchange.prototype.getCanBuy = function(user_id, amount, price, cb) {
	if(amount < 1) cb(false);
	else if(price === 0) cb(false);
	else if(!Exchange.validateInt(amount)) cb(false);
	else if(typeof price === "number" && !Exchange.validateInt(price)) cb(false);
	else this.db.getFish(user_id, function(fish) {
		if(fish.length < amount * price) cb(false);
		else cb(true);
	});
};

Exchange.prototype.getOrderBook = function(type, id, cb) {
	var orders = [];
	this.db.createReadStream({
		start: "exchange "+type+"~",
		end: "exchange "+type+"~~"
	})
	.on("data", function(data) {
		if(id && !data.key.match(new RegExp(id+"$"))) return;
		var amount = parseInt(data.value || 0) || 0;
		var price = parseInt(data.key.match(new RegExp("^exchange "+type+"~(.*)~"))[1], 36);
		orders.push(amount + "@" + price);
	})
	.on("end", function() {
		cb(orders);
	});
};

Exchange.prototype.cancel = function(id, type, amount, price, cb) {
	var self = this;
	var orders = [];
	this.db.createReadStream({
		start: "exchange "+type+"~",
		end: "exchange "+type+"~~"
	})
	.on("data", function(data) {
		if(!data.key.match(new RegExp(id+"$"))) return;
		var a = parseInt(data.value || 0) || 0;
		var p = parseInt(data.key.match(new RegExp("^exchange "+type+"~(.*)~"))[1], 36);
		if(a == amount && p == price) {
			orders.push(a + "@" + p);
			// delete order
			self.db.del(data.key);
			// return items
			if(type === "ask") {
				self.givePokemon(id, amount);
			} else if(type === "bid") {
				self.giveFish(id, price * amount);
			}
		}
	})
	.on("end", function() {
		if(cb) cb(orders);
	});
};

Exchange.validateInt = function(int) {
	if(Math.floor(int) !== int)
		return false;
	int = int.toString(36);
	if(int.length > 50)
		return false;
	return true;
};

Exchange.intToKey = function(int) {
	if(!Exchange.validateInt(int)) {
		console.trace("Invalid int "+int);
		return;
	}
	var negative = int < 0;
	int = int.toString(36);
	if(negative) int = int.substr(1);
	while(int.length < 50) int = (negative ? "\xff" : "0")+int;
	return int;
};





var Color = function() {
	var r,g,b;
	if(arguments.length === 1) {
		var hexa = arguments[0].toLowerCase();
		if(hexa.match(/^#[0-9a-f]{6}$/i)) {
			hexa = /^#?([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i.exec(hexa);
			if(hexa && hexa.length === 4) {
				r = parseInt(hexa[1], 16);
				g = parseInt(hexa[2], 16);
				b = parseInt(hexa[3], 16);
			}
		}
	} else if(arguments.length === 3) {
		r = arguments[0];
		g = arguments[1];
		b = arguments[2];
	}
	this.r = ~~r || 0;
	this.g = ~~g || 0;
	this.b = ~~b || 0;
};

Color.prototype.distance = function(color) {
	var d = 0;
	d += Math.pow(this.r - color.r, 2);
	d += Math.pow(this.g - color.g, 2);
	d += Math.pow(this.b - color.b, 2);
	return Math.abs(Math.sqrt(d));
};

Color.prototype.toHexa = function() {
	var r = this.r.toString(16), g = this.g.toString(16), b = this.b.toString(16);
	if(r.length == 1) r = "0" + r;
	if(g.length == 1) g = "0" + g;
	if(b.length == 1) b = "0" + b;
	return "#"+r+g+b;
}

Color.prototype.getName = function() {
	var hexa = this.toHexa();
	var low = 256;
	var name;
	for(var n in Color.map) {
		if(!Color.map.hasOwnProperty(n))
			continue;
		var color = Color.map[n];
		if(color.r === this.r && color.g === this.g && color.b === this.b) {
			return n;
		}
		var dist = this.distance(color);
		if(dist < low) {
			low = dist;
			name = n;
		}
	}
	if(!name)
		name = this.toHexa();
	else
		name = "A shade of " + name;
	return name;
};

Color.map = {};

Color.addToMap = function(hexa, name) {
	Color.map[name] = new Color(hexa);
};

Color.addToMap("#7CB9E8", "Aero");
Color.addToMap("#C9FFE5", "Aero blue");
Color.addToMap("#B284BE", "African purple");
Color.addToMap("#5D8AA8", "Air Force blue (RAF)");
Color.addToMap("#00308F", "Air Force blue (USAF)");
Color.addToMap("#72A0C1", "Air superiority blue");
Color.addToMap("#AF002A", "Alabama Crimson");
Color.addToMap("#F0F8FF", "Alice blue");
Color.addToMap("#E32636", "Alizarin crimson");
Color.addToMap("#C46210", "Alloy orange");
Color.addToMap("#EFDECD", "Almond");
Color.addToMap("#E52B50", "Amaranth");
Color.addToMap("#F19CBB", "Amaranth pink");
Color.addToMap("#AB274F", "Dark amaranth");
Color.addToMap("#3B7A57", "Amazon");
Color.addToMap("#FF7E00", "Amber");
Color.addToMap("#FF033E", "American rose");
Color.addToMap("#9966CC", "Amethyst");
Color.addToMap("#A4C639", "Android green");
Color.addToMap("#F2F3F4", "Anti-flash white");
Color.addToMap("#CD9575", "Antique brass");
Color.addToMap("#665D1E", "Antique bronze");
Color.addToMap("#915C83", "Antique fuchsia");
Color.addToMap("#841B2D", "Antique ruby");
Color.addToMap("#FAEBD7", "Antique white");
Color.addToMap("#8DB600", "Apple green");
Color.addToMap("#FBCEB1", "Apricot");
Color.addToMap("#00FFFF", "Aqua");
Color.addToMap("#7FFFD4", "Aquamarine");
Color.addToMap("#4B5320", "Army green");
Color.addToMap("#3B444B", "Arsenic");
Color.addToMap("#8F9779", "Artichoke");
Color.addToMap("#B2BEB5", "Ash grey");
Color.addToMap("#87A96B", "Asparagus");
Color.addToMap("#FDEE00", "Aureolin");
Color.addToMap("#6E7F80", "AuroMetalSaurus");
Color.addToMap("#568203", "Avocado");
Color.addToMap("#007FFF", "Azure");
Color.addToMap("#F0FFFF", "Azure mist/web");
Color.addToMap("#89CFF0", "Baby blue");
Color.addToMap("#A1CAF1", "Baby blue eyes");
Color.addToMap("#FEFEFA", "Baby powder");
Color.addToMap("#FF91AF", "Baker-Miller pink");
Color.addToMap("#21ABCD", "Ball blue");
Color.addToMap("#FAE7B5", "Banana Mania");
Color.addToMap("#FFE135", "Banana yellow");
Color.addToMap("#E0218A", "Barbie pink");
Color.addToMap("#7C0A02", "Barn red");
Color.addToMap("#848482", "Battleship grey");
Color.addToMap("#98777B", "Bazaar");
Color.addToMap("#9F8170", "Beaver");
Color.addToMap("#F5F5DC", "Beige");
Color.addToMap("#2E5894", "B'dazzled blue");
Color.addToMap("#9C2542", "Big dip o’ruby");
Color.addToMap("#FFE4C4", "Bisque");
Color.addToMap("#3D2B1F", "Bistre");
Color.addToMap("#967117", "Bistre brown");
Color.addToMap("#CAE00D", "Bitter lemon");
Color.addToMap("#648C11", "Bitter lime");
Color.addToMap("#FE6F5E", "Bittersweet");
Color.addToMap("#BF4F51", "Bittersweet shimmer");
Color.addToMap("#000000", "Black");
Color.addToMap("#3D0C02", "Black bean");
Color.addToMap("#253529", "Black leather jacket");
Color.addToMap("#3B3C36", "Black olive");
Color.addToMap("#FFEBCD", "Blanched almond");
Color.addToMap("#A57164", "Blast-off bronze");
Color.addToMap("#318CE7", "Bleu de France");
Color.addToMap("#ACE5EE", "Blizzard Blue");
Color.addToMap("#FAF0BE", "Blond");
Color.addToMap("#0000FF", "Blue");
Color.addToMap("#1F75FE", "Blue (Crayola)");
Color.addToMap("#0093AF", "Blue (Munsell)");
Color.addToMap("#0087BD", "Blue (NCS)");
Color.addToMap("#333399", "Blue (pigment)");
Color.addToMap("#0247FE", "Blue (RYB)");
Color.addToMap("#A2A2D0", "Blue Bell");
Color.addToMap("#6699CC", "Blue-gray");
Color.addToMap("#0D98BA", "Blue-green");
Color.addToMap("#126180", "Blue sapphire");
Color.addToMap("#8A2BE2", "Blue-violet");
Color.addToMap("#5072A7", "Blue yonder");
Color.addToMap("#4F86F7", "Blueberry");
Color.addToMap("#1C1CF0", "Bluebonnet");
Color.addToMap("#DE5D83", "Blush");
Color.addToMap("#79443B", "Bole Brown");
Color.addToMap("#0095B6", "Bondi blue");
Color.addToMap("#E3DAC9", "Bone");
Color.addToMap("#CC0000", "Boston University Red");
Color.addToMap("#006A4E", "Bottle green");
Color.addToMap("#873260", "Boysenberry");
Color.addToMap("#0070FF", "Brandeis blue");
Color.addToMap("#B5A642", "Brass");
Color.addToMap("#CB4154", "Brick red");
Color.addToMap("#1DACD6", "Bright cerulean");
Color.addToMap("#66FF00", "Bright green");
Color.addToMap("#BF94E4", "Bright lavender");
Color.addToMap("#D891EF", "Bright lilac");
Color.addToMap("#C32148", "Bright maroon");
Color.addToMap("#1974D2", "Bright navy blue");
Color.addToMap("#FF007F", "Bright pink");
Color.addToMap("#08E8DE", "Bright turquoise");
Color.addToMap("#D19FE8", "Bright ube");
Color.addToMap("#F4BBFF", "Brilliant lavender");
Color.addToMap("#FF55A3", "Brilliant rose");
Color.addToMap("#FB607F", "Brink pink");
Color.addToMap("#004225", "British racing green");
Color.addToMap("#CD7F32", "Bronze");
Color.addToMap("#737000", "Bronze Yellow");
Color.addToMap("#964B00", "Brown");
Color.addToMap("#6B4423", "Brown-nose");
Color.addToMap("#FFC1CC", "Bubble gum");
Color.addToMap("#E7FEFF", "Bubbles");
Color.addToMap("#F0DC82", "Buff");
Color.addToMap("#7BB661", "Bud green");
Color.addToMap("#480607", "Bulgarian rose");
Color.addToMap("#800020", "Burgundy");
Color.addToMap("#DEB887", "Burlywood");
Color.addToMap("#CC5500", "Burnt orange");
Color.addToMap("#8A3324", "Burnt umber");
Color.addToMap("#BD33A4", "Byzantine");
Color.addToMap("#702963", "Byzantium");
Color.addToMap("#536872", "Cadet");
Color.addToMap("#5F9EA0", "Cadet blue");
Color.addToMap("#91A3B0", "Cadet grey");
Color.addToMap("#006B3C", "Cadmium green");
Color.addToMap("#ED872D", "Cadmium orange");
Color.addToMap("#E30022", "Cadmium red");
Color.addToMap("#FFF600", "Cadmium yellow");
Color.addToMap("#A67B5B", "Cafe au lait");
Color.addToMap("#4B3621", "Cafe noir");
Color.addToMap("#1E4D2B", "Cal Poly green");
Color.addToMap("#A3C1AD", "Cambridge Blue");
Color.addToMap("#EFBBCC", "Cameo pink");
Color.addToMap("#78866B", "Camouflage green");
Color.addToMap("#FFEF00", "Canary yellow");
Color.addToMap("#FF0800", "Candy apple red");
Color.addToMap("#E4717A", "Candy pink");
Color.addToMap("#592720", "Caput mortuum");
Color.addToMap("#C41E3A", "Cardinal");
Color.addToMap("#00CC99", "Caribbean green");
Color.addToMap("#960018", "Carmine");
Color.addToMap("#EB4C42", "Carmine pink");
Color.addToMap("#FF0038", "Carmine red");
Color.addToMap("#FFA6C9", "Carnation pink");
Color.addToMap("#99BADD", "Carolina blue");
Color.addToMap("#ED9121", "Carrot orange");
Color.addToMap("#00563F", "Castleton green");
Color.addToMap("#062A78", "Catalina blue");
Color.addToMap("#703642", "Catawba");
Color.addToMap("#C95A49", "Cedar Chest");
Color.addToMap("#92A1CF", "Ceil");
Color.addToMap("#ACE1AF", "Celadon");
Color.addToMap("#007BA7", "Celadon blue");
Color.addToMap("#2F847C", "Celadon green");
Color.addToMap("#4997D0", "Celestial blue");
Color.addToMap("#EC3B83", "Cerise pink");
Color.addToMap("#2A52BE", "Cerulean blue");
Color.addToMap("#6D9BC3", "Cerulean frost");
Color.addToMap("#007AA5", "CG Blue");
Color.addToMap("#E03C31", "CG Red");
Color.addToMap("#A0785A", "Chamoisee");
Color.addToMap("#F7E7CE", "Champagne");
Color.addToMap("#36454F", "Charcoal");
Color.addToMap("#232B2B", "Charleston green");
Color.addToMap("#E68FAC", "Charm pink");
Color.addToMap("#DFFF00", "Chartreuse");
Color.addToMap("#7FFF00", "Chartreuse (web)");
Color.addToMap("#DE3163", "Cherry");
Color.addToMap("#FFB7C5", "Cherry blossom pink");
Color.addToMap("#954535", "Chestnut");
Color.addToMap("#A8516E", "China rose");
Color.addToMap("#AA381E", "Chinese red");
Color.addToMap("#856088", "Chinese violet");
Color.addToMap("#7B3F00", "Chocolate");
Color.addToMap("#FFA700", "Chrome yellow");
Color.addToMap("#98817B", "Cinereous");
Color.addToMap("#E4D00A", "Citrine");
Color.addToMap("#9FA91F", "Citron");
Color.addToMap("#7F1734", "Claret");
Color.addToMap("#FBCCE7", "Classic rose");
Color.addToMap("#0047AB", "Cobalt");
Color.addToMap("#D2691E", "Cocoa brown");
Color.addToMap("#965A3E", "Coconut");
Color.addToMap("#6F4E37", "Coffee Brown");
Color.addToMap("#9BDDFF", "Columbia blue");
Color.addToMap("#002E63", "Cool black");
Color.addToMap("#8C92AC", "Cool grey");
Color.addToMap("#B87333", "Copper");
Color.addToMap("#AD6F69", "Copper penny");
Color.addToMap("#CB6D51", "Copper red");
Color.addToMap("#996666", "Copper rose");
Color.addToMap("#FF3800", "Coquelicot");
Color.addToMap("#FF7F50", "Coral");
Color.addToMap("#F88379", "Coral pink");
Color.addToMap("#FF4040", "Coral red");
Color.addToMap("#893F45", "Cordovan");
Color.addToMap("#FBEC5D", "Corn Yellow");
Color.addToMap("#B31B1B", "Cornell Red");
Color.addToMap("#6495ED", "Cornflower blue");
Color.addToMap("#FFF8DC", "Cornsilk");
Color.addToMap("#FFF8E7", "Cosmic latte");
Color.addToMap("#FFBCD9", "Cotton candy");
Color.addToMap("#FFFDD0", "Cream");
Color.addToMap("#DC143C", "Crimson");
Color.addToMap("#BE0032", "Crimson glory");
Color.addToMap("#00B7EB", "Cyan");
Color.addToMap("#58427C", "Cyber grape");
Color.addToMap("#FFD300", "Cyber yellow");
Color.addToMap("#FFFF31", "Daffodil");
Color.addToMap("#F0E130", "Dandelion");
Color.addToMap("#00008B", "Dark blue");
Color.addToMap("#666699", "Dark blue-gray");
Color.addToMap("#654321", "Dark brown");
Color.addToMap("#5D3954", "Dark byzantium");
Color.addToMap("#A40000", "Dark candy apple red");
Color.addToMap("#08457E", "Dark cerulean");
Color.addToMap("#986960", "Dark chestnut");
Color.addToMap("#CD5B45", "Dark coral");
Color.addToMap("#008B8B", "Dark cyan");
Color.addToMap("#536878", "Dark electric blue");
Color.addToMap("#B8860B", "Dark goldenrod");
Color.addToMap("#A9A9A9", "Dark gray");
Color.addToMap("#013220", "Dark green");
Color.addToMap("#00416A", "Dark imperial blue");
Color.addToMap("#1A2421", "Dark jungle green");
Color.addToMap("#BDB76B", "Dark khaki");
Color.addToMap("#734F96", "Dark lavender");
Color.addToMap("#534B4F", "Dark liver");
Color.addToMap("#543D37", "Dark liver (horses)");
Color.addToMap("#8B008B", "Dark magenta");
Color.addToMap("#003366", "Dark midnight blue");
Color.addToMap("#4A5D23", "Dark moss green");
Color.addToMap("#556B2F", "Dark olive green");
Color.addToMap("#FF8C00", "Dark orange");
Color.addToMap("#9932CC", "Dark orchid");
Color.addToMap("#779ECB", "Dark pastel blue");
Color.addToMap("#03C03C", "Dark pastel green");
Color.addToMap("#966FD6", "Dark pastel purple");
Color.addToMap("#C23B22", "Dark pastel red");
Color.addToMap("#E75480", "Dark pink");
Color.addToMap("#003399", "Dark powder blue");
Color.addToMap("#4F3A3C", "Dark puce");
Color.addToMap("#872657", "Dark raspberry");
Color.addToMap("#8B0000", "Dark red");
Color.addToMap("#E9967A", "Dark salmon");
Color.addToMap("#560319", "Dark scarlet");
Color.addToMap("#8FBC8F", "Dark sea green");
Color.addToMap("#3C1414", "Dark sienna");
Color.addToMap("#8CBED6", "Dark sky blue");
Color.addToMap("#483D8B", "Dark slate blue");
Color.addToMap("#2F4F4F", "Dark slate gray");
Color.addToMap("#177245", "Dark spring green");
Color.addToMap("#918151", "Dark tan");
Color.addToMap("#FFA812", "Dark tangerine");
Color.addToMap("#CC4E5C", "Dark terra cotta");
Color.addToMap("#00CED1", "Dark turquoise");
Color.addToMap("#D1BEA8", "Dark vanilla");
Color.addToMap("#9400D3", "Dark violet");
Color.addToMap("#9B870C", "Dark yellow");
Color.addToMap("#00703C", "Dartmouth green");
Color.addToMap("#555555", "Davy's grey");
Color.addToMap("#D70A53", "Debian red");
Color.addToMap("#A9203E", "Deep carmine");
Color.addToMap("#EF3038", "Deep carmine pink");
Color.addToMap("#E9692C", "Deep carrot orange");
Color.addToMap("#DA3287", "Deep cerise");
Color.addToMap("#B94E48", "Deep chestnut");
Color.addToMap("#C154C1", "Deep fuchsia");
Color.addToMap("#004B49", "Deep jungle green");
Color.addToMap("#F5C71A", "Deep lemon");
Color.addToMap("#9955BB", "Deep lilac");
Color.addToMap("#CC00CC", "Deep magenta");
Color.addToMap("#D473D4", "Deep mauve");
Color.addToMap("#355E3B", "Deep moss green");
Color.addToMap("#FFCBA4", "Deep peach");
Color.addToMap("#A95C68", "Deep puce");
Color.addToMap("#843F5B", "Deep ruby");
Color.addToMap("#FF9933", "Deep saffron");
Color.addToMap("#00BFFF", "Deep sky blue");
Color.addToMap("#4A646C", "Deep Space Sparkle");
Color.addToMap("#7E5E60", "Deep Taupe");
Color.addToMap("#66424D", "Deep Tuscan red");
Color.addToMap("#BA8759", "Deer");
Color.addToMap("#1560BD", "Denim");
Color.addToMap("#EDC9AF", "Desert sand");
Color.addToMap("#EA3C53", "Desire");
Color.addToMap("#B9F2FF", "Diamond");
Color.addToMap("#696969", "Dim gray");
Color.addToMap("#9B7653", "Dirt");
Color.addToMap("#1E90FF", "Dodger blue");
Color.addToMap("#D71868", "Dogwood rose");
Color.addToMap("#85BB65", "Dollar bill");
Color.addToMap("#664C28", "Donkey Brown");
Color.addToMap("#00009C", "Duke blue");
Color.addToMap("#E5CCC9", "Dust storm");
Color.addToMap("#EFDFBB", "Dutch white");
Color.addToMap("#E1A95F", "Earth yellow");
Color.addToMap("#555D50", "Ebony");
Color.addToMap("#1B1B1B", "Eerie black");
Color.addToMap("#614051", "Eggplant");
Color.addToMap("#F0EAD6", "Eggshell");
Color.addToMap("#1034A6", "Egyptian blue");
Color.addToMap("#7DF9FF", "Electric blue");
Color.addToMap("#FF003F", "Electric crimson");
Color.addToMap("#00FF00", "Electric green");
Color.addToMap("#6F00FF", "Electric indigo");
Color.addToMap("#CCFF00", "Electric lime");
Color.addToMap("#BF00FF", "Electric purple");
Color.addToMap("#3F00FF", "Electric ultramarine");
Color.addToMap("#FFFF00", "Electric yellow");
Color.addToMap("#50C878", "Emerald");
Color.addToMap("#6C3082", "Eminence");
Color.addToMap("#1B4D3E", "English green");
Color.addToMap("#B48395", "English lavender");
Color.addToMap("#AB4B52", "English red");
Color.addToMap("#563C5C", "English violet");
Color.addToMap("#96C8A2", "Eton blue");
Color.addToMap("#44D7A8", "Eucalyptus");
Color.addToMap("#801818", "Falu red");
Color.addToMap("#B53389", "Fandango");
Color.addToMap("#DE5285", "Fandango pink");
Color.addToMap("#F400A1", "Fashion fuchsia");
Color.addToMap("#E5AA70", "Fawn");
Color.addToMap("#4D5D53", "Feldgrau");
Color.addToMap("#4F7942", "Fern green");
Color.addToMap("#FF2800", "Ferrari Red");
Color.addToMap("#6C541E", "Field drab");
Color.addToMap("#B22222", "Firebrick");
Color.addToMap("#CE2029", "Fire engine red");
Color.addToMap("#E25822", "Flame");
Color.addToMap("#FC8EAC", "Flamingo pink");
Color.addToMap("#F7E98E", "Flavescent");
Color.addToMap("#EEDC82", "Flax");
Color.addToMap("#A2006D", "Flirt");
Color.addToMap("#FFFAF0", "Floral white");
Color.addToMap("#FFBF00", "Fluorescent orange");
Color.addToMap("#FF1493", "Fluorescent pink");
Color.addToMap("#FF004F", "Folly");
Color.addToMap("#014421", "Forest green");
Color.addToMap("#228B22", "Forest green (web)");
Color.addToMap("#856D4D", "French bistre");
Color.addToMap("#0072BB", "French blue");
Color.addToMap("#FD3F92", "French fuchsia");
Color.addToMap("#86608E", "French lilac");
Color.addToMap("#9EFD38", "French lime");
Color.addToMap("#FD6C9E", "French pink");
Color.addToMap("#4E1609", "French puce");
Color.addToMap("#C72C48", "French raspberry");
Color.addToMap("#F64A8A", "French rose");
Color.addToMap("#77B5FE", "French sky blue");
Color.addToMap("#8806CE", "French violet");
Color.addToMap("#AC1E44", "French wine");
Color.addToMap("#A6E7FF", "Fresh Air");
Color.addToMap("#FF77FF", "Fuchsia pink");
Color.addToMap("#CC397B", "Fuchsia purple");
Color.addToMap("#C74375", "Fuchsia rose");
Color.addToMap("#E48400", "Fulvous");
Color.addToMap("#CC6666", "Fuzzy Wuzzy");
Color.addToMap("#DCDCDC", "Gainsboro");
Color.addToMap("#E49B0F", "Gamboge");
Color.addToMap("#007F66", "Generic viridian");
Color.addToMap("#F8F8FF", "Ghost white");
Color.addToMap("#FE5A1D", "Giants orange");
Color.addToMap("#B06500", "Ginger");
Color.addToMap("#6082B6", "Glaucous");
Color.addToMap("#E6E8FA", "Glitter");
Color.addToMap("#00AB66", "GO green");
Color.addToMap("#D4AF37", "Gold (metallic)");
Color.addToMap("#FFD700", "Gold (web) (Golden)");
Color.addToMap("#85754E", "Gold Fusion");
Color.addToMap("#996515", "Golden brown");
Color.addToMap("#FCC200", "Golden poppy");
Color.addToMap("#FFDF00", "Golden yellow");
Color.addToMap("#DAA520", "Goldenrod");
Color.addToMap("#A8E4A0", "Granny Smith Apple");
Color.addToMap("#6F2DA8", "Grape");
Color.addToMap("#808080", "Gray");
Color.addToMap("#BEBEBE", "Gray (X11 gray)");
Color.addToMap("#465945", "Gray-asparagus");
Color.addToMap("#1CAC78", "Green (Crayola)");
Color.addToMap("#008000", "Green");
Color.addToMap("#00A877", "Green (Munsell)");
Color.addToMap("#009F6B", "Green (NCS)");
Color.addToMap("#00A550", "Green (pigment)");
Color.addToMap("#66B032", "Green (RYB)");
Color.addToMap("#ADFF2F", "Green-yellow");
Color.addToMap("#A99A86", "Grullo");
Color.addToMap("#663854", "Halaya ube");
Color.addToMap("#446CCF", "Han blue");
Color.addToMap("#5218FA", "Han purple");
Color.addToMap("#E9D66B", "Hansa yellow");
Color.addToMap("#3FFF00", "Harlequin");
Color.addToMap("#C90016", "Harvard crimson");
Color.addToMap("#DA9100", "Harvest gold");
Color.addToMap("#DF73FF", "Heliotrope");
Color.addToMap("#AA98A9", "Heliotrope gray");
Color.addToMap("#F0FFF0", "Honeydew");
Color.addToMap("#006DB0", "Honolulu blue");
Color.addToMap("#49796B", "Hooker's green");
Color.addToMap("#FF1DCE", "Hot magenta");
Color.addToMap("#FF69B4", "Hot pink");
Color.addToMap("#71A6D2", "Iceberg");
Color.addToMap("#FCF75E", "Icterine");
Color.addToMap("#319177", "Illuminating Emerald");
Color.addToMap("#602F6B", "Imperial");
Color.addToMap("#002395", "Imperial blue");
Color.addToMap("#66023C", "Imperial purple");
Color.addToMap("#ED2939", "Imperial red");
Color.addToMap("#B2EC5D", "Inchworm");
Color.addToMap("#4C516D", "Independence");
Color.addToMap("#138808", "India green");
Color.addToMap("#CD5C5C", "Indian red");
Color.addToMap("#E3A857", "Indian yellow");
Color.addToMap("#4B0082", "Indigo");
Color.addToMap("#002FA7", "International Klein Blue");
Color.addToMap("#FF4F00", "International orange (aerospace)");
Color.addToMap("#BA160C", "International orange (engineering)");
Color.addToMap("#C0362C", "International orange (Golden Gate Bridge)");
Color.addToMap("#5A4FCF", "Iris");
Color.addToMap("#F4F0EC", "Isabelline");
Color.addToMap("#009000", "Islamic green");
Color.addToMap("#B2FFFF", "Italian sky blue");
Color.addToMap("#FFFFF0", "Ivory");
Color.addToMap("#00A86B", "Jade");
Color.addToMap("#9D2933", "Japanese carmine");
Color.addToMap("#264348", "Japanese indigo");
Color.addToMap("#5B3256", "Japanese violet");
Color.addToMap("#D73B3E", "Jasper");
Color.addToMap("#A50B5E", "Jazzberry jam");
Color.addToMap("#DA614E", "Jelly Bean");
Color.addToMap("#343434", "Jet");
Color.addToMap("#F4CA16", "Jonquil");
Color.addToMap("#8AB9F1", "Jordy blue");
Color.addToMap("#BDDA57", "June bud");
Color.addToMap("#29AB87", "Jungle green");
Color.addToMap("#4CBB17", "Kelly green");
Color.addToMap("#7C1C05", "Kenyan copper");
Color.addToMap("#3AB09E", "Keppel");
Color.addToMap("#C3B091", "Khaki");
Color.addToMap("#E79FC4", "Kobi");
Color.addToMap("#354230", "Kombu green");
Color.addToMap("#E8000D", "KU Crimson");
Color.addToMap("#087830", "La Salle Green");
Color.addToMap("#D6CADD", "Languid lavender");
Color.addToMap("#26619C", "Lapis lazuli");
Color.addToMap("#A9BA9D", "Laurel green");
Color.addToMap("#CF1020", "Lava");
Color.addToMap("#B57EDC", "Lavender (floral)");
Color.addToMap("#CCCCFF", "Lavender blue");
Color.addToMap("#FFF0F5", "Lavender blush");
Color.addToMap("#C4C3D0", "Lavender gray");
Color.addToMap("#9457EB", "Lavender indigo");
Color.addToMap("#EE82EE", "Lavender magenta");
Color.addToMap("#E6E6FA", "Lavender mist");
Color.addToMap("#FBAED2", "Lavender pink");
Color.addToMap("#967BB6", "Lavender purple");
Color.addToMap("#FBA0E3", "Lavender rose");
Color.addToMap("#7CFC00", "Lawn green");
Color.addToMap("#FFF700", "Lemon");
Color.addToMap("#FFFACD", "Lemon chiffon");
Color.addToMap("#CCA01D", "Lemon curry");
Color.addToMap("#FDFF00", "Lemon glacier");
Color.addToMap("#E3FF00", "Lemon lime");
Color.addToMap("#F6EABE", "Lemon meringue");
Color.addToMap("#FFF44F", "Lemon yellow");
Color.addToMap("#1A1110", "Licorice");
Color.addToMap("#545AA7", "Liberty");
Color.addToMap("#FDD5B1", "Light apricot");
Color.addToMap("#ADD8E6", "Light blue");
Color.addToMap("#B5651D", "Light brown");
Color.addToMap("#E66771", "Light carmine pink");
Color.addToMap("#F08080", "Light coral");
Color.addToMap("#93CCEA", "Light cornflower blue");
Color.addToMap("#F56991", "Light crimson");
Color.addToMap("#E0FFFF", "Light cyan");
Color.addToMap("#FF5CCD", "Light deep pink");
Color.addToMap("#C8AD7F", "Light French beige");
Color.addToMap("#F984EF", "Light fuchsia pink");
Color.addToMap("#FAFAD2", "Light goldenrod yellow");
Color.addToMap("#D3D3D3", "Light gray");
Color.addToMap("#90EE90", "Light green");
Color.addToMap("#FFB3DE", "Light hot pink");
Color.addToMap("#F0E68C", "Light khaki");
Color.addToMap("#D39BCB", "Light medium orchid");
Color.addToMap("#ADDFAD", "Light moss green");
Color.addToMap("#E6A8D7", "Light orchid");
Color.addToMap("#B19CD9", "Light pastel purple");
Color.addToMap("#FFB6C1", "Light pink");
Color.addToMap("#E97451", "Light red ochre");
Color.addToMap("#FFA07A", "Light salmon");
Color.addToMap("#FF9999", "Light salmon pink");
Color.addToMap("#20B2AA", "Light sea green");
Color.addToMap("#87CEFA", "Light sky blue");
Color.addToMap("#778899", "Light slate gray");
Color.addToMap("#B0C4DE", "Light steel blue");
Color.addToMap("#B38B6D", "Light taupe");
Color.addToMap("#FFFFE0", "Light yellow");
Color.addToMap("#C8A2C8", "Lilac");
Color.addToMap("#BFFF00", "Lime");
Color.addToMap("#32CD32", "Lime green");
Color.addToMap("#9DC209", "Limerick");
Color.addToMap("#195905", "Lincoln green");
Color.addToMap("#FAF0E6", "Linen");
Color.addToMap("#6CA0DC", "Little boy blue");
Color.addToMap("#B86D29", "Liver (dogs)");
Color.addToMap("#6C2E1F", "Liver");
Color.addToMap("#987456", "Liver chestnut");
Color.addToMap("#FFE4CD", "Lumber");
Color.addToMap("#E62020", "Lust");
Color.addToMap("#FF00FF", "Magenta");
Color.addToMap("#CA1F7B", "Magenta (dye)");
Color.addToMap("#D0417E", "Magenta (Pantone)");
Color.addToMap("#FF0090", "Magenta (process)");
Color.addToMap("#9F4576", "Magenta haze");
Color.addToMap("#AAF0D1", "Magic mint");
Color.addToMap("#F8F4FF", "Magnolia");
Color.addToMap("#C04000", "Mahogany");
Color.addToMap("#6050DC", "Majorelle Blue");
Color.addToMap("#0BDA51", "Malachite");
Color.addToMap("#979AAA", "Manatee");
Color.addToMap("#FF8243", "Mango Tango");
Color.addToMap("#74C365", "Mantis");
Color.addToMap("#880085", "Mardi Gras");
Color.addToMap("#800000", "Maroon");
Color.addToMap("#E0B0FF", "Mauve");
Color.addToMap("#915F6D", "Mauve taupe");
Color.addToMap("#EF98AA", "Mauvelous");
Color.addToMap("#4C9141", "May green");
Color.addToMap("#73C2FB", "Maya blue");
Color.addToMap("#E5B73B", "Meat brown");
Color.addToMap("#66DDAA", "Medium aquamarine");
Color.addToMap("#0000CD", "Medium blue");
Color.addToMap("#E2062C", "Medium candy apple red");
Color.addToMap("#AF4035", "Medium carmine");
Color.addToMap("#035096", "Medium electric blue");
Color.addToMap("#1C352D", "Medium jungle green");
Color.addToMap("#BA55D3", "Medium orchid");
Color.addToMap("#9370DB", "Medium purple");
Color.addToMap("#BB3385", "Medium red-violet");
Color.addToMap("#AA4069", "Medium ruby");
Color.addToMap("#3CB371", "Medium sea green");
Color.addToMap("#80DAEB", "Medium sky blue");
Color.addToMap("#7B68EE", "Medium slate blue");
Color.addToMap("#C9DC87", "Medium spring bud");
Color.addToMap("#00FA9A", "Medium spring green");
Color.addToMap("#674C47", "Medium taupe");
Color.addToMap("#48D1CC", "Medium turquoise");
Color.addToMap("#D9603B", "Pale vermilion");
Color.addToMap("#F8B878", "Mellow apricot");
Color.addToMap("#F8DE7E", "Mellow yellow");
Color.addToMap("#FDBCB4", "Melon");
Color.addToMap("#0A7E8C", "Metallic Seaweed");
Color.addToMap("#9C7C38", "Metallic Sunburst");
Color.addToMap("#E4007C", "Mexican pink");
Color.addToMap("#191970", "Midnight blue");
Color.addToMap("#004953", "Midnight green (eagle green)");
Color.addToMap("#FFC40C", "Mikado yellow");
Color.addToMap("#E3F988", "Mindaro");
Color.addToMap("#3EB489", "Mint");
Color.addToMap("#F5FFFA", "Mint cream");
Color.addToMap("#98FF98", "Mint green");
Color.addToMap("#FFE4E1", "Misty rose");
Color.addToMap("#73A9C2", "Moonstone blue");
Color.addToMap("#AE0C00", "Mordant red 19");
Color.addToMap("#8A9A5B", "Moss green");
Color.addToMap("#30BA8F", "Mountain Meadow");
Color.addToMap("#997A8D", "Mountbatten pink");
Color.addToMap("#18453B", "MSU Green");
Color.addToMap("#306030", "Mughal green");
Color.addToMap("#C54B8C", "Mulberry");
Color.addToMap("#FFDB58", "Mustard");
Color.addToMap("#317873", "Myrtle green");
Color.addToMap("#F6ADC6", "Nadeshiko pink");
Color.addToMap("#2A8000", "Napier green");
Color.addToMap("#FFDEAD", "Navajo white");
Color.addToMap("#000080", "Navy");
Color.addToMap("#FFA343", "Neon Carrot");
Color.addToMap("#FE4164", "Neon fuchsia");
Color.addToMap("#39FF14", "Neon green");
Color.addToMap("#214FC6", "New Car");
Color.addToMap("#D7837F", "New York pink");
Color.addToMap("#A4DDED", "Non-photo blue");
Color.addToMap("#059033", "North Texas Green");
Color.addToMap("#E9FFDB", "Nyanza");
Color.addToMap("#0077BE", "Ocean Boat Blue");
Color.addToMap("#CC7722", "Ochre");
Color.addToMap("#43302E", "Old burgundy");
Color.addToMap("#CFB53B", "Old gold");
Color.addToMap("#FDF5E6", "Old lace");
Color.addToMap("#796878", "Old lavender");
Color.addToMap("#673147", "Old mauve");
Color.addToMap("#867E36", "Old moss green");
Color.addToMap("#C08081", "Old rose");
Color.addToMap("#808000", "Olive");
Color.addToMap("#6B8E23", "Olive Drab #3");
Color.addToMap("#3C341F", "Olive Drab #7");
Color.addToMap("#9AB973", "Olivine");
Color.addToMap("#353839", "Onyx");
Color.addToMap("#B784A7", "Opera mauve");
Color.addToMap("#FF7F00", "Orange");
Color.addToMap("#FF7538", "Orange (Crayola)");
Color.addToMap("#FF5800", "Orange (Pantone)");
Color.addToMap("#FB9902", "Orange (RYB)");
Color.addToMap("#FFA500", "Orange (web)");
Color.addToMap("#FF9F00", "Orange peel");
Color.addToMap("#FF4500", "Orange-red");
Color.addToMap("#DA70D6", "Orchid");
Color.addToMap("#F2BDCD", "Orchid pink");
Color.addToMap("#FB4F14", "Orioles orange");
Color.addToMap("#414A4C", "Outer Space");
Color.addToMap("#FF6E4A", "Outrageous Orange");
Color.addToMap("#002147", "Oxford Blue");
Color.addToMap("#990000", "Crimson Red");
Color.addToMap("#006600", "Pakistan green");
Color.addToMap("#273BE2", "Palatinate blue");
Color.addToMap("#682860", "Palatinate purple");
Color.addToMap("#BCD4E6", "Pale aqua");
Color.addToMap("#AFEEEE", "Pale blue");
Color.addToMap("#987654", "Pale brown");
Color.addToMap("#9BC4E2", "Pale cerulean");
Color.addToMap("#DDADAF", "Pale chestnut");
Color.addToMap("#DA8A67", "Pale copper");
Color.addToMap("#ABCDEF", "Pale cornflower blue");
Color.addToMap("#E6BE8A", "Pale gold");
Color.addToMap("#EEE8AA", "Pale goldenrod");
Color.addToMap("#98FB98", "Pale green");
Color.addToMap("#DCD0FF", "Pale lavender");
Color.addToMap("#F984E5", "Pale magenta");
Color.addToMap("#FADADD", "Pale pink");
Color.addToMap("#DDA0DD", "Pale plum");
Color.addToMap("#DB7093", "Pale red-violet");
Color.addToMap("#96DED1", "Pale robin egg blue");
Color.addToMap("#C9C0BB", "Pale silver");
Color.addToMap("#ECEBBD", "Pale spring bud");
Color.addToMap("#BC987E", "Pale taupe");
Color.addToMap("#78184A", "Pansy purple");
Color.addToMap("#009B7D", "Paolo Veronese green");
Color.addToMap("#FFEFD5", "Papaya whip");
Color.addToMap("#E63E62", "Paradise pink");
Color.addToMap("#AEC6CF", "Pastel blue");
Color.addToMap("#836953", "Pastel brown");
Color.addToMap("#CFCFC4", "Pastel gray");
Color.addToMap("#77DD77", "Pastel green");
Color.addToMap("#F49AC2", "Pastel magenta");
Color.addToMap("#FFB347", "Pastel orange");
Color.addToMap("#DEA5A4", "Pastel pink");
Color.addToMap("#B39EB5", "Pastel purple");
Color.addToMap("#FF6961", "Pastel red");
Color.addToMap("#CB99C9", "Pastel violet");
Color.addToMap("#FDFD96", "Pastel yellow");
Color.addToMap("#FFE5B4", "Peach");
Color.addToMap("#FFCC99", "Peach-orange");
Color.addToMap("#FFDAB9", "Peach puff");
Color.addToMap("#FADFAD", "Peach-yellow");
Color.addToMap("#D1E231", "Pear");
Color.addToMap("#EAE0C8", "Pearl");
Color.addToMap("#88D8C0", "Pearl Aqua");
Color.addToMap("#B768A2", "Pearly purple");
Color.addToMap("#E6E200", "Peridot");
Color.addToMap("#1C39BB", "Persian blue");
Color.addToMap("#00A693", "Persian green");
Color.addToMap("#32127A", "Persian indigo");
Color.addToMap("#D99058", "Persian orange");
Color.addToMap("#F77FBE", "Persian pink");
Color.addToMap("#701C1C", "Persian plum");
Color.addToMap("#CC3333", "Persian red");
Color.addToMap("#FE28A2", "Persian rose");
Color.addToMap("#EC5800", "Persimmon");
Color.addToMap("#CD853F", "Peru");
Color.addToMap("#000F89", "Phthalo blue");
Color.addToMap("#123524", "Phthalo green");
Color.addToMap("#45B1E8", "Picton blue");
Color.addToMap("#C30B4E", "Pictorial carmine");
Color.addToMap("#FDDDE6", "Piggy pink");
Color.addToMap("#01796F", "Pine green");
Color.addToMap("#FFC0CB", "Pink");
Color.addToMap("#D74894", "Pink (Pantone)");
Color.addToMap("#FFDDF4", "Pink lace");
Color.addToMap("#D8B2D1", "Pink lavender");
Color.addToMap("#FF9966", "Pink-orange");
Color.addToMap("#E7ACCF", "Pink pearl");
Color.addToMap("#F78FA7", "Pink Sherbet");
Color.addToMap("#93C572", "Pistachio");
Color.addToMap("#E5E4E2", "Platinum");
Color.addToMap("#8E4585", "Plum");
Color.addToMap("#BE4F62", "Popstar");
Color.addToMap("#FF5A36", "Portland Orange");
Color.addToMap("#B0E0E6", "Powder blue");
Color.addToMap("#FF8F00", "Princeton orange");
Color.addToMap("#003153", "Prussian blue");
Color.addToMap("#DF00FF", "Psychedelic purple");
Color.addToMap("#CC8899", "Puce");
Color.addToMap("#644117", "Pullman Brown (UPS Brown)");
Color.addToMap("#FF7518", "Pumpkin");
Color.addToMap("#800080", "Deep purple");
Color.addToMap("#9F00C5", "Purple (Munsell)");
Color.addToMap("#A020F0", "Purple");
Color.addToMap("#69359C", "Purple Heart");
Color.addToMap("#9678B6", "Purple mountain majesty");
Color.addToMap("#4E5180", "Purple navy");
Color.addToMap("#FE4EDA", "Purple pizzazz");
Color.addToMap("#50404D", "Purple taupe");
Color.addToMap("#9A4EAE", "Purpureus");
Color.addToMap("#51484F", "Quartz");
Color.addToMap("#436B95", "Queen blue");
Color.addToMap("#E8CCD7", "Queen pink");
Color.addToMap("#8E3A59", "Quinacridone magenta");
Color.addToMap("#FF355E", "Radical Red");
Color.addToMap("#FBAB60", "Rajah");
Color.addToMap("#E30B5D", "Raspberry");
Color.addToMap("#E25098", "Raspberry pink");
Color.addToMap("#B3446C", "Raspberry rose");
Color.addToMap("#826644", "Raw umber");
Color.addToMap("#FF33CC", "Razzle dazzle rose");
Color.addToMap("#E3256B", "Razzmatazz");
Color.addToMap("#8D4E85", "Razzmic Berry");
Color.addToMap("#FF0000", "Red");
Color.addToMap("#EE204D", "Red (Crayola)");
Color.addToMap("#F2003C", "Red (Munsell)");
Color.addToMap("#C40233", "Red (NCS)");
Color.addToMap("#ED1C24", "Red (pigment)");
Color.addToMap("#FE2712", "Red (RYB)");
Color.addToMap("#A52A2A", "Red-brown");
Color.addToMap("#860111", "Red devil");
Color.addToMap("#FF5349", "Red-orange");
Color.addToMap("#E40078", "Red-purple");
Color.addToMap("#C71585", "Red-violet");
Color.addToMap("#A45A52", "Redwood");
Color.addToMap("#522D80", "Regalia");
Color.addToMap("#002387", "Resolution blue");
Color.addToMap("#777696", "Rhythm");
Color.addToMap("#004040", "Rich black");
Color.addToMap("#F1A7FE", "Rich brilliant lavender");
Color.addToMap("#D70040", "Rich carmine");
Color.addToMap("#0892D0", "Rich electric blue");
Color.addToMap("#A76BCF", "Rich lavender");
Color.addToMap("#B666D2", "Rich lilac");
Color.addToMap("#B03060", "Rich maroon");
Color.addToMap("#444C38", "Rifle green");
Color.addToMap("#704241", "Deep Roast coffee");
Color.addToMap("#00CCCC", "Robin egg blue");
Color.addToMap("#8A7F80", "Rocket metallic");
Color.addToMap("#838996", "Roman silver");
Color.addToMap("#F9429E", "Rose bonbon");
Color.addToMap("#674846", "Rose ebony");
Color.addToMap("#B76E79", "Rose gold");
Color.addToMap("#FF66CC", "Rose pink");
Color.addToMap("#C21E56", "Rose red");
Color.addToMap("#905D5D", "Rose taupe");
Color.addToMap("#AB4E52", "Rose vale");
Color.addToMap("#65000B", "Rosewood");
Color.addToMap("#D40000", "Rosso corsa");
Color.addToMap("#BC8F8F", "Rosy brown");
Color.addToMap("#0038A8", "Royal azure");
Color.addToMap("#002366", "Royal blue");
Color.addToMap("#4169E1", "Royal light blue");
Color.addToMap("#CA2C92", "Royal fuchsia");
Color.addToMap("#7851A9", "Royal purple");
Color.addToMap("#FADA5E", "Royal yellow");
Color.addToMap("#CE4676", "Ruber");
Color.addToMap("#D10056", "Rubine red");
Color.addToMap("#E0115F", "Ruby");
Color.addToMap("#9B111E", "Ruby red");
Color.addToMap("#FF0028", "Ruddy");
Color.addToMap("#BB6528", "Ruddy brown");
Color.addToMap("#E18E96", "Ruddy pink");
Color.addToMap("#A81C07", "Rufous");
Color.addToMap("#80461B", "Russet");
Color.addToMap("#679267", "Russian green");
Color.addToMap("#32174D", "Russian violet");
Color.addToMap("#B7410E", "Rust");
Color.addToMap("#DA2C43", "Rusty red");
Color.addToMap("#8B4513", "Saddle brown");
Color.addToMap("#FF6700", "Safety orange (blaze orange)");
Color.addToMap("#EED202", "Safety yellow");
Color.addToMap("#F4C430", "Saffron");
Color.addToMap("#BCB88A", "Sage");
Color.addToMap("#23297A", "St. Patrick's blue");
Color.addToMap("#FA8072", "Salmon");
Color.addToMap("#FF91A4", "Salmon pink");
Color.addToMap("#C2B280", "Sand");
Color.addToMap("#ECD540", "Sandstorm");
Color.addToMap("#F4A460", "Sandy brown");
Color.addToMap("#92000A", "Sangria");
Color.addToMap("#507D2A", "Sap green");
Color.addToMap("#0F52BA", "Sapphire");
Color.addToMap("#0067A5", "Sapphire blue");
Color.addToMap("#CBA135", "Satin sheen gold");
Color.addToMap("#FF2400", "Scarlet");
Color.addToMap("#FFD800", "School bus yellow");
Color.addToMap("#76FF7A", "Screamin' Green");
Color.addToMap("#006994", "Sea blue");
Color.addToMap("#2E8B57", "Sea green");
Color.addToMap("#321414", "Seal brown");
Color.addToMap("#FFF5EE", "Seashell");
Color.addToMap("#FFBA00", "Selective yellow");
Color.addToMap("#704214", "Sepia");
Color.addToMap("#8A795D", "Shadow");
Color.addToMap("#778BA5", "Shadow blue");
Color.addToMap("#FFCFF1", "Shampoo");
Color.addToMap("#009E60", "Shamrock green");
Color.addToMap("#8FD400", "Sheen Green");
Color.addToMap("#D98695", "Shimmering Blush");
Color.addToMap("#FC0FC0", "Shocking pink");
Color.addToMap("#882D17", "Sienna");
Color.addToMap("#C0C0C0", "Silver");
Color.addToMap("#ACACAC", "Silver chalice");
Color.addToMap("#5D89BA", "Silver Lake blue");
Color.addToMap("#C4AEAD", "Silver pink");
Color.addToMap("#BFC1C2", "Silver sand");
Color.addToMap("#CB410B", "Sinopia");
Color.addToMap("#007474", "Skobeloff");
Color.addToMap("#87CEEB", "Sky blue");
Color.addToMap("#CF71AF", "Sky magenta");
Color.addToMap("#6A5ACD", "Slate blue");
Color.addToMap("#708090", "Slate gray");
Color.addToMap("#C84186", "Smitten");
Color.addToMap("#738276", "Smoke");
Color.addToMap("#933D41", "Smokey topaz");
Color.addToMap("#100C08", "Smoky black");
Color.addToMap("#FFFAFA", "Snow");
Color.addToMap("#CEC8EF", "Soap");
Color.addToMap("#893843", "Solid pink");
Color.addToMap("#757575", "Sonic silver");
Color.addToMap("#9E1316", "Spartan Crimson");
Color.addToMap("#1D2951", "Space cadet");
Color.addToMap("#807532", "Spanish bistre");
Color.addToMap("#0070B8", "Spanish blue");
Color.addToMap("#D10047", "Spanish carmine");
Color.addToMap("#E51A4C", "Spanish crimson");
Color.addToMap("#989898", "Spanish gray");
Color.addToMap("#009150", "Spanish green");
Color.addToMap("#E86100", "Spanish orange");
Color.addToMap("#F7BFBE", "Spanish pink");
Color.addToMap("#E60026", "Spanish red");
Color.addToMap("#4C2882", "Spanish violet");
Color.addToMap("#007F5C", "Spanish viridian");
Color.addToMap("#0FC0FC", "Spiro Disco Ball");
Color.addToMap("#A7FC00", "Spring bud");
Color.addToMap("#00FF7F", "Spring green");
Color.addToMap("#007BB8", "Star command blue");
Color.addToMap("#4682B4", "Steel blue");
Color.addToMap("#CC33CC", "Steel pink");
Color.addToMap("#4F666A", "Stormcloud");
Color.addToMap("#E4D96F", "Straw");
Color.addToMap("#FC5A8D", "Strawberry");
Color.addToMap("#FFCC33", "Sunglow");
Color.addToMap("#E3AB57", "Sunray");
Color.addToMap("#FAD6A5", "Sunset");
Color.addToMap("#FD5E53", "Sunset orange");
Color.addToMap("#CF6BA9", "Super pink");
Color.addToMap("#D2B48C", "Tan");
Color.addToMap("#F94D00", "Tangelo");
Color.addToMap("#F28500", "Tangerine");
Color.addToMap("#FFCC00", "Tangerine yellow");
Color.addToMap("#483C32", "Dark Grayish Brown");
Color.addToMap("#8B8589", "Taupe gray");
Color.addToMap("#D0F0C0", "Tea green");
Color.addToMap("#F4C2C2", "Tea rose");
Color.addToMap("#008080", "Teal");
Color.addToMap("#367588", "Teal blue");
Color.addToMap("#99E6B3", "Teal deer");
Color.addToMap("#00827F", "Teal green");
Color.addToMap("#CF3476", "Telemagenta");
Color.addToMap("#CD5700", "Tenne");
Color.addToMap("#E2725B", "Terra cotta");
Color.addToMap("#D8BFD8", "Thistle");
Color.addToMap("#DE6FA1", "Thulian pink");
Color.addToMap("#FC89AC", "Tickle Me Pink");
Color.addToMap("#0ABAB5", "Tiffany Blue");
Color.addToMap("#E08D3C", "Tiger's eye");
Color.addToMap("#DBD7D2", "Timberwolf");
Color.addToMap("#EEE600", "Titanium yellow");
Color.addToMap("#FF6347", "Tomato");
Color.addToMap("#746CC0", "Toolbox");
Color.addToMap("#FFC87C", "Topaz");
Color.addToMap("#FD0E35", "Tractor red");
Color.addToMap("#00755E", "Tropical rain forest");
Color.addToMap("#0073CF", "True Blue");
Color.addToMap("#417DC1", "Tufts Blue");
Color.addToMap("#FF878D", "Tulip");
Color.addToMap("#DEAA88", "Tumbleweed");
Color.addToMap("#B57281", "Turkish rose");
Color.addToMap("#40E0D0", "Turquoise");
Color.addToMap("#00FFEF", "Turquoise blue");
Color.addToMap("#A0D6B4", "Turquoise green");
Color.addToMap("#7C4848", "Tuscan red");
Color.addToMap("#C09999", "Tuscany");
Color.addToMap("#8A496B", "Twilight lavender");
Color.addToMap("#0033AA", "UA blue");
Color.addToMap("#D9004C", "UA red");
Color.addToMap("#8878C3", "Ube");
Color.addToMap("#536895", "UCLA Blue");
Color.addToMap("#FFB300", "UCLA Gold");
Color.addToMap("#3CD070", "UFO Green");
Color.addToMap("#120A8F", "Ultramarine");
Color.addToMap("#4166F5", "Ultramarine blue");
Color.addToMap("#FF6FFF", "Ultra pink");
Color.addToMap("#635147", "Umber");
Color.addToMap("#FFDDCA", "Unbleached silk");
Color.addToMap("#5B92E5", "United Nations blue");
Color.addToMap("#B78727", "University of California Gold");
Color.addToMap("#FFFF66", "Unmellow yellow");
Color.addToMap("#7B1113", "UP Maroon");
Color.addToMap("#AE2029", "Upsdell red");
Color.addToMap("#E1AD21", "Urobilin");
Color.addToMap("#004F98", "USAFA blue");
Color.addToMap("#F77F00", "University of Tennessee Orange");
Color.addToMap("#D3003F", "Utah Crimson");
Color.addToMap("#F3E5AB", "Vanilla");
Color.addToMap("#F38FA9", "Vanilla ice");
Color.addToMap("#C5B358", "Vegas gold");
Color.addToMap("#C80815", "Venetian red");
Color.addToMap("#43B3AE", "Verdigris");
Color.addToMap("#E34234", "Medium vermilion");
Color.addToMap("#D9381E", "Vermilion");
Color.addToMap("#8F00FF", "Violet");
Color.addToMap("#7F00FF", "Violet (color wheel)");
Color.addToMap("#8601AF", "Violet (RYB)");
Color.addToMap("#324AB2", "Violet-blue");
Color.addToMap("#F75394", "Violet-red");
Color.addToMap("#40826D", "Viridian");
Color.addToMap("#009698", "Viridian green");
Color.addToMap("#922724", "Vivid auburn");
Color.addToMap("#9F1D35", "Vivid burgundy");
Color.addToMap("#DA1D81", "Vivid cerise");
Color.addToMap("#CC00FF", "Vivid orchid");
Color.addToMap("#00CCFF", "Vivid sky blue");
Color.addToMap("#FFA089", "Vivid tangerine");
Color.addToMap("#9F00FF", "Vivid violet");
Color.addToMap("#004242", "Warm black");
Color.addToMap("#A4F4F9", "Waterspout");
Color.addToMap("#645452", "Wenge");
Color.addToMap("#F5DEB3", "Wheat");
Color.addToMap("#FFFFFF", "White");
Color.addToMap("#F5F5F5", "White smoke");
Color.addToMap("#A2ADD0", "Wild blue yonder");
Color.addToMap("#D470A2", "Wild orchid");
Color.addToMap("#FF43A4", "Wild Strawberry");
Color.addToMap("#FC6C85", "Wild watermelon");
Color.addToMap("#FD5800", "Willpower orange");
Color.addToMap("#A75502", "Windsor tan");
Color.addToMap("#722F37", "Wine");
Color.addToMap("#C9A0DC", "Wisteria");
Color.addToMap("#C19A6B", "Wood brown");
Color.addToMap("#738678", "Xanadu");
Color.addToMap("#0F4D92", "Yale Blue");
Color.addToMap("#1C2841", "Yankees blue");
Color.addToMap("#FCE883", "Yellow (Crayola)");
Color.addToMap("#EFCC00", "Yellow (Munsell)");
Color.addToMap("#FEDF00", "Yellow (Pantone)");
Color.addToMap("#FEFE33", "Yellow");
Color.addToMap("#9ACD32", "Yellow Green");
Color.addToMap("#FFAE42", "Yellow Orange");
Color.addToMap("#FFF000", "Yellow rose");
Color.addToMap("#0014A8", "Zaffre");
Color.addToMap("#2C1608", "Zinnwaldite brown");
Color.addToMap("#39A78E", "Zomp");
