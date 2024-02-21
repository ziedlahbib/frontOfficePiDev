import { Question } from "./question";
import { User } from "./users";

export class Vote {
    id!:String;
    vote!:String;
    question!:Question;
    user!:User;


}