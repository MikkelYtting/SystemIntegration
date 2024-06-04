# in mem database
import redis

redis_client = redis.Redis(host='localhost', port=6379, db=0) # laver redis client

redis_client.set('myKey', 'my value') # key value pair

value = redis_client.get('myKey') # 

# redis_client.setex('myKey', 10, 'my value') #sætter udløbstid

print(str(value, 'utf-8')) 
#prints = my value
