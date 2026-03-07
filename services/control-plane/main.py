import asyncio
async def main():
    print("ASI Control Plane running...")
    while True: await asyncio.sleep(3600)
if __name__ == "__main__": asyncio.run(main())
