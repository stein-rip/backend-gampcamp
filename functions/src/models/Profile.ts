import { ObjectId } from "mongodb";

export default interface Profile {
  _id?: ObjectId;
  google_id: string;
  display_name: string;
  photo_url: string;
  email: string;
}

TODO: "someone will need to manually permit these"