export default interface ITokenData{
    role: "korisnik" | "administrator";
    id: number;
    identitet: string;
}