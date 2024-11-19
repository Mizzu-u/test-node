import { MongoClient, ObjectId, ServerApiVersion } from "mongodb";
const uri = "mongodb+srv://user:???@cluster0.dhwmu.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function connect() {
  try {
    await client.connect();
    const database = client.db("database");
    return database.collection("movies");
  } catch (error) {
    console.error("Error connecting to the database");
    console.error(error);
    await client.close();
  }
}

export class MovieModel {
  static async getAll({ genre }) {
    const db = await connect(); //?--> Se conecta a la DataBase

    if (genre) {
      return db
        .find({
          genre: {
            $elemMatch: {
              $regex: genre,
              $options: "i",
            },
          },
        }) //?--> Recuperamos esta información de la DataBase
        .toArray();
    }

    return db.find({}).toArray();
  }

  static async getById({ id }) {
    const db = await connect();
    const objectId = new ObjectId(id);
    return db.findOne({ _id: objectId });
  }

  //#Create in DataBase
  static async create({ input }) {
    const db = await connect();

    const { insertedId } = await db.insertOne(input);

    return {
      id: insertedId,
      ...input,
    };
  }

  //#Delete in DataBase
  static async delete({ id }) {
    const db = await connect();
    const objectId = new ObjectId(id);
    const { deletedCount } = await db.deleteOne({ _id: objectId });
    return deletedCount > 0;
  }

  //#Update in DataBase
  static async update({ id, input }) {
    const db = await connect();
    const objectId = new ObjectId(id);

    const { ok, value } = await db.findOneAndUpdate({ _id: objectId }, { $set: input }, { returnNewDocument: true });

    if (!ok) return false;

    return value;
  }
}
