import { MongoClient, Db, Collection, Document, WithId, InsertOneResult } from "mongodb"

const MONGODB_URI = process.env.MONGODB_URI || ""
const MONGODB_DB = process.env.MONGODB_DB || ""

if (!MONGODB_URI) throw new Error("Missing MONGODB_URI")
if (!MONGODB_DB) throw new Error("Missing MONGODB_DB")

let cachedClient: MongoClient | null = null
let cachedDb: Db | null = null



export async function connectToDatabase(): Promise<{ client: MongoClient; db: Db }> {
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb }
  }

  const client = new MongoClient(MONGODB_URI)
  await client.connect()

  const db = client.db(MONGODB_DB)

  cachedClient = client
  cachedDb = db

  return { client, db }
}

export async function getCollection<T extends Document = Document>(
  collectionName: string
): Promise<Collection<T>> {
  const { db } = await connectToDatabase()
  return db.collection<T>(collectionName)
}

export async function countDocuments(collectionName: string, query: object = {}): Promise<number> {
  const collection = await getCollection(collectionName)
  return collection.countDocuments(query)
}

export async function findOne<T extends Document = Document>(
  collectionName: string,
  query: object
): Promise<WithId<T> | null> {
  const collection = await getCollection<T>(collectionName)
  return collection.findOne(query)
}

export async function insertOne<T extends Document = Document>(
  collectionName: string,
  doc: T
): Promise<InsertOneResult<T>> {
  const collection = await getCollection<T>(collectionName)
  return collection.insertOne(doc)
}
console.log("🌐 Connected to DB:", process.env.MONGODB_URI);
