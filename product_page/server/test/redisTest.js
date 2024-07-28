import * as redisClient from '../lib/redis/redis.js'

async function main(){
    await redisClient.connect()
    await redisClient.set('test1','testvalue',{EX:20})
    const res = await redisClient.get('test1')
    console.log(res)
    redisClient.disconnect()

}

main()