# Veb aplikacija za bazene

## Projektni zahtev

Aplikacija treba da omogući pristup za dve grupe korisnika. Prva grupa korisnika su administratori koji imaju
uvid u spisak svih zakazanih termina za korišćenje bazena za treninge, da unose u bazu podataka nove slobodne
termine, kao i da otkazuju postojeće rezervacije. Administrator može da uređuje i sadržaj stranica na sajtu
koji je sastavni deo interfejsa za druge korisnike sajta. Drugi korisnici sajta moraju da se prijave na portal
kako bi mu pristupili, a to rade preko formulara za prijavu na portal. Ukoliko korisnik nema nalog, mora da izvrši
regitraciju koju radi preko formulara za registarciju novog naloga. Korisnik unosi svoje podatke, među kojima su
ime, prezime, broj telefona i adresa e-pošte. Kada se korisnik prijavi na poratl sa ispravnim korisničkim imenom i
lozinkom, biće mu prikazan spisak svih otvorenih termina u kojima ima slobodnih mesta, a koji još nisu prošli.
Korisnik aktivira opciju za registarciju termina i potvrđuje svoju registraciju za konkretan termin (datum i sat).
Pošto izvrši odabir i potvrdu registracije za termin za korišćenje bazena, taj i svi ostali termini koji nisu
prošli su dostupni u listi "Moji termini". Termini koje je adminsitrator otkazao se prikazuju u listi kao "otkazani"
i treba da budu istaknuti (bojom ili sličicom pored termina). Korisnik može i sâm da otkaže svoj termin za korišćenje
bazena. Na veb sajtu se prijazuju stranice koje su sastavni deo veb aplikacije, a kao što su "pravila o korišćenju
bazena", "pravila o registarciji termina", "uputstvo za registarciju", "kontakt strana" itd. Ove stranice uređuje
administrator kroz panel za upravljanje sadržajem kojem ima pristup. Grafički interfejs veb sajta treba da bude
realizovan sa responsive dizajnom.

## Tehnička ograničenja

    Aplikacija mora da bude realizovana na Node.js platformi korišćenjem Express biblioteke. 
    Aplikacija mora da bude podeljena u dve nezavisne celine: back-end veb servis (API) i front-end 
    (GUI aplikacija). Sav kôd aplikacije treba da bude organizovan u dva Git spremišta u okviru 
    istog korisničkog naloga za ovaj projekat.

    Baza podataka mora da bude relaciona i treba koristiti MySQL ili MariaDB sistem za upravljanje 
    bazama podataka (RDBMS) i u spremištu back-end dela aplikacije mora da bude dostupan SQL dump 
    strukture baze podataka, eventualno sa inicijalnim podacima, potrebnim za demonstraciju rada projekta.
    Back-end i front-end delovi projekta moraju da budi pisani na TypeScript jeziku, prevedeni TypeScript 
    prevodiocem na adekvatan JavaScript. Back-end deo aplikacije, preveden na JavaScript iz izvornog TypeScript 
    koda se pokreće kao Node.js aplikacija, a front-end deo se statički servira sa rute statičkih resursa 
    back-end dela aplikacije i izvršava se na strani klijenta. Za postupak provere identiteta korisnika koji 
    upućuje zahteve back-end delu aplikacije može da se koristi mehanizam sesija ili JWT (JSON Web Tokena), 
    po slobodnom izboru.

    Sav generisani HTML kôd koji proizvodi front-end deo aplikacije mora da bude 100% validan, tj. da prođe 
    proveru W3C Validatorom (dopuštena su upozorenja - Warning, ali ne i greške - Error). Grafički korisnički 
    interfejs se generiše na strani klijenta (client side rendering), korišćenjem React biblioteke, dok podatke 
    doprema asinhrono iz back-end dela aplikacije (iz API-ja). Nije neophodno baviti se izradom posebnog dizajna 
    grafičkog interfejsa aplikacije, već je moguće koristiti CSS biblioteke kao što je Bootstrap CSS biblioteka. 
    Front-end deo aplikacije treba da bude realizovan tako da se prilagođava različitim veličinama ekrana (responsive design).

    Potrebno je obezbediti proveru podataka koji se od korisnika iz front-end dela upućuju back-end delu aplikacije. 
    Moguća su tri sloja zaštite i to: (1) JavaScript validacija vrednosti na front-end-u; (2) Provera korišćenjem 
    adekvatnih testova ili regularnih izraza na strani servera u back-end-u (moguće je i korišćenjem izričitih 
    šema - Schema za validaciju ili drugim pristupima) i (3) provera na nivou baze podataka korišćenjem okidača 
    nad samim tabelama baze podataka.
   
    Neophodno je napisati prateću projektnu dokumentaciju o izradi aplikacije koja sadrži (1) model baze podataka 
    sa detaljnim opisom svih tabela, njihovih polja i relacija; (2) dijagram baze podataka; (3) dijagram organizacije 
    delova sistema, gde se vidi veza između baze, back-end, front-end i korisnika sa opisom smera kretanja informacija; 
    (4) popis svih aktivnosti koje su podržane kroz aplikaciju za sve uloge korisnika aplikacije prikazane u obliku Use-Case 
    dijagrama; kao i (5) sve ostale elemente dokumentacije predviđene uputstvom za izradu dokumentacije po ISO standardu.
    
    Izrada oba dela aplikacije (projekata) i promene kodova datoteka tih projekata moraju da bude praćene korišćenjem 
    alata za verziranje koda Git, a kompletan kôd aplikacije bude dostupan na javnom Git spremištu, npr. na besplatnim 
    GitHub ili Bitbucket servisima, jedno spremište za back-end projekat i jedno za front-end projekat. Ne može ceo projekat 
    da bude otpremljen u samo nekoliko masovnih Git commit-a, već mora da bude pokazano da je projekat realizovan u kontinuitetu, 
    da su korišćene grane (branching), da je bilo paralelnog rada u više grana koje su spojene (merging) sa ili bez konflikata 
    (conflict resolution).

## Razrada projektne dokumentacije

    Aplikacija mora da bude realizovana na Node.js platformi korišćenjem Express biblioteke. Aplikacija mora da bude 
    podeljena u dve nezavisne celine: back-end veb servis (API) i front-end (GUI aplikacija). Sav kôd aplikacije treba 
    da bude organizovan u dva Git spremišta u okviru istog korisničkog naloga za ovaj projekat.

    Baza podataka mora da bude relaciona i treba koristiti MySQL ili MariaDB sistem za upravljanje bazama podataka (RDBMS)
    i u spremištu back-end dela aplikacije mora da bude dostupan SQL dump strukture baze podataka, eventualno sa inicijalnim 
    podacima, potrebnim za demonstraciju rada projekta.

    Back-end i front-end delovi projekta moraju da budi pisani na TypeScript jeziku, prevedeni TypeScript prevodiocem na 
    adekvatan JavaScript. Back-end deo aplikacije, preveden na JavaScript iz izvornog TypeScript koda se pokreće kao Node.js 
    aplikacija, a front-end deo se statički servira sa rute statičkih resursa back-end dela aplikacije i izvršava se na strani 
    klijenta. Za postupak provere identiteta korisnika koji upućuje zahteve back-end delu aplikacije može da se koristi mehanizam 
    sesija ili JWT (JSON Web Tokena), po slobodnom izboru.
    
    Sav generisani HTML kôd koji proizvodi front-end deo aplikacije mora da bude 100% validan, tj. da prođe proveru W3C Validatorom 
    (dopuštena su upozorenja - Warning, ali ne i greške - Error). Grafički korisnički interfejs se generiše na strani klijenta 
    (client side rendering), korišćenjem React biblioteke, dok podatke doprema asinhrono iz back-end dela aplikacije (iz API-ja). 
    Nije neophodno baviti se izradom posebnog dizajna grafičkog interfejsa aplikacije, već je moguće koristiti CSS biblioteke kao 
    što je Bootstrap CSS biblioteka. Front-end deo aplikacije treba da bude realizovan tako da se prilagođava različitim veličinama 
    ekrana (responsive design).
   
    Potrebno je obezbediti proveru podataka koji se od korisnika iz front-end dela upućuju back-end delu aplikacije. Moguća su tri 
    sloja zaštite i to: (1) JavaScript validacija vrednosti na front-end-u; (2) Provera korišćenjem adekvatnih testova ili regularnih 
    izraza na strani servera u back-end-u (moguće je i korišćenjem izričitih šema - Schema za validaciju ili drugim pristupima) i 
    (3) provera na nivou baze podataka korišćenjem okidača nad samim tabelama baze podataka.
    
    Neophodno je napisati prateću projektnu dokumentaciju o izradi aplikacije koja sadrži (1) model baze podataka sa detaljnim opisom 
    svih tabela, njihovih polja i relacija; (2) dijagram baze podataka; (3) dijagram organizacije delova sistema, gde se vidi veza 
    između baze, back-end, front-end i korisnika sa opisom smera kretanja informacija; (4) popis svih aktivnosti koje su podržane kroz 
    aplikaciju za sve uloge korisnika aplikacije prikazane u obliku Use-Case dijagrama; kao i (5) sve ostale elemente dokumentacije 
    predviđene uputstvom za izradu dokumentacije po ISO standardu.
   
    Izrada oba dela aplikacije (projekata) i promene kodova datoteka tih projekata moraju da bude praćene korišćenjem alata za verziranje 
    koda Git, a kompletan kôd aplikacije bude dostupan na javnom Git spremištu, npr. na besplatnim GitHub ili Bitbucket servisima, jedno 
    spremište za back-end projekat i jedno za front-end projekat. Ne može ceo projekat da bude otpremljen u samo nekoliko masovnih Git 
    commit-a, već mora da bude pokazano da je projekat realizovan u kontinuitetu, da su korišćene grane (branching), da je bilo paralelnog 
    rada u više grana koje su spojene (merging) sa ili bez konflikata (conflict resolution).
