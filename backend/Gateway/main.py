from fastapi import FastAPI

app = FastAPI()

@app.post("/greet")
def read_root(name:str):
    return{"message":"Hello "+name}