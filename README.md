Jag har valt att göra min todolista med hjälp av supabase då jag rätt snabbt blev klar med G-delen.
Det kändes som en väldigt stor utmaning då jag hade svårt att förstå hur jag skulle påbörja arbetet och
allt som behövdes ändras i min kod. Men eftersom jag hade tid så kändes det dumt att inte försöka mig på detta iallafall. 
Vi satt några i skolan och hjälpes åt lite hur vi skulle börja med supabase, vilket var väldigt bra och
lärorikt då det kändes som ett stort steg. Men när jag väl kom in i tänket så gick det ganska smidigt att sen
fortsätta själv med hjälp av dokumentationen och lite ChatGPT som hjälpte mig att förstå delarna jag var osäker på.

Jag har suttit länge och kämpat både med funktionaliteten och designen och försökt att få det så bra som möjligt.
Vissa saker fick jag dock dra ner på då jag märkte av lite buggar som behövdes åter gärdas. Bland annat så var en bugg
att jag fortsatte vara inloggad vid uppdatering av sidan, men det som visades var ”logga in” sektionen.
Jag löste det med en event lyssnare som loggar ut användare vid uppdatering, vilket kanske egentligen inte är den mest
användarvänliga lösningen. Men i brist av tid så kändes det som den enklaste lösningen just nu!

En stor bugg jag även märkte var att jag loggades in även fast jag skrivit fel lösenord.
Knappen ”Logga in” hade inte riktigt en felhantering. Jag fick då lägga till ett try/catch block för att
fånga upp felet och alltså bara byta sida om inloggningen fungerade. Där la jag till prompt också för att användaren
ska se vad som är fel. De skulle jag egentligen vilja göra snyggare och på ett annat sätt, men även där fick jag kompensera
och köra på det pga tiden. Men eftersom buggarna verkade lösa sig så är jag nöjd ändå då det är något jag kan fixa i efterhand!

Några smågrejer jag också skulle velat fixa för användarupplevelsen är att man även ska kunna trycka enter i stället
för på knappen när man redigerar en todo. Av någon anledning hade jag svårt att lösa det då det bara kom flera buggar
då som redigerade fel todo osv. Efter att ha suttit med det länge och bara blivit otroligt frustrerad så gav jag upp
på det och har än inte riktigt tagit tag i det än…  Jag skulle även velat ha en ”Glömt lösenord”-knapp och kanske 2 fält
för lösenord för säkerhet när man registrerar en användare. Men det är också något för framtiden!

En annan sak jag borde förbättrat är att jag blandat hur jag skrivit funktioner i main.
Det kanske inte ser det bästa ut. Jag skulle även kunna organisera bättre med fler moduler så att det inte blir
lika rörigt som det kanske är nu! Jag har lätt för att glömma sådant då jag alltid råkar fastna vid designen
av appen mer eftersom jag tycker det är roligast. Men det är något jag ska försöka tänka på i framtiden!
Allt som allt är jag ändå nöjd med arbetet! Det har varit väldigt roligt och lärorikt och jag tycker ändå
min app blev ganska bra. Det finns säkert buggar kvar och saker jag borde gjort bättre och på annat sätt,
men det fungerar och jag har försökt lösa de buggar jag än så länge har hittat!

{Länk till netlify(https://pinktodoo.netlify.app/)}
