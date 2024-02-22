import { Question } from "./question";
import { User } from "./user";

export class Reponse{
    id!:String;
    contenue!:String;
    question!:Question;
    user!:User;
}