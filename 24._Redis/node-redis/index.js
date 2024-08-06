import { createClient } from 'redis';

async function run() {
    const redisClient = createClient();

    redisClient.on('connect', () => console.log('Connected to Redis'));
    redisClient.on('error', (error) => console.error('Error:', error));

    await redisClient.connect();

    // Set a value in Redis
    await redisClient.set("myKey", "some value");

    // Get the value from Redis
    const value = await redisClient.get("myKey");
    console.log('Retrieved value:', value); // Should print 'some value'

    // Close the Redis connection
    await redisClient.disconnect();
}

run().catch(console.error);
