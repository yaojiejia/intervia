import { createClient } from 'redis';

const client = createClient();

client.on('error', err => console.log('Redis Client Error', err));

export async function connect(){
    try{
        await client.connect()
    }
    catch(e){
        console.log(e)
        return "Error connecting redis"
    }
}

export async function set(key,value,time){
    try{
        await client.set(key,value,time)
    }
    catch(e){
        console.log(e)
        return `Error setting key ${key}`

    }
}


export async function get(key){
    try{
        return await client.get(key)
    }
    catch(e){
        console.log(e)
        return `Error getting key ${key}`

    }
}

export function disconnect(){
    try{
        client.disconnect();
        console.log("Disconnected sucessfully")
    }
    catch(e){
        console.log(e)
    }
}
