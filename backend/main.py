from fastapi import FastAPI
import pymongo

app = FastAPI()

@app.get("/")
async def root():
    return {"message": "FastAPI + MongoDB работает!"}