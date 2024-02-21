import { Question } from "./question";
import { User } from "./users";

export class Reponse{
    id!:String;
    contenue!:String;
    question!:Question;
    user!:User;
}