import asyncio
import websockets

async def send_messages():
    uri = "ws://localhost:5000"
    async with websockets.connect(uri) as websocket:
        print("Connected to server")
        
        async def receive_messages():
            async for message in websocket:
                print(f"Received: {message}")

        receive_task = asyncio.create_task(receive_messages())

        try:
            while True:
                message = input("Enter message: ")
                await websocket.send(message)
        except KeyboardInterrupt:
            pass

        receive_task.cancel()
        try:
            await receive_task
        except asyncio.CancelledError:
            pass

if __name__ == "__main__":
    asyncio.run(send_messages())
