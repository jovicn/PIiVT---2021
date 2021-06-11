import BazenService from '../components/bazen/service';
import TerminService from '../components/termin/service';
import AdministratorService from '../components/administrator/service';

export default interface IServices {

    bazenService: BazenService;
    terminService: TerminService;
    administratorService: AdministratorService;
}