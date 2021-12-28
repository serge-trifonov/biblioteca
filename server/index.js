import express from 'express';
import { graphqlHTTP} from 'express-graphql';
import cors from 'cors';
import { buildSchema } from 'graphql';
import {readFileSync} from 'fs';
import mongoose from 'mongoose';
import { root } from './root.js';

const app=express()
const schemaString=readFileSync('./schema.graphql',{encoding:'utf8'});
const schema=buildSchema(schemaString)

const PORT=5000;
const DB_URL="mongodb://localhost/biblio";

async function startApp(){
    try{
        const connection=await mongoose.connect(DB_URL);
        app.listen(PORT,()=>console.log("server started on port "+PORT));
    }
    catch(e){
        console.log(e);
    }
}

startApp();

console.log("root : ", root);


app.use(cors())
app.use('/graphql',
    graphqlHTTP({
        rootValue:root,
        schema:schema,
        graphiql:true
    })
)
