const express = require('express');
const cors = require('cors');
const app = express();
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const port = process.env.PORT || 3000;
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config();


app.use(cors({
    origin: ['http://localhost:5173',
        'https://antiqo-tracker.web.app',
        'https://antiqo-tracker.firebaseapp.com'
    ],
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());

const logger = (req, res, next) => {
    console.log('inside the logger');
    next();
};

const verifyToken = (req, res, next) => {
    // console.log('inside verify token middleware', req.cookies)
    const token = req?.cookies?.token;
    console.log(token);

    if (!token) {
        return res.status(401).send({ message: 'Unauthorized access' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).send({ message: 'Unauthorized access' });
        }

        req.user = decoded;
        next();
    });
};


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.xd8rz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        // await client.connect();
        // Send a ping to confirm a successful connection
        // await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");

        // artifacts related apis
        const artifactsCollection = client.db('antiqoTracker').collection('artifacts');
        const likedArtifactCollection = client.db('antiqoTracker').collection('liked_artifacts');

        // Auth related api 
        app.post('/jwt', async (req, res) => {
            const user = req.body;
            const token = jwt.sign(user, process.env.JWT_SECRET, { expiresIn: '1h' });

            res
            .cookie('token', token, {
                httpOnly: true,
                secure: true,
                sameSite: 'none',
            })
            .send({success: true});
        })



        // Artifact related APIS
        app.get('/artifacts', async (req, res) => {
            console.log('now inside api callback');
            const email = req?.query?.email;
            const search = req?.query?.search;
            // if(req?.user?.email !== req?.query?.email) {
            //     return res.status(403).send({message: 'Forbidden access'});
            // }

            let query = {};

            if (email) {
                query.userEmail = email;
            }

            if (search) {
                query.$or = [
                    { artifactName: { $regex: search, $options: "i" } },
                    { historicalContext: { $regex: search, $options: "i" } }
                ];
            }

            const limit = parseInt(req.query.limit) || 0; 
            const cursor = artifactsCollection.find(query).sort({ likeCount: -1 }).limit(limit);
            const result = await cursor.toArray();
            res.send(result);
        });


        app.get('/artifacts/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) }
            const result = await artifactsCollection.findOne(query);
            res.send(result);
        })

        app.post('/artifacts', async (req, res) => {
            const newArtifact = req.body;
            const result = await artifactsCollection.insertOne(newArtifact);
            res.send(result);
        })

        // Update artifact
        app.put('/artifacts/:id', async (req, res) => {
            try {
                const id = req.params.id;
                const userEmail = req.body.userEmail;
                const updatedData = req.body;

                // Validate ObjectId format
                if (!ObjectId.isValid(id)) {
                    return res.status(400).json({ error: 'Invalid artifact ID format' });
                }

                // Validate if artifact exists and belongs to user
                const existingArtifact = await artifactsCollection.findOne({
                    _id: new ObjectId(id),
                    userEmail: userEmail
                });

                if (!existingArtifact) {
                    return res.status(404).json({ error: 'Artifact not found or unauthorized' });
                }

                const result = await artifactsCollection.updateOne(
                    { _id: new ObjectId(id), userEmail: userEmail },
                    {
                        $set: {
                            artifactName: updatedData.artifactName,
                            artifactImage: updatedData.artifactImage,
                            artifactType: updatedData.artifactType,
                            historicalContext: updatedData.historicalContext,
                            createdAt: updatedData.createdAt,
                            discoveredAt: updatedData.discoveredAt,
                            discoveredBy: updatedData.discoveredBy,
                            presentLocation: updatedData.presentLocation,
                        }
                    }
                );

                if (result.matchedCount === 0) {
                    return res.status(404).json({ error: 'Artifact not found or unauthorized' });
                }

                if (result.modifiedCount > 0) {
                    res.json({ success: true, message: 'Artifact updated successfully' });
                } else {
                    res.status(400).json({ error: 'No changes made to the artifact' });
                }
            } catch (error) {
                console.error('Update error:', error);
                res.status(500).json({ error: 'Internal server error' });
            }
        });

        // Delete artifact
        app.delete('/artifacts/:id', async (req, res) => {
            try {
                const id = req.params.id;
                const { userEmail } = req.body;

                // Validate ObjectId format
                if (!ObjectId.isValid(id)) {
                    return res.status(400).json({ error: 'Invalid artifact ID format' });
                }

                // Validate if artifact exists and belongs to user
                const existingArtifact = await artifactsCollection.findOne({
                    _id: new ObjectId(id),
                    userEmail: userEmail
                });

                if (!existingArtifact) {
                    return res.status(404).json({ error: 'Artifact not found or unauthorized' });
                }

                const result = await artifactsCollection.deleteOne({
                    _id: new ObjectId(id),
                    userEmail: userEmail
                });

                if (result.deletedCount > 0) {
                    // Also delete any associated likes
                    await likedArtifactCollection.deleteMany({ artifact_id: id });
                    res.json({ success: true, message: 'Artifact deleted successfully' });
                } else {
                    res.status(400).json({ error: 'Delete failed' });
                }
            } catch (error) {
                console.error('Delete error:', error);
                res.status(500).json({ error: 'Internal server error' });
            }
        });



        // Like artifacts apis 

        app.get('/liked-artifact', async (req, res) => {
            const email = req.query.email;
            const query = { applicant_email: email }
            const result = await likedArtifactCollection.find(query).toArray();

            for (const likes of result) {
                console.log(likes.artifact_id)
                const query1 = { _id: new ObjectId(likes.artifact_id) }
                const artifact = await artifactsCollection.findOne(query1);
                if (artifact) {
                    likes.artifactName = artifact.artifactName;
                    likes.artifactType = artifact.artifactType;
                    likes.createdAt = artifact.createdAt;
                }
            }

            res.send(result);
        })


        app.post('/liked-artifacts', async (req, res) => {
            const { artifact_id, applicant_email } = req.body;

            try {
                // Insert the like if it doesn't exist
                const result = await likedArtifactCollection.insertOne({ artifact_id, applicant_email });

                if (result.acknowledged) {
                    // Increment like count only if the like was added
                    const filter = { _id: new ObjectId(artifact_id) };
                    const update = { $inc: { likeCount: 1 } };
                    await artifactsCollection.updateOne(filter, update);
                }

                res.send(result);
            } catch (error) {
                if (error.code === 11000) {
                    // Duplicate error: User already liked the artifact
                    res.status(400).send({ error: "Artifact already liked by this user" });
                } else {
                    console.error("Error liking artifact:", error.message);
                    res.status(500).send({ error: "Failed to like artifact" });
                }
            }
        });


        app.get('/liked-artifacts/:id', async (req, res) => {
            const { id } = req.params;
            const email = req.query.email;

            const query = { artifact_id: id, applicant_email: email };
            const likedArtifact = await likedArtifactCollection.findOne(query);

            res.send({ liked: !!likedArtifact });
        });


        app.delete('/liked-artifacts/:id', async (req, res) => {
            const { id } = req.params;
            const email = req.query.email;

            const query = { artifact_id: id, applicant_email: email };

            try {
                const result = await likedArtifactCollection.deleteOne(query);

                if (result.deletedCount > 0) {
                    // Decrement like count only if the like was removed
                    const filter = { _id: new ObjectId(id) };
                    const update = { $inc: { likeCount: -1 } };
                    await artifactsCollection.updateOne(filter, update);

                    res.send({ success: true });
                } else {
                    res.status(404).send({ error: "Like not found" });
                }
            } catch (error) {
                console.error("Error unliking artifact:", error.message);
                res.status(500).send({ error: "Failed to unlike artifact" });
            }
        });





    } catch (error) {
        console.error("Error connecting to MongoDB:", error.message);
    }
}
run().catch(console.dir);


app.get('/', (req, res) => {
    res.send('Artifact is coming soon')
})

app.listen(port, () => {
    console.log(`Artifact is waiting at : ${port}`);
})

