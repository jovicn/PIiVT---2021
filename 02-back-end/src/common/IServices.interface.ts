import BazenService from '../components/bazen/service';
import TerminService from '../components/termin/service';
import AdministratorService from '../components/administrator/service';
import KorisnikService from '../components/korisnik/service';
import StranicaService from '../components/stranica/service';

export default interface IServices {

    bazenService: BazenService;
    terminService: TerminService;
    administratorService: AdministratorService;
    korisnikService: KorisnikService;
    stranicaService: StranicaService;
}